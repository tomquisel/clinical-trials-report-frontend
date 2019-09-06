import gql from "graphql-tag";

const query = gql`
  {
    counter @client
  }
`;

const query3 = gql`
  {
    counter3 @client
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

    decrementCounter3: (_: any, params: any, { cache }: any) => {
      const amount =
        params !== null && params.amount !== undefined
          ? (params.amount as number)
          : 1;
      const { counter3 }: { counter3: number } = cache.readQuery({
        query: query3,
      });
      const nextCounter = counter3 - amount;
      const data = {
        counter3: nextCounter,
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

    incrementCounter3: (_: any, params: any, { cache }: any) => {
      const amount =
        params !== null && params.amount !== undefined
          ? (params.amount as number)
          : 1;
      const { counter3 }: { counter3: number } = cache.readQuery({
        query: query3,
      });
      const nextCounter = counter3 + amount;
      const data = {
        counter3: nextCounter,
      };
      cache.writeData({ data });
      return nextCounter;
    },
  },
};
