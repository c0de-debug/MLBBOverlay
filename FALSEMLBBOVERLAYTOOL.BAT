@echo off
:: Mengubah warna teks di seluruh jendela command prompt menjadi ungu
color 5

:: Memberi judul pada jendela
title False Overlay Tool Launcher

echo.
echo ====================================================================
echo     INITIALIZING NODE.JS SERVER / MELAKUKAN INISIALISASI SERVER
echo ====================================================================
echo.

:: 1. Mencari alamat IPv4 yang aktif
echo [STEP 1] Finding active IPv4 address... / [LANGKAH 1] Mencari alamat IPv4 yang digunakan...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr "IPv4"') do (
    set IP_ADDRESS=%%a
)
:: Menghilangkan spasi di awal variabel IP_ADDRESS
set IP_ADDRESS=%IP_ADDRESS: =%

:: Cek apakah IP berhasil didapatkan
if not defined IP_ADDRESS (
    echo [FAILED] IPv4 address not found. Please ensure you are connected to a network.
    echo [GAGAL] Alamat IPv4 tidak ditemukan. Pastikan Anda terhubung ke jaringan.
    pause
    exit
)

echo [SUCCESS] IPv4 address found: %IP_ADDRESS% / [BERHASIL] Alamat IPv4 ditemukan: %IP_ADDRESS%
echo.

:: 2. Menimpa (replace) teks di dalam file /public/serverip.txt
echo [STEP 2] Saving IP address to public\serverip.txt... / [LANGKAH 2] Menyimpan alamat IP ke file...
echo %IP_ADDRESS% > public\serverip.txt
echo [SUCCESS] File has been updated. / [BERHASIL] File telah diperbarui.
echo.

:: Menambahkan jeda singkat agar server punya waktu untuk siap sebelum browser dibuka
echo Pausing for 2 seconds before opening browser... / Memberi jeda 2 detik sebelum membuka browser...
timeout /t 2 /nobreak > nul

:: 4. Membuka URL di browser (Dikerjakan sebelum server dimulai agar tidak memblokir)
echo [STEP 4] Opening URL in the default browser... / [LANGKAH 4] Membuka URL di browser default...
start http://%IP_ADDRESS%:3000/hub.html
echo.
echo Initialization complete. Clearing screen and starting server...
echo Inisialisasi selesai. Membersihkan layar dan menjalankan server...
timeout /t 2 /nobreak > nul

:: =================================================================
:: == BAGIAN YANG DIMODIFIKASI: Membersihkan layar dan menampilkan header ==
:: =================================================================

:: Membersihkan semua teks log inisialisasi di atas
cls

:: Menampilkan header kustom Anda
echo =========================================
echo ===========FALSE OVERLAY TOOL=============
echo =========================================
echo.
echo Please Read the readme ^| Tolong baca readme
echo.
echo =========================================
echo Server is running... Do not close this window!
echo Server sedang berjalan... Jangan tutup jendela ini!
echo =========================================
echo.


:: 3. Menjalankan server Node.js (output dari node akan muncul di bawah header)
node server.js

:: =================================================================
:: == BAGIAN BARU: Cek jika Node.js gagal dijalankan ==
:: =================================================================

:: Perintah "if errorlevel 1" akan dijalankan HANYA JIKA perintah sebelumnya (node server.js) gagal.
if errorlevel 1 (
    echo.
    echo =========================================
    echo [ERROR] Server failed to start.
    echo [GALAT] Server gagal dijalankan.
    echo.
    echo check your node.js
    echo =========================================
    echo.
    pause
)