import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private _auth: AuthService, private _router: Router, private _token: TokenStorageService) {}

  ngOnInit(): void {}

  onSubmit(): void {

    this._token
    .updateCnfEmail(this.email)
    this._router.navigate(['/'+this.email+'/dashboard']);
  }

  canSubmit(): boolean {
    return this.email.length > 0 && this.password.length > 0;
  }
}
