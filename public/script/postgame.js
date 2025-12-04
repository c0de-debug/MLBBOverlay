   // Fungsi untuk mendapatkan path gambar item atau spell
   function getImagePath(name, type) {
    if (!name) return "";
    return `Assets/Itemandspell/${name}.png`;
  }

  // Fungsi untuk render pemain
  function renderPlayers(data) {
    if (!data) return;
    const team1 = document.getElementById("team1");
    const team2 = document.getElementById("team2");
    const stats1 = document.getElementById("stats1");
    const stats2 = document.getElementById("stats2");
    const gametime = document.getElementById("gametime");
    const blue = document.getElementById("blue");
    const red = document.getElementById("red");
    const gamenumber = document.getElementById("gamenumber");
    team1.innerHTML = "";
    team2.innerHTML = "";
    stats1.innerHTML = "";
    stats2.innerHTML = "";
    gametime.innerHTML = "";
    blue.innerHTML = "";
    red.innerHTML = "";
    gamenumber.innerHTML = "";

    // Render Team 1 (index 0-4)
    data.slice(0, 5).forEach(player => {
      const playerDiv = document.createElement("div");
      playerDiv.innerHTML = `
        <div class="boxsideinfo">
          <div class="lvl">${player.LVL || "Unknown"}</div>
            <div class="kdagold">
                <div class="kda">${player.KDA || "-"}</div>
                <div class="kdatxt">KDA </div>
                <div class="gold"> $${player.GOLD || "-"}</div>
                <div class="goldtxt">gold </div>
            </div>
                
          <div class="spell">
            ${player.SPELL ? `<img src="${getImagePath(player.SPELL, 'spell')}" alt="${player.SPELL}">` : ''}
          </div>
        
        <div class= "itemframe">
        <div class="items">
          ${[1, 2, 3].map(i => `
            <div class="itemslot ${!player[`ITEM ${i}`] ? 'empty' : ''}">
              ${player[`ITEM ${i}`] ? `<img src="${getImagePath(player[`ITEM ${i}`], 'item')}" alt="${player[`ITEM ${i}`]}">` : ''}
            </div>
          `).join('')}
        </div>
        <div class="items">
          ${[4, 5, 6].map(i => `
            <div class="itemslot ${!player[`ITEM ${i}`] ? 'empty' : ''}">
              ${player[`ITEM ${i}`] ? `<img src="${getImagePath(player[`ITEM ${i}`], 'item')}" alt="${player[`ITEM ${i}`]}">` : ''}
            </div>
          `).join('')}
        </div>
        </div>
        </div>
      `;
      team1.appendChild(playerDiv);
    });

       // Render Team 1 (index 0-4)
       data.slice(6, 11).forEach(player => {
        const playerDiv = document.createElement("div");
        playerDiv.innerHTML = `
          <div class="boxsideinfo">
            
            
                <div class= "itemframe">
          <div class="items">
            ${[1, 2, 3].map(i => `
              <div class="itemslot ${!player[`ITEM ${i}`] ? 'empty' : ''}">
                ${player[`ITEM ${i}`] ? `<img src="${getImagePath(player[`ITEM ${i}`], 'item')}" alt="${player[`ITEM ${i}`]}">` : ''}
              </div>
            `).join('')}
          </div>
          <div class="items">
            ${[4, 5, 6].map(i => `
              <div class="itemslot ${!player[`ITEM ${i}`] ? 'empty' : ''}">
                ${player[`ITEM ${i}`] ? `<img src="${getImagePath(player[`ITEM ${i}`], 'item')}" alt="${player[`ITEM ${i}`]}">` : ''}
              </div>
            `).join('')}
          </div>
          </div>   
            <div class="spell">
              ${player.SPELL ? `<img src="${getImagePath(player.SPELL, 'spell')}" alt="${player.SPELL}">` : ''}
            </div>
              <div class="kdagold">
                  <div class="kda">${player.KDA || "-"}</div>
                  <div class="kdatxt">KDA </div>
                  <div class="gold"> $${player.GOLD || "-"}</div>
                  <div class="goldtxt">gold </div>
              </div>
              <div class="lvl">${player.LVL || "Unknown"}</div>
          
         
          </div>
        `;
        team2.appendChild(playerDiv);
      });

     // Render Team 2 (index 5-9)
     data.slice(12,16).forEach(player => {
      const playerDiv = document.createElement("div");
      playerDiv.className = "tltinfo";
      playerDiv.innerHTML = `
        <div class="tltinfobox">
          ${player.KDA || "-"}</span>
       
        </div>
      `;
      stats1.appendChild(playerDiv);
    });

    data.slice(16,20).forEach(player => {
      const playerDiv = document.createElement("div");
      playerDiv.className = "tltinfo";
      playerDiv.innerHTML = `
        <div class="tltinfobox">
          ${player.KDA || "-"}</span>
       
        </div>
      `;
      stats2.appendChild(playerDiv);
    });

       // Render Team 2 (index 5-9)
       data.slice(12,12).forEach(player => {
        const playerDiv = document.createElement("div");
        playerDiv.className = "player";
        playerDiv.innerHTML = `
          <div class="player-info">
            <span>KDA: ${player.KDA || "-"}</span>
         
          </div>
        `;
        stats1.appendChild(playerDiv);
      });
  
      data.slice(20).forEach(player => {
        const playerDiv = document.createElement("div");
        playerDiv.className = "";
        playerDiv.innerHTML = `
          <div class="igtime">
            ${player.KDA || "-"}
         
          </div>
        `;
        gametime.appendChild(playerDiv);
      });

      data.slice(21,22).forEach(player => {
        const playerDiv = document.createElement("div");
        playerDiv.className = "";
        playerDiv.innerHTML = `
          <div class="igtime">
            ${player.KDA || "-"}
         
          </div>
        `;
        gametime.appendChild(playerDiv);
      });

      data.slice(12,13).forEach(player => {
        const playerDiv = document.createElement("div");
        playerDiv.className = "";
        playerDiv.innerHTML = `
          <div class="winlose">
            ${player.GOLD || "-"}
         
          </div>
        `;
        blue.appendChild(playerDiv);
      });

      data.slice(16,17).forEach(player => {
        const playerDiv = document.createElement("div");
        playerDiv.className = "";
        playerDiv.innerHTML = `
          <div class="winlose">
            ${player.GOLD || "-"}
         
          </div>
        `;
        red.appendChild(playerDiv);
      });

      data.slice(20).forEach(player => {
        const playerDiv = document.createElement("div");
        playerDiv.className = "";
        playerDiv.innerHTML = `
          <div class="gamenumber">
            ${player.GOLD || "-"}
         
          </div>
        `;
        gamenumber.appendChild(playerDiv);
      });
  
  
}

  

  // Fungsi untuk memuat dan memperbarui data
  function loadData() {
    fetch("database/postgame.json")
      .then(response => {
        if (!response.ok) throw new Error(`Gagal memuat postgame.json: ${response.status}`);
        return response.json();
      })
      .then(data => {
        localStorage.setItem("matchData", JSON.stringify(data));
        renderPlayers(data);
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Gagal memuat data. Pastikan file database/postgame.json ada.");
      });
  }

  // Inisialisasi
  const cachedData = JSON.parse(localStorage.getItem("matchData"));
  if (cachedData) renderPlayers(cachedData);
  loadData();
  setInterval(loadData, 2000); // Periksa pembaruan setiap 2 detik

