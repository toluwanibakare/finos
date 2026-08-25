import { useStore } from '../../store/useStore'
import { formatNaira } from '../../lib/utils'
import { FinosIcon } from '../icons/FinosIcons'

export function BalanceCard() {
  const balanceHidden = useStore((s) => s.balanceHidden)
  const toggleBalance = useStore((s) => s.toggleBalance)
  const getTotalBalance = useStore((s) => s.getTotalBalance)
  const getAvailableBalance = useStore((s) => s.getAvailableBalance)
  const getReservedBalance = useStore((s) => s.getReservedBalance)

  const total = getTotalBalance()
  const available = getAvailableBalance()
  const reserved = getReservedBalance()

  const masked = '****'

  return (
    <div className="bg-[#0A1628] rounded-2xl p-6 text-white shadow-lg shadow-[#0A1628]/10">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[13px] text-gray-300 font-medium">Total Balance</span>
        <button
          onClick={toggleBalance}
          className="flex items-center justify-center w-8 h-8 -mr-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          aria-label={balanceHidden ? 'Show balance' : 'Hide balance'}
        >
          <FinosIcon name={balanceHidden ? 'eye-off' : 'eye'} size={18} />
        </button>
      </div>

      <div className="mb-5">
        <p className="text-3xl font-bold tracking-tight">
          {balanceHidden ? masked : formatNaira(total)}
        </p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 bg-white/5 rounded-xl px-4 py-3">
          <span className="text-[11px] text-gray-400 font-medium block mb-1">Available</span>
          <p className="text-sm font-semibold">
            {balanceHidden ? masked : formatNaira(available)}
          </p>
        </div>
        <div className="flex-1 bg-white/5 rounded-xl px-4 py-3">
          <span className="text-[11px] text-gray-400 font-medium block mb-1">Reserved</span>
          <p className="text-sm font-semibold">
            {balanceHidden ? masked : formatNaira(reserved)}
          </p>
        </div>
      </div>
    </div>
  )
}
