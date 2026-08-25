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
        <div className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6 animate-fade-in">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-navy-900 text-white shrink-0">
            <FinosIcon name="user" size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-semibold text-[#0A1628]">Tokunbo</p>
            <p className="text-[12px] text-gray-400 mt-0.5">tokunbo@email.com</p>
          </div>
          <FinosIcon name="chevron-right" size={18} className="text-gray-300" />
        </div>

        {menuSections.map((section, si) => (
          <div
            key={section.title}
            className="mb-5 animate-fade-in"
            style={{ animationDelay: `${(si + 1) * 60}ms` }}
          >
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
              {section.title}
            </p>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {section.items.map((item, ii) => {
                const isLast = ii === section.items.length - 1
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-3 w-full px-4 py-3.5 text-left active:bg-gray-50 transition-colors ${
                      !isLast ? 'border-b border-gray-50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50">
                      <FinosIcon name={item.icon} size={16} className="text-gray-500" />
                    </div>
                    <span className="flex-1 text-[13px] font-medium text-[#0A1628]">
                      {item.label}
                    </span>
                    <div className="flex items-center gap-2">
                      {item.badge && item.badge > 0 && (
                        <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold">
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

        <button className="flex items-center gap-3 w-full bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-gray-100 text-red-500 active:bg-red-50 transition-colors mb-6">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-50">
            <FinosIcon name="log-out" size={16} className="text-red-500" />
          </div>
          <span className="text-[13px] font-medium">Sign Out</span>
        </button>

        <p className="text-center text-[11px] text-gray-300 mb-6">FINOS v1.0.0</p>
      </div>

      <div className="h-4" />
    </PageContainer>
  )
}
