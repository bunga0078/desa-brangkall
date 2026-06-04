/* =============================================
   DESA BRANGKAL — script.js
   Berisi 4 fitur utama:
   1. Ganti tema gelap/terang
   2. Tandai link navigasi aktif
   3. Animasi reveal saat scroll
   4. Toast selamat datang
   ============================================= */


/* ══════════════════════════════
   1. GANTI TEMA (Dark / Light)
   localStorage menyimpan pilihan tema,
   jadi kalau browser ditutup lalu dibuka lagi,
   tema yang dipilih tetap tersimpan.
══════════════════════════════ */
const themeBtn = document.getElementById('themeBtn');

// Cek apakah ada tema tersimpan di browser
if (localStorage.getItem('tema') === 'light') {
  document.body.classList.add('light');
  if (themeBtn) themeBtn.textContent = '🌙 Dark';
}

// Saat tombol diklik: toggle class 'light' di body
themeBtn?.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light');
  // Simpan pilihan ke localStorage
  localStorage.setItem('tema', isLight ? 'light' : 'dark');
  // Ganti teks tombol
  themeBtn.textContent = isLight ? '🌙 Dark' : '☀️ Light';
});


/* ══════════════════════════════
   2. NAVIGASI AKTIF
   Membandingkan nama file di URL dengan href setiap link.
   Contoh: URL = "profil.html" → link profil diberi class 'active'
══════════════════════════════ */
// Ambil nama file dari URL (misal: "galeri.html")
const halamanAktif = location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') === halamanAktif) {
    link.classList.add('active');
  }
});


/* ══════════════════════════════
   3. SCROLL REVEAL ANIMATION
   IntersectionObserver mengamati elemen dengan class 'reveal'.
   Saat elemen masuk area tampil (threshold 8%), tambahkan class 'visible'.
   CSS lalu menganimasikan elemen dari transparan → tampak.
══════════════════════════════ */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      // Jika elemen sedang terlihat di layar
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.08 }  // 8% elemen terlihat = mulai animasi
);

// Daftarkan semua elemen ber-class 'reveal' ke observer
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


/* ══════════════════════════════
   4. TOAST SELAMAT DATANG
   Hanya muncul di halaman index.html.
   Tampil 0.7 detik setelah halaman load,
   lalu menghilang setelah 3.2 detik.
══════════════════════════════ */
window.addEventListener('load', () => {
  const toast = document.getElementById('toast');
  if (!toast) return;  // kalau tidak ada elemen toast, berhenti

  // Tunda 700ms agar halaman sudah render dulu
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    // Setelah 3.2 detik, sembunyikan kembali
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
    }, 3200);
  }, 700);
});


/* ══════════════════════════════
   5. NAVBAR SHRINK SAAT SCROLL
   Saat halaman di-scroll lebih dari 80px,
   navbar mengecil sedikit lewat class 'scrolled'.
══════════════════════════════ */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  if (window.scrollY > 80) {
    navbar.style.padding = '.6rem 4rem';  // lebih tipis
  } else {
    navbar.style.padding = '.9rem 4rem';  // ukuran normal
  }
});