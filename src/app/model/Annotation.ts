
class Annotation {

  private _timestamp: number;
  private _value: string;
  private _endpoint: Endpoint;


  get endpoint(): Endpoint {
    return this._endpoint;
  }

  set endpoint(value: Endpoint) {
    this._endpoint = value;
  }

  get timestamp(): number {
    return this._timestamp;
  }

  set timestamp(value: number) {
    this._timestamp = value;
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }
}
