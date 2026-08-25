import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { PageContainer } from '../components/layout/PageContainer'
import { Header } from '../components/layout/Header'
import { FinosIcon } from '../components/icons/FinosIcons'

interface MenuItem {
  icon: string
  label: string
  path: string
  badge?: number
}

export default function More() {
  const navigate = useNavigate()
  const notifications = useStore((s) => s.notifications)
  const unreadCount = notifications.filter((n) => !n.read).length

  const menuSections: { title: string; items: MenuItem[] }[] = [
    {
      title: 'Account',
      items: [
        { icon: 'bell', label: 'Notifications', path: '/notifications', badge: unreadCount },
        { icon: 'shuffle', label: 'Allocation Policy', path: '/allocation-policy' },
      ],
    },
    {
      title: 'Settings',
      items: [
        { icon: 'shield', label: 'Privacy & Security', path: '/settings/privacy' },
        { icon: 'settings', label: 'Preferences', path: '/settings/preferences' },
      ],
    },
    {
      title: 'About',
      items: [
        { icon: 'info', label: 'About FINOS', path: '/settings/about' },
        { icon: 'file-text', label: 'Terms of Service', path: '/settings/terms' },
        { icon: 'globe', label: 'Website', path: '/settings/website' },
      ],
    },
  ]

  return (
    <PageContainer>
      <Header title="More" />

      <div className="pt-4">
        {/* Profile card */}
        <div className="flex items-center gap-4 bg-white rounded-[20px] p-5 mb-6 animate-fade-in">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#0B1320] text-white shrink-0">
            <FinosIcon name="user" size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-bold text-[#0B1320] tracking-[-0.01em]">Toluwani</p>
            <p className="text-[12px] text-gray-400 font-medium mt-0.5">tolu@email.com</p>
          </div>
          <FinosIcon name="chevron-right" size={16} className="text-gray-300" />
        </div>

        {/* Menu sections */}
        {menuSections.map((section, si) => (
          <div
            key={section.title}
            className="mb-5 animate-fade-in"
            style={{ animationDelay: `${(si + 1) * 60}ms` }}
          >
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">
              {section.title}
            </p>
            <div className="bg-white rounded-[20px] overflow-hidden">
              {section.items.map((item, ii) => {
                const isLast = ii === section.items.length - 1
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-3 w-full px-4 py-3.5 text-left active:bg-gray-50 transition-colors duration-150 ${
                      !isLast ? 'border-b border-gray-50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-[8px] bg-gray-50">
                      <FinosIcon name={item.icon} size={16} className="text-gray-500" />
                    </div>
                    <span className="flex-1 text-[13px] font-semibold text-[#0B1320]">
                      {item.label}
                    </span>
                    <div className="flex items-center gap-2">
                      {item.badge && item.badge > 0 && (
                        <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-[#C62828] text-white text-[10px] font-bold">
                          {item.badge}
                        </span>
                      )}
                      <FinosIcon name="chevron-right" size={16} className="text-gray-300" />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        {/* Sign out */}
        <button className="flex items-center gap-3 w-full bg-white rounded-[20px] px-4 py-3.5 text-[#C62828] active:bg-[#FFEBEE] transition-colors duration-150 mb-6">
          <div className="flex items-center justify-center w-8 h-8 rounded-[8px] bg-[#FFEBEE]">
            <FinosIcon name="log-out" size={16} className="text-[#C62828]" />
          </div>
          <span className="text-[13px] font-semibold">Sign Out</span>
        </button>

        <p className="text-center text-[10px] text-gray-300 font-medium mb-6">FINOS v1.0.0</p>
      </div>

      <div className="h-4" />
    </PageContainer>
  )
}
