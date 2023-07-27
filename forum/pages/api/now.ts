import { response200, response405 } from "@/components/util/server";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") return response200(res, new Date());
  return response405(res, "GET");
}
