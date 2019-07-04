# Armazenamento de dados

Agora, com a etapa de autenticação finalizada, podemos dar inicio à parte da aplicação que manipulará os dados. É através da autenticação que a aplicação atribui os dados a um usuário e garante que apenas o usuário proprietário tenha acesso a estes dados.

Como estamos construindo uma aplicação de gerenciamento de tarefas, é necessário prover privacidade para o usuário armazenar suas tarefas, garantindo que somente este tenha acesso a elas e, utilizando o Firebase, tendo realizado os passos que executamos até o momento, teremos feito isso muito bem.

Para gerenciar os dados de tarefas, utilizaremos mais uma ferramenta do Firebase: o Cloud Firestore.

Cloud Firestore é banco de dados de nuvem NoSQL. Isso significa que ele não organiza os dados em tabelas de estrutura fixa, como o MySQL, e que também não utiliza SQL como linguagem de consulta. Os dados são guardados em coleções e possuem estrutura flexível, podendo ter objetos aninhados, além de subcoleções. Assim como qualquer tecnologia, possui suas vantagens e desvantagens. Mas não trataremos disso neste texto.

## Configurando as regras de acesso aos dados

As operações de acesso aos dados passam por regras de segurança que oferecem controle de acesso aos dados. As regras de acesso são descritas no arquivo *firestore.rules*, localizado na raiz do seu projeto. As regras a seguir determinam que somente usuários autenticados terão acesso aos dados. Outras partes de nosso código garantirão que um usuário tenha acesso apenas aos dados criados por ele.

```
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth.uid != null;
    }
  }
}
```

Toda vez que você muda as regras e envia o projeto para hospedar no Firebase (veremos essa etapa mais adiante), as regras do arquivo *firestore.rules* são sincronizadas com as regras do projeto no Firebase, que podem ser acessadas através do console do Firebase.

