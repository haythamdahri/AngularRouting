import {Component, Input, OnInit} from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id']; // id is a string and we convert it to a number using + symbol
    this.server = this.serversService.getServer(id);
    this.route.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id']);
      }
    );
  }

  onNextServer() {
    // We are not using {relativeTo: this.route} because we need to change the passed param <<id>> from the root
    // /servers/this.server.id
    this.router.navigate(['/servers', this.server.id+1]);
  }

  editServer() {
    // To preserve parameters sent from the parent component(Servers), we will add <<queryParamsHandling>> to handle this |
    // 'preserve' to keep params
    // 'merge' to override params
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve', preserveFragment: 'preserve'});
  }

}
