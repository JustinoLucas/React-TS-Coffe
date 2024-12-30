import CoffeList from './components/list/listCoffee'
import './App.css'
import HeaderFixed from './components/header/headerFixed'
import { CartProvider } from './components/carrinho/carrinhoContexto'

function App() {
  return (
    <div>
      <CartProvider>
        <HeaderFixed />
        <main style={{ marginTop: "70px" }}>
          <CoffeList />
        </main>
      </CartProvider>
    </div>
  )
}

export default App
