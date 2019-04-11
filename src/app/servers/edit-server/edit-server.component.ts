import {Component, Input, OnInit} from '@angular/core';
import {ServersService} from '../servers.service';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {CanComponentDeactivate} from './can-deactivate-guard.service';
// @ts-ignore
import {Observable} from 'rxjs/Observable';
import {Server} from "../server/server-resolver.service";


@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  @Input() server: { id: number, name: string, status: string };
  @Input() serverName: string;
  @Input() serverStatus: string;
  allowEdit = false;
  changesSaved: boolean = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['server'];
        this.serverName = this.server.name;
        this.serverStatus = this.server.status;
      }
    );
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.allowEdit = params['allowEdit'] === '1' ? true : false;
      }
    );
   /* const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
    this.route.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id']);
      }
    );*/
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.changesSaved) {
      return true;
    }
    if ((this.serverName !== this.server.name || this.server.status !== this.serverStatus) && !this.changesSaved) {
      return confirm('Would you like to discard the changes!');
    }
    return true;
  }


}
