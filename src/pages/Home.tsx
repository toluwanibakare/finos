import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { userProfile } from '../data/mockData'
import { getGreeting } from '../lib/utils'
import { PageContainer } from '../components/layout/PageContainer'
import { BalanceCard } from '../components/ui/BalanceCard'
import { QuickAction } from '../components/ui/QuickAction'
import { PoolCard } from '../components/ui/PoolCard'
import { TransactionRow } from '../components/ui/TransactionRow'
import { FinosIcon } from '../components/icons/FinosIcons'

export default function Home() {
  const navigate = useNavigate()
  const pools = useStore((s) => s.pools)
  const transactions = useStore((s) => s.transactions)
  const recentTxns = transactions.slice(0, 5)

  const topLevelPools = pools.filter((p) => !p.parentId)

  return (
    <PageContainer padded={false}>
      <div className="flex items-center justify-between px-4 pt-2 pb-3">
        <div>
          <p className="text-[20px] font-bold text-[#0B1320] tracking-[-0.02em]">
            {getGreeting()}, <span className="text-gray-400 font-medium">{userProfile.name}</span>
          </p>
        </div>
        <button
          onClick={() => navigate('/more')}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 active:bg-gray-200 transition-colors duration-150"
        >
          <FinosIcon name="user" size={18} className="text-gray-500" />
        </button>
      </div>

      <section className="px-4 animate-fade-in" style={{ animationDelay: '0ms' }}>
        <BalanceCard />
      </section>

      <section className="mt-7 px-4 animate-fade-in" style={{ animationDelay: '80ms' }}>
        <div className="grid grid-cols-4 gap-2">
          <QuickAction
            icon="arrow-down-left"
            label="Income"
            onClick={() => navigate('/add-income')}
          />
          <QuickAction
            icon="arrow-up-right"
            label="Expense"
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

      <section className="mt-8 animate-fade-in" style={{ animationDelay: '160ms' }}>
        <div className="flex items-center justify-between mb-3 px-4">
          <h2 className="text-[14px] font-bold text-[#0B1320] tracking-[-0.01em]">Pools</h2>
          <button
            onClick={() => navigate('/money')}
            className="text-[12px] font-bold text-[#0B1320] opacity-40"
          >
            See all
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-2">
          {topLevelPools.map((pool) => (
            <div key={pool.id} className="min-w-[240px] max-w-[260px] shrink-0">
              <PoolCard pool={pool} onClick={() => navigate(`/pool/${pool.id}`)} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 animate-fade-in" style={{ animationDelay: '240ms' }}>
        <div className="flex items-center justify-between mb-3 px-4">
          <h2 className="text-[14px] font-bold text-[#0B1320] tracking-[-0.01em]">Recent Activity</h2>
          <button
            onClick={() => navigate('/activity')}
            className="text-[12px] font-bold text-[#0B1320] opacity-40"
          >
            See all
          </button>
        </div>
        <div className="bg-white rounded-[20px] divide-y divide-gray-100 overflow-hidden mx-4">
          {recentTxns.map((txn) => (
            <TransactionRow
              key={txn.id}
              transaction={txn}
              onClick={() => navigate(`/transaction/${txn.id}`)}
            />
          ))}
        </div>
      </section>

      <div className="h-6" />
    </PageContainer>
  )
}
