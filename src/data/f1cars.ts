export interface F1Car {
  id: string;
  team: string;
  num: string;
  name: string;
  driver: string;
  bg: string;
  body: string;
  accent: string;
  accent2: string;
}

export const F1_CARS: F1Car[] = [
  // RED BULL RACING
  { id:'f1_1', team:'redbull', num:'1', name:'Red Bull RB21', driver:'Max Verstappen', bg:'linear-gradient(135deg,#0a0a1e,#0c1430)', body:'#1a2366', accent:'#ffd700', accent2:'#ff0000' },
  { id:'f1_22', team:'redbull', num:'22', name:'Red Bull RB21', driver:'Yuki Tsunoda', bg:'linear-gradient(135deg,#0a0a1e,#0c1430)', body:'#1a2366', accent:'#ffd700', accent2:'#ff0000' },
  // FERRARI
  { id:'f1_16', team:'ferrari', num:'16', name:'Ferrari SF-26', driver:'Charles Leclerc', bg:'linear-gradient(135deg,#1a0000,#280505)', body:'#cc0000', accent:'#fff200', accent2:'#ffffff' },
  { id:'f1_44', team:'ferrari', num:'44', name:'Ferrari SF-26', driver:'Lewis Hamilton', bg:'linear-gradient(135deg,#1a0000,#280505)', body:'#cc0000', accent:'#fff200', accent2:'#ffffff' },
  // MCLAREN
  { id:'f1_4', team:'mclaren', num:'4', name:'McLaren MCL61', driver:'Lando Norris', bg:'linear-gradient(135deg,#1a0800,#251000)', body:'#ff8000', accent:'#00d4ff', accent2:'#ffffff' },
  { id:'f1_81', team:'mclaren', num:'81', name:'McLaren MCL61', driver:'Oscar Piastri', bg:'linear-gradient(135deg,#1a0800,#251000)', body:'#ff8000', accent:'#00d4ff', accent2:'#ffffff' },
  // MERCEDES
  { id:'f1_63', team:'mercedes', num:'63', name:'Mercedes W16', driver:'George Russell', bg:'linear-gradient(135deg,#0a0a0a,#141418)', body:'#c0c0c0', accent:'#00d2be', accent2:'#000000' },
  { id:'f1_12', team:'mercedes', num:'12', name:'Mercedes W16', driver:'Andrea Kimi Antonelli', bg:'linear-gradient(135deg,#0a0a0a,#141418)', body:'#c0c0c0', accent:'#00d2be', accent2:'#000000' },
  // ASTON MARTIN
  { id:'f1_14', team:'aston', num:'14', name:'Aston Martin AMR26', driver:'Fernando Alonso', bg:'linear-gradient(135deg,#001a0a,#002810)', body:'#006f42', accent:'#cedc00', accent2:'#ffffff' },
  { id:'f1_18', team:'aston', num:'18', name:'Aston Martin AMR26', driver:'Lance Stroll', bg:'linear-gradient(135deg,#001a0a,#002810)', body:'#006f42', accent:'#cedc00', accent2:'#ffffff' },
  // ALPINE
  { id:'f1_10', team:'alpine', num:'10', name:'Alpine A526', driver:'Pierre Gasly', bg:'linear-gradient(135deg,#000a1a,#001428)', body:'#0055ff', accent:'#ff69b4', accent2:'#ffffff' },
  { id:'f1_5', team:'alpine', num:'5', name:'Alpine A526', driver:'Jack Doohan', bg:'linear-gradient(135deg,#000a1a,#001428)', body:'#0055ff', accent:'#ff69b4', accent2:'#ffffff' },
  // WILLIAMS
  { id:'f1_23', team:'williams', num:'23', name:'Williams FW47', driver:'Alex Albon', bg:'linear-gradient(135deg,#000814,#001020)', body:'#005aff', accent:'#00a3e0', accent2:'#ffffff' },
  { id:'f1_55', team:'williams', num:'55', name:'Williams FW47', driver:'Carlos Sainz', bg:'linear-gradient(135deg,#000814,#001020)', body:'#005aff', accent:'#00a3e0', accent2:'#ffffff' },
  // RB (VISA CASH APP)
  { id:'f1_30', team:'rb', num:'30', name:'VCARB 02', driver:'Liam Lawson', bg:'linear-gradient(135deg,#0a0a1a,#101428)', body:'#1a3a8a', accent:'#ff4444', accent2:'#ffffff' },
  { id:'f1_6', team:'rb', num:'6', name:'VCARB 02', driver:'Isack Hadjar', bg:'linear-gradient(135deg,#0a0a1a,#101428)', body:'#1a3a8a', accent:'#ff4444', accent2:'#ffffff' },
  // HAAS
  { id:'f1_31', team:'haas', num:'31', name:'Haas VF-26', driver:'Esteban Ocon', bg:'linear-gradient(135deg,#0a0a0a,#141414)', body:'#b6babd', accent:'#e10600', accent2:'#ffffff' },
  { id:'f1_87', team:'haas', num:'87', name:'Haas VF-26', driver:'Oliver Bearman', bg:'linear-gradient(135deg,#0a0a0a,#141414)', body:'#b6babd', accent:'#e10600', accent2:'#ffffff' },
  // SAUBER / AUDI
  { id:'f1_27', team:'sauber', num:'27', name:'Sauber C45', driver:'Nico Hülkenberg', bg:'linear-gradient(135deg,#0a1a0a,#102010)', body:'#006f42', accent:'#00e701', accent2:'#ffffff' },
  { id:'f1_50', team:'sauber', num:'50', name:'Sauber C45', driver:'Gabriel Bortoleto', bg:'linear-gradient(135deg,#0a1a0a,#102010)', body:'#006f42', accent:'#00e701', accent2:'#ffffff' },
];

