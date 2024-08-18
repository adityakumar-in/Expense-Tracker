import { React } from 'react'
import './App.css'
import Header from './components/Header'
import Balance from './components/Balance'
import IncomeExpense from './components/IncomeExpense'
import TransactionList from './components/TransactionList'
import AddTransaction from './components/AddTransaction'
import { ElementProvider } from './components/ElementProvider'

function App() {
  return (
    <div className='mainPage'>
      <Header />
      
      {/* We can access the gobal state in all the components without prop drilling */}
      <ElementProvider>
        <div className="bor">
          <Balance />
          <IncomeExpense />
          <TransactionList />
          <AddTransaction />
        </div>
      </ElementProvider>
    </div>
  )
}

export default App
