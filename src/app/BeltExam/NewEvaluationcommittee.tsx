"use Client"

import React from "react"
import Select from "react-select"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const reponsibleOptions = [
  { value: "Responsável 01", label: "Responsável 01" },
  { value: "Responsável 02", label: "Responsável 02" },
  { value: "Responsável 03", label: "Responsável 03" }
]

const evaluatorOptions = [
  { value: "Avaliador 01", label: "Avaliador 01" },
  { value: "Avaliador 02", label: "Avaliador 02" },
  { value: "Avaliador 03", label: "Avaliador 03" },
  { value: "Avaliador 04", label: "Avaliador 04" },
  { value: "Avaliador 05", label: "Avaliador 05" }
]

const studentOptions = [
  { value: "Estudante1", label: "Estudante1" },
  { value: "Estudante2", label: "Estudante2" },
  { value: "Estudante3", label: "Estudante3" },
  { value: "Estudante4", label: "Estudante4" },
  { value: "Estudante5", label: "Estudante5" }
]

const beltLevelOptions = [
  { value: "Branca", label: "Branca" },
  { value: "Amarela", label: "Amarela" },
  { value: "Vermelha", label: "Vermelha" }
]

interface NewEvaluationCommitteeProps {
  setNewEvaluationCommittee: React.Dispatch<React.SetStateAction<boolean>>
  // Exemplo futuro:
  // committeeName?: string
  // onSave?: () => void
}

const NewEvaluationCommittee = ({setNewEvaluationCommittee}: NewEvaluationCommitteeProps) => {
  return (
    <Card className="w-full bg-slate-900 border border-slate-700 shadow-md">
      <CardHeader>
        <CardTitle className="text-white text-base">
          Mesa Avaliadora
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Responsável</label>
            <Select options={reponsibleOptions} placeholder="Select" />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Avaliadores</label>
            <Select
              options={evaluatorOptions}
              isMulti
              placeholder="Select"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Alunos</label>
            <Select
              options={studentOptions}
              isMulti
              placeholder="Select"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Belt Level</label>
            <Select options={beltLevelOptions} placeholder="Select" />
          </div>

          <Button 
            className="mt-10 col-start-3 self-end bg-red-400 hover:bg-red-500"
            onClick={() => setNewEvaluationCommittee(false)}
          >
            Cancelar
          </Button>

          <Button className="mt-10 col-start-4 self-end bg-emerald-600 hover:bg-emerald-700">
            Criar Mesa
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default NewEvaluationCommittee
