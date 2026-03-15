export interface Car {
  id: string;
  name: string;
  film: string;
  filmLabel: string;
  driver: string;
  driverLabel: string;
  type: string;
  price: number;
  body: string;
  cabin: string;
  glass: string;
  bg: string;
  underglow: string;
  shape: 'coupe' | 'muscle' | 'supercar';
}

export const CARS: Car[] = [
  // FILME 1 — The Fast and the Furious (2001)
  { id:'supra', name:'Toyota Supra MK4', film:'f1', filmLabel:'Velozes e Furiosos 1 (2001)', driver:'brian', driverLabel:"Brian O'Connor", type:'JDM Sport', price:55, body:'#e8500a', cabin:'#aa3800', glass:'#00d4ff', bg:'linear-gradient(135deg,#180c05,#2a1400)', underglow:'#00d4ff', shape:'coupe' },
  { id:'charger', name:'Dodge Charger R/T 1970', film:'f1', filmLabel:'Velozes e Furiosos 1 (2001)', driver:'dom', driverLabel:'Dominic Toretto', type:'Muscle Car', price:65, body:'#1a1a1a', cabin:'#111', glass:'rgba(100,200,255,0.5)', bg:'linear-gradient(135deg,#0a0a0a,#1a1a1a)', underglow:'#e8500a', shape:'muscle' },
  { id:'eclipse', name:'Mitsubishi Eclipse 1995', film:'f1', filmLabel:'Velozes e Furiosos 1 (2001)', driver:'brian', driverLabel:"Brian O'Connor", type:'JDM Tuner', price:40, body:'#2a7a18', cabin:'#1a5010', glass:'#7cff50', bg:'linear-gradient(135deg,#0a1505,#0f2008)', underglow:'#7cff50', shape:'coupe' },
  { id:'mazdarx7', name:'Mazda RX-7 FD3S 1993', film:'f1', filmLabel:'Velozes e Furiosos 1 (2001)', driver:'outros', driverLabel:'Dominic (cena)', type:'JDM Sport', price:50, body:'#cc2200', cabin:'#8b1800', glass:'#00d4ff', bg:'linear-gradient(135deg,#1a0503,#2a0a05)', underglow:'#ff4400', shape:'coupe' },
  { id:'civic', name:'Honda Civic EJ1 1993', film:'f1', filmLabel:'Velozes e Furiosos 1 (2001)', driver:'outros', driverLabel:'Equipe Toretto', type:'JDM Tuner', price:35, body:'#111111', cabin:'#0a0a0a', glass:'#00ffaa', bg:'linear-gradient(135deg,#050505,#111111)', underglow:'#00ff88', shape:'coupe' },
  { id:'jetta', name:'VW Jetta 1995', film:'f1', filmLabel:'Velozes e Furiosos 1 (2001)', driver:'outros', driverLabel:'Jesse', type:'Tuner', price:32, body:'#e8d020', cabin:'#aa9800', glass:'#00d4ff', bg:'linear-gradient(135deg,#1a1800,#2a2400)', underglow:'#ffee00', shape:'coupe' },

  // FILME 2 — 2 Fast 2 Furious (2003)
  { id:'skyline', name:'Nissan Skyline GT-R R34', film:'f2', filmLabel:'2 Fast 2 Furious (2003)', driver:'brian', driverLabel:"Brian O'Connor", type:'JDM Sport', price:60, body:'#1a50cc', cabin:'#1038a0', glass:'#aaccff', bg:'linear-gradient(135deg,#050a20,#0a1440)', underglow:'#4488ff', shape:'coupe' },
  { id:'camaro69', name:'Chevrolet Camaro Yenko 1969', film:'f2', filmLabel:'2 Fast 2 Furious (2003)', driver:'outros', driverLabel:'Suki', type:'Muscle Car', price:58, body:'#cc8800', cabin:'#884400', glass:'#ffcc44', bg:'linear-gradient(135deg,#150900,#201400)', underglow:'#ff8800', shape:'muscle' },
  { id:'evo7', name:'Mitsubishi Lancer Evo VII', film:'f2', filmLabel:'2 Fast 2 Furious (2003)', driver:'brian', driverLabel:"Brian O'Connor", type:'Rally/JDM', price:45, body:'#e8e8e8', cabin:'#aaaaaa', glass:'#00d4ff', bg:'linear-gradient(135deg,#101010,#1a1a1a)', underglow:'#00d4ff', shape:'coupe' },
  { id:'s2000', name:'Honda S2000 2001', film:'f2', filmLabel:'2 Fast 2 Furious (2003)', driver:'outros', driverLabel:'Suki', type:'JDM Roadster', price:42, body:'#ff69b4', cabin:'#cc4080', glass:'#ffaacc', bg:'linear-gradient(135deg,#1a0510,#250818)', underglow:'#ff69b4', shape:'coupe' },
  { id:'impreza', name:'Subaru Impreza WRX 2002', film:'f2', filmLabel:'2 Fast 2 Furious (2003)', driver:'outros', driverLabel:'Jimmy', type:'Rally', price:44, body:'#1a3a8a', cabin:'#102255', glass:'#88aaff', bg:'linear-gradient(135deg,#080e20,#0a1530)', underglow:'#4466cc', shape:'coupe' },

  // FILME 3 — Tokyo Drift (2006)
  { id:'rx7veilside', name:'Mazda RX-7 VeilSide', film:'f3', filmLabel:'Tokyo Drift (2006)', driver:'outros', driverLabel:'Han', type:'JDM Drift', price:65, body:'#e85010', cabin:'#aa3200', glass:'#00d4ff', bg:'linear-gradient(135deg,#180a00,#280e00)', underglow:'#ff6600', shape:'coupe' },
  { id:'s15', name:'Nissan Silvia S15', film:'f3', filmLabel:'Tokyo Drift (2006)', driver:'outros', driverLabel:'Sean Boswell', type:'JDM Drift', price:48, body:'#aaaaaa', cabin:'#888888', glass:'#aaddff', bg:'linear-gradient(135deg,#0a0a0a,#141414)', underglow:'#aaaaaa', shape:'coupe' },
  { id:'gtr32', name:'Nissan Skyline GT-R R32', film:'f3', filmLabel:'Tokyo Drift (2006)', driver:'outros', driverLabel:'DK Takashi', type:'JDM Sport', price:55, body:'#2a2a2a', cabin:'#111', glass:'#88aaff', bg:'linear-gradient(135deg,#0a0a10,#12121a)', underglow:'#4455cc', shape:'coupe' },
  { id:'s14', name:'Nissan 240SX S14', film:'f3', filmLabel:'Tokyo Drift (2006)', driver:'outros', driverLabel:'Várias', type:'JDM Drift', price:38, body:'#cc6600', cabin:'#884400', glass:'#ffcc88', bg:'linear-gradient(135deg,#150800,#200c00)', underglow:'#ff8800', shape:'coupe' },
  { id:'roadrunner', name:'Plymouth Road Runner 1970', film:'f3', filmLabel:'Tokyo Drift (2006)', driver:'dom', driverLabel:'Dominic Toretto', type:'Muscle Car', price:60, body:'#111111', cabin:'#0a0a0a', glass:'#aaddff', bg:'linear-gradient(135deg,#050505,#0c0c0c)', underglow:'#444444', shape:'muscle' },
  { id:'lancer', name:'Mitsubishi Lancer Evo IX', film:'f3', filmLabel:'Tokyo Drift (2006)', driver:'outros', driverLabel:'Morimoto', type:'Rally/JDM', price:44, body:'#44aaff', cabin:'#2266cc', glass:'#88ccff', bg:'linear-gradient(135deg,#050f20,#081828)', underglow:'#44aaff', shape:'coupe' },

  // FILME 4 — Fast & Furious (2009)
  { id:'charger08', name:'Dodge Charger SRT-8 2006', film:'f4', filmLabel:'Velozes e Furiosos 4 (2009)', driver:'dom', driverLabel:'Dominic Toretto', type:'Muscle Car', price:60, body:'#1a1a1a', cabin:'#0a0a0a', glass:'#aaddff', bg:'linear-gradient(135deg,#080808,#111111)', underglow:'#e8500a', shape:'muscle' },
  { id:'chevelle', name:'Chevrolet Chevelle SS 1970', film:'f4', filmLabel:'Velozes e Furiosos 4 (2009)', driver:'dom', driverLabel:'Dominic Toretto', type:'Muscle Car', price:60, body:'#990000', cabin:'#660000', glass:'#ff9988', bg:'linear-gradient(135deg,#120000,#1a0000)', underglow:'#cc2200', shape:'muscle' },
  { id:'skylinef4', name:'Nissan GT-R R35 2009', film:'f4', filmLabel:'Velozes e Furiosos 4 (2009)', driver:'brian', driverLabel:"Brian O'Connor", type:'JDM Sport', price:68, body:'#cccccc', cabin:'#999999', glass:'#ddeeff', bg:'linear-gradient(135deg,#0f0f0f,#1a1a1a)', underglow:'#88aacc', shape:'coupe' },
  { id:'pontiac', name:'Pontiac GTO 1969', film:'f4', filmLabel:'Velozes e Furiosos 4 (2009)', driver:'outros', driverLabel:'Braga', type:'Muscle Car', price:55, body:'#cc7700', cabin:'#885500', glass:'#ffcc66', bg:'linear-gradient(135deg,#130800,#1e0e00)', underglow:'#ff9900', shape:'muscle' },

  // FILME 5 — Fast Five (2011)
  { id:'koenigsegg', name:'Koenigsegg CCXR 2010', film:'f5', filmLabel:'Fast Five (2011)', driver:'outros', driverLabel:'Roman & Tej', type:'Hypercar', price:95, body:'#cc8800', cabin:'#885500', glass:'#ffd080', bg:'linear-gradient(135deg,#150a00,#201000)', underglow:'#ffaa00', shape:'supercar' },
  { id:'gt500', name:'Ford Mustang GT500 2011', film:'f5', filmLabel:'Fast Five (2011)', driver:'brian', driverLabel:"Brian O'Connor", type:'Muscle Car', price:55, body:'#1a3aaa', cabin:'#102270', glass:'#88aaff', bg:'linear-gradient(135deg,#060e22,#0a1635)', underglow:'#3366ff', shape:'muscle' },
  { id:'gtr35_5', name:'Nissan GT-R R35 (Tunado)', film:'f5', filmLabel:'Fast Five (2011)', driver:'dom', driverLabel:'Equipe Toretto', type:'JDM Sport', price:72, body:'#888888', cabin:'#555555', glass:'#aaddff', bg:'linear-gradient(135deg,#0a0a0a,#141414)', underglow:'#aaaaaa', shape:'coupe' },
  { id:'chargergt', name:'Dodge Charger cop + vault', film:'f5', filmLabel:'Fast Five (2011)', driver:'dom', driverLabel:'Dom & Brian', type:'Muscle Car', price:65, body:'#111111', cabin:'#0a0a0a', glass:'#88aacc', bg:'linear-gradient(135deg,#080808,#111111)', underglow:'#e8500a', shape:'muscle' },

  // FILME 6 — Fast & Furious 6 (2013)
  { id:'escort', name:'Ford Escort RS1600 1970', film:'f6', filmLabel:'Velozes e Furiosos 6 (2013)', driver:'brian', driverLabel:"Brian O'Connor", type:'Rally Clássico', price:52, body:'#eeeeee', cabin:'#cccccc', glass:'#aaddff', bg:'linear-gradient(135deg,#0e0e0e,#181818)', underglow:'#cccccc', shape:'coupe' },
  { id:'jenseni', name:'Jensen Interceptor 1971', film:'f6', filmLabel:'Velozes e Furiosos 6 (2013)', driver:'outros', driverLabel:'Deckard Shaw', type:'Gran Turismo', price:60, body:'#1a3a6a', cabin:'#102250', glass:'#88aaff', bg:'linear-gradient(135deg,#050e1a,#081628)', underglow:'#4488cc', shape:'coupe' },
  { id:'hakosuka', name:'Nissan Skyline GT-R Hakosuka', film:'f6', filmLabel:'Velozes e Furiosos 6 (2013)', driver:'outros', driverLabel:'Han', type:'JDM Clássico', price:58, body:'#cccccc', cabin:'#999999', glass:'#ddeeff', bg:'linear-gradient(135deg,#0c0c0c,#181818)', underglow:'#aaaacc', shape:'coupe' },
  { id:'charger69', name:'Dodge Charger Daytona 1969', film:'f6', filmLabel:'Velozes e Furiosos 6 (2013)', driver:'dom', driverLabel:'Dominic Toretto', type:'Muscle Car', price:68, body:'#cc4400', cabin:'#882800', glass:'#ffaa88', bg:'linear-gradient(135deg,#150500,#200800)', underglow:'#ff5500', shape:'muscle' },

  // FILME 7 — Furious 7 (2015)
  { id:'lykan', name:'W Motors Lykan HyperSport', film:'f7', filmLabel:'Furious 7 (2015)', driver:'dom', driverLabel:'Dominic Toretto', type:'Hypercar', price:98, body:'#cc0000', cabin:'#880000', glass:'#ffaaaa', bg:'linear-gradient(135deg,#1a0000,#280000)', underglow:'#ff2200', shape:'supercar' },
  { id:'supraPW', name:'Toyota Supra MK4 (Paul Walker)', film:'f7', filmLabel:'Furious 7 (2015)', driver:'brian', driverLabel:"Brian O'Connor", type:'JDM Icon', price:70, body:'#f0f0f0', cabin:'#cccccc', glass:'#aaddff', bg:'linear-gradient(135deg,#0f0f0f,#1a1a1a)', underglow:'#aaddff', shape:'coupe' },
  { id:'agera', name:'Koenigsegg Agera One:1', film:'f7', filmLabel:'Furious 7 (2015)', driver:'outros', driverLabel:'Jakande', type:'Hypercar', price:95, body:'#111111', cabin:'#0a0a0a', glass:'#88aaff', bg:'linear-gradient(135deg,#050505,#0a0a0a)', underglow:'#4488cc', shape:'supercar' },
  { id:'mclaren', name:'McLaren 650S Spider 2015', film:'f7', filmLabel:'Furious 7 (2015)', driver:'outros', driverLabel:'Hobbs & Shaw', type:'Supercar', price:88, body:'#ff8c00', cabin:'#cc6600', glass:'#ffcc88', bg:'linear-gradient(135deg,#150800,#201000)', underglow:'#ff8800', shape:'supercar' },

  // FILME 8 — The Fate of the Furious (2017)
  { id:'iccharger', name:'Dodge Charger "Ice" Jato', film:'f8', filmLabel:'F8: Destino (2017)', driver:'dom', driverLabel:'Dominic Toretto', type:'Muscle Extremo', price:78, body:'#222222', cabin:'#111', glass:'#aaddff', bg:'linear-gradient(135deg,#050505,#0a0a0a)', underglow:'#00d4ff', shape:'muscle' },
  { id:'lambof8', name:'Lamborghini Aventador S', film:'f8', filmLabel:'F8: Destino (2017)', driver:'outros', driverLabel:'Cypher', type:'Supercar', price:90, body:'#ccaa00', cabin:'#886600', glass:'#ffdd66', bg:'linear-gradient(135deg,#120e00,#1e1400)', underglow:'#ffcc00', shape:'supercar' },
  { id:'subimag', name:'Subaru WRX STI 2015', film:'f8', filmLabel:'F8: Destino (2017)', driver:'outros', driverLabel:'Little Nobody', type:'Rally', price:50, body:'#1a3a8a', cabin:'#102255', glass:'#88aaff', bg:'linear-gradient(135deg,#050e20,#081628)', underglow:'#4466cc', shape:'coupe' },
  { id:'flipcar', name:'Flip Car (Shaw Concept)', film:'f8', filmLabel:'F8: Destino (2017)', driver:'outros', driverLabel:'Owen Shaw (F6)', type:'Concept', price:72, body:'#333333', cabin:'#222222', glass:'#666666', bg:'linear-gradient(135deg,#080808,#101010)', underglow:'#444444', shape:'coupe' },

  // FILME 9 — F9 (2021)
  { id:'pontiacf9', name:'Pontiac Fiero 1984 (espaço)', film:'f9', filmLabel:'F9 (2021)', driver:'outros', driverLabel:'Roman & Tej', type:'Concept Espacial', price:75, body:'#e8500a', cabin:'#aa3200', glass:'#ff8844', bg:'linear-gradient(135deg,#180a00,#280e00)', underglow:'#ff6600', shape:'coupe' },
  { id:'chargerf9', name:'Dodge Charger R/T 1968', film:'f9', filmLabel:'F9 (2021)', driver:'dom', driverLabel:'Dominic Toretto', type:'Muscle Car', price:68, body:'#cc2200', cabin:'#881800', glass:'#ff9988', bg:'linear-gradient(135deg,#150200,#200400)', underglow:'#ff3300', shape:'muscle' },
  { id:'mustangf9', name:'Ford Mustang Mach 1 1969', film:'f9', filmLabel:'F9 (2021)', driver:'outros', driverLabel:'Jakob Toretto', type:'Muscle Car', price:65, body:'#1a1a1a', cabin:'#0a0a0a', glass:'#88aacc', bg:'linear-gradient(135deg,#080808,#0f0f0f)', underglow:'#555555', shape:'muscle' },
  { id:'aston', name:'Aston Martin DB5 1964', film:'f9', filmLabel:'F9 (2021)', driver:'outros', driverLabel:'Mr. Nobody', type:'Gran Turismo', price:72, body:'#778899', cabin:'#556677', glass:'#aaccdd', bg:'linear-gradient(135deg,#0a0c0e,#101418)', underglow:'#8899aa', shape:'coupe' },

  // FILME 10 — Fast X (2023)
  { id:'lambof10', name:'Lamborghini Revuelto 2023', film:'f10', filmLabel:'Fast X (2023)', driver:'outros', driverLabel:'Dante Reyes', type:'Hypercar', price:98, body:'#cc0000', cabin:'#880000', glass:'#ff8888', bg:'linear-gradient(135deg,#1a0000,#280000)', underglow:'#ff2200', shape:'supercar' },
  { id:'chargerx', name:'Dodge Charger EV Concept', film:'f10', filmLabel:'Fast X (2023)', driver:'dom', driverLabel:'Dominic Toretto', type:'Muscle EV', price:80, body:'#1a1a1a', cabin:'#0a0a0a', glass:'#00d4ff', bg:'linear-gradient(135deg,#050505,#0a0a0a)', underglow:'#00d4ff', shape:'muscle' },
  { id:'ferrari', name:'Ferrari Roma 2020', film:'f10', filmLabel:'Fast X (2023)', driver:'outros', driverLabel:'Várias', type:'Supercar', price:92, body:'#cc1100', cabin:'#880a00', glass:'#ff9988', bg:'linear-gradient(135deg,#150100,#200200)', underglow:'#ff2200', shape:'supercar' },
  { id:'bmwm3', name:'BMW M3 Competition 2022', film:'f10', filmLabel:'Fast X (2023)', driver:'outros', driverLabel:'Isabel', type:'Sport Sedã', price:65, body:'#eeeeee', cabin:'#cccccc', glass:'#aaddff', bg:'linear-gradient(135deg,#0e0e0e,#181818)', underglow:'#bbbbbb', shape:'coupe' },
];

