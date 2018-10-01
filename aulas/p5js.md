# Roteiro da aula

p5.js é uma biblioteca JavaScript feita para tornar programação acessível a artistas, designers, educadores e iniciantes. A biblioteca possui um conjunto completo de funcionalidades para desenho e animação.

Você pode utilizar um painel ou a página completa para criar suas animações.

## Download

Baixe os arquivos necessários a partir do link: [https://p5js.org/download/](https://p5js.org/download/).

Em **Complete Library**, clique em **p5.js complete**.

Descompacte o arquivo baixado em um novo diretório. Você terá um diretório com a seguinte estrutura

<pre>
seu-projeto
  |- addons
  |- empty-example
  |- p5.js
  |- p5.min.js
  |- p5.pre-min.js
</pre>

Iremos precisar, por enquanto, apenas do arquivo `p5.js`.

## Criando a página

No mesmo diretório do arquivo `p5.js`, crie uma página HTML vazia e salve como `index.html`. Na página, importe o arquivo, como mostrado a seguir:

<pre lang="html">
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>p5.js</title>
    <script src="p5.js"></script>
  </head>
  <body>
  </body>
</html>
</pre>
