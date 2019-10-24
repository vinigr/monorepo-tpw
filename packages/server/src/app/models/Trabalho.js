const mongoose = require('mongoose');

const TrabalhoSchema = new mongoose.Schema(
  {
    titulo: String,
    autores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
    outrosAutores: [String],
    orientador: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    professor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    palavrasChave: [String],
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
