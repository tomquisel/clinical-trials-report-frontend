export default `
  type Query {
    organizations: [Organization!]!
  }

  type Organization {
    name: String!
    trials: Int!
    ontime: Float!
    late: Float!
    missing: Float!
  }
`;
