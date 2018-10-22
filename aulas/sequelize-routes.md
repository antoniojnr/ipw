# Criando as rotas

## Introdução

Na [seção anterior](https://github.com/antoniojnr/ipw/blob/master/aulas/sequelize-models.md), você aprendeu a criar relacionamentos 1:n e n:m.

Nas aulas anteriores, nós definimos os modelos **Image**, **User** e **Tag**. Criamos a associação de **Image** com **User** e de **Tag** com **Image**, ou seja, definimos como esses modelos serão armazenados no banco de dados e como os relacionamentos entre eles serão representados.

Com isso feito, precisamos programar a parte que receberá os dados vindos das requisições e que os gravará no banco de dados. As *rotas* de nossa aplicação especificam como os *endpoints* da aplicação respondem a requisições. Você define o roteamento da aplicação usando o objeto `app` no qual você instancia a aplicação Express. Veja o exemplo de código a seguir.

```javascript
var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Hello world!');
});
```

No código acima, define-se que uma requisição GET para `/` terá como resposta o texto 'Hello world!'. Supondo que a aplicação esteja rodando na máquina local e na porta 3000, é isso que você verá ao fazer digitar `http://localhost:3000/` no navegador e apertar Enter.

Você já aprendeu que, em aplicações básicas, definem-se as rotas no arquivo `index.js` e usa-se `node index.js` para rodar o projeto. Entretanto, nossos projetos estão ficando maiores e mais complexos e não podemos definir todas as rotas no `index.js`, ou teremos um arquivo com milhares de linhas de código.

Por isso, vamos ver nesse módulo como criar rotas modulares para cada um dos modelos criados através da classe `express.Router`.

## Rotas modulares

### Criando um novo módulo

Na raiz do projeto, crie o diretório `routes` e, dentro desse diretório, crie o arquivo `users.js`. Neste arquivo, criaremos as rotas de usuários. Para começar, inclua o seguinte código no arquivo `users.js`.

```javascript
var express = require('express');
var router = express.Router();

module.exports = router;
```

### Importando o novo módulo

Observe que o `Router` foi instanciado na variável router e, no fim, exportada. Com isso, você acabou de criar um módulo, que pode ser importado em outros arquivos (você fará isso no `index.js`) da seguinte forma.

```javascript
var users = require('./routes/users');

// ...

app.use('/users', users);
```

Com isso, você acabou de incluir a rota `/users` na sua aplicação e todas as rotas incluídas em `users.js` ficarão sob esta rota. Vamos começar a criar as rotas, para que você possa entender melhor.

### Criando as rotas de usuário

No arquivo `index.js`, vamos agora adicionar as rotas usando os métodos `get()`. `post()`, `put()` e `delete()` do objeto `router`.

```javascript
var express = require('express');
var router = express.Router();

router.post('', function(req, res) {
  res.send('Criando usuário.');
});

router.get('', function(req, res) {
  res.send('Listando todos os usuários.');
});

router.get('/:id', function(req, res) {
  res.send('Retornando o usuário de ID: ' + req.params.id);
});

router.put('', function(req, res) {
  res.send('Atualizando usuário.');
});

router.delete('/:id', function(req, res) {
  res.send('Removendo o usuário de ID: ' + req.params.id);
});

module.exports = router;
```

Com as rotas definidas acima, importe este módulo contendo as rotas de usuário no `index.js`, seguindo os passos da seção [Importando o novo módulo](https://github.com/antoniojnr/ipw/blob/master/aulas/sequelize-routes.md#importando-o-novo-m%C3%B3dulo). Supondo que a nossa aplicação está rodando em `http://localhost:3000`, agora temos as seguintes rotas.

| Método | Rota | Função |
| --- | --- | --- |
| POST | http://localhost:3000/users | Criar um novo usuário |
| GET | http://localhost:3000/users | Listar todos os usuários |
| GET | http://localhost:3000/users/{id} | Listar informações do usuário com o `{id}` especificado |
| PUT | http://localhost:3000/users | Atualizar informações do usuário |
| DELETE | http://localhost:3000/users/{id} | Remover usuário com o `{id}` especificado |

Observe que ao definir a rota de criar usuários, por exemplo, o caminho passado na rota é vazio `''`. Isso foi feito para as rotas de criar, atualizar e listar todos os usuários. Neste caso, a rota chamada é `/users`, uma vez que este roteador é montado sob esta rota.

O que fará com que o servidor diferencie qual rota será chamada é a combinação de método e URL da rota.

Esta é a forma como as rotas são definidas. Agora vamos usar os modelos e funções do Sequelize para gravar os dados recebidos no banco de dados.

### Tratando requisições

As requisições são enviadas do cliente para o servidor e incluem dados para este processar. Esses dados podem ser passados na URL ou no corpo da requisição e, no código do lado servidor, acessados através dos seguintes objetos:

`req.params.*` para acessar parâmetros da URL. Por exemplo, na URL http://localhost:3000/users/93, se o nome do parâmetro utilizado na construção da rota foi `id` (http://localhost:3000/users/:id), então acessamos o `id` (que é igual a 93) no código através de `req.params.id`.

`req.body.*` para acessar parâmetros do corpo da requisição. Nós usaremos JSON para passar dados nas requisições e os atributos do objeto em JSON podem ser acessados no código da seguinte forma.

Suponha que o objeto abaixo seja passado no corpo da requisição.

```json
{
  "nome": "Antonio",
  "sobrenome": "Dias",
  "idade": 18
}
```

Podemos acessar cada um dos atributos usando: `req.body.nome`, `req.body.sobrenome` e `req.body.idade`.

A interpretação do corpo da requisição como JSON não é nativa no Express e, por isso, usaremos a biblioteca `body-parser` para que a aplicação aceite o corpo das requisições neste formato.

```javascript
var bodyparser = require('body-parser');

router.use(bodyparser.json());

// As rotas começam a partir daqui
```

#### Rota de criação de usuários

O código final da requisição POST para criar usuários está descrito abaixo.

```javascript
router.post('', function(req, res) {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  }).then(function(user) {
    res.json({
      success: true,
      result: user
    });
  }).catch(function(error) {
    res.json({
      success: false,
      result: "Ocorreu um erro ao criar usuário."
    });
  });
});
```

Algumas considerações a serem feitas sobre o código acima:
* A chamada completa da função é `User.create(objeto).then(callbackSucesso).catch(callbackErro)`.
  * `objeto` contém os parâmetros usados para criar o **User**.
  * A função de **callback de sucesso** recebe no parâmetro `user` o usuário que foi criado.
  * A função de **callback de erro** recebe no parâmetro `error` o erro causado, caso aconteça erro durante a criação do usuário.
  * O ideal é que as informações passadas no objeto `error` sejam filtradas e utilizadas para mostrar para o cliente onde o erro aconteceu. Não retorne o objeto `error` completo, pois este revelará detalhes de sua implementação ao cliente.
* O atributo `success` na resposta indica para o cliente se a requisição terminou ou não com erro.
* As funções `then()` e `catch()` estão disponíveis para todas as outras funções do Sequelize.

#### Outras rotas

O módulo `users.js` completo está no projeto que pode ser encontrado [aqui](https://github.com/antoniojnr/ipw/tree/master/projetos/sequelize).

#### Exercício

Construa as rotas a seguir, incluindo-as em seus módulos apropriados. Consulte a [documentação do Sequelize](https://sequelize.readthedocs.io/en/v3/docs/querying/) para mais informações, especialmente sobre como criar o relacionamento entre modelos.

Continue o projeto a partir da rota de login feita em sala.

| **Método:** POST |
| --- |
|**Rota:** http://localhost:3000/users/login|
|**Descrição:** Fazer login ou criar um novo usuário |
|**Parâmetros no corpo da requisição:** `token`: token de autenticação da API externa|
|**Parâmetros da resposta:** O perfil do usuário |

| **Método:** POST |
| --- |
|**Rota:** http://localhost:3000/images/:id/tags|
|**Descrição:** Criar uma nova tag para uma imagem|
|**Parâmetros no corpo da requisição:** `text`: texto da tag|
|**Parâmetros da resposta:**  A tag inserida|

| **Método:** POST |
| --- |
| **Rota:** http://localhost:3000/images/:id/comments |
| **Descrição:** Criar um novo comentário na imagem |
| **Parâmetros no corpo da requisição:** `text`: texto do comentário |
| **Parâmetros da resposta:** O comentário criado |

| **Método:** GET |
| --- |
| **Rota:** http://localhost:3000/images/:id |
| **Descrição:** Obter informações de uma imagem |
| **Parâmetros no corpo da requisição:** nenhum |
| **Parâmetros da resposta:** `file_id`: ID do arquivo da imagem; `user_id`: ID do proprietário da imagem; `text`: Título descritivo da imagem; `comments`: Array de comentários da imagem. Cada comentário é um objeto com os parâmetros: `text`, `timestamp`, `author_id` e `author_name`; `tags`: Array de tags da imagem. Cada tag é uma string |

## Projeto completo

* [sequelize](https://github.com/antoniojnr/ipw/tree/master/projetos/sequelize)
