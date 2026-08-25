import type { Transaction } from '../../types'
import { formatNaira, formatDateShort } from '../../lib/utils'
import { FinosIcon } from '../icons/FinosIcons'

interface TransactionRowProps {
  transaction: Transaction
  onClick?: (txn: Transaction) => void
}

const typeConfig: Record<string, { icon: string; sign: string; color: string }> = {
  income: { icon: 'arrow-down-left', sign: '+', color: 'text-emerald-600' },
  expense: { icon: 'arrow-up-right', sign: '-', color: 'text-red-500' },
  allocation: { icon: 'shuffle', sign: '', color: 'text-blue-500' },
  transfer: { icon: 'arrow-left-right', sign: '', color: 'text-gray-500' },
  withdrawal: { icon: 'arrow-up-right', sign: '-', color: 'text-red-500' },
}

export function TransactionRow({ transaction, onClick }: TransactionRowProps) {
  const config = typeConfig[transaction.type] || typeConfig.expense
  const isCredit = transaction.type === 'income'
  const amountColor = isCredit ? 'text-emerald-600' : 'text-[#0A1628]'

  return (
    <button
      onClick={() => onClick?.(transaction)}
      className="flex items-center gap-3 w-full bg-white py-3.5 text-left transition-colors active:bg-gray-50"
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 shrink-0">
        <FinosIcon name={config.icon} size={18} className={config.color} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-[#0A1628] truncate">
          {transaction.description}
        </p>
        <p className="text-[11px] text-gray-400 mt-0.5">
          {transaction.poolName || transaction.category || formatDateShort(transaction.date)}
        </p>
      </div>

      <div className="text-right shrink-0">
        <p className={`text-[14px] font-semibold tabular-nums ${amountColor}`}>
          {config.sign}{formatNaira(transaction.amount)}
        </p>
        <p className="text-[11px] text-gray-400 mt-0.5">
          {formatDateShort(transaction.date)}
        </p>
      </div>
    </button>
  )
}
