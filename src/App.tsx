import CoffeList from './components/list/listCoffee'
import './App.css'
import HeaderFixed from './components/header/headerFixed'

function App() {
  return (
    <div>
      <HeaderFixed></HeaderFixed>
      <main style={{ marginTop: "70px" }}>
        <CoffeList></CoffeList>
      </main>
    </div>
  )
}

export default App
