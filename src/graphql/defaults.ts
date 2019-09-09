export default {
  counter: 0,
  counter2: 0,
  institutions: [
    {
      __typename: "Institution",
      name: "AbbVie",
      trials: 10,
      ontime: 30,
      late: 40,
      missing: 30,
    },
    {
      __typename: "Institution",
      name: "Mount Sinai Medical Center",
      trials: 30,
      ontime: 60,
      late: 20,
      missing: 20,
    },
  ],
};
