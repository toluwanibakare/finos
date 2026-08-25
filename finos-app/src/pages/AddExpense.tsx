import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import type { Pool } from '../types'
import { formatNaira, generateId } from '../lib/utils'
import { PageContainer } from '../components/layout/PageContainer'
import { Header } from '../components/layout/Header'
import { AmountInput } from '../components/ui/AmountInput'
import { FinosIcon } from '../components/icons/FinosIcons'

const categories = [
  'Food', 'Transport', 'Education', 'Entertainment', 'Health',
  'Shopping', 'Utilities', 'Housing', 'Other',
]

export default function AddExpense() {
  const navigate = useNavigate()
  const { pools, addTransaction } = useStore()

  const [amount, setAmount] = useState('')
  const [selectedPoolId, setSelectedPoolId] = useState('')
  const [category, setCategory] = useState('')
  const [merchant, setMerchant] = useState('')
  const [reason, setReason] = useState('')
  const [note, setNote] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const numAmount = parseFloat(amount) || 0
  const selectedPool = pools.find((p) => p.id === selectedPoolId)
  const availablePools = pools.filter((p) => p.restriction === 'available')
  const restrictedPools = pools.filter((p) => p.restriction !== 'available')

  const remainingBalance = selectedPool ? selectedPool.balance - numAmount : 0
  const isInsufficient = selectedPool ? numAmount > selectedPool.balance : false
  const requiresReason = selectedPool?.requiresReason ?? false
  const canSubmit = numAmount > 0 && selectedPoolId.length > 0 && category.length > 0 && (!requiresReason || reason.trim().length > 0) && !isInsufficient

  const handleSubmit = () => {
    if (!canSubmit || !selectedPool) return

    addTransaction({
      id: generateId(),
      type: 'expense',
      amount: numAmount,
      description: category,
      category,
      poolId: selectedPool.id,
      poolName: selectedPool.name,
      merchant: merchant.trim() || undefined,
      reason: reason.trim() || undefined,
      note: note.trim() || undefined,
      date,
      time: new Date().toTimeString().slice(0, 5),
      status: 'completed',
      reference: `EXP-${Date.now()}`,
    })

    navigate('/')
  }

  return (
    <PageContainer>
      <Header title="Add Expense" showBack />

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
          <label className="text-[12px] font-semibold text-gray-500 mb-2 block">Select Pool</label>
          <div className="space-y-2">
            {availablePools.length > 0 && (
              <div className="space-y-2">
                {availablePools.map((pool) => (
                  <PoolSelectItem
                    key={pool.id}
                    pool={pool}
                    selected={selectedPoolId === pool.id}
                    onSelect={() => setSelectedPoolId(pool.id)}
                  />
                ))}
              </div>
            )}
            {restrictedPools.length > 0 && (
              <div className="space-y-2 mt-3">
                <p className="text-[11px] text-gray-400 font-medium">Restricted Pools</p>
                {restrictedPools.map((pool) => (
                  <PoolSelectItem
                    key={pool.id}
                    pool={pool}
                    selected={selectedPoolId === pool.id}
                    onSelect={() => setSelectedPoolId(pool.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedPool && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-gray-400">Available in {selectedPool.name}</span>
              <span className="text-[13px] font-semibold text-[#0A1628]">{formatNaira(selectedPool.balance)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-gray-400">Being spent</span>
              <span className="text-[13px] font-semibold text-red-500">{numAmount > 0 ? '-' + formatNaira(numAmount) : '-'}</span>
            </div>
            <div className="border-t border-gray-100 mt-2 pt-2 flex items-center justify-between">
              <span className="text-[12px] font-semibold text-gray-500">Remaining</span>
              <span className={`text-[14px] font-bold ${isInsufficient ? 'text-red-500' : 'text-[#0A1628]'}`}>
                {formatNaira(remainingBalance)}
              </span>
            </div>
            {isInsufficient && (
              <p className="text-[11px] text-red-500 mt-2">Insufficient balance in this pool.</p>
            )}
          </div>
        )}

        <div className="animate-fade-in" style={{ animationDelay: '120ms' }}>
          <label className="text-[12px] font-semibold text-gray-500 mb-2 block">Category</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all ${
                  category === cat
                    ? 'bg-navy-900 text-white border-navy-900'
                    : 'bg-white text-gray-600 border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 animate-fade-in" style={{ animationDelay: '180ms' }}>
          <div>
            <label className="text-[12px] font-semibold text-gray-500 mb-1.5 block">Merchant (optional)</label>
            <input
              type="text"
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
              placeholder="e.g. Shoprite"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[13px] text-[#0A1628] outline-none focus:border-navy-500 transition-colors placeholder:text-gray-300"
            />
          </div>
          {requiresReason && (
            <div>
              <label className="text-[12px] font-semibold text-gray-500 mb-1.5 block">
                Reason <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Required for this pool"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[13px] text-[#0A1628] outline-none focus:border-navy-500 transition-colors placeholder:text-gray-300"
              />
            </div>
          )}
          <div>
            <label className="text-[12px] font-semibold text-gray-500 mb-1.5 block">Note (optional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Any additional details..."
              rows={2}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[13px] text-[#0A1628] outline-none focus:border-navy-500 transition-colors placeholder:text-gray-300 resize-none"
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

        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full bg-[#0A1628] text-white text-[14px] font-semibold py-3.5 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed active:bg-navy-700 animate-fade-in"
          style={{ animationDelay: '240ms' }}
        >
          Add Expense
        </button>
      </div>

      <div className="h-4" />
    </PageContainer>
  )
}

function PoolSelectItem({ pool, selected, onSelect }: { pool: Pool; selected: boolean; onSelect: () => void }) {
  const isRestricted = pool.restriction !== 'available'
  return (
    <button
      onClick={onSelect}
      className={`flex items-center gap-3 w-full p-3 rounded-xl border transition-all ${
        selected
          ? 'border-navy-900 bg-navy-50'
          : 'border-gray-100 bg-white'
      }`}
    >
      <div
        className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0"
        style={{ backgroundColor: pool.color + '14' }}
      >
        <span style={{ color: pool.color }}>
          <FinosIcon name={pool.icon} size={18} />
        </span>
      </div>
      <div className="flex-1 min-w-0 text-left">
        <p className="text-[13px] font-semibold text-[#0A1628]">{pool.name}</p>
        {isRestricted && (
          <p className="text-[10px] text-amber-600">{pool.restriction.replace('_', ' ')}</p>
        )}
      </div>
      <span className="text-[12px] font-semibold text-[#0A1628]">{formatNaira(pool.balance)}</span>
      {selected && (
        <div className="w-5 h-5 rounded-full bg-navy-900 flex items-center justify-center shrink-0">
          <FinosIcon name="check" size={12} className="text-white" />
        </div>
      )}
    </button>
  )
}
