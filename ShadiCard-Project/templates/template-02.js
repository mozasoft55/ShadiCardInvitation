// Template 02 – Royal Arch: welcome arch -> Open Invitation -> swipeable card images / text slides -> closing arch
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const imgUrl = u => { 
  u = String(u || '').trim(); 
  if (!u) return '';
  return /^(https?:|data:image)/i.test(u) ? esc(u) : `https://lh3.googleusercontent.com/d/${encodeURIComponent(u)}=w1000`; 
};
const first = n => String(n || '').trim().split(/\s+/).find(x => !/^(dr|md|mr|mrs|ms|mohd?)\.?$/i.test(x)) || '';

export default function render({ guest, wedding: w, events = [] }) {
  const b = esc(first(w.bride_name)), g = esc(first(w.groom_name));
  const ini = esc(((first(w.bride_name)[0] || '') + (first(w.groom_name)[0] || '')).toUpperCase());
  const slides = [w.image1, w.image2, w.image3, w.image4, w.image5].map(imgUrl).filter(Boolean);
  const gen = slides.length ? [] : textSlides(w, events);
  const total = slides.length + gen.length + 1;
  const crest = `<div class="crest"><i></i><span>${ini}</span><i></i></div>`;

  return `
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Pinyon+Script&display=swap">
<style>
body { margin: 0; }
[hidden] { display: none !important; }
.t2 {
  --wine: #7a1426;
  --wine2: #4d0a18;
  --gold: #c9a24a;
  min-height: 100dvh;
  font-family: 'Cormorant Garamond', Georgia, serif;
  color: #3b1a1f;
  background: radial-gradient(ellipse at top, #fff8ea, #f1e4c6), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='90'%3E%3Cpath d='M30 4l16 41-16 41-16-41z' fill='none' stroke='%23c9a24a' stroke-opacity='.22'/%3E%3C/svg%3E");
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}
.t2[data-th=emerald] { --wine: #0f4d3a; --wine2: #06281e; }
.t2[data-th=navy] { --wine: #1b2f5e; --wine2: #0c1730; }
.t2[data-th=rose] { --wine: #9c2f55; --wine2: #5e1630; }

.arch {
  position: relative;
  width: min(88vw, 380px);
  min-height: min(82dvh, 640px);
  box-sizing: border-box;
  padding: 0 26px;
  text-align: center;
  border: 3px solid var(--gold);
  border-radius: min(44vw, 190px) min(44vw, 190px) 28px 28px;
  background: linear-gradient(#fffaf0, #f2e4c4);
  box-shadow: 0 18px 40px rgba(90, 60, 20, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: rise .9s ease both;
}
.arch:before {
  content: "";
  position: absolute;
  inset: 11px;
  border: 1px solid rgba(201, 162, 74, .7);
  border-radius: inherit;
  pointer-events: none;
}
.crest {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}
.crest i {
  width: 44px;
  height: 1px;
  background: var(--gold);
  position: relative;
}
.crest span {
  width: 46px;
  height: 46px;
  border: 1.5px solid var(--wine);
  border-radius: 50%;
  display: grid;
  place-items: center;
  outline: 1px solid var(--gold);
  outline-offset: 3px;
  color: var(--wine);
  font-weight: 600;
  letter-spacing: .04em;
}
.script {
  font-family: 'Pinyon Script', cursive;
  color: var(--wine);
  font-weight: 400;
}
.big {
  font-size: clamp(54px, 17vw, 74px);
  line-height: 1.05;
  margin: 6px 0;
}
.rule {
  width: 70%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  margin: 12px 0;
}
.dear {
  font-style: italic;
  font-size: 1.7rem;
  margin: 8px 0;
  color: var(--wine);
}
.msg2 {
  font-size: 1.2rem;
  line-height: 1.5;
  margin: 6px 0 18px;
}
.msg2 .script {
  font-size: 1.9rem;
}
.small {
  font-size: .95rem;
  opacity: .75;
  margin-bottom: 14px;
}
.openbtn {
  border: 2px solid var(--gold);
  background: linear-gradient(var(--wine), var(--wine2));
  color: #e8c878;
  font: 600 1.05rem 'Cormorant Garamond', serif;
  letter-spacing: .22em;
  text-transform: uppercase;
  padding: 16px 34px;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(77, 10, 24, .35);
  transition: transform .2s ease, box-shadow .2s ease;
}
.openbtn:hover {
  transform: scale(1.03);
  box-shadow: 0 10px 22px rgba(77, 10, 24, .45);
}
.out {
  animation: fade .5s ease forwards;
}
.viewer {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  animation: rise .7s ease both;
}
.track {
  flex: 1;
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}
.track::-webkit-scrollbar { display: none; }
.slide {
  flex: 0 0 100%;
  scroll-snap-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
  box-sizing: border-box;
}
.slide img {
  max-width: 100%;
  max-height: calc(100dvh - 70px);
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(60, 40, 10, .3);
}
.dots {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 14px;
}
.dots i {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1.5px solid var(--gold);
  background: #fff8ea;
  transition: .3s;
  cursor: pointer;
}
.dots i.on {
  width: 38px;
  border-radius: 9px;
  background: linear-gradient(#e6c775, #b98b2e);
}
.sign { font-size: 1.6rem; margin-top: 10px; }
.cl { font-size: clamp(46px, 14vw, 62px); line-height: 1.1; }
.paper {
  width: min(92vw, 400px);
  max-height: calc(100dvh - 70px);
  overflow: auto;
  box-sizing: border-box;
  padding: 34px 26px;
  text-align: center;
  border: 3px solid var(--gold);
  border-radius: min(46vw, 200px) min(46vw, 200px) 24px 24px;
  background: linear-gradient(#fffaf0, #f2e4c4) center/100% 100%;
  box-shadow: 0 12px 30px rgba(60, 40, 10, .3);
  font-size: 1.05rem;
  line-height: 1.35;
}
.paper.framed {
  border: 0;
  padding: 15% 17%;
  border-radius: 0;
  background-color: transparent;
}
.paper .it { font-style: italic; margin: 4px 0; }
.paper .hd { font-size: 1.5rem; font-weight: 600; color: var(--wine); margin: 6px 0; }
.paper .nm { font-size: 1.9rem; font-weight: 600; color: var(--wine); margin: 2px 0; }
.paper small { display: block; font-size: .88rem; opacity: .85; margin-bottom: 6px; }
.paper .wd { font-family: 'Pinyon Script', cursive; font-size: 1.8rem; color: var(--wine); }
.paper hr {
  border: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  margin: 12px 0;
}
.paper .ev { margin: 8px 0; }
.paper .evn { font-size: 1.35rem; font-weight: 600; color: var(--wine); text-transform: uppercase; letter-spacing: .04em; }

@keyframes rise { from { opacity: 0; transform: translateY(16px); } }
@keyframes fade { to { opacity: 0; transform: scale(.97); } }
</style>

<div class="t2" data-th="${esc(w.theme)}">
  <section class="arch welcome">
    ${crest}
    <div class="script big">Welcome</div>
    <div class="rule"></div>
    <div class="dear">Dear ${esc(guest.name)}${guest.with_family ? ' &amp; Family' : ''}</div>
    <p class="msg2">
      ${esc(w.message) || 'With immense joy, we invite you to celebrate the wedding of'} 
      <span class="script">${b} &amp; ${g}.</span>
    </p>
    ${guest.persons > 1 ? `<div class="small">Invitation for ${esc(guest.persons)} guests</div>` : ''}
    <button class="openbtn" type="button">Open Invitation</button>
  </section>

  <section class="viewer" hidden>
    <div class="track">
      ${slides.map(u => `<div class="slide"><img src="${u}" loading="lazy" alt="Invitation card" onerror="this.closest('.slide').remove()"></div>`).join('')}
      ${gen.join('')}
      <div class="slide">
        <div class="arch" style="animation:none">
          ${crest}
          <div class="script cl">With Love &amp; Warmest Regards</div>
          <div class="rule"></div>
          <div class="sign">${esc(w.footer_text) || b + ' &amp; ' + g + ' Family'}</div>
        </div>
      </div>
    </div>
    <div class="dots">${Array.from({length: total}, (_, i) => `<i class="${i ? '' : 'on'}"></i>`).join('')}</div>
  </section>
</div>`;
}

