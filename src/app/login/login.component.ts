import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../services/alert.service'
import { AuthenticationService } from '../services/authentication.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }
    
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            MailID: ['', Validators.required],
            Password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
      //this.checkLogin();  
      this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        
        
    this.loading = true;
    this.authenticationService.login(this.f.MailID.value, this.f.Password.value)
      .pipe(first())
      .subscribe(
          data => {
              if (data) {
              this.alertService.success('Login successful', true);
              this.router.navigate([this.returnUrl]);
              } else {
                this.alertService.error("Failed to login!");
                this.loading = false;
              }
          });
          
        
    }
}
























/* ---------------------------------------------------------------------------
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Auth } from '../entities/Auth';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  auth = new Auth();
  errorMessage = "";

  constructor(private userService: EmployeeService) { }

  ngOnInit(): void {
  }

  get printAuth() {
    return JSON.stringify(this.auth);
  }

  changeName(event) {
    this.auth.name = event.target.value;
  }

  onSubmit() {
    this.userService.login(this.auth).subscribe(
      success => {
        if (success) {
          console.log("Login successful");
        } else {
          this.errorMessage="Zlý login alebo heslo";
          setTimeout(() => this.errorMessage ="", 3000);
        }
      },
      error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 0) {
            this.errorMessage = "Server je nedostupný";
          } else {
            if (error.status >= 400 && error.status < 500) {  
              this.errorMessage = error.error.errorMessage;
            } else {
              this.errorMessage = "chyba servera: " + error.message;
            }
          }
        } else {
          this.errorMessage = "Chyba programátora : " + JSON.stringify(error);
        }
        console.error("Chyba zo servera: ", error)
      } );
  }
}
*/