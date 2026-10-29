/* Interaksi khusus GANCI: gantungan bergoyang & preview ganci nama */
(() => {
  // goyang saat diklik atau disentuh kursor
  document.querySelectorAll(".dangle").forEach((d) => {
    const goyang = () => { d.classList.remove("wiggle"); void d.offsetWidth; d.classList.add("wiggle"); };
    d.addEventListener("click", goyang);
    d.addEventListener("pointerenter", goyang);
  });

  // preview ganci nama
  const inp = document.getElementById("nama-in");
  if (!inp) return;
  const out = document.getElementById("tag-text");
  const kartu = document.querySelector(".tag-card");
  const tulis = () => {
    const t = inp.value.trim().toUpperCase() || "NAMAMU";
    out.textContent = t;
    out.style.fontSize = t.length > 8 ? "clamp(24px, 4.2vw, 40px)" : "clamp(32px, 6vw, 58px)";
  };
  inp.addEventListener("input", () => {
    tulis();
    kartu.classList.remove("wiggle"); void kartu.offsetWidth; kartu.classList.add("wiggle");
  });
  document.getElementById("nama-go").addEventListener("click", () => {
    const t = inp.value.trim().toUpperCase();
    const err = document.getElementById("nama-err");
    if (!t) { err.textContent = "Ketik dulu namanya di kotak tulisan."; inp.focus(); return; }
    err.textContent = "";
    window.TOKO.tambah("ganci-nama", "Ring silver", t, 1, document.querySelector('.card[data-id="ganci-nama"]'));
  });
  tulis();
})();
