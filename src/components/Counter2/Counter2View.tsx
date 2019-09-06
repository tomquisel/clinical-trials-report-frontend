import * as React from "react";

interface ICounter2ViewProps {
  counter: number;
  decrementCounter(): void;
  incrementCounter(): void;
}

const Counter2View = ({
  counter,
  decrementCounter,
  incrementCounter,
}: ICounter2ViewProps) => (
  <div>
    <div>{counter}</div>
    <button onClick={decrementCounter}>-</button>
    <button onClick={incrementCounter}>+</button>
  </div>
);

export default Counter2View;
