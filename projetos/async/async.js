function funcao1(cb) {
  setTimeout(function() {
    console.log('funcao 1');
    cb();
  }, 500);
}

function funcao2() {
  console.log('funcao 2');
}

funcao1(function() {
  funcao2();
});
