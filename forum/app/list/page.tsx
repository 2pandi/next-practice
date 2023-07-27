import { DB } from "@/components/constants";
import { I_postListItem } from "@/components/interface";
import { getDBResultToArray } from "@/components/util/database";
import Link from "next/link";
import ListItem from "./ListItem";

export default async function List() {
  const result = (await getDBResultToArray(
    DB.APPLE_FORUM.NAME,
    DB.APPLE_FORUM.POST
  )) as I_postListItem[];

  return (
    <div className="list-bg">
      <Link href="/write">
        <button>글쓰기</button>
      </Link>
      <ListItem result={result} />
    </div>
  );
}
