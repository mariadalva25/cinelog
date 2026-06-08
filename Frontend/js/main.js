import { usuarioService } from './services/usuarioService.js';
import { filmeService } from './services/filmeService.js';
import { avaliacaoService } from './services/avaliacaoService.js';
import { usuarioView } from './ui/usuarioView.js';
import { filmeView } from './ui/filmeView.js';
import { avaliacaoView } from './ui/avaliacaoView.js';

const alerta = document.querySelector('#alerta');

function mostrarErro(msg) {
  alerta.textContent = msg;
  alerta.classList.remove('d-none');
}

function limparErro() {
  alerta.classList.add('d-none');
  alerta.textContent = '';
}

// ---- Usuários ----
async function atualizarUsuarios() {
  const usuarios = await usuarioService.listar();
  usuarioView.renderLista(usuarios, removerUsuario);
  // O dropdown de avaliações depende dos usuários cadastrados
  avaliacaoView.preencherSelectUsuarios(usuarios);
}

async function criarUsuario(dados) {
  limparErro();
  try {
    await usuarioService.criar(dados);
    usuarioView.limparForm();
    await atualizarUsuarios();
  } catch (err) { 
    mostrarErro(err.message); 
  }
}

async function removerUsuario(id) {
  limparErro();
  try {
    await usuarioService.remover(id);
    await atualizarUsuarios();
    // Atualiza as avaliações pois o autor pode ter sido removido
    await atualizarAvaliacoes(); 
  } catch (err) { 
    mostrarErro(err.message); 
  }
}

// ---- Filmes ----
async function atualizarFilmes() {
  const filmes = await filmeService.listar();
  filmeView.renderLista(filmes, removerFilme);
  // O dropdown de avaliações também depende dos filmes cadastrados
  avaliacaoView.preencherSelectFilmes(filmes);
}

async function criarFilme(dados) {
  limparErro();
  try {
    await filmeService.criar(dados);
    filmeView.limparForm();
    await atualizarFilmes();
  } catch (err) { 
    mostrarErro(err.message); 
  }
}

async function removerFilme(id) {
  limparErro();
  try {
    await filmeService.remover(id);
    await atualizarFilmes();
    // Atualiza as avaliações pois o filme avaliado pode ter sido removido
    await atualizarAvaliacoes();
  } catch (err) { 
    mostrarErro(err.message); 
  }
}

// ---- Avaliações (Comentários) ----
async function atualizarAvaliacoes() {
  const avaliacoes = await avaliacaoService.listar();
  avaliacaoView.renderLista(avaliacoes, editarComentario, removerAvaliacao);
}

async function criarAvaliacao(dados) {
  limparErro();
  try {
    await avaliacaoService.criar(dados);
    avaliacaoView.limparForm();
    await atualizarAvaliacoes();
  } catch (err) { 
    mostrarErro(err.message); 
  }
}

async function editarComentario(id, comentario) {
  limparErro();
  try {
    await avaliacaoService.atualizar(id, comentario);
    await atualizarAvaliacoes();
  } catch (err) { 
    mostrarErro(err.message); 
  }
}

async function removerAvaliacao(id) {
  limparErro();
  try {
    await avaliacaoService.remover(id);
    await atualizarAvaliacoes();
  } catch (err) { 
    mostrarErro(err.message); 
  }
}

// ---- Inicialização de Ouvintes de Eventos (Submit / Ações) ----
usuarioView.onSubmit(criarUsuario);
filmeView.onSubmit(criarFilme);

avaliacaoView.onSubmit(criarAvaliacao);
// Garanta que sua view possua estas escutas ou trate-as diretamente no renderLista
if (typeof avaliacaoView.onEditComentario === 'function') avaliacaoView.onEditComentario(editarComentario);
if (typeof avaliacaoView.onRemove === 'function') avaliacaoView.onRemove(removerAvaliacao);

// ---- Inicialização da Aplicação ----
async function iniciar() {
  try {
    await atualizarUsuarios();   // Carrega usuários e preenche select-usuarios
    await atualizarFilmes();     // Carrega filmes e preenche select-filmes
    await atualizarAvaliacoes(); // Carrega e renderiza a lista de comentários
  } catch (err) {
    mostrarErro('Não consegui falar com a API. O backend está rodando na porta correta? O CORS está habilitado?');
    console.error(err);
  }
}

iniciar();
