const yargs = require("yargs");
const crud = require("./crud.js");

// Add a  random joke
yargs.command({
  command: "add random",
  describe: "writing a new random joke",
  builder: {
    name: { describe: "name" },
    age: { describe: "age" },
    joke: { describe: "joke" },
  },
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
  describe: "list all jokes",
  handler: () => {
    try {
      let jokeList = crud.readJokes();
      jokeList.forEach((element) => {
        console.log(element.joke);
      });
    } catch (e) {
      console.log(e);
    }
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

yargs.parse();
