import { Minus, Plus } from "lucide-react"
import { useState } from "react"

interface ScoreInputProps {
  value?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
}

export default function ScoreInput({
  value = 0,
  min = 0,
  max = 10,
  step = 0.1,
  onChange,
}: ScoreInputProps) {
  const [score, setScore] = useState(value)

  const handleChange = (newValue: number) => {
    const clamped = Math.min(max, Math.max(min, parseFloat(newValue.toFixed(2))))
    setScore(clamped)
    onChange?.(clamped)
  }

  const increase = () => handleChange(score + step)
  const decrease = () => handleChange(score - step)

  return (
    <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700 w-32 overflow-hidden">
      <button
        type="button"
        onClick={decrease}
        className="px-2 py-2 text-gray-300 hover:bg-slate-700 transition"
      >
        <Minus className="w-4 h-4" />
      </button>

      <input
        type="number"
        step={step}
        min={min}
        max={max}
        value={score}
        onChange={(e) => handleChange(parseFloat(e.target.value))}
        className="w-full text-center bg-transparent text-white focus:outline-none appearance-none"
      />

      <button
        type="button"
        onClick={increase}
        className="px-2 py-2 text-gray-300 hover:bg-slate-700 transition"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  )
}
