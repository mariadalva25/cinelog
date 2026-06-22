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

// ---------------- USUÁRIOS ----------------
async function atualizarUsuarios() {
  const usuarios = await usuarioService.listarTodas();
  usuarioView.renderLista(usuarios, removerUsuario);
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
    await atualizarAvaliacoes();
  } catch (err) {
    mostrarErro(err.message);
  }
}

// ---------------- FILMES ----------------
async function atualizarFilmes() {
  const filmes = await filmeService.listarTodas();
  filmeView.renderLista(filmes, removerFilme);
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
    await atualizarAvaliacoes();
  } catch (err) {
    mostrarErro(err.message);
  }
}

// ---------------- AVALIAÇÕES ----------------
async function atualizarAvaliacoes() {
  const avaliacoes = await avaliacaoService.listarTodas();
  avaliacaoView.renderLista(avaliacoes, editarComentario, removerAvaliacao);
}

async function criarAvaliacao(dados) {
  limparErro();
  try {
    await avaliacaoService.criarAvaliacao(dados);
    avaliacaoView.limparForm();
    await atualizarAvaliacoes();
  } catch (err) {
    mostrarErro(err.message);
  }
}

async function editarComentario(id, dados) {
  limparErro();
  try {
    await avaliacaoService.atualizarAvaliacao(id, dados);
    await atualizarAvaliacoes();
  } catch (err) {
    mostrarErro(err.message);
  }
}

async function removerAvaliacao(id) {
  limparErro();
  try {
    await avaliacaoService.removerAvaliacao(id);
    await atualizarAvaliacoes();
  } catch (err) {
    mostrarErro(err.message);
  }
}

// ---------------- EVENTOS ----------------
usuarioView.onSubmit(criarUsuario);
filmeView.onSubmit(criarFilme);
avaliacaoView.onSubmit(criarAvaliacao);

// ---------------- INICIALIZAÇÃO ----------------
async function iniciar() {
  try {
    await atualizarUsuarios();
    await atualizarFilmes();
    await atualizarAvaliacoes();
  } catch (err) {
    mostrarErro('Erro ao conectar com a API.');
    console.error(err);
  }
}

iniciar();