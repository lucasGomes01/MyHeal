import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
  
})

export class ProdutoPage implements OnInit {

  public produto: any = [
    {titulo: "Band-aid", 
    preco: 5.99, 
    img1: '1.jpg',
    img2: '1.jpg',
    img3: '1.jpg',
    img4: ' ',
    descricao: "Keep close to Nature's heart... and break clear away, once in awhile, and climb a mountain or spend a week in the woods. Wash your spirit clean."}
  ];

  constructor() {}

  ngOnInit() {}

}
