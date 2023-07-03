import Image from "next/image";
import { Pokemon } from "./interfaces/Pokemon";

async function getData(search: string) {
  if (search === "") return null;

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${search.toLocaleLowerCase()}`
  );

  return await res
    .json()
    .then((value: Pokemon) => {
      return value;
    })
    .catch(() => {
      return null;
    });
}

const types: { [key: string]: string } = {
  electric: "bg-yellow-500",
  fire: "bg-rose-400",
  bug: "bg-lime-400",
  grass: "bg-lime-400",
  ghost: "bg-violet-400",
  poison: "bg-purple-400",
  flying: "bg-cyan-300",
  ice: "bg-indigo-600",
  normal: "bg-neutral-200",
  steel: "bg-green-400",
  water: "bg-sky-400",
  rock: "bg-orange-400",
  fighting: "bg-orange-400",
  ground: "bg-orange-400",
  fairy: "bg-purple-400",
  psychic: "bg-purple-400",
  dragon: "bg-sky-400",
};

export async function Card(props: { search: string }) {
  const data = await getData(props.search);

  return data ? (
    <div className=" bg-white shadow-lg mt-6 text-center rounded-lg overflow-hidden">
      <Image
        alt="Pokemon"
        src={data.sprites.other["official-artwork"].front_default}
        width={250}
        height={250}
        priority={true}
        loading="eager"
      />

      <div className="bg-slate-100">
        <h1 className="text-2xl mt-2 p-4">
          {data.forms[0].name.charAt(0).toUpperCase() +
            data.forms[0].name.slice(1)}
        </h1>
        <div className="pb-2 px-3 flex justify-center">
          {data.types.map((value, i) => (
            <h1
              className={`fit-content p-2 m-2 rounded-lg ${
                types[value.type.name]
              }`}
              key={i}
            >
              {value.type.name.charAt(0).toUpperCase() +
                value.type.name.slice(1)}
            </h1>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <h1 className="text-red-500 mt-4 text-1xl">Pokemon não encontrado.</h1>
  );
}
