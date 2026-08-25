import { useRef, useState, useCallback, type ReactNode, type TouchEvent } from 'react'
import { FinosIcon } from '../icons/FinosIcons'

interface SwipeableCardProps {
  children: ReactNode
  onEdit?: () => void
  onDelete?: () => void
}

export function SwipeableCard({ children, onEdit, onDelete }: SwipeableCardProps) {
  const [offset, setOffset] = useState(0)
  const startX = useRef(0)
  const dragging = useRef(false)

  const maxSwipe = (onEdit ? 56 : 0) + (onDelete ? 56 : 0)

  const onTouchStart = useCallback((e: TouchEvent) => {
    startX.current = e.touches[0].clientX
    dragging.current = true
  }, [])

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!dragging.current) return
    const dx = e.touches[0].clientX - startX.current
    const clamped = Math.min(0, Math.max(-maxSwipe, dx))
    setOffset(clamped)
  }, [maxSwipe])

  const onTouchEnd = useCallback(() => {
    dragging.current = false
    const threshold = maxSwipe / 2
    if (offset < -threshold) {
      setOffset(-maxSwipe)
    } else {
      setOffset(0)
    }
  }, [offset, maxSwipe])

  return (
    <div className="relative overflow-hidden rounded-[20px]">
      <div
        className="absolute inset-0 flex items-center justify-end"
        style={{ transform: `translateX(${offset}px)` }}
      >
        {onEdit && (
          <button
            onClick={onEdit}
            className="flex items-center justify-center h-full w-14 bg-[#013D7C] dark:bg-[#E8B931] text-white dark:text-[#013D7C]"
          >
            <FinosIcon name="edit" size={18} />
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="flex items-center justify-center h-full w-14 bg-[#C62828] text-white"
          >
            <FinosIcon name="trash" size={18} />
          </button>
        )}
      </div>
      <div
        className="relative transition-transform"
        style={{ transform: `translateX(${offset}px)` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {children}
      </div>
      {offset === 0 && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-1 pointer-events-none">
          <div className="w-8 h-1 rounded-full bg-gray-300/40" />
        </div>
      )}
    </div>
  )
}
