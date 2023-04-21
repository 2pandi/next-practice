"use client";

import Image from "next/image";
import { useState } from "react";

const List = () => {
  const 상품 = ["Tomato", "Pasta", "Coconut"];
  const [수량, 수량변경] = useState([0, 0, 0]);

  return (
    <div>
      <h4 className="title">상품목록</h4>
      {상품.map((item, idx) => (
        <div className="food" key={idx}>
          <Image
            className="food-img"
            src={`/food${idx}.png`}
            alt={item}
            width={500}
            height={500}
          />
          <h4>{item} $40</h4>
          <button
            onClick={() => {
              수량변경((pre) => {
                const copy = [...pre];
                copy[idx]--;
                return copy;
              });
            }}
          >
            -
          </button>
          <span>{수량[idx]}</span>
          <button
            onClick={() => {
              수량변경((pre) => {
                const copy = [...pre];
                copy[idx]++;
                return copy;
              });
            }}
          >
            +
          </button>
        </div>
      ))}
    </div>
  );
};

export default List;
