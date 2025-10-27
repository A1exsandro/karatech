"use client"

import React from "react"

const evaluationCommittee = {
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
    {
      id: "04040",
      name: "Alexsandro",
    },
    {
      id: "010304",
      name: "Takuma",
    },
  ],
  student_under_evaluation: [
    {
      status: "PENDING",
      score: 0,
      approved: false,
      grace_period: 0,
      student: {
        id: "0202",
        name: "Yoshi",
      },
      evaluator: {
        id: "010304",
        name: "Takuma",
      },
      techquiques: [
        {
          status: "PENDING",
          score: 0,
          description: "Gedan Barai Uke",
        },
      ],
    },
    {
      status: "PENDING",
      score: 0,
      approved: false,
      grace_period: 0,
      student: {
        id: "0203",
        name: "Yori",
      },
      evaluator: {
        id: "010304",
        name: "Takuma",
      },
      techquiques: [
        {
          status: "STARTED",
          score: 0,
          description: "Oi Zuki",
        },
        {
          status: "PENDING",
          score: 0,
          description: "Gedan Barai Uke",
        },
        {
          status: "FINISHED",
          score: 4.5,
          description: "Jodan Barai Uke",
        },
      ],
    },
  ],
}

const EvaluationCommitte = () => {
  return (
    <div className="text-white p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-lg space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-emerald-400">Mesa Avaliadora</h1>
        <p className="text-gray-300 mt-1">
          <span className="font-medium text-gray-100">Responsável:</span>{" "}
          {evaluationCommittee.responsible.name}
        </p>
        <p className="text-gray-300">
          <span className="font-medium text-gray-100">Nível da Faixa:</span>{" "}
          {evaluationCommittee.belt_level.name}
        </p>
      </div>

      {/* Avaliadores */}
      <div>
        <h2 className="text-lg font-semibold text-emerald-400 border-b border-slate-700 pb-1">
          Avaliadores
        </h2>
        <ul className="mt-3 space-y-2">
          {evaluationCommittee.evaluation_committees.map((evaluator) => (
            <li
              key={evaluator.id}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 flex items-center justify-between hover:bg-slate-700 transition"
            >
              <span>{evaluator.name}</span>
              <span className="text-sm text-gray-400">ID: {evaluator.id}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Estudantes */}
      <div>
        <h2 className="text-lg font-semibold text-emerald-400 border-b border-slate-700 pb-1">
          Estudantes Avaliados
        </h2>
        <ul className="mt-3 space-y-3">
          {evaluationCommittee.student_under_evaluation.map((item, index) => (
            <li
              key={index}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 transition"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <p className="font-medium text-gray-100">
                    {item.student.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    Avaliador: {item.evaluator.name}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.status === "PENDING"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : item.status === "STARTED"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>

              <div className="mt-2 text-sm text-gray-400">
                {/* <span className="font-medium text-gray-300">
                  Técnica:
                </span>{" "} */}
                <h2 className="text-lg font-semibold text-emerald-400 border-b border-slate-700 pb-1">
                  Técnicas
                </h2>
                {/* {item.techquiques.map((tech, i) => (
                  <span key={i}>{tech.description}</span>
                ))} */}
                <ul className="mt-3 space-y-2">
                  {item.techquiques.map((tech, i) => (
                    <li
                      key={i}
                      className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 flex items-center justify-between hover:bg-slate-700 transition"
                    >
                      <span>{tech.description}</span>

                      <span className="">Nota: {tech.score}</span>
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
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default EvaluationCommitte
