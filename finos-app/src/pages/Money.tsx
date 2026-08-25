import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { formatNaira, formatPercent } from '../lib/utils'
import { PageContainer } from '../components/layout/PageContainer'
import { Header } from '../components/layout/Header'
import { FinosIcon } from '../components/icons/FinosIcons'
import { ProgressIndicator } from '../components/ui/ProgressIndicator'

export default function Money() {
  const navigate = useNavigate()
  const pools = useStore((s) => s.pools)
  const getTotalBalance = useStore((s) => s.getTotalBalance)
  const getAvailableBalance = useStore((s) => s.getAvailableBalance)
  const getReservedBalance = useStore((s) => s.getReservedBalance)
  const getMonthlyIncome = useStore((s) => s.getMonthlyIncome)
  const getMonthlySpending = useStore((s) => s.getMonthlySpending)

  const total = getTotalBalance()
  const available = getAvailableBalance()
  const reserved = getReservedBalance()
  const monthlyIncome = getMonthlyIncome()
  const monthlySpending = getMonthlySpending()
  const monthlySavings = monthlyIncome - monthlySpending

  const savingsPools = pools.filter((p) => p.type === 'savings' || p.type === 'emergency')
  const investmentPools = pools.filter((p) => p.type === 'investment')
  const savingsTotal = savingsPools.reduce((s, p) => s + p.balance, 0)
  const investmentTotal = investmentPools.reduce((s, p) => s + p.balance, 0)

  return (
    <PageContainer>
      <Header title="Money" />

      <div className="pt-4 space-y-4">
        <div className="bg-[#0A1628] rounded-2xl p-6 text-white shadow-lg animate-fade-in">
          <p className="text-[13px] text-gray-300 font-medium mb-1">Total Balance</p>
          <p className="text-3xl font-bold tracking-tight mb-4">{formatNaira(total)}</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-xl p-3">
              <span className="text-[11px] text-gray-400 font-medium block mb-1">Available</span>
              <p className="text-sm font-semibold">{formatNaira(available)}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <span className="text-[11px] text-gray-400 font-medium block mb-1">Reserved</span>
              <p className="text-sm font-semibold">{formatNaira(reserved)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 animate-fade-in" style={{ animationDelay: '80ms' }}>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-[11px] text-gray-400 font-medium mb-1">Savings</p>
            <p className="text-[14px] font-semibold text-[#0A1628]">{formatNaira(savingsTotal)}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-[11px] text-gray-400 font-medium mb-1">Investments</p>
            <p className="text-[14px] font-semibold text-[#0A1628]">{formatNaira(investmentTotal)}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-[11px] text-gray-400 font-medium mb-1">Emergency</p>
            <p className="text-[14px] font-semibold text-[#0A1628]">{formatNaira(50000)}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-fade-in" style={{ animationDelay: '160ms' }}>
          <h3 className="text-[14px] font-semibold text-[#0A1628] mb-4">This Month</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-emerald-50">
                  <FinosIcon name="arrow-down-left" size={16} className="text-emerald-500" />
                </div>
                <div>
                  <p className="text-[12px] text-gray-400 font-medium">Income</p>
                  <p className="text-[14px] font-semibold text-[#0A1628]">{formatNaira(monthlyIncome)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-red-50">
                  <FinosIcon name="arrow-up-right" size={16} className="text-red-500" />
                </div>
                <div>
                  <p className="text-[12px] text-gray-400 font-medium">Spending</p>
                  <p className="text-[14px] font-semibold text-[#0A1628]">{formatNaira(monthlySpending)}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] text-gray-400 font-medium">Net Savings</span>
                <span className="text-[13px] font-semibold text-[#0A1628]">{formatNaira(monthlySavings)}</span>
              </div>
              <ProgressIndicator
                percent={monthlyIncome > 0 ? Math.round((monthlySavings / monthlyIncome) * 100) : 0}
                color="#10B981"
                height={4}
              />
            </div>
          </div>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '240ms' }}>
          <h3 className="text-[14px] font-semibold text-[#0A1628] mb-3">All Pools</h3>
          <div className="bg-white rounded-2xl divide-y divide-gray-100 shadow-sm border border-gray-100 overflow-hidden">
            {pools.map((pool) => (
              <button
                key={pool.id}
                onClick={() => navigate(`/pool/${pool.id}`)}
                className="flex items-center gap-3 w-full px-4 py-3.5 text-left active:bg-gray-50 transition-colors"
              >
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0"
                  style={{ backgroundColor: pool.color + '14' }}
                >
                  <span style={{ color: pool.color }}>
                    <FinosIcon name={pool.icon} size={18} />
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#0A1628] truncate">{pool.name}</p>
                  <p className="text-[11px] text-gray-400">{formatPercent(pool.allocationPercentage)} allocation</p>
                </div>
                <span className="text-[13px] font-semibold text-[#0A1628] tabular-nums">
                  {formatNaira(pool.balance)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-4" />
    </PageContainer>
  )
}
