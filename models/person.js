const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: { type: String, required: [true, "The name is a required field"] },
  surname: {
    type: String,
    required: [true, "The surname is a required field"],
  },
  email: String,
  age: Number,
  phone: Number,
  address: String,
});

const Person = mongoose.model("persons", personSchema);

module.exports = Person;
