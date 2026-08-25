import { useStore } from '../store/useStore'
import { PageContainer } from '../components/layout/PageContainer'
import { Header } from '../components/layout/Header'
import { NotificationItem } from '../components/ui/NotificationItem'
import { EmptyState } from '../components/ui/EmptyState'

export default function Notifications() {
  const notifications = useStore((s) => s.notifications)
  const markNotificationRead = useStore((s) => s.markNotificationRead)

  const handleNotificationClick = (id: string) => {
    markNotificationRead(id)
  }

  return (
    <PageContainer>
      <Header title="Notifications" showBack />

      <div className="pt-2">
        {notifications.length === 0 ? (
          <EmptyState
            icon="bell"
            title="No notifications"
            description="You are all caught up. Notifications will appear here."
          />
        ) : (
          <div className="bg-white dark:bg-[#1A2332] rounded-[20px] overflow-hidden divide-y divide-gray-50 dark:divide-gray-700/50">
            {notifications.map((notif) => (
              <NotificationItem
                key={notif.id}
                notification={notif}
                onClick={() => handleNotificationClick(notif.id)}
              />
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  )
}
