export interface StockCar {
  id: string;
  maker: 'chevrolet' | 'toyota' | 'mitsubishi';
  num: string;
  name: string;
  driver: string;
  team: string;
  bg: string;
  body: string;
  accent: string;
}

export const SC_CARS: StockCar[] = [
  // CHEVROLET TRACKER
  { id:'sc_83', maker:'chevrolet', num:'83', name:'Chevrolet Tracker', driver:'Gabriel Casagrande', team:'A.Mattheis Vogel', bg:'linear-gradient(135deg,#0f0c00,#1e1800)', body:'#f0c000', accent:'#ffd700' },
  { id:'sc_12', maker:'chevrolet', num:'12', name:'Chevrolet Tracker', driver:'Lucas Foresti', team:'A.Mattheis Vogel', bg:'linear-gradient(135deg,#0a0e14,#101820)', body:'#ffffff', accent:'#ffd700' },
  { id:'sc_85', maker:'chevrolet', num:'85', name:'Chevrolet Tracker', driver:'Guilherme Salas', team:'Cavaleiro Sports', bg:'linear-gradient(135deg,#100000,#1a0000)', body:'#dd2200', accent:'#ffd700' },
  { id:'sc_90', maker:'chevrolet', num:'90', name:'Chevrolet Tracker', driver:'Ricardo Maurício', team:'Cavaleiro Sports', bg:'linear-gradient(135deg,#0a0e14,#101820)', body:'#0055cc', accent:'#ffd700' },
  { id:'sc_0', maker:'chevrolet', num:'0', name:'Chevrolet Tracker', driver:'Cacá Bueno (5×)', team:'Scuderia Chiarelli', bg:'linear-gradient(135deg,#0f0c00,#1a1400)', body:'#ee8800', accent:'#ffd700' },
  { id:'sc_22', maker:'chevrolet', num:'22', name:'Chevrolet Tracker', driver:'André Moraes', team:'Scuderia Chiarelli', bg:'linear-gradient(135deg,#0a0a0a,#141414)', body:'#222222', accent:'#ffd700' },
  // TOYOTA COROLLA CROSS
  { id:'sc_73', maker:'toyota', num:'73', name:'Toyota Corolla Cross', driver:'Enzo Elias', team:'Mercado Livre Rcg.', bg:'linear-gradient(135deg,#140000,#200000)', body:'#cc0000', accent:'#ff4444' },
  { id:'sc_99', maker:'toyota', num:'99', name:'Toyota Corolla Cross', driver:'Renan Guerra', team:'A.Mattheis TMG', bg:'linear-gradient(135deg,#0a0c10,#12161e)', body:'#ffffff', accent:'#ff4444' },
  { id:'sc_95', maker:'toyota', num:'95', name:'Toyota Corolla Cross', driver:'Lucas Kohl', team:'Crown Racing', bg:'linear-gradient(135deg,#0a0a0a,#141414)', body:'#111111', accent:'#ff4444' },
  { id:'sc_81', maker:'toyota', num:'81', name:'Toyota Corolla Cross', driver:'Arthur Leist', team:'Crown Racing', bg:'linear-gradient(135deg,#0a0a18,#101028)', body:'#2244cc', accent:'#ff4444' },
  { id:'sc_10', maker:'toyota', num:'10', name:'Toyota Corolla Cross', driver:'Ricardo Zonta', team:'Full Time TGR', bg:'linear-gradient(135deg,#140000,#200000)', body:'#cc1111', accent:'#ff4444' },
  { id:'sc_80', maker:'toyota', num:'80', name:'Toyota Corolla Cross', driver:'Alfredo Ibiapina', team:'Full Time TGR', bg:'linear-gradient(135deg,#0f0c00,#181200)', body:'#cc8800', accent:'#ff4444' },
  { id:'sc_6', maker:'toyota', num:'6', name:'Toyota Corolla Cross', driver:'Hélio Castroneves', team:'Mercado Livre Rcg.', bg:'linear-gradient(135deg,#0a0a14,#101020)', body:'#3344aa', accent:'#ff4444' },
  { id:'sc_30', maker:'toyota', num:'30', name:'Toyota Corolla Cross', driver:'César Ramos', team:'Mercado Livre Rcg.', bg:'linear-gradient(135deg,#0a0a0a,#141414)', body:'#dddddd', accent:'#ff4444' },
  { id:'sc_21', maker:'toyota', num:'21', name:'Toyota Corolla Cross', driver:'Thiago Camilo', team:'Mercado Livre Rcg.', bg:'linear-gradient(135deg,#0a0c10,#101420)', body:'#1166cc', accent:'#ff4444' },
  // MITSUBISHI ECLIPSE CROSS
  { id:'sc_18', maker:'mitsubishi', num:'18', name:'Mitsubishi Eclipse Cross', driver:'Allam Khodair', team:'Blau Motorsport', bg:'linear-gradient(135deg,#0a0a12,#10101e)', body:'#2233aa', accent:'#ff6666' },
  { id:'sc_29', maker:'mitsubishi', num:'29', name:'Mitsubishi Eclipse Cross', driver:'Daniel Serra (3×)', team:'Blau Motorsport', bg:'linear-gradient(135deg,#0f0f12,#18181e)', body:'#444488', accent:'#ff6666' },
  { id:'sc_1', maker:'mitsubishi', num:'1', name:'Mitsubishi Eclipse Cross', driver:'Felipe Fraga (2×)', team:'Eurofarma RC', bg:'linear-gradient(135deg,#120000,#1c0000)', body:'#cc2200', accent:'#ff6666' },
  { id:'sc_11', maker:'mitsubishi', num:'11', name:'Mitsubishi Eclipse Cross', driver:'Gaetano Di Mauro', team:'Eurofarma RC', bg:'linear-gradient(135deg,#0a0a0a,#141414)', body:'#111111', accent:'#ff6666' },
  { id:'sc_38', maker:'mitsubishi', num:'38', name:'Mitsubishi Eclipse Cross', driver:'Zezinho Mugiatti', team:'RC Team', bg:'linear-gradient(135deg,#0a0c10,#101820)', body:'#005599', accent:'#ff6666' },
  { id:'sc_7', maker:'mitsubishi', num:'7', name:'Mitsubishi Eclipse Cross', driver:'Sérgio Sette Câmara', team:'RC Team', bg:'linear-gradient(135deg,#0f0c00,#181200)', body:'#bb7700', accent:'#ff6666' },
  { id:'sc_33', maker:'mitsubishi', num:'33', name:'Mitsubishi Eclipse Cross', driver:'Nelson Piquet Jr.', team:'Scud. Bandeiras', bg:'linear-gradient(135deg,#0a0a14,#10101e)', body:'#0033aa', accent:'#ff6666' },
  { id:'sc_51', maker:'mitsubishi', num:'51', name:'Mitsubishi Eclipse Cross', driver:'Átila Abreu', team:'Scud. Bandeiras', bg:'linear-gradient(135deg,#0f0f12,#181818)', body:'#222244', accent:'#ff6666' },
  { id:'sc_111', maker:'mitsubishi', num:'111', name:'Mitsubishi Eclipse Cross', driver:'Rubens Barrichello (2×)', team:'Scud. Bandeiras', bg:'linear-gradient(135deg,#120800,#1c1000)', body:'#884400', accent:'#ff6666' },
];

