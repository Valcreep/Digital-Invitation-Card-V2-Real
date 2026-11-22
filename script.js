/* =========================================================
   1. COUNTDOWN TIMER (January 30, 2027 at 08:00 AM)
========================================================= */
const targetDate = new Date("January 30, 2027 08:00:00").getTime();

function updateCountdown() {
  const now = Date.now();
  const diff = Math.max(0, targetDate - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
setInterval(updateCountdown, 1000);
updateCountdown();

/* =========================================================
   2. THEME & DYNAMIC BACKGROUND ENGINE
========================================================= */
const themeSelect = document.getElementById("theme-select");
const bgSelect = document.getElementById("bg-select");
let currentBgMode = "starfield";

themeSelect.addEventListener("change", (e) => {
  document.body.className = e.target.value;
});

bgSelect.addEventListener("change", (e) => {
  currentBgMode = e.target.value;
});

const bgCanvas = document.getElementById("bg-canvas");
const bgCtx = bgCanvas.getContext("2d");

function resizeBg() {
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeBg);
resizeBg();

const stars = Array.from({ length: 160 }, () => ({
  x: (Math.random() - 0.5) * 1600,
  y: (Math.random() - 0.5) * 1600,
  z: Math.random() * 1600,
  size: Math.random() * 2 + 1
}));

const orbs = Array.from({ length: 35 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  vx: (Math.random() - 0.5) * 1.4,
  vy: (Math.random() - 0.5) * 1.4,
  r: Math.random() * 24 + 8
}));

let gridOffset = 0;

function getPrimaryColor() {
  return getComputedStyle(document.body).getPropertyValue("--primary").trim() || "#00f0ff";
}

function getSecondaryColor() {
  return getComputedStyle(document.body).getPropertyValue("--secondary").trim() || "#ff007f";
}

function animateBackground() {
  const w = bgCanvas.width;
  const h = bgCanvas.height;
  const primary = getPrimaryColor();
  const secondary = getSecondaryColor();

  bgCtx.clearRect(0, 0, w, h);

  if (currentBgMode === "starfield") {
    bgCtx.fillStyle = primary;
    for (const s of stars) {
      s.z -= 5;
      if (s.z <= 1) s.z = 1600;
      const sx = (s.x / s.z) * 400 + w / 2;
      const sy = (s.y / s.z) * 400 + h / 2;
      const radius = Math.max(0.5, (1 - s.z / 1600) * 3.2);
      bgCtx.beginPath();
      bgCtx.arc(sx, sy, radius, 0, Math.PI * 2);
      bgCtx.fill();
    }
  } else if (currentBgMode === "cybergrid") {
    gridOffset = (gridOffset + 1.5) % 40;
    bgCtx.strokeStyle = primary;
    bgCtx.globalAlpha = 0.25;
    bgCtx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      bgCtx.beginPath();
      bgCtx.moveTo(x, 0);
      bgCtx.lineTo(x, h);
      bgCtx.stroke();
    }
    for (let y = gridOffset; y < h; y += 40) {
      bgCtx.beginPath();
      bgCtx.moveTo(0, y);
      bgCtx.lineTo(w, y);
      bgCtx.stroke();
    }
    bgCtx.globalAlpha = 1;
  } else if (currentBgMode === "aurora") {
    const t = Date.now() * 0.001;
    const grad = bgCtx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "transparent");
    grad.addColorStop(0.5 + Math.sin(t) * 0.2, primary);
    grad.addColorStop(1, secondary);
    bgCtx.globalAlpha = 0.22;
    bgCtx.fillStyle = grad;
    bgCtx.fillRect(0, 0, w, h);
    bgCtx.globalAlpha = 1;
  } else if (currentBgMode === "particles") {
    for (const o of orbs) {
      o.x += o.vx;
      o.y += o.vy;
      if (o.x < 0 || o.x > w) o.vx *= -1;
      if (o.y < 0 || o.y > h) o.vy *= -1;
      bgCtx.beginPath();
      bgCtx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      bgCtx.fillStyle = primary;
      bgCtx.globalAlpha = 0.16;
      bgCtx.fill();
    }
    bgCtx.globalAlpha = 1;
  }

  requestAnimationFrame(animateBackground);
}
animateBackground();

