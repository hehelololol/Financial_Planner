import { Card } from '../components/ui/Card';
import { SectionHeader } from '../components/ui/SectionHeader';
import { AnimatedBackground } from '../components/AnimatedBackground';

export function About() {
  return (
    <div className="min-h-screen bg-dark-bg relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Hero Section with Gradient Glow */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-full">
              <div className="bg-dark-bg rounded-full p-4">
                <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent animate-slide-up">
            About This Project
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A modern portfolio allocation and investment planning platform built with cutting-edge technology
          </p>
        </div>

        {/* Section A: Who I Am */}
        <section className="mb-16 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <Card glow className="hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                  <div className="w-full h-full rounded-2xl bg-dark-surface flex items-center justify-center">
                    <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <SectionHeader
                  title="Who I Am"
                  icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  }
                  className="mb-6"
                />
                <div className="space-y-4 text-gray-300">
                  <p className="text-xl">
                    <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Anrric Xu
                    </span>
                  </p>
                  <p className="text-base leading-relaxed text-gray-400">
                    I'm a first-year Electrical Engineering student at the University of Wisconsin–Madison, 
                    with a strong passion for software engineering, artificial intelligence, and financial modeling.
                  </p>
                  <p className="text-base leading-relaxed text-gray-400">
                    This project represents my journey into full-stack development, combining my interest 
                    in technology with practical financial tools that help users make informed investment decisions.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Section B: Why I Built This */}
        <section className="mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Card glow className="hover:scale-[1.02] transition-transform duration-300">
            <SectionHeader
              title="Why I Built This"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              className="mb-6"
            />
            <div className="space-y-4 text-gray-300">
              <p className="text-base leading-relaxed text-gray-400">
                This platform was created to help users visualize portfolio allocations and understand 
                realistic compound growth projections. It serves as both a practical tool for investors 
                and a learning project for me to explore full-stack engineering and investment mathematics.
              </p>
              <p className="text-base leading-relaxed text-gray-400">
                By combining modern web technologies with financial modeling principles, I've built a 
                comprehensive system that demonstrates how software engineering can be applied to solve 
                real-world financial planning challenges.
              </p>
            </div>
          </Card>
        </section>

        {/* Section C: Tech Stack */}
        <section className="mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Card glow>
            <SectionHeader
              title="Tech Stack"
              subtitle="Modern technologies powering this platform"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              }
              className="mb-8"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Frontend */}
              <Card hover className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-blue-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Frontend</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    React + Vite + TypeScript
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    TailwindCSS
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Recharts
                  </li>
                </ul>
              </Card>

              {/* Backend */}
              <Card hover className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border-purple-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Backend</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    Node.js + Express
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    TypeScript
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    Shared TypeScript Interfaces
                  </li>
                </ul>
              </Card>

              {/* Services */}
              <Card hover className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/20 border-cyan-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Services</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                    Firebase Auth + Firestore
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                    Vercel (Frontend)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                    Render (Backend)
                  </li>
                </ul>
              </Card>
            </div>
          </Card>
        </section>

        {/* Section D: Contact */}
        <section className="mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Card glow className="hover:scale-[1.02] transition-transform duration-300">
            <SectionHeader
              title="Contact"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
              className="mb-6"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="https://github.com/anrricx"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-blue-500/50 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">GitHub</p>
                  <p className="text-white font-medium group-hover:text-blue-400 transition-colors">github.com/anrricx</p>
                </div>
                <svg className="w-5 h-5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              <a
                href="mailto:anrric2000@gmail.com"
                className="group flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-blue-500/50 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">Email</p>
                  <p className="text-white font-medium group-hover:text-blue-400 transition-colors">anrric2000@gmail.com</p>
                </div>
                <svg className="w-5 h-5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </Card>
        </section>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <p>Built with ❤️ by Anrric Xu | 2024</p>
        </div>
      </div>
    </div>
  );
}
