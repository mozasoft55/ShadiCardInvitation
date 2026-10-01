// ============================================================================
// WEDDINGHUB — ROYAL HEIRLOOM INVITATION
// Premium Mobile-First Wedding Card
// ============================================================================

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));

// -----------------------------------------------------------------------------
// FORMATTERS
// -----------------------------------------------------------------------------

function formatTime(t) {
  if (!t) return '';

  t = String(t);

  if (t.includes('1899-') || t.includes('T')) {
    const d = new Date(t);

    if (!isNaN(d)) {
      return d.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }
  }

  return t;
}

function formatDate(d) {
  if (!d) return '';

  d = String(d);

  if (d.includes('T')) {
    const dt = new Date(d);

    if (!isNaN(dt)) {
      return dt.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    }

    return d.split('T')[0];
  }

  return d;
}

function getDateObject(date, time) {
  if (!date) return null;

  try {
    let value = String(date);

    if (time && !value.includes('T')) {
      value += `T${time}`;
    }

    const d = new Date(value);

    return isNaN(d) ? null : d;
  } catch {
    return null;
  }
}

function icon(name) {

  const icons = {

    location: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"/>
        <circle cx="12" cy="9" r="2.2"/>
      </svg>
    `,

    calendar: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="2"/>
        <path d="M7 3v4M17 3v4M3 10h18"/>
      </svg>
    `,

    whatsapp: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.6-4A8 8 0 1 1 20 11.5Z"/>
        <path d="M8.5 8.2c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.3 0 .5-.2.7l-.6.6c.8 1.4 1.8 2.4 3.2 3.2l.6-.6c.2-.2.4-.3.7-.2l1.7.7c.3.1.4.3.4.5v.5c0 .3 0 .5-.4.7-.5.3-1.2.4-1.8.2-2.2-.7-4.5-2.9-5.7-4.7-.7-1-.9-2.1-.3-3.1Z"/>
      </svg>
    `,

    music: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 18V5l11-2v13"/>
        <circle cx="6.5" cy="18" r="3"/>
        <circle cx="17.5" cy="16" r="3"/>
      </svg>
    `,

    share: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="18" cy="5" r="2.5"/>
        <circle cx="6" cy="12" r="2.5"/>
        <circle cx="18" cy="19" r="2.5"/>
        <path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5"/>
      </svg>
    `,

    heart: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.8 8.8c0 5.3-8.8 10.2-8.8 10.2S3.2 14.1 3.2 8.8A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.8 2.6Z"/>
      </svg>
    `
  };

  return icons[name] || '';
}


// ============================================================================
// RENDER
// ============================================================================

