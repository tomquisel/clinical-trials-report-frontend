export default `
  type Query {
    counter: Int
    organizations: [Organization!]!
  }

  type Mutation {
    decrementCounter(): Int
    decrementCounter3(amount: Int): Int
    incrementCounter(): Int
    incrementCounter3(amount: Int): Int
  }

  type Organization {
    name: String!
    trials: Int!
    ontime: Float!
    late: Float!
    missing: Float!
  }
`;
