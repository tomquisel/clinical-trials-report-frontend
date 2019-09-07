import gql from "graphql-tag";

const query = gql`
  {
    counter @client
  }
`;

const query2 = gql`
  {
    counter2 @client
  }
`;

export default {
  Mutation: {
    decrementCounter: (_: any, params: any, { cache }: any) => {
      const { counter }: { counter: number } = cache.readQuery({ query });
      const nextCounter = counter - 1;
      const data = {
        counter: nextCounter,
      };
      cache.writeData({ data });
      return nextCounter;
    },

    decrementCounter2: (_: any, params: any, { cache }: any) => {
      const amount =
        params !== null && params.amount !== undefined
          ? (params.amount as number)
          : 1;
      const { counter2 }: { counter2: number } = cache.readQuery({
        query: query2,
      });
      const nextCounter = counter2 - amount;
      const data = {
        counter2: nextCounter,
      };
      cache.writeData({ data });
      return nextCounter;
    },

    incrementCounter: (_: any, params: any, { cache }: any) => {
      const { counter }: { counter: number } = cache.readQuery({ query });
      const nextCounter = counter + 1;
      const data = {
        counter: nextCounter,
      };
      cache.writeData({ data });
      return nextCounter;
    },

    incrementCounter2: (_: any, params: any, { cache }: any) => {
      const amount =
        params !== null && params.amount !== undefined
          ? (params.amount as number)
          : 1;
      const { counter2 }: { counter2: number } = cache.readQuery({
        query: query2,
      });
      const nextCounter = counter2 + amount;
      const data = {
        counter2: nextCounter,
      };
      cache.writeData({ data });
      return nextCounter;
    },
  },
};
