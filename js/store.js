/* =========================================================
   Mesin toko: katalog, detail produk, keranjang, checkout WA.
   Semua data toko ada di js/data.js (window.STORE).
   ========================================================= */
(() => {
const S = window.STORE;
const rupiah = (n) => "Rp" + n.toLocaleString("id-ID");
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const cari = (id) => S.produk.find((p) => p.id === id);
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ---------- keranjang ---------- */
const KEY = S.kunciSimpan;
let cart = [];
try { cart = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { cart = []; }
cart = cart.filter((i) => cari(i.id));
const simpan = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} };
const jumlah = () => cart.reduce((a, i) => a + i.qty, 0);
const total = () => cart.reduce((a, i) => a + cari(i.id).harga * i.qty, 0);

function tambah(id, varian = "", teks = "", qty = 1, asal = null) {
  const p = cari(id);
  if (!varian && p.varian) varian = p.varian.opsi[0];
  const kunci = `${id}|${varian}|${teks}`;
  const ada = cart.find((i) => i.kunci === kunci);
  if (ada) ada.qty += qty; else cart.push({ kunci, id, varian, teks, qty });
  simpan(); render();
  toast(`${p.nama}${teks ? ` “${teks}”` : ""} masuk keranjang`);
  const c = $(".cart-count"); c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump");
  if (S.saatTambah) S.saatTambah(p, asal);
}
function ubah(kunci, d) {
  const i = cart.find((x) => x.kunci === kunci);
  if (!i) return;
  i.qty += d;
  if (i.qty <= 0) cart = cart.filter((x) => x.kunci !== kunci);
  simpan(); render();
}

/* ---------- kerangka halaman ---------- */
function kerangka() {
  const hal = document.body.dataset.page;
  const nav = S.nav.map(([t, h, k]) => `<a href="${h}"${k === hal ? ' aria-current="page"' : ""}>${t}</a>`).join("");
  document.body.insertAdjacentHTML("afterbegin", `
    <a class="skip" href="#isi">Langsung ke isi</a>
    <header class="top">
      <a class="brand" href="index.html" aria-label="${S.nama}, ke beranda">${S.logoHTML}</a>
      <nav class="nav" aria-label="Menu utama">${nav}</nav>
      <button class="cart-btn" type="button" aria-controls="drawer" aria-expanded="false">
        <span class="cart-label">Keranjang</span><span class="cart-count" aria-live="polite">0</span>
      </button>
    </header>
    <nav class="mnav" aria-label="Menu">${nav}</nav>`);

  const f = S.footer;
  document.body.insertAdjacentHTML("beforeend", `
    <footer class="foot">
      <div class="foot-grid">
        <div class="foot-id">
          <p class="foot-brand">${S.nama}</p>
          <p>${f.tagline}<br>${f.alamat}</p>
          <p class="legal">NIB ${f.nib}</p>
        </div>
        <div><p class="foot-h">Belanja</p>
          <a href="index.html#koleksi">Katalog</a>
          <a href="kebijakan.html#bayar">Cara pembayaran</a>
          <a href="kebijakan.html#kirim">Pengiriman</a>
        </div>
        <div><p class="foot-h">Bantuan</p>
          <a href="kebijakan.html#retur">Retur &amp; refund</a>
          <a href="kebijakan.html#privasi">Privasi</a>
          <a href="tentang.html">Tentang kami</a>
          <a href="kontak.html">Kontak</a>
        </div>
        <div><p class="foot-h">Ikuti</p>
          ${f.sosmed.map(([t, h]) => `<a href="${h}" target="_blank" rel="noopener">${t}</a>`).join("")}
          <a href="https://wa.me/${S.wa}" target="_blank" rel="noopener">WhatsApp admin</a>
        </div>
      </div>
      <p class="copy">© 2026 ${S.nama}. Website rancangan tugas kuliah; data toko bersifat contoh.</p>
    </footer>
    <div class="scrim" hidden></div>
    <aside id="drawer" class="drawer" aria-label="Keranjang belanja" aria-hidden="true">
      <div class="drawer-head"><h2>Keranjang</h2><button class="x" type="button" aria-label="Tutup keranjang">×</button></div>
      <div class="drawer-body"></div>
    </aside>
    <dialog id="detail" class="detail" aria-labelledby="detail-nama"></dialog>
    <div class="toast" role="status" aria-live="polite"></div>`);

  $(".cart-btn").addEventListener("click", buka);
  $(".drawer .x").addEventListener("click", tutup);
  $(".scrim").addEventListener("click", tutup);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") tutup(); });
}
function buka() {
  $(".drawer").classList.add("open"); $(".drawer").setAttribute("aria-hidden", "false");
  $(".cart-btn").setAttribute("aria-expanded", "true"); $(".scrim").hidden = false;
  document.body.style.overflow = "hidden"; setTimeout(() => $(".drawer .x").focus(), 50);
}
function tutup() {
  if (!$(".drawer")?.classList.contains("open")) return;
  $(".drawer").classList.remove("open"); $(".drawer").setAttribute("aria-hidden", "true");
  $(".cart-btn").setAttribute("aria-expanded", "false"); $(".scrim").hidden = true;
  document.body.style.overflow = ""; $(".cart-btn").focus();
}
let tt;
function toast(m) {
  const t = $(".toast"); t.textContent = m; t.classList.add("show");
  clearTimeout(tt); tt = setTimeout(() => t.classList.remove("show"), 2400);
}

/* ---------- isi keranjang ---------- */
function render() {
  $(".cart-count").textContent = jumlah();
  const body = $(".drawer-body");
  if (!cart.length) {
    body.innerHTML = `<div class="empty"><p>${S.teksKosong}</p><a class="btn" href="index.html#koleksi">Lihat katalog</a></div>`;
    $("a", body).addEventListener("click", tutup);
    return;
  }
  body.innerHTML = `
    <ul class="lines">${cart.map((i) => {
      const p = cari(i.id);
      return `<li class="line">
        <img src="${p.foto}" alt="" width="64" height="64">
        <div><p class="line-nama">${p.nama}</p>
          <p class="line-var">${[i.varian, i.teks && `tulisan “${esc(i.teks)}”`].filter(Boolean).join(" · ")}</p>
          <div class="qty" role="group" aria-label="Jumlah ${p.nama}">
            <button type="button" data-k="${esc(i.kunci)}" data-d="-1" aria-label="Kurangi">−</button><span>${i.qty}</span>
            <button type="button" data-k="${esc(i.kunci)}" data-d="1" aria-label="Tambah">+</button>
          </div></div>
        <p class="line-harga">${rupiah(p.harga * i.qty)}</p></li>`;
    }).join("")}</ul>
    <div class="sum"><p><span>Subtotal</span><strong>${rupiah(total())}</strong></p><p class="note">${S.catatanOngkir}</p></div>
    <form class="checkout" novalidate>
      <h3>Data pengiriman</h3>
      <label>Nama penerima<input name="nama" autocomplete="name"></label>
      <label>No. WhatsApp<input name="hp" inputmode="tel" autocomplete="tel" placeholder="08xxxxxxxxxx"></label>
      <label>Alamat lengkap<textarea name="alamat" rows="2" autocomplete="street-address" placeholder="Jalan, RT/RW, kelurahan, kecamatan, kota, kode pos"></textarea></label>
      <label>Kurir<select name="kurir">${S.kurir.map((k) => `<option>${k}</option>`).join("")}</select></label>
      <label>Bayar lewat<select name="bayar">${S.bayar.map((k) => `<option>${k}</option>`).join("")}</select></label>
      <p class="err" role="alert"></p>
      <button class="btn btn-wide" type="submit">Kirim pesanan lewat WhatsApp</button>
      <p class="note">Data kamu hanya dipakai untuk pengiriman. Baca <a href="kebijakan.html#privasi">kebijakan privasi</a>.</p>
    </form>`;
  $$(".qty button", body).forEach((b) => b.addEventListener("click", () => ubah(b.dataset.k, +b.dataset.d)));
  $(".checkout", body).addEventListener("submit", kirim);
}
function kirim(e) {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target));
  const err = $(".err", e.target);
  if (!d.nama.trim() || !d.hp.trim() || !d.alamat.trim()) {
    err.textContent = "Nama, nomor WhatsApp, dan alamat wajib diisi supaya paket bisa dikirim."; return;
  }
  err.textContent = "";
  const kode = S.kodePrefix + "-" + Date.now().toString(36).slice(-5).toUpperCase();
  const baris = cart.map((i) => {
    const p = cari(i.id);
    const ket = [i.varian, i.teks && `tulisan "${i.teks}"`].filter(Boolean).join(", ");
    return `- ${p.nama}${ket ? ` (${ket})` : ""} x${i.qty} = ${rupiah(p.harga * i.qty)}`;
  });
  const pesan = `Halo ${S.nama}, saya mau pesan.\nKode: ${kode}\n\n${baris.join("\n")}\n\nSubtotal: ${rupiah(total())}\nKurir: ${d.kurir}\nBayar: ${d.bayar}\n\nNama: ${d.nama}\nWA: ${d.hp}\nAlamat: ${d.alamat}`;
  window.open(`https://wa.me/${S.wa}?text=${encodeURIComponent(pesan)}`, "_blank", "noopener");
  toast(`Pesanan ${kode} dibuka di WhatsApp`);
}

