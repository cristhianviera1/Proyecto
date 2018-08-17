import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import L from 'leaflet';
import 'rxjs/add/operator/map';
import { Http, Connection } from '@angular/http';
import 'rxjs/add/observable/of';
import Swal from 'sweetalert2';

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  propertyList = [];
  map: L.Map;
  templateUrl: L.PointTuple;
  center: L.PointTuple;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  ionViewDidLoad() {
    this.leafletMap();
    this.loadJSON();
  }
  loadJSON() {
    //Realizamos una petición a nuestro WebService
    this.http.get('http://192.168.100.18/api/Eventos')
      .map(res => res.json())
      .subscribe(data => {
        //agregamos la información recuperada a una propiedad de nuestra clase
        this.propertyList = data;
        console.log(data);
      },
        err => console.log("error is " + err), //En caso de tener una respuesta negativa imprimimos en consola el error
        
        () => this.markers()

      );
  }
  leafletMap() {
    this.map = L.map("map").fitWorld();
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: '© Elaborado y diseñado por Gabriel Viera',
      id: 'mapbox.streets'
    }).addTo(this.map);
    this.map.locate({ setView: true, maxZoom: 13 }).on('locationfound', (e) => {
      console.log('Se ha recuperado tu ubicación exitosamente');  
    })
  }
  markers() {
    console.log("Eventos Recuperados: " + this.propertyList.length);
    //Recuperamos nuestro array "propertyList" y recorremos cada una de sus propiedades
    for (let property of this.propertyList) {
      let markerGroup = L.featureGroup();
      let marker: any = L.marker([property.latitud, property.longitud]).on('click', () => {        
        var contenido ='<table border=1>'+
        '<tr><td><b>Evento:</b></td><td colspan=3>'+property.nombre+'</td></tr>'+
        '<tr><td><b>Fecha:</b></td><td>'+property.fecha+'</td><td><b>Hora:</b></td><td>'+property.hora+'</td></tr>'+
        '<tr><td><b>Información:</b></td><td colspan=3>'+property.descripcion+'</td></tr>'+
        '<tr><td><b>Categoria:</b></td><td>'+property.categoria+'</td><td><b>Precio:</b></td><td>'+property.precio+'</td></tr>'+
        '<tr><td><b>Puntos de Venta:</b></td><td colspan=3>'+property.puntosVenta+'</td></tr>'+
        '<tr><td><b>Lugar:</b></td><td colspan=3>'+property.lugar+'</td></tr>'+
        '<tr><td><b>Dirección:</b></td><td colspan=3>'+property.direccion+'</td></tr>'+
        '<tr><td><b>Observaciones:</b></td><td colspan=3>'+property.observaciones+'</td></tr>'+
        '<tr><td><b>Organizan:</b></td><td colspan=3>'+property.organizadores+'</td></tr>'+
        '</table>'
      Swal({
        title: "<i>Evento</i>", 
        html: contenido,  
        confirmButtonText: "<u>Volver</u>", 
        width: '800px',
      });
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
    }
  }
}
