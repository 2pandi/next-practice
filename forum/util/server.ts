import { NextApiResponse } from "next";
import { ERROR_MESSAGE } from "../constants";

export const response200 = (res: NextApiResponse, body?: any) => {
  res.status(200).json(body || "done");
};

export const response400 = (res: NextApiResponse) => {
  res.status(400).json({ message: ERROR_MESSAGE.BAD_REQUEST });
};

export const response405 = (
  res: NextApiResponse,
  ...allowedMethod: string[]
) => {
  res
    .setHeader("Allow", allowedMethod.join(", "))
    .status(405)
    .json({ message: ERROR_MESSAGE.METHOD_NOT_ALLOWED });
};

export const response500 = (res: NextApiResponse, message?: string) => {
  res
    .status(500)
    .json({ message: message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
};
