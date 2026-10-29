/* Data toko GANCI. Ganti nomor WA, produk, dan harga di sini. */
window.STORE = {
  nama: "GANCI",
  wa: "6281234567890", // dummy, ganti dengan nomor WA toko
  kodePrefix: "GNC",
  kunciSimpan: "ganci-keranjang",
  logoHTML: `<img src="img/logo.svg" alt="" width="44" height="44"><span>GANCI</span>`,
  teksTambah: "Masukin keranjang",
  teksKosong: "Keranjangmu masih kosong. Kunci di rumah pasti kesepian.",
  catatanOngkir: "Ongkir dihitung admin setelah alamat masuk. Beli 5 ganci, gratis 1 (pilih sendiri).",
  kurir: ["J&T Express", "JNE Reguler", "SiCepat", "Shopee Xpress", "Ambil di Salatiga"],
  bayar: ["QRIS", "Transfer BCA", "Transfer BRI", "DANA / GoPay"],
  nav: [
    ["Katalog", "index.html#koleksi"],
    ["Ganci nama", "index.html#nama"],
    ["Tentang", "tentang.html", "tentang"],
    ["Kebijakan", "kebijakan.html", "kebijakan"],
    ["Kontak", "kontak.html", "kontak"],
  ],
  footer: {
    tagline: "Gantungan kunci akrilik buat kunci, tas, dan dompet.",
    alamat: "Jl. Hasanudin No. 17, Mangunsari, Kota Salatiga 50721",
    nib: "2810260045517",
    sosmed: [["Instagram @ganci.id", "https://instagram.com/"], ["TikTok @ganci.id", "https://tiktok.com/"]],
  },
  produk: [
    {
      id: "es-teh", nama: "Es Teh Jumbo", harga: 18000, foto: "img/es-teh.svg", label: "Paling laris",
      ringkas: "Segelas es teh yang nggak bakal tumpah di tas.",
      deskripsi: "Buat kamu yang tiap siang mampir ke gerobak es teh. Akrilik bening 3 mm, dicetak UV di dua sisi, jadi depan-belakang sama bagusnya.",
      spek: [["Ukuran", "4,5 × 6 cm"], ["Bahan", "Akrilik 3 mm, cetak UV 2 sisi"], ["Ring", "Stainless, anti karat"]],
      varian: { label: "Pilih ring", opsi: ["Ring silver", "Ring gold", "Tali lanyard"], warna: ["#C9CED6", "#E2B84B", "#FF6FB5"] },
    },
    {
      id: "kucing-oren", nama: "Kucing Oren", harga: 20000, foto: "img/kucing-oren.svg",
      ringkas: "Si oren yang kelakuannya kita semua sudah tahu.",
      deskripsi: "Mukanya kalem, aslinya bar-bar. Dicetak di akrilik tebal dengan pinggiran putih, cocok digantung di resleting tas.",
      spek: [["Ukuran", "5,5 × 5 cm"], ["Bahan", "Akrilik 3 mm, cetak UV 2 sisi"], ["Ring", "Stainless, anti karat"]],
      varian: { label: "Pilih ring", opsi: ["Ring silver", "Ring gold", "Tali lanyard"], warna: ["#C9CED6", "#E2B84B", "#FF6FB5"] },
    },
    {
      id: "tahu-bulat", nama: "Tahu Bulat", harga: 15000, foto: "img/tahu-bulat.svg",
      ringkas: "Digoreng dadakan, lima ratusan... eh, lima belas ribu.",
      deskripsi: "Bulat sempurna, lengkap dengan uap panasnya. Ukurannya pas buat kunci motor, nggak terlalu berat waktu dimasukkan saku.",
      spek: [["Ukuran", "5 × 5 cm"], ["Bahan", "Akrilik 3 mm, cetak UV 2 sisi"], ["Ring", "Stainless, anti karat"]],
      varian: { label: "Pilih ring", opsi: ["Ring silver", "Ring gold", "Tali lanyard"], warna: ["#C9CED6", "#E2B84B", "#FF6FB5"] },
    },
    {
      id: "sandal-jepit", nama: "Sandal Jepit", harga: 15000, foto: "img/sandal-jepit.svg",
      ringkas: "Satu-satunya sandal yang nggak bakal ketuker di masjid.",
      deskripsi: "Dengan tulisan peringatan yang sangat penting. Kalau yang asli sering hilang, setidaknya yang ini aman di ring kunci.",
      spek: [["Ukuran", "3,5 × 6,5 cm"], ["Bahan", "Akrilik 3 mm, cetak UV 2 sisi"], ["Ring", "Stainless, anti karat"]],
      varian: { label: "Pilih ring", opsi: ["Ring silver", "Ring gold", "Tali lanyard"], warna: ["#C9CED6", "#E2B84B", "#FF6FB5"] },
    },
    {
      id: "cilok", nama: "Cilok Bumbu Kacang", harga: 18000, foto: "img/cilok.svg",
      ringkas: "Tiga butir, saus kacang, sedikit cabai. Sempurna.",
      deskripsi: "Bentuknya panjang, enak dijadikan penanda kunci kos supaya nggak ketuker sama kunci rumah. Tidak bisa dimakan, sudah kami coba.",
      spek: [["Ukuran", "2,5 × 7 cm"], ["Bahan", "Akrilik 3 mm, cetak UV 2 sisi"], ["Ring", "Stainless, anti karat"]],
      varian: { label: "Pilih ring", opsi: ["Ring silver", "Ring gold", "Tali lanyard"], warna: ["#C9CED6", "#E2B84B", "#FF6FB5"] },
    },
    {
      id: "ganci-nama", nama: "Ganci Nama", harga: 25000, foto: "img/ganci-nama.svg", label: "Custom",
      ringkas: "Tulis namamu, nama doi, atau nama motor kesayangan.",
      deskripsi: "Kamu yang tentukan tulisannya, maksimal 12 huruf. Warna dasar pink dengan tulisan putih bergaris tebal. Proses 1 hari kerja sebelum dikirim.",
      spek: [["Ukuran", "5 × 5,5 cm"], ["Bahan", "Akrilik 3 mm, cetak UV 2 sisi"], ["Proses", "+1 hari kerja"]],
      custom: { label: "Tulisan (maks. 12 huruf)", max: 12, placeholder: "mis. NAYLA" },
      varian: { label: "Pilih ring", opsi: ["Ring silver", "Ring gold", "Tali lanyard"], warna: ["#C9CED6", "#E2B84B", "#FF6FB5"] },
    },
  ],
  /* animasi kecil saat barang masuk keranjang */
  saatTambah(p, kartu) {
    const img = kartu?.querySelector(".card-img img");
    if (!img) return;
    img.classList.remove("jingle"); void img.offsetWidth; img.classList.add("jingle");
  },
};
