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

app.get("/api/persons", (req, res) => {
  Person.find({}).then((people) => {
    res.json(people);
  });
});

app.get("/api/info", (req, res) => {
  const numData = `Phonebook has data for ${contacts.length} people`;
  const date = Date();
  res.send(`<div>${numData}</div><div>${date}</div>`);
});

app.get("/api/persons/:id", (req, res) => {
  const params = req.params;

  Person.findById(params.findById).then((person) => {
    res.json(person);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const params = req.params;
  contacts = contacts.filter((p) => p.id !== params.id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const name = req.body.name;
  const number = req.body.number;

  try {
    if (!!!name) throw Error("Name must be defined");
    if (!!!number) throw Error("Number must be defined");
    const person = new Person({
      name,
      number,
    });
    person.save().then((savedPerson) => {
      res.json(savedPerson);
    });
  } catch (e) {
    res
      .status(400)
      .json({
        error: e.message,
      })
      .end();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server listening on port ", PORT);
});
