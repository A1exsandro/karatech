"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { PlusCircle } from "lucide-react"
import NewEvaluationCommittee from "./NewEvaluationcommittee"
import EvaluationCommitte from "./EvaluationCommittee"

const BeltExam = () => {
  const [creatingExam, setCreatingExam] = useState(false)
  const [newEvaluationCommittee, setNewEvaluationCommittee] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6 tracking-tight">🏅 Belt Exam</h1>

      {!creatingExam && (
        <Button 
          onClick={() => setCreatingExam(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <PlusCircle className="w-5 h-5" />
          Create Belt Exam
        </Button>
      )}

      {creatingExam && (
        <Card className="w-full max-w-4xl bg-slate-800 border-slate-700 shadow-xl mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white">Exam Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4 text-sm text-gray-300">
              <div>
                <span className="font-medium text-gray-100">Responsible:</span> Alexsandro
              </div>
              <div>
                <span className="font-medium text-gray-100">Date:</span> 25/10/2025 - 14:31
              </div>
              <div>
                <span className="font-medium text-gray-100">Location:</span> Ginásio de Ubatuba
              </div>
            </div>

            <Separator className="bg-slate-700" />

            <Button 
              onClick={() => setNewEvaluationCommittee(true)}
              variant="outline"
              className="hover:cursor-pointer hover:scale-110"
            >
              + Adicionar Mesa Avaliadora
            </Button>

            {newEvaluationCommittee && (
              <CardFooter className="flex flex-col gap-4">
                <NewEvaluationCommittee 
                  setNewEvaluationCommittee={setNewEvaluationCommittee}
                />
              </CardFooter>
            )}
            
            <EvaluationCommitte />
          </CardContent>

        </Card>
      )}
    </div>
  )
}

export default BeltExam
