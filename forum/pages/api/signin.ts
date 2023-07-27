import { DB } from "@/components/constants";
import { findOneDocument, insertOneDocument } from "@/components/util/database";
import {
  response200,
  response400,
  response405,
  response500,
} from "@/components/util/server";
import { isObjectWithEmptyString } from "@/components/util/validate";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const formData = req.body;
    if (isObjectWithEmptyString(formData)) return response400(res);
    if (
      await findOneDocument(DB.APPLE_FORUM.NAME, DB.APPLE_FORUM.USER, {
        userId: formData.userId,
      })
    )
      return response500(res, "The ID already exists");
    await insertOneDocument(DB.APPLE_FORUM.NAME, DB.APPLE_FORUM.USER, formData);
    return response200(res, "회원가입 완료");
  }

  response405(res, "POST");
}

/** 회원가입 기능
 * 1. 빈 값이 포함된 경우 탈락
 * 2. 이미 가입된 아이디라면 탈락
 *
 * 통과시 데이터베이스 저장
 */
