import { Component } from '@angular/core';

import { MapaPage } from '../mapa/mapa';
import { BuscarPage } from '../buscar/buscar';
import { AcercaPage } from '../acerca/acerca';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MapaPage;
  tab2Root = BuscarPage;
  tab3Root = AcercaPage;

  constructor() {

  }
}
