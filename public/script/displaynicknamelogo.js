//--------------- Nickname ---------------//

// Variabel untuk menyimpan ID timer debounce untuk nama
let nicknameDebounceTimer;

function loadNames() {
    const names = JSON.parse(localStorage.getItem("names")) || [];
    const imageIndices = [3, 4, 5, 6, 7, 10, 11, 12, 13, 14];

    // Update teks untuk semua name-box (1 sampai 14)
    for (let i = 1; i <= 14; i++) {
        const textElement = document.getElementById(`name-box-${i}`);
        if (textElement) {
            textElement.textContent = names[i - 1] || "";
        }
    }

    // Update gambar hanya untuk name-image-box pada indeks tertentu
    imageIndices.forEach(i => {
        const imgElement = document.getElementById(`name-image-box-${i}`);
        if (imgElement) {
            const name = names[i - 1] || "";
            const img = document.createElement("img");
            img.src = name ? `Assets/player/${name}.png` : "Assets/player/noplayer.png";
            img.alt = name || "No Player";
            img.onerror = () => {
                img.src = "Assets/player/noplayer.png";
            };
            imgElement.innerHTML = "";
            imgElement.appendChild(img);
        }
    });
}

//--------------- Logo ---------------//

// Variabel untuk menyimpan ID timer debounce untuk logo
let logoDebounceTimer;

function loadImages() {
    document.getElementById('displayImage1').src = localStorage.getItem('logo1') || "";
    document.getElementById('displayImage1').alt = localStorage.getItem('logo1') ? "Logo 1" : "Logo 1 Tidak Ada";

    document.getElementById('displayImage2').src = localStorage.getItem('logo2') || "";
    document.getElementById('displayImage2').alt = localStorage.getItem('logo2') ? "Logo 2" : "Logo 2 Tidak Ada";
}


//--------------- Event Listener & Initial Load ---------------//

// Satu event listener untuk memantau semua perubahan di localStorage
window.addEventListener("storage", (event) => {
    // Debounce untuk perubahan nama
    if (event.key === "names") {
        // Hapus timer yang sedang berjalan (jika ada)
        clearTimeout(nicknameDebounceTimer);
        // Set timer baru. Fungsi loadNames() hanya akan dijalankan setelah 2 detik tidak ada perubahan
        nicknameDebounceTimer = setTimeout(loadNames, 2000); // 2000 milidetik = 2 detik
    }

    // Debounce untuk perubahan logo
    if (event.key === 'updateTime' || event.key === 'logo1' || event.key === 'logo2') {
         // Hapus timer yang sedang berjalan (jika ada)
        clearTimeout(logoDebounceTimer);
        // Set timer baru. Fungsi loadImages() hanya akan dijalankan setelah 2 detik tidak ada perubahan
        logoDebounceTimer = setTimeout(loadImages, 2000);
    }
});

// Muat data saat halaman pertama kali dibuka
loadNames();
loadImages();