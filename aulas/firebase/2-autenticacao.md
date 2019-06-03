# Autenticação

Autenticação é uma parte essencial de uma aplicação, porque permite ao desenvolvedor garantir que, teoricamente, só usuários conhecidos utilizarão a aplicação – ou seja, aqueles usuários que, de alguma forma estarão identificados dentro da aplicação.

Enquanto que é importante aprender sobre o mecanismo por trás da autenticação do usuário em um sistema, neste momento, nos dedicaremos apenas a utilizar serviços já prontos. De fato, utilizar serviços de autenticação já prontos é algo bastante praticado no mercado: toda vez que você utiliza uma aplicação e faz login ou registra-se através de sua conta do Google, Facebook, Microsoft, etc, você está usando um provedor de autenticação.

Provedores de autenticação funcionam através uma relação de confiança. Eles identificam o usuário que possui uma conta em seus serviços através de seu nome de usuário e senha, mas não revelam esses dados às aplicações que utilizam o serviço; apenas retornam um dado que pode ser usado para obter informações do usuário autenticado no provedor de serviço.

Um exemplo prático de como funciona um provedor de autenticação é o seguinte:

1. Uma aplicação XYZ possui o botão "Fazer login com o Google".
2. O usuário clica no botão e é direcionado para outra página, onde vai inserir suas credenciais da conta Google. É importante observar que o a URL mostrada nesta janela é um domínio do Google. Navegadores não compartilham informações entre domínios diferentes (isso significa que, por exemplo, o código JavaScript de uma aplicação presente em um domínio www.abc.com não consegue acessar dados de outro domínio www.xyz.com)
3. Se as credenciais inseridas estiverem corretas, a janela de autenticação retorna para a aplicação XYZ. Entre os dados retornados pela janela de autenticação e entregues à aplicação XYZ, está um *token*. O *token* é como um cartão único, muito difícil de clonar, que a aplicação XYZ pode usar para verificar que o usuário é realmente quem ele diz ser, pois o Google já confirmou isso.
4. A aplicação XYZ pode, a partir de então, acessar informações da conta Google do usuário cujo acesso tenha sido autorizado por este. A aplicação não terá acesso à senha do usuário. O processo é semelhante para o login através do Twitter, Facebook, Microsoft, etc.

## Configurando autenticação no Firebase

Na página de sua aplicação, no console do Firebase, clique em "Authentication" e, depois, em "Set up sign-in method".

