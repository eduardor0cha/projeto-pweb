function abrirModalCriarTarefa() {
  document.getElementById("modal-criar-tarefa").style.display = "flex";
}

function fecharModalCriarTarefa() {
  document.getElementById("modal-criar-tarefa").style.display = "none";
}

function submitCriarTarefa(event) {
  event.preventDefault();
  var campoTitulo = document.getElementById("campo-titulo-tarefa");
  var campoDescricao = document.getElementById("campo-descricao-tarefa");
  var campoPrazo = document.getElementById("campo-prazo-tarefa");

  if (!campoTitulo.value || !campoDescricao.value || !campoPrazo.value) return;

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

  var tarefa = new Tarefa({
    id: id,
    nome: campoTitulo.value,
    descricao: campoDescricao.value,
    data: prazoFormatado,
    estado: "pendente",
  });

  tarefas.push(tarefa);
  atualizarTarefas();
  preencherColunas();
  campoTitulo.value = "";
  campoDescricao.value = "";
  campoPrazo.value = "";
  fecharModalCriarTarefa();
}

window.onclick = function (event) {
  var modalCriarTarefa = document.getElementById("modal-criar-tarefa");
  if (event.target == modalCriarTarefa) {
    modalCriarTarefa.style.display = "none";
  }
};
