/* Shared UI logic: loader, mobile menu, order modal */

const SVGNS = 'http://www.w3.org/2000/svg';
function polarPoint(cx, cy, r, deg){
  const rad = (deg - 90) * Math.PI / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function describeArc(cx, cy, r, startDeg, endDeg){
  const start = polarPoint(cx, cy, r, startDeg);
  const end = polarPoint(cx, cy, r, endDeg);
  const largeArc = (endDeg - startDeg) <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

function buildSpeedGauge(){
  const svg = document.getElementById('gaugeSvg');
  if(!svg) return null;
  const cx = 150, cy = 150;
  const startDeg = 240, endDeg = 480; // 240deg sweep through the top: 0 at lower-left, max at lower-right
  const maxSpeed = 280;
  const majorStep = 40;
  const minorStep = 20;

  function ns(tag, attrs){
    const el = document.createElementNS(SVGNS, tag);
    Object.keys(attrs).forEach(k=>el.setAttribute(k, attrs[k]));
    return el;
  }

  const defs = ns('defs', {});
  defs.innerHTML = `
    <linearGradient id="needleGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ff5b46"/>
      <stop offset="100%" stop-color="#ffb020"/>
    </linearGradient>
    <linearGradient id="redzoneGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffb020"/>
      <stop offset="100%" stop-color="#ff3b30"/>
    </linearGradient>
    <radialGradient id="hubGrad" cx="35%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#6b7386"/>
      <stop offset="60%" stop-color="#2a3040"/>
      <stop offset="100%" stop-color="#0a0d13"/>
    </radialGradient>
  `;
  svg.appendChild(defs);

  // outer bezel ring
  svg.appendChild(ns('circle', { cx, cy, r:132, fill:'none', stroke:'#1a2030', 'stroke-width':2 }));

  // background arc (full range)
  const bgPath = ns('path', { d: describeArc(cx, cy, 112, startDeg, endDeg), fill:'none', stroke:'#1a2030', 'stroke-width':10, 'stroke-linecap':'round' });
  svg.appendChild(bgPath);

  // redzone arc (last 25%)
  const redStartDeg = startDeg + (endDeg - startDeg) * 0.78;
  const redPath = ns('path', { d: describeArc(cx, cy, 112, redStartDeg, endDeg), fill:'none', stroke:'url(#redzoneGrad)', 'stroke-width':10, 'stroke-linecap':'round', opacity:'0.9' });
  svg.appendChild(redPath);

  // ticks + numbers
  const totalMinorSteps = maxSpeed / minorStep;
  for(let i=0; i<=totalMinorSteps; i++){
    const val = i * minorStep;
    const deg = startDeg + (endDeg - startDeg) * (val / maxSpeed);
    const isMajor = val % majorStep === 0;
    const r1 = 112, r2 = isMajor ? 96 : 102;
    const p1 = polarPoint(cx, cy, r1, deg);
    const p2 = polarPoint(cx, cy, r2, deg);
    svg.appendChild(ns('line', {
      x1:p1.x, y1:p1.y, x2:p2.x, y2:p2.y,
      stroke: isMajor ? '#e8ecf4' : '#5c6478',
      'stroke-width': isMajor ? 2.5 : 1.5,
      'stroke-linecap':'round'
    }));
    if(isMajor){
      const labelPos = polarPoint(cx, cy, 84, deg);
      const label = ns('text', {
        x:labelPos.x, y:labelPos.y, 'text-anchor':'middle', 'dominant-baseline':'middle',
        fill:'#9aa4b8', 'font-size':'12', 'font-weight':'700', 'font-family':'Segoe UI,sans-serif'
      });
      label.textContent = val;
      svg.appendChild(label);
    }
  }

  // faint track center circle
  svg.appendChild(ns('circle', { cx, cy, r:14, fill:'none', stroke:'#1a2030', 'stroke-width':1 }));

  // car marker that travels along the gauge track instead of a needle
  const carRadius = 112;
  const carGroup = ns('g', { id:'carGroup' });
  const car = ns('text', {
    x:0, y:0, 'text-anchor':'middle', 'dominant-baseline':'middle', 'font-size':'46'
  });
  car.textContent = '🏎️';
  carGroup.appendChild(car);
  svg.appendChild(carGroup);

  function setNeedleAngle(speed){
    const deg = startDeg + (endDeg - startDeg) * (Math.min(speed,maxSpeed) / maxSpeed);
    const p = polarPoint(cx, cy, carRadius, deg);
    carGroup.setAttribute('transform', `translate(${p.x} ${p.y}) scale(-1,1)`);
  }
  setNeedleAngle(0);

  return { setNeedleAngle, maxSpeed };
}

function initLoader(){
  const loader = document.getElementById('loader');
  if(!loader) return;
  const speedEl = document.getElementById('loaderSpeed');
  const gauge = buildSpeedGauge();
  const target = gauge ? gauge.maxSpeed : 280;
  const start = performance.now();
  const dur = 1400;
  function tick(now){
    const p = Math.min(1,(now-start)/dur);
    const eased = 1 - Math.pow(1-p, 3);
    const val = Math.floor(eased*target);
    if(speedEl) speedEl.textContent = val;
    if(gauge) gauge.setNeedleAngle(eased*target);
    if(p<1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
  window.addEventListener('load', ()=>{
    setTimeout(()=>{ loader.classList.add('hide'); document.body.style.overflow='auto'; }, 1450);
  });
  document.body.style.overflow='hidden';
  setTimeout(()=>{ loader.classList.add('hide'); document.body.style.overflow='auto'; }, 1900);
}

function initScrollReveal(){
  const targets = document.querySelectorAll('.section, .cta-banner');
  if(!targets.length) return;
  targets.forEach(el => el.classList.add('reveal'));
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach(el => observer.observe(el));
}

function initScrollSpy(){
  const navLinks = document.querySelectorAll('.nav-links a[data-nav]');
  if(!navLinks.length) return;
  const sections = Array.from(navLinks)
    .map(a => document.getElementById(a.dataset.nav))
    .filter(Boolean);
  if(!sections.length) return;

  function onScroll(){
    const scrollPos = window.scrollY + 140;
    let currentId = sections[0].id;
    sections.forEach(sec=>{
      if(sec.offsetTop <= scrollPos) currentId = sec.id;
    });
    navLinks.forEach(a=>{
      a.classList.toggle('active', a.dataset.nav === currentId);
    });
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();
}

function initMenuToggle(){
  const btn = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  if(!btn||!links) return;
  btn.addEventListener('click', ()=>{
    links.style.display = links.style.display==='flex' ? 'none' : 'flex';
    links.style.flexDirection='column';
    links.style.position='absolute';
    links.style.top='64px';
    links.style.left='0';
    links.style.right='0';
    links.style.background='#0b0e14';
    links.style.padding='20px 24px';
    links.style.borderBottom='1px solid var(--border)';
  });
}

/* Order Modal */
let currentOrderProduct = null;

function openOrderModal(product){
  currentOrderProduct = product;
  const backdrop = document.getElementById('orderModalBackdrop');
  document.getElementById('orderProductName').textContent = product.title;
  document.getElementById('orderProductPrice').textContent = fmtPrice(product.price);
  document.getElementById('acctBank').textContent = BANK_ACCOUNT.bank;
  document.getElementById('acctTitle').textContent = BANK_ACCOUNT.title;
  document.getElementById('acctNumber').textContent = BANK_ACCOUNT.account;
  backdrop.classList.add('show');
}
function closeOrderModal(){
  document.getElementById('orderModalBackdrop').classList.remove('show');
}
function submitOrder(e){
  e.preventDefault();
  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const address = document.getElementById('custAddress').value.trim();
  const car = document.getElementById('custCar').value.trim();
  if(!name || !phone || !address){
    alert('Please fill all required fields.');
    return;
  }
  const msg =
`Assalam-o-Alaikum, I want to place an order.

Product: ${currentOrderProduct.title}
Price: ${fmtPrice(currentOrderProduct.price)}

Name: ${name}
Phone: ${phone}
Address: ${address}
Car Model: ${car || 'N/A'}

I have paid via bank transfer to ${BANK_ACCOUNT.bank} (${BANK_ACCOUNT.account}). Payment screenshot attached here on WhatsApp.`;
  window.open(waLink(msg), '_blank');
  closeOrderModal();
}

/* Gallery Video Player Modal */
function playGalleryVideo(url){
  const modal = document.getElementById('videoPlayerBackdrop');
  const player = document.getElementById('videoPlayerEl');
  if(!modal || !player) return;
  player.src = url;
  modal.classList.add('show');
  player.play();
}
function closeGalleryVideo(){
  const modal = document.getElementById('videoPlayerBackdrop');
  const player = document.getElementById('videoPlayerEl');
  if(!modal || !player) return;
  player.pause();
  player.src = '';
  modal.classList.remove('show');
}

function genericWhatsapp(){
  window.open(waLink("Assalam-o-Alaikum, I need help regarding speedometer repair & fitting services."), '_blank');
}

document.addEventListener('DOMContentLoaded', ()=>{
  initLoader();
  initMenuToggle();
  initScrollSpy();
  initScrollReveal();
  const orderForm = document.getElementById('orderForm');
  if(orderForm) orderForm.addEventListener('submit', submitOrder);
  const closeBtn = document.getElementById('modalCloseBtn');
  if(closeBtn) closeBtn.addEventListener('click', closeOrderModal);
  const backdrop = document.getElementById('orderModalBackdrop');
  if(backdrop) backdrop.addEventListener('click',(e)=>{ if(e.target===backdrop) closeOrderModal(); });

  const videoCloseBtn = document.getElementById('videoPlayerClose');
  if(videoCloseBtn) videoCloseBtn.addEventListener('click', closeGalleryVideo);
  const videoBackdrop = document.getElementById('videoPlayerBackdrop');
  if(videoBackdrop) videoBackdrop.addEventListener('click', (e)=>{ if(e.target===videoBackdrop) closeGalleryVideo(); });

  // render social links in footer if present
  const social = typeof getSocial==='function' ? getSocial() : {};
  const map = {facebook:'fbLink', instagram:'igLink', youtube:'ytLink', tiktok:'ttLink'};
  Object.keys(map).forEach(k=>{
    const el = document.getElementById(map[k]);
    if(el){
      if(social[k]){ el.href = social[k]; el.style.display='flex'; }
      else{ el.style.display='none'; }
    }
  });

  // render phone/address in footer if present
  const footerPhone = document.getElementById('footerPhone');
  if(footerPhone && typeof getPhone==='function') footerPhone.textContent = '📞 ' + getPhone();
  const footerAddress = document.getElementById('footerAddress');
  if(footerAddress && typeof getAddress==='function') footerAddress.textContent = '📍 ' + getAddress();
});
