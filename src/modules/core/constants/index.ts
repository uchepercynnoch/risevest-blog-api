export enum LOG_LEVEL_COLOR {
  silly = 'rainbow',
  verbose = 'cyan',
  info = 'green',
  data = 'grey',
  warn = 'yellow',
  debug = 'blue',
  error = 'red',
}

export enum HTTP_STATUS_CODES {
  OK = 200,
  ACCEPTED = 202,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_AUTHENTICATED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}
