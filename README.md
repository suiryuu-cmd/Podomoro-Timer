# Podomoro Timer

Proyek belajar untuk memahami dasar **React**, **TypeScript**, dan **Vite** dengan membuat timer Pomodoro sederhana.

## Fitur

- Timer fokus 25 menit
- Istirahat pendek 5 menit
- Istirahat panjang 15 menit setiap 4 siklus fokus
- Tombol mulai, jeda, dan reset
- Tampilan waktu dalam format `mm:ss`

## Teknologi

- React 19
- TypeScript
- Vite
- ESLint

## Menjalankan proyek

Pastikan [Node.js](https://nodejs.org/) sudah terpasang, lalu jalankan:

```bash
cd Podomoro-Timer
npm install
npm run dev
```


## Perintah yang tersedia

```bash
npm run dev    # menjalankan server pengembangan
npm run lint   # memeriksa kualitas kode
npm run build  # memeriksa TypeScript dan membuat build produksi
```

## Struktur singkat

```text
src/
├── components/  # tampilan timer dan tombol
├── hooks/       # hook interval React
├── utils/       # format waktu
└── App.tsx      # komponen aplikasi utama
```

## Catatan keamanan

Proyek ini tidak membutuhkan variabel environment atau API key. Jika nanti menambah layanan eksternal, simpan rahasia di file `.env` dan jangan pernah commit file tersebut.

## Lisensi

Proyek ini dibuat untuk keperluan belajar.