export default function render({ guest, wedding: w, events = [] }) {

  const bride = esc(w.bride_name || 'Tarana');
  const groom = esc(w.groom_name || 'Akbar');

  const brideFull = esc(w.bride_full || bride);
  const groomFull = esc(w.groom_full || groom);

  const initials =
    `${(bride[0] || 'T')}&${(groom[0] || 'A')}`.toUpperCase();

  const mainDate = formatDate(w.date);
  const mainTime = formatTime(w.time);

  const guestName = esc(guest?.name || 'Respected Guest');

  const rsvpNum = esc(
    w.rsvp_number || '919330981386'
  );

  const rsvpMsg = encodeURIComponent(
    `Aadab / Namaste, I will be attending the wedding of ${bride} & ${groom}. Invited Guest: ${guestName}`
  );

  const rsvpLink =
    `https://wa.me/${rsvpNum}?text=${rsvpMsg}`;

  const calTitle =
    encodeURIComponent(`Wedding of ${bride} & ${groom}`);

  const calLoc =
    encodeURIComponent(
      `${w.venue || ''}, ${w.address || ''}`
    );

  const calLink =
    `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&location=${calLoc}`;

  const mapLink = w.map_url || '';

  return `

  <!-- GOOGLE FONTS -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <link
    href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=DM+Sans:wght@400;500;600&family=Great+Vibes&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Playfair+Display:wght@500;600;700&display=swap"
    rel="stylesheet"
  >

  <style>

    /* ==========================================================
       ROOT
       ========================================================== */

    * {
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      background:
        radial-gradient(
          circle at 50% 0%,
          #4a0717 0%,
          #21030b 45%,
          #0e0104 100%
        );
      font-family: "DM Sans", sans-serif;
      color: #3d0a16;
    }

    button,
    a {
      -webkit-tap-highlight-color: transparent;
    }


    /* ==========================================================
       PAGE
       ========================================================== */

    .royal-page {
      min-height: 100dvh;
      padding: 18px 12px 70px;

      display: flex;
      justify-content: center;

      position: relative;
      overflow: hidden;

      background:
        radial-gradient(
          circle at 50% 10%,
          rgba(212,175,55,.15),
          transparent 32%
        ),
        radial-gradient(
          circle at 15% 70%,
          rgba(120,10,40,.2),
          transparent 30%
        );
    }


    /* ==========================================================
       FLOATING GOLD PARTICLES
       ========================================================== */

    .royal-page::before,
    .royal-page::after {
      content: "";
      position: fixed;
      inset: 0;

      pointer-events: none;

      background-image:
        radial-gradient(circle, rgba(212,175,55,.35) 1px, transparent 1px),
        radial-gradient(circle, rgba(255,255,255,.13) 1px, transparent 1px);

      background-size:
        80px 80px,
        130px 130px;

      opacity: .25;
    }

    .royal-page::after {
      transform: translate(30px, 50px);
      opacity: .12;
    }


    /* ==========================================================
       MAIN INVITATION
       ========================================================== */

    .royal-card {
      width: 100%;
      max-width: 470px;

      position: relative;

      overflow: hidden;

      border-radius: 230px 230px 30px 30px;

      background:
        linear-gradient(
          180deg,
          #fffdf8 0%,
          #fbf4e7 35%,
          #f4e4c8 100%
        );

      border: 1px solid rgba(212,175,55,.95);

      box-shadow:
        0 30px 80px rgba(0,0,0,.55),
        0 0 0 6px rgba(212,175,55,.06),
        0 0 45px rgba(212,175,55,.16);

      padding: 52px 20px 34px;

      animation:
        cardReveal .9s ease both;
    }

    @keyframes cardReveal {
      from {
        opacity: 0;
        transform: translateY(20px) scale(.98);
      }

      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }


    /* Inner royal border */

    .royal-card::before {
      content: "";

      position: absolute;
      inset: 7px;

      border: 1px solid rgba(170,125,35,.55);

      border-radius: 224px 224px 24px 24px;

      pointer-events: none;
    }


    .royal-card::after {
      content: "";

      position: absolute;

      width: 260px;
      height: 260px;

      top: -170px;
      left: 50%;

      transform: translateX(-50%);

      border-radius: 50%;

      border: 1px solid rgba(212,175,55,.18);

      box-shadow:
        0 0 0 18px rgba(212,175,55,.035),
        0 0 0 38px rgba(212,175,55,.025);

      pointer-events: none;
    }


    /* ==========================================================
       MUSIC
       ========================================================== */

    .music-button {
      position: fixed;

      right: 16px;
      top: 16px;

      width: 46px;
      height: 46px;

      border-radius: 50%;

      display: flex;
      align-items: center;
      justify-content: center;

      z-index: 100;

      border: 1px solid #d4af37;

      background: rgba(38,3,12,.92);

      color: #e8c66a;

      box-shadow:
        0 8px 25px rgba(0,0,0,.35);

      cursor: pointer;

      transition: .25s ease;
    }

    .music-button svg {
      width: 19px;
      height: 19px;

      fill: none;
      stroke: currentColor;
      stroke-width: 1.5;
    }

    .music-button.active {
      box-shadow:
        0 0 0 5px rgba(212,175,55,.1),
        0 8px 25px rgba(0,0,0,.35);
    }

    .music-button:active {
      transform: scale(.92);
    }


    /* ==========================================================
       MONOGRAM
       ========================================================== */

    .monogram-wrap {
      position: relative;

      width: 94px;
      height: 94px;

      margin: 0 auto 17px;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    .monogram-outer {
      position: absolute;
      inset: 0;

      border-radius: 50%;

      border: 1px solid #d4af37;

      box-shadow:
        inset 0 0 0 5px #fbf4e7,
        inset 0 0 0 6px rgba(212,175,55,.55);
    }

    .monogram {
      width: 68px;
      height: 68px;

      border-radius: 50%;

      display: flex;
      align-items: center;
      justify-content: center;

      background:
        radial-gradient(
          circle at 35% 30%,
          #8c1732,
          #4d0617 70%
        );

      border: 1px solid #d4af37;

      color: #f2d27a;

      font-family: "Cinzel", serif;

      font-size: 18px;
      font-weight: 700;

      letter-spacing: 1px;

      box-shadow:
        inset 0 0 20px rgba(0,0,0,.25),
        0 8px 25px rgba(79,4,22,.2);
    }


    /* ==========================================================
       ORNAMENT
       ========================================================== */

    .ornament {
      display: flex;
      align-items: center;
      justify-content: center;

      gap: 10px;

      margin: 14px auto;
    }

    .ornament span {
      width: 52px;
      height: 1px;

      background:
        linear-gradient(
          90deg,
          transparent,
          #c89d35
        );
    }

    .ornament span:last-child {
      background:
        linear-gradient(
          90deg,
          #c89d35,
          transparent
        );
    }

    .ornament i {
      width: 7px;
      height: 7px;

      transform: rotate(45deg);

      border: 1px solid #b78b27;

      background: #f8ecd5;
    }


    /* ==========================================================
       INVOCATION
       ========================================================== */

    .invocation {
      font-family: "Cinzel", serif;

      font-size: 9px;

      letter-spacing: 2.8px;

      text-transform: uppercase;

      color: #80601d;

      font-weight: 700;

      line-height: 1.6;

      padding: 0 12px;
    }


    /* ==========================================================
       GUEST
       ========================================================== */

    .guest-section {
      margin: 24px auto 19px;

      padding: 12px 20px;

      max-width: 330px;

      text-align: center;

      border-top: 1px solid rgba(185,141,40,.35);
      border-bottom: 1px solid rgba(185,141,40,.35);
    }

    .guest-label {
      font-family: "Cinzel", serif;

      font-size: 8px;

      letter-spacing: 2.5px;

      text-transform: uppercase;

      color: #96752b;

      font-weight: 700;
    }

    .guest-name {
      margin-top: 5px;

      font-family: "Libre Baskerville", serif;

      font-size: 18px;

      font-style: italic;

      color: #5d0b1c;

      line-height: 1.4;
    }


    /* ==========================================================
       INVITATION TEXT
       ========================================================== */

    .request-text {
      margin: 18px auto 5px;

      max-width: 340px;

      font-family: "Libre Baskerville", serif;

      font-size: 12px;

      line-height: 1.8;

      color: #63313a;
    }

    .ceremony-title {
      margin-top: 6px;

      font-family: "Cinzel", serif;

      font-size: 12px;

      letter-spacing: 3px;

      text-transform: uppercase;

      color: #7b0e25;

      font-weight: 800;
    }


    /* ==========================================================
       COUPLE
       ========================================================== */

    .couple {
      margin: 20px 0 18px;

      text-align: center;
    }

    .person-name {
      margin: 0;

      font-family: "Great Vibes", cursive;

      font-size: clamp(48px, 14vw, 68px);

      font-weight: 400;

      line-height: .95;

      color: #720b25;

      text-shadow:
        0 1px 0 #fff,
        0 2px 5px rgba(100,0,25,.08);
    }

    .parents {
      margin-top: 8px;

      font-family: "DM Sans", sans-serif;

      font-size: 9px;

      line-height: 1.6;

      color: #754a51;

      max-width: 300px;

      margin-left: auto;
      margin-right: auto;
    }

    .weds {
      margin: 13px 0;

      display: flex;

      align-items: center;
      justify-content: center;

      gap: 10px;

      font-family: "Cinzel", serif;

      color: #a27b25;

      font-size: 9px;

      letter-spacing: 3px;

      font-weight: 700;
    }

    .weds::before,
    .weds::after {
      content: "";

      width: 35px;
      height: 1px;

      background: #c9a24a;
    }


    /* ==========================================================
       DATE PLAQUE
       ========================================================== */

    .date-plaque {
      position: relative;

      margin: 26px auto 20px;

      padding: 17px 16px 15px;

      max-width: 320px;

      text-align: center;

      background:
        linear-gradient(
          135deg,
          rgba(255,255,255,.95),
          rgba(251,239,214,.92)
        );

      border: 1px solid rgba(184,137,33,.5);

      box-shadow:
        0 9px 25px rgba(79,4,22,.07);

      border-radius: 5px;
    }

    .date-plaque::before {
      content: "";

      position: absolute;

      inset: 5px;

      border: 1px solid rgba(212,175,55,.35);

      pointer-events: none;
    }

    .date-label {
      font-family: "Cinzel", serif;

      font-size: 7.5px;

      letter-spacing: 3px;

      text-transform: uppercase;

      color: #9b7629;

      font-weight: 700;
    }

    .date-value {
      margin-top: 6px;

      font-family: "Playfair Display", serif;

      font-size: 20px;

      font-weight: 700;

      color: #65091c;
    }

    .time-value {
      margin-top: 3px;

      font-family: "DM Sans", sans-serif;

      font-size: 11px;

      color: #76534d;

      font-weight: 600;
    }


    /* ==========================================================
       COUNTDOWN
       ========================================================== */

    .countdown {
      margin: 18px auto 22px;

      max-width: 340px;

      display: grid;

      grid-template-columns:
        repeat(4, 1fr);

      gap: 6px;
    }

    .count-box {
      padding: 8px 3px;

      border: 1px solid rgba(183,139,39,.28);

      background: rgba(255,255,255,.42);

      border-radius: 6px;
    }

    .count-number {
      font-family: "Cinzel", serif;

      font-size: 16px;

      font-weight: 700;

      color: #6e0b22;
    }

    .count-label {
      margin-top: 2px;

      font-size: 7px;

      letter-spacing: 1.2px;

      text-transform: uppercase;

      color: #8b6a2d;
    }


    /* ==========================================================
       VENUE
       ========================================================== */

    .venue-section {
      text-align: center;

      margin: 23px 0 25px;

      padding: 20px 15px;

      border-top: 1px solid rgba(185,141,40,.3);
      border-bottom: 1px solid rgba(185,141,40,.3);
    }

    .section-eyebrow {
      font-family: "Cinzel", serif;

      font-size: 8px;

      letter-spacing: 2.5px;

      text-transform: uppercase;

      color: #a07b2c;

      font-weight: 700;
    }

    .venue-name {
      margin-top: 7px;

      font-family: "Playfair Display", serif;

      font-size: 20px;

      font-weight: 700;

      color: #680b20;
    }

    .venue-address {
      margin: 7px auto 0;

      max-width: 320px;

      font-size: 11px;

      line-height: 1.6;

      color: #765158;
    }


    /* ==========================================================
       EVENTS
       ========================================================== */

    .events-section {
      margin: 28px 0 22px;
    }

    .events-heading {
      text-align: center;

      margin-bottom: 17px;

      font-family: "Cinzel", serif;

      font-size: 10px;

      letter-spacing: 2.7px;

      text-transform: uppercase;

      color: #770c24;

      font-weight: 800;
    }

    .event-list {
      position: relative;

      padding-left: 18px;
    }

    .event-list::before {
      content: "";

      position: absolute;

      left: 4px;
      top: 5px;
      bottom: 5px;

      width: 1px;

      background:
        linear-gradient(
          180deg,
          transparent,
          #c29a3a 10%,
          #c29a3a 90%,
          transparent
        );
    }

    .event {
      position: relative;

      padding: 12px 13px;

      margin-bottom: 9px;

      background: rgba(255,255,255,.63);

      border: 1px solid rgba(190,145,43,.25);

      border-radius: 7px;

      box-shadow:
        0 5px 15px rgba(80,10,25,.035);
    }

    .event::before {
      content: "";

      position: absolute;

      width: 7px;
      height: 7px;

      border-radius: 50%;

      left: -18px;
      top: 19px;

      background: #9d7628;

      box-shadow:
        0 0 0 3px #f6e8cc,
        0 0 0 4px rgba(157,118,40,.3);
    }

    .event-top {
      display: flex;

      align-items: center;

      justify-content: space-between;

      gap: 10px;
    }

    .event-name {
      font-family: "Playfair Display", serif;

      font-size: 14px;

      font-weight: 700;

      color: #690b20;
    }

    .event-time {
      white-space: nowrap;

      font-size: 9px;

      font-weight: 700;

      color: #967126;
    }

    .event-bottom {
      margin-top: 4px;

      font-size: 9px;

      line-height: 1.5;

      color: #78575b;
    }


    /* ==========================================================
       ACTIONS
       ========================================================== */

    .actions {
      display: grid;

      gap: 9px;

      margin-top: 27px;
    }

    .action {
      min-height: 48px;

      display: flex;

      align-items: center;

      justify-content: center;

      gap: 9px;

      padding: 12px 18px;

      border-radius: 28px;

      text-decoration: none;

      font-family: "Cinzel", serif;

      font-size: 9px;

      letter-spacing: 1.3px;

      text-transform: uppercase;

      font-weight: 700;

      transition:
        transform .2s ease,
        box-shadow .2s ease;
    }

    .action:active {
      transform: scale(.98);
    }

    .action svg {
      width: 16px;
      height: 16px;

      fill: none;
      stroke: currentColor;
      stroke-width: 1.5;
    }

    .action-primary {
      color: #fff8e8;

      background:
        linear-gradient(
          135deg,
          #86122f,
          #5a071c
        );

      border: 1px solid #a97725;

      box-shadow:
        0 8px 20px rgba(85,4,25,.2);
    }

    .action-gold {
      color: #3f0713;

      background:
        linear-gradient(
          135deg,
          #efd27c,
          #c59a35
        );

      border: 1px solid #a98027;

      box-shadow:
        0 8px 20px rgba(178,132,34,.17);
    }

    .action-light {
      color: #690b20;

      background: rgba(255,255,255,.7);

      border: 1px solid rgba(112,15,37,.3);
    }


    /* ==========================================================
       SHARE
       ========================================================== */

    .share-button {
      margin-top: 10px;

      width: 100%;

      border: 0;

      cursor: pointer;
    }


    /* ==========================================================
       COMPLIMENTS
       ========================================================== */

    .compliments {
      margin-top: 30px;

      text-align: center;

      padding-top: 20px;

      border-top: 1px solid rgba(185,141,40,.28);

      color: #725158;
    }

    .compliments-label {
      font-family: "Libre Baskerville", serif;

      font-style: italic;

      font-size: 10px;
    }

    .compliments-value {
      margin-top: 6px;

      font-family: "Cinzel", serif;

      font-size: 9px;

      letter-spacing: 1.2px;

      color: #690b20;

      font-weight: 700;
    }


    /* ==========================================================
       FOOTER
       ========================================================== */

    .royal-footer {
      margin-top: 24px;

      text-align: center;

      font-family: "Cinzel", serif;

      font-size: 7px;

      letter-spacing: 2px;

      text-transform: uppercase;

      color: #98732b;
    }

    .royal-footer .heart {
      margin: 0 5px;

      color: #8a1530;
    }


    /* ==========================================================
       TOAST
       ========================================================== */

    .royal-toast {
      position: fixed;

      left: 50%;
      bottom: 25px;

      transform:
        translateX(-50%)
        translateY(20px);

      z-index: 999;

      padding: 11px 18px;

      border-radius: 30px;

      background: #4f0719;

      color: #f7e4b4;

      border: 1px solid rgba(212,175,55,.55);

      font-size: 11px;

      opacity: 0;

      pointer-events: none;

      transition: .3s ease;

      box-shadow: 0 10px 30px rgba(0,0,0,.35);

      white-space: nowrap;
    }

    .royal-toast.show {
      opacity: 1;

      transform:
        translateX(-50%)
        translateY(0);
    }


    /* ==========================================================
       DESKTOP
       ========================================================== */

    @media (min-width: 700px) {

      .royal-page {
        padding-top: 35px;
      }

      .royal-card {
        max-width: 520px;

        padding-left: 35px;
        padding-right: 35px;
      }

      .person-name {
        font-size: 74px;
      }
    }


    /* ==========================================================
       REDUCED MOTION
       ========================================================== */

    @media (prefers-reduced-motion: reduce) {

      *,
      *::before,
      *::after {
        animation-duration: .01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: .01ms !important;
      }

      html {
        scroll-behavior: auto;
      }
    }

  </style>


  <!-- ============================================================
       MUSIC
       ============================================================ -->

  <button
    class="music-button"
    id="musicToggle"
    aria-label="Toggle wedding music"
    type="button"
  >
    ${icon('music')}

    <audio
      id="bgSong"
      loop
      preload="none"
    >
      <source
        src="${esc(
          w.music_url ||
          'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3'
        )}"
        type="audio/mp3"
      >
    </audio>
  </button>


  <!-- ============================================================
       MAIN CARD
       ============================================================ -->

  <div class="royal-page">

    <main class="royal-card">

      <!-- MONOGRAM -->

      <div class="monogram-wrap">

        <div class="monogram-outer"></div>

        <div class="monogram">
          ${initials}
        </div>

      </div>


      <!-- INVOCATION -->

      <div class="invocation">
        ${esc(
          w.invocation ||
          'In the Name of Allah, the Most Beneficent, the Most Merciful'
        )}
      </div>


      <div class="ornament">
        <span></span>
        <i></i>
        <span></span>
      </div>


      <!-- GUEST -->

      <section class="guest-section">

        <div class="guest-label">
          Cordially Invited
        </div>

        <div class="guest-name">
          ${guestName}
          ${guest?.with_family ? ' & Family' : ''}
        </div>

      </section>


      <!-- INVITATION -->

      <div class="request-text">
        ${esc(
          w.host_name ||
          'The Family'
        )}
        request the honour of your presence at the
      </div>


      <div class="ceremony-title">
        ${esc(
          w.ceremony_title ||
          'Marriage Ceremony'
        )}
      </div>


      <!-- COUPLE -->

      <section class="couple">

        <h1 class="person-name">
          ${brideFull}
        </h1>

        ${
          w.bride_parents
            ? `
              <div class="parents">
                ${esc(w.bride_parents)}
              </div>
            `
            : ''
        }


        <div class="weds">
          WEDS
        </div>


        <h1 class="person-name">
          ${groomFull}
        </h1>

        ${
          w.groom_parents
            ? `
              <div class="parents">
                ${esc(w.groom_parents)}
              </div>
            `
            : ''
        }

      </section>


      <!-- DATE -->

      <section class="date-plaque">

        <div class="date-label">
          Save the Date
        </div>

        <div class="date-value">
          ${mainDate || 'Wedding Day'}
        </div>

        ${
          mainTime
            ? `
              <div class="time-value">
                Ceremony • ${mainTime}
              </div>
            `
            : ''
        }

      </section>


      <!-- COUNTDOWN -->

      <div
        class="countdown"
        id="countdown"
        data-date="${esc(w.date || '')}"
        data-time="${esc(w.time || '')}"
      >

        <div class="count-box">
          <div class="count-number" id="days">--</div>
          <div class="count-label">Days</div>
        </div>

        <div class="count-box">
          <div class="count-number" id="hours">--</div>
          <div class="count-label">Hours</div>
        </div>

        <div class="count-box">
          <div class="count-number" id="minutes">--</div>
          <div class="count-label">Minutes</div>
        </div>

        <div class="count-box">
          <div class="count-number" id="seconds">--</div>
          <div class="count-label">Seconds</div>
        </div>

      </div>


      <!-- VENUE -->

      <section class="venue-section">

        <div class="section-eyebrow">
          Wedding Venue
        </div>

        <div class="venue-name">
          ${esc(w.venue || 'Wedding Venue')}
        </div>

        ${
          w.address
            ? `
              <div class="venue-address">
                ${esc(w.address)}
              </div>
            `
            : ''
        }

      </section>


      <!-- EVENTS -->

      ${
        events && events.length
          ? `
            <section class="events-section">

              <div class="events-heading">
                Wedding Celebrations
              </div>

              <div class="event-list">

                ${events.map(ev => `

                  <article class="event">

                    <div class="event-top">

                      <span class="event-name">
                        ${esc(ev.event_name)}
                      </span>

                      <span class="event-time">
                        ${formatTime(ev.event_time)}
                      </span>

                    </div>

                    <div class="event-bottom">

                      ${formatDate(ev.event_date)}

                      ${
                        ev.note
                          ? ` • ${esc(ev.note)}`
                          : ''
                      }

                    </div>

                  </article>

                `).join('')}

              </div>

            </section>
          `
          : ''
      }


      <!-- ACTIONS -->

      <section class="actions">

        ${
          mapLink
            ? `
              <a
                href="${esc(mapLink)}"
                target="_blank"
                rel="noopener noreferrer"
                class="action action-gold"
              >
                ${icon('location')}
                <span>View Venue Location</span>
              </a>
            `
            : ''
        }


        <a
          href="${calLink}"
          target="_blank"
          rel="noopener noreferrer"
          class="action action-light"
        >
          ${icon('calendar')}
          <span>Save Date to Calendar</span>
        </a>


        <a
          href="${rsvpLink}"
          target="_blank"
          rel="noopener noreferrer"
          class="action action-primary"
        >
          ${icon('whatsapp')}
          <span>Confirm Attendance</span>
        </a>


        <button
          type="button"
          id="shareInvite"
          class="action action-light share-button"
        >
          ${icon('share')}
          <span>Share Invitation</span>
        </button>

      </section>


      <!-- COMPLIMENTS -->

      ${
        w.compliments
          ? `
            <section class="compliments">

              <div class="compliments-label">
                With best compliments from
              </div>

              <div class="compliments-value">
                ${esc(w.compliments)}
              </div>

            </section>
          `
          : ''
      }


      <!-- FOOTER -->

      <footer class="royal-footer">

        Made with
        <span class="heart">
          ${icon('heart')}
        </span>
        for a beautiful beginning

      </footer>

    </main>

  </div>


  <!-- TOAST -->

  <div
    class="royal-toast"
    id="royalToast"
    role="status"
    aria-live="polite"
  ></div>

  `;
}


