/**
 * ==========================================================================
 * MESIN GAME: THE CRIMSON BYPASS (VANILLA ENGINE)
 * ==========================================================================
 * Menangani:
 * 1. Pergerakan senter (Flashlight tracking) via mouse dan touch
 * 2. Pacing pencetakan teks baris-demi-baris (Ztul style)
 * 3. Logika alur cerita bercabang
 * 4. Penanganan audio latar belakang & efek suara secara mulus
 */

// State Game
let currentSceneId = "OpeningScene1";
let currentLineIndex = 0;
let isTextPrinting = false;
let currentBGM = null;

// DOM Elements
const introScreen = document.getElementById("intro-screen");
const storyScreen = document.getElementById("story-screen");
const startButton = document.getElementById("start-button");
const sceneHeader = document.getElementById("scene-header");
const textContainer = document.getElementById("text-container");
const choicesContainer = document.getElementById("choices-container");
const storyWrapper = document.getElementById("story-wrapper");

// ==========================================================================
// 1. MOUSE & TOUCH TRACKER: EFEK SENTER (FLASHLIGHT)
// ==========================================================================
function updateFlashlightPosition(x, y) {
    document.documentElement.style.setProperty('--mouse-x', `${x}px`);
    document.documentElement.style.setProperty('--mouse-y', `${y}px`);
}

window.addEventListener('mousemove', (e) => {
    updateFlashlightPosition(e.clientX, e.clientY);
});

window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateFlashlightPosition(touch.clientX, touch.clientY);
    }
});

// ==========================================================================
// 2. AUDIO ENGINE
// ==========================================================================
const AudioEngine = {
    playBGM: function(src, volume = 0.5) {
        // Jika lagu yang sama sudah diputar, jangan diputar ulang dari awal, cukup update volume
        if (currentBGM && currentBGM.dataset.src === src) {
            currentBGM.volume = volume;
            return;
        }

        this.stopBGM();

        currentBGM = new Audio(src);
        currentBGM.dataset.src = src;
        currentBGM.volume = volume;
        currentBGM.loop = true;
        currentBGM.play().catch(e => {
            console.log("Audio autoplay ditolak browser. Butuh klik interaksi pertama.");
        });
    },

    stopBGM: function() {
        if (currentBGM) {
            currentBGM.pause();
            currentBGM = null;
        }
    },

    playSFX: function(src, volume = 1.0) {
        const sfx = new Audio(src);
        sfx.volume = volume;
        sfx.play().catch(e => console.log("Gagal memutar SFX: " + e));
    }
};

// ==========================================================================
// 3. NARRATIVE SYSTEM (CORE ENGINE)
// ==========================================================================

// Fungsi memicu transisi visual Body berdasarkan tag scene
function updateSceneVisuals(bgTag) {
    // Reset kelas latar belakang body yang ada
    document.body.className = "";
    
    if (!bgTag) return;

    // Tambahkan kelas baru berdasarkan scene tag
    document.body.classList.add(bgTag);

    // Efek khusus flash warna merah
    if (bgTag === "red-screen") {
        document.body.style.animation = "none";
        void document.body.offsetWidth; // Trigger reflow
        document.body.style.animation = "blood-flash 0.8s ease-out";
    }
}

// Menampilkan Scene baru
function loadScene(sceneId) {
    currentSceneId = sceneId;
    const scene = storyData[sceneId];
    
    if (!scene) {
        console.error(`Error: Scene ID "${sceneId}" tidak ditemukan di storyData!`);
        return;
    }

    // Reset status teks & pilihan
    currentLineIndex = 0;
    textContainer.innerHTML = "";
    choicesContainer.innerHTML = "";
    choicesContainer.classList.remove("visible");
    choicesContainer.classList.add("hidden");

    // Mengaktifkan/menonaktifkan efek senter kursor berdasarkan properti scene
    if (scene.flashlight) {
        document.body.classList.add("flashlight-active");
    } else {
        document.body.classList.remove("flashlight-active");
    }

    // Visuals & Audio
    updateSceneVisuals(scene.bgTag);
    if (scene.audio) {
        if (scene.audio.action === "playBGM") {
            AudioEngine.playBGM(scene.audio.src, scene.audio.volume);
        } else if (scene.audio.action === "playSFX") {
            AudioEngine.playSFX(scene.audio.src, scene.audio.volume);
        }
    }

    // Header Scene
    if (scene.title) {
        sceneHeader.textContent = scene.title;
        sceneHeader.classList.remove("hidden");
    } else {
        sceneHeader.classList.add("hidden");
    }

    // Tampilkan paragraf pertama
    isTextPrinting = true;
    printNextLine();
}

