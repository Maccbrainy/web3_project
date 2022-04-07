import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {TransactionsDataProvider} from './context/transactionContext'

ReactDOM.render(
  <React.StrictMode>
    <TransactionsDataProvider>
      <App />
    </TransactionsDataProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
