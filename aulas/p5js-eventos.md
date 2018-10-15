# Tratando eventos

A utilização de métodos tratadores de eventos permitem que se possa adicionar interatividade à animação. Através do mouse ou teclado, o usuário pode interagir com a animação, ampliando a gama de possibilidades de uso do Processing. É possível adicionar métodos que respondem ao movimento, clique ou arrasto do mouse, ou ainda ao pressionamento de uma tecla. Também é possível saber qual tecla foi pressionada e em que posição da tela o ponteiro do mouse se encontra.

## Mouse

Em Processing, são tratados os seguintes eventos de mouse:
* `mouseClicked()`: quando o mouse é pressionado e solto;
* `mouseDragged()`: quando o mouse é pressionado, segurado e arrastado;
* `mouseMoved()`: quando o ponteiro do mouse é movido;
* `mousePressed()`: quando o mouse é pressionado (antes de ser solto);
* `mouseReleased()`: quando o botão do mouse é solto;
* `mouseWheel()`: quando a roda do mouse é girada.

Ainda há as variáveis de sistema:
* `mouseButton`: contém o valor correspondente ao botão do mouse pressionado: `LEFT`, `CENTER` ou `RIGHT`;
* `mousePressed`: `true` se existe um botão pressionado e `false`, caso contrário;
* `mouseX`: coordenada X da posição atual do mouse;
* `mouseY`: coordenada Y da posição atual do mouse;
* `pmouseX`: coordenada X da posição do mouse no quadro anterior;
* `pmouseY`: coordenada Y da posição do mouse no quadro anterior.

## Teclado

Há os seguintes eventos de teclado:
* `keyPressed()`: quando uma tecla é pressionada (antes de ser solta);
* `keyReleased()`: quando uma tecla é solta;
* `keyTyped()`: quando uma tecla é pressionada, mas teclas como Ctrl, Shift e Alt são ignoradas.

E as seguintes variáveis de sistema:
* `key`: o valor da tecla pressionada mais recentemente;
* `keyCode`: usada para retornar o valor de teclas especiais, como as direcionais e CTRL, SHIFT e ALT;
* `keyPressed`: `true` se existe uma tecla pressionada e `false`, caso contrário.
