import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../model/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  //E no servico que serã feita as operações de crud com a api backend

  //Url da api Backend
 private url:string = "http://localhost:8099";

  //private url:any = fetch('http://localhost:8099', {mode: "no-cors"});;

  constructor(private http:HttpClient) {

   }

   //Método para selecionar clientes
   selecionar():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url)
   }
  
   //Método para cadastrar cliente
   cadastrar(obj:Cliente):Observable<Cliente[]>{
    return this.http.post<Cliente[]>(this.url, obj)//Séra um cadastramento do tipo post na api(url) o que séra passado um objeto que é cadastro dos dados do cliente
   }

   //Método para editar clientes
   /*editar(obj:Cliente):Observable<Cliente[]>{
    return this.http.put<Cliente[]>(this.url, obj)
   }*/

    //Método para editar clientes
    editar(obj:Cliente):Observable<Cliente[]>{
      const urlId = `${this.url}/${obj.codigo}`
      return this.http.put<Cliente[]>(urlId, obj);
    }


    //Método para remover clientes
    remover(codigo:number):Observable<void>{
      return this.http.delete<void>(this.url +'/'+codigo)
    }


   

}