export function mount(root) {
  const w = root.querySelector('.welcome');
  const v = root.querySelector('.viewer');
  const t = v.querySelector('.track');
  const d = [...v.querySelectorAll('.dots i')];

  root.querySelector('.openbtn').onclick = () => {
    w.classList.add('out');
    setTimeout(() => {
      w.hidden = true;
      v.hidden = false;
    }, 450);
  };

  t.addEventListener('scroll', () => {
    const i = Math.round(t.scrollLeft / t.clientWidth);
    d.forEach((x, j) => x.classList.toggle('on', j === i));
  }, { passive: true });

  d.forEach((x, j) => x.onclick = () => t.scrollTo({ left: j * t.clientWidth, behavior: 'smooth' }));
}

const lines = s => String(s || '').split(/[;\n]/).map(x => x.trim()).filter(Boolean);

function textSlides(w, events) {
  const fr = imgUrl(w.frame_image);
  const box = h => `<div class="slide"><div class="paper${fr ? ' framed' : ''}"${fr ? ` style="background-image:url('${fr}')"` : ''}>${h}</div></div>`;
  const par = x => x ? `<small>${esc(x)}</small>` : '';

  const a = `
    <p class="it">${esc(w.invocation || 'In the name of Allah the most beneficent & merciful')}</p><hr>
    <div class="hd">${esc(w.host_name)}</div>
    <p class="it">has great pleasure to invite you to attend the</p>
    <div class="hd">${esc(w.ceremony_title) || 'Marriage Ceremony'}</div>
    <div class="nm">${esc(w.bride_full || w.bride_name)}</div>${par(w.bride_parents)}
    <div class="wd">Weds</div>
    <div class="nm">${esc(w.groom_full || w.groom_name)}</div>${par(w.groom_parents)}
    ${w.compliments ? `<hr><div class="it">With best compliments from</div><div class="hd">${esc(w.compliments)}</div>` : ''}
    ${lines(w.rsvp_contacts).length ? `<hr><div class="hd">R.S.V.P.</div>${lines(w.rsvp_contacts).map(l => `<div>${esc(l)}</div>`).join('')}` : ''}
  `;

  const b = `
    <p class="it">Insha Allah, to be solemnised as per the following programme</p>
    ${events.map(e => `
      <hr>
      <div class="ev">
        <div class="evn">${esc(e.event_name)}</div>
        <div>${esc(e.event_date)}${e.event_time ? ' at ' + esc(e.event_time) : ''}</div>
        ${e.note ? `<small>${esc(e.note)}</small>` : ''}
      </div>
    `).join('')}
    <hr>
    <div class="evn">${esc(w.venue_title) || 'Venue'}</div>
    <div class="hd">${esc(w.venue)}</div>
    <div>${esc(w.address)}</div>
    ${w.map_url ? `<div style="margin-top:10px;"><a href="${esc(w.map_url)}" target="_blank" style="color:var(--wine);font-weight:bold;text-decoration:underline;">📍 View on Google Maps</a></div>` : ''}
  `;

  return [box(a), box(b)];
}
