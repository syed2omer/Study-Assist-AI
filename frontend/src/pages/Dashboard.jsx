import { PieChart, Pie, Cell, Tooltip } from "recharts"
import ReactMarkdown from "react-markdown"

const data = [
  { name: "Regex", value: 40 },
  { name: "Validation", value: 35 },
  { name: "Examples", value: 25 },
]

export default function Dashboard() {

  const summary = `
# Quick Summary

PHP pattern matching uses regex for validating emails, passwords, and phone numbers.

# Difficulty Level

Medium

# Important Topics

- preg_match
- Form validation
- Password validation
- Regex symbols
`

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold mb-10">
        AI Learning Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          <h2 className="text-2xl font-semibold mb-6">
            AI Summary
          </h2>

          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>
              {summary}
            </ReactMarkdown>
          </div>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          <h2 className="text-2xl font-semibold mb-6">
            Topic Distribution
          </h2>

          <PieChart width={350} height={350}>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>

        </div>

      </div>

    </div>
  )
}