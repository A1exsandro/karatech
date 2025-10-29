const exam = {
  id: 1,
  responsible_exam: 'Alexsandro',
  data: '25/10/2025 13:46',
  location: 'Ubatuba',
  evaluation_committees : [ // lista de mesa avaliadora
    { // mesa avaliadora
      id: 1,
      responsible_committee: 'Beltrano da silva',
      belt_level: 'Faixa Branca',
      responsible_teachers: [
        {
          user_id: '010101',
          user_name: 'Professor Fulano de Tal'
        }
      ],
      evaluated_students: [
        {
          user_id: '023400',
          user_name: 'Aluno Fulano de Tal'
        },
        {
          user_id: '023401',
          user_name: 'Aluno Beltrano de Tal',
          // rascunho ... 
          array_techniques_from_belt_level_relacted: [
            {
              responsible_teacher_id: '',
              techquique_id: '',
              status: 'PENDENTE | EXECULTANDO | EXECULTADO',
            }
          ]
        }
      ]
    }
  ]
}

// 🔸 Função que gera um novo Committee do zero
// const createDefaultCommittee = (): Committee => ({
//   status: "STARTED",
//   responsible: { id: "04040", name: "Alexsandro" },
//   belt_level: { id: "01", name: "Amarela" },
//   evaluation_committees: [
//     { id: "04040", name: "Alexsandro" },
//     { id: "010304", name: "Takuma" },
//   ],
//   student_under_evaluation: [
//     {
//       status: "PENDING",
//       score: 0,
//       approved: false,
//       grace_period: 0,
//       student: { id: "0202", name: "Yoshi" },
//       evaluator: { id: "010304", name: "Takuma" },
//       techniques: structuredClone(defaultTechniques),
//     },
//     {
//       status: "PENDING",
//       score: 0,
//       approved: false,
//       grace_period: 0,
//       student: { id: "0203", name: "Yori" },
//       evaluator: { id: "010304", name: "Takuma" },
//       techniques: structuredClone(defaultTechniques),
//     },
//   ],
// })
