import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";

function useHeroScene(canvasRef: React.RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080a0e, 0.048);

    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 1.8, 6.5);
    camera.lookAt(0, 0.3, 0);

    // Lights
    scene.add(new THREE.AmbientLight(0x1a2a3a, 0.9));
    const sun = new THREE.DirectionalLight(0xffffff, 1.1); sun.position.set(5, 8, 3); sun.castShadow = true; scene.add(sun);
    const aL = new THREE.PointLight(0xe8500a, 3.5, 9); aL.position.set(-3, 1.2, 2); scene.add(aL);
    const nL = new THREE.PointLight(0x00d4ff, 2.2, 7); nL.position.set(3.5, 0.6, 1); scene.add(nL);
    const vL = new THREE.PointLight(0x8b5cf6, 1.5, 6); vL.position.set(0, 3, -3); scene.add(vL);

    // Materials
    const bodyM = new THREE.MeshStandardMaterial({ color: 0xe8500a, metalness: 0.72, roughness: 0.18 });
    const darkM = new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.88, roughness: 0.14 });
    const glassM = new THREE.MeshStandardMaterial({ color: 0x00d4ff, metalness: 0.1, roughness: 0.04, transparent: true, opacity: 0.32 });
    const chromeM = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 1.0, roughness: 0.04 });
    const tireM = new THREE.MeshStandardMaterial({ color: 0x0c0c0c, metalness: 0, roughness: 0.92 });
    const rimM = new THREE.MeshStandardMaterial({ color: 0x909090, metalness: 0.96, roughness: 0.08 });

    // Build car
    const car = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(3.9, 0.38, 1.72), bodyM); body.position.y = 0.38; body.castShadow = true; car.add(body);
    [0.9, -0.9].forEach(z => { const sk = new THREE.Mesh(new THREE.BoxGeometry(3.65, 0.17, 0.07), darkM); sk.position.set(0, 0.2, z); car.add(sk); });
    const fB = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.28, 1.62), darkM); fB.position.set(2.0, 0.27, 0); car.add(fB);
    const rB = fB.clone(); rB.position.x = -2.0; car.add(rB);
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.54, 1.52), bodyM); cabin.position.set(-0.12, 0.82, 0); cabin.castShadow = true; car.add(cabin);
    const ws = new THREE.Mesh(new THREE.PlaneGeometry(0.82, 0.58), glassM); ws.rotation.set(0, Math.PI / 2, -0.28); ws.position.set(0.76, 0.9, 0); car.add(ws);
    const rw = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 0.5), glassM); rw.rotation.set(0, Math.PI / 2, 0.3); rw.position.set(-1.01, 0.87, 0); car.add(rw);
    const sc = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.09, 0.36), darkM); sc.position.set(1.1, 0.59, 0); car.add(sc);
    const spBase = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.06, 0.13), chromeM); spBase.position.set(-1.7, 0.87, 0); car.add(spBase);

    const hlM = new THREE.MeshStandardMaterial({ color: 0xffffcc, emissive: 0xffff88, emissiveIntensity: 1.8 });
    [0.45, -0.45].forEach(z => { const h = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.13, 0.33), hlM); h.position.set(2.0, 0.42, z); car.add(h); });
    const tlM = new THREE.MeshStandardMaterial({ color: 0xff2200, emissive: 0xff0000, emissiveIntensity: 1.0 });
    [0.45, -0.45].forEach(z => { const t = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.13, 0.33), tlM); t.position.set(-2.0, 0.42, z); car.add(t); });

    const ug = new THREE.PointLight(0x00d4ff, 1.0, 3); ug.position.set(0, -0.05, 0); car.add(ug);

    // Wheels
    function makeWheel(x: number, z: number) {
      const g = new THREE.Group();
      const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.28, 24), tireM); tire.rotation.z = Math.PI / 2; g.add(tire);
      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.27, 0.22, 16), rimM); rim.rotation.z = Math.PI / 2; g.add(rim);
      g.position.set(x, 0.38, z); g.castShadow = true; return g;
    }
    const wheels = [makeWheel(1.35, 0.96), makeWheel(1.35, -0.96), makeWheel(-1.35, 0.96), makeWheel(-1.35, -0.96)];
    wheels.forEach(w => car.add(w));

    // Grid
    const grid = new THREE.GridHelper(30, 30, 0x1e2a38, 0x1e2a38);
    grid.position.y = -0.02; (grid.material as THREE.Material).opacity = 0.3; (grid.material as THREE.Material).transparent = true; scene.add(grid);

    // Particles
    const pc = 320, pos = new Float32Array(pc * 3);
    for (let i = 0; i < pc; i++) { pos[i * 3] = (Math.random() - 0.5) * 22; pos[i * 3 + 1] = Math.random() * 9; pos[i * 3 + 2] = (Math.random() - 0.5) * 14; }
    const ptGeo = new THREE.BufferGeometry(); ptGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const pts = new THREE.Points(ptGeo, new THREE.PointsMaterial({ color: 0x00d4ff, size: 0.032, transparent: true, opacity: 0.45 }));
    scene.add(pts);

    car.position.set(1.3, 0, 0); car.rotation.y = -0.32; car.scale.set(1, 1, 1); scene.add(car);

    let tRY = -0.32, tRX = 0;
    const onMouseMove = (e: MouseEvent) => {
      const mx = (e.clientX / window.innerWidth - 0.5) * 2;
      const my = (e.clientY / window.innerHeight - 0.5) * 2;
      tRY = -0.32 + mx * 0.38; tRX = my * 0.1;
    };
    window.addEventListener('mousemove', onMouseMove);

    let t = 0;
    let animId: number;
    function animate() {
      animId = requestAnimationFrame(animate); t += 0.007;
      car.rotation.y += (tRY - car.rotation.y) * 0.05;
      car.rotation.x += (tRX - car.rotation.x) * 0.05;
      car.position.y = Math.sin(t * 0.85) * 0.045;
      wheels.forEach(w => { w.rotation.x += 0.016; });
      ug.intensity = 0.65 + Math.sin(t * 2.4) * 0.28;
      aL.intensity = 2.8 + Math.sin(t * 1.3) * 0.55;
      pts.rotation.y += 0.0004;
      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);
}

