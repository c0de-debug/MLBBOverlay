// Variabel global
        let selected1 = null;
        let selected2 = null;
        let allHeroes = [];
        let currentPhaseIndex = 0;
        let correctionMode = false;

        // Urutan dropdown yang dapat diketik
        const dropdownOrder = [
            { dropdown: 'dropdowns-11', phase: 0, display: ['ban-left-1'] },
            { dropdown: 'dropdowns-16', phase: 1, display: ['ban-right-1'] },
            { dropdown: 'dropdowns-12', phase: 2, display: ['ban-left-2'] },
            { dropdown: 'dropdowns-17', phase: 3, display: ['ban-right-2'] },
            { dropdown: 'dropdowns-13', phase: 4, display: ['ban-left-3'] },
            { dropdown: 'dropdowns-18', phase: 5, display: ['ban-right-3'] },
            { dropdown: 'dropdowns-1', phase: 6, display: ['pick-left-1'] },
            { dropdown: ['dropdowns-6', 'dropdowns-7'], phase: 7, display: ['pick-right-1', 'pick-right-2'] },
            { dropdown: ['dropdowns-2', 'dropdowns-3'], phase: 8, display: ['pick-left-2', 'pick-left-3'] },
            { dropdown: 'dropdowns-8', phase: 9, display: ['pick-right-3'] },
            { dropdown: 'dropdowns-19', phase: 10, display: ['ban-right-4'] },
            { dropdown: 'dropdowns-14', phase: 11, display: ['ban-left-4'] },
            { dropdown: 'dropdowns-20', phase: 12, display: ['ban-right-5'] },
            { dropdown: 'dropdowns-15', phase: 13, display: ['ban-left-5'] },
            { dropdown: 'dropdowns-9', phase: 14, display: ['pick-right-4'] },
            { dropdown: ['dropdowns-4', 'dropdowns-5'], phase: 15, display: ['pick-left-4', 'pick-left-5'] },
            { dropdown: 'dropdowns-10', phase: 16, display: ['pick-right-5'] },
            { dropdown: 'dropdowns-10', phase: 16, display: ['pick-right-5'] }
        ];

        /**
         * Memuat data hero dari file JSON.
         */
        async function loadHeroes() {
            try {
                const response = await fetch('/database/herolist.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return await response.json();
            } catch (error) {
                console.error('Error loading herolist.json:', error);
                return [];
            }
        }

        /**
         * Inisialisasi: memuat data hero ke dalam cache dan menambahkan event listener.
         */
        async function initializePage() {
            allHeroes = await loadHeroes();
            currentPhaseIndex = parseInt(localStorage.getItem("currentPhaseIndex")) || 0;
            updateDropdownState();

            for (let i = 1; i <= 20; i++) {
                const input = document.getElementById(`search-${i}`);
                const dropdown = document.getElementById(`dropdown-items-${i}`);
                if (input && dropdown) {
                    input.addEventListener('input', () => filterDropdown(i));
                    input.addEventListener('blur', () => hideDropdown(i));
                    // Muat hero yang sudah dipilih dari localStorage
                    const savedHero = localStorage.getItem(`selectedHero${i}`);
                    if (savedHero) {
                        input.value = getHeroName(savedHero);
                    }
                }
            }

            document.getElementById('correction').addEventListener('click', toggleCorrectionMode);
        }

        document.addEventListener('DOMContentLoaded', initializePage);

        /**
         * Mengatur status dropdown (enabled/disabled) berdasarkan fase saat ini atau mode correction.
         */
        function updateDropdownState() {
            for (let i = 1; i <= 20; i++) {
                const input = document.getElementById(`search-${i}`);
                if (input) {
                    input.disabled = !correctionMode; // Aktifkan semua jika correction mode
                }
            }

            if (!correctionMode && currentPhaseIndex < dropdownOrder.length) {
                const currentPhase = dropdownOrder[currentPhaseIndex];
                const dropdowns = Array.isArray(currentPhase.dropdown) ? currentPhase.dropdown : [currentPhase.dropdown];
                dropdowns.forEach(dropdownId => {
                    const input = document.getElementById(`search-${dropdownId.split('-')[1]}`);
                    if (input) {
                        input.disabled = false;
                    }
                });
            }
        }

        /**
         * Toggle mode correction untuk mengaktifkan/menonaktifkan semua dropdown.
         */
        function toggleCorrectionMode() {
            correctionMode = !correctionMode;
            const correctionButton = document.getElementById('correction');
            correctionButton.textContent = correctionMode ? 'Exit Correction' : 'Correction';
            updateDropdownState();
        }

        /**
         * Menyaring dan menampilkan dropdown berdasarkan input pengguna.
         */
        function filterDropdown(index) {
            let input = document.getElementById(`search-${index}`);
            let dropdown = document.getElementById(`dropdown-items-${index}`);
            let searchText = input.value.toLowerCase();

            if (allHeroes.length === 0) return;

            dropdown.innerHTML = "";

            if (searchText.length > 0) {
                const filteredHeroes = allHeroes.filter(hero => hero.name.toLowerCase().includes(searchText));

                if (filteredHeroes.length > 0) {
                    dropdown.style.display = "block";
                    filteredHeroes.forEach(hero => {
                        let option = document.createElement("div");
                        option.textContent = hero.name;
                        option.setAttribute("data-img", hero.img);
                        option.setAttribute("data-voice", hero.voice);
                        option.onclick = function() {
                            localStorage.setItem(`selectedHero${index}`, hero.img);
                            localStorage.setItem(`selectedVoice${index}`, hero.voice);
                            localStorage.setItem(`heroChanged${index}`, Date.now().toString()); // Tandai perubahan hero
                            input.value = hero.name;
                            dropdown.style.display = "none";
                            if (!correctionMode && isCurrentPhaseDropdown(index)) {
                                checkPhaseCompletion();
                            }
                        };
                        dropdown.appendChild(option);
                    });
                } else {
                    dropdown.style.display = "none";
                }
            } else {
                dropdown.style.display = "none";
            }
        }

        /**
         * Memeriksa apakah dropdown yang diisi adalah bagian dari fase saat ini.
         */
        function isCurrentPhaseDropdown(index) {
            if (currentPhaseIndex >= dropdownOrder.length) return false;
            const currentPhase = dropdownOrder[currentPhaseIndex];
            const dropdowns = Array.isArray(currentPhase.dropdown) ? currentPhase.dropdown : [currentPhase.dropdown];
            return dropdowns.includes(`dropdowns-${index}`);
        }

        /**
         * Memeriksa apakah fase saat ini telah selesai (semua dropdown diisi).
         */
        function checkPhaseCompletion() {
            if (currentPhaseIndex >= dropdownOrder.length) return;

            const currentPhase = dropdownOrder[currentPhaseIndex];
            const dropdowns = Array.isArray(currentPhase.dropdown) ? currentPhase.dropdown : [currentPhase.dropdown];
            
            const allFilled = dropdowns.every(dropdownId => {
                const idx = dropdownId.split('-')[1];
                return localStorage.getItem(`selectedHero${idx}`);
            });

            if (allFilled) {
                updateLocalStorage("nextPhase");
            }
        }

        /**
         * Menyembunyikan dropdown ketika input kehilangan fokus.
         */
        function hideDropdown(index) {
            setTimeout(() => {
                const dropdown = document.getElementById(`dropdown-items-${index}`);
                if (dropdown && !dropdown.contains(document.activeElement)) {
                    dropdown.style.display = 'none';
                }
            }, 200);
        }

        /**
         * Menukar hero antara dua slot yang dipilih.
         */
        function swapHeroes() {
            if (selected1 !== null && selected2 !== null) {
                let img1 = localStorage.getItem(`selectedHero${selected1}`);
                let img2 = localStorage.getItem(`selectedHero${selected2}`);
                let voice1 = localStorage.getItem(`selectedVoice${selected1}`);
                let voice2 = localStorage.getItem(`selectedVoice${selected2}`);

                if (img1 && img2) {
                    localStorage.setItem(`selectedHero${selected1}`, img2);
                    localStorage.setItem(`selectedHero${selected2}`, img1);
                    localStorage.setItem(`selectedVoice${selected1}`, voice2);
                    localStorage.setItem(`selectedVoice${selected2}`, voice1);
                    localStorage.setItem(`heroChanged${selected1}`, Date.now().toString());
                    localStorage.setItem(`heroChanged${selected2}`, Date.now().toString());
                    document.getElementById(`search-${selected1}`).value = getHeroName(img2);
                    document.getElementById(`search-${selected2}`).value = getHeroName(img1);
                }

                resetSelection();
            }
        }

        /**
         * Mendapatkan nama hero berdasarkan sumber gambar.
         */
        function getHeroName(imgSrc) {
            if (!imgSrc) return "";
            let hero = allHeroes.find(h => h.img === imgSrc);
            return hero ? hero.name : "";
        }

        /**
         * Memilih dropdown untuk proses swap.
         */
        function selectDropdown(index) {
            let button = document.querySelector(`#dropdowns-${index} .swap-button`);
            if (selected1 === null) {
                selected1 = index;
                button.classList.add("selected");
            } else if (selected2 === null && selected1 !== index) {
                selected2 = index;
                button.classList.add("selected");
                swapHeroes();
            } else {
                resetSelection();
            }
        }

        /**
         * Mereset seleksi.
         */
        function resetSelection() {
            if (selected1 !== null) {
                document.querySelector(`#dropdowns-${selected1} .swap-button`).classList.remove("selected");
            }
            if (selected2 !== null) {
                document.querySelector(`#dropdowns-${selected2} .swap-button`).classList.remove("selected");
            }
            selected1 = null;
            selected2 = null;
        }

        /**
         * Menghapus semua seleksi.
         */
        function clearSelections() {
            for (let i = 1; i <= 20; i++) {
                localStorage.removeItem(`selectedHero${i}`);
                localStorage.removeItem(`selectedVoice${i}`);
                localStorage.removeItem(`heroChanged${i}`);
                let input = document.getElementById(`search-${i}`);
                if (input) input.value = "";
            }
        }

        /**
         * Memperbarui localStorage untuk timer dan fase.
         */
        function updateLocalStorage(action) {
            let timer = parseInt(localStorage.getItem("timer")) || 45;
            let timerRunning = localStorage.getItem("timerRunning") === "true";

            if (action === "start" && !timerRunning) {
                localStorage.setItem("timerRunning", "true");
            } else if (action === "stop") {
                localStorage.setItem("timerRunning", "false");
            } else if (action === "nextPhase") {
                if (currentPhaseIndex < dropdownOrder.length) {
                    currentPhaseIndex++;
                    localStorage.setItem("currentPhaseIndex", currentPhaseIndex);
                    localStorage.setItem("timer", 60);
                    localStorage.setItem("timerRunning", currentPhaseIndex < dropdownOrder.length);
                    localStorage.setItem("resetTimerBar", "true");
                    updateDropdownState();
                }
            } else if (action === "reset") {
                currentPhaseIndex = 0;
                localStorage.setItem("currentPhaseIndex", 0);
                localStorage.setItem("timer", 60);
                localStorage.setItem("timerRunning", "false");
                localStorage.setItem("resetTimerBar", "true");
                correctionMode = false;
                document.getElementById('correction').textContent = 'Correction';
                updateDropdownState();
                clearSelections();
            }

            localStorage.setItem("updateTime", Date.now());
        }

        document.getElementById('start').addEventListener('click', () => updateLocalStorage("start"));
        document.getElementById('stop').addEventListener('click', () => updateLocalStorage("stop"));
        document.getElementById('nextPhase').addEventListener('click', () => updateLocalStorage("nextPhase"));
        document.getElementById('reset').addEventListener('click', () => updateLocalStorage("reset"));