export const FILM_FILTERS = [
  { key: 'all', label: 'Todos' },
  { key: 'f1', label: 'V&F 1 (2001)' },
  { key: 'f2', label: '2Fast (2003)' },
  { key: 'f3', label: 'Tokyo (2006)' },
  { key: 'f4', label: 'V&F 4 (2009)' },
  { key: 'f5', label: 'Fast Five (2011)' },
  { key: 'f6', label: 'V&F 6 (2013)' },
  { key: 'f7', label: 'Furious 7 (2015)' },
  { key: 'f8', label: 'F8 (2017)' },
  { key: 'f9', label: 'F9 (2021)' },
  { key: 'f10', label: 'Fast X (2023)' },
];

export const DRIVER_FILTERS = [
  { key: 'all', label: 'Todos' },
  { key: 'dom', label: 'Dom' },
  { key: 'brian', label: 'Brian' },
  { key: 'outros', label: 'Outros' },
];

// SVG car builders
export function carSVG(car: Car, uid: string) {
  const { body, cabin, glass, underglow } = car;
  return `<svg class="w-[80%]" style="filter:drop-shadow(0 4px 14px rgba(232,80,10,0.3))" viewBox="0 0 200 82" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="cg_${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${body}" stop-opacity="0.92"/><stop offset="100%" stop-color="${body}" stop-opacity="0.55"/></linearGradient></defs>
    <ellipse cx="100" cy="76" rx="78" ry="5" fill="rgba(0,0,0,0.45)"/>
    <path d="M18 60 L182 60 L194 51 L170 43 L150 40 L50 40 L30 43 L6 51 Z" fill="url(#cg_${uid})"/>
    <path d="M64 40 L80 20 L120 20 L136 40 Z" fill="${cabin}"/>
    <path d="M67 22 L79 30 L121 30 L133 22 Z" fill="${glass}" opacity="0.55"/>
    <path d="M121 30 L135 22 L135 40 L121 40 Z" fill="${glass}" opacity="0.25"/>
    <circle cx="56" cy="62" r="15" fill="#0c0c0c" stroke="#2a2a2a" stroke-width="1.5"/>
    <circle cx="56" cy="62" r="9" fill="#1a1a1a" stroke="#404040" stroke-width="1"/>
    <circle cx="56" cy="62" r="3" fill="#555"/>
    <circle cx="144" cy="62" r="15" fill="#0c0c0c" stroke="#2a2a2a" stroke-width="1.5"/>
    <circle cx="144" cy="62" r="9" fill="#1a1a1a" stroke="#404040" stroke-width="1"/>
    <circle cx="144" cy="62" r="3" fill="#555"/>
    <rect x="178" y="37" width="16" height="3" rx="1" fill="${body}" opacity="0.8"/>
    <ellipse cx="12" cy="52" rx="6" ry="3" fill="rgba(255,230,120,0.85)"/>
    <line x1="50" y1="75" x2="150" y2="75" stroke="${underglow}" stroke-width="1.8" opacity="0.5"/>
  </svg>`;
}

