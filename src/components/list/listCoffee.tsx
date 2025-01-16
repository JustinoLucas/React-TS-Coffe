import { useCoffee } from "../../hooks/useCoffee";
import { useCart } from "../carrinho/carrinhoContexto";
import { coffeeData } from "../../interface/coffeeData";
import "./listCoffee.css";

const ListCoffee = () => {
  const { data, isLoading, isError, error, refetch } = useCoffee();
  const { addItem } = useCart();

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro: {error.message}</p>;

  const handleAddCoffee = (coffee: coffeeData) => {
    addItem(coffee);
    refetch();  // Forçar a atualização da lista após adicionar o café
  };

  return (
    <div className="coffee-list">
      {data.map((coffee: coffeeData) => (
        <div key={coffee.id_coffee} className="coffee-item">
          {/* Imagem do café */}
          <div className="coffee-image">
            <img
              src={`http://localhost:8080/coffee/image/${coffee.image_coffee}`}
              alt={coffee.nome_coffee}
            />
          </div>

          {/* Informações do café */}
          <div className="coffee-info">
            <h3>{coffee.nome_coffee}</h3>
            <p>{coffee.desc_coffee}</p>
            <span className="coffee-price">R$ {coffee.preco_coffee.toFixed(2)}</span>
          </div>

          {/* Botão para adicionar ao carrinho */}
          <button className="add-to-cart" onClick={() => handleAddCoffee(coffee)}>
            +
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListCoffee;
