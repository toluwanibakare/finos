import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import type { GoalState } from '../types'
import { PageContainer } from '../components/layout/PageContainer'
import { Header } from '../components/layout/Header'
import { GoalCard } from '../components/ui/GoalCard'
import { EmptyState } from '../components/ui/EmptyState'

const filterTabs: { key: GoalState | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
  { key: 'paused', label: 'Paused' },
]

export default function Goals() {
  const navigate = useNavigate()
  const goals = useStore((s) => s.goals)
  const [activeFilter, setActiveFilter] = useState<GoalState | 'all'>('all')

  const filtered = activeFilter === 'all'
    ? goals
    : goals.filter((g) => g.state === activeFilter)

  return (
    <PageContainer>
      <Header
        title="Goals"
        rightAction={
          <button
            onClick={() => navigate('/goals/new')}
            className="flex items-center justify-center w-10 h-10 -mr-2 rounded-full text-[#0A1628] hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            <span className="text-[22px] font-light leading-none">+</span>
          </button>
        }
      />

      <div className="pt-4">
        <div className="flex gap-2 mb-5 overflow-x-auto hide-scrollbar -mx-4 px-4">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`shrink-0 px-4 py-2 rounded-full text-[12px] font-semibold transition-colors ${
                activeFilter === tab.key
                  ? 'bg-[#0A1628] text-white'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon="target"
            title="No goals yet"
            description="Set your first savings goal and start working towards it."
            actionLabel="Create Goal"
            onAction={() => navigate('/goals/new')}
          />
        ) : (
          <div className="space-y-3">
            {filtered.map((goal, i) => (
              <div
                key={goal.id}
                className="animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <GoalCard goal={goal} onClick={() => navigate(`/goal/${goal.id}`)} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="h-4" />
    </PageContainer>
  )
}
