import Navbar from "../components/Navbar"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="flex flex-col items-center justify-center text-center px-6 mt-32">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold max-w-5xl leading-tight"
        >
          Your AI Study Companion
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-zinc-400 text-lg md:text-2xl mt-8 max-w-3xl"
        >
          Upload notes, generate summaries, and chat with your study material using AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/signup"
            className="mt-10 inline-block bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition"
          >
            Start Learning
          </Link>
        </motion.div>

      </div>

    </div>
  )
}