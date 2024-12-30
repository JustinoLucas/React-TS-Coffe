import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import './useCoffee'

const API_URL = "http://localhost:8080";

const deleteData = async (id_coffe: number): AxiosPromise<any> => {
    const response = axios.delete(`${API_URL}/coffee/${id_coffe}`)
    return response;
}

export function useCoffeDataExclue() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: (id_coffe: number) => deleteData(id_coffe),
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['coffee']})
        }
    });

    return mutate;
}