import React, { useState } from 'react'
import { 
  Dashboard, 
  ContributionChart, 
  IssueFinder, 
  StatsOverview,
  TokenInput
} from './components'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [hasToken, setHasToken] = useState(!!localStorage.getItem('github_token'))

  const tabs = [
    { id: 'dashboard', name: 'Overview', icon: '◈' },
    { id: 'chart', name: 'Analytics', icon: '◌' },
    { id: 'issues', name: 'Issue Radar', icon: '◎' },
    { id: 'stats', name: 'Deep Stats', icon: '✦' },
  ]

  const handleTokenSet = () => {
    setHasToken(true)
  }

  if (!hasToken) {
    return <TokenInput onTokenSet={handleTokenSet} />
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'chart':
        return <ContributionChart />
      case 'issues':
        return <IssueFinder />
      case 'stats':
        return <StatsOverview />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="glass-panel-strong overflow-hidden">
          <div className="relative border-b border-white/10 px-6 py-6 sm:px-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.15),transparent_30%),radial-gradient(circle_at_left,rgba(168,85,247,0.18),transparent_24%)]" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
                  <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.8)]" />
                  Supercharged GitHub Intelligence
                </div>
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                    Open Source Dashboard
                  </h1>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
                    A cinematic command center for your GitHub presence — contribution velocity, repository signals, issue discovery, and creator-grade analytics in one immersive workspace.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="metric-card min-w-[140px]">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Status</p>
                  <p className="mt-3 text-lg font-semibold text-emerald-300">Live + Synced</p>
                </div>
                <div className="metric-card min-w-[140px]">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Experience</p>
                  <p className="mt-3 text-lg font-semibold text-fuchsia-300">Glassmorphism UI</p>
                </div>
                <div className="metric-card min-w-[140px] col-span-2 sm:col-span-1">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Mode</p>
                  <p className="mt-3 text-lg font-semibold text-cyan-300">Insight Driven</p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
            <div className="flex flex-wrap items-center gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pill-tab ${
                    activeTab === tab.id
                      ? 'border-cyan-300/40 bg-cyan-400/15 text-white shadow-lg shadow-cyan-900/40'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-base">{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="pb-8">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App