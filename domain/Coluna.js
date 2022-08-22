class Coluna {
  constructor({ id, nome, identificador }) {
    this.id = id;
    this.nome = nome;
    this.identificador = identificador;
  }

  static fromJSON(json) {
    const tarefa = new Coluna(json);
    return tarefa;
  }

  static createArrayFromJSON(json) {
    return json.map((item) => Coluna.fromJSON(item));
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      identificador: this.identificador,
    };
  }
}
