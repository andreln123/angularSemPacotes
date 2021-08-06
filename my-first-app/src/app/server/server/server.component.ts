import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})

export class ServerComponent implements OnInit {
  serverId: number = 10;
  serverStatus: string = 'offline';
  permitirNovoServidor: boolean = false;
  serverCreationStatus: string = 'Nenhum servidor foi criado.';
  nameServer: string = 'Bidirecional ...' ;
  nomeServidor:string = '';
  servidorCriado:boolean = false;
  lista = [{nome: 'André Luis Hirschmann'},
           {nome: 'João da Silva Pinto'},
           {nome: 'Vanessa Borges'}];

  getServerStatus() {
    return this.serverStatus;
  }

  inserirItem() {
    this.lista.push({nome: 'Novo nome'});
  }

  definirClasse() {
    return this.servidorCriado ? 'form-control;' : 'btn-primary;';
  }

  getColor() {
    return this.servidorCriado ? 'red' : 'blue';
  }

  criarServidor() {
    this.serverCreationStatus = 'Servidor foi criado';
    this.servidorCriado = true;
  }

  atualizarServidor(evento: Event) {
    this.nameServer   = (<HTMLInputElement>evento.target).value;
  }

  constructor() { 
    setTimeout(() => {
      this.permitirNovoServidor = true;
    }, 2000);
  }

  ngOnInit(): void {
  }

}
