import { useParams, useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import {
  formatNaira,
  formatDate,
  getProgressPercent,
  getEstimatedCompletion,
} from '../lib/utils'
import { PageContainer } from '../components/layout/PageContainer'
import { Header } from '../components/layout/Header'
import { ProgressIndicator } from '../components/ui/ProgressIndicator'
import { EmptyState } from '../components/ui/EmptyState'
import { FinosIcon } from '../components/icons/FinosIcons'

const stateConfig: Record<string, { label: string; className: string; color: string }> = {
  active: { label: 'Active', className: 'bg-emerald-50 text-emerald-600', color: '#2E5196' },
  completed: { label: 'Completed', className: 'bg-blue-50 text-blue-600', color: '#10B981' },
  paused: { label: 'Paused', className: 'bg-amber-50 text-amber-600', color: '#F59E0B' },
  cancelled: { label: 'Cancelled', className: 'bg-gray-100 text-gray-500', color: '#9CA3AF' },
}

export default function GoalDetail() {
  const { goalId } = useParams<{ goalId: string }>()
  const navigate = useNavigate()
  const goals = useStore((s) => s.goals)
  const transactions = useStore((s) => s.transactions)

  const goal = goals.find((g) => g.id === goalId)

  if (!goal) {
    return (
      <PageContainer>
        <Header title="Goal" showBack />
        <EmptyState
          icon="target"
          title="Goal not found"
          description="This goal does not exist or has been removed."
        />
      </PageContainer>
    )
  }

  const percent = getProgressPercent(goal.currentAmount, goal.targetAmount)
  const stateInfo = stateConfig[goal.state]
  const estimated = getEstimatedCompletion(
    goal.currentAmount,
    goal.targetAmount,
    goal.contributionRate
  )
  const remaining = goal.targetAmount - goal.currentAmount
  const goalTransactions = transactions.filter((t) => t.poolId === goal.poolId).slice(0, 10)

  return (
    <PageContainer>
      <Header title={goal.name} showBack />

      <div className="pt-4 space-y-4">
        <div className="bg-[#0A1628] rounded-2xl p-6 text-white shadow-lg animate-fade-in">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[12px] text-gray-300 font-medium">Progress</p>
              <p className="text-2xl font-bold tracking-tight mt-0.5">{percent}%</p>
            </div>
            <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${stateInfo.className}`}>
              {stateInfo.label}
            </span>
          </div>
          <ProgressIndicator
            percent={percent}
            color={stateInfo.color}
            height={8}
          />
          <div className="flex items-center justify-between mt-4">
            <div>
              <p className="text-[11px] text-gray-400">Saved</p>
              <p className="text-[15px] font-semibold">{formatNaira(goal.currentAmount)}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-gray-400">Target</p>
              <p className="text-[15px] font-semibold">{formatNaira(goal.targetAmount)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: '80ms' }}>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-[11px] text-gray-400 font-medium mb-1">Remaining</p>
            <p className="text-[14px] font-semibold text-[#0A1628]">
              {remaining > 0 ? formatNaira(remaining) : 'Achieved'}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-[11px] text-gray-400 font-medium mb-1">Monthly Rate</p>
            <p className="text-[14px] font-semibold text-[#0A1628]">
              {formatNaira(goal.contributionRate)}/mo
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-[11px] text-gray-400 font-medium mb-1">Est. Completion</p>
            <p className="text-[14px] font-semibold text-[#0A1628]">
              {goal.state === 'completed' ? 'Completed' : estimated}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-[11px] text-gray-400 font-medium mb-1">Created</p>
            <p className="text-[14px] font-semibold text-[#0A1628]">{formatDate(goal.createdAt)}</p>
          </div>
        </div>

        {goal.deadline && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 animate-fade-in" style={{ animationDelay: '160ms' }}>
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-navy-50 shrink-0">
              <FinosIcon name="calendar" size={16} className="text-navy-500" />
            </div>
            <div className="flex-1">
              <p className="text-[12px] text-gray-400 font-medium">Deadline</p>
              <p className="text-[13px] font-semibold text-[#0A1628]">{formatDate(goal.deadline)}</p>
            </div>
          </div>
        )}

        <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <h3 className="text-[14px] font-semibold text-[#0A1628] mb-3">Recent Activity</h3>
          {goalTransactions.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
              <p className="text-[13px] text-gray-400">No transactions linked to this goal yet.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {goalTransactions.map((txn) => (
                <button
                  key={txn.id}
                  onClick={() => navigate(`/transaction/${txn.id}`)}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left border-b border-gray-50 last:border-0 active:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-[#0A1628] truncate">{txn.description}</p>
                    <p className="text-[11px] text-gray-400">{formatDate(txn.date)}</p>
                  </div>
                  <span className="text-[12px] font-semibold text-[#0A1628] tabular-nums">
                    {formatNaira(txn.amount)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-4" />
    </PageContainer>
  )
}
