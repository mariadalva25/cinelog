// Seletores baseados na nova estrutura do HTML (Seção de Comentários)
const form      = document.querySelector('#form-comentario');
const lista     = document.querySelector('#lista-comentarios');
const selectUser = document.querySelector('#select-usuario-comentario');
const selectFilm = document.querySelector('#select-filme-comentario');

// Dicionários (índices id -> nome) para mapear os IDs aos nomes textuais na listagem
let nomePorUsuarioId = {};
let tituloPorFilmeId = {};

function criarLinha(comentario, aoEditarTexto, aoRemover) {
  const li = document.createElement('li');
  li.className = 'list-group-item';

  const topo = document.createElement('div');
  topo.className = 'd-flex justify-content-between align-items-center';

  // Busca o nome do usuário e título do filme nos dicionários carregados
  const autor = nomePorUsuarioId[comentario.usuarioId] || `Usuário #${comentario.usuarioId}`;
  const filme = tituloPorFilmeId[comentario.filmeId] || `Filme #${comentario.filmeId}`;
  
  const info = document.createElement('span');
  info.innerHTML = `<strong>${autor}</strong> comentou em <em>${filme}</em> — <span class="badge bg-warning text-dark">★ ${comentario.nota}</span>`;

  const btnRemover = document.createElement('button');
  btnRemover.className = 'btn btn-sm btn-outline-danger';
  btnRemover.textContent = 'Remover';
  btnRemover.addEventListener('click', () => aoRemover(comentario.id));

  topo.append(info, btnRemover);

  // Linha de edição do texto do comentário (PUT)
  const edicao = document.createElement('div');
  edicao.className = 'd-flex align-items-center gap-2 mt-2';

  const textarea = document.createElement('textarea');
  textarea.rows = '1';
  textarea.className = 'form-control form-control-sm';
  textarea.value = comentario.comentario;

  const btnSalvar = document.createElement('button');
  btnSalvar.className = 'btn btn-sm btn-outline-primary text-nowrap';
  btnSalvar.textContent = 'Salvar';
  btnSalvar.addEventListener('click', () => aoEditarTexto(comentario.id, textarea.value));

  edicao.append(textarea, btnSalvar);
  li.append(topo, edicao);
  return li;
}

export const comentarioView = {
  // Popula o <select> de usuários na seção de comentários
  preencherSelectUsuarios(usuarios) {
    nomePorUsuarioId = {};
    selectUser.innerHTML = '<option value="">Quem está comentando?</option>';
    usuarios.forEach(u => {
      nomePorUsuarioId[u.id] = u.nome;
      const opt = document.createElement('option');
      opt.value = u.id;
      opt.textContent = `${u.nome} (#${u.id})`;
      selectUser.appendChild(opt);
    });
  },

  // Popula o <select> de filmes na seção de comentários
  preencherSelectFilmes(filmes) {
    tituloPorFilmeId = {};
    selectFilm.innerHTML = '<option value="">Selecione o filme...</option>';
    filmes.forEach(f => {
      tituloPorFilmeId[f.id] = f.titulo || f.nome; // Aceita 'titulo' ou 'nome' vindo da API
      const opt = document.createElement('option');
      opt.value = f.id;
      opt.textContent = `${f.titulo || f.nome} (#${f.id})`;
      selectFilm.appendChild(opt);
    });
  },

  // Renderiza a lista de comentários postados
  renderLista(comentarios, aoEditarTexto, aoRemover) {
    lista.innerHTML = '';
    if (!comentarios || comentarios.length === 0) {
      lista.innerHTML = '<li class="list-group-item text-muted">Nenhum comentário ainda.</li>';
      return;
    }
    comentarios.forEach(c => lista.appendChild(criarLinha(c, aoEditarTexto, aoRemover)));
  },

  // Limpa os campos após o envio com sucesso
  limparForm() {
    document.querySelector('#comentario-texto').value = '';
    if (document.querySelector('#filme-nota')) {
      document.querySelector('#filme-nota').value = '';
    }
    selectUser.value = '';
    selectFilm.value = '';
  },

  // Captura o evento de envio do formulário de comentários
  onSubmit(callback) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Captura o campo de nota se você decidir adicioná-lo ao HTML, caso contrário assume 10 por padrão
      const notaInput = document.querySelector('#filme-nota');
      
      callback({
        comentario: document.querySelector('#comentario-texto').value,
        nota:       notaInput ? notaInput.value : 10, 
        usuarioId:  selectUser.value,
        filmeId:    selectFilm.value,
      });
    });
  },
};
