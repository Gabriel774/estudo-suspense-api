"use client";

import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";
import { useState, Suspense, useRef } from "react";
import ReactLoading from "react-loading";
import { Card } from "./Card";

export default function Home() {
  const [search, setSearch] = useState("");
  const input = useRef(null);

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
          ref={input}
        />
        <button
          className="bg-rose-500 px-4 rounded-r-lg"
          onClick={() => {
            {/* @ts-ignore */}
            setSearch(input.current.value);
          }}
        >
          <AiOutlineSearch size={24} />
        </button>
      </div>

      {search !== "" && (
        <Suspense
          fallback={
            <ReactLoading
              type={"spin"}
              color={"#4FC0D0"}
              height={50}
              width={50}
            />
          }
        >
          <Card search={search} />
        </Suspense>
      )}
    </main>
  );
}
