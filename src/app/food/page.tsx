"use client";

import { Card } from "@/components/Card";
import { ModalPostFood } from "@/components/ModalPostFood";
import { useFoodData } from "@/hooks/useFoodData";
import { useState } from "react";

export default function Food() {
  const { data, isError, isLoading } = useFoodData();
  const [isModalOpen, setModalOpen] = useState(false);

  console.log(data);
  if (isLoading) {
    return <p>Carregando</p>;
  }
  return (
    <div className="app-container">
      {isModalOpen && (
        <ModalPostFood closeModal={() => setModalOpen((prev) => !prev)} />
      )}
      <div className="flex justify-between px-12 ">
        {data?.map((food) => {
          return <Card {...food} key={food.id} />;
        })}
      </div>
      <button onClick={() => setModalOpen((prev) => !prev)}> Open Modal</button>
    </div>
  );
}
