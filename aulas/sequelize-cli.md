# Roteiro de aula
**Observação:** Relate ao professor sobre qualquer erro neste documento.
## Criando o projeto
Para criar o seu projeto e conseguir usar o Sequelize como ORM para se comunicar com o banco de dados, você precisará usar o pacote `sequelize-cli` da seguinte forma.

1. Crie um novo diretório com o nome do seu projeto e inicialize um novo projeto Node usando o comando `npm init`.
2. Instale os pacotes `sequelize-cli` e `sequelize` com o comando `npm i sequelize sequelize-cli`.

Neste momento, você terá a seguinte estrutura de diretórios:
<pre>
projeto
 |- node_modules (pacotes instalados pelo NPM)
 |- package-lock.json
 |- package.json
</pre>

3. Agora você poderá rodar o comando `sequelize init` para inicializar o seu projeto. Você instalou o `sequelize-cli` localmente. Logo, precisará executar o seu binário (executável) para prosseguir. Os binários de pacotes Node.js ficam localizados no diretório `node_modules/.bin`. Para executar no Windows, digite no terminal `node_modules\.bin\sequelize init` e aperte Enter.

Foram criados alguns diretórios e agora você terá a seguinte árvore de diretórios:
<pre>
projeto
 |- config
 |- migrations
 |- models
 |- node_modules
 |- seeders
 |- package-lock.json
 |- package.json
</pre>

4. Neste momento, você precisará configurar o acesso ao banco de dados. Usaremos o banco de dados PostgreSQL. Certifique-se de ter seguido os passos listados [aqui](https://github.com/antoniojnr/ipw/blob/master/aulas/postgresql.md)

## Configurando o projeto
1. Com o usuário e base de dados criados, iremos inserir as configurações no arquivo `config/config.json`. O valor inserido em `username` é `ipw`, conforme definido nos passos de configuração; o valor de `password` é a senha que você inseriu para o usuário e o `database` é `ipw`. Descubra o IP da máquina usando `ip addr`. O IP deverá ser inserido em `hostname`. Finalmente, o `dialect` é `postgres`. Por enquanto, preencha apenas as configurações do ambiente `development`.

Suas configurações devem ficar como as listadas a seguir:
<pre>
"development": {
  "username": "ipw",
  "password": "[SUA SENHA]",
  "database": "ipw",
  "host": "[SEU IP]",
  "dialect": "postgres"
}
</pre>

2. Agora é hora de testar se as configurações estão corretas e se seu projeto consegue se comunicar com o banco de dados. Antes de continuar, instale o módulo NPM do Postgres, usando `npm i pg`.

Com o comando a seguir, você criará a base de dados `ipw` especificada no arquivo de configurações:
<pre>
node_modules\.bin\sequelize db:create
</pre>

A saída seguinte indica sucesso na operação.
<pre>
Database ipw created.
</pre>

Qualquer saída diferente com alguma mensagem precedida por `ERROR:` indica que houve falha na criação da base de dados, exceto se a saída indicar que a base de dados já existe (`Database 'ipw' already exists.`), o que indicará que você conseguiu se conectar com sucesso ao banco de dados. Esse erro aparece porque você já possivelmente já criou a base de dados no passo 4 anterior.

## Alterando a base de dados
### Criando modelo e migração
Com a conexão ao banco de dados configurada corretamente, é hora de criar nosso primeiro modelo. O `sequelize-cli` dispõe de um script que gera o *modelo* no arquivo apropriado e uma *migração*. Migrações são evoluções no seu esquema de dados, que serão feitas automaticamente pelo Sequelize.

Iremos gerar um modelo **User** com os seguintes atributos: **firstName**:*string*, **lastName**:*string* e **email**:*string*. Para isso, insira o comando a seguir:
<pre>
node_modules\.bin\sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string
</pre>

O comando acima emite uma saída indicando que um novo modelo e uma nova migração foram criados nos diretórios `models` e `migrations`.

### Executando a migração
Para executar a migração e criar a(s) tabela(s) necessária(s) para armazenar o modelo criado, execute o comando:
<pre>
node_modules\.bin\sequelize db:migrate
</pre>

Este comando rodará o script para criar a tabela `Users`, onde será armazenado cada `User`.

### Verificando as mudanças
Verifique se a tabela `Users` foi criada utilizando a interface cliente do Postgres. Conectado como **postgres**, execute os comandos a seguir. Esse comando deve ser executado no terminal do sistema operacional instalado na sua máquina virtual.

Para abrir a interface cliente, digite `psql`.

Na interface cliente, você verá o prompt de comando `postgres=#`. Digite o comando em negrito:
<pre>
postgres=# <b>\connect ipw</b>
</pre>

Você estará conectado à base de dados `ipw`. Liste as tabelas da base de dados com o comando:
<pre>
postgres=# <b>\dt</b>
</pre>

Você verá a saída indicando que a tabela `Users` foi criada.
<pre>
List of relations
Schema |     Name      | Type  | Owner
--------+---------------+-------+-------
public | SequelizeMeta | table | ipw
public | Users         | table | ipw
(2 rows)
</pre>

### Desfazendo a migração
Caso tenha feito algo errado e deseje reverter essa migração, ou seja, desfazer tudo o que foi feito por ela que, no caso, é criar a tabela `Users`, insira o comando a seguir. Esse comando só desfaz a migração mais recente.

Para refazer a migração, execute o comando listado em [Executando a migração](https://github.com/antoniojnr/ipw/blob/master/aulas/sequelize-cli.md#executando-a-migração)
<pre>
node_modules\.bin\sequelize db:migrate:undo
</pre>
