export const DB = {
  APPLE_FORUM: { NAME: "apple-forum", POST: "post", USER: "user" },
} as const;

export const ERROR_MESSAGE = {
  OBJECT_ID_ARGUMENT_TYPE:
    "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer",
  METHOD_NOT_ALLOWED: "Message Not Allowed",
  BAD_REQUEST: "Bad Request",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
} as const;
