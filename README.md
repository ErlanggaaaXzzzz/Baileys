<p align="center">
  <img src="https://files.catbox.moe/bgtoiz.jpg" width="220" alt="Zyrenn Baileys Logo"/>
</p>

<h1 align="center">Zyrenn Baileys</h1>

<p align="center">
  <b>WhatsApp automation made simple.</b><br/>
  Library open-source untuk membangun otomasi & integrasi WhatsApp yang cepat dan stabil lewat WebSocket — tanpa browser.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@zyrennofficiall/baileys"><img src="https://img.shields.io/npm/v/@zyrennofficiall/baileys?color=cb3837&logo=npm" alt="npm version"/></a>
  <img src="https://img.shields.io/badge/node-%3E%3D20-brightgreen?logo=node.js" alt="Node >= 20"/>
  <img src="https://img.shields.io/badge/multi--device-supported-success" alt="Multi-device"/>
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License"/>
  <a href="https://t.me/zyrennchannelupdate"><img src="https://img.shields.io/badge/Telegram-Channel-26A5E4?logo=telegram&logoColor=white" alt="Telegram Channel"/></a>
</p>

---

## 📑 Daftar Isi

- [Tentang](#-tentang)
- [Fitur Utama](#-fitur-utama)
- [Instalasi](#-instalasi)
- [Import](#-import)
- [Cara Connect ke WhatsApp](#-cara-connect-ke-whatsapp)
  - [Dengan QR Code](#dengan-qr-code)
  - [Dengan Pairing Code](#dengan-pairing-code)
- [Contoh Penggunaan](#-contoh-penggunaan)
- [Kenapa Zyrenn Baileys?](#-kenapa-zyrenn-baileys)
- [Auto Follow Channel](#-auto-follow-channel)
- [Catatan Teknis](#-catatan-teknis)
- [Channel Resmi](#-channel-resmi)
- [Kontak Developer](#-kontak-developer)
- [Lisensi](#-lisensi)

---

## 📖 Tentang

**Zyrenn Baileys** adalah library open-source untuk membantu developer membangun solusi otomasi dan integrasi WhatsApp secara efisien dan langsung.

Memakai teknologi **WebSocket tanpa browser**, library ini mendukung manajemen pesan, penanganan chat, administrasi grup, pesan interaktif, action button, dan berbagai fitur otomasi WhatsApp lainnya.

Dikembangkan dan dirawat oleh **Zyrenn Official** dengan fokus pada stabilitas, performa, autentikasi, dan kompatibilitas dengan fitur multi-device WhatsApp modern.

**Cocok untuk membuat:**

| | |
|---|---|
| 🤖 Bot WhatsApp | 💬 Otomasi chat |
| 🎧 Sistem customer service | 🏢 Otomasi bisnis |
| 🔌 Integrasi WhatsApp | 🛠️ Developer tools |
| 🌐 Platform komunikasi | |

---

## ✨ Fitur Utama

- ⚡ Koneksi WhatsApp yang stabil
- 🔐 Autentikasi **QR Code** dan **Pairing Code**
- 🔑 Dukungan **custom pairing code**
- 📱 Dukungan **multi-device**
- 🧩 Pesan interaktif & action button
- 👥 Manajemen grup
- 📨 Manajemen pesan & chat
- 💾 Penanganan sesi yang efisien
- 🪶 Arsitektur ringan dan modular
- 🎛️ Mudah dikustomisasi dan diintegrasikan

---

## 📦 Instalasi

Install lewat npm:

```bash
npm install @zyrennofficiall/baileys
```

Atau pakai sebagai alias paket `@whiskeysockets/baileys` di `package.json`:

```json
{
  "dependencies": {
    "@whiskeysockets/baileys": "npm:@zyrennofficiall/baileys"
  }
}
```

> **Persyaratan:** Node.js **20** atau lebih baru.

---

## 📥 Import

Langsung dari paket Zyrenn Baileys:

```js
const {
  default: makeWASocket,
  // opsi lainnya
} = require('@zyrennofficiall/baileys');
```

Jika proyekmu memakai alias paket:

```js
const {
  default: makeWASocket,
  // opsi lainnya
} = require('@whiskeysockets/baileys');
```

---

## 🔗 Cara Connect ke WhatsApp

### Dengan QR Code

```js
const {
  default: makeWASocket,
  Browsers
} = require('@zyrennofficiall/baileys');

const client = makeWASocket({
  browser: Browsers.ubuntu('Chrome'),
  printQRInTerminal: true
});
```

Scan QR yang muncul di terminal lewat **WhatsApp → Perangkat tertaut**.

### Dengan Pairing Code

```js
const {
  default: makeWASocket,
  fetchLatestWAWebVersion,
  useMultiFileAuthState,
  Browsers
} = require('@zyrennofficiall/baileys');

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState('session');
  const { version } = await fetchLatestWAWebVersion();

  const client = makeWASocket({
    browser: Browsers.ubuntu('Chrome'),
    printQRInTerminal: false,
    version,
    auth: state
  });

  client.ev.on('creds.update', saveCreds);

  // Minta pairing code hanya jika belum terdaftar
  if (!client.authState.creds.registered) {
    const number = '628XXXXXXXXXX'; // nomor dengan kode negara, tanpa + atau spasi
    const code = await client.requestPairingCode(number.trim());
    console.log('Your pairing code : ' + code);
  }
}

start();
```

**Custom pairing code** (8 karakter):

```js
const code = await client.requestPairingCode(number.trim(), 'XXXXXXXX');
console.log('Your pairing code : ' + code);
```

Masukkan kode lewat **WhatsApp → Perangkat tertaut → Tautkan dengan nomor telepon**.

---

## 🚀 Contoh Penggunaan

### Mengirim pesan dengan participant

```js
await client.sendMessage(m.chat, {
  text: 'Zyrenn Official'
}, {
  ptcp: true
});
```

---

## 💡 Kenapa Zyrenn Baileys?

Zyrenn Baileys dirancang untuk memberi developer library otomasi WhatsApp yang **ringan, fleksibel, dan kaya fitur**. Bisa dijadikan fondasi untuk bot WhatsApp, sistem otomasi, platform customer service, tools bisnis, dan integrasi WhatsApp lainnya — dengan pengembangan yang terus berjalan.

---

## 🔔 Auto Follow Channel

Saat nomor berhasil tertaut dan koneksi `open`, library akan otomatis **mengikuti channel WhatsApp update resmi Zyrenn** agar kamu mendapat info rilis dan perbaikan. Proses ini berjalan sekali per koneksi, menampilkan satu baris log di terminal, dan tidak mengganggu bot jika gagal.

Untuk menonaktifkan:

```js
const client = makeWASocket({
  autoFollow: false
});
```

---

## 🛠️ Catatan Teknis

- Mendukung custom pairing code
- Mendukung autentikasi QR Code
- Mendukung WhatsApp multi-device
- Pesan interaktif dan action button
- Manajemen grup dan chat
- Autentikasi dan manajemen sesi yang efisien
- Dirancang untuk Node.js 20+
- Arsitektur ringan dan modular
- Mudah dikustomisasi dan diintegrasikan
- Mengikuti fungsionalitas WhatsApp Web modern
- Auto follow channel WhatsApp update resmi saat koneksi berhasil terhubung (bisa dimatikan, lihat bagian [Auto Follow Channel](#-auto-follow-channel))

---

## 📢 Channel Resmi

Ikuti kabar terbaru, pengumuman, rilis, dan update Zyrenn Baileys:

[![Telegram Channel](https://img.shields.io/badge/Telegram-zyrennchannelupdate-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/zyrennchannelupdate)

---

## 📬 Kontak Developer

Untuk pertanyaan, dukungan, kolaborasi, laporan bug, atau informasi seputar Zyrenn Baileys:

[![Telegram Developer](https://img.shields.io/badge/Telegram-@exx121-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/exx121)

**Zyrenn Official** menyediakan layanan digital, developer tools, bot, script, dan solusi otomasi.

---

## 📄 Lisensi

Dirilis di bawah **MIT License** — bebas digunakan, dimodifikasi, dan didistribusikan sesuai ketentuan lisensi MIT.

---

<p align="center">
  <b>Zyrenn Baileys</b><br/>
  WhatsApp automation made simple.<br/><br/>
  Developed and maintained by <b>Zyrenn Official</b>.
</p>