export const F1_FILTERS = [
  { key: 'all', label: 'Todos' },
  { key: 'redbull', label: 'Red Bull' },
  { key: 'ferrari', label: 'Ferrari' },
  { key: 'mclaren', label: 'McLaren' },
  { key: 'mercedes', label: 'Mercedes' },
  { key: 'aston', label: 'Aston Martin' },
  { key: 'alpine', label: 'Alpine' },
  { key: 'williams', label: 'Williams' },
  { key: 'rb', label: 'RB' },
  { key: 'haas', label: 'Haas' },
  { key: 'sauber', label: 'Sauber' },
];

export function f1CarSVG(car: F1Car): string {
  const { body, accent, accent2, num } = car;
  return `<svg viewBox="0 0 240 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[90%]" style="filter:drop-shadow(0 6px 18px rgba(0,0,0,0.6));transition:filter 0.3s">
    <defs>
      <linearGradient id="f1_g_${num}" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="${body}" stop-opacity="0.95"/><stop offset="100%" stop-color="${body}" stop-opacity="0.7"/></linearGradient>
    </defs>
    <ellipse cx="120" cy="72" rx="95" ry="4" fill="rgba(0,0,0,0.5)"/>
    <!-- Nose cone -->
    <path d="M6 52 L30 48 L30 56 Z" fill="${accent}" opacity="0.9"/>
    <!-- Front wing -->
    <path d="M2 58 L38 55 L38 59 L2 62 Z" fill="${body}" opacity="0.85"/>
    <path d="M2 62 L38 59 L38 63 L2 66 Z" fill="${accent}" opacity="0.6"/>
    <!-- Main body -->
    <path d="M30 46 L180 42 L192 48 L192 58 L180 62 L30 58 Z" fill="url(#f1_g_${num})"/>
    <!-- Sidepod -->
    <path d="M70 42 L140 40 L145 44 L145 58 L140 62 L70 58 Z" fill="${body}" opacity="0.75"/>
    <!-- Cockpit / halo -->
    <path d="M58 43 L80 38 L88 38 L88 44 L80 50 L58 50 Z" fill="#111" opacity="0.85"/>
    <path d="M60 44 L78 40 L86 40 L86 43 L78 48 L60 48 Z" fill="rgba(100,200,255,0.15)"/>
    <!-- Halo bar -->
    <path d="M62 44 L82 39" stroke="${accent2}" stroke-width="2" opacity="0.7"/>
    <path d="M62 49 L82 39" stroke="${accent2}" stroke-width="1.5" opacity="0.5"/>
    <!-- Engine cover / shark fin -->
    <path d="M88 38 L170 36 L175 42 L88 44 Z" fill="${body}" opacity="0.6"/>
    <path d="M160 36 L175 32 L178 42 L170 42 Z" fill="${body}" opacity="0.5"/>
    <!-- Rear wing -->
    <path d="M186 30 L228 30 L228 34 L186 34 Z" fill="${accent}" opacity="0.85"/>
    <path d="M188 34 L226 34 L225 38 L189 38 Z" fill="${body}" opacity="0.7"/>
    <!-- Rear wing endplates -->
    <rect x="184" y="28" width="3" height="32" rx="1" fill="${body}" opacity="0.6"/>
    <rect x="228" y="28" width="3" height="32" rx="1" fill="${body}" opacity="0.6"/>
    <!-- DRS actuator -->
    <rect x="204" y="34" width="2" height="8" fill="#333"/>
    <!-- Rear diffuser -->
    <path d="M180 60 L200 58 L195 66 L175 68 Z" fill="#111" opacity="0.6"/>
    <!-- Number -->
    <rect x="98" y="45" width="22" height="10" rx="0" fill="#111" stroke="rgba(255,255,255,0.12)" stroke-width="0.5"/>
    <text x="109" y="53.5" text-anchor="middle" font-family="monospace" font-size="7" fill="${accent}" font-weight="bold">${num}</text>
    <!-- Front wheels -->
    <ellipse cx="40" cy="60" rx="10" ry="12" fill="#0a0a0a" stroke="#2a2a2a" stroke-width="1.5"/>
    <ellipse cx="40" cy="60" rx="6" ry="8" fill="#141414" stroke="#3a3a3a" stroke-width="1"/>
    <ellipse cx="40" cy="60" rx="2" ry="3" fill="#555"/>
    <!-- Rear wheels -->
    <ellipse cx="186" cy="60" rx="12" ry="14" fill="#0a0a0a" stroke="#2a2a2a" stroke-width="2"/>
    <ellipse cx="186" cy="60" rx="8" ry="10" fill="#141414" stroke="#3a3a3a" stroke-width="1.5"/>
    <ellipse cx="186" cy="60" rx="3" ry="4" fill="#555"/>
    <!-- Front axle line -->
    <line x1="30" y1="60" x2="50" y2="60" stroke="#333" stroke-width="1"/>
    <!-- Rear axle line -->
    <line x1="174" y1="60" x2="198" y2="60" stroke="#333" stroke-width="1"/>
    <!-- Accent stripe -->
    <line x1="30" y1="52" x2="180" y2="50" stroke="${accent}" stroke-width="1.2" opacity="0.5"/>
  </svg>`;
}

