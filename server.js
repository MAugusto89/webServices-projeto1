//Importa o módulo express
const express = require("express");

//Cria uma instância do express
const app = express();

//Define a porta na qual o servidor vai rodar
const PORT = process.env.PORT || 3000;

//Middleware para permitir o uso de JSON no corpo das requisições
app.use(express.json());

//Array para armazenar os itens localmente
let items = [];
/***********************************************************************************************************************************************/
//Rota para criar um novo item(CREATE)
app.post("/items", (req, res) => {
  //Recebe os dados do corpo da requisição
  const { name } = req.body;

  //Valida se os dados estão presentes
  if (!name) {
    return res
      .status(400)
      .send("Os dados devem estar presentes no corpo da requisição.");
  }

  //Cria um novo item com os dados recebidos
  const item = { id: items.length + 1, name };

  //Adiciona o item ao array de items
  items.push(item);
  //Retorna o novo item criado
  res.status(201).json(item);
});
/***********************************************************************************************************************************************/
//Rota para listar todos os itens(READ)
app.get("/items", (req, res) => {
  //Retorna todos os itens
  res.json(items);
});
/***********************************************************************************************************************************************/
//Rota para buscar um item por ID(READ)
app.get("/items/:id", (req, res) => {
  //Procura o item pelo ID
  const item = items.find((i) => i.id === parseInt(req.params.id));
  //Valida se o item foi encontrado
  if (!item) {
    return res.status(404).send("Item não encontrado.");
  }
  //Retorna o item
  res.json(item);
});
/***********************************************************************************************************************************************/
//Rota para atualizar um item específico(UPDATE)
app.put("/items/:id", (req, res) => {
  //Recebe o ID do item a ser atualizado
  const id = parseInt(req.params.id);
  //Recebe os dados do corpo da requisição
  const { name } = req.body;
  //Valida se os dados estão presentes
  if (!name) {
    return res
      .status(400)
      .send("Os dados devem estar presentes no corpo da requisição.");
  }
  //Procura o item pelo ID
  const itemIndex = items.findIndex((item) => item.id === id);
  //Valida se o item foi encontrado
  if (itemIndex === -1) {
    return res.status(404).send("Item não encontrado.");
  }
  //Atualiza o nome do item
  items[itemIndex].name = name;
  //Retorna o item atual
  res.send(items[itemIndex]);
});
/***********************************************************************************************************************************************/
//Rota para deletar um item específico(DELETE)
app.delete("/items/:id", (req, res) => {
  //Recebe o ID do item a ser deletado
  const id = parseInt(req.params.id);
  //Procura o item pelo ID
  const itemIndex = items.findIndex((item) => item.id === id);
  //Valida se o item foi encontrado
  if (itemIndex === -1) {
    return res.status(404).send("Item não encontrado.");
  }
  //Remove o item do array
  items.splice(itemIndex, 1);
  //Retorna um status 204 sem conteúdo
  res.status(204).send();
});
/***********************************************************************************************************************************************/
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});