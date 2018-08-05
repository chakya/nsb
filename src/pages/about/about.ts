import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Airtable } from 'ngx-airtable';
import { Http } from '@angular/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  airtable:any;
  base: any;
  table:any;
  scText:any;
  productData:any[]=[];
  data:any;
  searchQuery: string = '';
  constructor(public navCtrl: NavController, public _http: Http, public barcodeScanner: BarcodeScanner) {

  }

  ngOnInit(){

    this.airtable= new Airtable(this._http)
    this.airtable.configure({ apiKey: 'keyjQ62V3uBfAWHEv' })
    // this.base= new Base('appjF3Oh6eYb0nIaU',this.airtable)
    this.base= this.airtable.base('appjF3Oh6eYb0nIaU')
    this.table=this.base.table({tableName:'Product Inventory'})
    this.table.select().all().subscribe(data=>{this.data=data;this.productData=data},err=>console.log(err))
      // data.forEach(el=>this.productData.push(el));},(err)=>console.log(err), ()=>console.log(this.productData))
}

scanBarcode(){
  // this.barcodeScanner.scan().then(barcodeData => {
  //   console.log('Barcode data', barcodeData);
  //   this.scText=barcodeData['text']
    this.scText='2 TAK ENGINE PENLUBE'
    console.log(this.productData.filter(el=>el['fields']['Nama Barang']==this.scText)
  
  )
    

    // console.log(this.productData)
  //  }).catch(err => {
  //      console.log('Error', err);
  //  });
}

getItems(ev: any) {
  console.log(this.productData)
  // Reset items back to all of the items

  // set val to the value of the searchbar
  const val = ev.target.value;

  // if the value is an empty string don't filter the items
  if (val && val.trim() != '') {
    this.productData = this.data.filter((item) => {
      var itemName=item['fields']['Nama Barang']
      return (itemName.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }
}


}
