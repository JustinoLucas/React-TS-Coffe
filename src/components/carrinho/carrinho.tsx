import { useCart } from "./carrinhoContexto";
import './carrinho.css';

const Carrinho = () => {
  const { cart, removeFromCart } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.preco_coffee, 0);
  };

  return (
    <div className="cart-dropdown">
      <h3>Carrinho de Compras</h3>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id_coffee}>
                <div>{item.nome_coffee}</div>
                <div>R$ {item.preco_coffee.toFixed(2)}</div>
                <button onClick={() => removeFromCart(item.id_coffee)}>Remover</button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <strong>Total: R$ {calculateTotal().toFixed(2)}</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrinho;
