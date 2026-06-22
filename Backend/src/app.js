import express from 'express';
import cors from 'cors';
import usuarioRouter from './routes/usuario.js';
import filmeRouter from './routes/filme.js';
import avaliacaoRouter from './routes/avaliacao.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';


const app = express();
app.use(cors());           // habilita CORS para todas as rotas
app.use(express.json());   // parseia JSON no body
app.use(logger);           // loga toda requisição


app.use('/usuario', usuarioRouter);
app.use('/filme', filmeRouter);
app.use('/avaliacao', avaliacaoRouter);
-
app.get('/', (req, res) => {
  res.json({
    api: 'cinelone API',
    versao: '1.0.0',
    rotas: ['/usuario', '/filme', '/avaliacao'],
  });
});

app.use(errorHandler);

export default app;