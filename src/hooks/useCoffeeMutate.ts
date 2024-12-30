import axios, { AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { coffeeData } from "../interface/coffeeData";

const API_URL = 'http://localhost:8080';

const postData = async (data: coffeeData): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/coffee', data);
    return response;
}

export function useCoffeDataMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['coffee']})
        }
    })

    return mutate;
}