export const SC_FILTERS = [
  { key: 'all', label: 'Todos' },
  { key: 'chevrolet', label: 'Chevrolet' },
  { key: 'toyota', label: 'Toyota' },
  { key: 'mitsubishi', label: 'Mitsubishi' },
];

export function trackerSVG(body: string, accent: string, num: string) {
  return `<svg viewBox="0 0 220 90" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[88%]" style="filter:drop-shadow(0 6px 18px rgba(0,0,0,0.6));transition:filter 0.3s">
    <defs><linearGradient id="tr_g_${num}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${body}" stop-opacity="0.95"/><stop offset="100%" stop-color="${body}" stop-opacity="0.6"/></linearGradient></defs>
    <ellipse cx="110" cy="83" rx="90" ry="5" fill="rgba(0,0,0,0.5)"/>
    <path d="M16 62 L204 62 L212 52 L196 42 L180 39 L40 39 L24 42 L8 52 Z" fill="url(#tr_g_${num})"/>
    <path d="M48 39 L56 16 L164 16 L172 39 Z" fill="url(#tr_g_${num})" opacity="0.88"/>
    <path d="M60 18 L70 32 L150 32 L160 18 Z" fill="rgba(100,200,255,0.22)" stroke="rgba(150,220,255,0.3)" stroke-width="0.8"/>
    <line x1="60" y1="16" x2="160" y2="16" stroke="${accent}" stroke-width="1.5" opacity="0.6"/>
    <line x1="25" y1="48" x2="195" y2="48" stroke="${accent}" stroke-width="1" opacity="0.35"/>
    <path d="M10 53 L20 53 L20 55 L10 55 Z" fill="${accent}" opacity="0.9"/>
    <rect x="200" y="44" width="8" height="10" rx="1" fill="rgba(255,30,30,0.75)"/>
    <rect x="88" y="55" width="24" height="8" rx="0" fill="#111" stroke="rgba(255,255,255,0.15)" stroke-width="0.5"/>
    <text x="100" y="62" text-anchor="middle" font-family="monospace" font-size="6" fill="${accent}" font-weight="bold">${num}</text>
    <circle cx="52" cy="65" r="16" fill="#0a0a0a" stroke="#2a2a2a" stroke-width="2"/><circle cx="52" cy="65" r="10" fill="#141414" stroke="#3a3a3a" stroke-width="1.5"/><circle cx="52" cy="65" r="4" fill="#555"/>
    <circle cx="166" cy="65" r="16" fill="#0a0a0a" stroke="#2a2a2a" stroke-width="2"/><circle cx="166" cy="65" r="10" fill="#141414" stroke="#3a3a3a" stroke-width="1.5"/><circle cx="166" cy="65" r="4" fill="#555"/>
    <rect x="40" y="39" width="140" height="3" fill="${accent}" opacity="0.5"/>
  </svg>`;
}

