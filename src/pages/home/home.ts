import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Airtable } from 'ngx-airtable';
import { Http } from '@angular/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  airtable:any;
  base: any;
  table:any;
  code:any;
  constructor(public navCtrl: NavController, public _http: Http, public barcodeScanner: BarcodeScanner) {

  }

  ngOnInit(){

    this.airtable= new Airtable(this._http)
    this.airtable.configure({ apiKey: 'keyjQ62V3uBfAWHEv' })
    // this.base= new Base('appjF3Oh6eYb0nIaU',this.airtable)
    this.base= this.airtable.base('appjF3Oh6eYb0nIaU')
    this.table=this.base.table({tableName:'Product Inventory'})
    // this.table= new Table()
    this.table.select().all().subscribe(data=>console.log(data))

    
}

scanBarcode(){
  this.barcodeScanner.scan().then(barcodeData => {
    console.log('Barcode data', barcodeData);
    this.code=barcodeData
   }).catch(err => {
       console.log('Error', err);
   });
}
}