// Helper function: Memilih satu kata acak secara aman dalam teks HTML dan melapisinya dengan span interaktif
function makeRandomWordInteractive(htmlText) {
    // 1. Amankan tag HTML agar tidak terpotong (seperti <span>, <strong>, <blockquote>, dll.)
    const tags = [];
    let protectedText = htmlText.replace(/(<[^>]+>)/g, (match) => {
        tags.push(match);
        return `___TAG_PLACEHOLDER_${tags.length - 1}___`;
    });

    // 2. Cari kata-kata normal alfabet (panjang 4-12 huruf) yang bukan bagian dari tag
    const wordRegex = /\b[a-zA-Z]{4,12}\b/g;
    const matches = [];
    let match;
    
    while ((match = wordRegex.exec(protectedText)) !== null) {
        if (!match[0].startsWith("___TAG_PLACEHOLDER_")) {
            matches.push({
                word: match[0],
                index: match.index
            });
        }
    }

    // 3. Jika ditemukan kata yang cocok, acak satu kata untuk dibuat interaktif
    if (matches.length > 0) {
        const randomMatch = matches[Math.floor(Math.random() * matches.length)];
        const targetWord = randomMatch.word;
        const wordStart = randomMatch.index;
        const wordEnd = wordStart + targetWord.length;

        protectedText = 
            protectedText.substring(0, wordStart) + 
            `<span class="interactive-word">${targetWord}</span>` + 
            protectedText.substring(wordEnd);
    } else {
        // Fallback jika tidak ada kata normal (misal teks suara pendek): sisipkan panah interaktif di akhir
        protectedText += ` <span class="interactive-word">>>></span>`;
    }

    // 4. Kembalikan tag HTML asli ke posisinya semula
    for (let i = 0; i < tags.length; i++) {
        protectedText = protectedText.replace(`___TAG_PLACEHOLDER_${i}___`, tags[i]);
    }

    return protectedText;
}

// Menampilkan baris teks berikutnya secara interaktif
function printNextLine() {
    const scene = storyData[currentSceneId];
    if (!scene || currentLineIndex >= scene.text.length) {
        isTextPrinting = false;
        showChoices();
        return;
    }

    // Mengambil naskah kalimat saat ini (bisa berupa string atau object kustom)
    const lineData = scene.text[currentLineIndex];
    let lineText = "";
    let playLineSFX = null;
    let sfxVolume = 1.0;
    let isSlow = false;

    if (typeof lineData === "object" && lineData !== null) {
        lineText = lineData.text;
        if (lineData.sfx) {
            playLineSFX = lineData.sfx;
            sfxVolume = lineData.sfxVolume || 1.0;
        }
        if (lineData.slowFade) {
            isSlow = true;
        }
    } else {
        lineText = lineData;
    }

    // Lapisi satu kata acak dengan elemen interaktif agar bisa diklik (Ztul style)
    const processedText = makeRandomWordInteractive(lineText);

    // Membuat elemen paragraf baru
    const p = document.createElement("p");
    p.innerHTML = processedText;

    // Menetapkan secara tegas kolom kiri (story-p-left) atau kolom kanan (story-p-right)
    // Kalimat PERTAMA di setiap awal adegan/judul (currentLineIndex === 0) akan SELALU MULAI DARI KIRI demi kerapian struktur pembuka
    let alignmentClass = "";
    if (currentLineIndex === 0) {
        alignmentClass = "story-p-left";
    } else {
        // Kalimat-kalimat selanjutnya diacak secara seimbang 50/50 antara kiri dan kanan
        alignmentClass = Math.random() < 0.5 ? "story-p-right" : "story-p-left";
    }

    // Tambahkan kelas kustom lambat jika diaktifkan
    if (isSlow) {
        p.className = `${alignmentClass} slow-fade`;
    } else {
        p.className = alignmentClass;
    }

    textContainer.appendChild(p);

    // Memicu scroll otomatis ke bawah agar player tidak perlu scroll manual
    storyWrapper.scrollTop = storyWrapper.scrollHeight;

    // Putar SFX baris secara instan jika ada
    if (playLineSFX) {
        AudioEngine.playSFX(playLineSFX, sfxVolume);
    }

    // Trigger transisi fade-in
    setTimeout(() => {
        p.classList.add("visible");
        storyWrapper.scrollTop = storyWrapper.scrollHeight;
        
        // Cari span kata interaktif yang baru saja disuntikkan
        const interactiveSpan = p.querySelector(".interactive-word");
        if (interactiveSpan) {
            // Mencegah klik ganda saat transisi sedang berjalan
            isTextPrinting = true;
            
            interactiveSpan.addEventListener("click", (e) => {
                e.stopPropagation(); // Mencegah penyebaran event
                
                // Putar SFX saat kata interaktif diklik jika dikonfigurasi
                if (typeof lineData === "object" && lineData !== null && lineData.clickSfx) {
                    AudioEngine.playSFX(lineData.clickSfx, lineData.clickSfxVolume || 1.0);
                }

                // Ubah status kata menjadi telah diklik (berubah warna abu-abu & mati kliknya)
                interactiveSpan.classList.add("clicked");
                isTextPrinting = false;
                
                // Naikkan indeks baris dan cetak baris berikutnya
                currentLineIndex++;
                printNextLine();
            });
        } else {
            // Pengaman otomatis jika tidak ada elemen klik, cetak otomatis setelah jeda singkat
            currentLineIndex++;
            isTextPrinting = false;
            setTimeout(printNextLine, 1200);
        }
    }, 100);
}