/* ---------- katalog ---------- */
function katalog() {
  const grid = $("#grid");
  if (!grid) return;
  grid.innerHTML = S.produk.map((p, n) => `
    <article class="card" data-id="${p.id}" style="--n:${n}">
      ${p.label ? `<span class="badge">${p.label}</span>` : ""}
      <button class="card-img" type="button" data-open="${p.id}" aria-label="Lihat detail ${p.nama}">
        <img src="${p.foto}" alt="${p.alt || p.nama}" width="600" height="600" loading="lazy">
      </button>
      <div class="card-body">
        <h3>${p.nama}</h3>
        <p class="price">${rupiah(p.harga)}</p>
        <p class="card-desc">${p.ringkas}</p>
        <div class="card-act">
          ${p.custom || p.varian?.wajibPilih
            ? `<button class="btn btn-sm" type="button" data-open="${p.id}">${p.custom ? "Tulis namanya" : "Pilih warna"}</button>`
            : `<button class="btn btn-sm" type="button" data-add="${p.id}">${S.teksTambah}</button>`}
          <button class="link" type="button" data-open="${p.id}">Detail</button>
        </div>
      </div>
    </article>`).join("");
  $$("[data-add]", grid).forEach((b) => b.addEventListener("click", () => tambah(b.dataset.add, "", "", 1, b.closest(".card"))));
  $$("[data-open]", grid).forEach((b) => b.addEventListener("click", () => detail(b.dataset.open)));
}

