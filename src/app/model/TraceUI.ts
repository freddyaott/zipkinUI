import {Span} from './Span';


export class TraceUI {

   duration: string;
   spansNum: number;
   serviceName: string;
   timestamp: number;
   traceId: string;
   spans: Array<any>;
   hour: string;
   percentage: number;
   error: boolean;

   constructor () {
     this.spans = [];
   }
}
