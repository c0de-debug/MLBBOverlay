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