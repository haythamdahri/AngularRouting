import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  private servers: {id: number, name: string, status: string}[] = [];

  selectedServer: {id: number, name: string, status: string} = {id: 0, name: '', status: ''};

  constructor(private serversService: ServersService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  selectServer(server: {id: number}) {
    this.selectedServer = this.serversService.getServer(server.id);
  }

  onRealod() {
    //this.router.navigate(['servers'], {relativeTo: this.route});
    this.router.navigate(['servers']);
  }
}
