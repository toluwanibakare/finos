import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { userProfile } from '../data/mockData'
import { getGreeting } from '../lib/utils'
import { PageContainer } from '../components/layout/PageContainer'
import { BalanceCard } from '../components/ui/BalanceCard'
import { QuickAction } from '../components/ui/QuickAction'
import { PoolCard } from '../components/ui/PoolCard'
import { TransactionRow } from '../components/ui/TransactionRow'

export default function Home() {
  const navigate = useNavigate()
  const pools = useStore((s) => s.pools)
  const transactions = useStore((s) => s.transactions)
  const recentTxns = transactions.slice(0, 5)

  return (
    <PageContainer>
      <div className="pt-2 pb-4">
        <p className="text-[13px] text-gray-400 font-medium">
          {getGreeting()}, {userProfile.name}
        </p>
      </div>

      <section className="animate-fade-in" style={{ animationDelay: '0ms' }}>
        <BalanceCard />
      </section>

      <section className="mt-6 animate-fade-in" style={{ animationDelay: '80ms' }}>
        <div className="grid grid-cols-4 gap-3">
          <QuickAction
            icon="arrow-down-left"
            label="Add Income"
            onClick={() => navigate('/add-income')}
          />
          <QuickAction
            icon="arrow-up-right"
            label="Add Expense"
            onClick={() => navigate('/add-expense')}
          />
          <QuickAction
            icon="arrow-left-right"
            label="Transfer"
            onClick={() => navigate('/withdrawal')}
          />
          <QuickAction
            icon="shuffle"
            label="Allocate"
            onClick={() => navigate('/allocation-policy')}
          />
        </div>
      </section>

      <section className="mt-7 animate-fade-in" style={{ animationDelay: '160ms' }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-semibold text-[#0A1628]">Pools</h2>
          <button
            onClick={() => navigate('/money')}
            className="text-[12px] font-medium text-navy-500"
          >
            See all
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-2">
          {pools.map((pool) => (
            <div key={pool.id} className="min-w-[240px] max-w-[260px] shrink-0">
              <PoolCard pool={pool} onClick={() => navigate(`/pool/${pool.id}`)} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-7 animate-fade-in" style={{ animationDelay: '240ms' }}>
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-[14px] font-semibold text-[#0A1628]">Recent Activity</h2>
          <button
            onClick={() => navigate('/activity')}
            className="text-[12px] font-medium text-navy-500"
          >
            See all
          </button>
        </div>
        <div className="bg-white rounded-2xl divide-y divide-gray-100 shadow-sm border border-gray-100 overflow-hidden">
          {recentTxns.map((txn) => (
            <TransactionRow
              key={txn.id}
              transaction={txn}
              onClick={() => navigate(`/transaction/${txn.id}`)}
            />
          ))}
        </div>
      </section>

      <div className="h-4" />
    </PageContainer>
  )
}
