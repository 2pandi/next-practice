"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Write() {
  const router = useRouter();

  const submitPostHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.target as HTMLFormElement);
    const formdataValues = [];

    for (let value of formdata.values()) {
      formdataValues.push(value);
    }

    const body = { title: formdataValues[0], content: formdataValues[1] };

    await fetch("/api/list", {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        router.push("/list");
      })
      .catch((e) => alert(e));
  };

  return (
    <div className="p-20">
      <h4>글작성</h4>
      {/* method는 POST와 GET만 가능.. PUT, DELETE 안됨 */}
      <form action="/api/list" method="POST" onSubmit={submitPostHandler}>
        <input
          type="text"
          // name은 formdata에서 value에 대한 키 값이 됨.
          name="title"
          placeholder="글제목"
        />
        <input type="text" name="content" placeholder="글내용" />
        <button type="submit">제출</button>
      </form>
    </div>
  );
}
