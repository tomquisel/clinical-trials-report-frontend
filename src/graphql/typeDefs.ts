export default `
  type Query {
    counter: Int
    institutions: [Institution!]!
  }

  type Mutation {
    decrementCounter(): Int
    decrementCounter3(amount: Int): Int
    incrementCounter(): Int
    incrementCounter3(amount: Int): Int
  }

  type Institution {
    name: String!
    trials: Int!
    ontime: Float!
    late: Float!
    missing: Float!
  }
`;
