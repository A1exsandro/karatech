import { create } from "zustand"
import { Committee } from "../types/committee"

type CommitteeStore = {
  committee: Committee | null
  setCommittee: (committee: Committee) => void
  createCommittee: (committee: Committee) => void
  clearCommittee: () => void
  updateStatus: (status: Committee["status"]) => void
  updateStudentScore: (studentId: string, score: number) => void
}

export const useCommitteeStore = create<CommitteeStore>((set) => ({
  committee: null, // 🧩 começa nulo

  setCommittee: (committee) => set({ committee }),

  createCommittee: (committee) => set({ committee }),

  clearCommittee: () => set({ committee: null }),

  updateStatus: (status) =>
    set((state) =>
      state.committee
        ? { committee: { ...state.committee, status } }
        : state
    ),

  updateStudentScore: (studentId, score) =>
    set((state) => {
      if (!state.committee) return state
      return {
        committee: {
          ...state.committee,
          student_under_evaluation: state.committee.student_under_evaluation.map((s) =>
            s.student.id === studentId ? { ...s, score } : s
          ),
        },
      }
    }),
}))
