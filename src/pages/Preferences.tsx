import { useState } from 'react'
import { PageContainer } from '../components/layout/PageContainer'
import { Header } from '../components/layout/Header'
import { FinosIcon } from '../components/icons/FinosIcons'

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${
        on ? 'bg-[#0B1320]' : 'bg-gray-200'
      }`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-200 ${
          on ? 'right-0.5' : 'left-0.5'
        }`}
      />
    </button>
  )
}

export default function Preferences() {
  const [pushNotif, setPushNotif] = useState(true)
  const [emailNotif, setEmailNotif] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <PageContainer>
      <Header title="Preferences" showBack />
      <div className="pt-4">
        <div className="bg-white rounded-[20px] overflow-hidden">
          <div className="px-4 py-3.5 flex items-center justify-between border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-[8px] bg-gray-50">
                <FinosIcon name="bell" size={16} className="text-gray-500" />
              </div>
              <span className="text-[13px] font-semibold text-[#0B1320]">Push Notifications</span>
            </div>
            <Toggle on={pushNotif} onToggle={() => setPushNotif(!pushNotif)} />
          </div>
          <div className="px-4 py-3.5 flex items-center justify-between border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-[8px] bg-gray-50">
                <FinosIcon name="mail" size={16} className="text-gray-500" />
              </div>
              <span className="text-[13px] font-semibold text-[#0B1320]">Email Notifications</span>
            </div>
            <Toggle on={emailNotif} onToggle={() => setEmailNotif(!emailNotif)} />
          </div>
          <button className="px-4 py-3.5 flex items-center justify-between w-full text-left border-b border-gray-50 active:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-[8px] bg-gray-50">
                <FinosIcon name="smartphone" size={16} className="text-gray-500" />
              </div>
              <span className="text-[13px] font-semibold text-[#0B1320]">Currency</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-gray-400 font-medium">NGN</span>
              <FinosIcon name="chevron-right" size={16} className="text-gray-300" />
            </div>
          </button>
          <div className="px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-[8px] bg-gray-50">
                <FinosIcon name="moon" size={16} className="text-gray-500" />
              </div>
              <span className="text-[13px] font-semibold text-[#0B1320]">Dark Mode</span>
            </div>
            <Toggle on={darkMode} onToggle={() => setDarkMode(!darkMode)} />
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
