import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";

interface IData {
  counter: number;
}

const CounterView = ({ counter }: IData) => <div>{counter}</div>;

const GET_COUNTER = gql`
  {
    counter @client
  }
`;

class CounterQuery extends Query<IData, {}> {}

const Counter = () => (
  <CounterQuery query={GET_COUNTER}>
    {({ data: { counter = 0 } = {} }) => <CounterView counter={counter} />}
  </CounterQuery>
);

export default Counter;
