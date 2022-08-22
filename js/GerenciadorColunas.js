var colunas = [];

window.onload = () => {
  construirColunas();
  preencherColunas();
};

function createColuna(coluna) {
  const colunaElement = document.createElement("div");
  colunaElement.classList.add("coluna");
  colunaElement.id = `tarefa-${coluna.identificador}`;
  colunaElement.dataset.identificador = coluna.identificador;
  colunaElement.innerHTML = `
  <div class="titulo-coluna">
    <h3>${coluna.nome}</h3>
    <button onclick="handleDeleteColuna(${coluna.id})">×</button>
  </div>
  <div
    class="corpo-coluna"
    id="corpo-${coluna.identificador}"
    data-identificador=${coluna.identificador}
    ondragover="handleDragOver(event)"
    ondrop="handleDrop(event)"
  ></div>`;
  return colunaElement;
}

function handleDeleteColuna(id) {
  var coluna;
  for (i in colunas) {
    if (colunas[i].id == id) {
      coluna = colunas[i];
    }
  }

  var encontrado = false;
  for (i in tarefas) {
    if (tarefas[i].coluna == coluna.identificador) {
      encontrado = true;
    }
  }

  if (encontrado) {
    alert(
      "Ainda há tarefas nesta coluna! Delete-as ou mova-as para poder deletar esta coluna."
    );
    return;
  }

  for (i in colunas) {
    const coluna = colunas[i];
    if (coluna.id == id) {
      colunas.splice(i, 1);
      break;
    }
  }
  atualizarColunas();
  construirColunas();
  preencherColunas();
}

function atualizarColunas() {
  var colunasJSON = [];
  for (i in colunas) {
    const coluna = colunas[i];
    colunasJSON.push(coluna.toJSON());
  }
  localStorage.setItem("colunas", JSON.stringify(colunasJSON));
}

function construirColunas() {
  var main = document.getElementById("main");
  main.innerHTML = "";

  const json = JSON.parse(localStorage.getItem("colunas"));
  if (!json) return;
  if (json.length == 0) return;
  colunas = Coluna.createArrayFromJSON(json);
  for (i in colunas) {
    main.appendChild(createColuna(colunas[i]));
  }
}
