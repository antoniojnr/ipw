# Introdução

Com a variedade de tecnologias existentes no mercado para desenvolvimento de aplicações do lado servidor, é um trabalho difícil para o desenvolvedor decidir qual linguagem e framework são mais adequados para sua aplicação.

No nosso contexto educacional, muitas vezes é difícil emular como uma aplicação funcionaria no mundo real e ter acesso a tecnologias que permitam ao estudante desenvolver aplicações de nível profissional.

Foi pensando nas possibilidades de trabalhos futuros que decidi introduzir o [Firebase](https://firebase.google.com/) nesta disciplina. O Firebase é uma plataforma de desenvolvimento móvel e web com um modelo *backend as a service* (BaaS). Para isto, o Firebase provê uma API de fácil usabilidade, disponibilizando recursos como autenticação, gerenciamento de usuários, base de dados e armazenamento de dados estáticos (arquivos).

Durante este curso, vamos montar uma aplicação desde o início, que nos permitirá aprender as funcionalidades essenciais desta plataforma que o ajudarão a desenvolver uma aplicação completa, estando seus requisitos dentro do que o Firebase pode oferecer.

# Configurando uma aplicação 

Esta seção mostra como criar e configurar uma nova aplicação no Firebase. Você precisará, inicialmente, usar o terminal para instalar o `firebase-tools`, uma caixa de ferramentas para trabalhar com aplicações Firebase.

Para abrir o terminal, aperte Windows + R e digite "cmd", sem as aspas.

Considerando que você já tem o Node.js e npm instalados no seu computador, digite no terminal:

`npm install firebase-tools -g`

A opção `-g` indica que você instalará a ferramenta globalmente, ou seja, que esta estará disponível a partir de qualquer diretório de trabalho onde você estiver no terminal.

Após finalizar a instalação, verifique se você está pronto para continuar. Este processo instalou o comando `firebase`. Se o comando para verificar a versão do retornar um número de versão, está tudo certo. Digite:

`firebase --version`

Se o retorno for algo como `6.7.0`, tudo está funcionando como esperado. Caso o terminal retorne que o comando `firebase` não é reconhecido, você deverá adicionar o diretório onde o `firebase` está instalado às variáveis de ambiente. No Windows, este diretório é o `%APPDATA%\npm`. `%APPDATA%` é uma variável que aponta para o caminho de um diretório que guarda dados de aplicações específicos à conta do usuário. Para acessar este diretório, acesse a janela Executar (atalho: Windows + R) e digite: "%APPDATA%\npm", sem as aspas.

Se você verificar que existe um arquivo chamado `firebase` neste diretório, está tudo certo. Caso contrário, a instalação não terminou com sucesso.

Se o arquivo existe, você precisará agora adicionar aquele diretório às variáveis de ambiente. No terminal, digite:

`setx PATH "%PATH%;%APPDATA%\npm"`

Depois de receber a confirmação que o comando foi executado com sucesso, feche todas as janelas do terminal e abra novamente.

Agora, crie um diretório para seu novo projeto. Eu vou chamar o meu de "tarefas". Nós vamos montar uma aplicação para gerenciamento de tarefas. No Windows, você também pode usar o comando `mkdir tarefas` para criar um diretório chamado tarefa. Após criar, use `cd tarefas` para entrar no diretório.

![Criando o diretório 'tarefas'](https://github.com/antoniojnr/ipw/blob/master/aulas/firebase/bash-mkdir-tarefas.png)

## Conectando ao Firebase

Após criar o diretório que abrigará o projeto, vamos fazer login no Firebase para ter acesso aos projetos criados através do console (https://console.firebase.google.com). Use o comando `firebase login` para fazer login no Firebase.

![Fazendo login no Firebase](https://github.com/antoniojnr/ipw/blob/master/aulas/firebase/bash-firebase-login.png)

Você será redirecionado para a janela de autenticação do Google. Após completar o processo de autenticação, você verá a mensagem `✔  Success! Logged in as [seu email]` no terminal. Agora você poderá criar um projeto e ter acesso a este através do terminal.

## Criando um novo projeto

Ao acessar https://console.firebase.google.com, você verá uma página como a mostrada a seguir, exceto que para você, provavelmente nenhum projeto estará listado. Clique no botão "Add Project" (Você poderá ver o texto em português, dependendo da linguagem padrão do seu navegador).

![Criando projeto no console do Firebase](https://github.com/antoniojnr/ipw/blob/master/aulas/firebase/firebase-console.png)

Na janela de criar um novo projeto, preencha o nome do seu novo projeto, tome nota do ID do projeto (marcado em vermelho na imagem a seguir), marque as caixas para aceitar os termos e clique em "Create Project". Você verá uma janela que indica que seu projeto está sendo criado e, logo após isso, você será redirecionado para a página de seu projeto.

O próximo passo é definir as opções de [autenticação](https://github.com/antoniojnr/ipw/blob/master/aulas/firebase/2-autenticacao.md).