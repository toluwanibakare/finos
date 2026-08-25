import { useNavigate } from 'react-router-dom'
import { FinosIcon } from '../icons/FinosIcons'

interface HeaderProps {
  title: string
  showBack?: boolean
  onBack?: () => void
  rightAction?: React.ReactNode
  className?: string
}

export function Header({ title, showBack = false, onBack, rightAction, className = '' }: HeaderProps) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 ${className}`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
        <div className="flex items-center w-12">
          {showBack && (
            <button
              onClick={handleBack}
              className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full text-[#0A1628] hover:bg-gray-50 active:bg-gray-100 transition-colors"
              aria-label="Go back"
            >
              <FinosIcon name="chevron-left" size={22} />
            </button>
          )}
        </div>

        <h1 className="text-[15px] font-semibold text-[#0A1628] tracking-tight truncate">
          {title}
        </h1>

        <div className="flex items-center justify-end w-12">
          {rightAction}
        </div>
      </div>
    </header>
  )
}
