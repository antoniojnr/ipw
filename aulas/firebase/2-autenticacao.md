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