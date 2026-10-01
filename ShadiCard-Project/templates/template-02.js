// ==========================================================================
// BESPOKE MOBILE-FIRST ROYAL HEIRLOOM INVITATION
// ==========================================================================

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// Clean Time & Date Sanitizer
function formatTime(t) {
  if (!t) return '';
  t = String(t);
  if (t.includes('1899-') || t.includes('T')) {
    const d = new Date(t);
    if (!isNaN(d)) {
      return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
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
      return dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    }
    return d.split('T')[0];
  }
  return d;
}

export default function render({ guest, wedding: w, events = [] }) {
  const bride = esc(w.bride_name || 'Tarana');
  const groom = esc(w.groom_name || 'Akbar');
  const brideFull = esc(w.bride_full || bride);
  const groomFull = esc(w.groom_full || groom);
  const initials = `${(bride[0] || 'T')}&${(groom[0] || 'A')}`.toUpperCase();
  const mainDate = formatDate(w.date);
  const mainTime = formatTime(w.time);

  const rsvpNum = esc(w.rsvp_number || '919330981386');
  const rsvpMsg = encodeURIComponent(`Aadab / Namaste, I will be attending the wedding of ${bride} & ${groom}! Invited Guest: ${guest.name}`);
  const rsvpLink = `https://wa.me/${rsvpNum}?text=${rsvpMsg}`;

  const calTitle = encodeURIComponent(`Wedding of ${bride} & ${groom}`);
  const calLoc = encodeURIComponent(`${w.venue || ''}, ${w.address || ''}`);
  const calLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&location=${calLoc}`;

  return `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Great+Vibes&family=Playfair+Display:ital,wght@0,600;1,500&family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">

  <style>
    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    
    .mobile-royal-container {
      width: 100%;
      min-height: 100vh;
      min-height: 100dvh;
      background: #180307;
      background: radial-gradient(circle at 50% 20%, #2e050e 0%, #120104 100%);
      display: flex;
      justify-content: center;
      padding: 16px 12px 60px;
    }

    .royal-sheet {
      width: 100%;
      max-width: 410px; /* Perfect Smartphone Width */
      background: linear-gradient(180deg, #fffcf5 0%, #f7ecd5 40%, #f0dec0 100%);
      border: 2px solid #d4af37;
      border-radius: 190px 190px 24px 24px;
      box-shadow: 0 16px 45px rgba(0,0,0,0.6), 0 0 30px rgba(212,175,55,0.2);
      padding: 42px 18px 30px;
      text-align: center;
      color: #3b0912;
      position: relative;
    }

    /* Inner Precision Gold Borders */
    .royal-sheet::before {
      content: "";
      position: absolute;
      inset: 6px;
      border: 1px solid rgba(212,175,55,0.65);
      border-radius: 184px 184px 18px 18px;
      pointer-events: none;
    }

    /* Floating Music Toggle */
    .audio-float {
      position: fixed;
      top: 14px;
      right: 14px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(30, 2, 8, 0.85);
      border: 1.5px solid #d4af37;
      color: #ecc880;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      z-index: 99;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0,0,0,0.4);
    }

    /* Monogram */
    .monogram-badge {
      width: 64px;
      height: 64px;
      margin: 0 auto 12px;
      border: 1.5px solid #d4af37;
      border-radius: 50%;
      background: #fffdf9;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Cinzel', serif;
      font-size: 20px;
      font-weight: 700;
      color: #7a1022;
      box-shadow: 0 4px 12px rgba(212,175,55,0.25);
    }

    .top-invocation {
      font-family: 'Cinzel', serif;
      font-size: 9.5px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #8c6819;
      margin-bottom: 14px;
      font-weight: 700;
    }

    .guest-plaque {
      background: linear-gradient(135deg, rgba(212,175,55,0.18), rgba(212,175,55,0.05));
      border: 1px solid rgba(212,175,55,0.45);
      border-radius: 30px;
      padding: 8px 18px;
      margin: 4px auto 16px;
      display: inline-block;
      max-width: 92%;
    }
    .guest-plaque small {
      font-family: 'Cinzel', serif;
      font-size: 8.5px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #7a1022;
      display: block;
      font-weight: 700;
    }
    .guest-plaque .g-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 18px;
      font-weight: 700;
      color: #590916;
      margin-top: 2px;
    }

    .host-text {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 14px;
      color: #4f1520;
      line-height: 1.4;
      margin: 8px auto;
      max-width: 90%;
    }

    .ceremony-heading {
      font-family: 'Cinzel', serif;
      font-size: 14px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #7a1022;
      font-weight: 800;
      margin: 8px 0;
    }

    .couple-block {
      margin: 14px 0 10px;
    }
    .bride-groom {
      font-family: 'Great Vibes', cursive;
      font-size: 50px;
      line-height: 1;
      color: #690616;
      margin: 0;
    }
    .parents-desc {
      font-family: 'Montserrat', sans-serif;
      font-size: 10.5px;
      color: #5c232d;
      margin-top: 3px;
      line-height: 1.35;
    }
    .weds-divider {
      font-family: 'Cinzel', serif;
      font-size: 11px;
      letter-spacing: 4px;
      color: #8c6819;
      margin: 8px 0;
      font-weight: 700;
    }

    /* Muhurat Card */
    .date-card {
      background: #ffffff;
      border: 1px solid rgba(212,175,55,0.45);
      border-radius: 12px;
      padding: 12px;
      margin: 16px 0 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    }
    .date-main {
      font-family: 'Cinzel', serif;
      font-size: 17px;
      font-weight: 700;
      color: #690616;
      letter-spacing: 1px;
    }
    .time-main {
      font-size: 13.5px;
      font-weight: 600;
      color: #8c6819;
      margin-top: 2px;
    }

    /* Venue */
    .venue-title {
      font-family: 'Playfair Display', serif;
      font-size: 18px;
      font-weight: 700;
      color: #690616;
    }
    .venue-desc {
      font-size: 12.5px;
      opacity: 0.85;
      margin: 4px auto 14px;
      line-height: 1.35;
      max-width: 90%;
    }

    /* Event Timeline */
    .timeline-wrap {
      margin: 20px 0 12px;
      text-align: left;
    }
    .timeline-title {
      text-align: center;
      font-family: 'Cinzel', serif;
      font-size: 11px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #7a1022;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .ev-card {
      background: rgba(255, 255, 255, 0.85);
      border: 1px solid rgba(212,175,55,0.35);
      border-left: 3.5px solid #d4af37;
      border-radius: 8px;
      padding: 9px 12px;
      margin-bottom: 8px;
    }
    .ev-row1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .ev-name {
      font-size: 13.5px;
      font-weight: 700;
      color: #690616;
    }
    .ev-time {
      font-size: 12px;
      font-weight: 600;
      color: #8c6819;
    }
    .ev-row2 {
      font-size: 11px;
      opacity: 0.8;
      margin-top: 2px;
    }

    /* 1-Tap Action Buttons */
    .btn-col {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 20px;
    }
    .btn-gold {
      background: linear-gradient(135deg, #d4af37 0%, #b5891d 100%);
      color: #2b040a !important;
      padding: 13px 18px;
      border-radius: 30px;
      font-family: 'Cinzel', serif;
      font-size: 11px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      font-weight: 700;
      text-decoration: none;
      box-shadow: 0 4px 14px rgba(181, 137, 29, 0.35);
      display: block;
    }
    .btn-outline {
      background: #ffffff;
      color: #690616 !important;
      border: 1.2px solid #690616;
      padding: 12px 18px;
      border-radius: 30px;
      font-family: 'Cinzel', serif;
      font-size: 11px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      font-weight: 700;
      text-decoration: none;
      display: block;
    }

    .compliments-sec {
      margin-top: 22px;
      font-size: 12px;
      opacity: 0.9;
    }
  </style>

  <div class="mobile-royal-container">
    <div class="audio-float" id="musicToggle">🎵
      <audio id="bgSong" loop preload="none">
        <source src="${esc(w.music_url || 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3')}" type="audio/mp3">
      </audio>
    </div>

    <div class="royal-sheet">
      <!-- Monogram -->
      <div class="monogram-badge">${initials}</div>
      <div class="top-invocation">${esc(w.invocation || 'In the name of Allah')}</div>

      <!-- Guest -->
      <div class="guest-plaque">
        <small>Cordially Invited</small>
        <div class="g-name">${esc(guest.name)} ${guest.with_family ? '& Family' : ''}</div>
      </div>

      <div class="host-text">${esc(w.host_name || 'The Family')} request the honour of your presence at the</div>
      <div class="ceremony-heading">${esc(w.ceremony_title || 'Marriage Ceremony')}</div>

      <!-- Couple Section -->
      <div class="couple-block">
        <h1 class="bride-groom">${brideFull}</h1>
        ${w.bride_parents ? `<div class="parents-desc">${esc(w.bride_parents)}</div>` : ''}

        <div class="weds-divider">⚜ WEDS ⚜</div>

        <h1 class="bride-groom">${groomFull}</h1>
        ${w.groom_parents ? `<div class="parents-desc">${esc(w.groom_parents)}</div>` : ''}
      </div>

      <!-- Main Date & Time -->
      <div class="date-card">
        <div class="date-main">${mainDate}</div>
        <div class="time-main">${mainTime ? 'Ceremony: ' + mainTime : ''}</div>
      </div>

      <!-- Venue -->
      <div class="venue-title">${esc(w.venue)}</div>
      <div class="venue-desc">${esc(w.address)}</div>

      <!-- Functions Timeline -->
      ${events && events.length ? `
        <div class="timeline-wrap">
          <div class="timeline-title">Ceremonies Timeline</div>
          ${events.map(ev => `
            <div class="ev-card">
              <div class="ev-row1">
                <span class="ev-name">${esc(ev.event_name)}</span>
                <span class="ev-time">${formatTime(ev.event_time)}</span>
              </div>
              <div class="ev-row2">${formatDate(ev.event_date)} ${ev.note ? '• ' + esc(ev.note) : ''}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Quick Action Buttons -->
      <div class="btn-col">
        ${w.map_url ? `<a href="${esc(w.map_url)}" target="_blank" class="btn-gold">📍 View Venue Location</a>` : ''}
        <a href="${calLink}" target="_blank" class="btn-outline">📅 Save Date to Calendar</a>
        <a href="${rsvpLink}" target="_blank" class="btn-gold">💬 RSVP via WhatsApp</a>
      </div>

      ${w.compliments ? `
        <div class="compliments-sec">
          <em>With best compliments from:</em><br>
          <strong>${esc(w.compliments)}</strong>
        </div>
      ` : ''}
    </div>
  </div>
  `;
}

export function mount(root) {
  const toggle = root.querySelector('#musicToggle');
  const song = root.querySelector('#bgSong');
  if (toggle && song) {
    toggle.onclick = () => {
      if (song.paused) {
        song.play().then(() => { toggle.innerText = '🔊'; }).catch(() => {});
      } else {
        song.pause();
        toggle.innerText = '🎵';
      }
    };
  }
}
