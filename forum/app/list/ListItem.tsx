"use client";

import { I_postListItem } from "@/components/interface";
import { ObjectId } from "mongodb";
import Link from "next/link";

export default function ListItem({ result }: { result: I_postListItem[] }) {
  const deleteClickHandler = (id: ObjectId) => {
    fetch(`/api/list/${id}`, {
      method: "DELETE",
    });
  };

  return (
    <>
      {result.map((e) => (
        <div className="list-item" key={e._id.toString()}>
          <Link href={`/detail/${e._id}`}>
            <h4>{e.title}</h4>
          </Link>
          <Link href={`/edit/${e._id}`}>✏️</Link>
          <div onClick={() => deleteClickHandler(e._id)}>🗑️</div>
          {/* <DetailLink postId={e._id.toString()} /> */}
          <p>{"1월 1일"}</p>
        </div>
      ))}
    </>
  );
}

/** 서버 데이터를 server component에서 받아오는 것이 좋은 이유
 * client component에 작성된 코드는 외부에 노출될 수 있으므로
 * DB와 직접 통신하는 코드는 작성하면 안된다.
 * 따라서 client component에서 DB 데이터를 요청하려면
 * 서버를 거쳐서 요청해야 한다. (useEffect 사용)
 *
 * 근데 이 때 페이지 로드시 유저는 텅 빈 html을 먼저 보게 되고
 * 시간이 지나야 내용이 채워진 html을 볼 수 있음.
 * (useEffect 내부의 코드는 html이 다 로드된 이후에 실행됨)
 *
 *  -> 검색엔진 봇에게 페이지 수집이 제대로 이루어지지 않아
 * SEO에 불리하게 작용함.
 *
 * 따라서 검색 노출이 중요한 페이지의 경우 server component에서 받아오는 것이 좋다.
 *
 * client component의 사용이 필요한 경우
 * 부모 server component에서 DB데이터를 받은 다음
 * client component에서 내려받아 사용한다.
 *  -> client component도 DB 데이터를 미리 채워 보여줄 수 있음
 */
