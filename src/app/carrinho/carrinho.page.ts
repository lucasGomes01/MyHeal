import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {

  nCompras : number;

  public listaPedidos : any = [
    {id: 1, nome: "Remédio Narix", preco: 5.99, qtde: 1, img: 'rem1.png'},
    {id: 1, nome: "Remédio Narix", preco: 5.99, qtde: 1, img: 'rem1.png'},
    {id: 1, nome: "Remédio Narix", preco: 5.99, qtde: 1, img: 'rem1.png'},
    {id: 1, nome: "Remédio Narix", preco: 5.99, qtde: 1, img: 'rem1.png'},
    {id: 1, nome: "Remédio Narix", preco: 5.99, qtde: 1, img: 'rem1.png'}
  ];

  constructor() {
    
}

  ngOnInit() {

    this.nCompras = Object.keys(this.listaPedidos).length;

  }
}
