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

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-dvh flex flex-col bg-slate-50">
        <div className="flex-1 pb-20">
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
          </Routes>
        </div>
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}
