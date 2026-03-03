import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
import logo from "@/assets/logo.png";

// ── Car Data ─────────────────────────────────────────────────────────────────
const CARS = [
    {
        id: "supra",
        name: "Toyota Supra MK4",
        subtitle: "The Legendary Orange Beast",
        film: "Velozes e Furiosos (2001)",
        color: "#FF6B00",
        colorName: "Laranja Infernal",
        image: "/cars/supra.png",
        description:
            "O Supra que colocou Brian O'Conner no mapa. Motor 2JZ, visual agressivo e aquela cor que ninguém esquece.",
        stats: { engine: "2JZ-GTE Twin Turbo", power: "550 HP", sprint: "4.1s" },
        glow: "rgba(255,107,0,0.6)",
        glowDim: "rgba(255,107,0,0.15)",
        accent: "#FF6B00",
    },
    {
        id: "eclipse",
        name: "Mitsubishi Eclipse",
        subtitle: "The Street Racer",
        film: "Velozes e Furiosos (2001)",
        color: "#39FF14",
        colorName: "Verde Neon",
        image: "/cars/eclipse.png",
        description:
            "O carro da primeira corrida. O Eclipse verde que apresentou Brian ao mundo dos rachas.",
        stats: { engine: "4G63T Turbo", power: "280 HP", sprint: "5.3s" },
        glow: "rgba(57,255,20,0.6)",
        glowDim: "rgba(57,255,20,0.15)",
        accent: "#39FF14",
    },
    {
        id: "skyline",
        name: "Nissan Skyline GT-R R34",
        subtitle: "The Midnight Dream",
        film: "2 Fast 2 Furious (2003)",
        color: "#00C8FF",
        colorName: "Azul Absoluto",
        image: "/cars/skyline.png",
        description:
            "Em 2 Fast 2 Furious, Brian chegou com tudo no R34. Skyline puro, listras azuis e velocidade absurda.",
        stats: { engine: "RB26DETT Twin Turbo", power: "500 HP", sprint: "3.9s" },
        glow: "rgba(0,200,255,0.6)",
        glowDim: "rgba(0,200,255,0.15)",
        accent: "#00C8FF",
    },
];

// ── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
    const [display, setDisplay] = useState("0.0");
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const numericTarget = parseFloat(target);
        if (isNaN(numericTarget)) { setDisplay(target); return; }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    const duration = 1800;
                    const steps = 60;
                    const increment = numericTarget / steps;
                    let current = 0;
                    const interval = setInterval(() => {
                        current = Math.min(current + increment, numericTarget);
                        setDisplay(current.toFixed(1));
                        if (current >= numericTarget) clearInterval(interval);
                    }, duration / steps);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target]);

    return <span ref={ref}>{display}{suffix}</span>;
}

