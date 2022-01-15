function preencheCampos(json) {
  document.querySelector('input[name=estado]').value = json.uf;
  document.querySelector('input[name=bairro]').value = json.bairro;
  document.querySelector('input[name=cidade]').value = json.localidade;
  document.querySelector('input[name=logradouro]').value = json.logradouro;
}

function capturardadosparaConclusao() {
  window.localStorage.setItem('logradouro', document.querySelector('input[name=logradouro]').value);
  window.localStorage.setItem('bairro', document.querySelector('input[name=bairro]').value);
  window.localStorage.setItem('cidade', document.querySelector('input[name=cidade]').value);
  window.localStorage.setItem('estado', document.querySelector('input[name=estado]').value);
  window.location.href='./concluir.html';
}

function loadados() {
  const logradouro = window.localStorage.getItem('logradouro');
  const bairro = window.localStorage.getItem('bairro');
  const cidade = window.localStorage.getItem('cidade');
  const estado = window.localStorage.getItem('estado');
  document.querySelector('.logradouro').innerHTML = logradouro;
  document.querySelector('.bairro').innerHTML     = bairro;
  document.querySelector('.cidade').innerHTML     = cidade;
  document.querySelector('.estado').innerHTML     = estado;
}

function buscaCep() {

  const inputCep = document.querySelector("input[name=cep]");
  let cep = inputCep.value.replace("-", "");
  let url = "http://viacep.com.br/ws/" + cep + "/json";

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.responseType="text";

  document.querySelector("input[name=cep]").classList.add("cep-invalido");
  document.querySelector("div.cep-invalido").classList.remove("invisible");
  xhr.onreadystatechange = function () {

    if (xhr.readyState == 4) {
      if ((xhr.status == 200)) {
        document.querySelector("input[name=cep]").classList.remove("cep-invalido");
        document.querySelector(".cep-invalido").classList.add("invisible");
        console.log(JSON.parse(xhr.responseText));
        preencheCampos(JSON.parse(xhr.responseText));
      }
    }


  };
  xhr.send();

};