function detail(id, teksAwal = "") {
  const p = cari(id);
  const dlg = $("#detail");
  dlg.innerHTML = `
    <form method="dialog" class="detail-in">
      <button class="x" value="tutup" aria-label="Tutup">×</button>
      <div class="detail-img"><img src="${p.foto}" alt="${p.alt || p.nama}" width="600" height="600"></div>
      <div class="detail-txt">
        <h2 id="detail-nama">${p.nama}</h2>
        <p class="price">${rupiah(p.harga)}</p>
        <p>${p.deskripsi}</p>
        ${p.spek ? `<dl class="spek">${p.spek.map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join("")}</dl>` : ""}
        ${p.custom ? `<label class="fld">${p.custom.label}<input name="teks" maxlength="${p.custom.max}" value="${esc(teksAwal)}" placeholder="${p.custom.placeholder}" autocomplete="off"></label>` : ""}
        ${p.varian ? `<fieldset class="opsi"><legend>${p.varian.label}</legend>
          ${p.varian.opsi.map((o, k) => `<label><input type="radio" name="v" value="${o}" ${k === 0 ? "checked" : ""}><span>${p.varian.warna ? `<i style="background:${p.varian.warna[k]}"></i>` : ""}${o}</span></label>`).join("")}
        </fieldset>` : ""}
        <div class="detail-act">
          <div class="qty"><button type="button" data-q="-1" aria-label="Kurangi">−</button><span class="qv">1</span><button type="button" data-q="1" aria-label="Tambah">+</button></div>
          <button class="btn" type="button" data-go>${S.teksTambah}</button>
        </div>
        <p class="err" role="alert"></p>
      </div>
    </form>`;
  let q = 1;
  $$("[data-q]", dlg).forEach((b) => b.addEventListener("click", () => { q = Math.max(1, q + +b.dataset.q); $(".qv", dlg).textContent = q; }));
  $("[data-go]", dlg).addEventListener("click", () => {
    const v = $("input[name=v]:checked", dlg)?.value || "";
    let teks = "";
    if (p.custom) {
      teks = $("input[name=teks]", dlg).value.trim();
      if (!teks) { $(".err", dlg).textContent = "Tulis dulu namanya, maksimal " + p.custom.max + " huruf."; return; }
    }
    tambah(p.id, v, teks, q, document.querySelector(`.card[data-id="${p.id}"]`));
    dlg.close();
  });
  dlg.showModal();
}

window.TOKO = { tambah, detail, rupiah, cari };
kerangka(); katalog(); render();
})();
