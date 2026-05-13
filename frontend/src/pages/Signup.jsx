export default function Signup() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-3xl border border-zinc-800">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Create Account
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Name"
            className="w-full bg-zinc-800 p-4 rounded-xl outline-none"
          />

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
            Sign Up
          </button>

        </div>

      </div>

    </div>
  )
}