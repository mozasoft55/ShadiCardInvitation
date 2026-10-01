const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export default function render({ guest, wedding: w, events = [] }) {
  const bride = esc(w.bride_name || 'Bride');
  const groom = esc(w.groom_name || 'Groom');

  return `
    <div class="card-wrapper" style="background: #11141c; color: #f2e4c4; min-height: 100vh;">
      <div style="border: 1px solid rgba(201, 162, 74, 0.4); padding: 36px 18px; text-align: center; border-radius: 12px; box-shadow: 0 0 25px rgba(201,162,74,0.15);">
        
        <p style="letter-spacing: 3px; font-size: 11px; text-transform: uppercase; color: #c9a24a; margin-bottom: 20px;">
          ${esc(w.invocation || 'The Wedding Reception')}
        </p>

        <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 6px; margin-bottom: 24px; border: 1px solid rgba(201,162,74,0.2);">
          <small style="font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: #c9a24a;">Exclusive Invite For</small>
          <div style="font-size: 17px; margin-top: 4px; color: #fff;">${esc(guest.name)} ${guest.withFamily ? '& Family' : ''}</div>
        </div>

        <h1 style="font-family: 'Pinyon Script', cursive; font-size: 48px; margin: 0; color: #e5c378;">${bride}</h1>
        <div style="letter-spacing: 4px; font-size: 11px; margin: 8px 0; color: #c9a24a;">AND</div>
        <h1 style="font-family: 'Pinyon Script', cursive; font-size: 48px; margin: 0; color: #e5c378;">${groom}</h1>

        <div style="margin: 28px 0; border-top: 1px solid rgba(201,162,74,0.3); border-bottom: 1px solid rgba(201,162,74,0.3); padding: 14px 0;">
          <div style="font-size: 17px; letter-spacing: 2px;">${esc(w.date)}</div>
          <div style="font-size: 13px; color: #c9a24a;">${esc(w.time)}</div>
        </div>

        <div style="margin-bottom: 24px;">
          <strong style="color: #fff; font-size: 16px;">${esc(w.venue)}</strong>
          <p style="font-size: 12px; margin: 6px 0 16px; opacity: 0.8;">${esc(w.address)}</p>
          ${w.map_url ? `<a href="${esc(w.map_url)}" target="_blank" style="display:inline-block; padding: 10px 24px; background: #c9a24a; color: #111; text-decoration: none; border-radius: 20px; font-weight: bold; font-size: 11px; letter-spacing: 1px;">VIEW MAP</a>` : ''}
        </div>

        <small style="opacity: 0.6; font-size: 11px;">With Compliments: ${esc(w.compliments || 'Family & Friends')}</small>
      </div>
    </div>
  `;
}