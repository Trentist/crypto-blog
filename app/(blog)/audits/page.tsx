import Link from 'next/link'

export default function AuditsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-effect rounded-3xl p-12 md:p-16 text-center">
        {/* Coming Soon Section */}
        <div className="space-y-8">
          <div className="text-8xl mb-8">🔍</div>
          
          <h1 className="text-6xl md:text-7xl font-bold">
            <span className="gradient-text">Security Audits</span>
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Comprehensive smart contract security audits and vulnerability assessments 
            for DeFi protocols and Web3 applications.
          </p>
          
          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-full">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-lg font-semibold gradient-text">Coming Soon</span>
          </div>
          
          {/* Features Preview */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="p-6 bg-white/50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/30 rounded-xl">
              <div className="text-3xl mb-4">🔐</div>
              <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-300 mb-3">Smart Contract Audits</h3>
              <p className="text-slate-600 dark:text-gray-400">Comprehensive security analysis of smart contracts with detailed vulnerability reports.</p>
            </div>
            
            <div className="p-6 bg-white/50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/30 rounded-xl">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold text-cyan-600 dark:text-cyan-300 mb-3">DeFi Protocol Reviews</h3>
              <p className="text-slate-600 dark:text-gray-400">In-depth analysis of DeFi protocols for security vulnerabilities and best practices.</p>
            </div>
            
            <div className="p-6 bg-white/50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/30 rounded-xl">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-green-600 dark:text-green-300 mb-3">Risk Assessment</h3>
              <p className="text-slate-600 dark:text-gray-400">Detailed risk analysis and mitigation strategies for blockchain applications.</p>
            </div>
            
            <div className="p-6 bg-white/50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/30 rounded-xl">
              <div className="text-3xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-300 mb-3">Compliance Reports</h3>
              <p className="text-slate-600 dark:text-gray-400">Regulatory compliance assessments and documentation for Web3 projects.</p>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="mt-12 p-6 bg-gradient-to-r from-purple-100/50 to-cyan-100/50 dark:from-purple-900/30 dark:to-cyan-900/30 border border-purple-300/30 dark:border-purple-500/30 rounded-xl">
            <h3 className="text-2xl font-bold gradient-text mb-3">Stay Updated</h3>
            <p className="text-slate-600 dark:text-gray-300 mb-6">
              Follow my blog for updates on when the audit services become available, 
              or reach out directly for early access to security consultation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/blog"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 glow-effect"
              >
                📚 Read My Blog
              </Link>
              <Link
                href="/"
                className="px-6 py-3 bg-slate-200/70 dark:bg-slate-700/50 text-slate-800 dark:text-white rounded-lg border border-slate-300/50 dark:border-slate-600/50 hover:bg-slate-300/70 dark:hover:bg-slate-700/70 hover:border-slate-400/50 dark:hover:border-slate-600/70 transition-all duration-300"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
