const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
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

let contacts = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

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
  console.log("req", req);
  res.json(contacts);
});

app.get("/api/info", (req, res) => {
  const numData = `Phonebook has data for ${contacts.length} people`;
  const date = Date();
  res.send(`<div>${numData}</div><div>${date}</div>`);
});

app.get("/api/persons/:id", (req, res) => {
  const params = req.params;
  const person = contacts.find((p) => p.id === params.id);

  if (!person) {
    res.status(404).end();
    return;
  }
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const params = req.params;
  contacts = contacts.filter((p) => p.id !== params.id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const person = req.body;
  try {
    const p = createContact(
      person.name ?? undefined,
      person.number ?? undefined
    );
    return res.json(p);
  } catch (e) {
    res
      .status(400)
      .json({
        error: e.message,
      })
      .end();
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Server listening on port ", PORT);
});
