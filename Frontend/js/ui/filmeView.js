const form  = document.querySelector('#form-filme');
const lista = document.querySelector('#lista-filme');

function criarLinha(filme, aoRemover) {
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center';

  const texto = document.createElement('span');
  const email = filme.email ? ` · ${filme.email}` : '';
  texto.textContent = `#${filme.id} — ${filme.titulo} (${filme.ano})${email}`;

  const btn = document.createElement('button');
  btn.className = 'btn btn-sm btn-outline-danger';
  btn.textContent = 'Remover';
  btn.addEventListener('click', () => aoRemover(filme.id));

  li.append(texto, btn);
  return li;
}

export const filmeView = {
  renderLista(filmes, aoRemover) {
    lista.innerHTML = '';
    if (filmes.length === 0) {
      lista.innerHTML = '<li class="list-group-item text-muted">Nenhum filme ainda.</li>';
      return;
    }
    filmes.forEach(f => lista.appendChild(criarLinha(f, aoRemover)));
  },

  limparForm() { form.reset(); },

  onSubmit(callback) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      callback({
        titulo:  document.querySelector('#fil-titulo').value,
        ano:   document.querySelector('#fil-ano').value,
        genero: document.querySelector('#fil-genero').value,
      });
    });
  },
};