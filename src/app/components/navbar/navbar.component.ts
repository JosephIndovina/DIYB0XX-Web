import { Component, OnInit, Input } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private sidenavService: SidenavService) { }
  ngOnInit() {}

  toggleSidenav() {
    this.sidenavService.toggle();
  }
}
