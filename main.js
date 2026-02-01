const yargs = require("yargs");
const crud = require("./crud.js");

// Add a  random joke
yargs.command({
  command: "add random",
  describe: "writing a new random joke",
  handler: () => {
    crud.addJoke();
  },
});

// Delete a joke
yargs.command({
  command: "delete",
  describe: "delete a joke",
  builder: {
    name: { describe: "name", demandOption: true },
  },
  handler: (argv) => {
    crud.deleteJoke(argv.name);
  },
});

// List all jokes
yargs.command({
  command: "list",
  describe: "listing all jokes",
  handler: () => {
    crud.listJokes();
  },
});

// Read/Find a joke
yargs.command({
  command: "find",
  describe: "find a joke",
  builder: {
    name: { describe: "name", demandOption: true },
  },
  handler: (argv) => {
    crud.findJoke(argv.name);
  },
});

yargs.command({
  command: "read random",
  describe: "read a random joke (picked by random index)",
  handler: () => {
    crud.readRandom();
  }
})
yargs.parse();
