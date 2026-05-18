import { useState } from "react"
import axios from "axios"
import ReactMarkdown from "react-markdown"
import { motion } from "framer-motion"
import { PieChart, Pie, Cell, Tooltip } from "recharts"

export default function Upload() {

  const [file, setFile] = useState(null)
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const data = [
    { name: "Concepts", value: 45 },
    { name: "Examples", value: 30 },
    { name: "Definitions", value: 25 },
  ]

  const handleUpload = async () => {

    if (!file) return

    setLoading(true)

    const formData = new FormData()
    formData.append("file", file)

    try {

      // Upload PDF
      const uploadRes = await axios.post(
        "http://127.0.0.1:8000/upload-pdf",
        formData
      )

      const extractedText = uploadRes.data.text

      // Generate AI Summary
      const summaryRes = await axios.post(
        "http://127.0.0.1:8000/summarize",
        {
          text: extractedText
        }
      )

      setResponse(summaryRes.data.summary)

    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >

        <h1 className="text-6xl font-bold mb-4">
          AI Study Assistant
        </h1>

        <p className="text-zinc-400 text-xl mb-12">
          Upload your notes and generate visual AI summaries.
        </p>

        {/* Upload Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-10">

          <h2 className="text-3xl font-semibold mb-6">
            Upload PDF Notes
          </h2>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-6 block"
          />

          <button
            onClick={handleUpload}
            className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition"
          >
            {loading ? "Generating AI Summary..." : "Upload & Analyze"}
          </button>

        </div>

        {/* Results */}
        {response && (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* AI Summary */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8"
            >

              <h2 className="text-3xl font-semibold mb-6">
                AI Summary
              </h2>

              <div className="prose prose-invert max-w-none">

                <ReactMarkdown>
                  {response}
                </ReactMarkdown>

              </div>

            </motion.div>

            {/* Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8"
            >

              <h2 className="text-3xl font-semibold mb-6">
                Topic Analysis
              </h2>

              <PieChart width={350} height={350}>
                <Pie
                  data={data}
                  dataKey="value"
                  outerRadius={120}
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={index} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>

              <div className="mt-8 space-y-4">

                <div className="bg-zinc-800 rounded-2xl p-4">
                  <h3 className="font-semibold text-lg">
                    Difficulty Level
                  </h3>

                  <p className="text-zinc-400">
                    Medium
                  </p>
                </div>

                <div className="bg-zinc-800 rounded-2xl p-4">
                  <h3 className="font-semibold text-lg">
                    Recommended Revision Time
                  </h3>

                  <p className="text-zinc-400">
                    45 Minutes
                  </p>
                </div>

              </div>

            </motion.div>

          </div>

        )}

      </motion.div>

    </div>
  )
}