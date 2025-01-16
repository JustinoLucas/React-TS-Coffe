import CoffeList from './components/list/listCoffee'
import './App.css'
import HeaderFixed from './components/header/headerFixed'
import { CarrinhoProvider } from './components/carrinho/carrinhoContexto'

function App() {
  return (
    <div>
      <CarrinhoProvider>
        <HeaderFixed />
        <main style={{ marginTop: "70px" }}>
          <CoffeList />
        </main>
      </CarrinhoProvider>
    </div>
  )
}

export default App
