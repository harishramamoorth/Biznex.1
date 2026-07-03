import HowWeWork from '../components/process/HowWeWork';
import ScaleTrain from '../components/home/ScaleTrain';
import ProblemSolutions from '../components/home/ProblemSolutions';
import FinalCTA from '../components/cta/FinalCTA';

export default function Process() {
  return (
    <main>
      {/* Journey Page Header */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-slate-900 overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-slate-900 to-slate-900" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <span className="inline-block text-sm font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-6">
            The Process
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8">
            The BizNex <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 animate-shimmer bg-[length:200%_auto]">
              Growth Journey
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We don't just give you a report and walk away. We identify the bottlenecks, apply our proven framework, and work alongside you until your business scales.
          </p>
        </div>
      </section>

      <div id="how-we-work">
        <HowWeWork />
      </div>
      <div id="framework">
        <ScaleTrain />
      </div>
      <div id="bottleneck">
        <ProblemSolutions />
      </div>
      <FinalCTA />
    </main>
  );
}
