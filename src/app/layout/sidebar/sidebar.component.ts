import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private _authService: AuthService) {}

  get user() {
    return this._authService.currentTokenUserValue;
  }

  ngOnInit(): void {}
}
