"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

export default function Home() {
  const queryClient = useQueryClient(); // É basicamente uma forma manual de refetch, para que eu cojnsiga dar  refetch apenas onde foi atualizado, evitando uma sobrecarga
  const axios = require("axios").default;

  type Testing = {
    id: string;
    titulo?: string;
    concluida: boolean;
  };

  //Dentro do useQuery como primeiro argumento pode ser passado um array de dois elementos, um que nomeia, e outro que garante que será algo unico
  //como uma espécie de chave
  const { data, isLoading, isError, refetch } = useQuery(
    "tasks",
    () => {
      return axios
        .get("http://localhost:3000/tarefas")
        .then((response: any) => response.data);
    },
    {
      /*Aqui se passam outros parametroos como por exemplo:
  retry:5 // Isso faria a query ser feita até 5 vezes caso ela esteja dando erro
  refetchOnWindowFocus:true // Faz com que sempre que o usuário focar na janela novamente essa query seja refeita
  refetchInterval: 5000, // É uma forma de fazer a query de tempos em tempos por ms.
  initialData: [{ id: "1", titulo: "teste" }], // Uma forma de já ter algo sendo mostrado antes de se ter o retorno da api
  */
    }
  );

  // Enquanto o useQuery serve para realizar requisições, o useMutation serve para qualquer tipo de atualização necessária
  // como um put,post,patch,delete
  const mutation = useMutation({
    mutationFn: ({ id, concluida }: Testing) => {
      return axios
        .patch(`http://localhost:3000/tarefas/${id}`, { concluida })
        .then((response: any) => response.data);
    },
    onSuccess: (data: Testing) => {
      // refetch(); // Essa função básicamente refaz a query!
      queryClient.setQueryData("tasks", (currentData: Testing[] | unknown) =>
        (currentData as Testing[]).map((todo) =>
          todo.id === data.id ? data : todo
        )
      ); // O segundo parametro pode ser uma nova lista diretamente, ou uma função que retorne uma lista
    },
    onError: (error) => console.log(error),
  });

  // mutation.isLoading serve com o mesmo propósito do isLoading do useQuery, para ver se a requisição já foi feita ou não.
  //Fazendo uso do "initialData" o isLoading sempre será falso, porque sempre terá dados a mostrar.
  if (isLoading) {
    return <div className="loading">Carregando...</div>;
  }
  if (isError) {
    return <div className="loading">Algo deu errado!</div>;
  }

  return (
    <div className="app-container">
      <div className="todos">
        <h2>Tasks</h2>
        {data.map((todo: any) => (
          <div
            onClick={() =>
              mutation.mutate({ id: todo.id, concluida: !todo.concluida })
            }
            className={`todo ${todo.concluida && "todo-completed"}`}
            key={todo.id}
          >
            {todo.titulo}
          </div>
        ))}
      </div>
    </div>
  );
}
