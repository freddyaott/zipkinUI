import {Component, HostListener, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ZipkinApiService} from '../../service/zipkin-api.service';
import {TraceUI} from '../../model/TraceUI';
import {Trace} from '../../model/Trace';
import {RequestTrace} from '../../model/RequestTrace';
import {traceSummariesToMustache, traceSummary} from '../../util/traceSummary';
import {HelpDialogComponent} from '../help-dialog/help-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  navIsFixed: boolean;
  formRoot: FormGroup;
  servNames: Array<string> = [];
  spanNames: Array<string> = [];
  sortNames: Array<string> = [];
  sortValue: Map<string, string>;
  traces: Array<any>;
  traceui: Array<TraceUI>;
  searchTrace = null;

  constructor(public zipkinApi: ZipkinApiService, public dialog: MatDialog) { }

  ngOnInit() {

    this.searchTrace = null;

    this.formRoot = new FormGroup({
      serviceName: new FormControl(),
      spanName: new FormControl(),
      startDate: new FormControl(),
      startTime: new FormControl(),
      endDate: new FormControl(),
      endTime: new FormControl(),
      duration: new FormControl(),
      limit: new FormControl(),
      sort: new FormControl()
    });


    this.formRoot.get('serviceName').patchValue('all');
    this.formRoot.get('startDate').patchValue(new Date());
    this.formRoot.get('endDate').patchValue(new Date());
    this.formRoot.get('startTime').patchValue(new Date());
    this.formRoot.get('endTime').patchValue(new Date());
    this.getServices();
    this.sortValue = new Map<string, string>([
      ['Longest First', 'duration-desc'],
      ['Shortest First', 'duration-asc'],
      ['Newest First', 'timestamp-desc'],
      ['Oldest First', 'timestamp-asc'],
      ['Service Percentage: Longest First', 'service-percentage-desc'],
      ['Service Percentage: Shortest First', 'service-percentage-asc'],
    ]);
    this.sortNames = Array.from(this.sortValue.keys());
    this.formRoot.get('sort').patchValue('Longest First');

  }

  private getServices() {
    this.zipkinApi.getServices().then(
      data => {
        this.servNames = data;
        this.servNames.sort((a, b) => a.localeCompare(b));
        this.servNames.unshift('all');
      }
    ).catch( reason => {
      console.log(reason);
    });
  }


  public submit() {
    let reealReq = new RequestTrace();

    reealReq.sort = this.sortValue.get(this.formRoot.get('sort').value);
    reealReq.serviceName = this.formRoot.get('serviceName').value;
    reealReq.spanName = this.formRoot.get('spanName').value;
    reealReq.limit = this.formRoot.get('limit').value;
    reealReq.duration = this.formRoot.get('duration').value;

    this.zipkinApi.getTraces(JSON.stringify(reealReq)).then(
      data => {
        this.traces = data;
        this.extractTraceData();
      }
    ).catch();

  }

  private extractTraceData() {
    this.traceui = [];
    let now = new Date().getTime() * 1000;

    let tracce = traceSummariesToMustache(this.formRoot.get('serviceName').value, this.traces.map(traceSummary));
    console.log(tracce);

    tracce.forEach(value => {
      console.log(value);
      let traceui: TraceUI = new TraceUI();
      traceui.traceId = value.traceId;
      traceui.spansNum = value.totalSpans;
      traceui.duration = value.durationStr;
      traceui.timestamp = value.timestamp;
      traceui.percentage = value.servicePercentage;
      traceui.spans = value.serviceDurations;
      traceui.hour = (((((now - traceui.timestamp) / 1000) / 60) / 60) / 1000).toFixed(0);
      if (value.infoClass && value.infoClass !== '') {
        traceui.error = true;
      } else {
        traceui.error = false;

      }

      this.traceui.push(traceui);
    });

    this.traceui.reverse();
  }


  public onChangeServiceName(serviceName: string) {
    this.traceui = [];
    this.zipkinApi.getSpans(serviceName)
      .then(data => {
        this.spanNames = data;
        this.spanNames.sort((a, b) => a.localeCompare(b));
        this.spanNames.unshift('all');
        this.formRoot.get('spanName').patchValue('all');
      })
      .catch( reason => console.log(reason));
  }


  openDialog() {
    let dialogRef = this.dialog.open(HelpDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.navIsFixed = true;
    } else if (this.navIsFixed && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.navIsFixed = false; }
  }

  scrollToTop() {
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }

}
