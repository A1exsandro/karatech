"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"

interface ScoreSelectorModalProps {
  open: boolean
  initialValue?: number
  onClose: () => void
  onConfirm: (value: number) => void
}

export default function ScoreSelectorModal({
  open,
  initialValue = 0,
  onClose,
  onConfirm,
}: ScoreSelectorModalProps) {
  const [integer, setInteger] = useState(0)
  const [decimal1, setDecimal1] = useState(0)
  const [decimal2, setDecimal2] = useState(0)

  // 🧩 sempre que o modal abrir, inicializa os valores
  useEffect(() => {
    if (open) {
      setInteger(Math.floor(initialValue))
      setDecimal1(Math.floor((initialValue * 10) % 10))
      setDecimal2(Math.floor((initialValue * 100) % 10))
    }
  }, [open, initialValue])

  const currentValue = parseFloat(`${integer}.${decimal1}${decimal2}`)

  // ✅ confirma, fecha e reseta os valores
  const handleConfirm = () => {
    onConfirm(currentValue)
    onClose()
    // reseta após confirmar
    setInteger(0)
    setDecimal1(0)
    setDecimal2(0)
  }

  const renderColumn = (
    label: string,
    value: number,
    onSelect: (n: number) => void
  ) => (
    <div className="flex flex-col items-center">
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <div className="grid grid-cols-1 gap-2 bg-slate-800 rounded-xl p-2 border border-slate-700">
        {Array.from({ length: 10 }).map((_, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`w-7 h-7 flex items-center justify-center rounded-lg 
                transition font-semibold text-xs
              ${
                value === i
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-700 text-gray-300 hover:bg-slate-600"
              }`}
          >
            {i}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-80 bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-emerald-400 text-center">
            Selecione a Nota
          </DialogTitle>
        </DialogHeader>

        <Card className="bg-slate-900 border-none shadow-none">
          <CardContent>
            <div className="flex flex-col items-center mb-4">
              <p className="text-gray-400 text-sm">Nota atual:</p>
              <p className="text-2xl font-bold text-emerald-400">
                {currentValue.toFixed(2)}
              </p>

               <div className="flex justify-center mt-4">
                <button
                    onClick={handleConfirm}
                    className="bg-emerald-600 hover:bg-emerald-700 transition px-6 
                    py-1 rounded-lg font-semibold"
                >
                    Confirmar
                </button>
                </div>
            </div>

            <div className="flex items-start justify-center gap-2">
              {renderColumn("Inteiro", integer, setInteger)}
              <span className="text-xs text-gray-500 mt-10">.</span>
              {renderColumn("Décimo", decimal1, setDecimal1)}
              {renderColumn("Centésimo", decimal2, setDecimal2)}
            </div>
          </CardContent>
        </Card>

       
      </DialogContent>
    </Dialog>
  )
}
