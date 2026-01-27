const { Joke } = require("bee-jokes");
const { Chance } = require("chance");
const fs = require("fs");

const addJoke = function () {
  const joke = new Joke();
  const chance = new Chance();

  let jokeObj = {
    name: chance.name(),
    age: chance.age(),
    joke: joke.getJoke({}).joke,
  };

  let jokesList = readJokes();
  jokesList.push(jokeObj);
  fs.writeFileSync("jokes.json", JSON.stringify(jokesList));
  console.log("added Joke!");
  console.log(jokeObj);
};

const readJokes = function () {
  try {
    const data = fs.readFileSync("jokes.json");
    const jokesList = data.toString();
    return JSON.parse(jokesList);
  } catch (e) {
    return [];
  }
};

const deleteJoke = function (name) {
  try {
    let jokesList = readJokes();
    let deletedOne = false;
    jokesList.forEach((element, index) => {
      if (name === element.name) {
        jokesList.splice(index, 1);
        fs.writeFileSync("jokes.json", JSON.stringify(jokesList));
        deletedOne = true;
      }
    });
    deletedOne
      ? console.log("deleted " + name + "'s joke!")
      : console.log("the given name wasn't found in the jokes list.");
  } catch (e) {
    return e;
  }
};

const findJoke = function (name) {
  try {
    let jokesList = readJokes();
    jokesList.forEach((element) => {
      if (name === element.name) {
        console.log(element.joke)
      }
    });
  } catch (e) {
    return e;
  }
};


module.exports = {
  addJoke: addJoke,
  readJokes: readJokes,
  deleteJoke: deleteJoke,
  findJoke: findJoke
};
