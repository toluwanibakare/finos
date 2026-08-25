import { useEffect, useState } from 'react'

interface SplashScreenProps {
  onFinish: () => void
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [phase, setPhase] = useState<'logo' | 'text' | 'done'>('logo')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'), 600)
    const t2 = setTimeout(() => setPhase('done'), 1800)
    const t3 = setTimeout(onFinish, 2200)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onFinish])

  return (
    <div className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-[#0B1320]">
      <div className={`transition-all duration-700 ${phase === 'logo' ? 'scale-100 opacity-100' : 'scale-110 opacity-80'}`}>
        <img src="/logo.PNG" alt="RUNDA" className="w-24 h-24 rounded-[28px] object-cover animate-scale-in" />
      </div>

      <div className={`mt-6 transition-all duration-500 ${
        phase !== 'logo' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}>
        <h1 className="text-[28px] font-bold text-white tracking-[-0.03em]">RUNDA</h1>
      </div>

      <div className={`mt-2 transition-all duration-500 delay-100 ${
        phase !== 'logo' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}>
        <p className="text-[12px] text-white/30 font-medium">Every naira should have a job</p>
      </div>

      <div className={`mt-12 transition-all duration-500 delay-300 ${
        phase === 'done' ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className="w-8 h-8 border-2 border-white/10 border-t-[#E8B931] rounded-full animate-spin" />
      </div>
    </div>
  )
}
