import './App.css'
import { Navbar, Welcome, Services, Transactions, Footer } from './components'
const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-header">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
    
  )
}
export default App
