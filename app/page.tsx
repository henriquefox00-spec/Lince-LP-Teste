"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Menu,
  X,
  TrendingUp,
  ArrowRight,
  Play,
  ChevronDown,
  XCircle,
  CheckCircle,
  Target,
  Filter,
  BarChart3,
  Zap,
  Star,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

// --- Hooks ---
function useCountUp(targetValue: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(easeProgress * targetValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(targetValue);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, targetValue, duration]);

  return { count, ref };
}

// --- Components ---

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-[20px] bg-[#080C0F]/85 border-b border-neon-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <span className="font-syne font-extrabold text-2xl text-white tracking-tight">LINCE</span>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-neon-primary/10 text-neon-primary border border-neon-primary/20">
              PERFORMANCE
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo("sobre")} className="text-text-secondary hover:text-white transition-colors text-sm font-medium">Sobre</button>
            <button onClick={() => scrollTo("metodo")} className="text-text-secondary hover:text-white transition-colors text-sm font-medium">Método</button>
            <button onClick={() => scrollTo("resultados")} className="text-text-secondary hover:text-white transition-colors text-sm font-medium">Resultados</button>
            <button onClick={() => scrollTo("contato")} className="text-text-secondary hover:text-white transition-colors text-sm font-medium">Contato</button>
            <button onClick={() => scrollTo("contato")} className="bg-gradient-to-br from-neon-primary to-[#FF758F] text-[#080C0F] px-6 py-2.5 rounded-full font-bold text-sm hover:shadow-[0_0_20px_rgba(255,77,109,0.4)] transition-all">
              Falar com especialista
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-bg-surface flex flex-col p-6 gap-6 md:hidden border-t border-neon-primary/10">
          <button onClick={() => scrollTo("sobre")} className="text-left text-lg text-text-primary font-medium">Sobre</button>
          <button onClick={() => scrollTo("metodo")} className="text-left text-lg text-text-primary font-medium">Método</button>
          <button onClick={() => scrollTo("resultados")} className="text-left text-lg text-text-primary font-medium">Resultados</button>
          <button onClick={() => scrollTo("contato")} className="text-left text-lg text-text-primary font-medium">Contato</button>
          <button onClick={() => scrollTo("contato")} className="mt-4 bg-gradient-to-br from-neon-primary to-[#FF758F] text-[#080C0F] px-6 py-3 rounded-full font-bold text-center">
            Falar com especialista
          </button>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [heroState, setHeroState] = useState<{ mounted: boolean; particles: { id: number; left: string; top: string; duration: number; delay: number }[] }>({
    mounted: false,
    particles: [],
  });

  useEffect(() => {
    setHeroState({
      mounted: true,
      particles: Array.from({ length: 5 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 80 + 10}%`,
        duration: Math.random() * 4 + 4,
        delay: Math.random() * 2,
      })),
    });
  }, []);

  const { mounted, particles } = heroState;

  return (
    <section id="sobre" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-32">
      {/* Background Layers */}
      <div className="absolute inset-0 hero-bg z-0" />
      <div className="grid-pattern" />
      <div className="scanline-overlay" />
      
      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-1.5 h-1.5 rounded-full bg-neon-primary/40 shadow-[0_0_10px_rgba(255,77,109,0.8)] z-0 animate-float"
          style={{
            left: p.left,
            top: p.top,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="flex flex-col items-center"
        >
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-primary/25 bg-neon-primary/5 mb-8"
          >
            <TrendingUp size={16} className="text-neon-primary" />
            <span className="text-sm font-semibold text-neon-primary uppercase tracking-wider">Performance Growth Company</span>
          </motion.div>

          <motion.h1 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="font-syne font-extrabold text-[clamp(2.8rem,6vw,5.5rem)] leading-[1.05] tracking-tight mb-6"
          >
            <span className="block text-text-primary">Sistemas de Receita,</span>
            <span className="block text-neon-gradient">Não Campanhas.</span>
          </motion.h1>

          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-text-secondary text-lg md:text-xl max-w-3xl mb-10 leading-relaxed"
          >
            Paramos de vender serviços. Passamos a construir máquinas de crescimento previsível para empresas que precisam escalar com consistência.
          </motion.p>

          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full sm:w-auto"
          >
            <button onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-br from-neon-primary to-[#FF758F] text-[#080C0F] px-8 py-4 rounded-full font-syne font-bold text-lg animate-pulse-neon transition-transform hover:scale-105">
              Quero meu sistema de receita
              <ArrowRight size={20} />
            </button>
            <button onClick={() => document.getElementById('metodo')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border border-neon-primary/40 text-neon-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-neon-primary/5 transition-colors">
              <Play size={20} />
              Ver como funciona
            </button>
          </motion.div>

          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-text-muted text-[0.85rem] font-medium tracking-wide"
          >
            ✦ 27 empresas escalando agora &nbsp; ✦ &nbsp; Média 3.2x ROAS em 90 dias
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-neon-primary/50">
        <ChevronDown size={32} />
      </div>
    </section>
  );
}

function Logos() {
  const logos = ["TECHCORP", "SCALEHUB", "FLOWBIZ", "GROWTHOS", "VENDAMAX", "ATIVA360"];
  
  return (
    <section className="bg-bg-surface py-16 border-y border-neon-primary/10 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center mb-10">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-neon-primary/30" />
          <span className="px-4 text-xs font-bold text-neon-primary tracking-[0.2em] uppercase">CLIENTES</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-neon-primary/30" />
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-20">
          {logos.map((logo, i) => (
            <span key={i} className="font-syne font-bold text-xl md:text-2xl text-white opacity-35 hover:opacity-100 transition-opacity duration-300 tracking-widest">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemaSolucao() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="metodo" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-syne font-bold text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] mb-4">Você já tem tráfego. Falta o sistema.</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A maioria das empresas joga dinheiro em mídia sem arquitetura. Isso tem nome: desperdício.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto overflow-hidden">
          {/* Esquerda */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="border border-[#C9184A]/20 bg-bg-surface rounded-2xl p-8 md:p-10"
          >
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[#C9184A]/10">
              <XCircle className="text-[#C9184A]" size={28} />
              <h3 className="text-xl font-bold text-white">O que você tem hoje</h3>
            </div>
            <ul className="space-y-5">
              {[
                "Campanhas avulsas sem previsibilidade",
                "ROI que varia todo mês",
                "Agência que reporta alcance, não receita",
                "Sem visibilidade de funil completo",
                "Crescimento dependente de sorte ou budget"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-text-secondary">
                  <X className="text-[#C9184A] shrink-0 mt-0.5" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Direita */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="border border-neon-primary/20 bg-bg-surface rounded-2xl p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-neon-primary/5 pointer-events-none" />
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-neon-primary/10 relative z-10">
              <CheckCircle className="text-neon-primary" size={28} />
              <h3 className="text-xl font-bold text-white">Com a Lince Performance</h3>
            </div>
            <ul className="space-y-5 relative z-10">
              {[
                "Sistema de aquisição com resultado previsível",
                "ROI como critério de cada decisão",
                "Parceiro com responsabilidade de resultado",
                "Dashboard de receita em tempo real",
                "Crescimento estruturado e escalável"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-text-primary">
                  <CheckCircle className="text-neon-primary shrink-0 mt-0.5" size={20} />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Metodo() {
  const steps = [
    {
      title: "Diagnóstico de Receita",
      time: "Semana 1–2",
      desc: "Mapeamos todos os gargalos do funil: tracking, atribuição, criativos, copy e arquitetura de oferta."
    },
    {
      title: "Arquitetura do Sistema",
      time: "Semana 2–3",
      desc: "Desenhamos o stack completo de aquisição e conversão: canais, funis, automações e KPIs de resultado."
    },
    {
      title: "Ativação & Testes",
      time: "Semana 3–6",
      desc: "Lançamos com velocidade e validamos hipóteses em tempo real. Dados decidem, não opinião."
    },
    {
      title: "Escala Previsível",
      time: "A partir da semana 6",
      desc: "Escalamos o que funciona com critério financeiro. Meta: cada R$1 investido vira R$3+."
    }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-neon-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="font-syne font-bold text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] mb-4">O Sistema de Receita em 4 Etapas</h2>
          <p className="text-text-secondary text-lg">Não é consultoria. É execução com responsabilidade de resultado.</p>
        </div>

        <div ref={ref} className="relative">
          {/* Linha vertical */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-neon-primary/20 shadow-[0_0_10px_rgba(255,77,109,0.3)] md:-translate-x-1/2" />

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className={`relative flex flex-col md:flex-row items-start ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Círculo */}
                <div className="absolute left-[14px] md:left-1/2 top-0 w-8 h-8 rounded-full bg-bg-primary border-2 border-neon-primary shadow-[0_0_15px_rgba(255,77,109,0.5)] flex items-center justify-center -translate-x-1/2 z-10">
                  <span className="text-neon-primary font-mono font-bold text-sm">{i + 1}</span>
                </div>

                {/* Conteúdo */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-16' : 'md:pr-16 md:text-right'}`}>
                  <div className="bg-bg-surface border border-neon-primary/10 p-6 rounded-2xl hover:border-neon-primary/30 transition-colors">
                    <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? '' : 'md:justify-end'}`}>
                      <span className="px-2.5 py-1 rounded-md bg-neon-primary/10 border border-neon-primary/20 text-neon-primary font-mono text-xs font-semibold">
                        {step.time}
                      </span>
                    </div>
                    <h3 className="font-syne font-semibold text-xl md:text-2xl text-white mb-3">{step.title}</h3>
                    <p className="text-text-secondary leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Servicos() {
  const cards = [
    {
      icon: <Target size={40} className="text-neon-primary" />,
      title: "Paid Media System",
      desc: "Google Ads, Meta Ads e TikTok Ads orquestrados como sistema integrado. Cada canal tem função, meta e critério de escala definidos.",
      tag: "Aquisição"
    },
    {
      icon: <Filter size={40} className="text-neon-primary" />,
      title: "Funil de Conversão",
      desc: "Landing pages, copy e fluxos de nutrição otimizados para CAC mínimo e LTV máximo. Cada etapa do funil é monitorada e melhorada.",
      tag: "Conversão"
    },
    {
      icon: <BarChart3 size={40} className="text-neon-primary" />,
      title: "Analytics & Revenue Ops",
      desc: "Dashboard de receita em tempo real, atribuição correta entre canais e decisões 100% orientadas por dado. Fim do achismo.",
      tag: "Dados"
    },
    {
      icon: <Zap size={40} className="text-neon-primary" />,
      title: "Growth Strategy",
      desc: "Estratégia de crescimento com metas claras de ROI, roadmap de 90 dias e revisão quinzenal de resultados.",
      tag: "Estratégia"
    }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-24 md:py-32 bg-[#0A0E13]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-syne font-bold text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] mb-4">O que entregamos</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">Cada serviço é uma peça do sistema. Juntos, formam a máquina de receita.</p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="card-neon p-8 rounded-2xl relative overflow-hidden flex flex-col h-full"
            >
              <div className="absolute top-6 right-8 font-mono text-4xl font-bold text-neon-primary opacity-10">
                0{i + 1}
              </div>
              <div className="mb-6">{card.icon}</div>
              <h3 className="font-syne font-semibold text-2xl text-white mb-4">{card.title}</h3>
              <p className="text-text-secondary leading-relaxed mb-8 flex-grow">{card.desc}</p>
              <div className="mt-auto">
                <span className="inline-block px-3 py-1 rounded-full bg-neon-primary/10 border border-neon-primary/20 text-neon-primary text-sm font-medium">
                  {card.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricCard({ value, suffix, label, prefix = "" }: { value: number, suffix: string, label: string, prefix?: string }) {
  const { count, ref } = useCountUp(value, 2000);
  
  return (
    <div className="flex flex-col items-center text-center p-6">
      <span ref={ref} className="font-mono font-bold text-[clamp(2.5rem,5vw,4.5rem)] leading-none text-neon-primary drop-shadow-[0_0_15px_rgba(255,77,109,0.5)] mb-4">
        {prefix}{count}{suffix}
      </span>
      <div className="w-12 h-1 bg-neon-primary rounded-full mb-4 shadow-[0_0_10px_rgba(255,77,109,0.5)]" />
      <span className="text-text-secondary font-medium text-lg">{label}</span>
    </div>
  );
}

function Metricas() {
  return (
    <section id="resultados" className="py-24 md:py-32 relative overflow-hidden bg-bg-surface">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-primary/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-syne font-bold text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] mb-4">O que os números dizem</h2>
          <p className="text-text-secondary text-lg">Resultados reais de empresas reais.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
          <MetricCard prefix="R$ " value={12} suffix="M+" label="em receita gerada para clientes" />
          <MetricCard value={3} suffix=".2x" label="ROAS médio em 90 dias" />
          <MetricCard value={27} suffix="+" label="empresas no sistema agora" />
          <MetricCard value={94} suffix="%" label="taxa de retenção de clientes" />
        </div>
      </div>
    </section>
  );
}

function Depoimentos() {
  const testimonials = [
    {
      name: "Rafael Mendes",
      role: "CEO · TechCorp",
      text: "Em 60 dias saímos de R$80k para R$240k em receita mensal. A Lince não gerencia campanha, constrói sistema. É uma diferença brutal."
    },
    {
      name: "Camila Torres",
      role: "Fundadora · FlowBiz",
      text: "Finalmente sei de onde vem cada real de receita. O dashboard deles mudou completamente como tomamos decisões de investimento."
    },
    {
      name: "Bruno Alves",
      role: "CMO · ScaleHub",
      text: "Tentamos 3 agências antes. A Lince é a única que fala de ROI, não de impressões. E entrega o que promete."
    }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-syne font-bold text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] mb-4">Quem já tem o sistema</h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-bg-surface border border-neon-primary/10 p-8 rounded-2xl relative"
            >
              <div className="absolute top-6 right-6 text-6xl font-syne text-neon-primary/20 leading-none">&quot;</div>
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} className="fill-neon-primary text-neon-primary" />
                ))}
              </div>
              <p className="text-text-primary text-lg leading-relaxed mb-8 relative z-10">&quot;{t.text}&quot;</p>
              <div className="h-[1px] w-full bg-gradient-to-r from-neon-primary/20 to-transparent mb-6" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-primary to-[#FF758F] flex items-center justify-center text-[#080C0F] font-bold text-xl">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-sm text-text-secondary">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ParaQuem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-24 md:py-32 bg-bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-syne font-bold text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] mb-4">O sistema foi feito para você se...</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">Somos seletivos. Só trabalhamos com quem está pronto para crescer de verdade.</p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="border border-neon-primary/20 bg-bg-primary p-8 md:p-10 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-8 border-b border-neon-primary/20 pb-4">É para você</h3>
            <ul className="space-y-4">
              {[
                "Você fatura entre R$500k e R$20M/ano",
                "Você já investe em mídia mas sem previsibilidade",
                "Você quer escalar sem aumentar headcount proporcional",
                "Você toma decisões com base em dado, não feeling",
                "Você quer um parceiro com co-responsabilidade de resultado"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-text-primary">
                  <CheckCircle className="text-neon-primary shrink-0 mt-1" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="border border-[#C9184A]/20 bg-bg-primary p-8 md:p-10 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-8 border-b border-[#C9184A]/20 pb-4">Não é para você</h3>
            <ul className="space-y-4">
              {[
                "Você busca o menor preço do mercado",
                "Você quer resultado sem investimento consistente",
                "Você não abre dados do negócio para o parceiro",
                "Você quer um fornecedor, não um parceiro estratégico"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-text-secondary">
                  <XCircle className="text-[#C9184A] shrink-0 mt-1" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const [formData, setFormData] = useState({ nome: "", email: "", whatsapp: "", faturamento: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contato" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 hero-bg z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-primary/10 rounded-full blur-[150px] pointer-events-none z-0" />
      
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-syne font-extrabold text-[clamp(2rem,5vw,4rem)] leading-[1.05] mb-6 text-white tracking-tight">
            Pronto para ter um sistema de receita?
          </h2>
          <p className="text-text-secondary text-lg md:text-xl">
            Agende uma conversa de 30 minutos. Sem pitch. Sem promessa vazia. Só diagnóstico real.
          </p>
        </div>

        <div className="bg-bg-surface/80 backdrop-blur-md border border-neon-primary/20 p-8 md:p-10 rounded-3xl shadow-[0_0_40px_rgba(255,77,109,0.05)]">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <CheckCircle size={64} className="text-neon-primary mb-6 animate-bounce" />
              <h3 className="text-2xl font-bold text-neon-primary mb-2">Recebemos seu contato!</h3>
              <p className="text-text-primary">Retornaremos em breve para agendar nossa conversa.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Nome completo</label>
                <input 
                  required
                  type="text" 
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  className="w-full bg-bg-primary border border-neon-primary/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-primary focus:shadow-[0_0_15px_rgba(255,77,109,0.2)] transition-all"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">E-mail corporativo</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-bg-primary border border-neon-primary/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-primary focus:shadow-[0_0_15px_rgba(255,77,109,0.2)] transition-all"
                  placeholder="voce@suaempresa.com.br"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">WhatsApp com DDD</label>
                <input 
                  required
                  type="tel" 
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  className="w-full bg-bg-primary border border-neon-primary/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-primary focus:shadow-[0_0_15px_rgba(255,77,109,0.2)] transition-all"
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Faturamento mensal</label>
                <select 
                  required
                  value={formData.faturamento}
                  onChange={(e) => setFormData({...formData, faturamento: e.target.value})}
                  className="w-full bg-bg-primary border border-neon-primary/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-primary focus:shadow-[0_0_15px_rgba(255,77,109,0.2)] transition-all appearance-none"
                >
                  <option value="" disabled>Selecione uma opção</option>
                  <option value="ate50k">Até R$50k</option>
                  <option value="50k-200k">R$50k–R$200k</option>
                  <option value="200k-500k">R$200k–R$500k</option>
                  <option value="500k-2m">R$500k–R$2M</option>
                  <option value="acima2m">Acima de R$2M</option>
                </select>
              </div>
              <button 
                type="submit" 
                className="w-full bg-gradient-to-br from-neon-primary to-[#FF758F] text-[#080C0F] px-8 py-4 rounded-xl font-syne font-bold text-lg animate-pulse-neon transition-transform hover:scale-[1.02] mt-4"
              >
                Quero meu sistema agora
              </button>
              <p className="text-center text-sm text-text-muted mt-4">
                🔒 Sem compromisso. Resposta em até 24h úteis.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#080C0F] pt-16 pb-8 relative">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-primary/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
          <div className="text-center md:text-left">
            <div className="font-syne font-bold text-2xl text-white tracking-tight mb-2">LINCE PERFORMANCE</div>
            <div className="text-text-secondary">Sistemas de Receita, Não Campanhas.</div>
          </div>
          
          <div className="flex gap-6 text-sm font-medium">
            <button onClick={() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })} className="text-text-secondary hover:text-neon-primary transition-colors">Sobre</button>
            <button onClick={() => document.getElementById('metodo')?.scrollIntoView({ behavior: 'smooth' })} className="text-text-secondary hover:text-neon-primary transition-colors">Método</button>
            <button onClick={() => document.getElementById('resultados')?.scrollIntoView({ behavior: 'smooth' })} className="text-text-secondary hover:text-neon-primary transition-colors">Resultados</button>
            <a href="#" className="text-text-secondary hover:text-neon-primary transition-colors">Privacidade</a>
          </div>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-bg-surface flex items-center justify-center text-text-secondary hover:text-neon-primary hover:border-neon-primary/50 border border-transparent transition-all">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-bg-surface flex items-center justify-center text-text-secondary hover:text-neon-primary hover:border-neon-primary/50 border border-transparent transition-all">
              <Linkedin size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-bg-surface flex items-center justify-center text-text-secondary hover:text-neon-primary hover:border-neon-primary/50 border border-transparent transition-all">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        <div className="h-[1px] w-full bg-neon-primary/10 mb-8" />
        
        <div className="text-center text-sm text-text-muted">
          © 2025 Lince Performance. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary font-inter text-text-primary selection:bg-neon-primary selection:text-bg-primary">
      <Navbar />
      <Hero />
      <Logos />
      <ProblemaSolucao />
      <Metodo />
      <Servicos />
      <Metricas />
      <Depoimentos />
      <ParaQuem />
      <CTA />
      <Footer />
    </main>
  );
}
