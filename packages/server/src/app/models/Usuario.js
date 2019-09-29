const mongoose = require("mongoose")

const UsuarioSchema = new mongoose.Schema(
  {
    nome: String,
    login: String,
    hashSenha: String,
    administrador: Boolean,
    professor: Boolean,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Usuario", UsuarioSchema)
