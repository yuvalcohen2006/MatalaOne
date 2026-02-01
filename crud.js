const { Joke } = require("bee-jokes");
const { Chance } = require("chance");
const fs = require("fs");

const joke = new Joke();
const chance = new Chance();

const jokeFile = "jokes.json";

const addJoke = function () {
  try {
    let jokeObj = {
      name: chance.name(),
      age: chance.age(),
      joke: joke.getJoke({}).joke,
    };

    let jokesList = readJokes();
    jokesList.push(jokeObj);

    fs.writeFileSync(jokeFile, JSON.stringify(jokesList));
    console.log("added Joke!");
    console.log(jokeObj);
  } catch (e) {
    return e;
  }
};

const readJokes = function () {
  try {
    const data = fs.readFileSync(jokeFile);
    const jokesList = data.toString();
    return JSON.parse(jokesList);
  } catch (e) {
    return e;
  }
};

const deleteJoke = function (name) {
  let jokesList = readJokes();
  let deleted = false;
  let newList = jokesList.filter(
    jokeObj => jokeObj.name !== name
  )
  if (jokesList.length > newList.length)
    deleted = true;
  try {
    fs.writeFileSync(jokeFile, JSON.stringify(newList));
    deleted
      ? console.log("deleted " + name + "'s jokes!")
      : console.log("the given name wasn't found in the jokes list.");
  } catch (e) {
    return e;
  }
};

const listJokes = function () {
  let jokeList = readJokes();
  jokeList.forEach((element) => {
    console.log(element.joke);
  });
}

const findJoke = function (name) {
  let jokesList = readJokes();
  jokesList.forEach((element) => {
    if (name === element.name) {
      console.log(element.joke)
    }
  });
};

const readRandom = function () {
  let jokeList = readJokes();
  let len = jokeList.length - 1;
  let index = chance.integer({ min: 0, max: len });
  console.log(jokeList[index].joke)
}


module.exports = {
  addJoke, listJokes, deleteJoke, findJoke, readRandom
};
