import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DropdownOption } from 'src/app/models/dropdow-option.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  isAuth: boolean = !!sessionStorage.getItem('token');
  dropdownOptions: Array<DropdownOption> = [
    new DropdownOption('Sign out', () =>
      this.auth.logOut().then(() => this.router.navigate(['auth']))
    ),
  ];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.onAuthChange.subscribe((isAuth) => (this.isAuth = isAuth));
  }
}
