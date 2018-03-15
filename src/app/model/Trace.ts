
import {Span} from './Span';

export class Trace {
  private _spans: Array<Span>;

  get spans(): Array<Span> {
    return this._spans;
  }

  set spans(value: Array<Span>) {
    this._spans = value;
  }
}