// Menampilkan tombol pilihan cabang cerita
function showChoices() {
    const scene = storyData[currentSceneId];
    if (!scene || !scene.choices || scene.choices.length === 0) return;

    choicesContainer.innerHTML = "";
    choicesContainer.classList.remove("hidden");
    
    scene.choices.forEach(choice => {
        const button = document.createElement("button");
        button.className = "choice-button";
        button.innerHTML = choice.text;
        
        button.addEventListener("click", (e) => {
            e.stopPropagation(); // Mencegah klik menyebar ke pengetikan teks
            
            // Putar SFX jika ada
            if (choice.sfx) {
                AudioEngine.playSFX(choice.sfx, 0.7);
            }
            
            // Intersepsi tombol "Try Again" untuk kembali ke menu utama dan mereset permainan
            if (choice.text === "Try Again") {
                // Hentikan audio ambient soundscape secara instan
                AudioEngine.stopBGM();
                
                // Sembunyikan layar cerita dan tampilkan kembali intro menu utama
                storyScreen.classList.add("hidden");
                introScreen.classList.remove("hidden");
                
                // Nyalakan kembali video glitch menu utama (dalam keadaan senyap/muted)
                const video = document.getElementById("intro-bg-video");
                if (video) {
                    video.muted = true;
                    video.currentTime = 0;
                    video.play().catch(err => console.log("Gagal memutar ulang video menu:", err));
                }
                
                // Daftarkan ulang pendengar klik sekali untuk mengaktifkan suara video glitch
                document.addEventListener("click", () => {
                    const video = document.getElementById("intro-bg-video");
                    if (video && video.muted) {
                        video.muted = false;
                        video.play().catch(err => console.log(err));
                    }
                }, { once: true });
                
                return; // Selesai, hentikan pemuatan scene agar tidak langsung restart di story screen
            }
            
            // Pindah Scene
            loadScene(choice.nextScene);
        });

        choicesContainer.appendChild(button);
    });

    setTimeout(() => {
        choicesContainer.classList.add("visible");
        storyWrapper.scrollTop = storyWrapper.scrollHeight;
    }, 200);
}

// ==========================================================================
// 4. GAME START TRIGGER & AUDIO UNMUTE (PENTING: UNTUK ATURAN AUTOPLAY BROWSER)
// ==========================================================================

// Mengaktifkan suara video glitch pada interaksi klik pertama di layar (Mengakomodasi Autoplay Policy Browser)
document.addEventListener("click", () => {
    const video = document.getElementById("intro-bg-video");
    if (video && video.muted) {
        video.muted = false;
        // Memicu play ulang untuk memastikan sinkronisasi suara
        video.play().catch(e => console.log("Gagal memutar audio video: ", e));
    }
}, { once: true });

startButton.addEventListener("click", () => {
    // Menghentikan video glitch latar belakang sepenuhnya agar suaranya mati total
    const video = document.getElementById("intro-bg-video");
    if (video) {
        video.pause();
    }

    // 1. Sembunyikan layar menu utama
    introScreen.classList.add("hidden");
    
    // 2. Tampilkan layar sinematik (gambar jalan pulang) secara perlahan (fade-in)
    const cinematicScreen = document.getElementById("cinematic-screen");
    cinematicScreen.classList.remove("hidden");
    
    // Mulai putar musik latar belakang (ambient soundscape baru) untuk membangun atmosfer horor
    AudioEngine.playBGM("audio/audiopapkin-ambient-soundscape-ps-001-344715.mp3", 0.4);

    setTimeout(() => {
        cinematicScreen.classList.add("active");
    }, 50);

    // 3. Tambahkan event listener sekali klik di mana saja pada layar sinematik untuk melanjutkan
    cinematicScreen.addEventListener("click", () => {
        // Efek transisi memudar perlahan ke hitam (fade-out)
        cinematicScreen.classList.remove("active");
        
        // Jeda waktu menunggu layar sinematik selesai memudar ke hitam (2.5 detik)
        setTimeout(() => {
            cinematicScreen.classList.add("hidden");
            storyScreen.classList.remove("hidden");
            
            // Masuk ke Scene 1 utama game
            loadScene("OpeningScene1");
        }, 2500);
    }, { once: true });
});

// Tambahkan CSS khusus untuk animasi flash darah di body lewat JS
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes blood-flash {
    0% { background-color: var(--crimson); }
    100% { background-color: var(--bg-color); }
}
.red-screen {
    background-color: #100000 !important;
}
.crimson-pulse {
    animation: pulse-bg 4s infinite alternate;
}
@keyframes pulse-bg {
    0% { background-color: #030303; }
    100% { background-color: #1c0202; }
}
.dark-flicker {
    animation: flicker-bg 0.3s infinite;
}
@keyframes flicker-bg {
    0% { background-color: #030303; }
    50% { background-color: #0c0c0c; }
    100% { background-color: #010101; }
}
`;
document.head.appendChild(styleSheet);
