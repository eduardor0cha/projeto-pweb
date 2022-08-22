var tarefas = [];

window.onload = () => {
  preencherColunas();
};

function createTarefa(tarefa) {
  const tarefaElement = document.createElement("div");
  tarefaElement.classList.add("tarefa");
  tarefaElement.id = `tarefa${tarefa.id}`;
  tarefaElement.dataset.id = tarefa.id;
  tarefaElement.draggable = true;
  tarefaElement.ondragstart = (event) => handleDragStart(event);
  tarefaElement.innerHTML = `
      <div class="cabecalho-tarefa">
        <h4 class="titulo-tarefa">${tarefa.nome}</h4>
        <button class="deletar-tarefa" onclick="handleDeleteTarefa(${tarefa.id})">×</button>
      </div>
      <p class="descricao-tarefa">${tarefa.descricao}</p>
      <p class="prazo-tarefa">Prazo: ${tarefa.data}</p>`;
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
  atualizarTarefas();
  preencherColunas();
}

function atualizarTarefas() {
  var tarefasJSON = [];
  for (i in tarefas) {
    const tarefa = tarefas[i];
    tarefasJSON.push(tarefa.toJSON());
  }
  localStorage.setItem("tarefas", JSON.stringify(tarefasJSON));
}

function handleDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.dataset.id);
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDrop(event) {
  var idTarefa = event.dataTransfer.getData("text");
  event.dataTransfer.clearData();
  var tarefa = document.getElementById(`tarefa${idTarefa}`);

  if (event.target.className != "corpo-coluna") return;

  for (i in tarefas) {
    if (tarefas[i].id == tarefa.dataset.id) {
      switch (event.target.id) {
        case "corpo1":
          tarefas[i].coluna = "pendente";
          break;

        case "corpo2":
          tarefas[i].coluna = "fazendo";
          break;

        case "corpo3":
          tarefas[i].coluna = "feito";
          break;
      }
    }
  }
  atualizarTarefas();
  event.target.appendChild(tarefa);
}

function preencherColunas() {
  var corpos = document.getElementsByClassName("corpo-coluna");
  for (i in corpos) {
    corpos[i].innerHTML = "";
  }

  const json = JSON.parse(localStorage.getItem("tarefas"));
  tarefas = Tarefa.createArrayFromJSON(json);
  for (i in tarefas) {
    switch (tarefas[i].coluna) {
      case "pendente":
        document.getElementById("corpo1").appendChild(createTarefa(tarefas[i]));
        break;

      case "fazendo":
        document.getElementById("corpo2").appendChild(createTarefa(tarefas[i]));
        break;

      case "feito":
        document.getElementById("corpo3").appendChild(createTarefa(tarefas[i]));
        break;
    }
  }
}
