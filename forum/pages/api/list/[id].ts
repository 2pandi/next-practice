import { DB } from "@/components/constants";
import {
  deleteOneDocument,
  findOneDocument,
  updateOneDocument,
} from "@/components/util/database";
import {
  response200,
  response400,
  response401,
  response405,
} from "@/components/util/server";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

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
      return res.redirect(302, "/list");

    case "DELETE":
      const session = await getServerSession(req, res, authOptions);

      if (!session || !session.user || !session.user.email)
        return response401(res);

      const doc = await findOneDocument(
        DB.APPLE_FORUM.NAME,
        DB.APPLE_FORUM.POST,
        {
          _id: new ObjectId(id),
        }
      );

      if (doc?.author !== session?.user?.email) return response401(res);

      const result = await deleteOneDocument(
        DB.APPLE_FORUM.NAME,
        DB.APPLE_FORUM.POST,
        id
      );

      if (result.deletedCount < 1) return response400(res);

      return response200(res, "삭제완");

    default:
      return response405(res, "PUT", "DELETE");
  }
}