// ============================================================================
// MOUNT / INTERACTIONS
// ============================================================================

export function mount(root) {

  // --------------------------------------------------------------------------
  // MUSIC
  // --------------------------------------------------------------------------

  const musicButton =
    root.querySelector('#musicToggle');

  const song =
    root.querySelector('#bgSong');

  if (musicButton && song) {

    musicButton.addEventListener('click', async () => {

      if (song.paused) {

        try {

          await song.play();

          musicButton.classList.add('active');

        } catch (err) {

          showToast(
            root,
            'Tap again to start the music'
          );

        }

      } else {

        song.pause();

        musicButton.classList.remove('active');
      }

    });
  }


  // --------------------------------------------------------------------------
  // COUNTDOWN
  // --------------------------------------------------------------------------

  const countdown =
    root.querySelector('#countdown');

  if (countdown) {

    const date =
      countdown.dataset.date;

    const time =
      countdown.dataset.time;

    const target =
      getDateObject(date, time);

    if (target) {

      const updateCountdown = () => {

        const now =
          new Date();

        let diff =
          target.getTime() - now.getTime();

        if (diff <= 0) {

          setNumber(root, '#days', '00');
          setNumber(root, '#hours', '00');
          setNumber(root, '#minutes', '00');
          setNumber(root, '#seconds', '00');

          return;
        }

        const days =
          Math.floor(
            diff / 86400000
          );

        diff %= 86400000;

        const hours =
          Math.floor(
            diff / 3600000
          );

        diff %= 3600000;

        const minutes =
          Math.floor(
            diff / 60000
          );

        diff %= 60000;

        const seconds =
          Math.floor(
            diff / 1000
          );

        setNumber(
          root,
          '#days',
          String(days).padStart(2, '0')
        );

        setNumber(
          root,
          '#hours',
          String(hours).padStart(2, '0')
        );

        setNumber(
          root,
          '#minutes',
          String(minutes).padStart(2, '0')
        );

        setNumber(
          root,
          '#seconds',
          String(seconds).padStart(2, '0')
        );
      };

      updateCountdown();

      const timer =
        setInterval(
          updateCountdown,
          1000
        );

      // Stop timer when card is removed
      const observer =
        new MutationObserver(() => {

          if (!document.body.contains(root)) {

            clearInterval(timer);

            observer.disconnect();
          }

        });

      observer.observe(
        document.body,
        {
          childList: true,
          subtree: true
        }
      );
    }
  }


  // --------------------------------------------------------------------------
  // SHARE
  // --------------------------------------------------------------------------

  const shareButton =
    root.querySelector('#shareInvite');

  if (shareButton) {

    shareButton.addEventListener(
      'click',
      async () => {

        const shareData = {
          title: document.title || 'Wedding Invitation',
          text: 'You are cordially invited to our wedding celebration.',
          url: window.location.href
        };

        try {

          if (
            navigator.share &&
            typeof navigator.share === 'function'
          ) {

            await navigator.share(
              shareData
            );

          } else if (
            navigator.clipboard
          ) {

            await navigator.clipboard.writeText(
              window.location.href
            );

            showToast(
              root,
              'Invitation link copied'
            );

          } else {

            showToast(
              root,
              'Copy this page link to share'
            );
          }

        } catch (err) {

          // User cancelled native share.
        }
      }
    );
  }

}


// ============================================================================
// HELPERS
// ============================================================================

function setNumber(root, selector, value) {

  const element =
    root.querySelector(selector);

  if (element) {
    element.textContent = value;
  }
}


function showToast(root, message) {

  const toast =
    root.querySelector('#royalToast');

  if (!toast) return;

  toast.textContent =
    message;

  toast.classList.add('show');

  clearTimeout(
    toast._timer
  );

  toast._timer =
    setTimeout(() => {

      toast.classList.remove('show');

    }, 2500);
}


// ============================================================================
// END
// ============================================================================