export function muscleCarSVG(car: Car, uid: string) {
  const { body, cabin, glass, underglow } = car;
  return `<svg class="w-[80%]" style="filter:drop-shadow(0 4px 14px rgba(232,80,10,0.3))" viewBox="0 0 200 82" fill="none">
    <defs><linearGradient id="mg_${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${body}" stop-opacity="0.95"/><stop offset="100%" stop-color="${body}" stop-opacity="0.6"/></linearGradient></defs>
    <ellipse cx="100" cy="76" rx="82" ry="5" fill="rgba(0,0,0,0.45)"/>
    <path d="M12 60 L188 60 L196 50 L175 40 L155 37 L45 37 L25 40 L4 50 Z" fill="url(#mg_${uid})"/>
    <path d="M60 37 L72 17 L128 17 L140 37 Z" fill="${cabin}"/>
    <path d="M63 19 L71 28 L129 28 L137 19 Z" fill="${glass}" opacity="0.5"/>
    <rect x="88" y="32" width="24" height="6" rx="1" fill="${body}" opacity="0.7"/>
    <rect x="94" y="28" width="12" height="5" rx="1" fill="#1a1a1a"/>
    <circle cx="52" cy="62" r="17" fill="#0a0a0a" stroke="#2a2a2a" stroke-width="2"/>
    <circle cx="52" cy="62" r="11" fill="#1a1a1a" stroke="#444" stroke-width="1.5"/>
    <circle cx="52" cy="62" r="4" fill="#555"/>
    <circle cx="148" cy="62" r="17" fill="#0a0a0a" stroke="#2a2a2a" stroke-width="2"/>
    <circle cx="148" cy="62" r="11" fill="#1a1a1a" stroke="#444" stroke-width="1.5"/>
    <circle cx="148" cy="62" r="4" fill="#555"/>
    <circle cx="10" cy="57" r="3" fill="#333"/>
    <rect x="186" y="45" width="8" height="8" rx="1" fill="rgba(255,30,30,0.7)"/>
    <line x1="44" y1="75" x2="156" y2="75" stroke="${underglow}" stroke-width="2" opacity="0.55"/>
  </svg>`;
}

