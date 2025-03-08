"use client"; 

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchCryptoPrices = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,cardano,solana&vs_currencies=usd"
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

export default function CryptoDashboard() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["cryptoPrices"],
    queryFn: fetchCryptoPrices,
    staleTime: 60000, // Cache for 1 minute
  });

  const [search, setSearch] = useState("");
  const cryptos = data ? Object.entries(data) : [];

  const filteredCryptos = cryptos.filter(([name]) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className='p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4'>
      <h1 className='text-2xl font-bold'>Crypto Dashboard</h1>
      <input
        type='text'
        placeholder='Search...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='w-full p-2 border rounded'
      />
      <button
        onClick={() => refetch()}
        className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700'
      >
        Refresh Prices
      </button>
      <ul>
        {filteredCryptos.map(([name, crypt]) => {
          const price = crypt as { usd: number }; // Type assertion
          return (
            <div key={name}>
              {name}: ${price.usd.toFixed(2)}
            </div>
          );
        })}
      </ul>
    </div>
  );
}
