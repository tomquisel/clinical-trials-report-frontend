import gql from "graphql-tag";
import React from "react";
import { Mutation, useQuery } from "react-apollo";
import Counter2View from "./Counter2View";

const AMOUNT = 5;
interface ICounter {
  counter2?: number;
}
const GET_COUNTER = gql`
  {
    counter2 @client
  }
`;

const INCREMENT_COUNTER = gql`
  mutation IncrementCounter2By($amount: Int) {
    incrementCounter2(amount: $amount) @client
  }
`;

const DECREMENT_COUNTER = gql`
  mutation DecrementCounter2By($amount: Int) {
    decrementCounter2(amount: $amount) @client
  }
`;

const Counter2 = () => {
  const { data, loading, error } = useQuery<ICounter>(GET_COUNTER);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>ERROR</p>;
  }
  if (!data) {
    return <p>No data</p>;
  }
  return (
    <Mutation mutation={DECREMENT_COUNTER} variables={{ amount: AMOUNT }}>
      {(decrementCounter: any) => (
        <Mutation mutation={INCREMENT_COUNTER} variables={{ amount: AMOUNT }}>
          {(incrementCounter: any) => (
            <Counter2View
              counter={data.counter2 || 0}
              decrementCounter={decrementCounter}
              incrementCounter={incrementCounter}
            />
          )}
        </Mutation>
      )}
    </Mutation>
  );
};

export default Counter2;
