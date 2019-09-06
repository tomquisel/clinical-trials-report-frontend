import * as React from "react";

interface ICounter3ViewProps {
  counter: number;
  decrementCounter(): void;
  incrementCounter(): void;
}

const Counter3View = ({
  counter,
  decrementCounter,
  incrementCounter,
}: ICounter3ViewProps) => (
  <div>
    <div>{counter}</div>
    <button onClick={decrementCounter}>-</button>
    <button onClick={incrementCounter}>+</button>
  </div>
);

export default Counter3View;
