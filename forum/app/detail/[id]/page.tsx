import { PageProps } from "@/components/.next/types/app/detail/[id]/page";
import { DB, ERROR_MESSAGE } from "@/components/constants";
import { I_postListItem } from "@/components/interface";
import { getDB } from "@/components/util/database";
import { ObjectId } from "mongodb";

export default async function Detail({ params }: PageProps) {
  const invalidPostId = <div>invalid post id</div>;
  try {
    // findOne 메서드 -> document 중에 파라미터 값과 일치하는 맨 첫번째 document 출력
    const result = (await (await getDB(DB.APPLE_FORUM.NAME))
      .collection(DB.APPLE_FORUM.POST)
      .findOne({ _id: new ObjectId(params.id) })) as I_postListItem;

    return result ? (
      <div>
        <h4>상세페이지</h4>
        <h4>{result.title}</h4>
        <p>{result.content}</p>
      </div>
    ) : (
      invalidPostId
    );
  } catch (e: any) {
    if (e.message === ERROR_MESSAGE.OBJECT_ID_ARGUMENT_TYPE) {
      return invalidPostId;
    }
    console.log(e);
  }
}
