import CryptoDashboard from "./dashboard";

export default function Home() {
  return (
    <div className='p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4'>
      <h1 className='text-2xl font-bold'>Welcome to Crypto Dashboard</h1>
      <CryptoDashboard />
    </div>
  );
}