![Console do Firebase - Configurando regras de acesso](https://github.com/antoniojnr/ipw/blob/master/aulas/firebase/imagens/firebase-rules.png)

## Arquivos que utilizaremos

A parte relativa ao Cloud Firestore será feita dentro dos arquivos *home.html* e *js/home.js*, que já estão criados. Antes de continuar, certifique-se que no seu arquivo *home.html* os seguintes scripts estão sendo importados no `head`:

```html
<script defer src="/__/firebase/5.10.0/firebase-app.js"></script>
<script defer src="/__/firebase/5.10.0/firebase-auth.js"></script>
<script defer src="/__/firebase/5.10.0/firebase-firestore.js"></script>
<script defer src="/__/firebase/init.js"></script>
<script defer src="js/home.js"></script>
```

Perceba que o novo script sendo importado é o `firebase-firestore.js`. Ele será necessário para utilizar as funções do Cloud Firestore.

## Adaptando o código criado anteriormente

O estado atual do código JavaScript dentro do arquivo *js/home.js* é o seguinte:

```javascript
let auth = firebase.auth();

auth.onAuthStateChanged(function(user) {
  if (user) {
    // Cria um elemento h1
    let texto = document.createElement('h1');
    // Cria um elemento button
    let botao = document.createElement('button');
    // Define o texto do h1
    texto.innerHTML = "Usuário conectado: " + user.displayName;
    // Define o texto do button
    botao.innerHTML = "Desconectar";
    // Pega todos os elementos do tipo "body" (só há um)
    let elems = document.getElementsByTagName('body');
    // Pega o único elemento da lista
    let corpo = elems[0];
    // Anexa os dois elementos criados ao corpo
    corpo.appendChild(texto);
    corpo.appendChild(botao);
    // Adiciona um listener ao evento "click" do botão
    botao.addEventListener('click', function() {
      firebase.auth().signOut().then(function() {
        console.log("Você está desconectado");
      });
    });
  } else {
    window.location.replace('index.html');
  }
});
```

Nós precisaremos modificar o código deste arquivo e do *home.html*. O motivo é que ficará difícil de gerenciar quais elementos HTML estão sendo criados e onde se localizarão, se criarmos parte deles dinâmicamente (no JavaScript) e estaticamente (no HTML). Por isso, criaremos todos os elementos no HTML e usaremos a função `document.getElementById(id)` para referenciar os elementos dentro do código JavaScript.

Dessa forma, no código JavaScript acima, onde existe:

```javascript
// Cria um elemento h1
let texto = document.createElement('h1');
// Cria um elemento button
let botao = document.createElement('button');
```

substitua por:

```javascript
// Recupera o elemento h1 de id 'usuario'
let texto = document.getElementById('usuario');
// Recupera o elemento button de id 'desconectar'
let botao = document.getElementById('desconectar');
```

Além disso, remova de * js/home.js*  as duas linhas a seguir.

```javascript
// Define o texto do button
botao.innerHTML = "Desconectar";
```

Não precisaremos alterar o texto desse botão. Ele pode ser estático.

Com o código substituído, os elementos `h1` e `button` já existirão no HTML e serão referenciados por seu `id`. Por isso, o `body` do `home.html` deverá ser como descrito a seguir.

```html
<body>
  <h1 id="usuario"></h1>
  <button id="desconectar">Desconectar</button>
</body>
```

Para garantir que você fez as modificações corretamente, veja o estado atual do projeto [aqui](https://github.com/antoniojnr/ipw/tree/39d0ea491aee74c7d50633e390bfa104ba9e238e/aulas/firebase/tarefas).

## Criando dados

Ao definir as regras de acesso, garantimos que apenas usuários autorizados tenham acesso aos dados. Agora podemos prosseguir para a etapa de criar os dados.

Nós criaremos a parte da aplicação responsável por criar uma nova tarefa, armazenando-a no Cloud Firestore. A estrutura de nossa tarefa é a seguinte:

* `dataCriacao`: timestamp - data de criação da tarefa
* `titulo`: string - título, ou descrição curta, da tarefa
* `status`: string - estado da tarefa, cujos possíveis valores são: completa, pendente ou adiada
* `prazo`: timestamp - prazo para conclusão da tarefa
* `prioridade`: integer - valor de 1 a 3 que define a prioridade da tarefa (o quão urgente ela é): baixa, média ou alta

Para mais informações sobre dados no Cloud Firestore, como organizá-los e modelá-los, leia:
1. [Modelo de dados](https://firebase.google.com/docs/firestore/data-model)
2. [Tipos de dados](https://firebase.google.com/docs/firestore/manage-data/data-types)
3. [Estruturar dados](https://firebase.google.com/docs/firestore/manage-data/structure-data)

Utilizaremos duas das formas de adicionar dados ao Cloud Firestore.

### Criando uma referência de documento

Às vezes, pode ser necessário criar uma referência de documento com um id gerado automaticamente, para depois utilizá-la. O exemplo a seguir mostra como fazer isso e, depois, atribuir dados à referência de documento criada.

```javascript
// Criando referência para o Firestore
let db = firebase.firestore();

// Criando uma referência para um novo documento na coleção
// de tarefas. Imprimir novaTarefa.id mostra o id da referência
// de documento criada.
var novaTarefa = db.collection("tarefas").doc();
console.log(novaTarefa.id);

// Finalmente, para definir os dados, fazemos:
novaTarefa.set({
  dataCriacao: new Date(),
  titulo: "Nova tarefa",
  status: "pendente",
  prazo: new Date(), // veremos como trazer um valor de data futura para cá depois
  prioridade: 2 // prioridade média
})
```

### Adicionando diretamente o documento

Para situações em que você não necessita obter o id do documento antes de adicioná-lo, basta chamar um dos métodos `add()` ou `set()` após `doc()`, ou seja: `doc().add(...)` ou `.doc().set(...)`. Estruturalmente, `.add(...)` e .set(...)` são completamente equivalentes. Portanto, você pode usar o que for mais conveniente.

Reutilizando o exemplo anterior, temos:

```javascript
// Criando referência para o Firestore
let db = firebase.firestore();

// Adicionamos um novo documento à coleção de tarefas.
db.collection("tarefas").doc().set({
  dataCriacao: new Date(),
  titulo: "Mais uma tarefa",
  status: "pendente",
  prazo: new Date(),
  prioridade: 1 // prioridade baixa
})
```

### Observação

Os métodos `add()` e `set()` retornam promessas. Ou seja, são assíncronos e indicam a finalização de sua execução ou um erro através dos métodos `then(...)` e `catch(...)`.

Reutilizando o exemplo anterior temos:

```javascript
// Criando referência para o Firestore
let db = firebase.firestore();

// Adicionamos um novo documento à coleção de tarefas.
db.collection("tarefas").doc().set({
  dataCriacao: new Date(),
  titulo: "Mais uma tarefa",
  status: "pendente",
  prazo: new Date(),
  prioridade: 1 // prioridade baixa
})
.then(function(docRef) {
  console.log("Documento escrito com o ID:", docRef.id);
})
.catch(function(error) {
  console.error("Erro ao adicionar documento:", error);
});
```

## Recuperando dados

É possível ler dados de um único documento ou de uma coleção de documentos uma única vez, ou definir um listener para constantemente receber eventos de mudança de dados.

### Lendo dados de um único documento

Para definir qual documento será lido, é necessário especificar o ID deste. Vamos começar adicionando um documento e guardando uma referência para seu ID. Depois de adicioná-lo, utilizaremos o método de leitura de um documento.

```javascript
// Referência para o Firestore
let db = firebase.firestore();

// Referência para um novo documento
var novaTarefa = db.collection("tarefas").doc();

// Cria a nova tarefa
novaTarefa.set({
  dataCriacao: new Date(),
  titulo: "Nova tarefa",
  status: "pendente",
  prazo: new Date(), // veremos como trazer um valor de data futura para cá depois
  prioridade: 2 // prioridade média
});

// Obtém a referência para o documento adicionado, usando o ID
var tarefaRef = db.collection("tarefas").doc(novaTarefa.id);

// Finalmente, a leitura dos dados
tarefaRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Dados do documento:", doc.data());
    } else {
        // doc.data() será undefined neste caso
        console.log("Documento não existe!");
    }
}).catch(function(error) {
    console.log("Erro ao obter documento:", error);
});
```

### Lendo dados de vários documentos de uma coleção

Documentos de uma coleção podem ser lidos todos de uma vez ou filtrados através de uma consulta.

Para ler todos os documentos de uma vez, basta usar o método `get()`.

```javascript
db.collection("tarefas").get().then(function(querySnapshot) {
  for (let doc of querySnapshot) {
    console.log(doc.id, " => ", doc.data());
  });
});
```

Para especificar parâmetros de busca, use o método `where()`. Para saber mais sobre consultas e operadores veja a página [consultas](https://firebase.google.com/docs/firestore/query-data/queries).

O código a seguir obtém todas as tarefas cujo status é "pendente".

```javascript
db.collection("tarefas").where("status", "==", 'pendente')
  .get().then(function(querySnapshot) {
    for (let doc of querySnapshot) {
      console.log(doc.id, " => ", doc.data());
    });
  });
```

Além de filtrados, os dados em uma consulta podem ser ordenados através do método `orderBy()`. O código a seguir ordena a lista de documentos obtidos da coleção de tarefas pela data `criadaEm`, em ordem decrescente (definida pelo parâmetro "desc"). O parâmetro de ordenação pode ser "asc" para crescente ou "desc" para decrescente.

```javascript
db.collection("tarefas")
  .orderBy("criadaEm", "desc")
  .get().then(function(querySnapshot) {
    for (let doc of querySnapshot) {
      console.log(doc.id, " => ", doc.data());
    });
  });
```