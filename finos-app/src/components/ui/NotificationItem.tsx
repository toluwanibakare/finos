import type { Notification } from '../../types'
import { formatDate } from '../../lib/utils'
import { FinosIcon } from '../icons/FinosIcons'

interface NotificationItemProps {
  notification: Notification
  onClick?: (n: Notification) => void
}

const typeIcons: Record<string, string> = {
  income: 'arrow-down-left',
  goal: 'target',
  restriction: 'alert-circle',
  withdrawal: 'arrow-up-right',
  system: 'info',
}

const typeColors: Record<string, string> = {
  income: 'text-emerald-500 bg-emerald-50',
  goal: 'text-blue-500 bg-blue-50',
  restriction: 'text-amber-500 bg-amber-50',
  withdrawal: 'text-red-500 bg-red-50',
  system: 'text-gray-500 bg-gray-100',
}

export function NotificationItem({ notification, onClick }: NotificationItemProps) {
  const icon = typeIcons[notification.type] || 'info'
  const colorClass = typeColors[notification.type] || typeColors.system

  return (
    <button
      onClick={() => onClick?.(notification)}
      className={`flex items-start gap-3 w-full py-4 text-left transition-colors active:bg-gray-50 ${
        !notification.read ? 'bg-blue-50/30' : ''
      }`}
    >
      <div className={`flex items-center justify-center w-9 h-9 rounded-full shrink-0 ${colorClass}`}>
        <FinosIcon name={icon} size={16} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={`text-[13px] leading-snug ${!notification.read ? 'font-semibold text-[#0A1628]' : 'font-medium text-gray-700'}`}>
            {notification.title}
          </p>
          {!notification.read && (
            <span className="w-2 h-2 rounded-full bg-[#2E5196] shrink-0 mt-1.5" />
          )}
        </div>
        <p className="text-[12px] text-gray-400 mt-0.5 line-clamp-2">
          {notification.body}
        </p>
        <p className="text-[11px] text-gray-300 mt-1.5">
          {formatDate(notification.date)}
        </p>
      </div>
    </button>
  )
}
