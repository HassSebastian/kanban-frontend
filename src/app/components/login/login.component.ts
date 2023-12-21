import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    try {
      let resp = await this.authService.loginWithUsernameAndPassword(
        this.username,
        this.password
      );
      this.router.navigateByUrl('board');
    } catch (error: any) {
      if (error.status === 0) {
        alert('Das Backend ist gerade nicht erreichbar');
      } else {
        alert('login fehlgeschlagen');
        console.error('Fehler =', error);
      }
    }
  }
}
