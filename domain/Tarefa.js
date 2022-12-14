class Tarefa {
  constructor({ id, nome, descricao, data, coluna }) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.data = data;
    this.coluna = coluna;
  }

  static fromJSON(json) {
    const tarefa = new Tarefa(json);
    return tarefa;
  }

  static createArrayFromJSON(json) {
    return json.map((item) => Tarefa.fromJSON(item));
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      descricao: this.descricao,
      data: this.data,
      coluna: this.coluna,
    };
  }
}
