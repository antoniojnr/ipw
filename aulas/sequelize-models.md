# Criando modelos no Sequelize

Esta seção não tem o objetivo de cobrir todas as especificidades de criar modelos no Sequelize. Para mais informações, consulte a documentação [aqui](https://sequelize.readthedocs.io/en/latest/).

## Criando o modelo e migração

Na [seção anterior](https://github.com/antoniojnr/ipw/blob/master/aulas/sequelize-cli.md#criando-modelo-e-migra%C3%A7%C3%A3o), você aprendeu a usar um comando para criar modelos e migrações. Você deve usar esta forma para criar seus modelos, porque migrações permitem quem alterações na estrutura da base de dados sejam desfeitas apenas com `sequelize db:migrate:undo`, sem que os dados precisem ser apagados. Ainda que você não esteja trabalhando em uma base de dados real, é muito cômodo poder fazer isso com a chamada de um comando.

Você criou o modelo **User** com os atributos: **firstName**:*string*, **lastName**:*string* e **email**:*string*.

Nesta seção, você verá como criar associações entre modelos. Para exemplificar as possibilidades de associações, criaremos os modelos **Image** e **Tag**.

Um **User** possui múltiplos **Image**, ou seja, fotos associadas a ele em um perfil. Por sua vez, um **Image** só pertence a um único usuário. Logo, o relacionamento entre **User** e **Image** é *1:n* (lê-se um para n).

Uma **Tag** é uma etiqueta utilizada para classificar um **Image**. Por exemplo, uma foto de comida em um restaurante pode ter as marcações `comida`, `comida nordestina`, `saudável` e `delícia`. Uma foto possui múltiplas etiquetas, mas estas etiquetas podem ser usadas para classificar outras imagens. Então, **Image** e **Tag** possuem um relacionamento *n:m*.

## Modelando uma associação 1:n

Vamos começar criando o modelo **Image** com os atributos **userId**, **fileId** e **text**, onde **userId** é o id do usuário ao qual a imagem pertence (uma chave estrangeira), **fileId** é um identificador do arquivo onde a imagem está guardada e **text** é um texto descritivo da imagem.

Executando o comando a seguir, você terá um novo arquivo no diretório *migrations* do seu projeto chamado "*...-create-image.js*" e o arquivo *models/image.js*.

<pre>
node_modules\.bin\sequelize model:generate --name Image --attributes userId:integer,fileId:string,text:string
</pre>

No arquivo *models/image.js*, você terá o seguinte.

```javascript
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: DataTypes.INTEGER,
    fileId: DataTypes.STRING,
    text: DataTypes.STRING
  }, { });
  Image.associate = function(models) {

  };
  return Image;
};
```

E no arquivo *migrations/...-create-image.js*, você terá o código a seguir.

```javascript
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      fileId: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Images');
  }
};
```

Para definir que `userId` em `Image` é a chave estrangeira para `User`, precisamos modificar, no código acima, a especificação do atributo `userId` da seguinte forma.

```javascript
userId: {
  type: Sequelize.INTEGER,
  onDelete: 'CASCADE',
  references: {
    model: 'Users',
    key: 'id'
  }
}
```

Esta especificação na chave estrangeira define que se um registro na tabela `Users` for removido, as imagens em `Images` com o `userId` correspondente também serão removidas automaticamente.

Os modelos de **Image** e **User** terão o seguinte código.

**Image**
```javascript
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: DataTypes.INTEGER,
    fileId: DataTypes.STRING,
    text: DataTypes.STRING
  }, { });
  Image.associate = function(models) {
    Image.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Image;
};
```

**User**
```javascript
'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, { });
  User.associate = function(models) {
    User.hasMany(models.Image, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return User;
};
```

Observe que a função `belongsTo` em **Image** cria uma associação com o modelo **User**, definindo que uma imagem pertence a um usuário. Por outro lado, em **User**, a função `hasMany` indica que um **User** possui múltiplos **Image**.

## Modelando uma associação n:m

Criaremos o modelo **Tag** com o atributo **text**, onde **text** é um texto descritivo da etiqueta.

Executando o comando a seguir, você terá um novo arquivo no diretório *migrations* do seu projeto chamado "*...-create-tag.js*" e o arquivo *models/tag.js*.

<pre>
node_modules\.bin\sequelize model:generate --name Tag --attributes text:string
</pre>

Agora, junto com as modificações que foram feitas anteriormente no modelo **Image**, temos o seguinte código.

**Image**
```javascript
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: DataTypes.INTEGER,
    fileId: DataTypes.STRING,
    text: DataTypes.STRING
  }, { });
  Image.associate = function(models) {
    Image.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Image.belongsToMany(models.Tag, {
      through: 'ImageTags'
    });
  };
  return Image;
};
```

**Tag**
```javascript
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    text: DataTypes.STRING
  }, {});
  Tag.associate = function(models) {
    Tag.belongsToMany(models.Image, {
      through: 'ImageTags'
    });
  };
  return Tag;
};
```

Tanto no modelo **Image** como no modelo **Tag** existem associações `belongsToMany`. Essas associações definem que o modelo origem (por exemplo, **Image**) pertence a várias instâncias do modelo destino (por exemplo, **Tag**). Então, uma imagem pode ter múltiplas etiquetas e uma etiqueta pode rotular múltiplas imagens.

A parte `through: 'ImageTags'` significa que o Sequelize criará uma tabela intermediária para armazenar o relacionamento entre **Image** e **Tag**. Esta tabela intermediária se chamará `ImageTags`. A tabela `ImageTags`, criada automaticamente pelo Sequelize, encontra-se descrita abaixo.

<pre>
sequelize=> \d "ImageTags"
             Table "public.ImageTags"
  Column   |           Type           | Modifiers
-----------+--------------------------+-----------
 createdAt | timestamp with time zone | not null
 updatedAt | timestamp with time zone | not null
 ImageId   | integer                  | not null
 TagId     | integer                  | not null
Indexes:
    "ImageTags_pkey" PRIMARY KEY, btree ("ImageId", "TagId")
Foreign-key constraints:
    "ImageTags_ImageId_fkey" FOREIGN KEY ("ImageId") REFERENCES "Images"(id) ON UPDATE CASCADE ON DELETE CASCADE
    "ImageTags_TagId_fkey" FOREIGN KEY ("TagId") REFERENCES "Tags"(id) ON UPDATE CASCADE ON DELETE CASCADE
</pre>

Veja que existem dois campos `ImageId` e `TagId` que são chaves estrangeiras para as tabelas `Images` e `Tags`, respectivamente.

## Enviando as modificações para o banco de dados

Para executar a migração, e fazer com que todas as mudanças efetuadas acima sejam refletidas no banco de dados, digite o comando:
<pre>
node_modules\.bin\sequelize db:migrate
</pre>

## Exercício

1. Como você modelaria "curtidas" e comentários em uma imagem? Explique.
2. Crie os modelos necessários para modelar as entidades referidas na questão 1.
3. (A ser resolvido na aula) Crie as rotas para o CRUD das entidades modeladas.
