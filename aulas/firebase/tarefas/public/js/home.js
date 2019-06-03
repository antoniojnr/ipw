let auth = firebase.auth();

auth.onAuthStateChanged(function(user) {
  if (user) {
    // Recupera o elemento h1 de id 'usuario'
    let texto = document.getElementById('usuario');
    // Recupera o elemento button de id 'desconectar'
    let botao = document.getElementById('desconectar');
    // Define o texto do h1
    texto.innerHTML = "Usuário conectado: " + user.displayName;
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