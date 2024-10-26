const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Route to handle get requests to '/users'
app.all("/", (req, res) => {
  const { method } = req;
  res.status(200).send(`O método utilizado foi: ${method}`);
});

//rota para código 200
app.get("/200", (req, res) => {
  res.status(200).send("Ok!");
});

//rota para código 404
app.get("/404", (req, res) => {
  res.status(404).send("Página não encontrada!");
});

//rota para código 500
app.get("/500", (req, res) => {
  res.status(500).send("Ocorreu um erro interno!");
});

//rota para o código 501
app.get("/501", (req, res) => {
  res.status(501).send("Funcionalidade não implementada!");
});

//rota para código 401
app.get("/401", (req, res) => {
  res.status(401).send("Não autorizado!");
});

//rota para código 403
app.get("/403", (req, res) => {
  res.status(403).send("Acesso negado!");
});

//rota para código 429
app.get("/429", (req, res) => {
  res.status(429).send("Muitas requisições. Tente novamente mais tarde!");
});

//rota para código 304
app.get("/304", (req, res) => {
  res.status(304).send("Não mudou.");
});

//rota para código 415
app.get("/415", (req, res) => {
  res.status(415).send("Tipo de conteúdo não suportado.");
});

//rota para código 204
app.get("/204", (req, res) => {
  res.status(204).send("Nenhum conteúdo disponível.");
});

//rota para o código 201
app.get("/201", (req, res) => {
  res.status(201).send("Criado com sucesso!");
});

//rota para o código 400
app.get("/400", (req, res) => {
  res.status(400).send("Solicitação inválida.");
});

//rota para o código 308
app.get("/308", (req, res) => {
  res.status(308).send("Reedirição permanente.");
});

//rota de erros
app.get('/erros/:code', (req, res) => {
    const code  = parseInt(req.params.code, 10);
    res.status(code).send(`O código de erro ${code} foi retornado.`);
  });
  
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
