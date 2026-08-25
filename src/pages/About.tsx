import { PageContainer } from '../components/layout/PageContainer'
import { Header } from '../components/layout/Header'

export default function About() {
  return (
    <PageContainer>
      <Header title="About FINOS" showBack />
      <div className="pt-4 space-y-4">
        <div className="bg-white rounded-[20px] p-5 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-[20px] bg-[#0B1320] text-white mx-auto mb-4">
            <span className="text-[24px] font-bold">F</span>
          </div>
          <p className="text-[18px] font-bold text-[#0B1320] tracking-[-0.02em]">FINOS</p>
          <p className="text-[12px] text-gray-400 font-medium mt-1">Personal Financial Operating System</p>
          <p className="text-[11px] text-gray-300 font-medium mt-1">Version 1.0.0</p>
        </div>

        <div className="bg-white rounded-[20px] p-5">
          <p className="text-[13px] text-gray-500 font-medium leading-relaxed text-center">
            Every naira should have a job. FINOS helps you allocate, track, and grow your money with purpose.
          </p>
        </div>
      </div>
    </PageContainer>
  )
}
