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

## Criando dados

Ao definir as regras de acesso, garantimos que apenas usuários autorizados tenham acesso aos dados. Agora podemos prosseguir para a etapa de criar os dados.

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

Para garantir que você fez as modificações corretamente, veja o estado atual do projeto aqui.