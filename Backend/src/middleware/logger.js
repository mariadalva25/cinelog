export function logger(req, res, next) {
  const hora = new Date().toISOString();
  console.log(`[${hora}] ${req.method} ${req.url}`);
  next(); // IMPORTANTE: sem next(), a requisição trava para sempre!
}