import gql from "graphql-tag";
import * as React from "react";
import { Mutation, Query } from "react-apollo";
import Counter3View from "./Counter3View";

const AMOUNT = 5;
interface IData {
  counter3?: number;
}
const GET_COUNTER = gql`
  {
    counter3 @client
  }
`;

const INCREMENT_COUNTER = gql`
  mutation IncrementCounter3By($amount: Int) {
    incrementCounter3(amount: $amount) @client
  }
`;

const DECREMENT_COUNTER = gql`
  mutation DecrementCounter3By($amount: Int) {
    decrementCounter3(amount: $amount) @client
  }
`;

class Counter3Query extends Query<IData, {}> {}

const Counter3 = () => (
  <Counter3Query query={GET_COUNTER}>
    {({ data: { counter3 = 0 } = {} }) => {
      return (
        <Mutation mutation={DECREMENT_COUNTER} variables={{ amount: AMOUNT }}>
          {(decrementCounter) => (
            <Mutation
              mutation={INCREMENT_COUNTER}
              variables={{ amount: AMOUNT }}
            >
              {(incrementCounter) => (
                <Counter3View
                  counter={counter3}
                  decrementCounter={decrementCounter}
                  incrementCounter={incrementCounter}
                />
              )}
            </Mutation>
          )}
        </Mutation>
      );
    }}
  </Counter3Query>
);

export default Counter3;
