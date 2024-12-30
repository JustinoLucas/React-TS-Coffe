import React, { useState } from "react";
import axiosInstance from "../../axiosInstance";
import "./createCoffeeModal.css"


interface CreateCoffeeModal {
    isOpen: boolean;
    onClose: () => void;
}

const CreateCoffeeModal: React.FC<CreateCoffeeModal> = ({ isOpen, onClose }) => {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState<string | number>("");
    const [descricao, setDescricao] = useState("");
    const [imagem, setImagem] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nome || !preco || !descricao || !imagem) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        const formData = new FormData();
        formData.append("nome_coffee", nome);
        formData.append("preco_coffee", String(preco));
        formData.append("desc_coffee", descricao);
        formData.append("image_coffee", imagem);

        try {
            setLoading(true);
            await axiosInstance.post("/coffee", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Café adicionado com sucesso!");
            setNome("");
            setPreco("");
            setDescricao("");
            setImagem(null);
            onClose();
        } catch (error) {
            console.error("Erro ao adicionar café:", error);
            alert("Erro ao adicionar café.");
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file && file.type.startsWith("image/")) {
            setImagem(file);
        } else {
            alert("Por favor, selecione um arquivo de imagem.");
            setImagem(null);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Adicionar novo Café</h2>
                <form onSubmit={handleChange}>
                    <div className="form-group">
                        <label>Nome: </label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Preço: </label>
                        <input type="number" value={preco} onChange={(e) => setPreco(e.target.value ? parseFloat(e.target.value) : "")}  required/>
                    </div>
                    <div className="form-group">
                        <label>Descrição: </label>
                        <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
                    </div>
                    <div>
                        <label>Imagem: </label>
                        <input type="file" onChange={handleImageChange} required/>
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Adicionando..." : "Adicionar"}
                    </button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </form>
            </div>
        </div>
    );
};



export default CreateCoffeeModal;