import type { SavingsGoal } from '../../types'
import { formatNaira, getProgressPercent, getEstimatedCompletion } from '../../lib/utils'
import { ProgressIndicator } from './ProgressIndicator'

interface GoalCardProps {
  goal: SavingsGoal
  onClick?: (goal: SavingsGoal) => void
}

const stateConfig: Record<string, { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-emerald-50 text-emerald-600' },
  completed: { label: 'Completed', className: 'bg-blue-50 text-blue-600' },
  paused: { label: 'Paused', className: 'bg-amber-50 text-amber-600' },
  cancelled: { label: 'Cancelled', className: 'bg-gray-100 text-gray-500' },
}

const stateColors: Record<string, string> = {
  active: '#2E5196',
  completed: '#10B981',
  paused: '#F59E0B',
  cancelled: '#9CA3AF',
}

export function GoalCard({ goal, onClick }: GoalCardProps) {
  const percent = getProgressPercent(goal.currentAmount, goal.targetAmount)
  const stateInfo = stateConfig[goal.state]
  const color = stateColors[goal.state]
  const estimated = getEstimatedCompletion(goal.currentAmount, goal.targetAmount, goal.contributionRate)

  return (
    <button
      onClick={() => onClick?.(goal)}
      className="w-full bg-white rounded-2xl p-5 text-left shadow-sm border border-gray-100 transition-all active:scale-[0.98]"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-semibold text-[#0A1628] truncate">{goal.name}</h3>
          <p className="text-[12px] text-gray-400 mt-0.5">
            Target: {formatNaira(goal.targetAmount)}
          </p>
        </div>
        <span className={`text-[10px] font-semibold px-2 py-1 rounded-full whitespace-nowrap ${stateInfo.className}`}>
          {stateInfo.label}
        </span>
      </div>

      <ProgressIndicator percent={percent} color={color} height={6} className="mb-3" />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-[14px] font-semibold text-[#0A1628]">{formatNaira(goal.currentAmount)}</p>
          <p className="text-[11px] text-gray-400">{percent}% saved</p>
        </div>
        <div className="text-right">
          {goal.deadline && (
            <p className="text-[11px] text-gray-400">
              {goal.state === 'completed' ? 'Completed' : `Est. ${estimated}`}
            </p>
          )}
          <p className="text-[11px] text-gray-400">
            {formatNaira(goal.contributionRate)}/mo
          </p>
        </div>
      </div>
    </button>
  )
}
