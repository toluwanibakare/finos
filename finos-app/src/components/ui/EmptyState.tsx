import { FinosIcon } from '../icons/FinosIcons'

interface EmptyStateProps {
  icon: string
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}>
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 mb-5">
        <FinosIcon name={icon} size={28} className="text-gray-300" />
      </div>
      <h3 className="text-[15px] font-semibold text-[#0A1628] mb-1.5">{title}</h3>
      <p className="text-[13px] text-gray-400 leading-relaxed max-w-[260px] mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-2.5 bg-[#0A1628] text-white text-[13px] font-semibold rounded-xl hover:bg-[#1E3A7A] active:bg-[#2E5196] transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
