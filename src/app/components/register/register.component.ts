import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  constructor(private router:Router, private authService:AuthService) {}

  async registerUser() {
    try {
      let resp = await this.authService.registrWithUsernameAndPassword(
        this.username,
        this.password
      );
      this.router.navigateByUrl('login')
    } catch (e) {
      alert('registrierung fehlgeschlagen')
      console.error(e);
    }

  }}