export function corollaCrossSVG(body: string, accent: string, num: string) {
  return `<svg viewBox="0 0 220 90" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[88%]" style="filter:drop-shadow(0 6px 18px rgba(0,0,0,0.6));transition:filter 0.3s">
    <defs><linearGradient id="cc_g_${num}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${body}" stop-opacity="0.95"/><stop offset="100%" stop-color="${body}" stop-opacity="0.55"/></linearGradient></defs>
    <ellipse cx="110" cy="83" rx="90" ry="5" fill="rgba(0,0,0,0.5)"/>
    <path d="M14 62 L206 62 L214 51 L198 41 L178 38 L42 38 L22 41 L6 51 Z" fill="url(#cc_g_${num})"/>
    <path d="M50 38 L62 14 L158 14 L170 38 Z" fill="${body}" opacity="0.88"/>
    <path d="M64 16 L76 30 L144 30 L156 16 Z" fill="rgba(100,200,255,0.2)" stroke="rgba(150,220,255,0.3)" stroke-width="0.8"/>
    <path d="M24 44 L90 41 L130 41 L196 44" stroke="${accent}" stroke-width="1.5" opacity="0.5" fill="none"/>
    <path d="M8 51 L22 51 L22 53 L8 53 Z" fill="${accent}" opacity="0.9"/>
    <path d="M198 42 L206 42 L210 52 L198 52 Z" fill="rgba(255,30,30,0.7)"/>
    <rect x="88" y="55" width="24" height="8" rx="0" fill="#111" stroke="rgba(255,255,255,0.15)" stroke-width="0.5"/>
    <text x="100" y="62" text-anchor="middle" font-family="monospace" font-size="6" fill="${accent}" font-weight="bold">${num}</text>
    <circle cx="50" cy="65" r="16" fill="#0a0a0a" stroke="#2a2a2a" stroke-width="2"/><circle cx="50" cy="65" r="10" fill="#141414" stroke="#3a3a3a" stroke-width="1.5"/><circle cx="50" cy="65" r="4" fill="#555"/>
    <circle cx="168" cy="65" r="16" fill="#0a0a0a" stroke="#2a2a2a" stroke-width="2"/><circle cx="168" cy="65" r="10" fill="#141414" stroke="#3a3a3a" stroke-width="1.5"/><circle cx="168" cy="65" r="4" fill="#555"/>
  </svg>`;
}

export function eclipseCrossSVG(body: string, accent: string, num: string) {
  return `<svg viewBox="0 0 220 90" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[88%]" style="filter:drop-shadow(0 6px 18px rgba(0,0,0,0.6));transition:filter 0.3s">
    <defs><linearGradient id="ec_g_${num}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${body}" stop-opacity="0.92"/><stop offset="100%" stop-color="${body}" stop-opacity="0.5"/></linearGradient></defs>
    <ellipse cx="110" cy="83" rx="90" ry="5" fill="rgba(0,0,0,0.5)"/>
    <path d="M12 62 L208 62 L216 50 L200 40 L176 37 L44 37 L20 40 L4 50 Z" fill="url(#ec_g_${num})"/>
    <path d="M52 37 L64 13 L156 13 L168 37 Z" fill="${body}" opacity="0.85"/>
    <path d="M66 15 L78 29 L142 29 L154 15 Z" fill="rgba(100,200,255,0.2)" stroke="rgba(150,220,255,0.25)" stroke-width="0.8"/>
    <line x1="66" y1="22" x2="154" y2="22" stroke="#333" stroke-width="1.5"/>
    <path d="M22 43 L100 40 L120 40 L198 43" stroke="${accent}" stroke-width="1.2" opacity="0.4" fill="none"/>
    <path d="M6 50 L20 50 L20 52.5 L6 52.5 Z" fill="${accent}" opacity="0.95"/>
    <rect x="200" y="41" width="10" height="14" rx="1" fill="rgba(255,20,20,0.8)"/>
    <rect x="88" y="55" width="24" height="8" rx="0" fill="#111" stroke="rgba(255,255,255,0.15)" stroke-width="0.5"/>
    <text x="100" y="62" text-anchor="middle" font-family="monospace" font-size="6" fill="${accent}" font-weight="bold">${num}</text>
    <circle cx="48" cy="65" r="16" fill="#0a0a0a" stroke="#2a2a2a" stroke-width="2"/><circle cx="48" cy="65" r="10" fill="#141414" stroke="#3a3a3a" stroke-width="1.5"/><circle cx="48" cy="65" r="4" fill="#555"/>
    <circle cx="170" cy="65" r="16" fill="#0a0a0a" stroke="#2a2a2a" stroke-width="2"/><circle cx="170" cy="65" r="10" fill="#141414" stroke="#3a3a3a" stroke-width="1.5"/><circle cx="170" cy="65" r="4" fill="#555"/>
  </svg>`;
}

export function buildSCsvg(car: StockCar): string {
  if (car.maker === 'chevrolet') return trackerSVG(car.body, car.accent, car.num);
  if (car.maker === 'toyota') return corollaCrossSVG(car.body, car.accent, car.num);
  return eclipseCrossSVG(car.body, car.accent, car.num);
}
