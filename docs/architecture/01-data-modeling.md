# 📊 Modelagem de Dados

```mermaid
erDiagram
  ALUNO {
    int id
    string nome
    date nascimento
    string faixa_atual
    string telefone
  }

  TECNICA {
    int id
    string nome
    string categoria
    string descricao
  }

  ALUNO_TECNICA {
    int id
    int aluno_id
    int tecnica_id
    date data_aprendizado
  }

  ALUNO ||--o{ ALUNO_TECNICA : "aprende"
  TECNICA ||--o{ ALUNO_TECNICA : "é aprendida por"