export function buildF1svg(car: F1Car): string {
  return f1CarSVG(car);
}

export function teamLabel(team: string): string {
  const map: Record<string, string> = {
    redbull: 'Red Bull Racing', ferrari: 'Scuderia Ferrari', mclaren: 'McLaren F1',
    mercedes: 'Mercedes-AMG', aston: 'Aston Martin', alpine: 'Alpine F1',
    williams: 'Williams Racing', rb: 'Visa Cash App RB', haas: 'MoneyGram Haas',
    sauber: 'Stake F1 / Sauber',
  };
  return map[team] || team;
}

export function teamBadgeStyle(team: string) {
  const styles: Record<string, { color: string; border: string; background: string }> = {
    redbull: { color: '#ffd700', border: '1px solid rgba(255,215,0,0.3)', background: 'rgba(255,215,0,0.07)' },
    ferrari: { color: '#ff2200', border: '1px solid rgba(255,34,0,0.3)', background: 'rgba(255,34,0,0.07)' },
    mclaren: { color: '#ff8000', border: '1px solid rgba(255,128,0,0.3)', background: 'rgba(255,128,0,0.07)' },
    mercedes: { color: '#00d2be', border: '1px solid rgba(0,210,190,0.3)', background: 'rgba(0,210,190,0.07)' },
    aston: { color: '#cedc00', border: '1px solid rgba(206,220,0,0.3)', background: 'rgba(206,220,0,0.07)' },
    alpine: { color: '#ff69b4', border: '1px solid rgba(255,105,180,0.3)', background: 'rgba(255,105,180,0.07)' },
    williams: { color: '#00a3e0', border: '1px solid rgba(0,163,224,0.3)', background: 'rgba(0,163,224,0.07)' },
    rb: { color: '#ff4444', border: '1px solid rgba(255,68,68,0.3)', background: 'rgba(255,68,68,0.07)' },
    haas: { color: '#e10600', border: '1px solid rgba(225,6,0,0.3)', background: 'rgba(225,6,0,0.07)' },
    sauber: { color: '#00e701', border: '1px solid rgba(0,231,1,0.3)', background: 'rgba(0,231,1,0.07)' },
  };
  return styles[team] || { color: '#aaa', border: '1px solid rgba(170,170,170,0.3)', background: 'rgba(170,170,170,0.07)' };
}
