// ============================================================================
// TEMPLATE-02: PURE CODE ROYAL HERITAGE SUITE (NO EXTERNAL IMAGES)
// 100dvh VIEWPORT APP • PURE SVG/CSS CARVED FRAME • 60 FPS NO-SCROLL NAV
// ============================================================================

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));

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
    /* =========================================================
       PURE CSS CARVED PEARL & 24K GOLD SYSTEM (NO EXTERNAL IMAGES)
       ========================================================= */
    :root {
      --oxblood: #6f0f1c;
      --oxblood-deep: #42050e;
      --gold-24k: #c59b27;
      --gold-light: #f5dfa2;
      --gold-deep: #8b6818;
      --pearl-surface: #fdfaf3;
      --parchment-base: #faf2e1;
      --parchment-shade: #f0dcbe;
      --gold-shadow: 0 0 25px rgba(197, 155, 39, 0.25);
    }

    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

    .royal-universe {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at 50% 18%, #36050e 0%, #170105 60%, #0c0003 100%);
    }

    /* Ambient Silk Texture Overlay using Pure SVG */
    .royal-universe::before {
      content: "";
      position: absolute;
      inset: 0;
      background-image: 
        radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.14) 0%, transparent 65%),
        url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 0l25 25-25 25L0 25z' fill='none' stroke='%23d4af37' stroke-opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 1;
    }

    /* App Stage */
    .royal-viewport-box {
      position: relative;
      width: 100%;
      max-width: 420px;
      height: 100%;
      max-height: 100dvh;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: max(8px, env(safe-area-inset-top)) 8px max(10px, env(safe-area-inset-bottom));
    }

    /* -------------------------------------------------------------
       DISCRETE SCREENS (100dvh, ZERO SCROLL, 60 FPS TRANSITION)
       ------------------------------------------------------------- */
    .screen-panel {
      position: absolute;
      inset: max(6px, env(safe-area-inset-top)) 6px max(8px, env(safe-area-inset-bottom));
      border-radius: min(44vw, 190px) min(44vw, 190px) 24px 24px;
      background: linear-gradient(180deg, #FFFDF8 0%, #FBF3E2 45%, #F1DEC0 100%);
      box-shadow: 
        0 20px 60px rgba(0, 0, 0, 0.8),
        0 0 40px rgba(197, 155, 39, 0.22),
        inset 0 0 35px rgba(212, 175, 55, 0.12);
      border: 3px solid #dfc384;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      padding: 26px 18px 18px;
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

    /* Carved 3D Pearl Filigree Border via CSS Inset Box Shadows */
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

    /* Floating Classical Music Controller */
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
      box-shadow: 0 6px 20px rgba(0,0,0,0.5), var(--gold-shadow);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .audio-knob svg { width: 18px; height: 18px; fill: var(--gold-light); }
    .audio-knob.spinning svg { animation: spinKnob 5s linear infinite; }
    @keyframes spinKnob { 100% { transform: rotate(360deg); } }

    /* -------------------------------------------------------------
       EXACT SVG MONOGRAM EMBLEM
       ------------------------------------------------------------- */
    .crest-svg-frame {
      width: 140px;
      height: 52px;
      margin: 0 auto;
      flex-shrink: 0;
    }

    /* Typography */
    .script-font {
      font-family: 'Great Vibes', cursive;
      color: var(--oxblood);
      line-height: 1;
      font-weight: 400;
      margin: 0;
    }

    .cinzel-font {
      font-family: 'Cinzel', serif;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: var(--oxblood);
      font-weight: 700;
    }

    /* Tactile CTA Button */
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
      box-shadow: 0 8px 20px rgba(66, 5, 14, 0.45);
      transition: transform 0.2s ease;
      flex-shrink: 0;
    }
    .palace-btn:active { transform: scale(0.96); }
    .palace-btn svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 2; }

    /* Stepper Pips */
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

    /* Screen 1 Blank Pass Card Elements */
    .to-pass-row {
      margin: 4px auto;
      width: 86%;
      text-align: left;
      font-family: 'Great Vibes', cursive;
      font-size: 26px;
      color: var(--oxblood);
      border-bottom: 1.5px solid var(--oxblood);
      padding-bottom: 1px;
      display: flex;
      align-items: baseline;
      justify-content: space-between;
    }
    .pass-metrics-grid {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin: 6px auto;
    }
    .metric-cell {
      border: 1.5px solid var(--oxblood);
      background: rgba(255,255,255,0.7);
      width: 76px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 17px;
      font-weight: 700;
      color: var(--oxblood);
    }
    .metric-lbl {
      font-family: 'Great Vibes', cursive;
      font-size: 19px;
      color: var(--oxblood);
      margin-bottom: 2px;
    }

    /* Screen 3 Timeline Cards */
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

    /* Screen 4 Action Buttons */
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

  <!-- Reusable Shared SVG Flourish -->
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <defs>
      <symbol id="ornament-cross" viewBox="0 0 160 20">
        <line x1="10" y1="10" x2="68" y2="10" stroke="#b78a2f" stroke-width="1.2" stroke-opacity=".7"/>
        <line x1="92" y1="10" x2="150" y2="10" stroke="#b78a2f" stroke-width="1.2" stroke-opacity=".7"/>
        <circle cx="80" cy="10" r="3.5" fill="#6f0f1c" stroke="#b78a2f" stroke-width="1.2"/>
        <circle cx="72" cy="10" r="1.5" fill="#b78a2f"/>
        <circle cx="88" cy="10" r="1.5" fill="#b78a2f"/>
      </symbol>
    </defs>
  </svg>

  <div class="royal-universe">
    
    <!-- Audio Button -->
    <button class="audio-knob" id="audioToggle" aria-label="Toggle Music" type="button">
      <svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
      <audio id="royalAudio" loop preload="none">
        <source src="${esc(w.music_url || 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3')}" type="audio/mp3">
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
          <!-- Pure SVG Emblem (TA Monogram) -->
          <svg class="crest-svg-frame" viewBox="0 0 180 64">
            <circle cx="90" cy="32" r="27" fill="none" stroke="#6f0f1c" stroke-width="1.4"/>
            <circle cx="90" cy="32" r="23.5" fill="none" stroke="#b98a2f" stroke-width=".8"/>
            <text x="90" y="41" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="24" font-weight="600" fill="#6f0f1c">${initials}</text>
            <line x1="14" y1="32" x2="58" y2="32" stroke="#6f0f1c" stroke-width=".8" stroke-opacity=".55"/>
            <line x1="122" y1="32" x2="166" y2="32" stroke="#6f0f1c" stroke-width=".8" stroke-opacity=".55"/>
            <path d="M8 32l6-4 6 4-6 4z" fill="#b98a2f"/>
            <path d="M160 32l6-4 6 4-6 4z" fill="#b98a2f"/>
          </svg>
          <div class="cinzel-font" style="font-size:9.5px; margin-top:4px;">Imperial Matrimony</div>
        </div>

        <div>
          <h1 class="script-font" style="font-size:clamp(54px, 16vw, 68px);">Welcome</h1>
          <svg style="width:140px; height:16px; margin:2px auto;"><use href="#ornament-cross"/></svg>

          <div style="font-family:'Cormorant Garamond', serif; font-size:24px; font-style:italic; color:var(--oxblood); margin:6px 0;">
            Dear <strong>${guestName}</strong>
          </div>

          <p style="font-style:italic; font-size:15px; line-height:1.45; color:#3b1a1f; max-width:88%; margin:6px auto 0;">
            With immense joy, we invite you to celebrate the wedding union of
            <span class="script-font" style="font-size:30px; display:inline-block; margin-top:2px;">${bride} &amp; ${groom}</span>.
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
          <!-- Emblem -->
          <svg class="crest-svg-frame" viewBox="0 0 180 64" style="height:44px;">
            <circle cx="90" cy="32" r="25" fill="none" stroke="#6f0f1c" stroke-width="1.3"/>
            <circle cx="90" cy="32" r="22" fill="none" stroke="#b98a2f" stroke-width=".7"/>
            <text x="90" y="40" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="22" font-weight="600" fill="#6f0f1c">${initials}</text>
            <line x1="20" y1="32" x2="60" y2="32" stroke="#6f0f1c" stroke-width=".8" stroke-opacity=".5"/>
            <line x1="120" y1="32" x2="160" y2="32" stroke="#6f0f1c" stroke-width=".8" stroke-opacity=".5"/>
          </svg>
          <div class="cinzel-font" style="font-size:14px; letter-spacing:2px; margin-top:2px;">Wedding Invitation</div>
        </div>

        <!-- Date & Couple Section -->
        <div>
          <div style="display:flex; justify-content:center; align-items:center; gap:10px; font-weight:700; font-size:11px; margin:4px 0;">
            <span>SAVE THE DATE<br>TUESDAY</span>
            <span style="font-size:22px; color:#b98a2f;">|</span>
            <span style="font-size:36px; font-family:'Cormorant Garamond'; color:var(--oxblood); line-height:1;">27th</span>
            <span style="font-size:22px; color:#b98a2f;">|</span>
            <span>OCTOBER<br>2026</span>
          </div>

          <div class="script-font" style="font-size:42px; margin:4px 0;">
            ${bride} <span style="font-size:26px; font-family:'Cormorant Garamond',serif; font-style:italic;">weds</span> ${groom}
          </div>

          <!-- Exact "To _______ Guest" Blank Line Mapping -->
          <div class="to-pass-row">
            <span style="font-family:'Cormorant Garamond',serif; font-size:18px; font-style:italic;">To</span>
            <span style="font-size:30px;">${guestName}</span>
          </div>

          <!-- Person [4] & Family [✓] Checked Metric Boxes -->
          <div class="pass-metrics-grid">
            <div>
              <div class="metric-lbl">Person</div>
              <div class="metric-cell">${persons}</div>
            </div>
            <div>
              <div class="metric-lbl">Family</div>
              <div class="metric-cell">${isFamily}</div>
            </div>
          </div>
        </div>

        <!-- Host Information -->
        <div>
          <div style="font-size:13px; font-style:italic; color:var(--oxblood);">A Cordial Invitation</div>
          <div style="font-size:16px; font-weight:700; color:var(--oxblood); margin:2px 0;">
            ${esc(w.host_name || 'Mrs. & Mr. Md Kalim Khan')}
          </div>
          <div style="font-size:10.5px; opacity:0.85;">
            ${esc(w.address || '283/10 Belilious Road, Howrah, West Bengal – 711101')}
          </div>
          <div style="font-size:10px; font-weight:700; margin-top:2px;">
            M.: ${esc(w.rsvp_contacts || '9330981386, +917033098070')}
          </div>
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
          <svg style="width:120px; height:14px; margin:2px auto;"><use href="#ornament-cross"/></svg>
          <div class="cinzel-font" style="font-size:14px; letter-spacing:3px;">Marriage Ceremony</div>
        </div>

        <div>
          <div style="font-size:12px; font-style:italic;">has great pleasure to invite you to attend the wedding of their daughter</div>
          
          <div style="font-family:'Cormorant Garamond',serif; font-size:24px; font-weight:700; color:var(--oxblood); margin-top:4px;">
            ${brideFull}
          </div>
          <div style="font-size:10.5px; opacity:0.85;">${esc(w.bride_parents || '(D/o Mrs. & Mr. Md Kalim Khan, Howrah)')}</div>

          <div class="script-font" style="font-size:32px; margin:2px 0;">Weds</div>

          <div style="font-family:'Cormorant Garamond',serif; font-size:24px; font-weight:700; color:var(--oxblood);">
            ${groomFull}
          </div>
          <div style="font-size:10.5px; opacity:0.85;">${esc(w.groom_parents || '(S/o Mrs. & Mr. Moin Siddique, Ramgarh)')}</div>
        </div>

        <div style="border-top:1px solid rgba(183,138,47,0.4); width:90%; padding-top:4px;">
          <div class="cinzel-font" style="font-size:7.5px;">With Best Compliments From</div>
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
          <div class="cinzel-font" style="font-size:13px; letter-spacing:2.5px; margin-top:2px;">Wedding Programme</div>
        </div>

        <!-- Compressed Curated Timeline (Sanitizing 1899 Timestamps) -->
        <div class="event-leaf-stack">
          ${events && events.length ? events.map(ev => `
            <div class="event-leaf">
              <div>
                <strong style="color:var(--oxblood); font-size:12.5px;">${esc(ev.event_name)}</strong>
                <div style="font-size:9.5px; opacity:0.8;">${formatLuxuryDate(ev.event_date)}${ev.note ? '• ' + esc(ev.note) : ''}</div>
              </div>
              <span class="cinzel-font" style="font-size:9px; color:#8b6818;">${formatLuxuryTime(ev.event_time)}</span>
            </div>
          `).join('') : `
            <div class="event-leaf">
              <div>
                <strong style="color:var(--oxblood); font-size:12.5px;">Milaad Sharif</strong>
                <div style="font-size:9.5px; opacity:0.8;">24 OCT 2026 (Baad Namaz-e-Isha)</div>
              </div>
              <span class="cinzel-font" style="font-size:9px;">09:00 PM</span>
            </div>
            <div class="event-leaf">
              <div>
                <strong style="color:var(--oxblood); font-size:12.5px;">Rasm-e-Haldi &amp; Mehndi</strong>
                <div style="font-size:9.5px; opacity:0.8;">25 &amp; 26 OCT 2026</div>
              </div>
              <span class="cinzel-font" style="font-size:9px;">06:00 PM</span>
            </div>
            <div class="event-leaf">
              <div>
                <strong style="color:var(--oxblood); font-size:12.5px;">Baraat, Nikah &amp; Banquet</strong>
                <div style="font-size:9.5px; opacity:0.8;">Tuesday 27 OCT 2026</div>
              </div>
              <span class="cinzel-font" style="font-size:9px;">08:00 PM</span>
            </div>
            <div class="event-leaf">
              <div>
                <strong style="color:var(--oxblood); font-size:12.5px;">Rukhsati</strong>
                <div style="font-size:9.5px; opacity:0.8;">Wednesday 28 OCT 2026</div>
              </div>
              <span class="cinzel-font" style="font-size:9px;">08:00 AM</span>
            </div>
          `}
        </div>

        <div>
          <div class="cinzel-font" style="font-size:8px;">Banquet Venue</div>
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
          <svg class="crest-svg-frame" viewBox="0 0 180 64" style="height:44px;">
            <circle cx="90" cy="32" r="25" fill="none" stroke="#6f0f1c" stroke-width="1.3"/>
            <text x="90" y="40" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="22" font-weight="600" fill="#6f0f1c">${initials}</text>
          </svg>
          <div class="script-font" style="font-size:44px; line-height:1.05; margin:6px 0;">
            With Love<br>&amp; Warmest Regards
          </div>
          <div style="font-size:18px; font-weight:700; color:var(--oxblood); margin-top:4px;">
            ${esc(w.footer_text || 'Md Kalim Khan & Family')}
          </div>
        </div>

        <!-- 3 Luxury Action Pills -->
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

          <!-- Scratch Card Trigger -->
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
        <div class="cinzel-font" style="font-size:9.5px;">Royal Token</div>
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
// MOUNT: 60 FPS TRANSITION ENGINE & APP CONCIERGE
// ============================================================================

