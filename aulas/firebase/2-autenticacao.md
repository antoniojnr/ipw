# Autenticação

Autenticação é uma parte essencial de uma aplicação, porque permite ao desenvolvedor garantir que, teoricamente, só usuários conhecidos utilizarão a aplicação – ou seja, aqueles usuários que, de alguma forma estarão identificados dentro da aplicação.

Enquanto que é importante aprender sobre o mecanismo por trás da autenticação do usuário em um sistema, neste momento, nos dedicaremos apenas a utilizar serviços já prontos. De fato, utilizar serviços de autenticação já prontos é algo bastante praticado no mercado: toda vez que você utiliza uma aplicação e faz login ou registra-se através de sua conta do Google, Facebook, Microsoft, etc, você está usando um provedor de autenticação.

Provedores de autenticação funcionam através uma relação de confiança. Eles identificam o usuário que possui uma conta em seus serviços através de seu nome de usuário e senha, mas não revelam esses dados às aplicações que utilizam o serviço; apenas retornam um dado que pode ser usado para obter informações do usuário autenticado no provedor de serviço.

Um exemplo prático de como funciona um provedor de autenticação é o seguinte:

1. Uma aplicação XYZ possui o botão "Fazer login com o Google".
2. O usuário clica no botão e é direcionado para outra página, onde vai inserir suas credenciais da conta Google. É importante observar que o a URL mostrada nesta janela é um domínio do Google. Navegadores não compartilham informações entre domínios diferentes (isso significa que, por exemplo, o código JavaScript de uma aplicação presente em um domínio www.abc.com não consegue acessar dados de outro domínio www.xyz.com)
3. Se as credenciais inseridas estiverem corretas, a janela de autenticação retorna para a aplicação XYZ. Entre os dados retornados pela janela de autenticação e entregues à aplicação XYZ, está um *token*. O *token* é como um cartão único, muito difícil de clonar, que a aplicação XYZ pode usar para verificar que o usuário é realmente quem ele diz ser, pois o Google já confirmou isso.
4. A aplicação XYZ pode, a partir de então, acessar informações da conta Google do usuário cujo acesso tenha sido autorizado por este. O processo é semelhante para o login através do Twitter, Facebook, Microsoft, etc.