/* =========================================================
   3. A-Z LANGUAGE CHANGER
========================================================= */
const languagesAZ = [
  { code: "ar", name: "Arabic (العربية)" },
  { code: "bn", name: "Bengali (বাংলা)" },
  { code: "zh", name: "Chinese (中文)" },
  { code: "da", name: "Danish (Dansk)" },
  { code: "nl", name: "Dutch (Nederlands)" },
  { code: "en", name: "English" },
  { code: "fi", name: "Finnish (Suomi)" },
  { code: "fr", name: "French (Français)" },
  { code: "de", name: "German (Deutsch)" },
  { code: "el", name: "Greek (Ελληνικά)" },
  { code: "hi", name: "Hindi (हिन्दी)" },
  { code: "id", name: "Indonesian (Bahasa Indonesia)" },
  { code: "it", name: "Italian (Italiano)" },
  { code: "ja", name: "Japanese (日本語)" },
  { code: "ko", name: "Korean (한국어)" },
  { code: "ms", name: "Malay (Bahasa Melayu)" },
  { code: "no", name: "Norwegian (Norsk)" },
  { code: "pl", name: "Polish (Polski)" },
  { code: "pt", name: "Portuguese (Português)" },
  { code: "ru", name: "Russian (Русский)" },
  { code: "es", name: "Spanish (Español)" },
  { code: "sv", name: "Swedish (Svenska)" },
  { code: "th", name: "Thai (ไทย)" },
  { code: "tr", name: "Turkish (Türkçe)" },
  { code: "uk", name: "Ukrainian (Українська)" },
  { code: "vi", name: "Vietnamese (Tiếng Việt)" },
  { code: "zu", name: "Zulu (isiZulu)" }
];

