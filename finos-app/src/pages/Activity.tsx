import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import type { TransactionType } from '../types'
import { formatDate } from '../lib/utils'
import { PageContainer } from '../components/layout/PageContainer'
import { Header } from '../components/layout/Header'
import { TransactionRow } from '../components/ui/TransactionRow'
import { EmptyState } from '../components/ui/EmptyState'
import { FinosIcon } from '../components/icons/FinosIcons'

const filterTabs: { key: TransactionType | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'income', label: 'Income' },
  { key: 'expense', label: 'Expenses' },
  { key: 'allocation', label: 'Allocations' },
  { key: 'transfer', label: 'Transfers' },
]

export default function Activity() {
  const navigate = useNavigate()
  const transactions = useStore((s) => s.transactions)
  const [activeFilter, setActiveFilter] = useState<TransactionType | 'all'>('all')
  const [showDateFilter, setShowDateFilter] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const filtered = useMemo(() => {
    let result = transactions
    if (activeFilter !== 'all') {
      result = result.filter((t) => t.type === activeFilter)
    }
    if (startDate) {
      result = result.filter((t) => t.date >= startDate)
    }
    if (endDate) {
      result = result.filter((t) => t.date <= endDate)
    }
    return result
  }, [transactions, activeFilter, startDate, endDate])

  const grouped = useMemo(() => {
    const groups: Record<string, typeof filtered> = {}
    for (const txn of filtered) {
      const key = txn.date
      if (!groups[key]) groups[key] = []
      groups[key].push(txn)
    }
    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a))
  }, [filtered])

  const hasActiveFilters = activeFilter !== 'all' || startDate || endDate

  const clearFilters = () => {
    setActiveFilter('all')
    setStartDate('')
    setEndDate('')
  }

  return (
    <PageContainer>
      <Header title="Activity" />

      <div className="pt-4">
        <div className="flex items-center gap-2 mb-3 overflow-x-auto hide-scrollbar -mx-4 px-4">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-colors ${
                activeFilter === tab.key
                  ? 'bg-[#0A1628] text-white'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            onClick={() => setShowDateFilter(!showDateFilter)}
            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-colors ${
              showDateFilter ? 'bg-navy-500 text-white' : 'bg-gray-100 text-gray-500'
            }`}
          >
            <FinosIcon name="calendar" size={14} />
            Date
          </button>
        </div>

        {showDateFilter && (
          <div className="flex gap-3 mb-4 animate-slide-down px-1">
            <div className="flex-1">
              <label className="text-[11px] text-gray-400 font-medium block mb-1">From</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-[13px] text-[#0A1628] outline-none focus:border-navy-500 transition-colors"
              />
            </div>
            <div className="flex-1">
              <label className="text-[11px] text-gray-400 font-medium block mb-1">To</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-[13px] text-[#0A1628] outline-none focus:border-navy-500 transition-colors"
              />
            </div>
            {hasActiveFilters && (
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="px-3 py-2 text-[12px] font-medium text-red-500 bg-red-50 rounded-xl"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        )}

        {grouped.length === 0 ? (
          <EmptyState
            icon="receipt"
            title="No transactions"
            description="Your transactions will appear here once you start using your pools."
          />
        ) : (
          <div className="space-y-4">
            {grouped.map(([date, txns]) => (
              <div key={date}>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1 px-1">
                  {formatDate(date)}
                </p>
                <div className="bg-white rounded-2xl divide-y divide-gray-100 shadow-sm border border-gray-100 overflow-hidden">
                  {txns.map((txn) => (
                    <TransactionRow
                      key={txn.id}
                      transaction={txn}
                      onClick={() => navigate(`/transaction/${txn.id}`)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="h-4" />
    </PageContainer>
  )
}
