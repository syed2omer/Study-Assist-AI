import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full flex items-center justify-between px-10 py-6 z-50 backdrop-blur-md bg-black/50 border-b border-white/5">

      <h1 className="text-3xl font-bold text-white">
        Study Assist
      </h1>

      <div className="flex items-center gap-4">

        <Link
          to="/login"
          className="text-zinc-300 hover:text-white transition"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="bg-white text-black px-5 py-2 rounded-xl font-medium hover:scale-105 transition"
        >
          Get Started
        </Link>

      </div>

    </nav>
  )
}