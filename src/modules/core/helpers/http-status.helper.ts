import { HTTP_STATUS_CODES } from '../constants';

export default class HttpStatus {
  public static OK = new HttpStatus(HTTP_STATUS_CODES['200'], HTTP_STATUS_CODES.OK);
  public static ACCEPTED = new HttpStatus(HTTP_STATUS_CODES['202'], HTTP_STATUS_CODES.ACCEPTED);
  public static CREATED = new HttpStatus(HTTP_STATUS_CODES['201'], HTTP_STATUS_CODES.CREATED);
  public static BAD_REQUEST = new HttpStatus(HTTP_STATUS_CODES['400'], HTTP_STATUS_CODES.BAD_REQUEST);
  public static NOT_FOUND = new HttpStatus(HTTP_STATUS_CODES['404'], HTTP_STATUS_CODES.NOT_FOUND);
  public static UNAUTHORIZED = new HttpStatus(HTTP_STATUS_CODES['401'], HTTP_STATUS_CODES.NOT_AUTHENTICATED);
  public static CONFLICT = new HttpStatus(HTTP_STATUS_CODES['409'], HTTP_STATUS_CODES.CONFLICT);
  public static FORBIDDEN = new HttpStatus(HTTP_STATUS_CODES['403'], HTTP_STATUS_CODES.FORBIDDEN);
  public static INTERNAL_SERVER_ERROR = new HttpStatus(
    HTTP_STATUS_CODES['500'],
    HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
  );
  private readonly _value: string;
  private readonly _code: number;

  constructor(value: string, code: number) {
    this._value = value;
    this._code = code;
  }

  get value(): string {
    return this._value;
  }

  get code(): number {
    return this._code;
  }
}
