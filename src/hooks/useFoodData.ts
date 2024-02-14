import { useQuery } from "react-query";
import axios, { AxiosPromise } from "axios";
import { FoodResponse } from "@/app/interfaces/food-data";
const API_URL = "http://localhost:3000/";

const fetchData = async (): Promise<FoodResponse> => {
  const response = await axios.get<FoodResponse>(API_URL + "food");
  return response.data;
};
export function useFoodData() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ["food-data"],
    // Poderia ser passado um parametro de "gatilho" para o hook, como um id, aí bastaria utilizar esse enabled:!!id que só ativaria o hook quando
    // existir um id
    // enabled:!!id
  });

  return query;
}
