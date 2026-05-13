export default function Login() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-3xl border border-zinc-800">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Welcome Back
        </h1>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            className="w-full bg-zinc-800 p-4 rounded-xl outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-zinc-800 p-4 rounded-xl outline-none"
          />

          <button className="w-full bg-white text-black py-4 rounded-xl font-semibold hover:scale-[1.02] transition">
            Login
          </button>

        </div>

      </div>

    </div>
  )
}