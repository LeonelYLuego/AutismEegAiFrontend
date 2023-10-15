import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { User } from '@users/models/user.interface';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    this.user = await this.authService.logged();
  }

  logOut() {
    localStorage.clear();
    window.location.reload();
  }
}
