import gql from "graphql-tag";
import * as React from "react";
import { Mutation } from "react-apollo";

interface IIncrementViewProps {
  onIncrement(): void;
}

const IncrementView = ({ onIncrement }: IIncrementViewProps) => (
  <button onClick={onIncrement}>+</button>
);

const INCREMENT_COUNTER = gql`
  mutation {
    incrementCounter @client
  }
`;

const Increment = () => (
  <Mutation mutation={INCREMENT_COUNTER}>
    {(incrementCounter: any) => (
      <IncrementView onIncrement={incrementCounter} />
    )}
  </Mutation>
);

export default Increment;
