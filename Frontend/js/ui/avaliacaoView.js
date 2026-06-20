const form = document.querySelector('#form-comentario');
const lista = document.querySelector('#lista-comentarios');
const selectUser = document.querySelector('#select-usuario-comentario');
const selectFilm = document.querySelector('#select-filme-comentario');

let nomePorUsuarioId = {};
let tituloPorFilmeId = {};

// ===================== CRIAR LINHA =====================
function criarLinha(comentario, aoEditarTexto, aoRemover) {
  const li = document.createElement('li');
  li.className = 'list-group-item';

  const autor =
    nomePorUsuarioId[comentario.usuarioId] ||
    `Usuário #${comentario.usuarioId}`;

  const filme =
    tituloPorFilmeId[comentario.filmeId] ||
    `Filme #${comentario.filmeId}`;

  // ---------------- TOPO ----------------
  const topo = document.createElement('div');
  topo.className = 'd-flex justify-content-between align-items-center';

  const info = document.createElement('span');
  info.innerHTML = `
    <strong>${autor}</strong> comentou em <em>${filme}</em>
    — <span class="badge bg-warning text-dark">★ ${comentario.nota}</span>
  `;

  const btnRemover = document.createElement('button');
  btnRemover.className = 'btn btn-sm btn-outline-danger';
  btnRemover.textContent = 'Remover';
  btnRemover.onclick = () => aoRemover(comentario.id);

  topo.append(info, btnRemover);

  // ---------------- TEXTO VISÍVEL ----------------
  const textoComentario = document.createElement('p');
  textoComentario.className = 'mt-2 mb-1';
  textoComentario.textContent = comentario.comentario;

  // ---------------- BOTÃO EDITAR ----------------
  const btnEditar = document.createElement('button');
  btnEditar.className = 'btn btn-sm btn-outline-primary';
  btnEditar.textContent = '✏️ Editar';

  // ---------------- ÁREA DE EDIÇÃO ----------------
  const editArea = document.createElement('div');
  editArea.style.display = 'none';
  editArea.className = 'mt-2';

  const textarea = document.createElement('textarea');
  textarea.className = 'form-control form-control-sm';
  textarea.value = comentario.comentario;

  const btnSalvar = document.createElement('button');
  btnSalvar.className = 'btn btn-sm btn-success mt-2 me-2';
  btnSalvar.textContent = 'Salvar';

  const btnCancelar = document.createElement('button');
  btnCancelar.className = 'btn btn-sm btn-secondary mt-2';
  btnCancelar.textContent = 'Cancelar';

  // ---------------- AÇÕES ----------------
  btnEditar.onclick = () => {
    editArea.style.display = 'block';
  };

  btnCancelar.onclick = () => {
    textarea.value = comentario.comentario;
    editArea.style.display = 'none';
  };

  btnSalvar.onclick = () => {
    const novoTexto = textarea.value;

    aoEditarTexto(comentario.id, {
      comentario: novoTexto
    });

    textoComentario.textContent = novoTexto;
    editArea.style.display = 'none';
  };

  editArea.append(textarea, btnSalvar, btnCancelar);

  // ---------------- MONTAGEM FINAL ----------------
  li.append(
    topo,
    textoComentario,
    btnEditar,
    editArea
  );

  return li;
}

// ===================== EXPORT =====================
export const avaliacaoView = {

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

  preencherSelectFilmes(filmes) {
    tituloPorFilmeId = {};
    selectFilm.innerHTML = '<option value="">Selecione o filme...</option>';

    filmes.forEach(f => {
      tituloPorFilmeId[f.id] = f.titulo || f.nome;

      const opt = document.createElement('option');
      opt.value = f.id;
      opt.textContent = `${f.titulo || f.nome} (#${f.id})`;
      selectFilm.appendChild(opt);
    });
  },

  renderLista(comentarios, aoEditarTexto, aoRemover) {
    lista.innerHTML = '';

    if (!comentarios || comentarios.length === 0) {
      lista.innerHTML =
        '<li class="list-group-item text-muted">Nenhum comentário ainda.</li>';
      return;
    }

    comentarios.forEach(c =>
      lista.appendChild(criarLinha(c, aoEditarTexto, aoRemover))
    );
  },

  limparForm() {
    document.querySelector('#comentario-texto').value = '';

    const nota = document.querySelector('#filme-nota');
    if (nota) nota.value = '';

    selectUser.value = '';
    selectFilm.value = '';
  },

  onSubmit(callback) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const notaInput = document.querySelector('#filme-nota');

      callback({
        comentario: document.querySelector('#comentario-texto').value,
        nota: notaInput ? Number(notaInput.value) : 10,
        usuarioId: Number(selectUser.value),
        filmeId: Number(selectFilm.value),
      });
    });
  }
};