const translations = {
  en: {
    vipBadge: "★ EXCLUSIVE VIP PASS ★",
    heroTitle: "BIRTHDAY CELEBRATION",
    heroSubtitle: "You are cordially invited to an unforgettable celebration!",
    days: "DAYS", hours: "HOURS", minutes: "MINUTES", seconds: "SECONDS",
    dateLabel: "DATE & TIME", locLabel: "LOCATION", openMap: "Open in Google Maps →",
    arcadeTitle: "PARTY ARCADE ZONE", arcadeDesc: "Warm up your reflexes before the party begins!",
    rsvpTitle: "VIP RSVP CONFIRMATION", rsvpDesc: "Complete your pass details below to confirm via WhatsApp.",
    nameLabel: "GUEST FULL NAME", mustFill: "* MUST FILL",
    note1Label: "NOTE 1: ATTENDANCE STATUS", selectOne: "* SELECT ONE",
    optYes: "Yes, I can attend the party", optNo: "Sorry, I cannot attend the party",
    note2Label: "NOTE 2: ADDITIONAL WISHES / MESSAGE", optional: "(OPTIONAL)",
    sendRsvp: "SEND RSVP TO WHATSAPP"
  },
  id: {
    vipBadge: "★ TIKET VIP EKSKLUSIF ★",
    heroTitle: "PERAYAAN ULANG TAHUN",
    heroSubtitle: "Anda diundang secara khusus ke perayaan yang tak terlupakan!",
    days: "HARI", hours: "JAM", minutes: "MENIT", seconds: "DETIK",
    dateLabel: "TANGGAL & WAKTU", locLabel: "LOKASI ACARA", openMap: "Buka di Google Maps →",
    arcadeTitle: "ZONA GAME ARCADE", arcadeDesc: "Latih refleksmu sebelum pesta dimulai!",
    rsvpTitle: "KONFIRMASI RSVP VIP", rsvpDesc: "Lengkapi data di bawah untuk konfirmasi via WhatsApp.",
    nameLabel: "NAMA LENGKAP TAMU", mustFill: "* WAJIB DIISI",
    note1Label: "CATATAN 1: STATUS KEHADIRAN", selectOne: "* PILIH SATU",
    optYes: "Ya, saya bisa menghadiri pesta", optNo: "Maaf, saya tidak bisa menghadiri pesta",
    note2Label: "CATATAN 2: UCAPAN / PESAN TAMBAHAN", optional: "(OPSIONAL)",
    sendRsvp: "KIRIM RSVP KE WHATSAPP"
  },
  es: {
    vipBadge: "★ PASE VIP EXCLUSIVO ★",
    heroTitle: "FIESTA DE CUMPLEAÑOS",
    heroSubtitle: "¡Estás cordialmente invitado a una celebración inolvidable!",
    days: "DÍAS", hours: "HORAS", minutes: "MINUTOS", seconds: "SEGUNDOS",
    dateLabel: "FECHA Y HORA", locLabel: "UBICACIÓN", openMap: "Abrir en Google Maps →",
    arcadeTitle: "ZONA ARCADE", arcadeDesc: "¡Pon a prueba tus reflejos antes de la fiesta!",
    rsvpTitle: "CONFIRMACIÓN RSVP VIP", rsvpDesc: "Completa tus datos para confirmar por WhatsApp.",
    nameLabel: "NOMBRE COMPLETO", mustFill: "* OBLIGATORIO",
    note1Label: "NOTA 1: ASISTENCIA", selectOne: "* ELIGE UNO",
    optYes: "Sí, puedo asistir a la fiesta", optNo: "Lo siento, no puedo asistir a la fiesta",
    note2Label: "NOTA 2: MENSAJE ADICIONAL", optional: "(OPCIONAL)",
    sendRsvp: "ENVIAR RSVP POR WHATSAPP"
  },
  fr: {
    vipBadge: "★ PASS VIP EXCLUSIF ★",
    heroTitle: "FÊTE D'ANNIVERSAIRE",
    heroSubtitle: "Vous êtes cordialement invité à une célébration inoubliable !",
    days: "JOURS", hours: "HEURES", minutes: "MINUTES", seconds: "SECONDES",
    dateLabel: "DATE ET HEURE", locLabel: "LIEU", openMap: "Ouvrir dans Google Maps →",
    arcadeTitle: "ZONE ARCADE", arcadeDesc: "Échauffez vos réflexes avant le début de la fête !",
    rsvpTitle: "CONFIRMATION RSVP VIP", rsvpDesc: "Remplissez vos informations pour confirmer via WhatsApp.",
    nameLabel: "NOM COMPLET", mustFill: "* OBLIGATOIRE",
    note1Label: "NOTE 1 : PRÉSENCE", selectOne: "* CHOISISSEZ UN",
    optYes: "Oui, je peux assister à la fête", optNo: "Désolé, je ne peux pas assister à la fête",
    note2Label: "NOTE 2 : MESSAGE SUPPLÉMENTAIRE", optional: "(OPTIONNEL)",
    sendRsvp: "ENVOYER RSVP SUR WHATSAPP"
  },
  ja: {
    vipBadge: "★ 限定VIPパス ★",
    heroTitle: "バースデーパーティー",
    heroSubtitle: "忘れられない特別なパーティーへご招待します！",
    days: "日", hours: "時間", minutes: "分", seconds: "秒",
    dateLabel: "日時", locLabel: "会場", openMap: "Googleマップで開く →",
    arcadeTitle: "ミニゲームゾーン", arcadeDesc: "パーティーの前に反射神経をテストしよう！",
    rsvpTitle: "VIP 出欠確認 (RSVP)", rsvpDesc: "必要事項を入力してWhatsAppで送信してください。",
    nameLabel: "お名前", mustFill: "* 必須",
    note1Label: "ノート1：出欠選択", selectOne: "* 1つ選択",
    optYes: "はい、パーティーに参加します", optNo: "申し訳ありませんが、参加できません",
    note2Label: "ノート2：お祝いメッセージ", optional: "（任意）",
    sendRsvp: "WHATSAPPでRSVPを送信"
  }
};

const langSelect = document.getElementById("lang-select");
languagesAZ.forEach((lang) => {
  const opt = document.createElement("option");
  opt.value = lang.code;
  opt.textContent = lang.name;
  if (lang.code === "en") opt.selected = true;
  langSelect.appendChild(opt);
});

langSelect.addEventListener("change", (e) => {
  const dict = translations[e.target.value] || translations.en;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
});

/* =========================================================
   4. MINI-GAME TABS
========================================================= */
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".game-box").forEach((box) => box.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(`${btn.dataset.game}-container`).classList.add("active");
  });
});

/* =========================================================
   5. GAME 1: GEOMETRY DASH RUNNER
========================================================= */
const dashCanvas = document.getElementById("dash-canvas");
const dashCtx = dashCanvas.getContext("2d");
let dashRunning = false;
let dashScore = 0;
let dashBest = 0;
let player = { x: 70, y: 170, size: 28, vy: 0, gravity: 0.75, jumpPower: -13, rotation: 0, grounded: true };
let spikes = [];
let dashFrame = 0;

