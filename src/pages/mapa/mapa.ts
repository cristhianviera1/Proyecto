import { Component, SystemJsNgModuleLoader} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import L, { latLng } from 'leaflet';
import 'rxjs/add/operator/map';
import {Http} from '@angular/http'

@IonicPage()

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  propertyList = [];
  map : L.Map;
  templateUrl : L.PointTuple;
  center : L.PointTuple;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  ionViewDidLoad() {    
    this.leafletMap();
    this.loadJSON();
  }
  loadJSON(){
    this.http.get('https://localhost:44386/api/todoes')
    .map(res => res.json())
    .subscribe(data => {
        this.propertyList = data;
    },
    err => console.log("error is "+err), // error
      () => this.markers()
    );
  }
  /*loadJSON(){
    this.http.get('assets/data/data.json')
    .map(res => res.json())
    .subscribe(data => {
        console.log('Este es el construcor');
        console.log(data);
        this.propertyList = data.properties;
    },
    err => console.log("error is "+err), // error
      () => this.markers()
    );
  }*/
  leafletMap(){
    this.map = L.map("map").fitWorld();
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: '© Elaborado y diseñado por Gabriel Viera',
    id: 'mapbox.streets'
    }).addTo(this.map);
    this.map.locate({setView: true,maxZoom: 15}).on('locationfound', (e) => {
      console.log('Te encontramos!');
      })    
    }
    markers(){      
      console.log(this.propertyList);
      console.log("Lugares recuperados: " + this.propertyList.length);
      for (let property of this.propertyList) {
        L.marker([property.latitud, property.longitud]).addTo(this.map)
        .bindPopup(property.nombre, {closeOnClick: false, autoClose: false}).openPopup();
      }
    }
}
//var marker = new L.Marker([-0.345923, -78.560346]).addTo(this.map);
//marker.bindPopup("Evento", {closeOnClick: false, autoClose: false}).openPopup(); 