// ── Car Card ──────────────────────────────────────────────────────────────────
function CarCard({ car, index }: { car: typeof CARS[0]; index: number }) {
    const navigate = useNavigate();
    const cardRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.2 }
        );
        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    const handleOrder = () => {
        navigate(`/?modelo=${car.id}#upload`);
    };

    return (
        <div
            ref={cardRef}
            className="car-card"
            style={{
                "--car-color": car.color,
                "--car-glow": car.glow,
                "--car-glow-dim": car.glowDim,
                animationDelay: `${index * 0.25}s`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(60px)",
                transition: `opacity 0.7s ease ${index * 0.25}s, transform 0.7s ease ${index * 0.25}s`,
            } as React.CSSProperties}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Glow border */}
            <div className="card-border-glow" />

            {/* Film badge */}
            <div className="film-badge" style={{ background: car.color, color: car.color === "#39FF14" ? "#000" : "#fff" }}>
                {car.film}
            </div>

            {/* Car Image */}
            <div className="car-image-wrapper">
                <div
                    className="car-image-glow"
                    style={{
                        background: `radial-gradient(ellipse at center, ${car.glow} 0%, transparent 70%)`,
                        opacity: hovered ? 1 : 0.4,
                        transform: hovered ? "scale(1.15)" : "scale(1)",
                        transition: "all 0.5s ease",
                    }}
                />
                <img
                    src={car.image}
                    alt={car.name}
                    className="car-image"
                    style={{
                        transform: hovered ? "translateX(12px) scale(1.04)" : "translateX(0) scale(1)",
                        filter: hovered
                            ? `drop-shadow(0 0 24px ${car.color}) drop-shadow(0 0 48px ${car.color}88)`
                            : `drop-shadow(0 4px 16px ${car.color}44)`,
                        transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                />
                {/* Wheel smoke particles */}
                {hovered && (
                    <>
                        <div className="smoke smoke-1" style={{ background: `radial-gradient(circle, ${car.color}33, transparent)` }} />
                        <div className="smoke smoke-2" style={{ background: `radial-gradient(circle, ${car.color}22, transparent)` }} />
                    </>
                )}
            </div>

            {/* Card Content */}
            <div className="card-content">
                {/* Color chip */}
                <div className="color-chip">
                    <span className="color-dot" style={{ background: car.color, boxShadow: `0 0 8px ${car.color}` }} />
                    <span style={{ color: car.color, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em" }}>
                        {car.colorName}
                    </span>
                </div>

                <h3 className="car-name">{car.name}</h3>
                <p className="car-subtitle" style={{ color: car.color }}>{car.subtitle}</p>
                <p className="car-description">{car.description}</p>

                {/* Stats */}
                <div className="stats-grid">
                    <div className="stat">
                        <div className="stat-label">Motor</div>
                        <div className="stat-value" style={{ color: car.color }}>{car.stats.engine}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-label">Potência</div>
                        <div className="stat-value" style={{ color: car.color }}>{car.stats.power}</div>
                    </div>
                    <div className="stat stat-full">
                        <div className="stat-label">0–100 km/h</div>
                        <div className="stat-value odometer" style={{ color: car.color }}>
                            <AnimatedCounter target={car.stats.sprint} suffix="s" />
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <button className="nitro-btn" style={{ "--btn-color": car.color } as React.CSSProperties} onClick={handleOrder}>
                    <span className="nitro-btn-inner">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="btn-icon">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                        Encomendar Miniatura
                    </span>
                    <div className="nitro-flame" />
                </button>
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function FastAndFurious() {
    const titleRef = useRef<HTMLDivElement>(null);
    const [titleVisible, setTitleVisible] = useState(false);

    useEffect(() => {
        // Trigger title animation on mount
        const t = setTimeout(() => setTitleVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="fnf-page">
            {/* ── Speed Lines BG (canvas-free CSS) ──────────────────────────── */}
            <div className="speed-lines-bg" aria-hidden="true">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="speed-line"
                        style={{
                            top: `${(i / 20) * 100}%`,
                            animationDelay: `${(i * 0.15) % 2}s`,
                            opacity: 0.03 + (i % 3) * 0.02,
                        }}
                    />
                ))}
            </div>

            {/* ── Radial Glow Orbs ───────────────────────────────────────────── */}
            <div className="orb orb-orange" aria-hidden="true" />
            <div className="orb orb-blue" aria-hidden="true" />
            <div className="orb orb-green" aria-hidden="true" />

            {/* ── Header ────────────────────────────────────────────────────── */}
            <header className="fnf-header">
                <div className="fnf-header-inner">
                    <Link to="/" className="fnf-logo">
                        <img src={logo} alt="3D Max" className="fnf-logo-img" />
                        <span className="fnf-logo-text">3D Max</span>
                    </Link>
                    <Link to="/" className="fnf-back-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 5l-7 7 7 7" />
                        </svg>
                        Voltar ao site
                    </Link>
                </div>
            </header>

            {/* ── Hero Banner ───────────────────────────────────────────────── */}
            <section className="fnf-hero">
                <div className="hero-content">
                    <div
                        ref={titleRef}
                        className={`hero-eyebrow ${titleVisible ? "slide-in" : ""}`}
                    >
                        <span className="eyebrow-line" />
                        Coleção Exclusiva
                        <span className="eyebrow-line" />
                    </div>

                    <h1 className={`hero-title ${titleVisible ? "title-visible" : ""}`}>
                        <span className="title-word title-word-1">VELOZES</span>
                        <span className="title-amp">&</span>
                        <span className="title-word title-word-2">FURIOSOS</span>
                    </h1>

                    <p className={`hero-subtitle ${titleVisible ? "subtitle-visible" : ""}`}>
                        Colecione os ícones do cinema em miniatura 3D
                    </p>

                    <div className={`hero-badges ${titleVisible ? "badges-visible" : ""}`}>
                        <div className="badge badge-orange">🔶 Toyota Supra MK4</div>
                        <div className="badge badge-green">🟢 Mitsubishi Eclipse</div>
                        <div className="badge badge-blue">🔷 Nissan Skyline R34</div>
                    </div>

                    {/* Scroll hint */}
                    <div className="scroll-hint">
                        <div className="scroll-mouse">
                            <div className="scroll-wheel" />
                        </div>
                        <span>Role para ver os carros</span>
                    </div>
                </div>

                {/* Checkered flag deco */}
                <div className="checkered-deco" aria-hidden="true" />
            </section>

            {/* ── Cars Section ──────────────────────────────────────────────── */}
            <section className="cars-section">
                <div className="section-label">
                    <span className="section-label-line" />
                    <span>MODELOS DISPONÍVEIS</span>
                    <span className="section-label-line" />
                </div>

                <div className="cars-grid">
                    {CARS.map((car, i) => (
                        <CarCard key={car.id} car={car} index={i} />
                    ))}
                </div>
            </section>

            {/* ── CTA Section ───────────────────────────────────────────────── */}
            <section className="fnf-cta">
                <div className="cta-glow-left" />
                <div className="cta-glow-right" />

                <div className="cta-content">
                    <div className="cta-icon">🏎️</div>
                    <h2 className="cta-title">Quer um carro personalizado?</h2>
                    <p className="cta-text">
                        Envie a foto do seu carro favorito e a gente transforma em uma miniatura 3D única!
                    </p>
                    <Link to="/?#upload" className="cta-main-btn">
                        <span>Enviar Minha Foto</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </section>

            {/* ── Footer ───────────────────────────────────────────────────── */}
            <Footer />

            {/* ── Styles ───────────────────────────────────────────────────── */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;600;700&display=swap');

        /* ── Page Base ─────────────────────────────────── */
        .fnf-page {
          min-height: 100vh;
          background: #080808;
          font-family: 'Rajdhani', sans-serif;
          overflow-x: hidden;
          position: relative;
        }

        /* ── Speed Lines ───────────────────────────────── */
        .speed-lines-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        .speed-line {
          position: absolute;
          left: -100%;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #fff 40%, #fff 60%, transparent 100%);
          animation: speedLine 3s linear infinite;
        }
        @keyframes speedLine {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        /* ── Glow Orbs ─────────────────────────────────── */
        .orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
          animation: orbPulse 6s ease-in-out infinite alternate;
        }
        .orb-orange {
          width: 500px; height: 500px;
          background: rgba(255,107,0,0.12);
          top: -150px; left: -150px;
          animation-delay: 0s;
        }
        .orb-blue {
          width: 600px; height: 600px;
          background: rgba(0,200,255,0.08);
          bottom: -200px; right: -200px;
          animation-delay: 2s;
        }
        .orb-green {
          width: 400px; height: 400px;
          background: rgba(57,255,20,0.07);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 4s;
        }
        @keyframes orbPulse {
          0%   { opacity: 0.6; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.2); }
        }

        /* ── Header ─────────────────────────────────────── */
        .fnf-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          background: rgba(8,8,8,0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,107,0,0.2);
        }
        .fnf-header-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 16px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .fnf-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .fnf-logo-img { width: 36px; height: 36px; }
        .fnf-logo-text {
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          font-size: 1.3rem;
          color: #fff;
          letter-spacing: 0.05em;
        }
        .fnf-back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 8px 20px;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 999px;
          transition: all 0.3s ease;
        }
        .fnf-back-btn:hover {
          color: #FF6B00;
          border-color: #FF6B00;
          background: rgba(255,107,0,0.08);
          transform: translateX(-4px);
        }

        /* ── Hero ───────────────────────────────────────── */
        .fnf-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 120px 32px 80px;
          overflow: hidden;
          z-index: 1;
        }
        .hero-content {
          text-align: center;
          position: relative;
          z-index: 2;
          max-width: 900px;
        }

        /* Eyebrow */
        .hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 16px;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.35em;
          color: #FF6B00;
          text-transform: uppercase;
          margin-bottom: 24px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }
        .hero-eyebrow.slide-in {
          opacity: 1;
          transform: translateY(0);
        }
        .eyebrow-line {
          display: block;
          width: 50px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #FF6B00);
        }
        .eyebrow-line:last-child {
          background: linear-gradient(90deg, #FF6B00, transparent);
        }

        /* Main Title */
        .hero-title {
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          font-size: clamp(3.5rem, 10vw, 9rem);
          line-height: 0.9;
          letter-spacing: -0.02em;
          margin: 0 0 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .title-word {
          display: block;
          opacity: 0;
          transform: translateX(-80px) skewX(-5deg);
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
          background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: none;
          filter: blur(8px);
        }
        .title-word-2 {
          transform: translateX(80px) skewX(5deg);
          background: linear-gradient(135deg, #FF6B00 0%, #FFB347 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-title.title-visible .title-word-1 {
          opacity: 1;
          transform: translateX(0) skewX(0);
          filter: blur(0);
          transition-delay: 0.1s;
        }
        .hero-title.title-visible .title-word-2 {
          opacity: 1;
          transform: translateX(0) skewX(0);
          filter: blur(0);
          transition-delay: 0.3s;
        }
        .title-amp {
          font-size: 0.35em;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.3em;
        }

        .hero-subtitle {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(1rem, 2.5vw, 1.4rem);
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 36px;
          opacity: 0;
          transform: translateY(16px);
          transition: all 0.7s ease 0.6s;
        }
        .hero-subtitle.subtitle-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Badges */
        .hero-badges {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 48px;
          opacity: 0;
          transform: translateY(16px);
          transition: all 0.7s ease 0.8s;
        }
        .hero-badges.badges-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .badge {
          padding: 8px 18px;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          border: 1px solid;
        }
        .badge-orange {
          color: #FF6B00;
          border-color: rgba(255,107,0,0.4);
          background: rgba(255,107,0,0.08);
        }
        .badge-green {
          color: #39FF14;
          border-color: rgba(57,255,20,0.4);
          background: rgba(57,255,20,0.08);
        }
        .badge-blue {
          color: #00C8FF;
          border-color: rgba(0,200,255,0.4);
          background: rgba(0,200,255,0.08);
        }

        /* Scroll hint */
        .scroll-hint {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.3);
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .scroll-mouse {
          width: 22px;
          height: 36px;
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 12px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 6px;
        }
        .scroll-wheel {
          width: 3px;
          height: 8px;
          background: rgba(255,107,0,0.8);
          border-radius: 999px;
          animation: scrollWheel 1.5s ease-in-out infinite;
        }
        @keyframes scrollWheel {
          0%   { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }

        /* Checkered deco */
        .checkered-deco {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 6px;
          background: repeating-linear-gradient(
            90deg,
            #fff 0px, #fff 15px,
            transparent 15px, transparent 30px
          );
          opacity: 0.06;
        }

        /* ── Cars Section ────────────────────────────────── */
        .cars-section {
          position: relative;
          z-index: 1;
          padding: 60px 32px 80px;
          max-width: 1400px;
          margin: 0 auto;
        }
        .section-label {
          display: flex;
          align-items: center;
          gap: 20px;
          justify-content: center;
          font-family: 'Orbitron', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.4em;
          color: rgba(255,255,255,0.3);
          margin-bottom: 48px;
        }
        .section-label-line {
          flex: 1;
          max-width: 120px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
        }
        .cars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 28px;
        }

        /* ── Car Card ────────────────────────────────────── */
        .car-card {
          position: relative;
          background: linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .car-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 60px -12px var(--car-glow), 0 0 0 1px rgba(255,255,255,0.1);
        }
        .card-border-glow {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, var(--car-color) 0%, transparent 50%);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: subtract;
          -webkit-mask-composite: source-out;
          pointer-events: none;
          opacity: 0.4;
          transition: opacity 0.4s ease;
        }
        .car-card:hover .card-border-glow { opacity: 1; }

        .film-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0.9;
          z-index: 10;
        }

        /* Car Image */
        .car-image-wrapper {
          position: relative;
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6));
        }
        .car-image-glow {
          position: absolute;
          inset: -20%;
          border-radius: 50%;
          transition: all 0.5s ease;
        }
        .car-image {
          position: relative;
          z-index: 1;
          max-height: 180px;
          max-width: 95%;
          object-fit: contain;
        }

        /* Smoke */
        .smoke {
          position: absolute;
          border-radius: 50%;
          z-index: 2;
          animation: smokeAnim 0.8s ease-out forwards;
        }
        .smoke-1 {
          width: 60px; height: 60px;
          bottom: 20px; left: 20%;
          animation-delay: 0s;
        }
        .smoke-2 {
          width: 40px; height: 40px;
          bottom: 25px; left: 28%;
          animation-delay: 0.15s;
        }
        @keyframes smokeAnim {
          0%   { transform: scale(0.5) translateY(0); opacity: 0.8; }
          100% { transform: scale(2.5) translateY(-30px); opacity: 0; }
        }

        /* Content */
        .card-content {
          padding: 24px;
        }
        .color-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }
        .color-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .car-name {
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          font-size: 1.2rem;
          color: #fff;
          letter-spacing: 0.02em;
          margin: 0 0 4px;
          line-height: 1.2;
        }
        .car-subtitle {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .car-description {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        /* Stats */
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
          padding: 16px;
          background: rgba(0,0,0,0.3);
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .stat-full { grid-column: 1 / -1; }
        .stat-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 4px;
        }
        .stat-value {
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.02em;
        }
        .odometer {
          font-size: 1.3rem;
        }

        /* Nitro Button */
        .nitro-btn {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          border-radius: 12px;
        }
        .nitro-btn-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 24px;
          background: linear-gradient(135deg, var(--btn-color) 0%, color-mix(in srgb, var(--btn-color) 70%, #fff) 100%);
          border-radius: 12px;
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          color: #000;
          position: relative;
          z-index: 1;
          transition: all 0.3s ease;
        }
        .nitro-btn:hover .nitro-btn-inner {
          transform: scale(1.02);
          box-shadow: 0 0 30px var(--btn-color), 0 0 60px var(--btn-color, rgba(255,107,0,0.3));
          letter-spacing: 0.12em;
        }
        .btn-icon { transition: transform 0.3s ease; }
        .nitro-btn:hover .btn-icon { transform: translateX(4px); }
        .nitro-flame {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%);
          transform: translateX(-100%);
          transition: transform 0s;
        }
        .nitro-btn:hover .nitro-flame {
          transform: translateX(100%);
          transition: transform 0.5s ease;
        }

        /* ── CTA Section ─────────────────────────────────── */
        .fnf-cta {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 100px 32px;
          overflow: hidden;
        }
        .cta-glow-left {
          position: absolute;
          left: -200px; top: 50%;
          transform: translateY(-50%);
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(255,107,0,0.15), transparent);
          border-radius: 50%;
          filter: blur(60px);
        }
        .cta-glow-right {
          position: absolute;
          right: -200px; top: 50%;
          transform: translateY(-50%);
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(0,200,255,0.15), transparent);
          border-radius: 50%;
          filter: blur(60px);
        }
        .cta-content { position: relative; z-index: 1; max-width: 600px; margin: 0 auto; }
        .cta-icon {
          font-size: 3rem;
          margin-bottom: 20px;
          display: block;
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-12px); }
        }
        .cta-title {
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          color: #fff;
          margin: 0 0 16px;
        }
        .cta-text {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.7;
          margin-bottom: 36px;
        }
        .cta-main-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 18px 44px;
          background: linear-gradient(135deg, #FF6B00, #FF3D00);
          color: #fff;
          border-radius: 999px;
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.08em;
          text-decoration: none;
          box-shadow: 0 0 40px rgba(255,107,0,0.4), 0 8px 32px rgba(0,0,0,0.4);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .cta-main-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: translateX(-100%);
        }
        .cta-main-btn:hover::before {
          transform: translateX(100%);
          transition: transform 0.5s ease;
        }
        .cta-main-btn:hover {
          transform: translateY(-4px) scale(1.04);
          box-shadow: 0 0 60px rgba(255,107,0,0.6), 0 16px 40px rgba(0,0,0,0.4);
        }

        /* ── Responsive ──────────────────────────────────── */
        @media (max-width: 768px) {
          .fnf-header-inner { padding: 14px 20px; }
          .fnf-hero { padding: 100px 20px 60px; }
          .cars-section { padding: 40px 20px 60px; }
          .cars-grid { grid-template-columns: 1fr; gap: 20px; }
          .fnf-cta { padding: 60px 20px; }
          .hero-badges { gap: 8px; }
          .badge { font-size: 0.75rem; padding: 6px 12px; }
          .orb-orange { width: 250px; height: 250px; }
          .orb-blue { width: 300px; height: 300px; }
          .orb-green { width: 200px; height: 200px; }
          .speed-lines-bg { display: none; }
        }
      `}</style>
        </div>
    );
}
