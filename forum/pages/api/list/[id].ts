import { DB } from "@/components/constants";
import {
  deleteOneDocument,
  updateOneDocument,
} from "@/components/util/database";
import { response405 } from "@/components/util/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.body._method) req.method = req.body._method;

  const id = Array.isArray(req.query) ? req.query[0] : req.query;

  switch (req.method) {
    case "PUT":
      const putData = req.body;
      await updateOneDocument(
        DB.APPLE_FORUM.NAME,
        DB.APPLE_FORUM.POST,
        id,
        putData
      );
      res.redirect(302, "/list");
      break;

    case "DELETE":
      await deleteOneDocument(DB.APPLE_FORUM.NAME, DB.APPLE_FORUM.POST, id);
      res.redirect(302, "/list");

    default:
      response405(res, "PUT", "DELETE");
      break;
  }
}
