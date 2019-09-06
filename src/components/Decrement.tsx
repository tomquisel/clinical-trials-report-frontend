import gql from "graphql-tag";
import * as React from "react";
import { Mutation } from "react-apollo";

interface IDecrementViewProps {
  onDecrement(): void;
}

const DecrementView = ({ onDecrement }: IDecrementViewProps) => (
  <button onClick={onDecrement}>-</button>
);

const DECREMENT_COUNTER = gql`
  mutation {
    decrementCounter @client
  }
`;

const Decrement = () => (
  <Mutation mutation={DECREMENT_COUNTER}>
    {(decrementCounter: any) => (
      <DecrementView onDecrement={decrementCounter} />
    )}
  </Mutation>
);

export default Decrement;
