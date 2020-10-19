import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public listaProdutos: any = [
    {nome: "Remédio Narix", preco: 5.99, img: 'rem1.png'},
    {nome: "Remédio Narix", preco: 5.99, img: 'rem1.png'},
    {nome: "Remédio Narix", preco: 5.99, img: 'rem1.png'},
    {nome: "Remédio Narix", preco: 5.99, img: 'rem1.png'},
    {nome: "Remédio Narix", preco: 5.99, img: 'rem1.png'}
  ];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
