import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ShieldAlert, Smartphone, ArrowRight, Loader2, Lock, CheckCircle2 } from 'lucide-react';

interface CheckResult {
  status: 'success' | 'error';
  message: string;
  details?: string;
}

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);

  const handleCheck = async (e: FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();
      
      // Artificial delay for "scanning" effect
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setResult(data);
    } catch (error) {
      setResult({
        status: 'error',
        message: 'Failed to connect to security server.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-900 via-slate-950 to-black flex flex-col items-center justify-center p-4 font-sans">
      {/* Background Decorative Elements */}
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
        {/* Header Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-indigo-600/20 border border-indigo-500/30 mb-6 shadow-2xl shadow-indigo-500/20"
          >
            <ShieldCheck className="w-10 h-10 text-indigo-400" />
          </motion.div>
          <h1 className="text-4xl font-display font-bold tracking-tight text-white mb-3">
            Security Checker
          </h1>
          <p className="text-slate-400 text-lg">
            Verify your mobile device's protection against clickjacking attacks.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleCheck} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-slate-300 ml-1">
                Phone Number
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Smartphone className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number..."
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !phoneNumber.trim()}
              className="w-full relative overflow-hidden group bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
            >
              {isLoading ? (
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

          {/* Results Area */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className={`p-6 rounded-2xl border ${
                  result.status === 'success' 
                    ? 'bg-emerald-500/10 border-emerald-500/20' 
                    : 'bg-rose-500/10 border-rose-500/20'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 p-2 rounded-full ${
                      result.status === 'success' ? 'bg-emerald-500/20' : 'bg-rose-500/20'
                    }`}>
                      {result.status === 'success' ? (
                        <CheckCircle2 className={`w-6 h-6 ${result.status === 'success' ? 'text-emerald-400' : 'text-rose-400'}`} />
                      ) : (
                        <ShieldAlert className="w-6 h-6 text-rose-400" />
                      )}
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg ${
                        result.status === 'success' ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {result.message}
                      </h3>
                      {result.details && (
                        <p className="text-slate-400 mt-1 text-sm leading-relaxed">
                          {result.details}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Info */}
        <div className="mt-8 flex items-center justify-center gap-6 text-slate-500 text-xs uppercase tracking-widest font-semibold">
          <div className="flex items-center gap-2">
            <Lock className="w-3 h-3" />
            <span>End-to-End Encrypted</span>
          </div>
          <div className="w-1 h-1 bg-slate-800 rounded-full" />
          <span>Demo Environment</span>
        </div>
      </motion.div>

      {/* Educational Tooltip/Section */}
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
