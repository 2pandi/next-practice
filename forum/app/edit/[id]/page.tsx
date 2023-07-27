import { PageProps } from "@/components/.next/types/app/edit/[id]/page";
import { DB } from "@/components/constants";
import { findOneDocument } from "@/components/util/database";
import { ObjectId } from "mongodb";

export default async function Edit({ params }: PageProps) {
  const result = await findOneDocument(
    DB.APPLE_FORUM.NAME,
    DB.APPLE_FORUM.POST,
    {
      _id: new ObjectId(params.id),
    }
  );

  return (
    <div className="p-20">
      <h4>글수정</h4>
      <form action={`/api/list/${params.id}`} method="POST">
        <input type="hidden" name="_method" value="PUT" />
        <input
          type="text"
          name="title"
          placeholder="글제목"
          defaultValue={result?.title}
        />
        <input
          type="text"
          name="content"
          placeholder="글내용"
          defaultValue={result?.content}
        />
        <button type="submit">수정</button>
      </form>
    </div>
  );
}
