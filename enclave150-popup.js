/* ============================================================
   Dinamicash Business · aviso emergente de ENCLAVE 150
   Archivo autónomo: trae sus propios estilos y su propio HTML.
   Instalación: copiar este archivo junto a index.html y agregar antes de </body>:
     <script src="enclave150-popup.js" defer></script>
   Comportamiento:
     - aparece 1,2 s después de cargar la página, una vez por sesión del navegador;
     - "Ahora no" lo cierra por esta sesión; "No volver a mostrar" lo oculta 7 días;
     - se cierra con Esc, con la X o tocando fuera de la tarjeta;
     - en móvil sale como hoja desde abajo; en escritorio, centrado;
     - no aparece si la página se abre con #sin-aviso (para pruebas) ni si se llega
       desde el propio sitio del evento.
   Para desactivarlo: quitar la línea del <script>. Para cambiar textos: editar T.
   ============================================================ */
(function () {
  "use strict";
  var URL_EVENTO = "https://enclave150.dinamicash.business/?utm_source=dinamicash.business&utm_medium=popup&utm_campaign=enclave150";
  var LOGO = "https://enclave150.dinamicash.business/img/logo-enclave150.webp";
  var CLAVE_SESION = "enclave150-aviso-visto", CLAVE_OCULTAR = "enclave150-aviso-hasta", DIAS_OCULTAR = 7, RETARDO_MS = 1200;
  var T = {
    kicker: "Dinamicash presenta",
    titulo: "ENCLAVE 150",
    sub: "Un día para decidir el 2027.",
    fecha: "Jueves 19 de noviembre de 2026 · Hotel Manantial Inn, Valencia",
    texto: "Una jornada para 150 dueños y directivos de empresa: cómo está comprando la gente, qué viene en la economía y cómo ejecutar en la era de la IA. Con Terry Gutiérrez (ex Tesla Latinoamérica), Alexander Cabrera (Atenas), Jesús Palacios (Summa) y Natalia Jiménez (Lulo Bank).",
    cta: "Ver el evento y reservar",
    ahoraNo: "Ahora no",
    noMostrar: "No volver a mostrar",
    cerrar: "Cerrar"
  };

  function puedeMostrar() {
    try {
      if (/sin-aviso/.test(location.hash)) return false;
      if (/enclave150\.dinamicash\.business/.test(document.referrer)) return false;
      if (sessionStorage.getItem(CLAVE_SESION)) return false;
      var hasta = parseInt(localStorage.getItem(CLAVE_OCULTAR) || "0", 10);
      if (hasta && Date.now() < hasta) return false;
    } catch (e) { /* almacenamiento bloqueado: se muestra igual */ }
    return true;
  }
  function marcar(ocultarDias) {
    try { sessionStorage.setItem(CLAVE_SESION, "1"); if (ocultarDias) localStorage.setItem(CLAVE_OCULTAR, String(Date.now() + ocultarDias * 864e5)); } catch (e) {}
  }

  var CSS = "" +
    ".e150-fondo{position:fixed;inset:0;z-index:99990;background:rgba(14,8,12,.62);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;transition:opacity .28s ease-out}" +
    ".e150-fondo.on{opacity:1}" +
    ".e150-caja{position:relative;width:100%;max-width:560px;background:#140F10;color:#fff;border-radius:28px;padding:34px 34px 26px;box-shadow:0 30px 80px rgba(0,0,0,.55);font-family:'Montserrat','Gotham',Arial,sans-serif;overflow:hidden;transform:translateY(16px) scale(.98);transition:transform .32s cubic-bezier(.22,1,.36,1)}" +
    ".e150-fondo.on .e150-caja{transform:none}" +
    ".e150-caja:before{content:'';position:absolute;inset:0;background:linear-gradient(20deg,rgba(248,86,88,.28) 0%,rgba(248,86,88,0) 62%);pointer-events:none}" +
    ".e150-caja>*{position:relative}" +
    ".e150-x{position:absolute;top:14px;right:14px;width:38px;height:38px;border-radius:999px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.06);color:#fff;font-size:20px;line-height:36px;text-align:center;cursor:pointer;padding:0}" +
    ".e150-x:hover{background:rgba(255,255,255,.14)}" +
    ".e150-k{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#F85658;font-weight:700;margin:0 0 12px}" +
    ".e150-logo{display:block;width:min(300px,78%);height:auto;margin:0 0 10px}" +
    ".e150-t{font-size:30px;line-height:1.05;font-weight:800;letter-spacing:.06em;margin:0 0 10px}" +
    ".e150-s{font-size:19px;line-height:1.2;font-weight:600;margin:0 0 12px}" +
    ".e150-f{font-size:13px;color:#F85658;font-weight:700;margin:0 0 12px}" +
    ".e150-p{font-size:14px;line-height:1.55;color:#D9DAE0;margin:0 0 20px}" +
    ".e150-acc{display:flex;gap:10px;flex-wrap:wrap;align-items:center}" +
    ".e150-cta{display:inline-block;background:#F85658;color:#fff;text-decoration:none;font-weight:700;font-size:13px;letter-spacing:.08em;text-transform:uppercase;padding:15px 24px;border-radius:999px;box-shadow:0 10px 24px rgba(248,86,88,.35)}" +
    ".e150-cta:hover{background:#E9474F}" +
    ".e150-no{background:none;border:1px solid rgba(255,255,255,.22);color:#fff;font:inherit;font-weight:600;font-size:13px;padding:14px 20px;border-radius:999px;cursor:pointer}" +
    ".e150-no:hover{background:rgba(255,255,255,.08)}" +
    ".e150-min{margin:16px 0 0;font-size:12px;color:#92939B}" +
    ".e150-min button{background:none;border:0;color:#92939B;font:inherit;text-decoration:underline;cursor:pointer;padding:0}" +
    "@media (max-width:640px){.e150-fondo{align-items:flex-end;padding:0}.e150-caja{max-width:none;border-radius:28px 28px 0 0;padding:28px 22px calc(22px + env(safe-area-inset-bottom));transform:translateY(40px)}.e150-t{font-size:26px}.e150-s{font-size:17px}.e150-acc{flex-direction:column;align-items:stretch}.e150-cta,.e150-no{text-align:center}}" +
    "@media (prefers-reduced-motion:reduce){.e150-fondo,.e150-caja{transition:none}}";

  function mostrar() {
    if (document.getElementById("e150-aviso")) return;
    var st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
    var fondo = document.createElement("div");
    fondo.className = "e150-fondo"; fondo.id = "e150-aviso";
    fondo.setAttribute("role", "dialog"); fondo.setAttribute("aria-modal", "true"); fondo.setAttribute("aria-labelledby", "e150-titulo");
    fondo.innerHTML =
      '<div class="e150-caja">' +
      '<button type="button" class="e150-x" id="e150-x" aria-label="' + T.cerrar + '">&times;</button>' +
      '<p class="e150-k">' + T.kicker + '</p>' +
      '<img class="e150-logo" id="e150-logo" src="' + LOGO + '" alt="' + T.titulo + '" width="1200" height="137">' +
      '<h2 class="e150-t" id="e150-titulo" hidden>' + T.titulo + '</h2>' +
      '<p class="e150-s">' + T.sub + '</p>' +
      '<p class="e150-f">' + T.fecha + '</p>' +
      '<p class="e150-p">' + T.texto + '</p>' +
      '<div class="e150-acc"><a class="e150-cta" id="e150-cta" href="' + URL_EVENTO + '">' + T.cta + '</a>' +
      '<button type="button" class="e150-no" id="e150-no">' + T.ahoraNo + '</button></div>' +
      '<p class="e150-min"><button type="button" id="e150-nunca">' + T.noMostrar + '</button></p>' +
      '</div>';
    document.body.appendChild(fondo);
    var logo = document.getElementById("e150-logo"), titulo = document.getElementById("e150-titulo");
    logo.addEventListener("error", function () { logo.remove(); titulo.hidden = false; });
    var anterior = document.activeElement, bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function cerrar(dias) {
      marcar(dias);
      fondo.classList.remove("on");
      document.removeEventListener("keydown", tecla);
      document.body.style.overflow = bodyOverflow;
      setTimeout(function () { fondo.remove(); }, 300);
      try { if (anterior && anterior.focus) anterior.focus(); } catch (e) {}
    }
    function tecla(e) { if (e.key === "Escape") cerrar(0); }
    document.getElementById("e150-x").addEventListener("click", function () { cerrar(0); });
    document.getElementById("e150-no").addEventListener("click", function () { cerrar(0); });
    document.getElementById("e150-nunca").addEventListener("click", function () { cerrar(DIAS_OCULTAR); });
    document.getElementById("e150-cta").addEventListener("click", function () { marcar(DIAS_OCULTAR); });
    fondo.addEventListener("click", function (e) { if (e.target === fondo) cerrar(0); });
    document.addEventListener("keydown", tecla);
    void fondo.offsetWidth;   /* fuerza el reflow para que la transición de entrada se vea */
    fondo.classList.add("on");
    try { document.getElementById("e150-cta").focus({ preventScroll: true }); } catch (e) {}
  }

  function arrancar() { if (!puedeMostrar()) return; setTimeout(mostrar, RETARDO_MS); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", arrancar); else arrancar();
})();
