import { useEffect, useState, useRef } from 'react';
import { Download, Terminal as TerminalIcon, Monitor, Play, Cloud, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [terminalLines, setTerminalLines] = useState<{ text: string; type: string }[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  const lines = [
    { text: "curl -sSL install.qatool.io | sh", type: "prompt" },
    { text: "→ Pulling qatool/app:latest...", type: "info" },
    { text: "→ Starting postgres, api, web...", type: "info" },
    { text: "✓ Ready at http://localhost:3000", type: "success" },
    { text: "", type: "break" },
    { text: "npm i @qatool/playwright-reporter", type: "prompt" },
    { text: "→ Reporter installed. Config written.", type: "info" },
    { text: "", type: "break" },
    { text: "npx playwright test", type: "prompt" },
    { text: "✓ 142 tests passed  |  3 ms avg  |  0 failures", type: "success" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);

    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (currentLineIndex < lines.length) {
      const line = lines[currentLineIndex];

      if (line.type === 'break') {
        const timer = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
        }, 500);
        return () => clearTimeout(timer);
      }

      if (currentCharIndex < line.text.length) {
        const timer = setTimeout(() => {
          setCurrentCharIndex(prev => prev + 1);
        }, line.type === 'prompt' ? 40 : 10);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 800);
        return () => clearTimeout(timer);
      }
    }
  }, [currentLineIndex, currentCharIndex]);

  useEffect(() => {
    const newTerminalLines = lines.slice(0, currentLineIndex + 1).map((line, idx) => {
      if (idx === currentLineIndex) {
        return { ...line, text: line.text.slice(0, currentCharIndex) };
      }
      return line;
    });
    setTerminalLines(newTerminalLines);
  }, [currentLineIndex, currentCharIndex]);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#a1a1aa] font-sans selection:bg-[#00d084]/30 selection:text-[#00d084]">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[1000] h-[72px] flex items-center transition-all duration-300 ${scrolled ? 'bg-[#18181b]/70 backdrop-blur-2xl border-b border-white/5' : ''}`}>
        <div className="container mx-auto px-6 flex justify-between items-center w-full">
          <a href="#" className="font-mono font-bold text-lg text-[#fafafa] flex items-center gap-2">
            <div className="w-[10px] h-[10px] bg-[#00d084]"></div>
            QATOOL
          </a>
          <div className="hidden lg:flex gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-[#00d084] transition-colors">Features</a>
            <a href="#pricing" className="hover:text-[#00d084] transition-colors">Pricing</a>
            <a href="#consulting" className="hover:text-[#00d084] transition-colors">Consulting</a>
            <a href="#" className="hover:text-[#00d084] transition-colors">Docs</a>
            <a href="https://github.com" className="hover:text-[#00d084] transition-colors">GitHub</a>
          </div>
          <div className="hidden lg:flex gap-4 items-center">
            <a href="#" className="text-[#fafafa] text-sm font-semibold px-4 hover:text-[#00d084] transition-colors">Sign in</a>
            <a href="#pricing" className="bg-[#00d084] text-black px-6 py-2.5 rounded-md font-semibold text-[15px] hover:bg-[#00a86b] transition-all hover:-translate-y-0.5">Get started free</a>
          </div>
          <button className="lg:hidden flex flex-col gap-1.5 cursor-pointer" onClick={() => alert('Mobile menu coming soon!')}>
            <span className="w-6 h-0.5 bg-[#fafafa]"></span>
            <span className="w-6 h-0.5 bg-[#fafafa]"></span>
            <span className="w-6 h-0.5 bg-[#fafafa]"></span>
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="min-h-screen flex items-center relative pt-[100px] border-b border-white/5 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(0,208,132,0.08)_0%,transparent_70%)] -z-10 pointer-events-none"></div>
          <div className="container mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
            <div className="reveal">
              <span className="font-mono text-[#00d084] uppercase text-[11px] tracking-[0.2em] mb-6 block">Open source · Self-hosted · MIT licensed</span>
              <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-[#fafafa] mb-6 leading-[1.1]">
                Test management <br /><span className="text-[#a1a1aa]">that doesn't</span> <br />get in the way.
              </h1>
              <p className="text-lg lg:text-xl max-w-[520px] mb-10">The first self-hostable TCMS with native Playwright and Cypress reporters, built-in AI test generation, and no per-seat pricing.</p>
              <div className="flex flex-wrap gap-4 mb-12">
                <a href="#" className="bg-[#00d084] text-black px-6 py-3 rounded-md font-bold text-[15px] flex items-center gap-2 hover:bg-[#00a86b] transition-all hover:-translate-y-0.5">
                  <Download size={18} strokeWidth={2.5} />
                  Self-host for free
                </a>
                <a href="#features" className="border border-white/15 text-[#fafafa] px-6 py-3 rounded-md font-bold text-[15px] hover:border-[#00d084] hover:text-[#00d084] transition-all">See how it works →</a>
              </div>
              <div className="font-mono text-xs text-[#52525b] flex gap-5">
                <span>★ MIT Licensed</span>
                <span>· 60-second setup</span>
                <span>· No seat limits</span>
              </div>
            </div>
            <div className="reveal delay-200">
              <div className="bg-[#111113] rounded-lg border border-white/5 border-l-[3px] border-l-[#00d084] p-6 font-mono text-sm min-h-[320px] shadow-2xl backdrop-blur-xl relative">
                <div className="flex gap-1.5 mb-5">
                  <div className="w-2 h-2 rounded-full bg-[#52525b]/50"></div>
                  <div className="w-2 h-2 rounded-full bg-[#52525b]/50"></div>
                  <div className="w-2 h-2 rounded-full bg-[#52525b]/50"></div>
                </div>
                <div ref={terminalRef}>
                  {terminalLines.map((line, i) => (
                    <div key={i} className={`mb-2 min-h-[20px] ${line.type === 'success' ? 'text-[#00d084]' : ''}`}>
                      {line.type === 'prompt' && <span className="text-[#00d084] mr-2.5">$</span>}
                      {line.text}
                      {i === currentLineIndex && line.type !== 'break' && <span className="cursor ml-1"></span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Strip */}
        <div className="py-16 text-center border-b border-white/5">
          <div className="container mx-auto px-6">
            <p className="text-xs text-[#52525b] mb-8 uppercase tracking-[0.1em]">Trusted by QA teams at</p>
            <div className="flex flex-wrap justify-center lg:justify-between items-center gap-8 opacity-60 font-mono font-medium grayscale">
              <span>ACME CORP</span>
              <span>NOVATECH</span>
              <span>STACKLANE</span>
              <span>MERIDIAN</span>
              <span>ORBITAL</span>
              <span>QUANTUM</span>
            </div>
          </div>
        </div>

        {/* Problem Section */}
        <section id="problem" className="py-32 border-b border-white/5">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20 reveal">
              <h2 className="text-3xl lg:text-5xl font-bold text-[#fafafa] mb-5">Every other tool is either expensive, locked in, or dead.</h2>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-b from-[#ef4444]/5 to-transparent border border-white/5 p-8 rounded-lg reveal">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-white/10 text-[#fafafa] mb-3 inline-block">Legacy</span>
                <h3 className="text-lg font-bold text-[#fafafa] mb-3">Jira-native Tools</h3>
                <span className="font-semibold text-[#fafafa] text-sm mb-4 block">You pay for every Jira user. Not just testers.</span>
                <p className="text-sm leading-relaxed">Atlassian's pricing model forces you to pay for developers and managers who never touch a test case. Your data is trapped in a plugin ecosystem with no escape hatch.</p>
              </div>
              <div className="bg-gradient-to-b from-[#ef4444]/5 to-transparent border border-white/5 p-8 rounded-lg reveal delay-100">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-[#f59e0b]/10 text-[#f59e0b] mb-3 inline-block">SaaS</span>
                <h3 className="text-lg font-bold text-[#fafafa] mb-3">Standalone SaaS</h3>
                <span className="font-semibold text-[#fafafa] text-sm mb-4 block">No self-hosting. AI that's mostly vaporware.</span>
                <p className="text-sm leading-relaxed">High monthly fees with no option to run on your own infra. Their "AI features" are usually just wrappers that fail to understand technical test specs.</p>
              </div>
              <div className="bg-gradient-to-b from-[#ef4444]/5 to-transparent border border-white/5 p-8 rounded-lg reveal delay-200">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-[#00d084]/10 text-[#00d084] mb-3 inline-block">Open Source</span>
                <h3 className="text-lg font-bold text-[#fafafa] mb-3">Legacy OS Alternatives</h3>
                <span className="font-semibold text-[#fafafa] text-sm mb-4 block">Dead projects. Legacy PHP. No support.</span>
                <p className="text-sm leading-relaxed">TestLink is a relic. Kiwi is functional but lacks modern automation integration. You spend more time maintaining the tool than testing your product.</p>
              </div>
            </div>
            <div className="mt-16 text-center font-semibold text-[#fafafa] text-xl reveal">
              "We built the tool that should have existed five years ago."
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-32 border-b border-white/5">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20 reveal">
              <h2 className="text-3xl lg:text-5xl font-bold text-[#fafafa] mb-5">Built for the way automation teams actually work.</h2>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              {[
                { icon: <TerminalIcon />, title: "Hierarchical Suites", badge: "Free", desc: "Drag-and-drop tree structures, Markdown editor, custom fields, and full version history for every case." },
                { icon: <Monitor />, title: "Automation Reporters", badge: "Free", desc: "Playwright and Cypress reporters capture screenshots, traces, and video artifacts directly in the TCMS UI." },
                { icon: <Play />, title: "Execution Engine", badge: "Pro", desc: "Schedule manual runs, assign testers, and track progress in real-time with granular execution history." },
                { icon: <Cloud />, title: "API Playground", badge: "Pro", desc: "Built-in Scalar playground. Every UI action is an API call. Code generation in 20+ languages out of the box." },
                { icon: <ShieldCheck />, title: "AI Test Gen", badge: "Pro", desc: "Transform user stories or API specs into structured test cases using Claude API. Generous monthly credits included." },
                { icon: <CheckCircle2 />, title: "Quality Gates", badge: "Pro", desc: "Automated GO/NO-GO checks posted to GitHub PRs based on your custom pass/fail thresholds." }
              ].map((f, i) => (
                <div key={i} className="bg-[#111113] border border-white/5 p-8 rounded-lg hover:border-[#00d084] hover:bg-[#18181b]/70 transition-all hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,208,132,0.08)] reveal">
                  <div className="w-10 h-10 bg-[#00d084]/10 rounded-md flex items-center justify-center mb-6 text-[#00d084]">
                    {f.icon}
                  </div>
                  <h3 className="text-[#fafafa] font-bold mb-3 flex items-center justify-between">
                    {f.title}
                    <span className={`font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${f.badge === 'Free' ? 'bg-[#00d084]/10 text-[#00d084]' : 'bg-[#f59e0b]/10 text-[#f59e0b]'}`}>
                      {f.badge}
                    </span>
                  </h3>
                  <p className="text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how" className="py-32 border-b border-white/5">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20 reveal">
              <h2 className="text-3xl lg:text-5xl font-bold text-[#fafafa] mb-5">From zero to running in four steps.</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 relative mt-16 reveal">
              {[
                { step: "01", title: "Self-host or Sign up", desc: "Run one curl command to host it yourself, or create a free cloud account in seconds." },
                { step: "02", title: "Connect Framework", desc: "Install our Playwright or Cypress reporter package. It takes about 2 minutes to config." },
                { step: "03", title: "Import or Generate", desc: "Migrate from TestRail via CSV, or use AI to generate test cases from your Jira tickets." },
                { step: "04", title: "Ship with Confidence", desc: "Automated gates block bad deploys. Dashboards catch flaky tests before users do." }
              ].map((s, i) => (
                <div key={i} className="relative">
                  <span className="font-mono text-4xl text-[#52525b] opacity-30 mb-4 block">{s.step}</span>
                  <h3 className="text-lg font-bold text-[#fafafa] mb-3">{s.title}</h3>
                  <p className="text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-32 border-b border-white/5">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20 reveal">
              <h2 className="text-3xl lg:text-5xl font-bold text-[#fafafa] mb-5">Start free. Upgrade when you need more.</h2>
              <p>No per-seat tax on the free tier. Ever.</p>
            </div>
            <div className="bg-[#111113] border border-white/5 rounded-xl overflow-hidden grid lg:grid-cols-3 reveal">
              <div className="p-12 flex flex-col border-b lg:border-b-0 lg:border-r border-white/5">
                <div className="mb-8">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-[#00d084]/10 text-[#00d084]">Free</span>
                  <div className="text-5xl font-bold text-[#fafafa] my-4">$0</div>
                  <div className="text-sm text-[#52525b]">Self-hosted · Unlimited users</div>
                </div>
                <ul className="mb-10 flex-grow text-sm space-y-3">
                  {["Full test management", "Native reporters", "REST API access", "Jira + GitHub integration", "Basic run creation", "Community support"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <span className="text-[#00d084] font-mono">→</span> {item}
                    </li>
                  ))}
                </ul>
                <a href="https://github.com" className="border border-white/15 text-[#fafafa] px-6 py-3 rounded-md font-bold text-[15px] text-center hover:border-[#00d084] hover:text-[#00d084] transition-all">Clone on GitHub</a>
              </div>

              <div className="p-12 flex flex-col relative bg-[#18181b] border-b lg:border-b-0 lg:border-r border-[#00d084]/30">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#00d084]"></div>
                <div className="mb-8">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-[#f59e0b]/10 text-[#f59e0b]">Pro</span>
                  <div className="text-5xl font-bold text-[#fafafa] my-4">$15</div>
                  <div className="text-sm text-[#52525b]">per user / month · Cloud hosted</div>
                </div>
                <ul className="mb-10 flex-grow text-sm space-y-3">
                  {["Everything in Free", "Execution engine", "Scalar API Playground", "AI Generation (Claude)", "Quality Gates (PR status)", "Flaky test detection", "Free viewer seats", "Priority Support (48h)"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <span className="text-[#00d084] font-mono">→</span> {item}
                    </li>
                  ))}
                </ul>
                <a href="#" className="bg-[#00d084] text-black px-6 py-3 rounded-md font-bold text-[15px] text-center hover:bg-[#00a86b] transition-all hover:-translate-y-0.5">Start 14-day trial</a>
                <p className="text-center text-[10px] text-[#52525b] mt-4">No credit card required to start.</p>
              </div>

              <div className="p-12 flex flex-col">
                <div className="mb-8">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-white/10 text-[#fafafa]">Enterprise</span>
                  <div className="text-5xl font-bold text-[#fafafa] my-4">Custom</div>
                  <div className="text-sm text-[#52525b]">Cloud or Private VPC</div>
                </div>
                <ul className="mb-10 flex-grow text-sm space-y-3">
                  {["Everything in Pro", "Private VPC deployment", "SSO (SAML) + SCIM", "Audit logs", "Custom roles & permissions", "Dedicated Slack support", "99.9% Uptime SLA"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <span className="text-[#00d084] font-mono">→</span> {item}
                    </li>
                  ))}
                </ul>
                <a href="#" className="border border-white/15 text-[#fafafa] px-6 py-3 rounded-md font-bold text-[15px] text-center hover:border-[#00d084] hover:text-[#00d084] transition-all">Talk to us</a>
              </div>
            </div>
          </div>
        </section>

        {/* Consulting */}
        <section id="consulting" className="py-32 border-b border-white/5">
          <div className="container mx-auto px-6">
            <div className="bg-[#18181b] border border-white/5 border-l-4 border-l-[#f59e0b] p-8 lg:p-16 rounded-lg reveal">
              <span className="font-mono text-[10px] text-[#f59e0b] uppercase tracking-[0.1em] mb-4 block">FOR TEAMS THAT NEED MORE</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#fafafa] mb-6">QA expertise, not just a tool.</h2>
              <p className="max-w-2xl mb-12">Some teams need more than software. We embed QA engineers, build your automation from zero, and design the processes that make quality everyone's job. Every client we work with runs on our platform — because we trust it enough to use it ourselves.</p>
              
              <div className="grid lg:grid-cols-3 gap-8">
                {[
                  { title: "QA Strategy & Process", desc: "Maturity assessment, strategy design, and tooling implementation.", tag: "Retainer or scope" },
                  { title: "Automation Build", desc: "Full framework setup (Playwright/Cypress) integrated into CI/CD.", tag: "Fixed price project" },
                  { title: "QA Outsourcing", desc: "Dedicated testers embedded in your team. Scalable devshop for QA.", tag: "Monthly basis" }
                ].map((c, i) => (
                  <div key={i} className="bg-[#111113] p-6 border border-white/5 rounded-md">
                    <h3 className="text-[#fafafa] font-bold mb-3 text-base">{c.title}</h3>
                    <p className="text-xs mb-4">{c.desc}</p>
                    <span className="font-mono text-[10px] text-[#f59e0b] uppercase">{c.tag}</span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <a href="#" className="border border-white/15 text-[#fafafa] px-6 py-3 rounded-md font-bold text-[15px] hover:border-[#00d084] hover:text-[#00d084] transition-all">Tell us what you need →</a>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section id="social" className="py-32 border-b border-white/5">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-12 reveal">
              <h2 className="text-xs text-[#52525b] uppercase tracking-[0.1em] font-bold">What early users say</h2>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              {[
                { text: "Finally, a TCM tool I can actually self-host without three days of DevOps work. The Playwright integration is a game changer.", name: "Alex Rivera", role: "Lead QA Engineer, Stacklane" },
                { text: "We replaced a $2,000/mo TestRail bill with the QATOOL Pro tier and got better automation visibility in return.", name: "Sarah Chen", role: "Head of Quality, NovaTech" },
                { text: "The AI generation actually creates usable test steps. It's the first time I've seen AI in QA that isn't just a gimmick.", name: "Mark J.", role: "Senior SDET, Meridian" }
              ].map((q, i) => (
                <div key={i} className="bg-[#18181b] p-8 border border-white/5 rounded-lg relative reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="absolute top-2.5 left-5 text-6xl opacity-10 font-serif">“</div>
                  <p className="text-[#fafafa] italic mb-6 text-[15px] relative z-10">{q.text}</p>
                  <div className="flex flex-col">
                    <span className="text-[#fafafa] font-semibold text-sm">{q.name}</span>
                    <span className="text-[#52525b] text-xs font-mono">{q.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 text-center relative overflow-hidden reveal">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(0,208,132,0.08)_0%,transparent_70%)] -z-10 pointer-events-none"></div>
          <div className="container mx-auto px-6">
            <h2 className="text-3xl lg:text-5xl font-bold text-[#fafafa] mb-6">Start for free. Upgrade when you're ready.</h2>
            <p className="max-w-[600px] mx-auto mb-10">Self-host in 60 seconds or try the cloud version. No seat limits on the free tier — ever.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="bg-[#00d084] text-black px-6 py-3 rounded-md font-bold text-[15px] hover:bg-[#00a86b] transition-all hover:-translate-y-0.5">Self-host for free</a>
              <a href="#pricing" className="border border-white/15 text-[#fafafa] px-6 py-3 rounded-md font-bold text-[15px] hover:border-[#00d084] hover:text-[#00d084] transition-all">Try cloud Pro →</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.2fr_1fr] gap-16 mb-20">
            <div>
              <a href="#" className="font-mono font-bold text-lg text-[#fafafa] flex items-center gap-2">
                <div className="w-[10px] h-[10px] bg-[#00d084]"></div>
                QATOOL
              </a>
              <p className="text-sm mt-4 max-w-[240px]">The QA platform built for teams that actually ship.</p>
            </div>
            <div>
              <span className="text-[#fafafa] font-semibold text-sm mb-6 block">Product</span>
              <ul className="text-sm text-[#52525b] space-y-3">
                <li><a href="#features" className="hover:text-[#00d084] transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-[#00d084] transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-[#00d084] transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-[#00d084] transition-colors">Changelog</a></li>
                <li><a href="https://github.com" className="hover:text-[#00d084] transition-colors">GitHub</a></li>
              </ul>
            </div>
            <div>
              <span className="text-[#fafafa] font-semibold text-sm mb-6 block">Consulting</span>
              <ul className="text-sm text-[#52525b] space-y-3">
                <li><a href="#" className="hover:text-[#00d084] transition-colors">QA Strategy</a></li>
                <li><a href="#" className="hover:text-[#00d084] transition-colors">Automation Build</a></li>
                <li><a href="#" className="hover:text-[#00d084] transition-colors">QA Outsourcing</a></li>
                <li><a href="#" className="hover:text-[#00d084] transition-colors">Contact Sales</a></li>
              </ul>
            </div>
            <div>
              <span className="text-[#fafafa] font-semibold text-sm mb-6 block">Company</span>
              <ul className="text-sm text-[#52525b] space-y-3">
                <li><a href="#" className="hover:text-[#00d084] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#00d084] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#00d084] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#00d084] transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-10 flex flex-wrap justify-between gap-4 font-mono text-[11px] text-[#52525b]">
            <span>&copy; 2026 QATOOL. All rights reserved.</span>
            <span>Made by 3 QA engineers who got tired of paying $35/seat.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
