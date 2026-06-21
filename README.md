# 🎬 CineLog

Sistema de cadastro e avaliação de filmes desenvolvido com:

- Frontend: HTML, CSS, JavaScript + Bootstrap
- Backend: Node.js + SQLite
- Arquitetura: API REST simples

---

## Funcionalidades
- Cadastrar filmes e séries 
- listar filmes/séries
- Editar
- Avaliar e comentar
- Deletar 
  ## Class do  dominío
 - Filme 
- Avaliação

---

## 🔗 Relacionamentos

- Um Filme pode ter várias Avaliações
- Um Usuário pode fazer várias Avaliações
- Avaliação pertence a um Filme e a um Usuário

👉 Filme pode existir sem Avaliação  
👉 Avaliação não existe sem Filme nem Usuário  

---

## 📊 Diagrama de Classes (UML)

```mermaid

classDiagram
    class Filme {
        +String nome
        +String genero
    }

class Avaliacao {
    +int id
    +String comentario
    +int nota
    +int usuarioId
    +int filmeId
}

Usuario "1" <-- "*" Avaliacao : escreve
Filme "1" <-- "*" Avaliacao : recebe
