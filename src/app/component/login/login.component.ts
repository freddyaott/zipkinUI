import { Component, OnInit } from '@angular/core';
import {ZipkinApiService} from '../../service/zipkin-api.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formRoot: FormGroup;
  errorMessage: string;

  constructor(public zipkinApi: ZipkinApiService, public router: Router) { }

  ngOnInit() {
    this.formRoot = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }


  public submit() {
    this.zipkinApi.login(
      this.formRoot.get('username').value,
      this.formRoot.get('password').value
    ).then(value => {
        this.router.navigate(['/home']);
      }
    ).catch(reason => {
      this.showError();
    });
  }

  private showError() {
    this.errorMessage = 'INVALID CREDENTIALS';
  }

}
