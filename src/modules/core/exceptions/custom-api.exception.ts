export default class CustomApiException extends Error {
  private readonly _code: number;

  constructor(message: string, code: number) {
    super(message);
    this._code = code;
  }

  get code(): number {
    return this._code;
  }

  public static response(message: string, code: number) {
    return new CustomApiException(message, code);
  }
}
