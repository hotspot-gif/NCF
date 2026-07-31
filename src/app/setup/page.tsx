export default function SetupGuide() {
  return (
    <div className="min-h-screen bg-bg max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://cms-assets.ldsvcplatform.com/IT/s3fs-public/2023-09/home_logo.png"
          alt="Lycamobile"
          className="h-8"
        />
        <div>
          <h1 className="text-xl font-bold text-primary">Supabase Backend Setup</h1>
          <p className="text-xs text-slate-400">PostgreSQL Database Configuration Guide</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Overview */}
        <div className="bg-gradient-to-r from-primary to-accent-blue rounded-2xl p-5 text-white shadow-lg">
          <h2 className="font-bold text-lg mb-2">🚀 Quick Start</h2>
          <p className="text-white/80 text-sm leading-relaxed">
            This app uses <strong>Supabase</strong> as a hosted PostgreSQL backend with <strong>Drizzle ORM</strong>.
            Follow the steps below to configure your own database.
          </p>
        </div>

        {/* Step 1 */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-accent-peach/30">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-9 bg-accent-blue text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-sm">1</span>
            <h2 className="text-lg font-bold text-primary">Create a Supabase Project</h2>
          </div>
          <ol className="space-y-2.5 text-sm text-slate-600 ml-12">
            <li>Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-accent-blue underline font-semibold">supabase.com</a> and sign up / log in.</li>
            <li>Click <strong>&quot;New Project&quot;</strong> and fill in:</li>
            <ul className="ml-4 space-y-1 text-slate-500 text-[13px]">
              <li>• <strong>Name:</strong> <code className="bg-accent-peach/20 text-primary px-1.5 py-0.5 rounded text-xs font-mono">lycamobile-feedback</code></li>
              <li>• <strong>Database Password:</strong> Choose a strong password (save it!)</li>
              <li>• <strong>Region:</strong> Select <code className="bg-accent-peach/20 text-primary px-1.5 py-0.5 rounded text-xs font-mono">EU West (Ireland)</code> or closest to Italy</li>
            </ul>
            <li>Wait for the project to be provisioned (~2 minutes).</li>
          </ol>
        </section>

        {/* Step 2 */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-accent-peach/30">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-9 bg-accent-green text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-sm">2</span>
            <h2 className="text-lg font-bold text-primary">Get Your Database URL</h2>
          </div>
          <ol className="space-y-2.5 text-sm text-slate-600 ml-12">
            <li>In your Supabase dashboard → <strong>Project Settings</strong> → <strong>Database</strong>.</li>
            <li>Scroll to <strong>&quot;Connection string&quot;</strong> section.</li>
            <li>Select the <strong>&quot;URI&quot;</strong> tab and copy it:</li>
          </ol>
          <div className="mt-3 ml-12 bg-primary text-accent-green p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed">
            postgresql://postgres.[ref]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
          </div>
          <div className="mt-3 ml-12 bg-accent-yellow/15 text-yellow-800 text-xs p-3 rounded-xl flex items-start gap-2">
            <span>⚠️</span>
            <span>Replace <code className="font-mono bg-white/60 px-1 rounded">[PASSWORD]</code> with your actual database password.</span>
          </div>
        </section>

        {/* Step 3 */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-accent-peach/30">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-9 bg-accent-cyan text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-sm">3</span>
            <h2 className="text-lg font-bold text-primary">Configure Environment</h2>
          </div>
          <div className="ml-12 space-y-3">
            <p className="text-sm text-slate-600">
              Create a <code className="bg-accent-peach/20 px-1.5 py-0.5 rounded text-xs font-mono text-primary">.env</code> file in the project root:
            </p>
            <div className="bg-primary text-accent-green p-4 rounded-xl text-xs font-mono overflow-x-auto">
              <div className="text-slate-400"># Supabase PostgreSQL Connection</div>
              <div>DATABASE_URL=postgresql://postgres.[ref]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres</div>
            </div>
            <div className="bg-accent-blue/5 text-accent-blue text-xs p-3 rounded-xl">
              💡 For Vercel deployment, add this as an Environment Variable in Project Settings.
            </div>
          </div>
        </section>

        {/* Step 4 */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-accent-peach/30">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-9 bg-accent-purple text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-sm">4</span>
            <h2 className="text-lg font-bold text-primary">Push Database Schema</h2>
          </div>
          <div className="ml-12 space-y-3">
            <p className="text-sm text-slate-600">
              Run this command to create the <code className="bg-accent-peach/20 px-1.5 py-0.5 rounded text-xs font-mono text-primary">feedbacks</code> table:
            </p>
            <div className="bg-primary text-accent-cyan p-4 rounded-xl text-sm font-mono">
              npx drizzle-kit push
            </div>
            <p className="text-[13px] text-slate-500">
              This automatically creates all columns defined in <code className="bg-accent-peach/20 px-1 rounded text-xs font-mono text-primary">src/db/schema.ts</code>.
            </p>
          </div>
        </section>

        {/* Step 5 */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-accent-peach/30">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-9 bg-accent-yellow text-primary rounded-xl flex items-center justify-center text-sm font-bold shadow-sm">5</span>
            <h2 className="text-lg font-bold text-primary">Verify in Supabase</h2>
          </div>
          <div className="ml-12 space-y-3">
            <p className="text-sm text-slate-600">
              In the <strong>Table Editor</strong>, you should see the <code className="bg-accent-peach/20 px-1.5 py-0.5 rounded text-xs font-mono text-primary">feedbacks</code> table with these columns:
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full text-xs">
                <thead className="bg-primary/5">
                  <tr>
                    <th className="text-left p-2.5 font-bold text-primary border-b border-slate-100">Column</th>
                    <th className="text-left p-2.5 font-bold text-primary border-b border-slate-100">Type</th>
                    <th className="text-left p-2.5 font-bold text-primary border-b border-slate-100">Description</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  {[
                    ["id", "UUID", "Auto-generated primary key"],
                    ["reporter_name", "VARCHAR", "Name of the reporter"],
                    ["reporter_role", "VARCHAR", "Role / designation"],
                    ["region", "VARCHAR", "Italian region"],
                    ["city", "VARCHAR", "City or area"],
                    ["address", "TEXT", "Street address (optional)"],
                    ["post_code", "VARCHAR(20)", "Post code / CAP (optional)"],
                    ["signal_strength", "INT", "Rating 1-5"],
                    ["data_speed", "INT", "Rating 1-5"],
                    ["call_quality", "INT", "Rating 1-5"],
                    ["sms_reliability", "INT", "Rating 1-5"],
                    ["network_stability", "INT", "Rating 1-5"],
                    ["overall_satisfaction", "INT", "Rating 1-5"],
                    ["compared_to_before", "VARCHAR", "Migration comparison"],
                    ["primary_issue", "VARCHAR", "Main issue (optional)"],
                    ["issue_frequency", "VARCHAR", "How often (optional)"],
                    ["affected_areas", "TEXT", "Locations (optional)"],
                    ["customer_complaints", "BOOLEAN", "Has complaints?"],
                    ["additional_notes", "TEXT", "Free-text (optional)"],
                    ["created_at", "TIMESTAMP", "Auto-generated"],
                  ].map(([col, type, desc]) => (
                    <tr key={col} className="hover:bg-accent-peach/5">
                      <td className="p-2.5 border-b border-slate-50 font-mono text-primary">{col}</td>
                      <td className="p-2.5 border-b border-slate-50">{type}</td>
                      <td className="p-2.5 border-b border-slate-50 text-slate-400">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Step 6 */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-accent-peach/30">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-9 bg-gradient-to-br from-accent-blue to-accent-purple text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-sm">6</span>
            <h2 className="text-lg font-bold text-primary">Deploy to Vercel</h2>
          </div>
          <div className="ml-12 space-y-3 text-sm text-slate-600">
            <ol className="space-y-2">
              <li>1. Push code to GitHub</li>
              <li>2. Import at <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-accent-blue underline font-semibold">vercel.com</a></li>
              <li>3. Add <code className="bg-accent-peach/20 px-1.5 py-0.5 rounded text-xs font-mono text-primary">DATABASE_URL</code> in Environment Variables</li>
              <li>4. Deploy! 🚀</li>
            </ol>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-accent-peach/30">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-9 bg-orange-400 text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-sm">?</span>
            <h2 className="text-lg font-bold text-primary">Troubleshooting</h2>
          </div>
          <div className="ml-12 space-y-4 text-sm">
            <div>
              <p className="font-semibold text-primary">Connection refused?</p>
              <p className="text-slate-400 text-[13px]">Check that DATABASE_URL is correct and the Supabase project is active.</p>
            </div>
            <div>
              <p className="font-semibold text-primary">Table doesn&apos;t exist?</p>
              <p className="text-slate-400 text-[13px]">Run <code className="bg-accent-peach/20 px-1.5 py-0.5 rounded text-xs font-mono text-primary">npx drizzle-kit push</code></p>
            </div>
            <div>
              <p className="font-semibold text-primary">SSL error?</p>
              <p className="text-slate-400 text-[13px]">Append <code className="bg-accent-peach/20 px-1.5 py-0.5 rounded text-xs font-mono text-primary">?sslmode=require</code> to your DATABASE_URL.</p>
            </div>
            <div>
              <p className="font-semibold text-primary">Serverless connection limits?</p>
              <p className="text-slate-400 text-[13px]">Use the <strong>pooler connection string</strong> (port 6543) from Supabase.</p>
            </div>
          </div>
        </section>

        <div className="text-center pt-4 pb-6">
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-6 py-3 rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary-light transition-all"
          >
            ← Back to Feedback App
          </a>
        </div>
      </div>
    </div>
  );
}
