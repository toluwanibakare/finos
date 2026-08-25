import { FinosIcon } from '../icons/FinosIcons'

interface QuickActionProps {
  icon: string
  label: string
  onClick?: () => void
  className?: string
}

export function QuickAction({ icon, label, onClick, className = '' }: QuickActionProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-2 ${className}`}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#0A1628]/5 text-[#0A1628] transition-all active:scale-95 active:bg-[#0A1628]/10">
        <FinosIcon name={icon} size={22} />
      </div>
      <span className="text-[11px] font-medium text-gray-600 leading-tight text-center">
        {label}
      </span>
    </button>
  )
}
