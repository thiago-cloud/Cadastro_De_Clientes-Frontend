import { Component } from '@angular/core';
import { Cliente } from '../model/Cliente';
import { ClienteService } from '../servico/cliente.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  //Objeto Cliente(armazena os dados do ngModel)
  cliente = new Cliente();

  //Variável de visibilidade dos botões
  btnPrincipal:boolean = true;

  //Variável de visibilidade da tabela
  tabela:boolean = true;

  //Json para armazenamento de clientes
  clientes:Cliente[] = [];
  

  //Constructor
  constructor(private servico:ClienteService){
    
  }

  //Porém e necessario um contructo para termos acesso ao nosso cliente.service
  //Método de seleção
  selecionar():void{
    this.servico.selecionar()
    .subscribe(retorno => this.clientes = retorno)//O retorno significa que ira retornar uma lista de clientes que será os cliente que receberam o retorno
  }

  //Método de Cadastro
  cadastrar():void{
  this.servico.cadastrar(this.cliente)
  .subscribe(retorno => { 
    //Cadastrar cliente no vetor
    this.clientes.push();

    //Limpar formulário
    this.cliente = new Cliente()

    //Mensagem
    alert('Cliente cadastrado com sucesso!')
   
  } );
}


//Método para editar clientes
/*editar():void{
  this.servico.editar(this.cliente)
  .subscribe(retorno => {
    
    //Obter posição onde estar o cliente no vetor
    let posicao = this.clientes.findIndex(obj => {
      return retorno.codigo == obj.codigo;//Lembrando que o nosso retorno e o nosso objeto e o obj também
    })

   //Altera os dados do cliente no vetor
    this.clientes[posicao] = retorno;

    //Limpar formulário
    this.cliente = new Cliente()

    //Visibilidade dos botões
    this.btnPrincipal = true;

    //Visibilidade da tablea
    this.tabela = true;

    //Mensagem
    alert('Cliente alterado com sucesso!')
  })
}*/

//Método para remover clientes
remover():void{
  this.servico.remover(this.cliente.codigo)
  .subscribe(retorno => {
    //Obter posição do vetor onde está cliente
    let posicao = this.clientes.findIndex(obj => {
      return obj.codigo == this.cliente.codigo;
    });

    //Remover cliente do vetor
    this.clientes.splice(posicao, 1);

    //Limpar formulário
    this.cliente = new Cliente();

    //Visibilidade dos botões
    this.btnPrincipal = true;

    //Visibilidade da tablea
    this.tabela = true;

    //Mensagem
    alert("Registro removido com sucesso!")

  })
}

//Método para selecionar cliente
selecionarCliente(posicao:number):void{

  //Selecionar cliente
  this.cliente = this.clientes[posicao]

  //Visibilidades dos botões
  this.btnPrincipal = false

  //Visibilidade da tabela
  this.tabela = false

}

//Método para cancelar
cancelar():void{

  //Limpar formulário
  this.cliente = new Cliente();

  //Visibilidade dos botões
  this.btnPrincipal = true;

  //Visibilidade da tabela
  this.tabela = true
}

  //Esse método serve para garantir que quando o componente for criado o que estiver dentro dele será inicializado com prioridade
  ngOnInit(){
    this.selecionar()
  }



}
