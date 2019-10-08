import { Component } from '@angular/core';


@Component({
    selector: 'app-server',
    templateUrl: './server.component.html'
}) 


export class ServerComponent {
    serverId: number = 10;
    serverStatus: string = 'Off Line';    

    getServerStatus() {
        return this.serverStatus;
    }

}