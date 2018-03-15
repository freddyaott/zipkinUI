
export class Span {

  constructor () {}

  private _id: string;
  private _traceId: string;
  private _name: string;
  private _parentId: string;
  private _kind: string;
  private _timestamp: string;
  private _duration: number;
  private _debug: boolean;
  private _shared: boolean;
  private _localEndpoint: Endpoint;
  private _remoteEndpoint: Endpoint;
  private _tag: Tags;
  private _annotations: Array<Annotation>;


  get annotations(): Array<Annotation> {
    return this._annotations;
  }

  set annotations(value: Array<Annotation>) {
    this._annotations = value;
  }

  get tag(): Tags {
    return this._tag;
  }

  set tag(value: Tags) {
    this._tag = value;
  }

  get kind(): string {
    return this._kind;
  }

  set kind(value: string) {
    this._kind = value;
  }

  get timestamp(): string {
    return this._timestamp;
  }

  set timestamp(value: string) {
    this._timestamp = value;
  }

  get duration(): number {
    return this._duration;
  }

  set duration(value: number) {
    this._duration = value;
  }

  get debug(): boolean {
    return this._debug;
  }

  set debug(value: boolean) {
    this._debug = value;
  }

  get shared(): boolean {
    return this._shared;
  }

  set shared(value: boolean) {
    this._shared = value;
  }

  get localEndpoint(): Endpoint {
    return this._localEndpoint;
  }

  set localEndpoint(value: Endpoint) {
    this._localEndpoint = value;
  }

  get remoteEndpoint(): Endpoint {
    return this._remoteEndpoint;
  }

  set remoteEndpoint(value: Endpoint) {
    this._remoteEndpoint = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get parentId(): string {
    return this._parentId;
  }

  set parentId(value: string) {
    this._parentId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get traceId(): string {
    return this._traceId;
  }

  set traceId(value: string) {
    this._traceId = value;
  }
}
