// types/committee.ts
export type Technique = {
  id: string
  description: string
  score: number
  status: "PENDING" | "STARTED" | "FINISHED"
}

export type User = {
  id: string
  name: string
}

export type StudentEvaluation = {
  status: "PENDING" | "STARTED" | "FINISHED"
  score: number
  approved: boolean
  grace_period: number
  student: User
  evaluator: User
  techniques: Technique[]
}

export type Committee = {
  status: "PENDING" | "STARTED" | "FINISHED"
  responsible: User
  belt_level: {
    id: string
    name: string
  }
  evaluation_committees: User[]
  student_under_evaluation: StudentEvaluation[]
}
