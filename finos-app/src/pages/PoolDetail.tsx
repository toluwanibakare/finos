import { useParams, useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { formatNaira, formatPercent } from '../lib/utils'
import { PageContainer } from '../components/layout/PageContainer'
import { Header } from '../components/layout/Header'
import { FinosIcon } from '../components/icons/FinosIcons'
import { TransactionRow } from '../components/ui/TransactionRow'
import { ProgressIndicator } from '../components/ui/ProgressIndicator'
import { EmptyState } from '../components/ui/EmptyState'

export default function PoolDetail() {
  const { poolId } = useParams<{ poolId: string }>()
  const navigate = useNavigate()
  const pools = useStore((s) => s.pools)
  const transactions = useStore((s) => s.transactions)
  const goals = useStore((s) => s.goals)

  const pool = pools.find((p) => p.id === poolId)

  if (!pool) {
    return (
      <PageContainer>
        <Header title="Pool" showBack />
        <EmptyState
          icon="alert-circle"
          title="Pool not found"
          description="This pool does not exist or has been removed."
        />
      </PageContainer>
    )
  }

  const poolTxns = transactions.filter((t) => t.poolId === pool.id).slice(0, 10)
  const linkedGoal = goals.find((g) => g.poolId === pool.id)
  const isRestricted = pool.restriction !== 'available'

  return (
    <PageContainer>
      <Header title={pool.name} showBack />

      <div className="pt-4 space-y-4">
        <div className="flex items-center gap-4 animate-fade-in">
          <div
            className="flex items-center justify-center w-14 h-14 rounded-2xl shrink-0"
            style={{ backgroundColor: pool.color + '14' }}
          >
            <span style={{ color: pool.color }}>
              <FinosIcon name={pool.icon} size={28} />
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[18px] font-bold text-[#0A1628]">{pool.name}</h2>
            <p className="text-[12px] text-gray-400 mt-0.5">
              {formatPercent(pool.allocationPercentage)} of income
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-fade-in" style={{ animationDelay: '60ms' }}>
          <p className="text-[12px] text-gray-400 font-medium mb-1">Balance</p>
          <p className="text-2xl font-bold text-[#0A1628] tracking-tight">{formatNaira(pool.balance)}</p>
          <div className="mt-3">
            <ProgressIndicator
              percent={pool.allocationPercentage}
              color={pool.color}
              height={4}
            />
          </div>
        </div>

        {isRestricted && (
          <div
            className="bg-amber-50 border border-amber-100 rounded-2xl p-4 animate-fade-in"
            style={{ animationDelay: '120ms' }}
          >
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 shrink-0 mt-0.5">
                <FinosIcon name="alert-circle" size={16} className="text-amber-600" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-amber-800">Restricted Pool</p>
                <p className="text-[12px] text-amber-600 mt-0.5 leading-relaxed">
                  {pool.restrictionMessage || 'This pool has withdrawal restrictions.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {linkedGoal && (
          <div
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 animate-fade-in"
            style={{ animationDelay: '120ms' }}
          >
            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-2">Linked Goal</p>
            <button
              onClick={() => navigate(`/goal/${linkedGoal.id}`)}
              className="flex items-center gap-3 w-full text-left"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-navy-50 shrink-0">
                <FinosIcon name="target" size={16} className="text-navy-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[#0A1628]">{linkedGoal.name}</p>
                <p className="text-[11px] text-gray-400">
                  {formatNaira(linkedGoal.currentAmount)} / {formatNaira(linkedGoal.targetAmount)}
                </p>
              </div>
              <FinosIcon name="chevron-right" size={16} className="text-gray-300" />
            </button>
          </div>
        )}

        <div className="animate-fade-in" style={{ animationDelay: '180ms' }}>
          <h3 className="text-[14px] font-semibold text-[#0A1628] mb-3">Transactions</h3>
          {poolTxns.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
              <p className="text-[13px] text-gray-400">No transactions for this pool yet.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl divide-y divide-gray-100 shadow-sm border border-gray-100 overflow-hidden">
              {poolTxns.map((txn) => (
                <TransactionRow
                  key={txn.id}
                  transaction={txn}
                  onClick={() => navigate(`/transaction/${txn.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-4" />
    </PageContainer>
  )
}
