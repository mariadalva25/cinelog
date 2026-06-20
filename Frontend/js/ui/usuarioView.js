const form  = document.querySelector('#form-usuario');
const lista = document.querySelector('#lista-usuarios');

function criarLinha(usuario, aoRemover) {
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center';

  const texto = document.createElement('span');
  const email = usuario.email ? ` · ${usuario.email}` : '';
  texto.textContent = `#${usuario.id} — ${usuario.nome}${email}`;

  const btn = document.createElement('button');
  btn.className = 'btn btn-sm btn-outline-danger';
  btn.textContent = 'Remover';
  btn.addEventListener('click', () => aoRemover(usuario.id));

  li.append(texto, btn);
  return li;
}

export const usuarioView = {
  renderLista(usuarios, aoRemover) {
    lista.innerHTML = '';
    if (usuarios.length === 0) {
      lista.innerHTML = '<li class="list-group-item text-muted">Nenhum usuário ainda.</li>';
      return;
    }
    usuarios.forEach(u => lista.appendChild(criarLinha(u, aoRemover)));
  },

  limparForm() { form.reset(); },

  onSubmit(callback) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      callback({
        nome:  document.querySelector('#usr-nome').value,
        email: document.querySelector('#usr-email').value,
      });
    });
  },
};