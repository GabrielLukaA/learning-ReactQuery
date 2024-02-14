import { useQueryClient } from "react-query";
import { FoodData } from "./../app/interfaces/food-data";
import axios from "axios";
import { useMutation } from "react-query";

const submit = async (data: FoodData) => {
  return await axios.post("http://localhost:3000/food", data);
};
export function useFoodMutate() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    //função que irá mutar a query utilizada por si
    mutationFn: submit,
    onSuccess: () => {
      // estudar o que essa função faz, porque não entendi nada, mas básicamente ele não realiza novamente a query de food data porque não precisa
      // otimizando a vida
      queryClient.invalidateQueries(["food-data"]);
    },

  });

  return mutate;
}
