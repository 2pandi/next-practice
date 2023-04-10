import { useState } from "react";

export default function Home() {
  const [count, setCounter] = useState(0);
  return (
    <div>
      <div>count: {count}</div>
      <button onClick={() => setCounter((pre) => pre + 1)}>+</button>
    </div>
  );
}
