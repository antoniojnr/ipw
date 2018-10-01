É recomendável que você crie um novo usuário para a sua nova aplicação, com permissões mais restritas que o usuário **postgres**.

# Criando um novo usuário
Você utilizará o comando `createrole` para criar um novo usuário. A opção `--interactive` lhe pedirá para inserir as informações necessárias.

Se você estiver logado como o usuário **postgres**, crie um novo usuário usando:

<pre>
createuser --interactive
</pre>

O script lhe passará algumas alternativas. Responda conforme mostrado abaixo.

<pre>
Enter name of role to add: <b>ipw</b>
Shall the new role be a superuser? (y/n) <b>n</b>
Shall the new role be allowed to create databases? (y/n) <b>y</b>
Shall the new role be allowed to create more new roles? (y/n) <b>n</b>
</pre>

Se não existe um usuário Linux com o mesmo nome, você deve criar um usando o comando `adduser`. Você terá que fazer isso usando uma conta com privilégios de superusuário (por exemplo, **root** e não logado como o usuário **postgres**).

Insira uma senha e guarde para etapas posteriores. Ignore os campos que pedem para você inserir Full name, office number, room number, etc.

<pre>
$ sudo adduser <b>ipw</b>
</pre>

# Crie uma nova base de dados
O sistema de autenticação do Postgres assume que existe uma base de dados com o mesmo nome do usuário sendo usado para login, à qual o usuário tem acesso.

Na última seção, criamos um usuário chamado `ipw` e, por isso, esse usuário tentará se conectar a uma base de dados chamada `ipw` por padrão. Crie a base de dados com o comando a seguir.

Se você estuver logado como o usuário **postgres**, digite:

<pre>
createdb <b>ipw</b>
</pre>
