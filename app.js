const express = require('express');
const app = express();

const Produto = require('./models/Produto')

app.use(express.json())

//const db = require('./models/db')

app.get("/list-produto", async (req, res) => {
      await Produto.findAll({
        attributes:['id','nome','preco_compra', 'preco_venda', 'quantidade'],
         order:[['id', 'DESC']]
      })
      .then((produtos) => {
        return res.json({
          erro: false,
          produtos

        })

      }).catch(() => {
        return res.status(400).json({
          erro: true,
          mensagem: "Erro: Nenhum produto emcontrado !"

        })
      })
});

//-------------------------------------//

app.get("/grafico-maior-estoque", async (req, res) => {
  await Produto.findAll({
    attributes:['id','nome','quantidade'],
     order:[['quantidade', 'DESC']],
     limit:10
  })
  .then((produtos) => {
    return res.json({
      erro: false,
      produtos

    })

  }).catch(() => {
    return res.status(400).json({
      erro: true,
      mensagem: "Erro: Nenhum produto emcontrado !"

    })
  })
});

//-------------------------------------//

app.get("/grafico-menor-estoque", async (req, res) => {
  await Produto.findAll({
    attributes:['id','nome','quantidade'],
     order:[['quantidade', 'ASC']],
     limit:10
  })
  .then((produtos) => {
    return res.json({
      erro: false,
      produtos

    })

  }).catch(() => {
    return res.status(400).json({
      erro: true,
      mensagem: "Erro: Nenhum produto emcontrado !"

    })
  })
});

//-------------------------------------//

app.get("/view-produto/:id", async (req, res) => {
  const { id } = req.params;
  await Produto.findByPk(id)
  .then((produto) => {

    return res.json({
      erro: false,
      produto

    });
  }).catch(() => {
    return res.status(400).json({
      erro: true,
      mensagem: "Erro: Nenhum produto emcontrado !"

    })
  })
});
//--------------------------------------------//


app.put('/edit-produto', async (req, res) => {
  const {id} = req.body;
  await Produto.update(req.body, {where: {id}})
  .then(() => {
      return res.json({
          erro: false,
          mensagem: "Produto editado com sucesso!"
      });
  }).catch(() => {
      return res.status(400).json({
          erro: true,
          mensagem: "Erro: Produto não editado com sucesso!"
      });
  });
});

//--------------------------------------------//

app.delete('/delete-produto/:id', async (req, res) => {
  const {id} = req.params;

  await Produto.destroy({where: {id}})
  .then(() => {
      return res.json({
          erro: false,
          mensagem: "Produto apagado com sucesso!"
      });
  }).catch(() => {
      return res.status(400).json({
          erro: true,
          mensagem: "Erro: Produto não apagado com sucesso!"
      });
  });
});

//--------------------------------------------//


app.post("/cad-produto", async (req, res) => {
  await Produto.create(req.body)
  .then(() => {
        return res.json({
          erro: false,
          mensagem: "Produto cadastrado com sucesso !"
        })
  }).catch(() => {
        return res.status(400).json({
          erro: true,
          mensagem: "Erro: Produto não cadastrado com sucesso !"

        })

  })
  
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");  
});