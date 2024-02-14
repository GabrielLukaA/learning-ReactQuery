import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFoodMutate } from "@/hooks/useFoodMutate";
import { FoodData } from "@/app/interfaces/food-data";
import { useEffect } from "react";

interface ModalProps {
  closeModal: () => void;
}

export const ModalPostFood = ({ closeModal }: ModalProps) => {
  // o mutate básicamente é a função que eu utilizo do useMutation para enviar o dado e realizar a mutação, o isSucess apenas ve se deu certo
  const { mutate, isSuccess } = useFoodMutate();
  const FoodSchema = z.object({
    title: z.string().min(1, "É necessário ter um título"),
    price: z.coerce.number(),
    picture_url: z.string().min(1, "É necessário ter uma foto"),
  });

  type Food = z.infer<typeof FoodSchema>;

  function createProduct(data: FoodData) {
    mutate(data);
  }

  useEffect(() => {
    closeModal();
  }, [isSuccess]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FoodData>({
    resolver: zodResolver(FoodSchema),
  });

  return (
    <div className="w-2/4 p-6 rounded-lg fixed translate-x-[-50%] left-[50%] bg-white shadow-lg">
      <button onClick={closeModal}>Close Modal</button>
      <form
        className="w-4/5 flex flex-col gap-4 items-center justify-center"
        onSubmit={handleSubmit(createProduct)}
      >
        <div>
          <input type="text" placeholder="title" {...register("title")} />
          {errors.title && (
            <p className="py-1 text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div>
          <input type="number" placeholder="price" {...register("price")} />
          {errors.price && (
            <p className="py-1 text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="picture"
            {...register("picture_url")}
          />
          {errors.picture_url && (
            <p className="py-1 text-red-500 text-sm">
              {errors.picture_url.message}
            </p>
          )}
        </div>
        <button className="py-2 rounded-lg bg-green-700 w-full" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};
