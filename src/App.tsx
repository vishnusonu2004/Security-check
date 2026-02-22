import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ShieldAlert, Smartphone, ArrowRight, Loader2, Lock, CheckCircle2 } from 'lucide-react';

type Status = 'success' | 'error' | 'vulnerable';

interface Result {
  status: Status;
  message: string;
  details?: string;
}

export default function App() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [securing, setSecuring] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function secureDevice() {
    setSecuring(true);
    try {
      const res = await fetch('/api/secure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: phone }),
      });
      const data = await res.json();
      await new Promise(r => setTimeout(r, 1500));
      setResult(data);
    } catch {
      setResult({ status: 'error', message: 'Failed to secure the device.' });
    } finally {
      setSecuring(false);
    }
  }

  async function runCheck(e: FormEvent) {
    e.preventDefault();
    if (!phone.trim()) return;

    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setResult({ status: 'error', message: 'Invalid phone number. Please enter at least 10 digits.' });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: phone }),
      });
      const data = await res.json();
      await new Promise(r => setTimeout(r, 1500));
      setResult(data);
    } catch {
      setResult({ status: 'error', message: 'Failed to connect to security server.' });
    } finally {
      setLoading(false);
    }
  }

  function getStatusStyles(status: Status) {
    switch (status) {
      case 'success': return { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', iconBg: 'bg-emerald-500/20' };
      case 'vulnerable': return { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', iconBg: 'bg-amber-500/20' };
      default: return { bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400', iconBg: 'bg-rose-500/20' };
    }
  }

  function StatusIcon({ status }: { status: Status }) {
    if (status === 'success') return <CheckCircle2 className="w-6 h-6 text-emerald-400" />;
    if (status === 'vulnerable') return <ShieldAlert className="w-6 h-6 text-amber-400" />;
    return <ShieldAlert className="w-6 h-6 text-rose-400" />;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-900 via-slate-950 to-black flex flex-col items-center justify-center p-4 font-sans">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-indigo-600/20 border border-indigo-500/30 mb-6 shadow-2xl shadow-indigo-500/20"
          >
            <ShieldCheck className="w-10 h-10 text-indigo-400" />
          </motion.div>
          <h1 className="text-4xl font-display font-bold tracking-tight text-white mb-3">Security Checker</h1>
          <p className="text-slate-400 text-lg">Verify your mobile device's protection against clickjacking attacks.</p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={runCheck} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-slate-300 ml-1">Phone Number</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Smartphone className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !phone.trim()}
              className="w-full relative overflow-hidden group bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing Security...</span>
                </>
              ) : (
                <>
                  <span>Run Security Check</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                {(() => {
                  const styles = getStatusStyles(result.status);
                  return (
                    <div className={`p-6 rounded-2xl border ${styles.bg} ${styles.border}`}>
                      <div className="flex items-start gap-4">
                        <div className={`mt-1 p-2 rounded-full ${styles.iconBg}`}>
                          <StatusIcon status={result.status} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-bold text-lg ${styles.text}`}>{result.message}</h3>
                          {result.details && <p className="text-slate-400 mt-1 text-sm leading-relaxed">{result.details}</p>}
                          {result.status === 'vulnerable' && (
                            <button
                              onClick={secureDevice}
                              disabled={securing}
                              className="mt-4 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all flex items-center gap-2"
                            >
                              {securing ? (
                                <>
                                  <Loader2 className="w-5 h-5 animate-spin" />
                                  <span>Securing Device...</span>
                                </>
                              ) : (
                                <>
                                  <ShieldCheck className="w-5 h-5" />
                                  <span>Make Secure</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-slate-500 text-xs uppercase tracking-widest font-semibold">
          <div className="flex items-center gap-2">
            <Lock className="w-3 h-3" />
            <span>End-to-End Encrypted</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 max-w-2xl text-center px-4"
      >
        <p className="text-slate-500 text-sm italic">
          Clickjacking (UI redressing) is a security threat where an attacker uses multiple transparent or opaque layers to trick a user into clicking on a button or link on another page when they were intending to click on the top level page.
        </p>
      </motion.div>
    </div>
  );
}
