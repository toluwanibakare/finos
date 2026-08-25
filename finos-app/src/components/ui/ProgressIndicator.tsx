import { useEffect, useState } from 'react'

interface ProgressIndicatorProps {
  percent: number
  color?: string
  height?: number
  label?: string
  className?: string
}

export function ProgressIndicator({
  percent,
  color = '#2E5196',
  height = 8,
  label,
  className = '',
}: ProgressIndicatorProps) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setWidth(Math.min(Math.max(percent, 0), 100))
    })
    return () => cancelAnimationFrame(timer)
  }, [percent])

  return (
    <div className={className}>
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[12px] font-medium text-gray-500">{label}</span>
          <span className="text-[12px] font-semibold text-[#0A1628]">{percent}%</span>
        </div>
      )}
      <div
        className="w-full bg-gray-100 rounded-full overflow-hidden"
        style={{ height }}
      >
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${width}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  )
}
