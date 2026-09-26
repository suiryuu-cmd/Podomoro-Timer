# Pomodoro Timer

Proyek belajar untuk memahami dasar **React**, **TypeScript**, dan **Vite** dengan membuat timer Pomodoro sederhana.

## Fitur

- Timer fokus 25 menit, istirahat pendek 5 menit, dan istirahat panjang 15 menit setiap 4 sesi fokus
- Tombol mulai, jeda, lanjut, dan reset. Label tombol menyesuaikan keadaan (Start Focus, Start Break, Resume, Pause)
- Cincin progres berbezel ala jam, dengan warna berbeda untuk tiap fase
- Penanda sesi selesai ("2 of 4 sessions done")
- Sisa waktu tampil di judul tab browser
- Bunyi lonceng saat fase selesai, bisa di-mute
- Tema terang dan gelap mengikuti pengaturan sistem
- Bisa dipakai dengan keyboard, dan animasi mengikuti pengaturan `prefers-reduced-motion`

## Teknologi

- React 19
- TypeScript
- Vite
- ESLint

## Menjalankan proyek

Pastikan [Node.js](https://nodejs.org/) versi 20.19 ke atas (atau 22.13 ke atas) sudah terpasang, lalu jalankan:

```bash
git clone https://github.com/suiryuu-cmd/Podomoro-Timer.git
cd Podomoro-Timer
npm install
npm run dev
```

Buka alamat yang ditampilkan Vite di browser (biasanya `http://localhost:5173`).

## Perintah yang tersedia

```bash
npm run dev    # menjalankan server pengembangan
npm run lint   # memeriksa kualitas kode
npm run build  # memeriksa TypeScript dan membuat build produksi
```

## Struktur singkat

```text
src/
├── components/  # komponen PomodoroTimer dan ikon SVG
├── hooks/       # hook interval React
├── utils/       # format waktu dan bunyi lonceng (Web Audio)
├── App.tsx      # komponen aplikasi utama
└── index.css    # seluruh style, termasuk tema terang dan gelap
```

## Catatan keamanan

Proyek ini tidak membutuhkan variabel environment atau API key. Jika nanti menambah layanan eksternal, simpan rahasia di file `.env` dan jangan pernah commit file tersebut.

## Lisensi

Proyek ini dibuat untuk keperluan belajar.
