import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ZipkinApiService} from '../../service/zipkin-api.service';
import {Trace} from '../../model/Trace';
import {Span} from '../../model/Span';
import {getServiceName,
  traceSummary} from '../../util/traceSummary';
import {traceToMustache} from '../../util/traceToMustache';

@Component({
  selector: 'app-trace',
  templateUrl: './trace.component.html',
  styleUrls: ['./trace.component.css']
})
export class TraceComponent implements OnInit {

  duration: string;
  totalSpans: number;
  services = '';
  traceid: string;
  depth: number;
  trace: Trace;
  serviceNames: Array<string> = [];
  chartElements: Chartelement[] = [];

  constructor(private route: ActivatedRoute, private zipkinApi: ZipkinApiService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.traceid = params['id'];
      this.getTrace();
    });
  }

  private getTrace() {

    this.zipkinApi.getTrace(this.traceid).then(
      value => {
        this.extractData(value);
      }
    ).catch(reason => {
      console.log(reason);

    });

  }

  private extractData(spans: Array<Span>) {

    let traceMustache = traceToMustache(spans);
    let traceSumamry = traceSummary(spans);
    console.log(traceToMustache(spans));
    console.log(traceSummary(spans));
    this.totalSpans = traceMustache.totalSpans;
    this.duration = traceMustache.duration;
    this.depth = traceMustache.depth;
    this.services = traceMustache.serviceCounts.length;
    traceMustache.serviceCounts.forEach(value => {
      this.serviceNames.unshift(value.name + ' x' + value.count);
    });
    traceMustache.spans.forEach(value => {
      let element = new Chartelement();
      element.serviceName = value.serviceName;
      element.aVal1 = (((traceSumamry.duration / 1000) * value.left) / 100);
      element.aVal2 = (element.aVal1 + (((traceSumamry.duration / 1000) * value.width) / 100));
      element.duration = value.durationStr;
      this.chartElements.push(element);
    });
    this.chartElements.reverse();
  }



}

export class Chartelement {
  serviceName: string;
  aVal1: number;
  aVal2: number;
  duration: string;
}
