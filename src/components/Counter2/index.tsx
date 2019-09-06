import gql from "graphql-tag";
import * as React from "react";
import { Mutation, Query } from "react-apollo";
import Counter2View from "./Counter2View";

interface IData {
  counter: number;
}
const GET_COUNTER = gql`
  {
    counter @client
  }
`;

const INCREMENT_COUNTER = gql`
  mutation {
    incrementCounter @client
  }
`;

const DECREMENT_COUNTER = gql`
  mutation {
    decrementCounter @client
  }
`;

class Counter2Query extends Query<IData, {}> {}

const Counter2 = () => (
  <Counter2Query query={GET_COUNTER}>
    {({ data: { counter = 0 } = {} }) => {
      return (
        <Mutation mutation={DECREMENT_COUNTER}>
          {(decrementCounter) => (
            <Mutation mutation={INCREMENT_COUNTER}>
              {(incrementCounter) => (
                <Counter2View
                  counter={counter}
                  decrementCounter={decrementCounter}
                  incrementCounter={incrementCounter}
                />
              )}
            </Mutation>
          )}
        </Mutation>
      );
    }}
  </Counter2Query>
);

export default Counter2;
