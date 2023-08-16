import { DB } from "@/components/constants";
import { I_postListItem } from "@/components/interface";
import { getDB, getDBResultToArray } from "@/components/util/database";
import {
  response400,
  response401,
  response405,
} from "@/components/util/server";
import { isObjectWithEmptyString } from "@/components/util/validate";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.body._method) req.method = req.body._method;

  switch (req.method) {
    case "POST":
      const postData = req.body;

      // 글 내용이 없는 경우
      if (isObjectWithEmptyString(postData)) return response400(res);

      const session = await getServerSession(req, res, authOptions);

      // 로그인 세션 정보가 없는 경우
      if (!session || !session.user) return response401(res);

      postData.author = session.user.email;

      await (await getDB(DB.APPLE_FORUM.NAME))
        .collection(DB.APPLE_FORUM.POST)
        .insertOne(postData);
      res.redirect(302, "/list");
      break;

    case "GET":
      const result = (await getDBResultToArray(
        DB.APPLE_FORUM.NAME,
        DB.APPLE_FORUM.POST
      )) as I_postListItem[];
      res.status(200).json(result);
      break;

    default:
      response405(res, "GET", "POST");
      break;
  }
}

/** console.log(session) 출력 값

{
  user: {
    name: '2pandi',
    email: 'coder.2pandi@gmail.com',
    image: 'https://avatars.githubusercontent.com/u/99231626?v=4'
  },
  expires: '2023-09-10T06:59:22.697Z'
}

*/
