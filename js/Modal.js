function abrirModalCriarTarefa() {
  if (colunas.length == 0) {
    alert("Não há colunas existentes! Crie uma coluna e tente novamente.");
    return;
  }

  document.getElementById("campo-coluna-tarefa").innerHTML = "";

  var opcaoPadrao = document.createElement("option");
  opcaoPadrao.disabled = true;
  opcaoPadrao.selected = true;
  opcaoPadrao.value = "";
  opcaoPadrao.innerHTML = "-- Selecione uma coluna --";
  document.getElementById("campo-coluna-tarefa").appendChild(opcaoPadrao);

  for (i in colunas) {
    var opcao = document.createElement("option");
    opcao.value = colunas[i].identificador;
    opcao.innerHTML = colunas[i].nome;
    document.getElementById("campo-coluna-tarefa").appendChild(opcao);
  }

  document.getElementById("modal-criar-tarefa").style.display = "flex";
}

function fecharModalCriarTarefa() {
  document.getElementById("modal-criar-tarefa").style.display = "none";
}

function submitCriarTarefa(event) {
  event.preventDefault();
  if (colunas.length == 0) return;

  var campoTitulo = document.getElementById("campo-titulo-tarefa");
  var campoDescricao = document.getElementById("campo-descricao-tarefa");
  var campoPrazo = document.getElementById("campo-prazo-tarefa");
  var campoColuna = document.getElementById("campo-coluna-tarefa");

  if (
    !campoTitulo.value ||
    !campoDescricao.value ||
    !campoPrazo.value ||
    !campoColuna.value
  ) {
    alert("Há valores faltando. Certifique-se de preencher todos os campos.");
    return;
  }

  var maiorId = 0;
  for (i in tarefas) {
    if (tarefas[i].id >= maiorId) {
      maiorId = tarefas[i].id;
    }
  }
  var id = maiorId + 1;

  var data = new Date(campoPrazo.value.replace(/-/g, "/")),
    dia = data.getDate().toString(),
    diaF = dia.length == 1 ? "0" + dia : dia,
    mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
    mesF = mes.length == 1 ? "0" + mes : mes,
    anoF = data.getFullYear();
  var prazoFormatado = diaF + "/" + mesF + "/" + anoF;

  console.log(campoColuna.value);

  var tarefa = new Tarefa({
    id: id,
    nome: campoTitulo.value,
    descricao: campoDescricao.value,
    data: prazoFormatado,
    coluna: campoColuna.value,
  });

  tarefas.push(tarefa);
  atualizarTarefas();
  preencherColunas();
  campoTitulo.value = "";
  campoDescricao.value = "";
  campoPrazo.value = "";
  campoColuna.value = "";
  fecharModalCriarTarefa();
}

function abrirModalCriarColuna() {
  document.getElementById("modal-criar-coluna").style.display = "flex";
}

function fecharModalCriarColuna() {
  document.getElementById("modal-criar-coluna").style.display = "none";
}

function submitCriarColuna(event) {
  event.preventDefault();
  var campoTitulo = document.getElementById("campo-titulo-coluna");
  var campoIdentificador = document.getElementById(
    "campo-identificador-coluna"
  );

  if (!campoTitulo.value || !campoIdentificador.value) {
    alert("Há valores faltando. Certifique-se de preencher todos os campos.");
    return;
  }

  if (campoIdentificador.value.toLowerCase().trim().indexOf(" ") >= 0) {
    alert("Por favor, não use espaços no identificador.");
    return;
  }

  for (i in colunas) {
    if (
      colunas[i].identificador == campoIdentificador.value.toLowerCase().trim()
    ) {
      alert(
        `O identificador "${campoIdentificador.value
          .toLowerCase()
          .trim()}" já está em uso. Escolha outro identificador.`
      );
      return;
    }
  }

  var maiorId = 0;
  for (i in colunas) {
    if (colunas[i].id >= maiorId) {
      maiorId = colunas[i].id;
    }
  }
  var id = maiorId + 1;

  var coluna = new Coluna({
    id: id,
    nome: campoTitulo.value,
    identificador: campoIdentificador.value.toLowerCase().trim(),
  });

  colunas.push(coluna);
  atualizarColunas();
  construirColunas();
  campoTitulo.value = "";
  campoIdentificador.value = "";
  fecharModalCriarColuna();
  preencherColunas();
}

window.onclick = function (event) {
  var modalCriarTarefa = document.getElementById("modal-criar-tarefa");
  var modalCriarColuna = document.getElementById("modal-criar-coluna");

  if (event.target == modalCriarTarefa) {
    modalCriarTarefa.style.display = "none";
  } else if (event.target == modalCriarColuna) {
    modalCriarColuna.style.display = "none";
  }
};
