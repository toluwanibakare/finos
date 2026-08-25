import { useEffect, useState } from 'react'
import { useStore } from '../../store/useStore'

interface SplashScreenProps {
  onFinish: () => void
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const darkMode = useStore((s) => s.darkMode)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(false), 1400)
    const t2 = setTimeout(onFinish, 1800)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onFinish])

  return (
    <div className={`fixed inset-0 z-[300] flex flex-col items-center justify-center transition-colors duration-500 ${
      darkMode ? 'bg-[#0B1320]' : 'bg-white'
    }`}>
      <div className={`transition-all duration-700 ${visible ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}>
        <img src="/logo.PNG" alt="RUNDA" className="w-24 h-24 rounded-[28px] object-contain" />
      </div>
    </div>
  )
}
