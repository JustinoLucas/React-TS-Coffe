import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance"
import { coffeeData } from "../interface/coffeeData";


const fetchCoffee = async (): Promise<coffeeData[]> => {
    try {
    const response = await axiosInstance.get('/coffee');
    return response.data
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        throw error;
    }
};

export const useCoffee = () => {
    const query = useQuery({
        queryKey: ['coffee'],
        queryFn: fetchCoffee,
        retry: 2
    });

    return {
        ...query,
        data: query.data || [],
    };
};