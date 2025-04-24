const mongoose = require("mongoose");

if (process.argv.length != 5) {
  console.log("Correct usage node mongo.js <password> <name> <phone number>");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const phoneNumber = process.argv[4];

const url = `mongodb+srv://FSD:${password}@fullstack.zfeowi2.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=FullStack`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
});

const Person = mongoose.model("Person", personSchema);

// Person.find({}).then((result) => {
//   result.forEach((person) => {
//     console.log(person);
//   });
//   mongoose.connection.close();
// });

const person = new Person({
  name,
  phoneNumber,
});

person.save().then((result) => {
  console.log("person saved!");
  mongoose.connection.close();
});
