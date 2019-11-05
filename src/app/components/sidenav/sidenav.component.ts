import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/utils/global-constants';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  discordUrl = GlobalConstants.DISCORD_URL;
  githubUrl = GlobalConstants.GITHUB_URL;
  constructor() { }

  ngOnInit() {}
}
