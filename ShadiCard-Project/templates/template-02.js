// ============================================================================
// TEMPLATE-02: COUTURE ROYAL HEIRLOOM EDITION
// 100dvh VIEWPORT APP • ZERO SCROLL • REALISTIC 24K FOIL • 60 FPS TRANSITIONS
// ============================================================================

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));

// Clean and sanitize 1899 Excel epoch timestamps
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
       PALACE DESIGN TOKENS
       ------------------------------------------------------------- */
    :root {
      --oxblood-base: #180206;
      --oxblood-surface: #2c030c;
      --oxblood-rich: #4d0714;
      --oxblood-card: #FAF2E3;
      --gold-24k: #D4AF37;
      --gold-light: #F7E5B5;
      --gold-deep: #8E6E1D;
      --gold-foil: linear-gradient(135deg, #F9E7BA 0%, #D4AF37 35%, #9E7822 65%, #FBF0D2 85%, #8C6A1A 100%);
      --text-burgundy: #380711;
      --text-muted: #6A323D;
      --gold-glow: 0 0 25px rgba(212, 175, 55, 0.22);
    }

    /* -------------------------------------------------------------
       APP CHASSIS & DESKTOP STAGECRAFT
       ------------------------------------------------------------- */
    .palace-universe {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at 50% 18%, #36050e 0%, #170105 60%, #0c0003 100%);
      isolation: isolate;
    }

    /* Subtle Handmade Metallic Grain */
    .palace-universe::before {
      content: "";
      position: absolute;
      inset: 0;
      background-image: 
        radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.12) 0%, transparent 65%),
        url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fill-opacity='0.035' fill-rule='evenodd'%3E%3Cpath d='M30 0l30 30-30 30L0 30z'/%3E%3C/g%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 1;
    }

    .palace-app-frame {
      position: relative;
      width: 100%;
      max-width: 420px;
      height: 100%;
      max-height: 100dvh;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: max(10px, env(safe-area-inset-top)) 10px max(12px, env(safe-area-inset-bottom));
      box-sizing: border-box;
    }

    /* -------------------------------------------------------------
       DISCRETE SCREEN CONTAINER (NO SCROLL, PURE APP SWITCH)
       ------------------------------------------------------------- */
    .screen-envelope {
      position: absolute;
      inset: max(8px, env(safe-area-inset-top)) 8px max(10px, env(safe-area-inset-bottom));
      border-radius: min(44vw, 190px) min(44vw, 190px) 24px 24px;
      background: linear-gradient(180deg, #FFFDF8 0%, #FBF2E0 50%, #F1DFC0 100%);
      border: 1.5px solid var(--gold-24k);
      box-shadow: 
        0 20px 60px rgba(0, 0, 0, 0.75),
        0 0 35px rgba(212, 175, 55, 0.14),
        inset 0 0 25px rgba(212, 175, 55, 0.08);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      padding: 30px 18px 20px;
      box-sizing: border-box;
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

    /* Real Intaglio Dual Gold Inset Borders */
    .screen-envelope::before {
      content: "";
      position: absolute;
      inset: 6px;
      border: 1px solid rgba(212, 175, 55, 0.6);
      border-radius: inherit;
      pointer-events: none;
    }
    .screen-envelope::after {
      content: "";
      position: absolute;
      inset: 9px;
      border: 1px dashed rgba(160, 120, 30, 0.32);
      border-radius: inherit;
      pointer-events: none;
    }

    .screen-envelope.is-active {
      opacity: 1;
      pointer-events: auto;
      transform: scale(1) translateY(0);
      filter: blur(0);
      z-index: 20;
    }

    .screen-envelope.is-exiting {
      opacity: 0;
      transform: scale(1.03) translateY(-10px);
      filter: blur(6px);
      pointer-events: none;
    }

    /* -------------------------------------------------------------
       AUDIO FLOATING CONTROLLER
       ------------------------------------------------------------- */
    .audio-pinnacle {
      position: fixed;
      top: max(14px, env(safe-area-inset-top));
      right: max(14px, env(safe-area-inset-right));
      z-index: 1000;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: rgba(36, 4, 10, 0.88);
      border: 1px solid var(--gold-24k);
      backdrop-filter: blur(10px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.5), var(--gold-glow);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    .audio-pinnacle:active { transform: scale(0.92); }
    .audio-pinnacle svg { width: 18px; height: 18px; fill: var(--gold-24k); }
    .audio-pinnacle.is-playing svg { animation: audioRotate 6s linear infinite; }
    @keyframes audioRotate { 100% { transform: rotate(360deg); } }

    /* -------------------------------------------------------------
       ROYAL MONOGRAM EMBLEM
       ------------------------------------------------------------- */
    .crest-seal {
      position: relative;
      width: 66px;
      height: 66px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .crest-seal-ring {
      position: absolute;
      inset: 0;
      border: 1.5px solid var(--gold-24k);
      border-radius: 50%;
      background: radial-gradient(circle, #fffdfa 0%, #f6ebd2 100%);
      box-shadow: 0 4px 14px rgba(212, 175, 55, 0.22);
    }
    .crest-seal-crown {
      position: absolute;
      top: -10px;
      font-size: 14px;
      filter: drop-shadow(0 2px 3px rgba(0,0,0,0.25));
    }
    .crest-seal-initials {
      position: relative;
      font-family: 'Cinzel', serif;
      font-size: 19px;
      font-weight: 700;
      color: var(--oxblood-rich);
      letter-spacing: 1.5px;
    }

    /* -------------------------------------------------------------
       COUTURE TYPOGRAPHY
       ------------------------------------------------------------- */
    .hero-script {
      font-family: 'Great Vibes', cursive;
      color: var(--oxblood-rich);
      line-height: 0.98;
      font-weight: 400;
      margin: 0;
      text-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);
    }

    .cinzel-regal {
      font-family: 'Cinzel', serif;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: var(--gold-deep);
      font-weight: 700;
      margin: 0;
    }

    .flourish-bar {
      width: 150px;
      height: 12px;
      margin: 4px auto;
      opacity: 0.85;
      flex-shrink: 0;
    }

    /* -------------------------------------------------------------
       CONTINUE CTA BUTTON (TACTILE GOLD FOIL PRESS)
       ------------------------------------------------------------- */
    .cta-couture {
      position: relative;
      width: 100%;
      max-width: 270px;
      min-height: 46px;
      background: linear-gradient(135deg, var(--oxblood-rich) 0%, var(--oxblood-surface) 100%);
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
      gap: 10px;
      cursor: pointer;
      box-shadow: 0 8px 22px rgba(36, 4, 10, 0.42), inset 0 1px 1px rgba(255,255,255,0.3);
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
      flex-shrink: 0;
    }
    .cta-couture:active {
      transform: scale(0.96);
      box-shadow: 0 4px 10px rgba(36, 4, 10, 0.3);
    }
    .cta-couture svg {
      width: 13px;
      height: 13px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      transition: transform 0.25s ease;
    }
    .cta-couture:hover svg {
      transform: translateX(3px);
    }

    /* Progression Pips */
    .pip-cluster {
      display: flex;
      gap: 5px;
      margin-bottom: 2px;
      flex-shrink: 0;
    }
    .pip-unit {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: rgba(142, 110, 29, 0.25);
      transition: width 0.3s ease, background 0.3s ease;
    }
    .pip-unit.active {
      width: 16px;
      border-radius: 4px;
      background: var(--gold-24k);
    }

    /* -------------------------------------------------------------
       SCREEN CARD STRUCTURES
       ------------------------------------------------------------- */
    
    /* Screen 0: Welcome */
    .welcome-guest-box {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.16), rgba(212, 175, 55, 0.04));
      border: 1px solid rgba(212, 175, 55, 0.45);
      border-radius: 30px;
      padding: 7px 20px;
      margin: 8px auto;
      max-width: 90%;
    }

    /* Screen 1: Pass & Date */
    .calendar-strip {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin: 6px 0;
      padding: 4px 0;
      border-top: 1px solid rgba(212, 175, 55, 0.35);
      border-bottom: 1px solid rgba(212, 175, 55, 0.35);
      width: 86%;
    }
    .calendar-num {
      font-size: 38px;
      font-weight: 700;
      font-family: 'Playfair Display', serif;
      color: var(--oxblood-rich);
      line-height: 1;
    }
    .vip-manifest-card {
      background: rgba(255, 255, 255, 0.72);
      border: 1px solid rgba(212, 175, 55, 0.45);
      border-radius: 10px;
      padding: 6px 14px;
      width: 92%;
      margin: 4px 0;
    }
    .manifest-name {
      font-family: 'Playfair Display', serif;
      font-size: 18px;
      font-weight: 700;
      color: var(--oxblood-rich);
      border-bottom: 1px dashed rgba(212, 175, 55, 0.6);
      padding-bottom: 3px;
      margin: 1px 0 5px;
    }

    /* Screen 3: Compressed Mobile Programme Timeline */
    .timeline-curated-stack {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin: 6px 0;
    }
    .timeline-leaf {
      background: rgba(255, 255, 255, 0.88);
      border: 1px solid rgba(212, 175, 55, 0.35);
      border-left: 3px solid var(--gold-24k);
      border-radius: 6px;
      padding: 5px 10px;
      text-align: left;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .leaf-title {
      font-size: 12.5px;
      font-weight: 700;
      color: var(--oxblood-rich);
      font-family: 'Playfair Display', serif;
    }
    .leaf-meta {
      font-size: 9.5px;
      color: var(--text-muted);
      margin-top: 1px;
    }
    .leaf-time {
      font-family: 'Cinzel', serif;
      font-size: 9.5px;
      font-weight: 700;
      color: var(--gold-deep);
      white-space: nowrap;
    }

    /* Screen 4: Luxury Action Center */
    .action-concierge-stack {
      width: 100%;
      max-width: 300px;
      display: flex;
      flex-direction: column;
      gap: 7px;
      margin-top: 4px;
    }
    .pill-concierge {
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
      transition: transform 0.2s ease;
    }
    .pill-concierge:active { transform: scale(0.97); }
    .pill-wine {
      background: linear-gradient(135deg, #4d0714 0%, #260209 100%);
      color: var(--gold-light) !important;
      border: 1px solid var(--gold-24k);
      box-shadow: 0 4px 12px rgba(36, 4, 10, 0.3);
    }
    .pill-metallic-gold {
      background: var(--gold-foil);
      color: #260209 !important;
      border: 1px solid #bf9628;
      box-shadow: 0 4px 12px rgba(191, 150, 40, 0.28);
    }
    .pill-secret-reveal {
      background: #ffffff;
      color: var(--oxblood-rich) !important;
      border: 1px dashed var(--gold-24k);
      cursor: pointer;
    }

    /* -------------------------------------------------------------
       MODAL: GOLD SCRATCH CARD EXPERIENCE
       ------------------------------------------------------------- */
    .scratch-foil-stage {
      position: absolute;
      inset: 0;
      z-index: 100;
      background: rgba(18, 1, 4, 0.88);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.35s ease;
    }
    .scratch-foil-stage.is-open {
      opacity: 1;
      pointer-events: auto;
    }
    .scratch-intaglio-card {
      width: min(88vw, 320px);
      background: linear-gradient(180deg, #FFFDF8 0%, #F5E9D0 100%);
      border: 2px solid var(--gold-24k);
      border-radius: 18px;
      padding: 20px 16px 16px;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0,0,0,0.8), var(--gold-glow);
    }
    .scratch-viewport {
      position: relative;
      width: 270px;
      height: 130px;
      margin: 12px auto 10px;
      border-radius: 10px;
      overflow: hidden;
      border: 1.5px solid var(--gold-24k);
      box-shadow: inset 0 2px 6px rgba(0,0,0,0.2);
    }
    .scratch-unveiled-content {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #FFFDF8;
      padding: 10px;
    }
    #scratchCanvas {
      position: absolute;
      inset: 0;
      cursor: crosshair;
      touch-action: none;
    }
  </style>

  <!-- SVG Ornamental Assets -->
  <svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="goldSpecGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#F9E7BA"/>
        <stop offset="50%" stop-color="#D4AF37"/>
        <stop offset="100%" stop-color="#8E6E1D"/>
      </linearGradient>
      <symbol id="palace-leaf" viewBox="0 0 140 18">
        <path d="M70,9 C55,4 40,4 20,9 C40,14 55,14 70,9 Z M70,9 C85,4 100,4 120,9 C100,14 85,14 70,9 Z" fill="url(#goldSpecGrad)"/>
        <circle cx="70" cy="9" r="3.2" fill="#380711" stroke="url(#goldSpecGrad)" stroke-width="1.2"/>
      </symbol>
    </defs>
  </svg>

  <div class="palace-universe">
    
    <!-- Floating Audio Toggle -->
    <button class="audio-pinnacle" id="audioToggle" aria-label="Toggle Royal Soundtrack" type="button">
      <svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
      <audio id="royalSoundtrack" loop preload="none">
        <source src="${esc(w.music_url || 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3')}" type="audio/mp3">
      </audio>
    </button>

    <div class="palace-app-frame" id="palaceAppFrame">

      <!-- ========================================================
           SCREEN 0: ROYAL WELCOME
           ======================================================== -->
      <section class="screen-envelope is-active" data-screen-index="0" aria-label="Welcome">
        <div class="pip-cluster">
          <span class="pip-unit active"></span><span class="pip-unit"></span>
          <span class="pip-unit"></span><span class="pip-unit"></span><span class="pip-unit"></span>
        </div>

        <div>
          <div class="crest-seal">
            <span class="crest-seal-crown">👑</span>
            <div class="crest-seal-ring"></div>
            <div class="crest-seal-initials">${initials}</div>
          </div>
          <div class="cinzel-regal" style="font-size:9.5px; margin-top:6px;">Imperial Matrimony</div>
        </div>

        <div>
          <h1 class="hero-script" style="font-size:clamp(50px, 15vw, 66px);">Welcome</h1>
          <svg class="flourish-bar"><use href="#palace-leaf"/></svg>
          
          <div class="welcome-guest-box">
            <div class="cinzel-regal" style="font-size:7.5px; color:var(--oxblood-rich);">Specially Invited</div>
            <div style="font-family:'Playfair Display',serif; font-size:19px; font-weight:700; color:var(--oxblood-rich); margin-top:1px;">
              ${guestName}
            </div>
          </div>

          <p style="font-style:italic; font-size:15px; line-height:1.45; color:var(--text-burgundy); max-width:88%; margin:6px auto 0;">
            With immense joy, we invite you to celebrate the wedding union of
            <strong style="color:var(--oxblood-rich);">${bride} &amp; ${groom}</strong>.
          </p>
        </div>

        <button class="cta-couture" type="button" data-next-screen="1">
          <span>Open Invitation</span>
          <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </section>

      <!-- ========================================================
           SCREEN 1: SAVE THE DATE (INVITATION PASS)
           ======================================================== -->
      <section class="screen-envelope" data-screen-index="1" aria-label="Save The Date">
        <div class="pip-cluster">
          <span class="pip-unit"></span><span class="pip-unit active"></span>
          <span class="pip-unit"></span><span class="pip-unit"></span><span class="pip-unit"></span>
        </div>

        <div>
          <div class="cinzel-regal" style="font-size:10.5px;">Wedding Invitation</div>
          <div style="font-size:12px; font-style:italic; color:var(--text-muted);">Save The Date</div>
        </div>

        <div class="calendar-strip">
          <div style="text-align:right;">
            <div class="cinzel-regal" style="font-size:8.5px;">Tuesday</div>
            <div style="font-size:10.5px; font-weight:600; color:var(--gold-deep);">${formatLuxuryTime(w.time)}</div>
          </div>
          <div class="calendar-num">27th</div>
          <div style="text-align:left;">
            <div class="cinzel-regal" style="font-size:8.5px;">October</div>
            <div style="font-size:10.5px; font-weight:600; color:var(--gold-deep);">2026</div>
          </div>
        </div>

        <div style="margin:2px 0;">
          <div class="hero-script" style="font-size:42px;">${bride}</div>
          <div class="cinzel-regal" style="font-size:8.5px; margin:1px 0; color:var(--gold-deep);">— WEDS —</div>
          <div class="hero-script" style="font-size:42px;">${groom}</div>
        </div>

        <!-- Personalized Guest Pass -->
        <div class="vip-manifest-card">
          <div class="cinzel-regal" style="font-size:7px; text-align:left; color:var(--text-muted);">VIP Invitation Pass</div>
          <div class="manifest-name">${guestName}</div>
          <div style="display:flex; justify-content:space-around; font-size:11px; font-weight:600; color:var(--text-burgundy);">
            <span>PERSONS: <strong style="color:var(--oxblood-rich);">${persons}</strong></span>
            <span>FAMILY: <strong style="color:var(--oxblood-rich);">${isFamily}</strong></span>
          </div>
        </div>

        <div>
          <div class="cinzel-regal" style="font-size:7.5px;">A Cordial Invitation From</div>
          <div style="font-size:14.5px; font-weight:700; color:var(--oxblood-rich); font-family:'Playfair Display',serif;">
            ${esc(w.host_name || 'Mrs. & Mr. Md Kalim Khan')}
          </div>
          <div style="font-size:9.5px; color:var(--text-muted); line-height:1.3; max-width:90%; margin:1px auto 0;">
            ${esc(w.address || '283/10 Belilious Road, Howrah, West Bengal – 711101')}
          </div>
        </div>

        <button class="cta-couture" type="button" data-next-screen="2">
          <span>The Ceremony</span>
          <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </section>

      <!-- ========================================================
           SCREEN 2: MARRIAGE CEREMONY FARMAN
           ======================================================== -->
      <section class="screen-envelope" data-screen-index="2" aria-label="Ceremony">
        <div class="pip-cluster">
          <span class="pip-unit"></span><span class="pip-unit"></span>
          <span class="pip-unit active"></span><span class="pip-unit"></span><span class="pip-unit"></span>
        </div>

        <div>
          <div style="font-style:italic; font-size:12.5px; color:var(--gold-deep);">
            ${esc(w.invocation || 'In the name of Allah, the Most Beneficent & Merciful')}
          </div>
          <div class="cinzel-regal" style="font-size:12.5px; letter-spacing:3.5px; margin-top:3px; color:var(--oxblood-rich);">
            Marriage Ceremony
          </div>
        </div>

        <div style="font-size:11.5px; font-style:italic; color:var(--text-muted); max-width:90%;">
          ${esc(w.host_name || 'Mrs. & Mr. Md Kalim Khan')} solicit your gracious presence for the ceremony of their daughter
        </div>

        <div>
          <div style="font-family:'Playfair Display',serif; font-size:22px; font-weight:700; color:var(--oxblood-rich); line-height:1.1;">
            ${brideFull}
          </div>
          <div style="font-size:10.5px; color:var(--text-muted); margin-top:1px;">
            ${esc(w.bride_parents || '(D/o Mrs. & Mr. Md Kalim Khan, Howrah)')}
          </div>
          
          <div class="cinzel-regal" style="font-size:9px; margin:4px 0; color:var(--gold-deep);">— WEDS —</div>

          <div style="font-family:'Playfair Display',serif; font-size:22px; font-weight:700; color:var(--oxblood-rich); line-height:1.1;">
            ${groomFull}
          </div>
          <div style="font-size:10.5px; color:var(--text-muted); margin-top:1px;">
            ${esc(w.groom_parents || '(S/o Mrs. & Mr. Moin Siddique, Ramgarh)')}
          </div>
        </div>

        <div style="border-top:1px solid rgba(212,175,55,0.35); width:92%; padding-top:5px;">
          <div class="cinzel-regal" style="font-size:7px;">With Best Compliments From</div>
          <div style="font-family:'Playfair Display',serif; font-size:13.5px; font-weight:700; color:var(--oxblood-rich);">
            ${esc(w.compliments || 'Kalim Fish Seed, Howrah Fish Market')}
          </div>
          <div style="font-size:9.5px; color:var(--text-muted); margin-top:2px;">
            R.S.V.P: ${esc(w.rsvp_contacts || 'Md Kalim Khan 9330981386 • Md Musa Khan 7033098070 • Md Mozammil Khan 9432168955')}
          </div>
        </div>

        <button class="cta-couture" type="button" data-next-screen="3">
          <span>View Programme</span>
          <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </section>

      <!-- ========================================================
           SCREEN 3: WEDDING PROGRAMME TIMELINE
           ======================================================== -->
      <section class="screen-envelope" data-screen-index="3" aria-label="Programme">
        <div class="pip-cluster">
          <span class="pip-unit"></span><span class="pip-unit"></span>
          <span class="pip-unit"></span><span class="pip-unit active"></span><span class="pip-unit"></span>
        </div>

        <div>
          <div class="cinzel-regal" style="font-size:11.5px; letter-spacing:2.5px; color:var(--oxblood-rich);">The Wedding Programme</div>
          <div style="font-size:11px; font-style:italic; color:var(--text-muted);">
            Insha Allah, to be solemnised as per the schedule
          </div>
        </div>

        <!-- Compact Curated Programme Feed -->
        <div class="timeline-curated-stack">
          ${events && events.length ? events.map(ev => `
            <div class="timeline-leaf">
              <div>
                <div class="leaf-title">${esc(ev.event_name)}</div>
                <div class="leaf-meta">${formatLuxuryDate(ev.event_date)}${ev.note ? '• ' + esc(ev.note) : ''}</div>
              </div>
              <div class="leaf-time">${formatLuxuryTime(ev.event_time)}</div>
            </div>
          `).join('') : `
            <div class="timeline-leaf">
              <div>
                <div class="leaf-title">Milaad Sharif</div>
                <div class="leaf-meta">24 OCT 2026 (Baad Namaz-e-Isha)</div>
              </div>
              <div class="leaf-time">09:00 PM</div>
            </div>
            <div class="timeline-leaf">
              <div>
                <div class="leaf-title">Rasm-e-Haldi &amp; Mehndi</div>
                <div class="leaf-meta">25 &amp; 26 OCT 2026</div>
              </div>
              <div class="leaf-time">06:00 PM</div>
            </div>
            <div class="timeline-leaf">
              <div>
                <div class="leaf-title">Baraat, Nikah &amp; Dinner</div>
                <div class="leaf-meta">27 OCT 2026</div>
              </div>
              <div class="leaf-time">08:00 PM</div>
            </div>
            <div class="timeline-leaf">
              <div>
                <div class="leaf-title">Rukhsati</div>
                <div class="leaf-meta">28 OCT 2026</div>
              </div>
              <div class="leaf-time">08:00 AM</div>
            </div>
          `}
        </div>

        <div>
          <div class="cinzel-regal" style="font-size:7.5px;">Banquet Venue</div>
          <div style="font-family:'Playfair Display',serif; font-size:14px; font-weight:700; color:var(--oxblood-rich);">
            ${esc(w.venue || 'Shuubh Arambh Banquet')}
          </div>
          <div style="font-size:9.5px; color:var(--text-muted);">${esc(w.address || '131, Belilious Rd, Howrah')}</div>
        </div>

        <button class="cta-couture" type="button" data-next-screen="4">
          <span>Closing Heirloom</span>
          <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </section>

      <!-- ========================================================
           SCREEN 4: HEIRLOOM CLOSING & LUXURY CONCIERGE
           ======================================================== -->
      <section class="screen-envelope" data-screen-index="4" aria-label="Closing">
        <div class="pip-cluster">
          <span class="pip-unit"></span><span class="pip-unit"></span>
          <span class="pip-unit"></span><span class="pip-unit"></span><span class="pip-unit active"></span>
        </div>

        <div class="crest-seal">
          <span class="crest-seal-crown">👑</span>
          <div class="crest-seal-ring"></div>
          <div class="crest-seal-initials">${initials}</div>
        </div>

        <div>
          <div class="hero-script" style="font-size:42px; line-height:1.05;">
            With Love<br>&amp; Warmest Regards
          </div>
          <svg class="flourish-bar"><use href="#palace-leaf"/></svg>
          <div style="font-family:'Playfair Display',serif; font-size:16.5px; font-weight:700; color:var(--oxblood-rich);">
            ${esc(w.footer_text || 'Md Kalim Khan & Family')}
          </div>
        </div>

        <!-- 3 Luxury Action Pills -->
        <div class="action-concierge-stack">
          ${w.map_url ? `
            <a href="${esc(w.map_url)}" target="_blank" rel="noopener noreferrer" class="pill-concierge pill-metallic-gold">
              <span>📍 View Venue Location</span>
            </a>
          ` : ''}

          <a href="#" id="saveCalendarBtn" target="_blank" rel="noopener noreferrer" class="pill-concierge pill-wine">
            <span>📅 Save Date To Calendar</span>
          </a>

          <a href="#" id="whatsappRsvpBtn" target="_blank" rel="noopener noreferrer" class="pill-concierge pill-metallic-gold">
            <span>💬 Confirm RSVP via WhatsApp</span>
          </a>

          <!-- Gold Scratch Card Reveal Trigger -->
          <button type="button" id="openScratchCard" class="pill-concierge pill-secret-reveal">
            <span>✨ One Little Surprise (Scratch)</span>
          </button>
        </div>

        <button class="cta-couture" type="button" data-next-screen="0" style="min-height:36px; max-width:190px; font-size:9px;">
          <span>Return To Opening</span>
        </button>
      </section>

    </div>

    <!-- ========================================================
         MODAL: GOLD LEAF METALLIC SCRATCH CARD
         ======================================================== -->
    <div class="scratch-foil-stage" id="scratchModal">
      <div class="scratch-intaglio-card">
        <div class="cinzel-regal" style="font-size:9px;">Royal Token</div>
        <div style="font-family:'Playfair Display',serif; font-size:15px; font-weight:700; color:var(--oxblood-rich); margin-top:2px;">
          A Warm Sentiment
        </div>

        <div class="scratch-viewport">
          <div class="scratch-unveiled-content">
            <span style="font-size:22px;">🕊️</span>
            <div style="font-family:'Playfair Display',serif; font-size:13.5px; font-weight:700; color:var(--oxblood-rich); margin-top:3px;">
              "Your Presence Is Our Greatest Blessing"
            </div>
            <small style="font-size:9.5px; font-style:italic; color:var(--text-muted);">We look forward to celebrating together.</small>
          </div>
          <canvas id="scratchCanvas" width="270" height="130"></canvas>
        </div>

        <div style="font-size:9.5px; color:var(--text-muted); font-style:italic;">Scratch off the gold foil with your finger</div>
        <button type="button" id="closeScratchModal" style="background:none; border:none; font-family:'Cinzel',serif; font-size:9.5px; letter-spacing:2px; text-transform:uppercase; color:var(--oxblood-rich); margin-top:10px; cursor:pointer; text-decoration:underline;">
          Close Card
        </button>
      </div>
    </div>

  </div>
  `;
}

// ============================================================================
// MOUNT CONTROLLER (DISCRETE STATE TRANSITIONS & CONCIERGE ENGINES)
// ============================================================================

export function mount(root, { guest, wedding: w }) {
  const screens = [...root.querySelectorAll('.screen-envelope')];
  const audioBtn = root.querySelector('#audioToggle');
  const audio = root.querySelector('#royalSoundtrack');

  // 1. Discrete Screen Progression Controller
  let activeIndex = 0;

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
    }, 420);
  }

  // Delegated Button Clicks
  root.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-next-screen]');
    if (trigger) {
      const nextIdx = parseInt(trigger.getAttribute('data-next-screen'), 10);
      switchScreen(nextIdx);

      // Trigger royal music on first user gesture (Safari & Chrome auto-play policy compliant)
      if (audio && audio.paused && audioBtn) {
        audio.play().then(() => audioBtn.classList.add('is-playing')).catch(() => {});
      }
    }
  });

  // 2. Audio Toggle Switch
  if (audioBtn && audio) {
    audioBtn.onclick = () => {
      if (audio.paused) {
        audio.play().then(() => audioBtn.classList.add('is-playing')).catch(() => {});
      } else {
        audio.pause();
        audioBtn.classList.remove('is-playing');
      }
    };
  }

  // 3. Google Calendar Dynamic Linker
  const calBtn = root.querySelector('#saveCalendarBtn');
  if (calBtn) {
    const calTitle = encodeURIComponent(`Wedding: ${w.bride_name || 'Tarana'} & ${w.groom_name || 'Akbar'}`);
    const calDesc = encodeURIComponent(`You are cordially invited to celebrate the marriage of ${w.bride_name || 'Tarana'} & ${w.groom_name || 'Akbar'}. Venue: ${w.venue || ''}, ${w.address || ''}`);
    const calLoc = encodeURIComponent(`${w.venue || ''}, ${w.address || ''}`);
    
    // Accurate ISO 8601 UTC block for 27 Oct 2026
    const startUTC = "20261027T143000Z";
    const endUTC = "20261027T183000Z";
    calBtn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&dates=${startUTC}/${endUTC}&details=${calDesc}&location=${calLoc}`;
  }

  // 4. WhatsApp VIP RSVP Generator
  const rsvpBtn = root.querySelector('#whatsappRsvpBtn');
  if (rsvpBtn) {
    const rsvpPhone = esc(w.rsvp_number || '919330981386');
    const msg = encodeURIComponent(`Aadab / Namaste, I will be attending the wedding of ${w.bride_name || 'Tarana'} & ${w.groom_name || 'Akbar'}! Guest: ${guest.name || 'Guest'}`);
    rsvpBtn.href = `https://wa.me/${rsvpPhone}?text=${msg}`;
  }

  // 5. Canvas Gold Foil Scratch Engine
  const modal = root.querySelector('#scratchModal');
  const openScratch = root.querySelector('#openScratchCard');
  const closeScratch = root.querySelector('#closeScratchModal');
  const canvas = root.querySelector('#scratchCanvas');

  if (openScratch && modal && canvas) {
    openScratch.onclick = () => {
      modal.classList.add('is-open');
      initMetallicScratch(canvas);
    };

    closeScratch.onclick = () => {
      modal.classList.remove('is-open');
    };
  }
}

function initMetallicScratch(canvas) {
  if (canvas._isReady) return;
  canvas._isReady = true;

  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  // Real 24K Gold Specular Foil Fill
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#F9E7BA');
  gradient.addColorStop(0.3, '#D4AF37');
  gradient.addColorStop(0.65, '#9E7822');
  gradient.addColorStop(0.85, '#FBF0D2');
  gradient.addColorStop(1, '#8C6A1A');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Stamped Hot-Foil Lettering
  ctx.fillStyle = '#380711';
  ctx.font = 'bold 11px Cinzel, serif';
  ctx.textAlign = 'center';
  ctx.fillText('⚜ SCRATCH TO UNVEIL ⚜', width / 2, height / 2 + 4);

  let isScratching = false;

  function scratchPoint(e) {
    if (!isScratching) return;
    const rect = canvas.getBoundingClientRect();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    const x = cx - rect.left;
    const y = cy - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2, false);
    ctx.fill();
  }

  canvas.addEventListener('mousedown', () => { isScratching = true; });
  window.addEventListener('mouseup', () => { isScratching = false; });
  canvas.addEventListener('mousemove', scratchPoint);

  canvas.addEventListener('touchstart', () => { isScratching = true; }, { passive: true });
  window.addEventListener('touchend', () => { isScratching = false; });
  canvas.addEventListener('touchmove', scratchPoint, { passive: true });
}
