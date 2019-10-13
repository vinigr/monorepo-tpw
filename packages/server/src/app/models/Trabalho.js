const mongoose = require('mongoose');

const TrabalhoSchema = new mongoose.Schema(
  {
    titulo: String,
    autores: [mongoose.Schema.Types.ObjectId],
    outrosAutores: [String],
    orientador: mongoose.Schema.Types.ObjectId,
    professor: mongoose.Schema.Types.ObjectId,
    palavrasChave: String,
    resumo: String,
    publicado: Boolean,
    editavel: Boolean,
    caminho: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Trabalho', TrabalhoSchema);
