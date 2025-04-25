const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const Person = require("./models/person");
const app = express();

app.use(express.json());
app.use(express.static("dist"));
morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens["body"](req, res),
    ].join(" ");
  })
);

const createContact = (name, number) => {
  if (!!!name) throw Error("Name must be defined");
  if (!!!number) throw Error("Number must be defined");
  if (contacts.find((p) => p.name === name)) throw Error("Name must be unique");

  let id = Math.round(Math.random() * 1000000).toString();
  while (contacts.find((p) => p.id === id)) {
    id = Math.random() * 1000000;
  }
  contacts.push({ name, number, id });
  return { name, number, id };
};

// Handle known paths

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((people) => {
      res.json(people);
    })
    .catch((error) => next(error));
});

app.get("/api/info", (req, res, next) => {
  Person.countDocuments({})
    .then((length) => {
      const numData = `Phonebook has data for ${length} people`;
      const date = Date();
      res.send(`<div>${numData}</div><div>${date}</div>`);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  const params = req.params;
  Person.findById(params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const params = req.params;

  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const name = req.body.name;
  const number = req.body.number;

  if (!!!name) throw Error("Name must be defined");
  if (!!!number) throw Error("Number must be defined");
  const person = new Person({
    name,
    number,
  });
  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const params = req.params;
  Person.findById(params.id).then((person) => {
    if (!person) {
      return res.status(404).end();
    }

    person.name = req.body.name;
    person.number = req.body.number;

    return person
      .save()
      .then((savedPerson) => {
        res.json(savedPerson);
      })
      .catch((error) => next(error));
  });
});

// Handle unknown paths
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

// Handle errors
const errorHandler = (error, req, res, next) => {
  console.log("Error:", error);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server listening on port ", PORT);
});
