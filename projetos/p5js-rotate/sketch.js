function setup() {
createCanvas(500, 640)
background('#FFE4E1')
}
function draw() {
translate(width / 2, height / 2);
fill(&#39;red&#39;);
ellipse(20, 5 , 40 , 40);
fill(&#39;#00ff00&#39;)
rect(0, 30, 40, 40, 5);
rect(0, 45+30, 40, 40, 5);
rect(0, 70+50, 40, 40, 5);
rect(25+20, 30, 40, 40, 5);
rect(25+20, 45+30, 40, 40, 5);
rect(25+20, 70+50, 40, 40, 5);
rect(25+65, 45+30, 40, 40, 5);
rect(25+20, -15, 40, 40, 5);
rect(25+65, 45-60, 40, 40, 5);
}