export function supercarSVG(car: Car, uid: string) {
  const { body, cabin, glass, underglow } = car;
  return `<svg class="w-[80%]" style="filter:drop-shadow(0 4px 14px rgba(232,80,10,0.3))" viewBox="0 0 200 82" fill="none">
    <defs><linearGradient id="sc_${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${body}" stop-opacity="0.95"/><stop offset="100%" stop-color="${body}" stop-opacity="0.5"/></linearGradient></defs>
    <ellipse cx="100" cy="77" rx="80" ry="4" fill="rgba(0,0,0,0.5)"/>
    <path d="M22 60 L178 60 L196 48 L180 36 L155 33 L45 33 L20 36 L4 48 Z" fill="url(#sc_${uid})"/>
    <path d="M68 33 L82 16 L118 16 L132 33 Z" fill="${cabin}"/>
    <path d="M71 18 L80 27 L120 27 L129 18 Z" fill="${glass}" opacity="0.6"/>
    <rect x="165" y="38" width="14" height="4" rx="0" fill="#111"/>
    <rect x="21" y="38" width="14" height="4" rx="0" fill="#111"/>
    <ellipse cx="48" cy="58" rx="20" ry="4" fill="${body}" opacity="0.3"/>
    <ellipse cx="152" cy="58" rx="20" ry="4" fill="${body}" opacity="0.3"/>
    <circle cx="48" cy="62" r="16" fill="#0a0a0a" stroke="#333" stroke-width="2"/>
    <circle cx="48" cy="62" r="11" fill="#1a1a1a" stroke="#555" stroke-width="1.5"/>
    <circle cx="48" cy="62" r="5" fill="#666"/>
    <circle cx="152" cy="62" r="16" fill="#0a0a0a" stroke="#333" stroke-width="2"/>
    <circle cx="152" cy="62" r="11" fill="#1a1a1a" stroke="#555" stroke-width="1.5"/>
    <circle cx="152" cy="62" r="5" fill="#666"/>
    <line x1="42" y1="75" x2="158" y2="75" stroke="${underglow}" stroke-width="2" opacity="0.6"/>
  </svg>`;
}

export function buildCarSVG(car: Car, uid: string): string {
  if (car.shape === 'muscle') return muscleCarSVG(car, uid);
  if (car.shape === 'supercar') return supercarSVG(car, uid);
  return carSVG(car, uid);
}

export function driverClass(driver: string): string {
  if (driver === 'dom') return 'driver-dom';
  if (driver === 'brian') return 'driver-brian';
  return 'driver-outros';
}

export function driverBadgeStyle(driver: string) {
  if (driver === 'dom') return { background: 'rgba(232,80,10,0.12)', color: '#e8500a', border: '1px solid rgba(232,80,10,0.25)' };
  if (driver === 'brian') return { background: 'rgba(0,212,255,0.1)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.2)' };
  return { background: 'rgba(139,92,246,0.1)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.2)' };
}
