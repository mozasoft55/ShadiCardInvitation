const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
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
  const initials = `${(bride[0] || '')}&${(groom[0] || '')}`;

  return `
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Pinyon+Script&family=Montserrat:wght@400;500;600&display=swap">
  
  <style>
    .royal-wrapper {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px 14px;
      box-sizing: border-box;
      background: radial-gradient(ellipse at top, #fffdf8, #f0dfbc), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='90'%3E%3Cpath d='M30 4l16 41-16 41-16-41z' fill='none' stroke='%23c9a24a' stroke-opacity='.18'/%3E%3C/svg%3E");
    }

    .royal-card {
      position: relative;
      max-width: 440px;
      width: 100%;
      background: linear-gradient(180deg, #fffcf5 0%, #f7ecd5 100%);
      border: 3px solid var(--accent, #c9a24a);
      border-radius: 220px 220px 24px 24px;
      padding: 48px 24px 36px;
      box-shadow: 0 20px 50px rgba(77, 10, 24, 0.2), inset 0 0 40px rgba(201, 162, 74, 0.08);
      text-align: center;
      color: var(--text, #3b1a1f);
      box-sizing: border-box;
    }

    .royal-card::before {
      content: "";
      position: absolute;
      inset: 8px;
      border: 1px solid rgba(201, 162, 74, 0.6);
      border-radius: inherit;
      pointer-events: none;
    }

    .royal-crest {
      width: 58px;
      height: 58px;
      margin: 0 auto 16px;
      border: 1.5px solid var(--accent, #c9a24a);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Pinyon Script', cursive;
      font-size: 28px;
      color: var(--primary, #7a1426);
      background: #fff8ea;
      box-shadow: 0 4px 12px rgba(201, 162, 74, 0.25);
    }

    .guest-tag {
      background: linear-gradient(135deg, rgba(201,162,74,0.18), rgba(201,162,74,0.05));
      border: 1px solid rgba(201,162,74,0.35);
      border-radius: 30px;
      padding: 10px 20px;
      margin: 18px auto;
      display: inline-block;
      max-width: 90%;
    }

    .gold-divider {
      height: 1px;
      width: 80%;
      margin: 20px auto;
      background: linear-gradient(90deg, transparent, var(--accent, #c9a24a), transparent);
    }

    .btn-royal {
      display: inline-block;
      background: linear-gradient(135deg, var(--primary, #7a1426), var(--primary-dark, #4d0a18));
      color: #f7ecd5 !important;
      padding: 11px 28px;
      border-radius: 30px;
      font-family: 'Cinzel', serif;
      font-size: 11px;
      letter-spacing: 2px;
      text-transform: uppercase;
      text-decoration: none;
      border: 1px solid var(--accent, #c9a24a);
      box-shadow: 0 6px 16px rgba(77,10,24,0.3);
      transition: all 0.3s ease;
    }

    .timeline-box {
      background: rgba(255, 255, 255, 0.75);
      border: 1px solid rgba(201, 162, 74, 0.3);
      border-radius: 12px;
      padding: 16px;
      margin: 24px 0 16px;
      text-align: left;
    }
  </style>

  <div class="royal-wrapper">
    <div class="royal-card">
      <div style="font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--accent, #c9a24a); margin-bottom: 12px;">
        ${esc(w.invocation || 'In the name of Allah the most beneficent & merciful')}
      </div>

      <div class="royal-crest">${initials}</div>

      <div class="guest-tag">
        <div style="font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--primary, #7a1426);">Warmly Invited</div>
        <div style="font-size: 19px; font-weight: 700; color: var(--primary, #7a1426); margin-top: 2px;">
          ${esc(guest.name)} ${guest.withFamily ? '& Family' : ''}
        </div>
      </div>

      <p style="font-style: italic; font-size: 15px; margin: 16px 0 8px; line-height: 1.4;">
        ${esc(w.host_name || 'Family')} request the honour of your auspicious presence at the
      </p>

      <div style="font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: 3px; text-transform: uppercase; color: var(--primary, #7a1426); font-weight: 700;">
        ${esc(w.ceremony_title || 'Marriage Ceremony')}
      </div>

      <div class="gold-divider"></div>

      <!-- Bride & Groom -->
      <h1 style="font-family: 'Pinyon Script', cursive; font-size: 52px; margin: 0; color: var(--primary, #7a1426); line-height: 1;">${bride}</h1>
      ${w.bride_parents ? `<div style="font-size: 12px; opacity: 0.85; margin-top: 2px;">${esc(w.bride_parents)}</div>` : ''}

      <div style="font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: 4px; margin: 10px 0; font-weight: bold; color: var(--accent, #c9a24a);">WEDS</div>

      <h1 style="font-family: 'Pinyon Script', cursive; font-size: 52px; margin: 0; color: var(--primary, #7a1426); line-height: 1;">${groom}</h1>
      ${w.groom_parents ? `<div style="font-size: 12px; opacity: 0.85; margin-top: 2px;">${esc(w.groom_parents)}</div>` : ''}

      <div class="gold-divider"></div>

      <!-- Date & Venue -->
      <div style="margin: 18px 0;">
        <div style="font-family: 'Cinzel', serif; font-size: 17px; font-weight: 700; letter-spacing: 2px; color: var(--primary, #7a1426);">
          ${cleanDate(w.date)}
        </div>
        <div style="font-size: 14px; margin-top: 4px; font-weight: 600;">Time: ${esc(w.time)}</div>
      </div>

      <div style="margin: 16px 0;">
        <strong style="font-size: 17px; color: var(--primary, #7a1426);">${esc(w.venue)}</strong>
        <p style="font-size: 13px; margin: 4px auto 14px; max-width: 90%; opacity: 0.85; line-height: 1.4;">${esc(w.address)}</p>
        ${w.map_url ? `<a href="${esc(w.map_url)}" target="_blank" class="btn-royal">📍 View Venue Map</a>` : ''}
      </div>

      <!-- Program Timeline -->
      ${events && events.length ? `
        <div class="timeline-box">
          <div style="text-align: center; font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--primary, #7a1426); font-weight: bold; margin-bottom: 12px;">Program Timeline</div>
          ${events.map(ev => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px dashed rgba(201,162,74,0.4); font-size: 13px;">
              <span style="font-weight: 600; color: var(--primary, #7a1426);">${esc(ev.event_name)}</span>
              <span style="font-size: 12px;">${cleanDate(ev.event_date)} | ${esc(ev.event_time)}</span>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${w.compliments ? `
        <div style="font-size: 12px; margin-top: 20px; opacity: 0.9;">
          <strong>With Best Compliments:</strong> ${esc(w.compliments)}
        </div>
      ` : ''}

      ${w.rsvp_contacts ? `
        <div style="font-size: 11px; margin-top: 8px; opacity: 0.75;">
          <strong>R.S.V.P:</strong> ${esc(w.rsvp_contacts)}
        </div>
      ` : ''}
    </div>
  </div>
  `;
}
