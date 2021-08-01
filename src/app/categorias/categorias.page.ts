import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  public listaCategoria: any =[
    {nome:"Dor de Cabeça", cor:"rgb(53, 53, 250)", icone:"body-outline"},
    {nome:"Higiene pessoal", cor:"rgb(53, 171, 250)", icone:"thermometer-outline"},
    {nome:"Acne", cor:"rgb(53, 250, 207)", icone:"radio-button-on-outline"},
    {nome:"Cicatrizantes", cor:"rgb(53, 250, 119)", icone:"bandage-outline"},
    {nome:"Antirugas", cor:"rgb(115, 250, 53)", icone:"happy-outline"},
    {nome:"Alergias e infecções", cor:"rgb(220, 250, 53)", icone:"eyedrop-outline"}
  ]

  constructor() { }

  ngOnInit() {
  }

}
