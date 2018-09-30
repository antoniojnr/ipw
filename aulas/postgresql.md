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
Shall the new role be a superuser? (y/n) n
Shall the new role be allowed to create databases? (y/n) y
Shall the new role be allowed to create more new roles? (y/n) n
</pre>
