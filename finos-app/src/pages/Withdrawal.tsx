import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { formatNaira, generateId } from '../lib/utils'
import { PageContainer } from '../components/layout/PageContainer'
import { Header } from '../components/layout/Header'
import { AmountInput } from '../components/ui/AmountInput'
import { FinosIcon } from '../components/icons/FinosIcons'

type Step = 'select-pool' | 'enter-amount' | 'enter-destination' | 'confirm' | 'processing' | 'success' | 'failed'

export default function Withdrawal() {
  const navigate = useNavigate()
  const { pools, addTransaction } = useStore()

  const [step, setStep] = useState<Step>('select-pool')
  const [selectedPoolId, setSelectedPoolId] = useState('')
  const [amount, setAmount] = useState('')
  const [destination, setDestination] = useState('')
  const [destinationName, setDestinationName] = useState('')
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')

  const numAmount = parseFloat(amount) || 0
  const selectedPool = pools.find((p) => p.id === selectedPoolId)
  const availablePools = pools.filter((p) => p.restriction === 'available' && p.balance > 0)

  const handleSelectPool = (poolId: string) => {
    setSelectedPoolId(poolId)
    setStep('enter-amount')
  }

  const handleAmountConfirm = () => {
    if (!selectedPool) return
    if (numAmount <= 0) {
      setError('Enter a valid amount')
      return
    }
    if (numAmount > selectedPool.balance) {
      setError('Insufficient balance')
      return
    }
    if (selectedPool.requiresReason && reason.trim().length === 0) {
      setError('A reason is required for this pool')
      return
    }
    setError('')
    setStep('enter-destination')
  }

  const handleDestinationConfirm = () => {
    if (!destination.trim()) {
      setError('Enter a destination')
      return
    }
    setError('')
    setStep('confirm')
  }

  const handleConfirm = async () => {
    setStep('processing')
    await new Promise((r) => setTimeout(r, 2000))

    const success = Math.random() > 0.1
    if (success) {
      addTransaction({
        id: generateId(),
        type: 'withdrawal',
        amount: numAmount,
        description: `Withdrawal to ${destinationName || destination}`,
        poolId: selectedPool?.id,
        poolName: selectedPool?.name,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().slice(0, 5),
        status: 'completed',
        reference: `WDW-${Date.now()}`,
        reason: reason.trim() || undefined,
      })
      setStep('success')
    } else {
      setStep('failed')
    }
  }

  const handleBack = () => {
    if (step === 'enter-amount') setStep('select-pool')
    else if (step === 'enter-destination') setStep('enter-amount')
    else if (step === 'confirm') setStep('enter-destination')
  }

  return (
    <PageContainer>
      <Header
        title={
          step === 'processing' ? 'Processing' :
          step === 'success' ? 'Successful' :
          step === 'failed' ? 'Failed' :
          'Withdrawal'
        }
        showBack
        onBack={step === 'processing' ? undefined : handleBack}
      />

      <div className="pt-6 space-y-6">
        {step === 'select-pool' && (
          <div className="animate-fade-in">
            <p className="text-[14px] font-semibold text-[#0A1628] mb-1">Select a pool</p>
            <p className="text-[12px] text-gray-400 mb-4">Choose where to withdraw from</p>
            <div className="space-y-2">
              {availablePools.map((pool) => (
                <button
                  key={pool.id}
                  onClick={() => handleSelectPool(pool.id)}
                  className="flex items-center gap-3 w-full p-4 bg-white rounded-xl border border-gray-100 shadow-sm active:scale-[0.98] transition-all"
                >
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                    style={{ backgroundColor: pool.color + '14' }}
                  >
                    <span style={{ color: pool.color }}>
                      <FinosIcon name={pool.icon} size={20} />
                    </span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[13px] font-semibold text-[#0A1628]">{pool.name}</p>
                  </div>
                  <span className="text-[14px] font-semibold text-[#0A1628]">{formatNaira(pool.balance)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'enter-amount' && (
          <div className="animate-fade-in">
            <p className="text-[12px] text-gray-400 text-center mb-1">Withdrawing from {selectedPool?.name}</p>
            <AmountInput value={amount} onChange={(v) => { setAmount(v); setError('') }} autoFocus />
            <p className="text-center text-[12px] text-gray-400 mt-2">Available: {formatNaira(selectedPool?.balance || 0)}</p>
            {error && (
              <p className="text-center text-[12px] text-red-500 mt-2">{error}</p>
            )}
            {selectedPool?.requiresReason && (
              <div className="mt-6">
                <label className="text-[12px] font-semibold text-gray-500 mb-1.5 block">Reason <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => { setReason(e.target.value); setError('') }}
                  placeholder="Enter reason for withdrawal"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[13px] text-[#0A1628] outline-none focus:border-navy-500 transition-colors placeholder:text-gray-300"
                />
              </div>
            )}
            <button
              onClick={handleAmountConfirm}
              disabled={numAmount <= 0}
              className="w-full mt-6 bg-[#0A1628] text-white text-[14px] font-semibold py-3.5 rounded-xl transition-all disabled:opacity-30 active:bg-navy-700"
            >
              Continue
            </button>
          </div>
        )}

        {step === 'enter-destination' && (
          <div className="animate-fade-in space-y-4">
            <p className="text-[14px] font-semibold text-[#0A1628] mb-1">Destination</p>
            <div>
              <label className="text-[12px] font-semibold text-gray-500 mb-1.5 block">Bank Account or Wallet</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => { setDestination(e.target.value); setError('') }}
                placeholder="e.g. 0123456789 - GTBank"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[13px] text-[#0A1628] outline-none focus:border-navy-500 transition-colors placeholder:text-gray-300"
              />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-gray-500 mb-1.5 block">Recipient Name (optional)</label>
              <input
                type="text"
                value={destinationName}
                onChange={(e) => setDestinationName(e.target.value)}
                placeholder="e.g. Tokunbo"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[13px] text-[#0A1628] outline-none focus:border-navy-500 transition-colors placeholder:text-gray-300"
              />
            </div>
            {error && <p className="text-[12px] text-red-500">{error}</p>}
            <button
              onClick={handleDestinationConfirm}
              className="w-full bg-[#0A1628] text-white text-[14px] font-semibold py-3.5 rounded-xl transition-all active:bg-navy-700"
            >
              Continue
            </button>
          </div>
        )}

        {step === 'confirm' && (
          <div className="animate-fade-in space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-3">Withdrawal Summary</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-gray-400">Amount</span>
                  <span className="text-[15px] font-bold text-[#0A1628]">{formatNaira(numAmount)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-gray-400">From Pool</span>
                  <span className="text-[13px] font-medium text-[#0A1628]">{selectedPool?.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-gray-400">Destination</span>
                  <span className="text-[13px] font-medium text-[#0A1628] text-right max-w-[60%] break-words">{destination}</span>
                </div>
                {destinationName && (
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-gray-400">Recipient</span>
                    <span className="text-[13px] font-medium text-[#0A1628]">{destinationName}</span>
                  </div>
                )}
                {reason && (
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-gray-400">Reason</span>
                    <span className="text-[13px] font-medium text-[#0A1628] text-right max-w-[60%] break-words">{reason}</span>
                  </div>
                )}
                <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-gray-500">Remaining in {selectedPool?.name}</span>
                  <span className="text-[13px] font-bold text-[#0A1628]">
                    {formatNaira((selectedPool?.balance || 0) - numAmount)}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleConfirm}
              className="w-full bg-[#0A1628] text-white text-[14px] font-semibold py-3.5 rounded-xl transition-all active:bg-navy-700"
            >
              Confirm Withdrawal
            </button>
          </div>
        )}

        {step === 'processing' && (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-navy-50 flex items-center justify-center mb-4">
              <FinosIcon name="loader" size={28} className="text-navy-500 animate-spin" />
            </div>
            <p className="text-[14px] font-semibold text-[#0A1628]">Processing your withdrawal</p>
            <p className="text-[12px] text-gray-400 mt-1">Please wait...</p>
          </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
              <FinosIcon name="check-circle" size={32} className="text-emerald-500" />
            </div>
            <p className="text-[16px] font-bold text-[#0A1628]">Withdrawal Successful</p>
            <p className="text-[13px] text-gray-400 mt-1">
              {formatNaira(numAmount)} sent to {destinationName || destination}
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-8 w-full max-w-[280px] bg-[#0A1628] text-white text-[14px] font-semibold py-3.5 rounded-xl transition-all active:bg-navy-700"
            >
              Back to Home
            </button>
          </div>
        )}

        {step === 'failed' && (
          <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <FinosIcon name="x-circle" size={32} className="text-red-500" />
            </div>
            <p className="text-[16px] font-bold text-[#0A1628]">Withdrawal Failed</p>
            <p className="text-[13px] text-gray-400 mt-1">Something went wrong. Please try again.</p>
            <div className="flex gap-3 mt-8 w-full max-w-[280px]">
              <button
                onClick={() => { setStep('confirm'); setError('') }}
                className="flex-1 bg-[#0A1628] text-white text-[13px] font-semibold py-3 rounded-xl transition-all active:bg-navy-700"
              >
                Retry
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-100 text-gray-600 text-[13px] font-semibold py-3 rounded-xl transition-all active:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="h-4" />
    </PageContainer>
  )
}
