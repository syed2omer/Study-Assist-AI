import { useState } from "react"
import axios from "axios"

export default function Chat() {

  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)

  const askQuestion = async () => {

    setLoading(true)

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/chat",
        {
          question
        }
      )

      setAnswer(response.data.answer)

    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold mb-10">
        AI Study Chat
      </h1>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-4xl">

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything from your uploaded notes..."
          className="w-full h-40 bg-zinc-800 rounded-2xl p-4 outline-none"
        />

        <button
          onClick={askQuestion}
          className="mt-6 bg-white text-black px-6 py-3 rounded-xl font-semibold"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        <div className="mt-10 whitespace-pre-wrap text-zinc-300 leading-8">
          {answer}
        </div>

      </div>

    </div>
  )
}