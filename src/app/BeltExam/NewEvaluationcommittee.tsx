"use client"

import React, { useState } from "react"
import Select from "react-select"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCommitteeStore } from "@/shared/stores/committeeStore"

const responsibleOptions = [
  { value: "04040", label: "Responsável 01" },
  { value: "04041", label: "Responsável 02" },
  { value: "04042", label: "Responsável 03" }
]

const evaluatorOptions = [
  { value: "010301", label: "Avaliador 01" },
  { value: "010302", label: "Avaliador 02" },
  { value: "010303", label: "Avaliador 03" },
  { value: "010304", label: "Avaliador 04" },
  { value: "010305", label: "Avaliador 05" }
]

const studentOptions = [
  { value: "0201", label: "Estudante 1" },
  { value: "0202", label: "Estudante 2" },
  { value: "0203", label: "Estudante 3" },
  { value: "0204", label: "Estudante 4" },
  { value: "0205", label: "Estudante 5" }
]

const beltLevelOptions = [
  { value: "01", label: "Branca" },
  { value: "02", label: "Amarela" },
  { value: "03", label: "Vermelha" }
]

// 🔸 Técnicas da faixa amarela
const yellowBelt = [
  { id: "01", name: "Avança Zenkutsu Dachi com Gedan Barai Uke" },
  { id: "02", name: "Avança Zenkutsu Dachi com Uchi Uke" },
  { id: "03", name: "Avança Zenkutsu Dachi com Soto Uke" },
  { id: "04", name: "Avança Zenkutsu Dachi com Jodan Age Uke" },
  { id: "05", name: "Avança Kokutsu Dachi com Shuto Uke" },
  { id: "06", name: "Avança Zenkutsu Dachi com T-zuki" },
  { id: "07", name: "Heian Shodan" },
]

type TechniqueStatus = "PENDING" | "STARTED" | "FINISHED"

interface NewEvaluationCommitteeProps {
  setNewEvaluationCommittee: React.Dispatch<React.SetStateAction<boolean>>
}

const NewEvaluationCommittee = ({ setNewEvaluationCommittee }: NewEvaluationCommitteeProps) => {
  const { setCommittee } = useCommitteeStore()

  // Estados locais
  const [responsible, setResponsible] = useState<{ value: string; label: string } | null>(null)
  const [evaluators, setEvaluators] = useState<{ value: string; label: string }[]>([])
  const [students, setStudents] = useState<{ value: string; label: string }[]>([])
  const [beltLevel, setBeltLevel] = useState<{ value: string; label: string } | null>(null)

  // 🔹 converte técnicas de faixa para formato do exame
  const generateTechniquesForBelt = (beltTechniques: typeof yellowBelt) => {
    return beltTechniques.map((tech) => ({
      id: tech.id,
      description: tech.name,
      status: "PENDING" as TechniqueStatus,
      score: 0,
    }))
  }

  const handleCreateCommittee = () => {
    if (!responsible || !evaluators.length || !students.length || !beltLevel) {
      alert("Por favor, preencha todos os campos antes de criar a mesa.")
      return
    }

    // 🔹 monta o objeto Committee
    const newCommittee = {
      status: "STARTED" as const,
      responsible: {
        id: responsible.value,
        name: responsible.label,
      },
      belt_level: {
        id: beltLevel.value,
        name: beltLevel.label,
      },
      evaluation_committees: evaluators.map((ev) => ({
        id: ev.value,
        name: ev.label,
      })),
      student_under_evaluation: students.map((st) => ({
        status: "PENDING" as const,
        score: 0,
        approved: false,
        grace_period: 0,
        student: { id: st.value, name: st.label },
        evaluator: { id: evaluators[0].value, name: evaluators[0].label }, // ou lógica para distribuir
        techniques: generateTechniquesForBelt(yellowBelt), // ⚠️ substituir com base na faixa
      })),
    }

    // 🔹 salva no Zustand
    setCommittee(newCommittee)

    // fecha o formulário
    setNewEvaluationCommittee(false)
  }

  return (
    <Card className="w-full bg-slate-900 border border-slate-700 shadow-md">
      <CardHeader>
        <CardTitle className="text-white text-base">Mesa Avaliadora</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Responsável</label>
            <Select
              options={responsibleOptions}
              placeholder="Select"
              onChange={(opt) => setResponsible(opt)}
              value={responsible}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Avaliadores</label>
            <Select
              options={evaluatorOptions}
              isMulti
              placeholder="Select"
              onChange={(opts) => setEvaluators(opts as any)}
              value={evaluators}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Alunos</label>
            <Select
              options={studentOptions}
              isMulti
              placeholder="Select"
              onChange={(opts) => setStudents(opts as any)}
              value={students}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Belt Level</label>
            <Select
              options={beltLevelOptions}
              placeholder="Select"
              onChange={(opt) => setBeltLevel(opt)}
              value={beltLevel}
            />
          </div>

          <Button
            className="mt-10 col-start-3 self-end bg-red-400 hover:bg-red-500"
            onClick={() => setNewEvaluationCommittee(false)}
          >
            Cancelar
          </Button>

          <Button
            className="mt-10 col-start-4 self-end bg-emerald-600 hover:bg-emerald-700"
            onClick={handleCreateCommittee}
          >
            Criar Mesa
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default NewEvaluationCommittee
