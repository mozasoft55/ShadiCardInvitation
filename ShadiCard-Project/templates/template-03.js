const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export default function render({ guest, wedding: w, events = [] }) {
  return `
    <div class="card-wrapper" style="font-family: 'Montserrat', sans-serif;">
      <div style="background: #ffffff; padding: 40px 24px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); text-align: center;">
        <span style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #888;">SAVE THE DATE</span>
        
        <h1 style="font-size: 32px; font-weight: 300; margin: 20px 0 4px 0; color: var(--primary);">
          ${esc(w.bride_name)} &amp; ${esc(w.groom_name)}
        </h1>
        <p style="font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: var(--accent); margin-bottom: 30px;">
          ${esc(w.ceremony_title || 'Wedding Celebration')}
        </p>

        <div style="border-left: 2px solid var(--primary); padding-left: 14px; text-align: left; margin: 24px 0;">
          <small style="text-transform: uppercase; font-size: 10px; color: #666;">Guest Invitation</small>
          <div style="font-size: 16px; font-weight: 600;">${esc(guest.name)} ${guest.withFamily ? '& Family' : ''}</div>
        </div>

        <div style="margin: 28px 0; font-size: 14px; line-height: 1.6;">
          <div style="font-size: 18px; font-weight: 600;">${esc(w.date)}</div>
          <div style="color: #666;">${esc(w.time)}</div>
          <div style="margin-top: 12px; font-weight: 500;">${esc(w.venue)}</div>
          <div style="font-size: 12px; color: #777;">${esc(w.address)}</div>
        </div>

        ${w.map_url ? `<a href="${esc(w.map_url)}" target="_blank" class="gold-btn" style="border-radius: 4px;">GET DIRECTIONS</a>` : ''}
      </div>
    </div>
  `;
}