export function mount(root, { guest, wedding: w }) {
  const screens = [...root.querySelectorAll('.screen-panel')];
  const audioBtn = root.querySelector('#audioToggle');
  const audio = root.querySelector('#royalAudio');

  // 1. Navigation Controller (Zero Scroll, Pure State Jump)
  let currentIdx = 0;

  function goToScreen(targetIdx) {
    if (targetIdx === currentIdx || targetIdx < 0 || targetIdx >= screens.length) return;

    const curr = screens[currentIdx];
    const nxt = screens[targetIdx];

    curr.classList.add('is-exiting');
    curr.classList.remove('is-active');

    setTimeout(() => {
      curr.classList.remove('is-exiting');
      nxt.classList.add('is-active');
      currentIdx = targetIdx;
    }, 400);
  }

  root.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-next]');
    if (btn) {
      const target = parseInt(btn.getAttribute('data-next'), 10);
      goToScreen(target);

      // Play audio on first user tap
      if (audio && audio.paused && audioBtn) {
        audio.play().then(() => audioBtn.classList.add('spinning')).catch(() => {});
      }
    }
  });

  // 2. Audio Control
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

  // 3. Dynamic Google Calendar
  const cal = root.querySelector('#saveCalBtn');
  if (cal) {
    const title = encodeURIComponent(`Wedding: ${w.bride_name || 'Tarana'} & ${w.groom_name || 'Akbar'}`);
    const desc = encodeURIComponent(`You are cordially invited to celebrate the marriage of ${w.bride_name || 'Tarana'} & ${w.groom_name || 'Akbar'}. Venue: ${w.venue || ''}`);
    const loc = encodeURIComponent(`${w.venue || ''}, ${w.address || ''}`);
    cal.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261027T143000Z/20261027T183000Z&details=${desc}&location=${loc}`;
  }

  // 4. WhatsApp RSVP
  const rsvp = root.querySelector('#waRsvpBtn');
  if (rsvp) {
    const num = esc(w.rsvp_number || '919330981386');
    const msg = encodeURIComponent(`Aadab / Namaste, I will be attending the wedding of ${w.bride_name || 'Tarana'} & ${w.groom_name || 'Akbar'}! Guest: ${guest.name || 'Guest'}`);
    rsvp.href = `https://wa.me/${num}?text=${msg}`;
  }

  // 5. Canvas Gold Foil Scratching
  const modal = root.querySelector('#scratchModal');
  const trigger = root.querySelector('#triggerScratch');
  const close = root.querySelector('#closeScratch');
  const cvs = root.querySelector('#scratchCanvas');

  if (trigger && modal && cvs) {
    trigger.onclick = () => {
      modal.classList.add('is-open');
      initScratch(cvs);
    };
    close.onclick = () => modal.classList.remove('is-open');
  }
}

function initScratch(canvas) {
  if (canvas._init) return;
  canvas._init = true;

  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  // Gold Specular Topcoat
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
