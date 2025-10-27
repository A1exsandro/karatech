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