![Configurando autenticação no console](https://github.com/antoniojnr/ipw/blob/master/aulas/firebase/firebase-config-auth.png)

Você verá vários provedores de autenticação disponíveis. Por questões de simplicidade, usaremos apenas o Google. Clique no botão destacado, como na imagem a seguir, para editar.

![Configurando autenticação pelo Google](https://github.com/antoniojnr/ipw/blob/master/aulas/firebase/firebase-config-google-auth.png)


Habilite o método de autenticação, clicando no botão "Enable", insira seu email no campo "Project support email" e clique em "Save".

![Configurando autenticação pelo Google](https://github.com/antoniojnr/ipw/blob/master/aulas/firebase/firebase-config-google-auth-2.png)

Pronto. Ao retornar para a lista de provedores de autenticação, você verá que a autenticação pelo Google estará habilitada.

## Configurando provedores de autenticação na aplicação

Vamos organizar o projeto para inserir uma interface com o botão "Fazer login com Google", para que os usuários de nossa aplicação possam se autenticar, sem a necessidade de criarmos um serviço de autenticação do zero.

Antes de tudo, modificaremos o arquivo *public/index.html* para retirar o código de demonstração do Firebase e colocar nosso código.

O arquivo deverá estar como mostrado a seguir.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Welcome to Firebase Hosting</title>

    <!-- update the version number as needed -->
    <script defer src="/__/firebase/5.10.0/firebase-app.js"></script>
    <!-- include only the Firebase features as you need -->
    <script defer src="/__/firebase/5.10.0/firebase-auth.js"></script>
    <script defer src="/__/firebase/5.10.0/firebase-database.js"></script>
    <script defer src="/__/firebase/5.10.0/firebase-messaging.js"></script>
    <script defer src="/__/firebase/5.10.0/firebase-storage.js"></script>
    <!-- initialize the SDK after all desired features are loaded -->
    <script defer src="/__/firebase/init.js"></script>

  </head>
  <body>

  </body>
</html>
```

As marcações `script` carregam o código JavaScript necessário para o Firebase e seus recursos funcionarem. Dentro de `script`, o `defer` é um atributo booleano que, quando presente, especifica que o script será executado quando a página terminar de carregar. Esse atributo é inserido em marcações `script` com o atributo `src` presente, indicando o caminho de recursos externos.

O projeto completado até este ponto está disponível [aqui](https://github.com/antoniojnr/ipw/tree/e893a8c6b14b744ebbc84e166bb3628479359bc5/aulas/firebase/tarefas).

Para continuar, precisaremos instalar o FirebaseUI, que é uma biblioteca JavaScript construída com base no Firebase. O FirebaseUI provê uma solução de autenticação que cuida de todo o fluxo de interface para efetuar o login de usuários usando endereços de email e senha, e provedores de autenticação como Google, Facebook e outros. Foi construído com base no Firebase Auth.

Você irá instalar o FirebaseUI no diretório *public* de seu projeto. No diretório *public*, digite no terminal: `npm install firebaseui`. Você terá, então, a seguinte estrutura de projeto.

```
tarefas
 |- ...
 |- public
     |- index.html
     |- node_modules
         |- ...
         |- firebaseui
```

O diretório *public/node_modules/firebaseui* terá os arquivos necessários para usar o FirebaseUI na nossa aplicação. Precisaremos importá-los no HTML.

```html
  ...
  <head>
    ...
    <script src="node_modules/firebaseui/dist/firebaseui.js"></script>
    <link type="text/css" rel="stylesheet" href="node_modules/firebaseui/dist/firebaseui.css" />
  </head>
  ...
</html>
```

Perceba que os arquivos foram carregados a partir dos arquivos baixados no diretório *node_modules*.

Para manter a organização o nosso projeto, vamos deixar o código JavaScript separado do HTML. Dentro de *public*, crie um diretório chamado *js* e, dentro deste, um arquivo chamado *auth.js*. Você terá, agora, a seguinte estrutura no diretório *public*.

```
tarefas
 |- ...
 |- public
     |- index.html
     |- node_modules
         |- ...
         |- firebaseui
     |- js
         |- auth.js
```

No diretório *js*, vamos manter todo o código JavaScript do nosso projeto. No HTML, insira a marcação `script` para carregar o arquivo *js/auth.js* logo após os últimos arquivos *js* e *css* importados e antes do fim da marcação de encerramento `</head>`. Use o atributo `defer` para que o carregamento do código JavaScript seja adiado para quando o HTML tiver sido carregado. Sem o `defer`, o código que iremos colocar em *js/auth.js*  tentará acessar elementos que ainda não terão sido carregados. No exemplo de código abaixo, o código parcial é exibido para mostrar apenas a parte essencial.

Insira também um `<div>` com o `id="firebaseui-auth-container"`. É neste `div` que será inserida a interface de autenticação.

```html
  ...
  <head>
    ...
    <script defer src="js/auth.js"></script>
  </head>
  <body>
    <div id="firebaseui-auth-container"></div>
  </body>
</html>
```

Dentro de *js/auth.js*, você irá inserir o código abaixo. No objeto `uiConfig`, o atributo `signInSuccessUrl` indica para onde o usuário será redirecionado caso consiga autenticar-se com sucesso – neste caso, será redirecionado para *home.html*, que ainda vamos criar.

A lista `signInOptions` define os provedores de autenticação que você irá usar. Iremos utilizar apenas a autenticação com a conta Google e, portanto, é o único que não deixaremos comentado. Caso você deseje ver como a interface ficaria com os botões de outros provedores ativados, basta descomentá-los.

O atributo `tosUrl` determina o local da página contendo os termos de serviço da aplicação e `privacyPolicyUrl` aponta para o caminho da política de privacidade. Ignoraremos ambos por enquanto.

As duas últimas linhas do código inicializam a interface de autenticação e a inserem no `div` inserido anteriormente.

```javascript
var uiConfig = {
    signInSuccessUrl: 'home.html',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        // firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '/',
    // Privacy policy url/callback.
    privacyPolicyUrl: function() {
        window.location.assign('/');
    }
};

var ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', uiConfig);
```

Se você já estiver executando a aplicação, atualize a página no seu navegador, caso contrário, inicialize-a com o comando `firebase serve`. Você deverá ver a página a seguir no navegador.

![Autenticação configurada](https://github.com/antoniojnr/ipw/blob/master/aulas/firebase/firebase-auth-ok.png)

O projeto completo, como foi modificado até agora, encontra-se [aqui](https://github.com/antoniojnr/ipw/tree/1af75a4a7fe66ff76e6975984599893f4cac8e27/aulas/firebase/tarefas).

## Configurando a página inicial pós-autenticação

Como configurado acima, a página para onde o Firebase irá redirecionar o usuário depois de autenticado é *home.html*. Vamos criar esta página e exibir algumas informações do usuário. Ainda no diretório *public*, crie a página *home.html*.

Nós não estamos usando nenhum *framework* para facilitar o carregamento de bibliotecas, isso significa que, infelizmente, precisaremos carregar todas as bibliotecas necessárias em cada página HTML nova que criarmos.

Você precisará carregar o Firebase, junto com seus módulos, em todas as páginas que criarmos. Os módulos listados abaixo são os que usaremos nesta página. Os módulos necessários para cada nova página serão indicados conforme precisarmos.

```html
<script defer src="/__/firebase/5.10.0/firebase-app.js"></script>
<script defer src="/__/firebase/5.10.0/firebase-auth.js"></script>
<script defer src="/__/firebase/init.js"></script>
```

### Determinando o estado de autenticação

Em *home.html*, nós criaremos um *callback* para o evento *onAuthStateChanged* do módulo de autenticação do Firebase. Um *callback* é uma função que indicará as ações que serão realizadas quando o estado de autenticação mudar (por isso o nome *onAuthStateChanged*). Essas ações são:

* Ao chegar na página, se o usuário estiver autenticado, mantê-lo na página para carregar os dados que pertencem a ele.
* Ao chegar na página, se o usuário não estiver autenticado, redirecioná-lo para a página de login.

O código JavaScript, assim como na etapa anterior, ficará em um arquivo separado. Manteremos o mesmo nome do HTML, mas mudando a extensão: *js/home.js*. Este arquivo será carregado logo abaixo dos scripts carregados no código acima. O código do arquivo *js/home.js* é o seguinte.

```javascript
// Determina a função de callback para o evento onAuthStateChanged
// Quando o estado de autenticação do usuário mudar, seja este desconectar-se
// ou conectar-se, a função function(user) { ... } será chamada. Neste caso
// estes estados só mudarão quando a página for atualizada, ou quando fizermos
// o botão de logout, para sair do sistema.
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // Se o objeto user estiver definido, então o usuário está conectado
    // Neste caso, criaremos um texto "Você está conectado" e um botão de logout.
    
  } else {
    // Caso contrário, se user for undefined, o usuário não está conectado,
    // então o redirecionamos para a página de login.
    window.location.replace('index.html');
  }
});
```

É possível montar uma página HTML inteira usando apenas funções JavaScript para manipular o DOM. O DOM, sigla para *Document Object Model*, é o modelo da página HTML que organiza elementos em uma estrutura de árvore – como uma árvore genealógica. A diferença é que cada elemento aqui tem um único pai (ou mãe, como desejar chamar :).

O DOM provê uma API: funções JavaScript para para criar e acessar elementos de uma página, assim como modificar seu estilo e conteúdo.

As principais funções que usaremos da API e para que servem são listadas a seguir. Você pode utilizar os objetos `document` e `window` para invocar as funções de manipular os filhos de um documento, que são os vários elementos na página.

1. `document.getElementById(id)`: retorna o elemento cujo `id` é o passado como parâmetro. O id de um elemento é definido dentro de sua marcação de abertura. Por exemplo, em `<input type="text" id="nome">`, o id do elemento é "nome". Não pode haver dois elementos com o mesmo id em um documento.
2. `document.getElementsByTagName(nome)`: retorna um `NodeList` (array) de elementos do tipo `nome`. O nome do elemento é o nome da marcação — por exemplo, `a`, `p`, `h1`, etc. Os elementos podem ser acessados usando `lista[1]` ou `lista.item(1)`, onde `lista` é o array retornado pela função e `1` é o índice do elemento.
3. `document.createElement(nome)`: cria um objeto do tipo `Element` representando o elemento. `document.createElement("a")` cria um `<a></a>` vazio, que ainda precisa ser anexado a um outro elemento.
4. `parentNode.appendChild(node)`: anexa um `node` (nó) a outro nó pai `parentNode`. Todo elemento é um tipo de nó.
5. `elemento.innerHTML`: atribui ou obtém o conteúdo interno de um `elemento`.
7. `elemento.setAttribute(nome, valor)`: define o `valor` de um atributo de dado `nome` de um `elemento`.
8. `elemento.getAttribute(nome)`: obtém o valor do atributo de dado `nome` do `elemento`.
9. `elemento.addEventListener(tipo, listener)`: adiciona um `listener` de evento de um determinado `tipo`. O `listener` é uma função que recebe um único parâmetro, o evento que ocorreu.
10. `window.onload`: é uma propriedade utilizada para definir um *listener* para o evento `load` do objeto `window`. O evento `load` é disparado quando um elemento termina de carregar – neste caso, quando a página completa termina de carregar.

Utilizando algumas dessas funções, iremos criar o texto "Você está conectado", o botão "Desconectar". O código a seguir cria o texto e botão, e os anexa a `<body>`.

```javascript
// Cria um elemento h1
let texto = document.createElement('h1');
// Cria um elemento button
let botao = document.createElement('button');
// Define o texto do h1
texto.innerHTML = "Você está conectado";
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
```

Uma vez que o código acima funcionará em conjunto com o código da seção [Determinando o estado de autenticação](https://github.com/antoniojnr/ipw/blob/master/aulas/firebase/2-autenticacao.md#determinando-o-estado-de-autentica%C3%A7%C3%A3o), ao desconectar-se, o usuário será redirecionado para a página de login.

O código completo do arquivo *js/home.js*, assim como o estado atual do projeto podem ser encontrados [aqui](https://github.com/antoniojnr/ipw/tree/fa3513347aeb7ace200a317655568ece7bdf786e/aulas/firebase/tarefas).

## Próximo passo

[Cloud Firestore](https://github.com/antoniojnr/ipw/blob/master/aulas/firebase/3-firestore.md)