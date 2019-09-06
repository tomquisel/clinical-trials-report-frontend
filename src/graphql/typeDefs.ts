export default `
  type Query {
    counter: Int
  }
  type Mutation {
    decrementCounter(): Int
    decrementCounter3(amount: Int): Int
    incrementCounter(): Int
    incrementCounter3(amount: Int): Int
  }
`;
