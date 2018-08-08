import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import L from 'leaflet';
@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  map : L.Map;
  templateUrl : L.PointTuple;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPage');
    this.leafletMap();
  }
  leafletMap(){
    this.map = L.map("map").fitWorld();
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: '© Elaborado y diseñado por Gabriel Viera',
  id: 'mapbox.streets'
  }).addTo(this.map);
  this.map.locate({
    setView: true,
    maxZoom: 15
  }).on('locationfound', (e) => {
    console.log('found you');
    })
  }
}
