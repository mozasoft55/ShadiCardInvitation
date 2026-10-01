// ============================================================================
// TEMPLATE-02: ULTRA-LUXURY PALACE DIGITAL INVITATION
// NO SCROLL • NO SWIPE • 100dvh VIEWPORT APP ARCHITECTURE • 60 FPS MOTION
// ============================================================================

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

// Robust time formatter sanitizing Excel 1899 epoch timestamps
function formatLuxuryTime(t) {
  if (!t) return '09:30 PM';
  const str = String(t).trim();
  if (str.includes('1899-') || str.includes('T')) {
    const d = new Date(str);
    if (!isNaN(d)) {
      return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();
    }
  }
  return str;
}

// Clean date formatter
function formatLuxuryDate(d) {
  if (!d) return '27 OCTOBER 2026';
  const str = String(d).trim();
  if (str.includes('T')) {
    const dt = new Date(str);
    if (!isNaN(dt)) {
      const day = dt.getDate();
      const month = dt.toLocaleString('en-IN', { month: 'long' }).toUpperCase();
      const year = dt.getFullYear();
      return `${day} ${month} ${year}`;
    }
    return str.split('T')[0];
  }
  return str.toUpperCase();
}

export default function render({ guest, wedding: w, events = [] }) {
  const bride = esc(w.bride_name || 'Tarana');
  const groom = esc(w.groom_name || 'Akbar');
  const brideFull = esc(w.bride_full || 'Dr. Tarana Khatoon');
  const groomFull = esc(w.groom_full || 'Md Akbar Ansari');
  const guestName = esc(guest?.name || 'Respected Guest');
  const persons = guest?.persons || 1;
  const isFamily = guest?.with_family ? '✓' : '—';
  const initials = `${(bride[0] || 'T')}${(groom[0] || 'A')}`.toUpperCase();

  return `
  <style>
    /* -------------------------------------------------------------
       PALACE COLOR SYSTEM & TOKENS
       ------------------------------------------------------------- */
    :root {
      --oxblood-deep: #1c0206;
      --oxblood-surface: #2b030b;
      --oxblood-rich: #480612;
      --gold-24k: #D4AF37;
      --gold-light: #F7E5B5;
      --gold-dark: #9A7722;
      --champagne-ivory: #FFFBF2;
      --parchment-shade: #F5E8CE;
      --pearl-tint: #FAF7F0;
      --text-burgundy: #380711;
      --gold-foil-grad: linear-gradient(135deg, #ECC880 0%, #D4AF37 40%, #AA8022 70%, #FDF0CD 90%, #9A7722 100%);
      --gold-shadow: 0 10px 30px rgba(212, 175, 55, 0.22);
    }

    /* -------------------------------------------------------------
       FULL VIEWPORT WRAPPER (DESKTOP AMBIENCE + MOBILE CARD)
       ------------------------------------------------------------- */
    .palace-viewport {
      width: 100vw;
      height: 100vh;
      height: 100dvh;
      overflow: hidden;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at 50% 20%, #3b050f 0%, #160105 70%, #0a0002 100%);
    }

    /* Ambient Handcrafted Filigree Overlay */
    .palace-viewport::before {
      content: "";
      position: absolute;
      inset: 0;
      background-image: 
        radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.12) 0%, transparent 60%),
        url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fill-opacity='0.035' fill-rule='evenodd'%3E%3Cpath d='M40 0l40 40-40 40L0 40z'/%3E%3C/g%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 1;
    }

    /* Floating Classical Sitar Audio Pill */
    .audio-concierge {
      position: fixed;
      top: max(16px, env(safe-area-inset-top));
      right: max(16px, env(safe-area-inset-right));
      z-index: 1000;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(43, 3, 11, 0.88);
      border: 1px solid var(--gold-24k);
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.5), var(--gold-shadow);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.25s ease;
    }
    .audio-concierge:active { transform: scale(0.92); }
    .audio-concierge svg { width: 18px; height: 18px; fill: var(--gold-24k); }
    .audio-concierge.playing svg { animation: vinylRotate 5s linear infinite; }
    @keyframes vinylRotate { 100% { transform: rotate(360deg); } }

    /* -------------------------------------------------------------
       THE DIGITAL APPARATUS (APP CHASSIS)
       ------------------------------------------------------------- */
    .palace-stage {
      position: relative;
      width: 100%;
      max-width: 430px;
      height: 100%;
      max-height: 100dvh;
      overflow: hidden;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: max(12px, env(safe-area-inset-top)) 12px max(16px, env(safe-area-inset-bottom));
      box-sizing: border-box;
    }

    /* -------------------------------------------------------------
       DISCRETE SCREEN CONTAINER (NO SCROLL, APP-STYLE TRANSITIONS)
       ------------------------------------------------------------- */
    .palace-screen {
      position: absolute;
      inset: max(10px, env(safe-area-inset-top)) 12px max(14px, env(safe-area-inset-bottom));
      border-radius: min(44vw, 200px) min(44vw, 200px) 28px 28px;
      background: linear-gradient(180deg, #FFFDF8 0%, #FAF1DE 45%, #F0DEC0 100%);
      border: 2px solid var(--gold-24k);
      box-shadow: 
        0 25px 70px rgba(0,0,0,0.7),
        0 0 45px rgba(212, 175, 55, 0.15),
        inset 0 0 35px rgba(212, 175, 55, 0.1);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      padding: 38px 20px 24px;
      box-sizing: border-box;
      opacity: 0;
      pointer-events: none;
      transform: scale(0.96) translateY(12px);
      filter: blur(8px);
      transition: 
        opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1),
        transform 0.65s cubic-bezier(0.16, 1, 0.3, 1),
        filter 0.65s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 5;
    }

    /* Dual Inset Metallic Borders */
    .palace-screen::before {
      content: "";
      position: absolute;
      inset: 6px;
      border: 1px solid rgba(212, 175, 55, 0.65);
      border-radius: inherit;
      pointer-events: none;
    }
    .palace-screen::after {
      content: "";
      position: absolute;
      inset: 10px;
      border: 1px dashed rgba(170, 128, 34, 0.35);
      border-radius: inherit;
      pointer-events: none;
    }

    /* Active State (Only 1 active at a time) */
    .palace-screen.is-active {
      opacity: 1;
      pointer-events: auto;
      transform: scale(1) translateY(0);
      filter: blur(0);
      z-index: 20;
    }

    /* Exit Animation */
    .palace-screen.is-exiting {
      opacity: 0;
      transform: scale(1.03) translateY(-10px);
      filter: blur(6px);
      pointer-events: none;
    }

    /* -------------------------------------------------------------
       ROYAL MONOGRAM & CREST
       ------------------------------------------------------------- */
    .royal-crest-emblem {
      position: relative;
      width: 70px;
      height: 70px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .crest-ring-base {
      position: absolute;
      inset: 0;
      border: 1.5px solid var(--gold-24k);
      border-radius: 50%;
      background: radial-gradient(circle, #fffdfa 0%, #f7ecd5 100%);
      box-shadow: 0 4px 16px rgba(212, 175, 55, 0.25);
    }
    .crest-crown-top {
      position: absolute;
      top: -11px;
      font-size: 15px;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.25));
    }
    .crest-monogram-txt {
      position: relative;
      font-family: 'Cinzel', serif;
      font-size: 20px;
      font-weight: 700;
      color: var(--oxblood-rich);
      letter-spacing: 1px;
    }

    /* -------------------------------------------------------------
       EDITORIAL LUXURY TYPOGRAPHY
       ------------------------------------------------------------- */
    .script-hero {
      font-family: 'Great Vibes', cursive;
      color: var(--oxblood-rich);
      line-height: 1;
      font-weight: 400;
      margin: 0;
      text-shadow: 0 2px 6px rgba(56, 7, 17, 0.08);
    }

    .cinzel-label {
      font-family: 'Cinzel', serif;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--gold-dark);
      font-weight: 700;
      margin: 0;
    }

    .divider-flourish {
      width: 160px;
      height: 14px;
      margin: 6px auto;
      opacity: 0.85;
      flex-shrink: 0;
    }

    /* -------------------------------------------------------------
       CONTINUE CTA BUTTON (RAISED GOLD FOIL APP INTERACTION)
       ------------------------------------------------------------- */
    .cta-nav-button {
      position: relative;
      width: 100%;
      max-width: 280px;
      min-height: 48px;
      background: linear-gradient(135deg, var(--oxblood-rich) 0%, var(--oxblood-surface) 100%);
      border: 1.5px solid var(--gold-24k);
      border-radius: 999px;
      color: var(--gold-light);
      font-family: 'Cinzel', serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(43, 3, 11, 0.4), inset 0 1px 1px rgba(255,255,255,0.3);
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
      flex-shrink: 0;
      margin-top: 8px;
    }
    .cta-nav-button:active {
      transform: scale(0.96);
      box-shadow: 0 4px 12px rgba(43, 3, 11, 0.3);
    }
    .cta-nav-button svg {
      width: 14px;
      height: 14px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      transition: transform 0.25s ease;
    }
    .cta-nav-button:hover svg {
      transform: translateX(3px);
    }

    /* Indicator Pips (Screen Progression) */
    .stage-pips {
      display: flex;
      gap: 6px;
      margin-bottom: 4px;
      flex-shrink: 0;
    }
    .stage-pip {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: rgba(154, 119, 34, 0.3);
      transition: width 0.3s ease, background 0.3s ease;
    }
    .stage-pip.active {
      width: 16px;
      border-radius: 4px;
      background: var(--gold-24k);
    }

    /* -------------------------------------------------------------
       SCREEN SPECIFICS
       ------------------------------------------------------------- */
    
    /* Screen 0: Welcome */
    .screen-0-lead {
      font-size: clamp(52px, 16vw, 68px);
      margin: 8px 0 4px;
    }
    .guest-plaque-welcome {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.16), rgba(212, 175, 55, 0.04));
      border: 1px solid rgba(212, 175, 55, 0.4);
      border-radius: 40px;
      padding: 10px 24px;
      margin: 12px auto;
      max-width: 90%;
    }
    .welcome-invitation-copy {
      font-style: italic;
      font-size: 16px;
      line-height: 1.45;
      color: #4a1520;
      max-width: 86%;
      margin: 8px auto;
    }

    /* Screen 1: Save The Date */
    .date-badge-horizontal {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin: 8px 0;
      padding: 6px 0;
      border-top: 1px solid rgba(212, 175, 55, 0.4);
      border-bottom: 1px solid rgba(212, 175, 55, 0.4);
      width: 88%;
    }
    .date-num-prominent {
      font-size: 42px;
      font-weight: 700;
      font-family: 'Playfair Display', serif;
      color: var(--oxblood-rich);
      line-height: 1;
    }
    .guest-pass-card {
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid rgba(212, 175, 55, 0.45);
      border-radius: 12px;
      padding: 8px 14px;
      width: 90%;
      margin: 6px 0;
    }
    .pass-guest-name {
      font-family: 'Playfair Display', serif;
      font-size: 19px;
      font-weight: 700;
      color: var(--oxblood-rich);
      border-bottom: 1px dashed rgba(212, 175, 55, 0.6);
      padding-bottom: 4px;
      margin: 2px 0 6px;
    }
    .pass-metrics {
      display: flex;
      justify-content: space-around;
      font-size: 12px;
      color: var(--text-burgundy);
      font-weight: 600;
    }

    /* Screen 2: Farman */
    .bismillah-header {
      font-style: italic;
      font-size: 13px;
      color: var(--gold-dark);
      letter-spacing: 0.5px;
    }
    .couple-full-card {
      margin: 6px 0;
    }
    .couple-name-lead {
      font-family: 'Playfair Display', serif;
      font-size: 24px;
      font-weight: 700;
      color: var(--oxblood-rich);
      line-height: 1.1;
      margin: 2px 0;
    }
    .parents-subtext {
      font-size: 11px;
      color: #63232f;
      line-height: 1.35;
    }

    /* Screen 3: Programme Timeline */
    .timeline-vertical-deck {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 7px;
      margin: 8px 0;
    }
    .timeline-row-item {
      background: rgba(255, 255, 255, 0.85);
      border: 1px solid rgba(212, 175, 55, 0.35);
      border-left: 3px solid var(--gold-24k);
      border-radius: 8px;
      padding: 7px 12px;
      text-align: left;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .timeline-ev-title {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--oxblood-rich);
      font-family: 'Playfair Display', serif;
    }
    .timeline-ev-sub {
      font-size: 10.5px;
      color: #5c202a;
      margin-top: 1px;
    }
    .timeline-ev-time {
      font-family: 'Cinzel', serif;
      font-size: 10.5px;
      font-weight: 700;
      color: var(--gold-dark);
      white-space: nowrap;
    }

    /* Screen 4: Heirloom Closing Actions */
    .closing-actions-stack {
      width: 100%;
      max-width: 310px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 6px;
    }
    .luxury-pill-btn {
      padding: 10px 18px;
      border-radius: 30px;
      font-family: 'Cinzel', serif;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: transform 0.2s ease;
    }
    .luxury-pill-btn:active { transform: scale(0.97); }
    .pill-burgundy {
      background: linear-gradient(135deg, #480612 0%, #2b030b 100%);
      color: var(--gold-light) !important;
      border: 1px solid var(--gold-24k);
      box-shadow: 0 4px 14px rgba(43, 3, 11, 0.35);
    }
    .pill-gold {
      background: var(--gold-foil-grad);
      color: #2b030b !important;
      border: 1px solid #c59b27;
      box-shadow: 0 4px 14px rgba(197, 155, 39, 0.3);
    }
    .pill-scratch {
      background: rgba(255, 255, 255, 0.9);
      color: var(--oxblood-rich) !important;
      border: 1px dashed var(--gold-24k);
      cursor: pointer;
    }

    /* -------------------------------------------------------------
       TRENDING EXPERIENCE: SCRATCH CARD MODAL (OPTIONAL REVEAL)
       ------------------------------------------------------------- */
    .scratch-modal-overlay {
      position: absolute;
      inset: 0;
      z-index: 100;
      background: rgba(20, 1, 4, 0.88);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.4s ease;
    }
    .scratch-modal-overlay.is-open {
      opacity: 1;
      pointer-events: auto;
    }
    .scratch-vault {
      width: min(88vw, 340px);
      background: linear-gradient(180deg, #FFFDF8 0%, #F5E8CE 100%);
      border: 2px solid var(--gold-24k);
      border-radius: 20px;
      padding: 24px 18px 20px;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0,0,0,0.8), var(--gold-shadow);
      position: relative;
    }
    .scratch-canvas-container {
      position: relative;
      width: 280px;
      height: 140px;
      margin: 16px auto 12px;
      border-radius: 12px;
      overflow: hidden;
      border: 1.5px solid var(--gold-24k);
      box-shadow: inset 0 2px 8px rgba(0,0,0,0.2);
    }
    .scratch-secret-message {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #FFFDF8;
      padding: 12px;
      text-align: center;
    }
    #scratchCanvas {
      position: absolute;
      inset: 0;
      cursor: crosshair;
      touch-action: none;
    }
    .scratch-close-btn {
      background: none;
      border: none;
      font-family: 'Cinzel', serif;
      font-size: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--oxblood-rich);
      margin-top: 10px;
      cursor: pointer;
      text-decoration: underline;
    }
  </style>

  <!-- SVG Ornament Library -->
  <svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="goldLinear" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#F7E5B5"/>
        <stop offset="50%" stop-color="#D4AF37"/>
        <stop offset="100%" stop-color="#9A7722"/>
      </linearGradient>
      <symbol id="ornament-leaf" viewBox="0 0 140 18">
        <path d="M70,9 C55,4 40,4 20,9 C40,14 55,14 70,9 Z M70,9 C85,4 100,4 120,9 C100,14 85,14 70,9 Z" fill="url(#goldLinear)"/>
        <circle cx="70" cy="9" r="3.5" fill="#380711" stroke="url(#goldLinear)" stroke-width="1.5"/>
      </symbol>
    </defs>
  </svg>

  <div class="palace-viewport">
    
    <!-- Audio Concierge -->
    <button class="audio-concierge" id="audioToggle" aria-label="Toggle Instrumental Music" type="button">
      <svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
      <audio id="royalSoundtrack" loop preload="none">
        <source src="${esc(w.music_url || 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3')}" type="audio/mp3">
      </audio>
    </button>

    <!-- Mobile-First App Stage (Zero Scroll) -->
    <div class="palace-stage" id="stageMaster">

      <!-- ========================================================
           SCREEN 0: ROYAL WELCOME
           ======================================================== -->
      <section class="palace-screen is-active" data-screen-index="0" aria-label="Welcome">
        <div class="stage-pips">
          <span class="stage-pip active"></span>
          <span class="stage-pip"></span>
          <span class="stage-pip"></span>
          <span class="stage-pip"></span>
          <span class="stage-pip"></span>
        </div>

        <div>
          <div class="royal-crest-emblem">
            <span class="crest-crown-top">👑</span>
            <div class="crest-ring-base"></div>
            <div class="crest-monogram-txt">${initials}</div>
          </div>
          <div class="cinzel-label" style="font-size:10px; margin-top:8px;">Imperial Matrimony</div>
        </div>

        <div>
          <h1 class="script-hero screen-0-lead">Welcome</h1>
          <svg class="divider-flourish"><use href="#ornament-leaf"/></svg>
          
          <div class="guest-plaque-welcome">
            <div class="cinzel-label" style="font-size:8px; color:var(--oxblood-rich);">Specially Invited</div>
            <div style="font-family:'Playfair Display',serif; font-size:20px; font-weight:700; color:var(--oxblood-rich); margin-top:2px;">
              ${guestName}
            </div>
          </div>

          <p class="welcome-invitation-copy">
            With immense joy, we invite you to celebrate the wedding union of
            <strong style="color:var(--oxblood-rich);">${bride} &amp; ${groom}</strong>.
          </p>
        </div>

        <button class="cta-nav-button" type="button" data-next-screen="1">
          <span>Open Invitation</span>
          <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </section>

      <!-- ========================================================
           SCREEN 1: SAVE THE DATE (INVITATION PASS)
           ======================================================== -->
      <section class="palace-screen" data-screen-index="1" aria-label="Save The Date">
        <div class="stage-pips">
          <span class="stage-pip"></span>
          <span class="stage-pip active"></span>
          <span class="stage-pip"></span>
          <span class="stage-pip"></span>
          <span class="stage-pip"></span>
        </div>

        <div>
          <div class="cinzel-label" style="font-size:11px;">Wedding Invitation</div>
          <div style="font-family:'Cormorant Garamond'; font-size:13px; font-style:italic; color:#63232f;">Save The Date</div>
        </div>

        <div class="date-badge-horizontal">
          <div style="text-align:right;">
            <div class="cinzel-label" style="font-size:9px;">Tuesday</div>
            <div style="font-size:11px; font-weight:600; color:var(--gold-dark);">${formatLuxuryTime(w.time)}</div>
          </div>
          <div class="date-num-prominent">27th</div>
          <div style="text-align:left;">
            <div class="cinzel-label" style="font-size:9px;">October</div>
            <div style="font-size:11px; font-weight:600; color:var(--gold-dark);">2026</div>
          </div>
        </div>

        <div style="margin:2px 0;">
          <div style="font-family:'Great Vibes',cursive; font-size:44px; color:var(--oxblood-rich); line-height:1;">${bride}</div>
          <div class="cinzel-label" style="font-size:9px; margin:2px 0; color:var(--gold-dark);">— WEDS —</div>
          <div style="font-family:'Great Vibes',cursive; font-size:44px; color:var(--oxblood-rich); line-height:1;">${groom}</div>
        </div>

        <!-- Personalized Pass Box -->
        <div class="guest-pass-card">
          <div class="cinzel-label" style="font-size:7.5px; text-align:left; color:#63232f;">VIP Invitation Pass</div>
          <div class="pass-guest-name">${guestName}</div>
          <div class="pass-metrics">
            <span>PERSONS: <strong style="color:var(--oxblood-rich);">${persons}</strong></span>
            <span>FAMILY: <strong style="color:var(--oxblood-rich);">${isFamily}</strong></span>
          </div>
        </div>

        <div>
          <div class="cinzel-label" style="font-size:8px;">A Cordial Invitation From</div>
          <div style="font-size:15px; font-weight:700; color:var(--oxblood-rich); font-family:'Playfair Display',serif; margin:1px 0;">
            ${esc(w.host_name || 'Mrs. & Mr. Md Kalim Khan')}
          </div>
          <div style="font-size:10px; color:#5c202a; line-height:1.3;">
            ${esc(w.address || '283/10 Belilious Road, Howrah, West Bengal – 711101')}
          </div>
        </div>

        <button class="cta-nav-button" type="button" data-next-screen="2">
          <span>The Ceremony</span>
          <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </section>

      <!-- ========================================================
           SCREEN 2: MARRIAGE CEREMONY FARMAN
           ======================================================== -->
      <section class="palace-screen" data-screen-index="2" aria-label="Marriage Ceremony">
        <div class="stage-pips">
          <span class="stage-pip"></span>
          <span class="stage-pip"></span>
          <span class="stage-pip active"></span>
          <span class="stage-pip"></span>
          <span class="stage-pip"></span>
        </div>

        <div>
          <div class="bismillah-header">
            ${esc(w.invocation || 'In the name of Allah, the Most Beneficent & Merciful')}
          </div>
          <div class="cinzel-label" style="font-size:13px; letter-spacing:4px; margin-top:4px; color:var(--oxblood-rich);">
            Marriage Ceremony
          </div>
        </div>

        <div style="font-size:12px; font-style:italic; color:#63232f;">
          ${esc(w.host_name || 'Mrs. & Mr. Md Kalim Khan')} solicit your gracious presence for the wedding of their daughter
        </div>

        <div class="couple-full-card">
          <div class="couple-name-lead">${brideFull}</div>
          <div class="parents-subtext">${esc(w.bride_parents || '(D/o Mrs. & Mr. Md Kalim Khan, Howrah)')}</div>
          
          <div class="cinzel-label" style="font-size:10px; margin:6px 0; color:var(--gold-dark);">— WEDS —</div>

          <div class="couple-name-lead">${groomFull}</div>
          <div class="parents-subtext">${esc(w.groom_parents || '(S/o Mrs. & Mr. Moin Siddique, Ramgarh)')}</div>
        </div>

        <div style="border-top:1px solid rgba(212,175,55,0.4); width:90%; padding-top:6px;">
          <div class="cinzel-label" style="font-size:7.5px;">With Best Compliments From</div>
          <div style="font-family:'Playfair Display',serif; font-size:14px; font-weight:700; color:var(--oxblood-rich);">
            ${esc(w.compliments || 'Kalim Fish Seed, Howrah Fish Market')}
          </div>
          <div style="font-size:10px; color:#5c202a; margin-top:2px;">
            R.S.V.P: ${esc(w.rsvp_contacts || 'Md Kalim Khan 9330981386 • Md Musa Khan 7033098070 • Md Mozammil Khan 9432168955')}
          </div>
        </div>

        <button class="cta-nav-button" type="button" data-next-screen="3">
          <span>View Programme</span>
          <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </section>

      <!-- ========================================================
           SCREEN 3: WEDDING PROGRAMME TIMELINE
           ======================================================== -->
      <section class="palace-screen" data-screen-index="3" aria-label="Programme">
        <div class="stage-pips">
          <span class="stage-pip"></span>
          <span class="stage-pip"></span>
          <span class="stage-pip"></span>
          <span class="stage-pip active"></span>
          <span class="stage-pip"></span>
        </div>

        <div>
          <div class="cinzel-label" style="font-size:12px; letter-spacing:3px; color:var(--oxblood-rich);">The Wedding Programme</div>
          <div style="font-size:11.5px; font-style:italic; color:#63232f;">
            Insha Allah, to be solemnised as per the schedule
          </div>
        </div>

        <!-- Optimized 60 FPS Event Timeline -->
        <div class="timeline-vertical-deck">
          ${events && events.length ? events.map(ev => `
            <div class="timeline-row-item">
              <div>
                <div class="timeline-ev-title">${esc(ev.event_name)}</div>
                <div class="timeline-ev-sub">${formatLuxuryDate(ev.event_date)}${ev.note ? '• ' + esc(ev.note) : ''}</div>
              </div>
              <div class="timeline-ev-time">${formatLuxuryTime(ev.event_time)}</div>
            </div>
          `).join('') : `
            <div class="timeline-row-item">
              <div>
                <div class="timeline-ev-title">Milaad Sharif</div>
                <div class="timeline-ev-sub">24 October 2026 (Baad Namaz-e-Isha)</div>
              </div>
              <div class="timeline-ev-time">09:00 PM</div>
            </div>
            <div class="timeline-row-item">
              <div>
                <div class="timeline-ev-title">Rasm-e-Haldi &amp; Mehndi</div>
                <div class="timeline-ev-sub">25 &amp; 26 October 2026</div>
              </div>
              <div class="timeline-ev-time">06:00 PM</div>
            </div>
            <div class="timeline-row-item">
              <div>
                <div class="timeline-ev-title">Baraat, Nikah &amp; Dinner</div>
                <div class="timeline-ev-sub">Tuesday 27 October 2026</div>
              </div>
              <div class="timeline-ev-time">08:00 PM</div>
            </div>
            <div class="timeline-row-item">
              <div>
                <div class="timeline-ev-title">Rukhsati</div>
                <div class="timeline-ev-sub">Wednesday 28 October 2026</div>
              </div>
              <div class="timeline-ev-time">08:00 AM</div>
            </div>
          `}
        </div>

        <div>
          <div class="cinzel-label" style="font-size:8px;">Banquet Venue</div>
          <div style="font-family:'Playfair Display',serif; font-size:15px; font-weight:700; color:var(--oxblood-rich);">
            ${esc(w.venue || 'Shuubh Arambh Banquet')}
          </div>
          <div style="font-size:10px; color:#5c202a;">${esc(w.address || '131, Belilious Rd, Howrah')}</div>
        </div>

        <button class="cta-nav-button" type="button" data-next-screen="4">
          <span>Closing Heirloom</span>
          <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </section>

      <!-- ========================================================
           SCREEN 4: HEIRLOOM CLOSING & CONCIERGE ACTIONS
           ======================================================== -->
      <section class="palace-screen" data-screen-index="4" aria-label="Closing">
        <div class="stage-pips">
          <span class="stage-pip"></span>
          <span class="stage-pip"></span>
          <span class="stage-pip"></span>
          <span class="stage-pip"></span>
          <span class="stage-pip active"></span>
        </div>

        <div class="royal-crest-emblem">
          <span class="crest-crown-top">👑</span>
          <div class="crest-ring-base"></div>
          <div class="crest-monogram-txt">${initials}</div>
        </div>

        <div>
          <div class="script-hero" style="font-size:46px; line-height:1.1;">
            With Love<br>&amp; Warmest Regards
          </div>
          <svg class="divider-flourish"><use href="#ornament-leaf"/></svg>
          <div style="font-family:'Playfair Display',serif; font-size:18px; font-weight:700; color:var(--oxblood-rich);">
            ${esc(w.footer_text || 'Md Kalim Khan & Family')}
          </div>
        </div>

        <!-- 3 Luxury Action Pills -->
        <div class="closing-actions-stack">
          ${w.map_url ? `
            <a href="${esc(w.map_url)}" target="_blank" rel="noopener noreferrer" class="luxury-pill-btn pill-gold">
              <span>📍 View Venue Location</span>
            </a>
          ` : ''}

          <a href="#" id="saveCalendarBtn" target="_blank" rel="noopener noreferrer" class="luxury-pill-btn pill-burgundy">
            <span>📅 Save Date To Calendar</span>
          </a>

          <a href="#" id="whatsappRsvpBtn" target="_blank" rel="noopener noreferrer" class="luxury-pill-btn pill-gold">
            <span>💬 Confirm RSVP via WhatsApp</span>
          </a>

          <!-- Scratch Card Experience Trigger -->
          <button type="button" id="openScratchCard" class="luxury-pill-btn pill-scratch">
            <span>✨ One Little Surprise (Scratch)</span>
          </button>
        </div>

        <button class="cta-nav-button" type="button" data-next-screen="0" style="min-height:36px; max-width:200px; font-size:9.5px;">
          <span>Return To Opening</span>
        </button>
      </section>

    </div>

    <!-- ========================================================
         EXCLUSIVE REVEAL: LUXURY GOLD FOIL SCRATCH CARD
         ======================================================== -->
    <div class="scratch-modal-overlay" id="scratchModal">
      <div class="scratch-vault">
        <div class="cinzel-label" style="font-size:10px; color:var(--gold-dark);">Special Royal Message</div>
        <div style="font-family:'Playfair Display',serif; font-size:16px; font-weight:700; color:var(--oxblood-rich); margin-top:2px;">
          A Token Of Gratitude
        </div>

        <div class="scratch-canvas-container">
          <div class="scratch-secret-message">
            <span style="font-size:24px;">🕊️</span>
            <div style="font-family:'Playfair Display',serif; font-size:14px; font-weight:700; color:var(--oxblood-rich); margin-top:4px;">
              "Your Presence Is Our Greatest Gift"
            </div>
            <small style="font-size:10px; font-style:italic; color:#63232f;">We look forward to blessing this day together.</small>
          </div>
          <canvas id="scratchCanvas" width="280" height="140"></canvas>
        </div>

        <div style="font-size:10px; color:#5c202a; font-style:italic;">Use your finger or cursor to scratch off the foil</div>
        <button type="button" class="scratch-close-btn" id="closeScratchModal">Close Message</button>
      </div>
    </div>

  </div>
  `;
}

