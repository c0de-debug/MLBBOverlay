
//-----------------NICKNAME----------------//
let firstSwapSelection = null;

// FUNGSI BARU: Menyimpan secara otomatis tanpa menampilkan alert
function autoSaveNames() {
    let names = [];
    for (let i = 1; i <= 14; i++) {
        const name = document.getElementById(`name-input-${i}`).value;
        names.push(name);
    }
    localStorage.setItem("names", JSON.stringify(names));
    
    // Opsional: Beri umpan balik visual bahwa data telah disimpan
    // console.log("Data disimpan otomatis..."); 
}

function handleSwapClick(selectedIndex, selectedButton) {
    if (firstSwapSelection === null) {
        firstSwapSelection = {
            index: selectedIndex,
            button: selectedButton
        };
        selectedButton.textContent = "Swap";
        selectedButton.style.backgroundColor = '#ffc107';
    } else {
        if (firstSwapSelection.index === selectedIndex) {
            resetSwapUI();
            return;
        }

        let currentNames = [];
        for (let i = 1; i <= 14; i++) {
            currentNames.push(document.getElementById(`name-input-${i}`).value);
        }

        const secondIndex = selectedIndex;
        const firstIndex = firstSwapSelection.index;

        [currentNames[firstIndex - 1], currentNames[secondIndex - 1]] = [currentNames[secondIndex - 1], currentNames[firstIndex - 1]];

        localStorage.setItem("names", JSON.stringify(currentNames));
        loadNames();
    }
}

function resetSwapUI() {
    firstSwapSelection = null;
    for (let i = 1; i <= 14; i++) {
        const button = document.getElementById(`swap-btn-${i}`);
        if (button) {
            button.textContent = "Swap";
            button.style.backgroundColor = '';
        }
    }
}

function resetNames() {
    for (let i = 1; i <= 14; i++) {
        document.getElementById(`name-input-${i}`).value = "";
    }
    localStorage.removeItem("names");
    resetSwapUI();
}

function switchNames() {
    let names = [];
    for (let i = 1; i <= 14; i++) {
        names.push(document.getElementById(`name-input-${i}`).value);
    }


    let temp = names.slice(0, 7);
    names.splice(0, 7, ...names.slice(7, 14));
    names.splice(7, 7, ...temp);

    localStorage.setItem("names", JSON.stringify(names));
    loadNames();
}

function loadNames() {
    let names = JSON.parse(localStorage.getItem("names")) || [];
    for (let i = 1; i <= 14; i++) {
        const input = document.getElementById(`name-input-${i}`);
        if (input) {
             input.value = names[i - 1] || "";
        }
    }
    resetSwapUI();
}

// FUNGSI BARU: Untuk menginisialisasi aplikasi saat halaman dimuat
function initializeApp() {
    // 1. Muat semua nama yang ada
    loadNames();

    // 2. Pasang event listener 'input' ke setiap kotak teks
    for (let i = 1; i <= 14; i++) {
        const input = document.getElementById(`name-input-${i}`);
        if (input) {
            input.addEventListener('input', autoSaveNames);
        }
    }
}

// Jalankan fungsi inisialisasi saat halaman selesai dimuat
window.onload = initializeApp;

//----------------Logo

     // Simpan gambar ke localStorage saat diunggah (Realtime)
     document.getElementById('file1').addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem('logo1', e.target.result);
                updateRealtime();
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('file2').addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem('logo2', e.target.result);
                updateRealtime();
            };
            reader.readAsDataURL(file);
        }
    });

    // Fungsi untuk menukar gambar 1 dan 2
    function switchImages() {
        let logo1 = localStorage.getItem('logo1');
        let logo2 = localStorage.getItem('logo2');
        localStorage.setItem('logo1', logo2);
        localStorage.setItem('logo2', logo1);
        updateRealtime();
    }

    // Fungsi reset gambar
    function resetImages() {
        localStorage.removeItem('logo1');
        localStorage.removeItem('logo2');
        updateRealtime();
    }

    // Memicu event pembaruan untuk display.html
    function updateRealtime() {
        localStorage.setItem('updateTime', Date.now()); // Timestamp untuk memicu event
    }


