"use client"

import React, { useState } from "react"
import ScoreSelectorModal from "./components/ScoreSelectorModal"

type TechniqueStatus = "PENDING" | "STARTED" | "FINISHED"

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

// 🔹 converte técnicas de faixa para formato do exame
const generateTechniquesForBelt = (beltTechniques: typeof yellowBelt) => {
  return beltTechniques.map((tech) => ({
    id: tech.id,
    description: tech.name,
    status: "PENDING" as TechniqueStatus,
    score: 0,
  }))
}

const EvaluationCommitte = () => {
    // 🔹 Gera técnicas da faixa automaticamente
  const defaultTechniques = generateTechniquesForBelt(yellowBelt)

  const [committee, setCommittee] = useState({
    status: "EM ANDAMENTO",
    responsible: {
      id: "04040",
      name: "Alexsandro",
    },
    belt_level: {
      id: "01",
      name: "Amarela",
    },
    evaluation_committees: [
      { id: "04040", name: "Alexsandro" },
      { id: "010304", name: "Takuma" },
    ],
    student_under_evaluation: [
      {
        status: "PENDING",
        score: 0,
        approved: false,
        grace_period: 0,
        student: { id: "0202", name: "Yoshi" },
        evaluator: { id: "010304", name: "Takuma" },
        techniques: structuredClone(defaultTechniques)
      },
      {
        status: "PENDING",
        score: 0,
        approved: false,
        grace_period: 0,
        student: { id: "0203", name: "Yori" },
        evaluator: { id: "010304", name: "Takuma" },
        techniques: structuredClone(defaultTechniques)
      },
    ],
  })

  // 🔁 Alternar status da técnica clicada
  const handleTechniqueClick = (studentIndex: number, techniqueIndex: number) => {
    setCommittee((prev) => {
      const newCommittee = structuredClone(prev)
      const technique =
        newCommittee.student_under_evaluation[studentIndex].techniques[techniqueIndex]

      const nextStatus: Record<TechniqueStatus, TechniqueStatus> = {
        PENDING: "STARTED",
        STARTED: "FINISHED",
        FINISHED: "PENDING",
      }

      technique.status = nextStatus[technique.status as TechniqueStatus]
      return newCommittee
    })
  }

  // 🧮 Atualizar score
  const handleScoreChange = (
    studentIndex: number,
    techniqueIndex: number,
    newScore: number
  ) => {
    setCommittee((prev) => {
      const newCommittee = structuredClone(prev)
      newCommittee.student_under_evaluation[studentIndex].techniques[techniqueIndex].score =
        newScore
      return newCommittee
    })
  }

  // 🪟 Controle do modal de nota
  const [showSelector, setShowSelector] = useState(false)
  const [currentStudent, setCurrentStudent] = useState<number | null>(null)
  const [currentTechnique, setCurrentTechnique] = useState<number | null>(null)
  const [selectedScore, setSelectedScore] = useState<number>(0)

  const openScoreSelector = (
    studentIndex: number,
    techniqueIndex: number,
    score: number
  ) => {
    setCurrentStudent(studentIndex)
    setCurrentTechnique(techniqueIndex)
    setSelectedScore(score)
    setShowSelector(true)
  }

  // const handleConfirmScore = (newScore: number) => {
  //   if (currentStudent !== null && currentTechnique !== null) {
  //     setCommittee((prev) => {
  //       const newCommittee = structuredClone(prev)
  //       newCommittee.student_under_evaluation[currentStudent].techniques[
  //         currentTechnique
  //       ].score = newScore
  //       return newCommittee
  //     })
  //   }

  //   // ✅ fecha o modal ao confirmar
  //   setShowSelector(false)
  // }
  const handleConfirmScore = (newScore: number) => {
    if (currentStudent !== null && currentTechnique !== null) {
      setCommittee((prev) => {
        const newCommittee = structuredClone(prev)
        const student = newCommittee.student_under_evaluation[currentStudent]

        // Atualiza a nota da técnica
        student.techniques[currentTechnique].score = newScore

        // 🔢 Calcula a média das notas das técnicas
        const totalScore = student.techniques.reduce(
          (acc, tech) => acc + tech.score,
          0
        )
        const avgScore =
          student.techniques.length > 0
            ? totalScore / student.techniques.length
            : 0

        // Atualiza a nota final do aluno
        student.score = parseFloat(avgScore.toFixed(2))

        return newCommittee
      })
    }

    // ✅ Fecha o modal e limpa seleções
    setShowSelector(false)
    setSelectedScore(0)
    setCurrentStudent(null)
    setCurrentTechnique(null)
  }


  return (
    <div className="text-white p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-lg space-y-6 max-w-4xl mx-auto">
      {/* 🔹 Cabeçalho */}
      <div>
        <h1 className="text-xl font-bold text-emerald-400">Mesa Avaliadora</h1>
        <p className="text-gray-300 mt-1">
          <span className="font-medium text-gray-100">Responsável:</span>{" "}
          {committee.responsible.name}
        </p>
        <p className="text-gray-300">
          <span className="font-medium text-gray-100">Nível da Faixa:</span>{" "}
          {committee.belt_level.name}
        </p>
      </div>

      {/* Avaliadores */}
      <div>
        <h2 className="text-lg font-semibold text-emerald-400 border-b border-slate-700 pb-1">
          Avaliadores
        </h2>
        <ul className="mt-3 space-y-2">
          {committee.evaluation_committees.map((evaluator) => (
            <li
              key={evaluator.id}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 flex 
              items-center justify-between hover:bg-slate-700 transition"
            >
              <span>{evaluator.name}</span>
              <span className="text-sm text-gray-400">ID: {evaluator.id}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 🔹 Estudantes */}
      <div>
        <h2 className="text-lg font-semibold text-emerald-400 border-b border-slate-700 pb-1">
          Estudantes Avaliados
        </h2>

        <ul className="mt-3 space-y-3">
          {committee.student_under_evaluation.map((student, sIdx) => (
            <li
              key={sIdx}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <p className="font-medium text-gray-100">
                    {student.student.name}
                  </p>

                  <div className="mt-2 sm:mt-0 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        student.status === "PENDING"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : student.status === "STARTED"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {student.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-400">
                    Avaliador: {student.evaluator.name}
                  </p>

                   <span className="text-gray-300">
                        Nota Final:{" "}
                      <span className="text-emerald-400 font-semibold">
                        {student.score.toFixed(2)}
                      </span>
                    </span>
                </div>
              </div>

              

              <h3 className="mt-3 text-md font-semibold text-emerald-400 border-b border-slate-700 pb-1">
                Técnicas
              </h3>

              <ul className="mt-3 space-y-2">
                {student.techniques.map((tech, tIdx) => (
                  <li
                    key={tIdx}
                    className="bg-slate-800 border border-slate-700 rounded-xl 
                    px-4 py-2 flex items-center justify-between hover:bg-slate-700 
                    transition cursor-pointer text-xs md:text-sm"
                    onClick={() => openScoreSelector(sIdx, tIdx, tech.score)}
                  >
                    <span>{tech.description}</span>

                    <div className="flex flex-col items-center gap-1">

                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          tech.status === "PENDING"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : tech.status === "STARTED"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {tech.status}
                      </span>

                      <span className="text-gray-300">
                        Nota:{" "}
                        <span className="text-emerald-400 font-semibold">
                          {tech.score.toFixed(2)}
                        </span>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* 🧮 Modal de seleção de nota */}
      <ScoreSelectorModal
        open={showSelector}
        initialValue={selectedScore}
        onConfirm={handleConfirmScore}
        onClose={() => setShowSelector(false)}
      />
    </div>
  )
}

export default EvaluationCommitte
