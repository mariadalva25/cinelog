const form   = document.querySelector('#form-avaliacao');
const lista  = document.querySelector('#lista-avaliacao');
const select = document.querySelector('#avaliacao-usuario');

// índice id->nome para exibir o dono da conta
let nomePorUsuarioId = {};

function criarLinha(avaliacao, aoEditarComentario, aoRemover) {
  const li = document.createElement('li');
  li.className = 'list-group-item';

  const topo = document.createElement('div');
  topo.className = 'd-flex justify-content-between align-items-center';

  const dono = nomePorUsuarioId[avaliacao.usuarioId] || `usuário #${avaliacao.usuarioId}`;
  const info = document.createElement('span');
  info.innerHTML = `#${avaliacao.id} — <strong>${avaliacao.tipo}</strong> de ${dono}`;

  const btnRemover = document.createElement('button');
  btnRemover.className = 'btn btn-sm btn-outline-danger';
  btnRemover.textContent = 'Remover';
  btnRemover.addEventListener('click', () => aoRemover(avaliacao.id));

  topo.append(info, btnRemover);


  const edicao = document.createElement('div');
  edicao.className = 'd-flex align-items-center gap-2 mt-2';

  const input = document.createElement('input');
  input.type = 'number';
  input.step = '0.01';
  input.value = avaliacao.nota;
  input.className = 'form-control form-control-sm comentario-input';

  const btnSalvar = document.createElement('button');
  btnSalvar.className = 'btn btn-sm btn-outline-primary';
  btnSalvar.textContent = 'Salvar nota';
  btnSalvar.addEventListener('click', () => aoEditarNota(avaliacao.id, input.value));

  const atual = document.createElement('small');
  atual.className = 'text-muted';
  atual.textContent = `atual: ${avaliacao.nota}`;

  edicao.append(input, btnSalvar, atual);
  li.append(topo, edicao);
  return li;
}

export const avaliacaoView = {
  // popula o <select> com os clientes existentes
  preencherSelectClientes(usuario) {
    nomePorUsuarioId = {};
    select.innerHTML = '<option value="">Selecione o cliente...</option>';
    clientes.forEach(c => {
      nomePorUsuarioId[c.id] = c.nome;
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = `${c.nome} (#${c.id})`;
      select.appendChild(opt);
    });
  },

  renderLista(avaliacoes, aoEditarComentario, aoRemover) {
    lista.innerHTML = '';
    if (avaliacoes.length === 0) {
      lista.innerHTML = '<li class="list-group-item text-muted">Nenhuma avaliação ainda.</li>';
      return;
    }
    avaliacoes.forEach(a => lista.appendChild(criarLinha(a, aoEditarComentario, aoRemover)));
  },

  limparForm() {
    document.querySelector('#avaliacao-nota').value = '';
    select.value = '';
  },

  onSubmit(callback) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      callback({
        tipo:      document.querySelector('#avaliacao-tipo').value,
        nota:     document.querySelector('#avaliacao-nota').value,
        usuarioId: select.value,
      });
    });
  },
};