const graphql = require("graphql");
const Person = require("../models/person");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = graphql;


//PERSON DATA TYPE
const PersonType = new GraphQLObjectType({
  name: "Person",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    surname: { type: GraphQLString },
    age: { type: GraphQLInt },
    phone: { type: GraphQLInt },
    address: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

// ROOT QUERY
const ROOTQUERY = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    person: {
      type: PersonType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args, context) {
        return Person.findById(args.id);
      },
    },
    persons: {
      type: new GraphQLList(PersonType),
      resolve(parent, args) {
        return Person.find();
      },
    },
  },
});


//MUTATIONS
const MUTATIONS = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPerson: {
      type: PersonType,
      args: {
        name: { type: GraphQLString },
        surname: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
        phone: { type: GraphQLInt },
        address: { type: GraphQLString },
      },
      resolve(parent, args) {
        let person = new Person({
          name: args.name,
          surname: args.surname,
          email: args.email,
          age: args.age,
          phone: args.phone,
          address: args.address,
        });
        return person.save();
      },
    },
    updatePerson: {
      type: PersonType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        surname: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
        phone: { type: GraphQLInt },
        address: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Person.findByIdAndUpdate(
          args.id,
          {
            name: args.name,
            surname: args.surname,
            email: args.email,
            age: args.age,
            phone: args.phone,
            address: args.address,
          },
          {
            new: true,
          }
        );
      },
    },
    deletePerson: {
      type: PersonType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Person.findByIdAndDelete(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: ROOTQUERY,
  mutation: MUTATIONS,
});
