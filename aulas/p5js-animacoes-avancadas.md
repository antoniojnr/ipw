# Animações avançadas

## Representando estado de itens

O estado de um objeto desenhado em uma animação é dado por sua posição (coordenadas *x* e *y*) e outras propriedades que determinam como o objeto será animado (velocidade de movimento, tamanho do raio, tamanho do lado, entre outras). Alterar a posição a cada chamada do `draw()` faz com que o objeto se desloque durante a animação, independentemente de este ser uma elipse, retângulo ou triângulo.

### Objetos em JavaScript

Um objeto é uma coleção de propriedades e cada propriedade é uma associação entre um nome (também chamado de chave) e um valor.

No sketch a seguir, o objeto na variável `item` representa o estado do objeto a ser desenhado. `item` é inicializado na linha 5 com o seguinte valor.

```javascript
item = {
  x: width/2,
  y: height/2,
  raio: 20,
  texto: 'Círculo',
  cor: '#FF0090'
};
```

No sketch, um círculo com o texto, raio e cor especificados segue o ponteiro do mouse. Você poderia pensar neste círculo como um personagem em um jogo, por exemplo, que possui várias propriedades, como roupa, vida, nível, quantidade de munição, etc. Essas propriedades poderiam ser representadas em um objeto.

```javascript
var item;

function setup() {
  createCanvas(400, 400);
	item = {
		x: width/2,
		y: height/2,
		raio: 20,
		texto: 'Círculo',
		cor: '#FF0090'
	};
}

function draw() {
  background(255);
	fill(item.cor);
	ellipse(item.x, item.y, item.raio * 2, item.raio * 2);
	textAlign(CENTER);
	text(item.texto, item.x, item.y + item.raio + 15);
	item.x = mouseX;
	item.y = mouseY;
}
```

Modifique as propriedades do objeto ou o código para ver que resultado você obtém. No próximo assunto, veremos como representar os itens de uma animação como objetos nos ajuda a controlar o estado de cada um deles.

## Múltiplos objetos em uma animação

No tópico anterior, você aprendeu a representar o estado de um item de sua animação de uma forma auto-contida, em um objeto JavaScript.

Até o momento, nossas animações consistiam de um único item, do qual você controlava os valores das coordenadas (*x* e *y*) para movê-lo para esquerda, direita, baixo ou cima. Isso limita muito o que podemos fazer com P5.js.

Para elevar suas animações ao próximo nível, você precisará guardar o estado de múltiplos objetos.

## Listas

Para guardar o estado de um item, contendo sua posição (`x` e `y`) e raio (`r`), você aprendeu a utilizar um objeto em JavaScript como o que é mostrado a seguir.

```javascript
var estado  = {
                x: 100,
                y: 150,
                r: 5
              };
```

Para desenhar um círculo de diâmetro igual a 50 a partir desse estado, você faz:

```javascript
ellipse(estado.x, estado.y, 50, 50);
```

Partindo deste ponto, precisaremos guardar em uma lista múltiplos objetos como o que está na variável `estado`, para guardarmos o estado de múltiplos objetos.

O código a seguir adiciona 100 objetos em uma lista. A função `push()` adiciona itens a uma lista e a função `random(x, y)` retorna um número aleatório entre `x` (inclusive) e `y` (não incluso). Isso quer dizer que `random(0, 5)` poderá retornar um número entre `0` e `4.9999`. As variáveis `width` e `height` armazenam a largura e altura da tela, respectivamente.

```javascript
var itens = [];

for (int i = 0; i < 100; i++) {
  itens.push({
    x: random(0, width),
    y: random(0, height),
    r: 5
  });
}
```

Para desenhar os itens da lista, você precisará percorrê-la com um `for`, desenhando cada um deles como uma elipse, como mostrado a seguir.

```javascript
var itens = [];

function setup() {
  createCanvas(640, 480);
  // Adicionamos os objetos à lista. Neste
  // exemplo, isso deve acontecer somente
  // uma vez e, por isso, está na função
  // setup()
  for (var i = 0; i < 100; i++) {
    itens.push({
      x: random(0, width),
      y: random(0, height),
      r: 5
    });
  }
}

function draw() {
  for (var i = 0; i < itens.length; i++) {
    var item = itens[i];
    ellipse(item.x, item.y, item.r, item.r);
  }
}
```

## Projetos relacionados a esta aula

* [p5js-multiplos-objetos](https://github.com/antoniojnr/ipw/tree/master/projetos/p5js-multiplos-objetos)

## Próximo assunto

...

## Exercício

Crie uma animação simulando gotas caindo como a que é mostrada [neste vídeo](https://youtu.be/SLCJ0A8fdkg).

Sua animação deve obedecer aos seguintes requisitos:
* O painel da animação deve ter *640* pixels de largura por *480* pixels de altura.
* As gotas devem ser da cor *branca*, e desenhados sem traço.
* O plano de fundo é da cor `#29A0FF`.
* Cada gota deve cair a uma velocidade aleatória, entre *1* a *5* pixels por quadro, quando a barra de espaço é pressionada.
