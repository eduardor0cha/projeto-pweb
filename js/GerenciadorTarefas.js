var tarefas = [];

window.onload = () => {
  tarefasJSON = [
    {
      id: 1,
      nome: "Tarefa 1",
      descricao: "Descrição da tarefa 1",
      data: "01/01/2020",
      estado: "pendente",
    },
  ];
  localStorage.setItem("tarefas", JSON.stringify(tarefasJSON));
  preencherColunas();
};

function createTarefa(tarefa) {
  const tarefaElement = document.createElement("div");
  tarefaElement.classList.add("tarefa");
  tarefaElement.id = `tarefa${tarefa.id}`;
  tarefaElement.innerHTML = `
    <div draggable="true" class="tarefa">
      <div class="cabecalho-tarefa">
        <h5 class="titulo-tarefa">${tarefa.nome}</h5>
        <button class="fechar-tarefa" onclick="handleDeleteTarefa(${tarefa.id})">X</button>
      </div>
      <p class="descricao-tarefa">${tarefa.descricao}</p>
      <p class="prazo-tarefa">Prazo: ${tarefa.data}</p>
    </div>`;
  return tarefaElement;
}

function handleDeleteTarefa(id) {
  for (i in tarefas) {
    const tarefa = tarefas[i];
    if (tarefa.id == id) {
      tarefas.splice(i, 1);
      break;
    }
  }
  console.log(tarefas);
  atualizarTarefas();
  preencherColunas();
}

function atualizarTarefas() {
  var tarefasJSON = [];
  for (i in tarefas) {
    const tarefa = tarefas[i];
    tarefasJSON.push(tarefa.toJSON());
  }
  console.log(tarefasJSON);
  localStorage.setItem("tarefas", JSON.stringify(tarefasJSON));
}

function preencherColunas() {
  document
    .getElementById("coluna1")
    .getElementsByClassName("corpo")[0].innerHTML = "";
  const json = JSON.parse(localStorage.getItem("tarefas"));
  tarefas = Tarefa.createArrayFromJSON(json);
  for (i in tarefas) {
    document
      .getElementById("coluna1")
      .getElementsByClassName("corpo")[0]
      .appendChild(createTarefa(tarefas[i]));
  }
}