function resetDash() {
  player.y = 170;
  player.vy = 0;
  player.rotation = 0;
  player.grounded = true;
  spikes = [];
  dashScore = 0;
  dashFrame = 0;
  dashRunning = true;
}

function jumpDash() {
  if (!dashRunning) {
    resetDash();
    return;
  }
  if (player.grounded) {
    player.vy = player.jumpPower;
    player.grounded = false;
  }
}

document.getElementById("dash-start").addEventListener("click", jumpDash);
dashCanvas.addEventListener("mousedown", jumpDash);
dashCanvas.addEventListener("touchstart", (e) => { e.preventDefault(); jumpDash(); });
window.addEventListener("keydown", (e) => {
  if (e.code === "Space" && document.getElementById("dash-container").classList.contains("active")) {
    e.preventDefault();
    jumpDash();
  }
});

function loopDash() {
  const primary = getPrimaryColor();
  const secondary = getSecondaryColor();
  dashCtx.clearRect(0, 0, dashCanvas.width, dashCanvas.height);

  // Ground line
  dashCtx.strokeStyle = primary;
  dashCtx.lineWidth = 3;
  dashCtx.beginPath();
  dashCtx.moveTo(0, 200);
  dashCtx.lineTo(dashCanvas.width, 200);
  dashCtx.stroke();

  if (dashRunning) {
    dashFrame++;
    dashScore = Math.floor(dashFrame / 6);
    document.getElementById("dash-score").textContent = dashScore;

    player.vy += player.gravity;
    player.y += player.vy;

    if (player.y >= 172) {
      player.y = 172;
      player.vy = 0;
      player.grounded = true;
      player.rotation = Math.round(player.rotation / (Math.PI / 2)) * (Math.PI / 2);
    } else {
      player.rotation += 0.14;
    }

    if (dashFrame % 75 === 0) {
      spikes.push({ x: dashCanvas.width + 20, size: 28 });
    }

    for (let i = spikes.length - 1; i >= 0; i--) {
      const sp = spikes[i];
      sp.x -= 6.5;

      // Draw spike
      dashCtx.fillStyle = secondary;
      dashCtx.beginPath();
      dashCtx.moveTo(sp.x, 200);
      dashCtx.lineTo(sp.x + sp.size / 2, 200 - sp.size);
      dashCtx.lineTo(sp.x + sp.size, 200);
      dashCtx.closePath();
      dashCtx.fill();

      // Collision check
      if (
        player.x + player.size - 6 > sp.x + 5 &&
        player.x + 6 < sp.x + sp.size - 5 &&
        player.y + player.size > 200 - sp.size + 6
      ) {
        dashRunning = false;
        if (dashScore > dashBest) {
          dashBest = dashScore;
          document.getElementById("dash-best").textContent = dashBest;
        }
      }

      if (sp.x + sp.size < 0) spikes.splice(i, 1);
    }
  } else {
    dashCtx.fillStyle = "#ffffff";
    dashCtx.font = "bold 18px Orbitron, sans-serif";
    dashCtx.textAlign = "center";
    dashCtx.fillText("PRESS START OR TAP TO JUMP!", dashCanvas.width / 2, 105);
  }

  // Draw rotating player cube
  dashCtx.save();
  dashCtx.translate(player.x + player.size / 2, player.y + player.size / 2);
  dashCtx.rotate(player.rotation);
  dashCtx.fillStyle = primary;
  dashCtx.fillRect(-player.size / 2, -player.size / 2, player.size, player.size);
  dashCtx.strokeStyle = "#000";
  dashCtx.lineWidth = 2;
  dashCtx.strokeRect(-player.size / 4, -player.size / 4, player.size / 2, player.size / 2);
  dashCtx.restore();

  requestAnimationFrame(loopDash);
}
loopDash();

/* =========================================================
   6. GAME 2: NEON SNAKE.IO
========================================================= */
const snakeCanvas = document.getElementById("snake-canvas");
const snakeCtx = snakeCanvas.getContext("2d");
const grid = 20;
let snake = [{ x: 160, y: 160 }];
let dx = grid;
let dy = 0;
let food = { x: 300, y: 160 };
let snakeScore = 0;
let snakeBest = 0;
let snakeInterval = null;

function spawnFood() {
  food.x = Math.floor(Math.random() * (snakeCanvas.width / grid)) * grid;
  food.y = Math.floor(Math.random() * (snakeCanvas.height / grid)) * grid;
}

