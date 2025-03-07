import ChatComponent from "./components/ChatComponent";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-8 bg-gradient-to-b from-pink-100 to-pink-200">
      <div className="flex">
        <div className="hello-kitty-container text-center p-8">
          <img
            src="/dear-daniel.png"
            alt="Dear Daniel"
            className="w-48 h-60 mx-auto mb-6"
          />
          <h1 className="hello-kitty-text text-6xl mb-4">Dear Daniel</h1>
          <div className="bg-white/80 rounded-3xl p-8 shadow-lg mb-8">
            <p className="text-2xl text-pink-500">
              Welcome to my kawaii world! ♡
            </p>
          </div>
        </div>
        <ChatComponent />
      </div>
    </div>
  );
}
