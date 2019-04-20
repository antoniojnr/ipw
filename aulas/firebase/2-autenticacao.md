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