
class Endpoint {
   private _serviceName: string;
   private _ipv4: string;
   private _ipv6: string;
   private _port: number;


  get serviceName(): string {
    return this._serviceName;
  }

  set serviceName(value: string) {
    this._serviceName = value;
  }

  get ipv4(): string {
    return this._ipv4;
  }

  set ipv4(value: string) {
    this._ipv4 = value;
  }

  get ipv6(): string {
    return this._ipv6;
  }

  set ipv6(value: string) {
    this._ipv6 = value;
  }

  get port(): number {
    return this._port;
  }

  set port(value: number) {
    this._port = value;
  }
}
