import Image from "next/image";

type CardProps = {
  title: string;
  price: string;
  id: number;
  picture_url: string;
};
export const Card = ({ title, price, id, picture_url }: CardProps) => {
  return (
    <div className="flex flex-col bg-zinc-400 gap-4 w-full max-w-[30%]">
      <Image
        src={picture_url}
        width={"100"}
        height={"100"}
        alt="good morning bitch"
      />
      <p className="text-xl w-full text-white">{title}</p>
      <p className="text-lg text-blue-900">{price}</p>
      <p className="text-sm justify-self-end flex">{id}</p>
    </div>
  );
};
