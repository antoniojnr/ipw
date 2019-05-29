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

Toda vez que você muda as regras e envia o projeto para hospedar no Firebase, as regras do arquido *firestore.rules* são sincronizadas com as regras do projeto no Firebase, que podem ser acessadas através do console do Firebase.

![Console do Firebase - Configurando regras de acesso](https://github.com/antoniojnr/ipw/blob/master/aulas/firebase/imagens/firebase-rules.png)