let auth = firebase.auth();

auth.onAuthStateChanged(function(user) {
  if (user) {
    // Cria um elemento h1
    let texto = document.createElement('h1');
    // Cria um elemento button
    let botao = document.createElement('button');
    // Define o texto do h1
    texto.innerHTML = "Usuário conectado: " + user.displayName;
    // Define o texto do button
    botao.innerHTML = "Desconectar";
    // Pega todos os elementos do tipo "body" (só há um)
    let elems = document.getElementsByTagName('body');
    // Pega o único elemento da lista
    let corpo = elems[0];
    // Anexa os dois elementos criados ao corpo
    corpo.appendChild(texto);
    corpo.appendChild(botao);
    // Adiciona um listener ao evento "click" do botão
    botao.addEventListener('click', function() {
      firebase.auth().signOut().then(function() {
        console.log("Você está desconectado");
      });
    });
  } else {
    window.location.replace('index.html');
  }
});