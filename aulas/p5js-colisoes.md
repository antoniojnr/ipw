# Colisões

Uma vez que nossas animações estão seguindo o caminho, este é o momento de estudarmos um dos elementos essenciais de jogos, presentes em quase qualquer estilo de jogo: colisões.

Colisões são o evento em que dois objetos se encontram e isso pode ser detectado quando as áreas dos dois objetos se encontram. Os dois tipos de objetos cujas colisões são mais fáceis de detectar são os *circulares* e os *retangulares* (incluindo os *quadrados*).

## Detectando colisão entre formas circulares

Execute o projeto [p5js-colisoes-aula](https://github.com/antoniojnr/ipw/tree/master/projetos/p5js-colisoes-aula) para acompanhar este tópico.

Suponha dois círculos cujos raios são `r1` e `r2` e coordenadas do centro iguais a `x1`, `y1` e `x2`, `y2`, respectivamente. Há colisão entre os dois círculos se: `r1 + r2 <= dist(x1, y1, x2, y2)`, onde `dist()` é a função usada para calcular a distância entre dois pontos.

## Exercício

Continue o joguinho iniciado em aula, adicionando os seguintes recursos:
1. As balas devem desaparecer ao ultrapassar os limites da tela ou ao colidir com o círculo maior (você deve removê-las do array de balas).
1. As balas, ao colidirem com o círculo maior, fazem com que esse desapareça e apareça em um novo lugar.
1. Cada círculo grande destruído deverá contar um ponto na soma de pontos geral.
1. A soma de pontos geral deve ser exibido no canto inferior esquerdo da tela.
1. Você pode adicionar elementos extra ao seu jogo, se quiser. Eu vou considerar dar **pontos extra**.
