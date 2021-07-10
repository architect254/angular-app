import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AuthService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe = new EventEmitter();
  constructor(private _authService: AuthService) {}

  ngOnInit(): void {}

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
  }
  logOut() {
    this._authService.logout();
  }
}
