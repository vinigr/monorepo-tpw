const faker = require("faker");
const { factory } = require("factory-girl");
const Usuario = require("../src/app/models/Usuario");
const Trabalho = require('../src/app/models/Trabalho');

faker.locale = "pt_BR";

factory.define("Usuario", Usuario, {
  nome: faker.name.findName(),
  login: faker.internet.email(),
  senha: faker.internet.password()
});

factory.define("Trabalho", Trabalho, {
  titulo: faker.lorem.sentence(),
  resumo: faker.lorem.paragraph(),
  palavrasChave: faker.random.arrayElement(1,5, faker.lorem.word),
  autores: faker.random.arrayElement(1,5, faker.lorem.uuid),
  outrosAutores: faker.random.arrayElement(0,2, faker.name.findName()),
  professor: faker.random.uuid(),
  orientador: faker.random.uuid(),
  caminho: faker.internet.url()
});


module.exports = factory;
