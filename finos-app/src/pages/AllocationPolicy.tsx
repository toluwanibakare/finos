import { useState, useMemo } from 'react'
import { useStore } from '../store/useStore'
import { formatNaira } from '../lib/utils'
import { PageContainer } from '../components/layout/PageContainer'
import { Header } from '../components/layout/Header'
import { FinosIcon } from '../components/icons/FinosIcons'

const PREVIEW_INCOME = 500000

export default function AllocationPolicy() {
  const { policies, pools, updatePolicy } = useStore()
  const activePolicy = policies.find((p) => p.isDefault)

  const [allocations, setAllocations] = useState(() =>
    activePolicy
      ? activePolicy.allocations.map((a) => ({ ...a }))
      : []
  )

  const totalPercent = useMemo(
    () => allocations.reduce((s, a) => s + a.percentage, 0),
    [allocations]
  )

  const isValid = totalPercent === 100

  const updatePercentage = (poolId: string, value: number) => {
    setAllocations((prev) =>
      prev.map((a) => (a.poolId === poolId ? { ...a, percentage: value } : a))
    )
  }

  const handleSave = () => {
    if (!activePolicy || !isValid) return
    updatePolicy(activePolicy.id, { allocations })
  }

  return (
    <PageContainer>
      <Header title="Allocation Policy" showBack />

      <div className="pt-4 space-y-5">
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-[15px] font-semibold text-[#0A1628]">
              {activePolicy?.name || 'Allocation Policy'}
            </h2>
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
              isValid ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
            }`}>
              {totalPercent}% / 100%
            </span>
          </div>
          <p className="text-[12px] text-gray-400">
            Adjust how your income is distributed across pools.
          </p>
        </div>

        <div className="space-y-2 animate-fade-in" style={{ animationDelay: '80ms' }}>
          {allocations.map((alloc) => {
            const pool = pools.find((p) => p.id === alloc.poolId)
            const previewAmount = Math.round((PREVIEW_INCOME * alloc.percentage) / 100)
            return (
              <div key={alloc.poolId} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  {pool && (
                    <div
                      className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                      style={{ backgroundColor: pool.color + '14' }}
                    >
                      <span style={{ color: pool.color }}>
                        <FinosIcon name={pool.icon} size={16} />
                      </span>
                    </div>
                  )}
                  <span className="flex-1 text-[13px] font-semibold text-[#0A1628]">{alloc.poolName}</span>
                  <span className="text-[13px] font-bold text-[#0A1628]">{alloc.percentage}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={alloc.percentage}
                  onChange={(e) => updatePercentage(alloc.poolId, parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-gray-100 rounded-full appearance-none cursor-pointer accent-[#0A1628]"
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] text-gray-400">
                    0%
                  </span>
                  <span className="text-[11px] text-gray-400">
                    If {formatNaira(PREVIEW_INCOME)}: {formatNaira(previewAmount)}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    100%
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 animate-fade-in" style={{ animationDelay: '160ms' }}>
          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-3">
            Live Preview — If {formatNaira(PREVIEW_INCOME)} enters your account
          </p>
          <div className="space-y-2">
            {allocations.filter((a) => a.percentage > 0).map((alloc) => {
              const previewAmount = Math.round((PREVIEW_INCOME * alloc.percentage) / 100)
              const pool = pools.find((p) => p.id === alloc.poolId)
              return (
                <div key={alloc.poolId} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: pool?.color || '#64748B' }}
                    />
                    <span className="text-[12px] text-gray-500">{alloc.poolName}</span>
                  </div>
                  <span className="text-[12px] font-semibold text-[#0A1628]">{formatNaira(previewAmount)}</span>
                </div>
              )
            })}
          </div>
          <div className="border-t border-gray-100 mt-3 pt-3 flex items-center justify-between">
            <span className="text-[12px] font-semibold text-gray-500">Total</span>
            <span className={`text-[13px] font-bold ${isValid ? 'text-emerald-600' : 'text-red-500'}`}>
              {formatNaira(
                allocations.reduce(
                  (s, a) => s + Math.round((PREVIEW_INCOME * a.percentage) / 100),
                  0
                )
              )}
            </span>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={!isValid}
          className="w-full bg-[#0A1628] text-white text-[14px] font-semibold py-3.5 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed active:bg-navy-700 animate-fade-in"
          style={{ animationDelay: '240ms' }}
        >
          Save Policy
        </button>
      </div>

      <div className="h-4" />
    </PageContainer>
  )
}
