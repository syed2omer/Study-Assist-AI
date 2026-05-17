import { useState } from "react"
import axios from "axios"

export default function Upload() {

  const [file, setFile] = useState(null)
  const [response, setResponse] = useState("")

  const handleUpload = async () => {

    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    try {

      const res = await axios.post(
        "http://127.0.0.1:8000/upload-pdf",
        formData
      )

      setResponse(res.data.text)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      <div className="w-full max-w-3xl bg-zinc-900 p-8 rounded-3xl border border-zinc-800">

        <h1 className="text-4xl font-bold mb-8">
          Upload PDF Notes
        </h1>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-6"
        />

        <button
          onClick={handleUpload}
          className="bg-white text-black px-6 py-3 rounded-xl font-semibold"
        >
          Upload
        </button>

        <div className="mt-8 text-zinc-300 whitespace-pre-wrap">
          {response}
        </div>

      </div>

    </div>
  )
}