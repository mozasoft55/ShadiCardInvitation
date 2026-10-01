// ==========================================================================
// ROYAL IMPERIAL SUITE (Template 02 - Bespoke Royal Family Edition)
// 20X Architecture: SVG Filigree, 3D Wax Seal, Gold Particle Foil & Swiper
// ==========================================================================

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const imgUrl = u => {
  u = String(u || '').trim();
  if (!u) return '';
  return /^(https?:|data:image)/i.test(u) ? esc(u) : `https://lh3.googleusercontent.com/d/${encodeURIComponent(u)}=w1200`;
};
const cleanDate = d => {
  if (!d) return '';
  if (typeof d === 'string' && d.includes('T')) return d.split('T')[0];
  return String(d);
};

export default function render({ guest, wedding: w, events = [] }) {
  const bride = esc(w.bride_name || 'Bride');
  const groom = esc(w.groom_name || 'Groom');
  const brideFull = esc(w.bride_full || bride);
  const groomFull = esc(w.groom_full || groom);
  const initials = `${(bride[0] || 'T')}&${(groom[0] || 'A')}`.toUpperCase();
  const theme = esc(w.theme || 'maroon');

  // Google Calendar Integration Link Generator
  const calTitle = encodeURIComponent(`${bride} & ${groom}'s Wedding Celebration`);
  const calDetails = encodeURIComponent(`You are cordially invited to celebrate the wedding of ${bride} & ${groom}. Venue: ${w.venue}, ${w.address}`);
  const calLoc = encodeURIComponent(`${w.venue || ''}, ${w.address || ''}`);
  const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&details=${calDetails}&location=${calLoc}`;

  return `
  <!-- Luxury Typography & Icons -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@600;700;900&family=Cinzel:wght@500;600;700&family=Great+Vibes&family=Playfair+Display:ital,wght@0,500;0,600;1,400&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">

  <style>
    :root {
      --gold-primary: #D4AF37;
      --gold-foil: linear-gradient(135deg, #ECC880 0%, #C59B27 50%, #FDF0CD 80%, #9A7B1C 100%);
      --gold-glow: 0 0 25px rgba(212, 175, 55, 0.45);
      --imperial-maroon: #580B18;
      --maroon-dark: #32030B;
      --parchment-base: #FCF8F0;
      --parchment-shade: #EFE4CC;
      --filigree-color: rgba(212, 175, 55, 0.35);
    }

    [data-theme="emerald"] {
      --imperial-maroon: #0A3C2B;
      --maroon-dark: #041B13;
    }
    [data-theme="navy"] {
      --imperial-maroon: #101F42;
      --maroon-dark: #070E20;
    }
    [data-theme="purple"] {
      --imperial-maroon: #38124D;
      --maroon-dark: #1D062B;
    }

    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    body { margin: 0; background: #160205; overflow-x: hidden; font-family: 'Playfair Display', Georgia, serif; }

    /* Imperial Canvas Ambient */
    .royal-universe {
      min-height: 100vh;
      min-height: 100dvh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: radial-gradient(circle at center, #2e050c 0%, #120104 100%);
      padding: 18px 12px;
      position: relative;
    }

    .ambient-mesh {
      position: fixed;
      inset: 0;
      background-image: 
        radial-gradient(ellipse at 50% 10%, rgba(212,175,55,0.15) 0%, transparent 60%),
        url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fill-opacity='0.04' fill-rule='evenodd'%3E%3Cpath d='M40 0l40 40-40 40L0 40z'/%3E%3C/g%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 1;
    }

    /* Floating Royal Audio Controller */
    .audio-disc {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1.5px solid var(--gold-primary);
      background: rgba(46, 5, 12, 0.85);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0,0,0,0.5), var(--gold-glow);
      transition: transform .3s ease;
    }
    .audio-disc:hover { transform: scale(1.08); }
    .audio-disc svg { width: 20px; height: 20px; fill: var(--gold-primary); }
    .audio-disc.spinning svg { animation: rotateDisc 4s linear infinite; }

    @keyframes rotateDisc { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    /* The Imperial Card Arch */
    .royal-stage {
      position: relative;
      width: 100%;
      max-width: 440px;
      min-height: 85vh;
      border-radius: 220px 220px 28px 28px;
      background: linear-gradient(180deg, var(--parchment-base) 0%, var(--parchment-shade) 100%);
      box-shadow: 
        0 25px 60px rgba(0,0,0,0.7),
        0 0 0 1px rgba(212, 175, 55, 0.4),
        inset 0 0 35px rgba(212, 175, 55, 0.18);
      padding: 48px 24px 34px;
      text-align: center;
      color: #2D080E;
      z-index: 2;
      overflow: hidden;
      border: 3px solid var(--gold-primary);
    }

    /* Precision Dual Gold Inset Borders */
    .royal-stage::after {
      content: "";
      position: absolute;
      inset: 8px;
      border: 1px solid rgba(212, 175, 55, 0.65);
      border-radius: 212px 212px 20px 20px;
      pointer-events: none;
    }
    .royal-stage::before {
      content: "";
      position: absolute;
      inset: 14px;
      border: 1px dashed rgba(212, 175, 55, 0.4);
      border-radius: 206px 206px 16px 16px;
      pointer-events: none;
    }

    /* Filigree Corner Ornament SVG */
    .corner-ornament {
      position: absolute;
      width: 48px;
      height: 48px;
      opacity: 0.55;
      pointer-events: none;
    }
    .corner-bl { bottom: 18px; left: 18px; }
    .corner-br { bottom: 18px; right: 18px; transform: scaleX(-1); }

    /* Royal Imperial Crest (Emblem) */
    .emperor-crest {
      position: relative;
      width: 72px;
      height: 72px;
      margin: 0 auto 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .crest-ring {
      position: absolute;
      inset: 0;
      border: 1.5px solid var(--gold-primary);
      border-radius: 50%;
      background: radial-gradient(circle, #fffdf8, #f5ebd3);
      box-shadow: 0 4px 15px rgba(212,175,55,0.3);
    }
    .crest-crown {
      position: absolute;
      top: -12px;
      font-size: 18px;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.25));
    }
    .crest-monogram {
      position: relative;
      font-family: 'Cinzel Decorative', cursive;
      font-size: 24px;
      font-weight: 700;
      background: var(--gold-foil);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: 1px;
    }

    .sub-invocation {
      font-family: 'Cinzel', serif;
      font-size: 11px;
      letter-spacing: 3.5px;
      text-transform: uppercase;
      color: #7A5813;
      margin: 10px 0 16px;
      font-weight: 600;
    }

    /* VIP Guest Royal Plaque */
    .vip-plaque {
      background: linear-gradient(135deg, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.05) 100%);
      border: 1px solid rgba(212,175,55,0.5);
      border-radius: 40px;
      padding: 10px 22px;
      margin: 12px auto 18px;
      display: inline-block;
      max-width: 90%;
      box-shadow: inset 0 1px 3px rgba(255,255,255,0.8), 0 3px 8px rgba(0,0,0,0.05);
    }
    .vip-subtitle {
      font-family: 'Cinzel', serif;
      font-size: 9px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: var(--imperial-maroon);
      font-weight: 700;
    }
    .vip-name {
      font-family: 'Playfair Display', serif;
      font-size: 19px;
      font-weight: 700;
      color: var(--imperial-maroon);
      margin-top: 3px;
    }

    .invitation-statement {
      font-style: italic;
      font-size: 14.5px;
      color: #4A1D24;
      line-height: 1.5;
      margin: 12px auto 6px;
      max-width: 92%;
    }

    .ceremony-badge {
      font-family: 'Cinzel', serif;
      font-size: 13px;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: var(--imperial-maroon);
      font-weight: 700;
      margin: 8px 0;
    }

    /* Royal Name Typography with 24K Shimmer */
    .royal-couple-names {
      margin: 16px 0;
    }
    .royal-name {
      font-family: 'Great Vibes', cursive;
      font-size: 56px;
      line-height: 1.05;
      margin: 0;
      color: var(--imperial-maroon);
      text-shadow: 0 2px 10px rgba(88, 11, 24, 0.15);
    }
    .parents-honor {
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      color: #6A3A41;
      letter-spacing: 0.5px;
      margin-top: 4px;
    }
    .royal-weds {
      font-family: 'Cinzel Decorative', serif;
      font-size: 14px;
      letter-spacing: 6px;
      color: #9A7B1C;
      margin: 8px 0;
      font-weight: 700;
    }

    /* 3D Wax Seal Button with Interactive Ripple */
    .wax-seal-wrapper {
      position: relative;
      margin: 28px 0 20px;
    }
    .wax-seal-btn {
      position: relative;
      background: linear-gradient(135deg, #7A0C1E 0%, #46040F 100%);
      border: 2px solid var(--gold-primary);
      border-radius: 999px;
      padding: 16px 36px;
      font-family: 'Cinzel', serif;
      font-size: 12px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #F8EAD0;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 
        0 10px 25px rgba(88, 11, 24, 0.45),
        inset 0 1px 2px rgba(255,255,255,0.4),
        var(--gold-glow);
      transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .wax-seal-btn:hover {
      transform: translateY(-3px) scale(1.03);
      box-shadow: 0 15px 30px rgba(88, 11, 24, 0.6), var(--gold-glow);
    }

    /* Deck View (Events & Details Slides) */
    .imperial-deck {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, var(--parchment-base) 0%, var(--parchment-shade) 100%);
      z-index: 10;
      display: flex;
      flex-direction: column;
      padding: 40px 20px 20px;
      border-radius: 220px 220px 28px 28px;
      animation: unfoldRoyal .7s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    @keyframes unfoldRoyal {
      from { opacity: 0; transform: scale(0.92) translateY(20px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }

    .deck-scroll-area {
      flex: 1;
      overflow-y: auto;
      scrollbar-width: none;
      padding-bottom: 20px;
    }
    .deck-scroll-area::-webkit-scrollbar { display: none; }

    /* Timeline Cards */
    .event-card {
      background: rgba(255,255,255,0.85);
      border: 1px solid rgba(212,175,55,0.4);
      border-radius: 14px;
      padding: 14px 18px;
      margin-bottom: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.04);
      text-align: left;
      position: relative;
    }
    .event-card::before {
      content: "";
      position: absolute;
      left: 0;
      top: 15%;
      height: 70%;
      width: 4px;
      background: var(--gold-foil);
      border-radius: 0 4px 4px 0;
    }

    .action-btn-row {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-top: 14px;
      flex-wrap: wrap;
    }
    .action-pill {
      flex: 1;
      min-width: 140px;
      padding: 12px 16px;
      border-radius: 30px;
      font-family: 'Cinzel', serif;
      font-size: 11px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      text-decoration: none;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all .25s ease;
    }
    .pill-gold {
      background: var(--gold-foil);
      color: #381005 !important;
      border: 1px solid #C59B27;
      box-shadow: 0 4px 12px rgba(197, 155, 39, 0.35);
    }
    .pill-outline {
      background: #fff;
      color: var(--imperial-maroon) !important;
      border: 1.5px solid var(--imperial-maroon);
    }
  </style>

  <div class="royal-universe" data-theme="${theme}">
    <div class="ambient-mesh"></div>

    <!-- Floating Instrumental Audio Player -->
    <div class="audio-disc" id="audioToggle" title="Royal Shehnai / Music">
      <svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
      <audio id="royalAudio" loop preload="none">
        <source src="${esc(w.music_url || 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3')}" type="audio/mp3">
      </audio>
    </div>

    <!-- The Royal Stage -->
    <div class="royal-stage" id="mainWelcomeStage">
      
      <!-- Vintage Victorian Corners -->
      <svg class="corner-ornament corner-bl" viewBox="0 0 100 100"><path d="M0,100 L0,20 C10,20 20,10 20,0 L30,0 C30,25 25,30 0,30 Z" fill="#D4AF37"/></svg>
      <svg class="corner-ornament corner-br" viewBox="0 0 100 100"><path d="M0,100 L0,20 C10,20 20,10 20,0 L30,0 C30,25 25,30 0,30 Z" fill="#D4AF37"/></svg>

      <!-- Imperial Monogram Crest -->
      <div class="emperor-crest">
        <div class="crest-crown">👑</div>
        <div class="crest-ring"></div>
        <div class="crest-monogram">${initials}</div>
      </div>

      <div class="sub-invocation">${esc(w.invocation || 'Bismillah-ir-Rahman-ir-Rahim')}</div>

      <!-- VIP Invitee Name -->
      <div class="vip-plaque">
        <div class="vip-subtitle">Specially Invited</div>
        <div class="vip-name">${esc(guest.name)} ${guest.with_family ? '& Family' : ''}</div>
      </div>

      <p class="invitation-statement">
        ${esc(w.host_name || 'The Family')} solicit your gracious presence on the propitious occasion of the
      </p>

      <div class="ceremony-badge">${esc(w.ceremony_title || 'Royal Wedding Ceremony')}</div>

      <!-- Royal Couple -->
      <div class="royal-couple-names">
        <h1 class="royal-name">${brideFull}</h1>
        ${w.bride_parents ? `<div class="parents-honor">${esc(w.bride_parents)}</div>` : ''}

        <div class="royal-weds">— WEDS —</div>

        <h1 class="royal-name">${groomFull}</h1>
        ${w.groom_parents ? `<div class="parents-honor">${esc(w.groom_parents)}</div>` : ''}
      </div>

      <!-- Wax Seal Interactive Opener -->
      <div class="wax-seal-wrapper">
        <button class="wax-seal-btn" id="openDeckBtn" type="button">
          Open Royal Invitation ⚜
        </button>
      </div>

      <div style="font-family:'Montserrat',sans-serif; font-size:10px; opacity:0.6; letter-spacing:1px; margin-top:8px;">
        WITH COMPLIMENTS: ${esc(w.compliments || 'Near & Dear Family')}
      </div>
    </div>

    <!-- Hidden Deck for Details (Swipes in on Click) -->
    <div class="imperial-deck" id="royalDetailsDeck" style="display:none;">
      
      <div class="emperor-crest" style="transform: scale(0.85); margin-bottom: 8px;">
        <div class="crest-ring"></div>
        <div class="crest-monogram">${initials}</div>
      </div>

      <div style="font-family:'Cinzel Decorative', serif; font-size:16px; color:var(--imperial-maroon); font-weight:700; margin-bottom:12px;">
        Wedding Festivities
      </div>

      <div class="deck-scroll-area">
        
        <!-- Date & Time Showcase -->
        <div class="event-card" style="text-align:center; background:#FFFBF2;">
          <div style="font-family:'Cinzel',serif; font-size:18px; font-weight:700; color:var(--imperial-maroon);">
            ${cleanDate(w.date)}
          </div>
          <div style="font-size:13px; color:#9A7B1C; font-weight:600; margin-top:2px;">
            Muhurat / Reception: ${esc(w.time)}
          </div>
        </div>

        <!-- Venue Card -->
        <div class="event-card">
          <div style="font-family:'Cinzel',serif; font-size:11px; letter-spacing:1px; color:#9A7B1C; font-weight:700;">CEREMONY LOCATION</div>
          <div style="font-size:16px; font-weight:700; color:var(--imperial-maroon); margin:4px 0 2px;">${esc(w.venue)}</div>
          <div style="font-size:12px; opacity:0.85; line-height:1.4;">${esc(w.address)}</div>
        </div>

        <!-- Functions Timeline -->
        ${events && events.length ? `
          <div style="font-family:'Cinzel',serif; font-size:12px; letter-spacing:2px; color:var(--imperial-maroon); font-weight:700; margin:16px 0 8px; text-align:left;">
            Program Timeline
          </div>
          ${events.map(ev => `
            <div class="event-card">
              <div style="display:flex; justify-content:space-between; align-items:baseline;">
                <strong style="color:var(--imperial-maroon); font-size:14px;">${esc(ev.event_name)}</strong>
                <span style="font-size:12px; font-weight:600; color:#9A7B1C;">${esc(ev.event_time)}</span>
              </div>
              <div style="font-size:12px; opacity:0.8; margin-top:3px;">${cleanDate(ev.event_date)} ${ev.note ? '• ' + esc(ev.note) : ''}</div>
            </div>
          `).join('')}
        ` : ''}

        <!-- 1-Tap Action Center -->
        <div class="action-btn-row">
          ${w.map_url ? `<a href="${esc(w.map_url)}" target="_blank" class="action-pill pill-gold">📍 View Venue Map</a>` : ''}
          <a href="${calUrl}" target="_blank" class="action-pill pill-outline">📅 Add to Calendar</a>
        </div>

        <!-- RSVP & WhatsApp Concierge -->
        ${w.rsvp_number ? `
          <div style="margin-top:16px;">
            <a href="https://wa.me/${esc(w.rsvp_number)}?text=${encodeURIComponent(`Hello, this is ${guest.name}. Thank you for the wedding invitation of ${bride} & ${groom}!`)}" 
               target="_blank" class="action-pill pill-gold" style="width:100%; display:flex;">
               💬 Confirm RSVP via WhatsApp
            </a>
          </div>
        ` : ''}

        <div style="margin-top:20px; text-align:center;">
          <button id="closeDeckBtn" style="background:none; border:none; color:var(--imperial-maroon); font-family:'Cinzel',serif; font-size:11px; letter-spacing:2px; text-transform:uppercase; cursor:pointer; text-decoration:underline;">
            ← Return to Welcome Arch
          </button>
        </div>
      </div>
    </div>
  </div>
  `;
}

export function mount(root) {
  const openBtn = root.querySelector('#openDeckBtn');
  const closeBtn = root.querySelector('#closeDeckBtn');
  const deck = root.querySelector('#royalDetailsDeck');
  const audio = root.querySelector('#royalAudio');
  const audioBtn = root.querySelector('#audioToggle');

  // Open Deck with Smooth Transition
  if (openBtn && deck) {
    openBtn.onclick = () => {
      deck.style.display = 'flex';
      // Attempt play audio on royal seal click (browser policy allows user interaction play)
      if (audio && audio.paused) {
        audio.play().then(() => {
          if (audioBtn) audioBtn.classList.add('spinning');
        }).catch(() => {});
      }
    };
  }

  if (closeBtn && deck) {
    closeBtn.onclick = () => {
      deck.style.display = 'none';
    };
  }

  // Audio Toggle Switch
  if (audioBtn && audio) {
    audioBtn.onclick = () => {
      if (audio.paused) {
        audio.play();
        audioBtn.classList.add('spinning');
      } else {
        audio.pause();
        audioBtn.classList.remove('spinning');
      }
    };
  }
}
