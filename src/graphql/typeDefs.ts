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

  type Institution implements Node {
    nodeId: ID!
    id: Int!
    orgName: String
    orgType: String
    lateReportCount: BigInt
    readyForReportCount: BigInt
    lateReportRate: Float
  }
`;
