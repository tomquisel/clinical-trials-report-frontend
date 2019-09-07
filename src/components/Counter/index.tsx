import gql from "graphql-tag";
import React from "react";
import { useQuery } from "react-apollo";

interface ICounter {
  counter: number;
}

const GET_COUNTER = gql`
  {
    counter @client
  }
`;

const Counter = () => {
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

  return <div>{data.counter}</div>;
};

export default Counter;