export function NewHeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useHeroScene(canvasRef);

  return (
    <section className="relative min-h-screen flex items-center px-[5vw] pt-[120px] pb-[80px] overflow-hidden" id="home">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Overlay */}
      <div className="absolute inset-0 z-[1]" style={{
        background: 'radial-gradient(ellipse 55% 90% at 72% 50%, transparent 25%, rgba(8,10,14,0.75) 65%), radial-gradient(ellipse 70% 50% at 15% 85%, rgba(232,80,10,0.06) 0%, transparent 55%)'
      }} />

      {/* Grid */}
      <div className="absolute inset-0 z-[1]" style={{
        backgroundImage: 'linear-gradient(rgba(30,42,56,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(30,42,56,0.28) 1px, transparent 1px)',
        backgroundSize: '55px 55px',
        maskImage: 'radial-gradient(ellipse 95% 95% at 50% 50%, black 15%, transparent 80%)'
      }} />

      {/* Content */}
      <div className="relative z-[2] max-w-[680px]">
        <div className="inline-flex items-center gap-2 bg-[rgba(0,212,255,0.07)] border border-[rgba(0,212,255,0.22)] px-4 py-1.5 mb-7 font-mono-tech text-[0.68rem] tracking-[3px] text-[hsl(var(--neon))] uppercase">
          <span className="w-1.5 h-1.5 bg-[hsl(var(--neon))] rounded-full shadow-[0_0_8px_hsl(var(--neon))] animate-pulse" />
          Impressão 3D Personalizada
        </div>

        <h1 className="font-bebas text-[clamp(3.2rem,7.5vw,6.8rem)] leading-[0.88] tracking-[1px] text-white">
          <span>SUA</span>
          <span className="block text-[hsl(var(--accent-orange))]">MINIATURA</span>
          <span className="block text-transparent" style={{ WebkitTextStroke: '1px rgba(0,212,255,0.45)', opacity: 0.65 }}>EM 3D</span>
        </h1>

        <p className="mt-6 text-[1.05rem] text-[hsl(var(--muted-foreground))] leading-[1.75] max-w-[510px]">
          Da sua foto a uma miniatura perfeita de você mesmo — ou dos carros mais icônicos do cinema. Filamento e resina de alta precisão para colecionadores exigentes.
        </p>

        <div className="flex gap-4 mt-8 flex-wrap">
          <button onClick={() => document.getElementById("modalidades")?.scrollIntoView({ behavior: "smooth" })} className="btn-primary-site">Ver Modalidades</button>
          <Link to="/calculadora" className="btn-neon-site">Calcular Custo</Link>
          <button onClick={() => document.getElementById("carros")?.scrollIntoView({ behavior: "smooth" })} className="btn-outline-site">Catálogo Velozes e Furiosos</button>
        </div>

        <div className="flex gap-11 mt-14 pt-8 border-t border-[hsl(var(--border-custom))]">
          {[
            { val: '50+', label: 'Modelos V&F' },
            { val: '0.1mm', label: 'Precisão Resina' },
            { val: '2 tipos', label: 'Modalidades' },
            { val: 'BR todo', label: 'Entrega' },
          ].map(s => (
            <div key={s.label}>
              <div className="font-bebas text-[2.1rem] text-white tracking-[2px]">{s.val}</div>
              <div className="font-mono-tech text-[0.62rem] tracking-[2px] text-[hsl(var(--muted-foreground))] uppercase mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-[5vw] bottom-10 z-[2] font-mono-tech text-[0.58rem] tracking-[2px] text-[rgba(122,136,152,0.45)] uppercase flex items-center gap-2">
        <span className="w-5 h-px bg-[hsl(var(--muted-foreground))] opacity-35" />
        Arraste para interagir
      </div>
    </section>
  );
}