// ============================================================================
// MOUNT & INTERACTIVE LIFECYCLE
// ============================================================================

export function mount(root, { guest, wedding: w }) {
  const screens = [...root.querySelectorAll('.palace-screen')];
  const audioBtn = root.querySelector('#audioToggle');
  const audio = root.querySelector('#royalSoundtrack');

  // -------------------------------------------------------------
  // 1. DISCRETE NAVIGATION CONTROLLER (60 FPS APP TRANSITIONS)
  // -------------------------------------------------------------
  let currentIndex = 0;

  function navigateTo(targetIndex) {
    if (targetIndex === currentIndex || targetIndex < 0 || targetIndex >= screens.length) return;
    
    const curr = screens[currentIndex];
    const next = screens[targetIndex];

    curr.classList.add('is-exiting');
    curr.classList.remove('is-active');

    setTimeout(() => {
      curr.classList.remove('is-exiting');
      next.classList.add('is-active');
      currentIndex = targetIndex;
    }, 450);
  }

  // Event Delegation for All 'Continue' & 'Open' Buttons
  root.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-next-screen]');
    if (btn) {
      const nextIdx = parseInt(btn.getAttribute('data-next-screen'), 10);
      navigateTo(nextIdx);

      // Attempt soundtrack playback on initial human interaction
      if (audio && audio.paused && audioBtn) {
        audio.play().then(() => audioBtn.classList.add('playing')).catch(() => {});
      }
    }
  });

  // -------------------------------------------------------------
  // 2. AUDIO CONCIERGE TOGGLE
  // -------------------------------------------------------------
  if (audioBtn && audio) {
    audioBtn.onclick = () => {
      if (audio.paused) {
        audio.play().then(() => audioBtn.classList.add('playing')).catch(() => {});
      } else {
        audio.pause();
        audioBtn.classList.remove('playing');
      }
    };
  }

  // -------------------------------------------------------------
  // 3. CALENDAR & WHATSAPP DYNAMIC BUILDERS
  // -------------------------------------------------------------
  const calBtn = root.querySelector('#saveCalendarBtn');
  if (calBtn) {
    const calTitle = encodeURIComponent(`Wedding: ${w.bride_name || 'Tarana'} & ${w.groom_name || 'Akbar'}`);
    const calDesc = encodeURIComponent(`You are cordially invited to celebrate the marriage of ${w.bride_name || 'Tarana'} & ${w.groom_name || 'Akbar'}. Venue: ${w.venue || ''}, ${w.address || ''}`);
    const calLoc = encodeURIComponent(`${w.venue || ''}, ${w.address || ''}`);
    
    // Exact 27 Oct 2026 date format for Google Calendar ISO
    const startDate = "20261027T143000Z"; 
    const endDate = "20261027T183000Z";
    calBtn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&dates=${startDate}/${endDate}&details=${calDesc}&location=${calLoc}`;
  }

  const rsvpBtn = root.querySelector('#whatsappRsvpBtn');
  if (rsvpBtn) {
    const rsvpPhone = esc(w.rsvp_number || '919330981386');
    const msg = encodeURIComponent(`Aadab / Namaste, I will be attending the wedding of ${w.bride_name || 'Tarana'} & ${w.groom_name || 'Akbar'}! Guest: ${guest.name || 'Guest'}`);
    rsvpBtn.href = `https://wa.me/${rsvpPhone}?text=${msg}`;
  }

  // -------------------------------------------------------------
  // 4. GOLD FOIL SCRATCH CARD LOGIC
  // -------------------------------------------------------------
  const scratchModal = root.querySelector('#scratchModal');
  const openScratch = root.querySelector('#openScratchCard');
  const closeScratch = root.querySelector('#closeScratchModal');
  const canvas = root.querySelector('#scratchCanvas');

  if (openScratch && scratchModal && canvas) {
    openScratch.onclick = () => {
      scratchModal.classList.add('is-open');
      initScratchEngine(canvas);
    };

    closeScratch.onclick = () => {
      scratchModal.classList.remove('is-open');
    };
  }
}

// Pure Canvas 2D Gold Metallic Foil Scratching Algorithm
function initScratchEngine(canvas) {
  if (canvas._initialized) return;
  canvas._initialized = true;

  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  // Render Metallic Gold Foil Topcoat
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#ECC880');
  grad.addColorStop(0.3, '#D4AF37');
  grad.addColorStop(0.6, '#AA8022');
  grad.addColorStop(0.85, '#FDF0CD');
  grad.addColorStop(1, '#9A7722');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Stamped Gold Foil Stamp Text
  ctx.fillStyle = '#380711';
  ctx.font = 'bold 12px Cinzel, serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '2px';
  ctx.fillText('⚜ SCRATCH TO REVEAL ⚜', w / 2, h / 2 + 4);

  let isDrawing = false;

  function scratch(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, Math.PI * 2, false);
    ctx.fill();
  }

  canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(e); });
  window.addEventListener('mouseup', () => { isDrawing = false; });
  canvas.addEventListener('mousemove', scratch);

  canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, { passive: true });
  window.addEventListener('touchend', () => { isDrawing = false; });
  canvas.addEventListener('touchmove', scratch, { passive: true });
}
