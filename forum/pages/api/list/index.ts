import { DB } from "@/components/constants";
import { I_postListItem } from "@/components/interface";
import { getDB, getDBResultToArray } from "@/components/util/database";
import { response400, response405 } from "@/components/util/server";
import { isObjectWithEmptyString } from "@/components/util/validate";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.body._method) req.method = req.body._method;

  switch (req.method) {
    case "POST":
      const postData = req.body;

      if (isObjectWithEmptyString(postData)) return response400(res);

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
