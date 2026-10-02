// ============================================================================
// TEMPLATE-02: ROYAL HERITAGE DIGITAL INVITATION (COMPLETE PRODUCTION SUITE)
// PURE CODE • 100dvh VIEWPORT • AUDIO AUTO-TRIGGER • ZERO-SCROLL 60 FPS
// ============================================================================

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));

// Clean and sanitize raw Excel 1899 timestamps into 12-hour AM/PM format
function formatLuxuryTime(t) {
  if (!t) return '09:30 PM';
  const str = String(t).trim();
  if (str.includes('1899-') || str.includes('T')) {
    const d = new Date(str);
    if (!isNaN(d)) {
      return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();
    }
  }
  return str.toUpperCase();
}

// Clean and sanitize ISO date strings
function formatLuxuryDate(d) {
  if (!d) return '27 OCTOBER 2026';
  const str = String(d).trim();
  if (str.includes('T')) {
    const dt = new Date(str);
    if (!isNaN(dt)) {
      const day = dt.getDate();
      const month = dt.toLocaleString('en-IN', { month: 'short' }).toUpperCase();
      const year = dt.getFullYear();
      return `${day} ${month} ${year}`;
    }
    return str.split('T')[0];
  }
  return str.toUpperCase();
}

// ============================================================================
// RENDER FUNCTION
// ============================================================================

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
  <!-- Google Typography Suite -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700&family=Great+Vibes&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap" rel="stylesheet">

  <style>
    :root {
      --oxblood: #6f0f1c;
      --oxblood-deep: #460611;
      --gold-24k: #b98a2f;
      --gold-light: #f4d896;
      --gold-line: rgba(185, 138, 47, 0.45);
      --parchment-base: #fdf8ed;
      --parchment-shade: #f4e4c5;
    }

    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

    /* Root App Viewport */
    .royal-universe {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at 50% 20%, #36050e 0%, #160105 60%, #0a0002 100%);
    }

    .royal-universe::before {
      content: "";
      position: absolute;
      inset: 0;
      background-image: 
        radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.12) 0%, transparent 65%),
        url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 0l25 25-25 25L0 25z' fill='none' stroke='%23d4af37' stroke-opacity='0.035'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 1;
    }

    .royal-viewport-box {
      position: relative;
      width: 100%;
      max-width: 425px;
      height: 100%;
      max-height: 100dvh;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: max(6px, env(safe-area-inset-top)) 6px max(8px, env(safe-area-inset-bottom));
    }

    /* Screen Panels (Only 1 Active At A Time) */
    .screen-panel {
      position: absolute;
      inset: max(6px, env(safe-area-inset-top)) 6px max(8px, env(safe-area-inset-bottom));
      border-radius: min(44vw, 190px) min(44vw, 190px) 24px 24px;
      background: linear-gradient(180deg, #FFFDF8 0%, #FAF2DF 48%, #F2DFBF 100%);
      box-shadow: 
        0 20px 60px rgba(0, 0, 0, 0.8),
        0 0 35px rgba(185, 138, 47, 0.2),
        inset 0 0 35px rgba(212, 175, 55, 0.12);
      border: 3px solid #dfc384;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      padding: 24px 18px 16px;
      opacity: 0;
      pointer-events: none;
      transform: scale(0.96) translateY(12px);
      filter: blur(8px);
      transition: 
        opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
        transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
        filter 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 5;
    }

    /* Carved 3D Scalloped Pearl Border */
    .screen-panel::before {
      content: "";
      position: absolute;
      inset: 6px;
      border: 2px solid #b78a2f;
      border-radius: inherit;
      box-shadow: 
        inset 0 0 0 4px #faf0dc,
        inset 0 0 0 6px #cfab55,
        0 0 0 2px #fff6e0;
      pointer-events: none;
    }
    .screen-panel::after {
      content: "";
      position: absolute;
      inset: 16px;
      border: 1px dashed rgba(183, 138, 47, 0.45);
      border-radius: inherit;
      pointer-events: none;
    }

    .screen-panel.is-active {
      opacity: 1;
      pointer-events: auto;
      transform: scale(1) translateY(0);
      filter: blur(0);
      z-index: 20;
    }

    .screen-panel.is-exiting {
      opacity: 0;
      transform: scale(1.03) translateY(-10px);
      filter: blur(6px);
      pointer-events: none;
    }

    /* Floating Music Knob */
    .audio-knob {
      position: fixed;
      top: max(14px, env(safe-area-inset-top));
      right: max(14px, env(safe-area-inset-right));
      z-index: 1000;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: rgba(43, 3, 11, 0.9);
      border: 1.5px solid var(--gold-24k);
      backdrop-filter: blur(10px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .audio-knob svg { width: 18px; height: 18px; fill: var(--gold-light); }
    .audio-knob.spinning svg { animation: spinKnob 5s linear infinite; }
    @keyframes spinKnob { 100% { transform: rotate(360deg); } }

    /* Tactical CTA Button */
    .palace-btn {
      width: 100%;
      max-width: 270px;
      min-height: 44px;
      background: linear-gradient(135deg, var(--oxblood) 0%, var(--oxblood-deep) 100%);
      border: 1.5px solid var(--gold-24k);
      border-radius: 999px;
      color: var(--gold-light);
      font-family: 'Cinzel', serif;
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      box-shadow: 0 8px 20px rgba(70, 6, 17, 0.45);
      transition: transform 0.2s ease;
      flex-shrink: 0;
    }
    .palace-btn:active { transform: scale(0.96); }
    .palace-btn svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 2; }

    /* Stepper Dots */
    .stepper-dots {
      display: flex;
      gap: 6px;
      margin-bottom: 2px;
    }
    .step-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: rgba(183, 138, 47, 0.3);
      transition: width 0.3s ease, background 0.3s ease;
    }
    .step-dot.active {
      width: 18px;
      border-radius: 4px;
      background: var(--gold-24k);
    }

    /* Screen Elements */
    .crest-ornament-wrap {
      width: 150px;
      height: 54px;
      margin: 0 auto;
    }

    .main-invitation-title {
      font-family: 'Cinzel', serif;
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 2px;
      color: var(--oxblood);
      text-transform: uppercase;
      margin: 2px 0 0;
    }

    .floret-bar-center {
      width: 180px;
      height: 12px;
      margin: 2px auto 4px;
    }

    .save-the-date-deck {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin: 2px 0 6px;
    }
    .date-label-cell {
      font-family: 'Cinzel', serif;
      font-size: 9.5px;
      font-weight: 700;
      letter-spacing: 1px;
      color: #3b1a1f;
      line-height: 1.25;
    }
    .vertical-sep-gold {
      width: 1.5px;
      height: 30px;
      background: var(--gold-24k);
      opacity: 0.8;
    }
    .date-num-large {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 38px;
      font-style: italic;
      font-weight: 700;
      color: var(--oxblood);
      line-height: 1;
    }

    .couple-layout-container {
      margin: 4px 0 6px;
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 8px;
    }
    .name-bride, .name-groom {
      font-family: 'Great Vibes', cursive;
      font-size: 44px;
      color: var(--oxblood);
      line-height: 1;
    }
    .name-weds {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-style: italic;
      font-size: 21px;
      color: var(--oxblood);
      font-weight: 600;
      transform: translateY(-4px);
    }

    .to-guest-field {
      width: 90%;
      margin: 6px auto;
      position: relative;
      text-align: left;
    }
    .to-label {
      font-family: 'Great Vibes', cursive;
      font-size: 26px;
      color: var(--oxblood);
      display: inline-block;
      vertical-align: bottom;
    }
    .guest-name-cursive {
      font-family: 'Great Vibes', cursive;
      font-size: 32px;
      color: var(--oxblood);
      display: inline-block;
      text-align: center;
      width: calc(100% - 40px);
      line-height: 1;
      transform: translateY(2px);
    }
    .solid-baseline-bar {
      width: 100%;
      height: 1.5px;
      background: var(--oxblood);
      opacity: 0.9;
      margin-top: 2px;
    }
    .guide-subline-bar {
      width: 100%;
      height: 0.8px;
      background: var(--oxblood);
      opacity: 0.4;
      margin-top: 4px;
    }

    .manifest-flourish-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin: 8px auto;
      width: 92%;
    }
    .vine-branch-svg {
      width: 26px;
      height: 26px;
      flex-shrink: 0;
    }
    .person-box-unit, .family-box-unit {
      text-align: center;
    }
    .box-header-script {
      font-family: 'Great Vibes', cursive;
      font-size: 21px;
      color: var(--oxblood);
      line-height: 1;
      margin-bottom: 2px;
    }
    .metric-square-box {
      border: 1.5px solid var(--oxblood);
      background: rgba(255, 255, 255, 0.8);
      width: 74px;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Cormorant Garamond', serif;
      font-size: 17px;
      font-weight: 700;
      color: var(--oxblood);
    }
    .vertical-manifest-divider {
      width: 1px;
      height: 38px;
      background: rgba(111, 15, 28, 0.4);
      margin: 0 4px;
    }

    .host-cordial-lead {
      font-family: 'Cormorant Garamond', serif;
      font-style: italic;
      font-size: 14.5px;
      color: var(--oxblood);
      margin: 4px 0 2px;
    }
    .host-name-bold {
      font-family: 'Playfair Display', serif;
      font-size: 18px;
      font-weight: 700;
      color: var(--oxblood);
      line-height: 1.2;
    }
    .host-address-text {
      font-size: 11.5px;
      font-style: italic;
      color: #3b1a1f;
      line-height: 1.35;
      margin: 2px 0;
    }
    .host-contact-text {
      font-size: 11px;
      font-weight: 700;
      color: #3b1a1f;
      margin: 2px 0;
      letter-spacing: 0.3px;
    }
    .floret-tail-divider {
      width: 160px;
      height: 14px;
      margin: 4px auto 0;
    }

    .event-leaf-stack {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin: 4px 0;
    }
    .event-leaf {
      background: rgba(255, 255, 255, 0.85);
      border: 1px solid rgba(197, 155, 39, 0.4);
      border-left: 3px solid var(--gold-24k);
      border-radius: 6px;
      padding: 5px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: left;
    }

    .closing-buttons-list {
      width: 100%;
      max-width: 290px;
      display: flex;
      flex-direction: column;
      gap: 7px;
    }
    .pill-action {
      padding: 9px 16px;
      border-radius: 30px;
      font-family: 'Cinzel', serif;
      font-size: 9.5px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .pill-oxblood { background: var(--oxblood); color: #fff !important; border: 1px solid var(--gold-24k); }
    .pill-gold { background: linear-gradient(135deg, #ECC880, #C59B27); color: #32030B !important; border: 1px solid #AA8022; }
    .pill-surprise { background: #fff; color: var(--oxblood) !important; border: 1px dashed var(--gold-24k); cursor: pointer; }

    /* Scratch Modal */
    .scratch-stage-modal {
      position: absolute;
      inset: 0;
      z-index: 100;
      background: rgba(20, 2, 5, 0.88);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.35s ease;
    }
    .scratch-stage-modal.is-open { opacity: 1; pointer-events: auto; }
    .scratch-pod {
      width: min(88vw, 320px);
      background: linear-gradient(180deg, #FFFDF8, #F5E9D0);
      border: 2px solid var(--gold-24k);
      border-radius: 18px;
      padding: 20px 16px 16px;
      text-align: center;
    }
  </style>

  <!-- Reusable Shared SVG Flourishes -->
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <defs>
      <g id="vineBranch">
        <path d="M12,24 C10,16 6,12 0,8 C8,10 14,7 18,0 C17,8 21,12 28,14 C20,15 15,19 12,24 Z" fill="#6f0f1c"/>
        <circle cx="2" cy="6" r="1.5" fill="#6f0f1c"/>
        <circle cx="20" cy="2" r="1.5" fill="#6f0f1c"/>
        <circle cx="26" cy="16" r="1.5" fill="#6f0f1c"/>
      </g>
      <g id="flourishTail">
        <line x1="10" y1="8" x2="68" y2="8" stroke="#6f0f1c" stroke-width="1.2"/>
        <line x1="92" y1="8" x2="150" y2="8" stroke="#6f0f1c" stroke-width="1.2"/>
        <circle cx="80" cy="8" r="3" fill="#6f0f1c"/>
        <circle cx="80" cy="3" r="1.6" fill="#6f0f1c"/>
        <circle cx="80" cy="13" r="1.6" fill="#6f0f1c"/>
        <circle cx="75" cy="8" r="1.6" fill="#6f0f1c"/>
        <circle cx="85" cy="8" r="1.6" fill="#6f0f1c"/>
        <circle cx="76.5" cy="4.5" r="1.4" fill="#6f0f1c"/>
        <circle cx="83.5" cy="4.5" r="1.4" fill="#6f0f1c"/>
        <circle cx="76.5" cy="11.5" r="1.4" fill="#6f0f1c"/>
        <circle cx="83.5" cy="11.5" r="1.4" fill="#6f0f1c"/>
      </g>
    </defs>
  </svg>

  <div class="royal-universe">
    
    <!-- Audio Element (invitation.mp3 fallback) -->
    <button class="audio-knob" id="audioToggle" aria-label="Toggle Music" type="button">
      <svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
      <audio id="royalAudio" loop preload="auto">
        <source src="${esc(w.music_url || 'invitation.mp3')}" type="audio/mp3">
      </audio>
    </button>

    <div class="royal-viewport-box">

      <!-- ========================================================
           SCREEN 0: ROYAL WELCOME
           ======================================================== -->
      <section class="screen-panel is-active" data-index="0" aria-label="Welcome">
        <div class="stepper-dots">
          <span class="step-dot active"></span><span class="step-dot"></span>
          <span class="step-dot"></span><span class="step-dot"></span><span class="step-dot"></span>
        </div>

        <div>
          <svg class="crest-ornament-wrap" viewBox="0 0 160 56">
            <path d="M42,28 C28,18 16,24 4,32 C18,34 30,32 40,28 Z" fill="#6f0f1c" opacity=".85"/>
            <path d="M118,28 C132,18 144,24 156,32 C142,34 130,32 120,28 Z" fill="#6f0f1c" opacity=".85"/>
            <circle cx="80" cy="28" r="22" fill="none" stroke="#6f0f1c" stroke-width="1.4"/>
            <circle cx="80" cy="28" r="19" fill="none" stroke="#b98a2f" stroke-width=".8"/>
            <text x="80" y="36" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="21" font-weight="700" fill="#6f0f1c">${initials}</text>
            <circle cx="80" cy="4" r="2" fill="#b98a2f"/>
          </svg>
          <div style="font-family:'Cinzel',serif; font-size:9.5px; letter-spacing:2px; color:var(--oxblood); font-weight:700;">Imperial Matrimony</div>
        </div>

        <div>
          <h1 style="font-family:'Great Vibes',cursive; font-size:clamp(54px, 16vw, 68px); color:var(--oxblood); margin:2px 0; line-height:1;">Welcome</h1>
          <svg style="width:160px; height:14px; margin:2px auto;"><use href="#flourishTail"/></svg>

          <div style="font-family:'Cormorant Garamond', serif; font-size:24px; font-style:italic; color:var(--oxblood); margin:8px 0;">
            Dear <strong>${guestName}</strong>
          </div>

          <p style="font-style:italic; font-size:15px; line-height:1.45; color:#3b1a1f; max-width:88%; margin:6px auto 0;">
            With immense joy, we invite you to celebrate the wedding union of
            <span style="font-family:'Great Vibes',cursive; font-size:32px; color:var(--oxblood); display:inline-block; margin-top:2px;">${bride} &amp; ${groom}</span>.
          </p>
        </div>

        <button class="palace-btn" type="button" data-next="1">
          <span>Open Invitation</span>
          <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </section>

      <!-- ========================================================
           SCREEN 1: SAVE THE DATE / VIP PASS
           ======================================================== -->
      <section class="screen-panel" data-index="1" aria-label="Save The Date">
        <div class="stepper-dots">
          <span class="step-dot"></span><span class="step-dot active"></span>
          <span class="step-dot"></span><span class="step-dot"></span><span class="step-dot"></span>
        </div>

        <div>
          <svg class="crest-ornament-wrap" viewBox="0 0 160 56">
            <path d="M42,28 C28,18 16,24 4,32 C18,34 30,32 40,28 Z" fill="#6f0f1c" opacity=".85"/>
            <path d="M118,28 C132,18 144,24 156,32 C142,34 130,32 120,28 Z" fill="#6f0f1c" opacity=".85"/>
            <circle cx="80" cy="28" r="22" fill="none" stroke="#6f0f1c" stroke-width="1.4"/>
            <circle cx="80" cy="28" r="19" fill="none" stroke="#b98a2f" stroke-width=".8"/>
            <text x="80" y="36" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="21" font-weight="700" fill="#6f0f1c">${initials}</text>
            <circle cx="80" cy="52" r="2" fill="#6f0f1c"/>
          </svg>

          <h2 class="main-invitation-title">Wedding Invitation</h2>
          <svg class="floret-bar-center" viewBox="0 0 160 14"><use href="#flourishTail"/></svg>

          <div class="save-the-date-deck">
            <div class="date-label-cell" style="text-align:right;">SAVE THE DATE<br>TUESDAY</div>
            <div class="vertical-sep-gold"></div>
            <div class="date-num-large">27th</div>
            <div class="vertical-sep-gold"></div>
            <div class="date-label-cell" style="text-align:left;">OCTOBER<br>2026</div>
          </div>
        </div>

        <div>
          <div class="couple-layout-container">
            <span class="name-bride">${bride}</span>
            <span class="name-weds">weds</span>
            <span class="name-groom">${groom}</span>
          </div>

          <div class="to-guest-field">
            <div>
              <span class="to-label">To</span>
              <span class="guest-name-cursive">${guestName}</span>
            </div>
            <div class="solid-baseline-bar"></div>
            <div class="guide-subline-bar"></div>
          </div>

          <div class="manifest-flourish-row">
            <svg class="vine-branch-svg" viewBox="0 0 28 24"><use href="#vineBranch"/></svg>

            <div class="person-box-unit">
              <div class="box-header-script">Person</div>
              <div class="metric-square-box">${persons}</div>
            </div>

            <div class="vertical-manifest-divider"></div>

            <div class="family-box-unit">
              <div class="box-header-script">Family</div>
              <div class="metric-square-box">${isFamily}</div>
            </div>

            <svg class="vine-branch-svg" viewBox="0 0 28 24" style="transform: scaleX(-1);"><use href="#vineBranch"/></svg>
          </div>
        </div>

        <div>
          <div class="host-cordial-lead">A Cordial Invitation</div>
          <div class="host-name-bold">${esc(w.host_name || 'Mrs. & Mr. Md Kalim Khan')}</div>
          <div class="host-address-text">${esc(w.address || '283/10 Belilious Road, Howrah<br>West Bengal – 711101')}</div>
          <div class="host-contact-text">M.: ${esc(w.rsvp_contacts || '9330981386, +917033098070')}</div>
          <svg class="floret-tail-divider" viewBox="0 0 160 14"><use href="#flourishTail"/></svg>
        </div>

        <button class="palace-btn" type="button" data-next="2">
          <span>The Ceremony</span>
          <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </section>

      <!-- ========================================================
           SCREEN 2: CEREMONY FARMAN
           ======================================================== -->
      <section class="screen-panel" data-index="2" aria-label="Ceremony">
        <div class="stepper-dots">
          <span class="step-dot"></span><span class="step-dot"></span>
          <span class="step-dot active"></span><span class="step-dot"></span><span class="step-dot"></span>
        </div>

        <div>
          <div style="font-style:italic; font-size:12px; color:#5c202a;">
            ${esc(w.invocation || 'In the name of Allah the most beneficent & merciful')}
          </div>
          <svg style="width:140px; height:12px; margin:2px auto;"><use href="#flourishTail"/></svg>
          <div style="font-family:'Cinzel',serif; font-size:14px; letter-spacing:3px; color:var(--oxblood); font-weight:700;">Marriage Ceremony</div>
        </div>

        <div>
          <div style="font-size:12px; font-style:italic;">has great pleasure to invite you to attend the wedding of their daughter</div>
          
          <div style="font-family:'Cormorant Garamond',serif; font-size:24px; font-weight:700; color:var(--oxblood); margin-top:4px;">
            ${brideFull}
          </div>
          <div style="font-size:10.5px; opacity:0.85;">${esc(w.bride_parents || '(D/o Mrs. & Mr. Md Kalim Khan, Howrah)')}</div>

          <div style="font-family:'Great Vibes',cursive; font-size:32px; color:var(--oxblood); margin:2px 0;">Weds</div>

          <div style="font-family:'Cormorant Garamond',serif; font-size:24px; font-weight:700; color:var(--oxblood);">
            ${groomFull}
          </div>
          <div style="font-size:10.5px; opacity:0.85;">${esc(w.groom_parents || '(S/o Mrs. & Mr. Moin Siddique, Ramgarh)')}</div>
        </div>

        <div style="border-top:1px solid rgba(183,138,47,0.4); width:90%; padding-top:4px;">
          <div style="font-family:'Cinzel',serif; font-size:7.5px; color:var(--oxblood); font-weight:700;">With Best Compliments From</div>
          <div style="font-size:14px; font-weight:700; color:var(--oxblood);">${esc(w.compliments || 'Kalim Fish Seed')}</div>
          <div style="font-size:9.5px; opacity:0.85; margin-top:2px;">R.S.V.P: ${esc(w.rsvp_contacts || 'Md Kalim Khan 9330981386')}</div>
        </div>

        <button class="palace-btn" type="button" data-next="3">
          <span>View Programme</span>
          <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </section>

      <!-- ========================================================
           SCREEN 3: WEDDING PROGRAMME
           ======================================================== -->
      <section class="screen-panel" data-index="3" aria-label="Programme">
        <div class="stepper-dots">
          <span class="step-dot"></span><span class="step-dot"></span>
          <span class="step-dot"></span><span class="step-dot active"></span><span class="step-dot"></span>
        </div>

        <div>
          <div style="font-style:italic; font-size:11.5px; color:#5c202a;">Insha Allah, to be solemnised as per the programme</div>
          <div style="font-family:'Cinzel',serif; font-size:13px; letter-spacing:2.5px; color:var(--oxblood); font-weight:700; margin-top:2px;">Wedding Programme</div>
        </div>

        <div class="event-leaf-stack">
          ${events && events.length ? events.map(ev => `
            <div class="event-leaf">
              <div>
                <strong style="color:var(--oxblood); font-size:12.5px;">${esc(ev.event_name)}</strong>
                <div style="font-size:9.5px; opacity:0.8;">${formatLuxuryDate(ev.event_date)}${ev.note ? '• ' + esc(ev.note) : ''}</div>
              </div>
              <span style="font-family:'Cinzel',serif; font-size:9px; color:#8b6818; font-weight:700;">${formatLuxuryTime(ev.event_time)}</span>
            </div>
          `).join('') : `
            <div class="event-leaf">
              <div>
                <strong style="color:var(--oxblood); font-size:12.5px;">Milaad Sharif</strong>
                <div style="font-size:9.5px; opacity:0.8;">24 OCT 2026 (Baad Namaz-e-Isha)</div>
              </div>
              <span style="font-family:'Cinzel',serif; font-size:9px; font-weight:700;">09:00 PM</span>
            </div>
            <div class="event-leaf">
              <div>
                <strong style="color:var(--oxblood); font-size:12.5px;">Rasm-e-Haldi &amp; Mehndi</strong>
                <div style="font-size:9.5px; opacity:0.8;">25 &amp; 26 OCT 2026</div>
              </div>
              <span style="font-family:'Cinzel',serif; font-size:9px; font-weight:700;">06:00 PM</span>
            </div>
            <div class="event-leaf">
              <div>
                <strong style="color:var(--oxblood); font-size:12.5px;">Baraat, Nikah &amp; Banquet</strong>
                <div style="font-size:9.5px; opacity:0.8;">Tuesday 27 OCT 2026</div>
              </div>
              <span style="font-family:'Cinzel',serif; font-size:9px; font-weight:700;">08:00 PM</span>
            </div>
            <div class="event-leaf">
              <div>
                <strong style="color:var(--oxblood); font-size:12.5px;">Rukhsati</strong>
                <div style="font-size:9.5px; opacity:0.8;">Wednesday 28 OCT 2026</div>
              </div>
              <span style="font-family:'Cinzel',serif; font-size:9px; font-weight:700;">08:00 AM</span>
            </div>
          `}
        </div>

        <div>
          <div style="font-family:'Cinzel',serif; font-size:8px; color:var(--oxblood); font-weight:700;">Banquet Venue</div>
          <div style="font-size:14px; font-weight:700; color:var(--oxblood);">${esc(w.venue || 'Shuubh Arambh Banquet')}</div>
          <div style="font-size:10px; opacity:0.85;">${esc(w.address || '131, Belilious Rd, Tikiapara, Howrah')}</div>
        </div>

        <button class="palace-btn" type="button" data-next="4">
          <span>Closing Heirloom</span>
          <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </section>

      <!-- ========================================================
           SCREEN 4: CLOSING & 1-TAP CONCIERGE
           ======================================================== -->
      <section class="screen-panel" data-index="4" aria-label="Closing">
        <div class="stepper-dots">
          <span class="step-dot"></span><span class="step-dot"></span>
          <span class="step-dot"></span><span class="step-dot"></span><span class="step-dot active"></span>
        </div>

        <div>
          <svg class="crest-ornament-wrap" viewBox="0 0 160 56" style="height:44px;">
            <circle cx="80" cy="28" r="22" fill="none" stroke="#6f0f1c" stroke-width="1.3"/>
            <text x="80" y="36" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="20" font-weight="700" fill="#6f0f1c">${initials}</text>
          </svg>
          <div style="font-family:'Great Vibes',cursive; font-size:44px; color:var(--oxblood); line-height:1.05; margin:4px 0;">
            With Love<br>&amp; Warmest Regards
          </div>
          <div style="font-size:18px; font-weight:700; color:var(--oxblood); margin-top:2px;">
            ${esc(w.footer_text || 'Md Kalim Khan & Family')}
          </div>
        </div>

        <div class="closing-buttons-list">
          ${w.map_url ? `
            <a href="${esc(w.map_url)}" target="_blank" rel="noopener noreferrer" class="pill-action pill-gold">
              <span>📍 View Venue Location</span>
            </a>
          ` : ''}

          <a href="#" id="saveCalBtn" target="_blank" rel="noopener noreferrer" class="pill-action pill-oxblood">
            <span>📅 Save Date To Calendar</span>
          </a>

          <a href="#" id="waRsvpBtn" target="_blank" rel="noopener noreferrer" class="pill-action pill-gold">
            <span>💬 Confirm RSVP via WhatsApp</span>
          </a>

          <button type="button" id="triggerScratch" class="pill-action pill-surprise">
            <span>✨ One Little Surprise (Scratch)</span>
          </button>
        </div>

        <button class="palace-btn" type="button" data-next="0" style="min-height:36px; max-width:180px; font-size:9px;">
          <span>Return To Opening</span>
        </button>
      </section>

    </div>

    <!-- Gold Scratch Foil Modal -->
    <div class="scratch-stage-modal" id="scratchModal">
      <div class="scratch-pod">
        <div style="font-family:'Cinzel',serif; font-size:9.5px; color:var(--gold-deep); font-weight:700;">Royal Token</div>
        <div style="font-size:15px; font-weight:700; color:var(--oxblood); margin-top:2px;">A Warm Sentiment</div>
        
        <div style="position:relative; width:260px; height:120px; margin:12px auto; border-radius:10px; overflow:hidden; border:1.5px solid var(--gold-24k);">
          <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#FFFDF8; padding:8px;">
            <span style="font-size:20px;">🕊️</span>
            <div style="font-size:13px; font-weight:700; color:var(--oxblood); margin-top:3px;">"Your Presence Is Our Greatest Blessing"</div>
          </div>
          <canvas id="scratchCanvas" width="260" height="120" style="position:absolute; inset:0; touch-action:none;"></canvas>
        </div>

        <button type="button" id="closeScratch" style="background:none; border:none; font-family:'Cinzel',serif; font-size:9.5px; letter-spacing:2px; text-transform:uppercase; color:var(--oxblood); cursor:pointer; text-decoration:underline;">
          Close Card
        </button>
      </div>
    </div>

  </div>
  `;
}

// ============================================================================
// MOUNT FUNCTION (STATE MACHINE & INTERACTIONS)
// ============================================================================

export function mount(root, { guest, wedding: w }) {
  const screens = [...root.querySelectorAll('.screen-panel')];
  const audioBtn = root.querySelector('#audioToggle');
  const audio = root.querySelector('#royalAudio');

  let activeIndex = 0;
  let audioInitiated = false;

  function switchScreen(targetIndex) {
    if (targetIndex === activeIndex || targetIndex < 0 || targetIndex >= screens.length) return;

    const currentScreen = screens[activeIndex];
    const targetScreen = screens[targetIndex];

    currentScreen.classList.add('is-exiting');
    currentScreen.classList.remove('is-active');

    setTimeout(() => {
      currentScreen.classList.remove('is-exiting');
      targetScreen.classList.add('is-active');
      activeIndex = targetIndex;
    }, 400);
  }

  // Unified Button Handler (Navigation + Tap-To-Play Audio Trigger)
  root.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-next]');
    if (btn) {
      const target = parseInt(btn.getAttribute('data-next'), 10);
      switchScreen(target);

      // User gesture triggers audio playback per modern browser requirements
      if (audio && !audioInitiated) {
        audioInitiated = true;
        audio.currentTime = 0;
        audio.play().then(() => {
          if (audioBtn) audioBtn.classList.add('spinning');
        }).catch((err) => {
          console.log("Audio auto-play policy notification:", err);
        });
      }
    }
  });

  // Audio Toggle Switch
  if (audioBtn && audio) {
    audioBtn.onclick = () => {
      if (audio.paused) {
        audio.play().then(() => audioBtn.classList.add('spinning')).catch(() => {});
      } else {
        audio.pause();
        audioBtn.classList.remove('spinning');
      }
    };
  }

  // Dynamic Google Calendar Generator (27th Oct 2026)
  const calBtn = root.querySelector('#saveCalBtn');
  if (calBtn) {
    const calTitle = encodeURIComponent(`Wedding: ${w.bride_name || 'Tarana'} & ${w.groom_name || 'Akbar'}`);
    const calDesc = encodeURIComponent(`You are cordially invited to celebrate the marriage of ${w.bride_name || 'Tarana'} & ${w.groom_name || 'Akbar'}. Venue: ${w.venue || ''}, ${w.address || ''}`);
    const calLoc = encodeURIComponent(`${w.venue || ''}, ${w.address || ''}`);
    const startUTC = "20261027T143000Z";
    const endUTC = "20261027T183000Z";
    calBtn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&dates=${startUTC}/${endUTC}&details=${calDesc}&location=${calLoc}`;
  }

  // Dynamic WhatsApp VIP Concierge
  const rsvpBtn = root.querySelector('#waRsvpBtn');
  if (rsvpBtn) {
    const rsvpPhone = esc(w.rsvp_number || '919330981386');
    const msg = encodeURIComponent(`Aadab / Namaste, I will be attending the wedding of ${w.bride_name || 'Tarana'} & ${w.groom_name || 'Akbar'}! Guest: ${guest.name || 'Guest'}`);
    rsvpBtn.href = `https://wa.me/${rsvpPhone}?text=${msg}`;
  }

  // Canvas Scratch Card Handlers
  const modal = root.querySelector('#scratchModal');
  const openScratch = root.querySelector('#triggerScratch');
  const closeScratch = root.querySelector('#closeScratch');
  const canvas = root.querySelector('#scratchCanvas');

  if (openScratch && modal && canvas) {
    openScratch.onclick = () => {
      modal.classList.add('is-open');
      initScratch(canvas);
    };
    closeScratch.onclick = () => modal.classList.remove('is-open');
  }
}

// Pure Canvas 2D Gold Metallic Foil Scratching Engine
function initScratch(canvas) {
  if (canvas._init) return;
  canvas._init = true;

  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#ECC880');
  grad.addColorStop(0.35, '#C59B27');
  grad.addColorStop(0.7, '#8E6E1D');
  grad.addColorStop(1, '#ECC880');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = '#42050e';
  ctx.font = 'bold 11px Cinzel, serif';
  ctx.textAlign = 'center';
  ctx.fillText('⚜ SCRATCH TO REVEAL ⚜', w / 2, h / 2 + 4);

  let isDrawing = false;
  function scratch(e) {
    if (!isDrawing) return;
    const r = canvas.getBoundingClientRect();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(cx - r.left, cy - r.top, 15, 0, Math.PI * 2);
    ctx.fill();
  }

  canvas.addEventListener('mousedown', () => { isDrawing = true; });
  window.addEventListener('mouseup', () => { isDrawing = false; });
  canvas.addEventListener('mousemove', scratch);
  canvas.addEventListener('touchstart', () => { isDrawing = true; }, { passive: true });
  window.addEventListener('touchend', () => { isDrawing = false; });
  canvas.addEventListener('touchmove', scratch, { passive: true });
}
