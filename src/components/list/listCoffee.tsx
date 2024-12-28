import { useCoffee } from "../../hooks/useCoffee"
import  "./listCoffee.css"

const CoffeList = () => {
    const { data, isLoading, isError, error } = useCoffee();

    if (isLoading) return <p>Carregando...</p>;
    if (isError) return <p>Erro: {error.message}</p>;

    return (
        <div className="coffee-list">
            {data.map((coffee: any) => {
                let imageUrl = "";
                try {
                    if (coffee.image_coffee) {
                        const blob = new Blob([coffee.image_coffee], { type: "image/jpeg" });
                        imageUrl = URL.createObjectURL(blob);
                    }
                } catch (err) {
                    console.error("Erro ao criar URL da imagem:", err);
                }
                return (
                    <div key={coffee.id_coffee} className="coffee-item">
                        <div className="coffee-image">
                            <img src={URL.createObjectURL(new Blob([coffee.image_coffee]))} alt={coffee.nome_coffee} />
                        </div>
                        <div className="coffee-info">
                            <h3>{coffee.nome_coffee}</h3>
                            <p>{coffee.desc_coffee}</p>
                            <span className="coffee-price">R$ {coffee.preco_coffee.toFixed(2)}</span>
                        </div>
                        <button className="add-to-cart"> + </button>
                    </div>
                );
            })}
        </div>
    );
};

export default CoffeList;