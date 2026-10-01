const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export default function render({ guest, wedding: w, events = [] }) {
  const bride = esc(w.bride_name || 'Bride');
  const groom = esc(w.groom_name || 'Groom');
  const initials = `${(bride[0] || '')}&${(groom[0] || '')}`;

  return `
    <div class="card-wrapper">
      <div style="border: 2px solid var(--accent); border-radius: 200px 200px 16px 16px; padding: 40px 18px 24px; text-align: center; background: var(--paper-top); box-shadow: 0 12px 30px rgba(0,0,0,0.12);">
        
        <p style="letter-spacing: 2px; font-size: 12px; text-transform: uppercase; margin: 0 0 12px 0;">
          ${esc(w.invocation || 'In the name of Allah')}
        </p>

        <div style="width: 55px; height: 55px; margin: 0 auto 16px; border: 1px solid var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Pinyon Script', cursive; font-size: 26px; color: var(--accent);">
          ${initials}
        </div>

        <div style="background: rgba(201,162,74,0.1); padding: 8px; border-radius: 6px; margin-bottom: 20px;">
          <small style="text-transform: uppercase; font-size: 10px; letter-spacing: 1px;">Warm Invitation For</small>
          <div style="font-size: 18px; font-weight: 600; color: var(--primary);">${esc(guest.name)} ${guest.withFamily ? '& Family' : ''}</div>
        </div>

        <p style="font-size: 14px; font-style: italic; margin-bottom: 16px;">
          ${esc(w.host_name || 'Family')} request the honour of your presence at the ${esc(w.ceremony_title || 'Marriage Ceremony')}
        </p>

        <h1 style="font-family: 'Pinyon Script', cursive; font-size: 46px; margin: 0; color: var(--primary); line-height: 1.1;">${bride}</h1>
        <div style="letter-spacing: 3px; font-size: 12px; margin: 6px 0; font-weight: bold;">WEDS</div>
        <h1 style="font-family: 'Pinyon Script', cursive; font-size: 46px; margin: 0; color: var(--primary); line-height: 1.1;">${groom}</h1>

        <div style="margin: 24px 0 18px; border-top: 1px solid var(--accent); border-bottom: 1px solid var(--accent); padding: 12px 0;">
          <div style="font-size: 16px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">${esc(w.date)}</div>
          <div style="font-size: 13px;">${esc(w.time)}</div>
        </div>

        <div style="margin-bottom: 20px;">
          <strong>${esc(w.venue)}</strong>
          <p style="font-size: 12px; margin: 4px 0 12px; opacity: 0.85;">${esc(w.address)}</p>
          ${w.map_url ? `<a href="${esc(w.map_url)}" target="_blank" class="gold-btn">VIEW VENUE MAP</a>` : ''}
        </div>

        ${events.length ? `
          <div style="text-align: left; background: rgba(0,0,0,0.03); padding: 12px; border-radius: 8px; margin-bottom: 18px;">
            <div style="text-align: center; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--primary); margin-bottom: 8px; font-weight: bold;">Program Details</div>
            ${events.map(ev => `
              <div style="display: flex; justify-content: space-between; font-size: 12px; border-bottom: 1px dashed rgba(0,0,0,0.1); padding: 4px 0;">
                <span><strong>${esc(ev.event_name)}</strong></span>
                <span>${esc(ev.event_date)} | ${esc(ev.event_time)}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <small style="opacity: 0.7; font-size: 11px;">With Best Compliments: ${esc(w.compliments || 'Relatives & Friends')}</small>
      </div>
    </div>
  `;
}