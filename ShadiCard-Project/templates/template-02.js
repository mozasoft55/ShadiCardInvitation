// ==========================================================================
// ROYAL IMPERIAL HEIRLOOM EDITION (Single Page Seamless Farman - No Tabs, No Inner Scroll)
// ==========================================================================

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cleanDate = d => {
  if (!d) return '';
  if (typeof d === 'string' && d.includes('T')) return d.split('T')[0];
  return String(d);
};

export default function render({ guest, wedding: w, events = [] }) {
  const bride = esc(w.bride_name || 'Tarana');
  const groom = esc(w.groom_name || 'Akbar');
  const brideFull = esc(w.bride_full || bride);
  const groomFull = esc(w.groom_full || groom);
  const initials = `${(bride[0] || 'T')}&${(groom[0] || 'A')}`.toUpperCase();

  // WhatsApp RSVP link
  const rsvpPhone = esc(w.rsvp_number || '919330981386');
  const rsvpMsg = encodeURIComponent(`Aadab / Namaste, I will be delighted to attend the wedding of ${bride} & ${groom}! Guest: ${guest.name}`);
  const rsvpUrl = `https://wa.me/${rsvpPhone}?text=${rsvpMsg}`;

  // Google Calendar link
  const calTitle = encodeURIComponent(`Wedding: ${bride} & ${groom}`);
  const calLoc = encodeURIComponent(`${w.venue || ''}, ${w.address || ''}`);
  const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&location=${calLoc}`;

  return `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@600;700;900&family=Cinzel:wght@500;600;700&family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">

  <style>
    /* Global Container */
    body {
      margin: 0;
      padding: 0;
      background: #140205;
      font-family: 'Cormorant Garamond', Georgia, serif;
      -webkit-font-smoothing: antialiased;
    }

    .emperor-canvas {
      min-height: 100vh;
      width: 100%;
      background: radial-gradient(circle at 50% 20%, #2f040b 0%, #120104 100%);
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 40px 16px 80px;
      box-sizing: border-box;
      position: relative;
    }

    /* Ambient Luxury Shimmer Overlay */
    .ambient-bg {
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M30 0l30 30-30 30L0 30z'/%3E%3C/g%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 1;
    }

    /* The Seamless Royal Farman Sheet */
    .royal-scroll-sheet {
      position: relative;
      width: 100%;
      max-width: 520px;
      background: linear-gradient(180deg, #fffbf2 0%, #faecd2 50%, #f4dec0 100%);
      border: 3.5px solid #d4af37;
      border-radius: 260px 260px 32px 32px;
      padding: 60px 28px 46px;
      box-shadow: 
        0 25px 60px rgba(0, 0, 0, 0.7),
        0 0 45px rgba(212, 175, 55, 0.25),
        inset 0 0 40px rgba(212, 175, 55, 0.12);
      text-align: center;
      color: #380811;
      box-sizing: border-box;
      z-index: 2;
    }

    /* Dual Inset Gold Lines */
    .royal-scroll-sheet::before {
      content: "";
      position: absolute;
      inset: 9px;
      border: 1.5px solid rgba(212, 175, 55, 0.7);
      border-radius: 250px 250px 24px 24px;
      pointer-events: none;
    }
    .royal-scroll-sheet::after {
      content: "";
      position: absolute;
      inset: 15px;
      border: 1px dashed rgba(212, 175, 55, 0.45);
      border-radius: 244px 244px 18px 18px;
      pointer-events: none;
    }

    /* Emblem */
    .crest-box {
      width: 78px;
      height: 78px;
      margin: 0 auto 16px;
      border: 2px solid #d4af37;
      border-radius: 50%;
      background: radial-gradient(circle, #fffdf8, #f7ecd5);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6px 18px rgba(212, 175, 55, 0.35);
      position: relative;
    }
    .crest-crown {
      position: absolute;
      top: -14px;
      font-size: 20px;
    }
    .crest-letters {
      font-family: 'Cinzel Decorative', cursive;
      font-size: 26px;
      font-weight: 700;
      color: #8c1023;
      letter-spacing: 1px;
    }

    .invocation {
      font-family: 'Cinzel', serif;
      font-size: 11px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #8c6819;
      margin-bottom: 20px;
      font-weight: 600;
      line-height: 1.5;
    }

    /* VIP Guest Badge */
    .vip-card {
      background: linear-gradient(135deg, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.06) 100%);
      border: 1.2px solid rgba(212, 175, 55, 0.6);
      border-radius: 40px;
      padding: 10px 24px;
      display: inline-block;
      margin: 6px auto 22px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    }
    .vip-card small {
      font-family: 'Cinzel', serif;
      font-size: 9.5px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #8c1023;
      font-weight: 700;
      display: block;
    }
    .vip-card .guest-title {
      font-size: 21px;
      font-weight: 700;
      color: #630716;
      margin-top: 3px;
    }

    .invitation-quote {
      font-style: italic;
      font-size: 16px;
      color: #55141e;
      line-height: 1.5;
      margin: 10px auto 14px;
      max-width: 90%;
    }

    .ceremony-title {
      font-family: 'Cinzel Decorative', serif;
      font-size: 18px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #8c1023;
      font-weight: 700;
      margin-bottom: 12px;
    }

    /* Royal Couple Names */
    .couple-section {
      margin: 24px 0 16px;
    }
    .royal-title-name {
      font-family: 'Great Vibes', cursive;
      font-size: 58px;
      line-height: 1.05;
      color: #700618;
      margin: 0;
      text-shadow: 0 2px 8px rgba(112, 6, 24, 0.12);
    }
    .parent-line {
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      color: #612730;
      margin-top: 4px;
      letter-spacing: 0.5px;
      line-height: 1.4;
    }
    .knot-symbol {
      font-family: 'Cinzel Decorative', serif;
      font-size: 15px;
      letter-spacing: 5px;
      color: #9e751b;
      margin: 12px 0;
      font-weight: 700;
    }

    /* Golden Divider Bar */
    .gold-bar {
      height: 1.5px;
      width: 75%;
      margin: 26px auto;
      background: linear-gradient(90deg, transparent, #d4af37, transparent);
    }

    /* Date & Muhurat Section */
    .date-muhurat-badge {
      background: #ffffff;
      border: 1.5px solid rgba(212, 175, 55, 0.5);
      border-radius: 16px;
      padding: 16px 20px;
      margin: 20px auto;
      box-shadow: 0 6px 18px rgba(0,0,0,0.04);
    }
    .main-date {
      font-family: 'Cinzel', serif;
      font-size: 20px;
      font-weight: 700;
      color: #700618;
      letter-spacing: 1.5px;
    }
    .main-time {
      font-size: 15px;
      font-weight: 600;
      color: #8c6819;
      margin-top: 4px;
    }

    /* Venue */
    .venue-name {
      font-size: 21px;
      font-weight: 700;
      color: #700618;
      margin-top: 10px;
    }
    .venue-address {
      font-size: 13.5px;
      opacity: 0.88;
      margin: 6px auto 16px;
      max-width: 88%;
      line-height: 1.4;
    }

    /* Program Schedule Timeline */
    .timeline-container {
      margin: 30px 0 20px;
      text-align: left;
    }
    .timeline-heading {
      text-align: center;
      font-family: 'Cinzel', serif;
      font-size: 12.5px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #700618;
      font-weight: 700;
      margin-bottom: 14px;
    }
    .timeline-card {
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(212, 175, 55, 0.4);
      border-left: 4px solid #d4af37;
      border-radius: 10px;
      padding: 12px 16px;
      margin-bottom: 10px;
      box-shadow: 0 3px 8px rgba(0,0,0,0.03);
    }
    .timeline-card-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .ev-title {
      font-size: 15px;
      font-weight: 700;
      color: #700618;
    }
    .ev-time {
      font-size: 13px;
      font-weight: 600;
      color: #9e751b;
    }
    .ev-date {
      font-size: 12px;
      opacity: 0.8;
      margin-top: 2px;
    }

    /* Action Buttons (Full width luxury pills) */
    .actions-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 28px;
    }
    .action-btn-gold {
      background: linear-gradient(135deg, #d4af37 0%, #b38719 100%);
      color: #2b040a !important;
      padding: 14px 20px;
      border-radius: 35px;
      font-family: 'Cinzel', serif;
      font-size: 11.5px;
      letter-spacing: 2px;
      text-transform: uppercase;
      font-weight: 700;
      text-decoration: none;
      border: 1px solid #fce79f;
      box-shadow: 0 6px 18px rgba(179, 135, 25, 0.35);
      transition: all .25s ease;
      display: block;
    }
    .action-btn-gold:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 22px rgba(179, 135, 25, 0.5);
    }
    .action-btn-maroon {
      background: linear-gradient(135deg, #700618 0%, #40020c 100%);
      color: #faebd7 !important;
      padding: 14px 20px;
      border-radius: 35px;
      font-family: 'Cinzel', serif;
      font-size: 11.5px;
      letter-spacing: 2px;
      text-transform: uppercase;
      font-weight: 700;
      text-decoration: none;
      border: 1px solid #d4af37;
      box-shadow: 0 6px 18px rgba(64, 2, 12, 0.4);
      display: block;
    }

    .compliments-footer {
      margin-top: 30px;
      font-size: 13.5px;
      line-height: 1.5;
      opacity: 0.9;
    }
    .rsvp-box {
      font-size: 12.5px;
      margin-top: 10px;
      color: #700618;
      font-weight: 600;
    }
  </style>

  <div class="emperor-canvas">
    <div class="ambient-bg"></div>

    <div class="royal-scroll-sheet">
      
      <!-- Crown Monogram -->
      <div class="crest-box">
        <span class="crest-crown">👑</span>
        <span class="crest-letters">${initials}</span>
      </div>

      <div class="invocation">${esc(w.invocation || 'In the name of Allah the most beneficent & merciful')}</div>

      <!-- Guest Name Plate -->
      <div class="vip-card">
        <small>Cordially Invited</small>
        <div class="guest-title">${esc(guest.name)} ${guest.with_family ? '& Family' : ''}</div>
      </div>

      <p class="invitation-quote">
        ${esc(w.host_name || 'Mrs. & Mr. Md Kalim Khan')} request the honour of your auspicious presence at the
      </p>

      <div class="ceremony-title">${esc(w.ceremony_title || 'Marriage Ceremony')}</div>

      <!-- Couple Section -->
      <div class="couple-section">
        <h1 class="royal-title-name">${brideFull}</h1>
        ${w.bride_parents ? `<div class="parent-line">${esc(w.bride_parents)}</div>` : ''}

        <div class="knot-symbol">⚜ WEDS ⚜</div>

        <h1 class="royal-title-name">${groomFull}</h1>
        ${w.groom_parents ? `<div class="parent-line">${esc(w.groom_parents)}</div>` : ''}
      </div>

      <div class="gold-bar"></div>

      <!-- Date & Muhurat -->
      <div class="date-muhurat-badge">
        <div class="main-date">${cleanDate(w.date)}</div>
        <div class="main-time">Ceremony Time: ${esc(w.time)}</div>
      </div>

      <!-- Venue -->
      <div class="venue-name">${esc(w.venue)}</div>
      <div class="venue-address">${esc(w.address)}</div>

      <!-- Schedule of Events -->
      ${events && events.length ? `
        <div class="timeline-container">
          <div class="timeline-heading">Wedding Festivities</div>
          ${events.map(ev => `
            <div class="timeline-card">
              <div class="timeline-card-header">
                <span class="ev-title">${esc(ev.event_name)}</span>
                <span class="ev-time">${esc(ev.event_time)}</span>
              </div>
              <div class="ev-date">${cleanDate(ev.event_date)} ${ev.note ? '• ' + esc(ev.note) : ''}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Interactive 1-Tap Buttons -->
      <div class="actions-grid">
        ${w.map_url ? `<a href="${esc(w.map_url)}" target="_blank" class="action-btn-gold">📍 View Venue on Google Maps</a>` : ''}
        <a href="${calUrl}" target="_blank" class="action-btn-maroon">📅 Add to Google Calendar</a>
        <a href="${rsvpUrl}" target="_blank" class="action-btn-gold">💬 Confirm RSVP via WhatsApp</a>
      </div>

      <!-- Compliments & RSVP Contacts -->
      ${w.compliments ? `
        <div class="compliments-footer">
          <em>With best compliments from:</em><br>
          <strong>${esc(w.compliments)}</strong>
        </div>
      ` : ''}

      ${w.rsvp_contacts ? `
        <div class="rsvp-box">
          R.S.V.P: ${esc(w.rsvp_contacts)}
        </div>
      ` : ''}

    </div>
  </div>
  `;
}
