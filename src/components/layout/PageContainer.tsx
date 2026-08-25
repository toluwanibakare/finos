interface PageContainerProps {
  children: React.ReactNode
  className?: string
  padded?: boolean
}

export function PageContainer({ children, className = '', padded = true }: PageContainerProps) {
  return (
    <main
      className={`min-h-screen bg-[#F7F8FB] dark:bg-[#0B1320] pt-[52px] pb-20 transition-colors ${
        padded ? 'px-4' : ''
      } ${className}`}
    >
      <div className="max-w-lg mx-auto w-full">{children}</div>
    </main>
  )
}
