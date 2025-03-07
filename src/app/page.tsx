import ChatComponent from "./components/ChatComponent";
import Image from "next/image";
import ProductList from "./components/ProductList";
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 p-2 sm:p-4">
      <div className="flex flex-col items-center justify-center max-w-full p-4">
        <div className="w-32 sm:w-48 md:w-52 relative mb-4">
          <Image
            src="/dear-daniel.png"
            alt="Dear Daniel"
            width={200}
            height={200}
            priority
            className="w-full h-auto"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-400 mb-4 sm:mb-8">
          Dear Daniel
        </h1>
        <ProductList />
        <ChatComponent />
      </div>
    </main>
  );
}
