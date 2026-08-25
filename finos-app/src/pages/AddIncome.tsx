import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import type { IncomeSource, AllocationResult } from '../types'
import { formatNaira, generateId } from '../lib/utils'
import { PageContainer } from '../components/layout/PageContainer'
import { Header } from '../components/layout/Header'
import { AmountInput } from '../components/ui/AmountInput'
import { FinosIcon } from '../components/icons/FinosIcons'

const sources: { key: IncomeSource; label: string; icon: string }[] = [
  { key: 'salary', label: 'Salary', icon: 'landmark' },
  { key: 'freelance', label: 'Freelance', icon: 'globe' },
  { key: 'business', label: 'Business', icon: 'coins' },
  { key: 'investment', label: 'Investment', icon: 'trending-up' },
  { key: 'gift', label: 'Gift', icon: 'heart' },
  { key: 'other', label: 'Other', icon: 'dollar' },
]

export default function AddIncome() {
  const navigate = useNavigate()
  const { policies, addIncome, addTransaction } = useStore()

  const [amount, setAmount] = useState('')
  const [source, setSource] = useState<IncomeSource>('salary')
  const [description, setDescription] = useState('')
  const [reference, setReference] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [showPreview, setShowPreview] = useState(false)

  const numAmount = parseFloat(amount) || 0
  const defaultPolicy = policies.find((p) => p.isDefault)

  const previewAllocations: AllocationResult[] = defaultPolicy
    ? defaultPolicy.allocations.map((a) => ({
        poolId: a.poolId,
        poolName: a.poolName,
        percentage: a.percentage,
        amount: Math.round((numAmount * a.percentage) / 100),
      }))
    : []

  const canSubmit = numAmount > 0 && description.trim().length > 0

  const handleSubmit = () => {
    if (!canSubmit || !defaultPolicy) return

    const incomeId = generateId()
    const allocations = previewAllocations

    addIncome({
      id: incomeId,
      amount: numAmount,
      source,
      date,
      description: description.trim(),
      reference: reference.trim() || `INC-${Date.now()}`,
      policyId: defaultPolicy.id,
      allocations,
      status: 'completed',
    })

    addTransaction({
      id: generateId(),
      type: 'income',
      amount: numAmount,
      description: description.trim(),
      source,
      date,
      time: new Date().toTimeString().slice(0, 5),
      status: 'completed',
      reference: reference.trim() || `INC-${Date.now()}`,
    })

    allocations.forEach((a) => {
      addTransaction({
        id: generateId(),
        type: 'allocation',
        amount: a.amount,
        description: `${a.poolName} Allocation`,
        poolId: a.poolId,
        poolName: a.poolName,
        date,
        time: new Date().toTimeString().slice(0, 5),
        status: 'completed',
        reference: `ALLOC-${a.poolId}-${Date.now()}`,
        relatedIncomeId: incomeId,
      })
    })

    navigate('/')
  }

  return (
    <PageContainer>
      <Header title="Add Income" showBack />

      <div className="pt-4 space-y-6">
        <div className="animate-fade-in">
          <AmountInput
            value={amount}
            onChange={setAmount}
            autoFocus
          />
          <p className="text-center text-[12px] text-gray-400 mt-2">Enter amount</p>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '60ms' }}>
          <label className="text-[12px] font-semibold text-gray-500 mb-2 block">Source</label>
          <div className="grid grid-cols-3 gap-2">
            {sources.map((s) => (
              <button
                key={s.key}
                onClick={() => setSource(s.key)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                  source === s.key
                    ? 'bg-navy-900 text-white border-navy-900'
                    : 'bg-white text-gray-600 border-gray-100'
                }`}
              >
                <FinosIcon
                  name={s.icon}
                  size={18}
                  className={source === s.key ? 'text-white' : 'text-gray-400'}
                />
                <span className="text-[11px] font-medium">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 animate-fade-in" style={{ animationDelay: '120ms' }}>
          <div>
            <label className="text-[12px] font-semibold text-gray-500 mb-1.5 block">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Monthly salary"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[13px] text-[#0A1628] outline-none focus:border-navy-500 transition-colors placeholder:text-gray-300"
            />
          </div>
          <div>
            <label className="text-[12px] font-semibold text-gray-500 mb-1.5 block">Reference (optional)</label>
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="e.g. SAL-2026-08"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[13px] text-[#0A1628] outline-none focus:border-navy-500 transition-colors placeholder:text-gray-300"
            />
          </div>
          <div>
            <label className="text-[12px] font-semibold text-gray-500 mb-1.5 block">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[13px] text-[#0A1628] outline-none focus:border-navy-500 transition-colors"
            />
          </div>
        </div>

        {numAmount > 0 && defaultPolicy && (
          <div className="animate-fade-in" style={{ animationDelay: '180ms' }}>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 text-[12px] font-semibold text-navy-500 mb-3"
            >
              <FinosIcon name={showPreview ? 'chevron-up' : 'chevron-down'} size={14} />
              Allocation Preview
            </button>
            {showPreview && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="divide-y divide-gray-50">
                  {previewAllocations.map((a) => (
                    <div key={a.poolId} className="flex items-center justify-between px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-medium text-gray-400">{a.percentage}%</span>
                        <span className="text-[13px] font-medium text-[#0A1628]">{a.poolName}</span>
                      </div>
                      <span className="text-[13px] font-semibold text-[#0A1628]">{formatNaira(a.amount)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
                  <span className="text-[12px] font-semibold text-gray-500">Total</span>
                  <span className="text-[13px] font-bold text-[#0A1628]">{formatNaira(numAmount)}</span>
                </div>
              </div>
            )}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full bg-[#0A1628] text-white text-[14px] font-semibold py-3.5 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed active:bg-navy-700 animate-fade-in"
          style={{ animationDelay: '240ms' }}
        >
          Add Income
        </button>
      </div>

      <div className="h-4" />
    </PageContainer>
  )
}
