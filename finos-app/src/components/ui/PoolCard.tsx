import type { Pool } from '../../types'
import { formatNaira, formatPercent } from '../../lib/utils'
import { FinosIcon } from '../icons/FinosIcons'

interface PoolCardProps {
  pool: Pool
  onClick?: (pool: Pool) => void
}

const restrictionLabels: Record<string, string> = {
  restricted: 'Locked',
  goal_locked: 'Goal Locked',
  reason_required: 'Reason Required',
  proof_required: 'Proof Required',
  cooldown_required: 'Cooldown',
}

export function PoolCard({ pool, onClick }: PoolCardProps) {
  const isRestricted = pool.restriction !== 'available'

  return (
    <button
      onClick={() => onClick?.(pool)}
      className="flex items-center gap-3 w-full bg-white rounded-xl p-4 text-left transition-all active:scale-[0.98] shadow-sm border border-gray-100"
    >
      <div
        className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
        style={{ backgroundColor: pool.color + '14' }}
      >
        <span style={{ color: pool.color }}>
          <FinosIcon name={pool.icon} size={20} className="shrink-0" />
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-[#0A1628] truncate">{pool.name}</span>
          {isRestricted && (
            <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full whitespace-nowrap">
              {restrictionLabels[pool.restriction]}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[12px] text-gray-500">{formatPercent(pool.allocationPercentage)}</span>
        </div>
      </div>

      <span className="text-[14px] font-semibold text-[#0A1628] tabular-nums whitespace-nowrap">
        {formatNaira(pool.balance)}
      </span>
    </button>
  )
}
