class Tarefa {
  constructor({ id, nome, descricao, data, estado }) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.data = data;
    this.estado = estado;
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
      nome: this.nome,
      descricao: this.descricao,
      data: this.data,
      estado: this.estado,
    };
  }
}
