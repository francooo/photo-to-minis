
import { ThreeDPrinter } from "./ThreeDPrinter";

export function ThreeDPrinterSection() {
    return (
        <section className="py-20 bg-background relative overflow-hidden border-y border-border/50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">

                    <div className="w-full md:w-1/2 space-y-6 z-10">
                        <h2 className="text-3xl md:text-5xl font-bold font-tech text-glow">
                            Veja a <span className="text-primary bg-clip-text">Mágica</span> Acontecer
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Nossa tecnologia de ponta transforma seus momentos em realidade.
                            Utilizamos impressoras 3D de alta resolução para capturar cada detalhe
                            da sua foto e materializá-la em uma escultura única.
                        </p>
                        <ul className="space-y-4 text-muted-foreground">
                            <li className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-primary" />
                                Resolução de camada ultra-fina (0.05mm)
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-secondary" />
                                Acabamento profissional em filamento PLA
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-accent" />
                                Durabilidade e precisão garantidas
                            </li>
                        </ul>
                    </div>

                    <div className="w-full md:w-1/2 h-[400px] md:h-[500px] bg-gradient-to-b from-card/50 to-background rounded-2xl border border-border/50 shadow-2xl overflow-hidden relative group">
                        {/* 3D Printer Scene */}
                        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]" />
                        <ThreeDPrinter />

                        {/* Overlay Badge */}
                        <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm border border-primary/20 px-3 py-1 rounded-full text-xs font-mono text-primary animate-pulse">
                            STATUS: PRINTING...
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