//-------------------------------------------------------------------------------------

function loadNames() {
    const names = JSON.parse(localStorage.getItem("names")) || [];
    for (let i = 1; i <= 14; i++) {
        document.getElementById(`name-box-${i}`).textContent = names[i - 1] || "";
    }
}

loadNames();
setInterval(loadNames, 100);

//---------------

function loadImages() {
    document.getElementById('displayImage1').src = localStorage.getItem('logo1') || "";
    document.getElementById('displayImage1').alt = localStorage.getItem('logo1') ? "Logo 1" : "Logo 1 Tidak Ada";

    document.getElementById('displayImage2').src = localStorage.getItem('logo2') || "";
    document.getElementById('displayImage2').alt = localStorage.getItem('logo2') ? "Logo 2" : "Logo 2 Tidak Ada";
}

// Load gambar pertama kali
loadImages();

// Real-time update menggunakan event Storage
window.addEventListener('storage', function(event) {
    if (event.key === 'updateTime') {
        loadImages();
    }
});

//------------------

function updateDisplay() {
    for (let i = 1; i <= 20; i++) { // Sesuaikan jumlah dropdown
        let imgSrc = localStorage.getItem(`selectedHero${i}`);
        let voiceSrc = localStorage.getItem(`selectedVoice${i}`);
        
        let imgElement = document.getElementById(`image-display-${i}`);
        let boxElement = document.getElementById(`image-box-${i}`);

        let cloneImgElement = document.getElementById(`clone-image-display-${i}`);
        let cloneBoxElement = document.getElementById(`-clone-image-box-${i}`);

        let audioElement = document.getElementById(`audio-${i}`);

        if (voiceSrc && audioElement) {
            audioElement.src = voiceSrc;
            audioElement.play();
        }

        if (imgSrc) {
            // Update gambar asli
            imgElement.src = imgSrc;
            imgElement.style.opacity = "1";
            boxElement.classList.add("show");

            // Update gambar clone
            if (cloneImgElement && cloneBoxElement) {
                cloneImgElement.src = imgSrc;
                cloneImgElement.style.opacity = "1";
                cloneBoxElement.classList.add("show");
            }
        } else {
            // Hapus gambar asli jika kosong
            imgElement.src = "";
            imgElement.style.opacity = "0";
            boxElement.classList.remove("show");

            // Hapus gambar clone jika kosong
            if (cloneImgElement && cloneBoxElement) {
                cloneImgElement.src = "";
                cloneImgElement.style.opacity = "0";
                cloneBoxElement.classList.remove("show");
            }
        }
    }
}

window.addEventListener("storage", updateDisplay);
updateDisplay();