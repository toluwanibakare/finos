import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BottomNav } from './components/layout/BottomNav'
import Home from './pages/Home'
import Money from './pages/Money'
import Goals from './pages/Goals'
import Activity from './pages/Activity'
import More from './pages/More'
import PoolDetail from './pages/PoolDetail'
import TransactionDetail from './pages/TransactionDetail'
import GoalDetail from './pages/GoalDetail'
import AddIncome from './pages/AddIncome'
import AddExpense from './pages/AddExpense'
import Withdrawal from './pages/Withdrawal'
import AllocationPolicy from './pages/AllocationPolicy'
import Notifications from './pages/Notifications'
import Privacy from './pages/Privacy'
import Preferences from './pages/Preferences'
import About from './pages/About'
import Terms from './pages/Terms'
import Website from './pages/Website'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-dvh flex flex-col bg-[#F7F8FB]">
        <div className="flex-1 pb-[68px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/money" element={<Money />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/more" element={<More />} />
            <Route path="/pool/:poolId" element={<PoolDetail />} />
            <Route path="/transaction/:transactionId" element={<TransactionDetail />} />
            <Route path="/goal/:goalId" element={<GoalDetail />} />
            <Route path="/add-income" element={<AddIncome />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/withdrawal" element={<Withdrawal />} />
            <Route path="/allocation-policy" element={<AllocationPolicy />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings/privacy" element={<Privacy />} />
            <Route path="/settings/preferences" element={<Preferences />} />
            <Route path="/settings/about" element={<About />} />
            <Route path="/settings/terms" element={<Terms />} />
            <Route path="/settings/website" element={<Website />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}