function startSnake() {
  snake = [{ x: 160, y: 160 }, { x: 140, y: 160 }, { x: 120, y: 160 }];
  dx = grid;
  dy = 0;
  snakeScore = 0;
  document.getElementById("snake-score").textContent = "0";
  spawnFood();
  clearInterval(snakeInterval);
  snakeInterval = setInterval(stepSnake, 95);
}

function setDirection(dir) {
  if (dir === "UP" && dy === 0) { dx = 0; dy = -grid; }
  if (dir === "DOWN" && dy === 0) { dx = 0; dy = grid; }
  if (dir === "LEFT" && dx === 0) { dx = -grid; dy = 0; }
  if (dir === "RIGHT" && dx === 0) { dx = grid; dy = 0; }
}

document.getElementById("snake-start").addEventListener("click", startSnake);
document.querySelectorAll(".dpad-btn").forEach((btn) => {
  btn.addEventListener("click", () => setDirection(btn.dataset.dir));
});

window.addEventListener("keydown", (e) => {
  if (!document.getElementById("snake-container").classList.contains("active")) return;
  if (["ArrowUp", "KeyW"].includes(e.code)) { e.preventDefault(); setDirection("UP"); }
  if (["ArrowDown", "KeyS"].includes(e.code)) { e.preventDefault(); setDirection("DOWN"); }
  if (["ArrowLeft", "KeyA"].includes(e.code)) { e.preventDefault(); setDirection("LEFT"); }
  if (["ArrowRight", "KeyD"].includes(e.code)) { e.preventDefault(); setDirection("RIGHT"); }
});

function stepSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Wall or self collision
  if (
    head.x < 0 || head.x >= snakeCanvas.width ||
    head.y < 0 || head.y >= snakeCanvas.height ||
    snake.some((seg) => seg.x === head.x && seg.y === head.y)
  ) {
    clearInterval(snakeInterval);
    if (snakeScore > snakeBest) {
      snakeBest = snakeScore;
      document.getElementById("snake-best").textContent = snakeBest;
    }
    return;
  }

  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    snakeScore += 10;
    document.getElementById("snake-score").textContent = snakeScore;
    spawnFood();
  } else {
    snake.pop();
  }

  drawSnake();
}

function drawSnake() {
  const primary = getPrimaryColor();
  const secondary = getSecondaryColor();
  snakeCtx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height);

  // Food orb
  snakeCtx.fillStyle = secondary;
  snakeCtx.beginPath();
  snakeCtx.arc(food.x + grid / 2, food.y + grid / 2, grid / 2.3, 0, Math.PI * 2);
  snakeCtx.fill();

  // Snake segments
  snake.forEach((seg, idx) => {
    snakeCtx.fillStyle = idx === 0 ? "#ffffff" : primary;
    snakeCtx.fillRect(seg.x + 1, seg.y + 1, grid - 2, grid - 2);
  });
}
drawSnake();

/* =========================================================
   7. RSVP VALIDATION & WHATSAPP REDIRECT (081316780313)
========================================================= */
document.getElementById("rsvp-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("guest-name");
  const nameVal = nameInput.value.trim();
  const attendance = document.querySelector('input[name="attendance"]:checked');
  const note2Val = document.getElementById("additional-note").value.trim();

  const nameError = document.getElementById("name-error");
  const attError = document.getElementById("att-error");

  nameError.textContent = "";
  attError.textContent = "";

  let valid = true;

  if (!nameVal) {
    nameError.textContent = "⚠ Please fill in your name before sending your RSVP.";
    nameInput.focus();
    valid = false;
  }

  if (!attendance) {
    attError.textContent = "⚠ Please select one attendance option in Note 1.";
    valid = false;
  }

  if (!valid) return;

  // Format Indonesian WhatsApp number 081316780313 -> 6281316780313
  const waNumber = "6281316780313";
  let message = `🎉 *BIRTHDAY PARTY RSVP* 🎉\n\n`;
  message += `👤 *Name:* ${nameVal}\n`;
  message += `📋 *Note 1 (Attendance):* ${attendance.value}\n`;
  if (note2Val) {
    message += `📝 *Note 2 (Message):* ${note2Val}\n`;
  }
  message += `\n📍 *Event:* Jan 30, 2027 • 08:00 AM at Mall Ciputra Cibubur, Citra Gran`;

  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, "_blank", "noopener");
});