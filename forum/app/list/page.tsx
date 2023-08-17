import { DB } from "@/components/constants";
import { I_postListItem } from "@/components/interface";
import { getDBResultToArray } from "@/components/util/database";
import Link from "next/link";
import ListItem from "./ListItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/pages/api/auth/[...nextauth]";

// 이 페이지를 dynamic rendering으로 나타내라
export const dynamic = "force-dynamic";
// static rendering 으로 하려면 "force-static"으로 설정하면 됨.

export default async function List() {
  const result = (await getDBResultToArray(
    DB.APPLE_FORUM.NAME,
    DB.APPLE_FORUM.POST
  )) as I_postListItem[];

  const session = await getServerSession(authOptions);

  return (
    <div className="list-bg">
      {session && (
        <Link href="/write">
          <button>글쓰기</button>
        </Link>
      )}
      <ListItem result={result} />
    </div>
  );
}
