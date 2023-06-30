"use client";
import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";
import { useState, Suspense } from "react";
import { Pokemon } from "./interfaces/Pokemon";
import ReactLoading from "react-loading";

export default function Home() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState<null | Pokemon>(null);
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const pokemonTypes: { [key: string]: string } = {
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

  async function getData() {
    if (search === "" || (data && data.forms[0].name == search)) return;
    setLoading(true);
    setData(null);
    setError(false);
    setLoadingImage(true);

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);

    await res
      .json()
      .then((value) => setData(value))
      .catch((err) => {
        setError(true);
      });
    setLoading(false);
    setSearch("");
  }

  console.log(data ? data.sprites.other["official-artwork"] : "");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 ">
      <Image
        alt="Poke Search"
        src={"/logo.png"}
        width={500}
        height={260}
        priority={true}
      />
      <div className="flex m-2">
        <input
          type="text"
          placeholder="Nome do Pokemon"
          className="outline-none px-2 py-4 rounded-l-lg"
          onInput={(e) => {
            /* @ts-ignore */
            setSearch(e.target.value);
          }}
          value={search}
        />
        <button className="bg-rose-500 px-4 rounded-r-lg" onClick={getData}>
          <AiOutlineSearch size={24} />
        </button>
      </div>

      {error && (
        <h1 className="text-red-500 mt-4 text-1xl">Pokemon não encontrado.</h1>
      )}

      {loading && (
        <ReactLoading type={"spin"} color={"#4FC0D0"} height={50} width={50} />
      )}

      {data && (
        <div className=" bg-white shadow-lg mt-6 text-center rounded-lg overflow-hidden">
          <Image
            alt="Poke Search"
            src={data.sprites.other["official-artwork"].front_default}
            width={250}
            height={250}
            priority={true}
            loading="eager"
            onLoadingComplete={() => setLoadingImage(false)}
          />
          {loadingImage && (
            <Image
              alt="Poke Search"
              src={"/loading.png"}
              width={250}
              height={250}
              priority={true}
              loading="eager"
              onLoadStart={() => setLoadingImage(true)}
              onLoadingComplete={() => setLoadingImage(false)}
            />
          )}
          <div className="bg-slate-100">
            <h1 className="text-2xl mt-2 p-4">
              {data.forms[0].name.charAt(0).toUpperCase() +
                data.forms[0].name.slice(1)}
            </h1>
            <div className="pb-2 px-3 flex justify-center">
              {data.types.map((value) => (
                <h1
                  className={`fit-content p-2 m-2 rounded-lg ${
                    pokemonTypes[value.type.name]
                  }`}
                >
                  {value.type.name.charAt(0).toUpperCase() +
                    value.type.name.slice(1)}
                </h1>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
