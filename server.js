// server.js (Versi yang sudah diperbaiki)
const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const os = require('os');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());
app.use(express.static('public'));

// Objek untuk menyimpan state gabungan dari semua data localStorage
let sharedStorage = {};

// Fungsi untuk mendapatkan alamat IP lokal server
function getLocalIp() {
    const nets = os.networkInterfaces();
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Lewati alamat non-IPv4 dan internal (mis. 127.0.0.1)
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return 'localhost';
}

// Fungsi untuk mengirim pesan ke semua klien KECUALI pengirimnya
function broadcast(data, sender) {
  wss.clients.forEach(client => {
    if (client !== sender && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

wss.on('connection', ws => {
  console.log('Client connected');
  // Segera kirim state saat ini ke klien yang baru terhubung
  ws.send(JSON.stringify({ type: 'init', data: sharedStorage }));

  ws.on('message', message => {
    try {
      const msg = JSON.parse(message.toString());

      // Ketika sebuah 'host' (kontrol panel) terhubung dan mengirim state awalnya
      if (msg.type === 'init') {
        // Gabungkan data dari host baru dengan state yang ada di server
        // Data dari host yang baru terhubung akan menimpa data lama jika ada duplikasi
        sharedStorage = { ...sharedStorage, ...msg.data };
        console.log('Server state initialized/merged by a new host:', sharedStorage);
        // Beri tahu klien lain tentang state yang mungkin baru saja diperbarui
        broadcast({ type: 'init', data: sharedStorage }, ws);
      }
      
      // Ketika sebuah 'host' mengirimkan perubahan kecil (delta)
      else if (msg.type === 'update') {
        // Terapkan perubahan (delta) ke state di server
        for (const [key, value] of Object.entries(msg.data)) {
            if (value === null) {
                delete sharedStorage[key]; // Hapus key jika nilainya null
            } else {
                sharedStorage[key] = value; // Tambah/Perbarui key
            }
        }
        console.log('Server state updated with delta:', msg.data);
        console.log('New server state:', sharedStorage);
        // Kirimkan delta yang sama ke semua klien lain
        broadcast({ type: 'update', data: msg.data }, ws);
      } 
      
      // Ketika sebuah 'host' mengirim perintah clear
      else if (msg.type === 'clear') {
        sharedStorage = {};
        console.log('Server state cleared');
        // Kirimkan perintah clear ke semua klien lain
        broadcast({ type: 'clear' }, ws);
      }
    } catch (e) {
      console.error('Error processing message:', e);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Route API untuk postgame.json (tidak perlu diubah)
app.get('/api/postgame', async (req, res) => {
    try {
        const data = await fs.readFile(path.join(__dirname, 'public/database/postgame.json'), 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ message: 'Error reading JSON file' });
    }
});

app.post('/api/postgame', async (req, res) => {
    try {
        await fs.writeFile(path.join(__dirname, 'public/database/postgame.json'), JSON.stringify(req.body, null, 2));
        res.json({ message: 'JSON file saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving JSON file' });
    }
});

const port = 3000;
const localIp = getLocalIp();

server.listen(port, async () => {
  console.log(`Server running on http://localhost:${port} and http://${localIp}:${port}`);
  // Secara otomatis membuat/memperbarui file serverip.txt di folder public
  try {
    await fs.writeFile(path.join(__dirname, 'public/serverip.txt'), localIp);
    console.log(`serverip.txt has been updated with IP: ${localIp}`);
  } catch (error) {
    console.error('Failed to write serverip.txt:', error);
  }
});