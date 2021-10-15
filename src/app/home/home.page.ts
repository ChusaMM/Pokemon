import { Component } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { NavController } from '@ionic/angular';
import { DetallePage } from '../detalle/detalle.page';
import { ServicedataService } from '../servicios/pasardatos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  pokemons: any;
 
  constructor(private http:HTTP,public navCtrl: NavController,public dataService:ServicedataService) {
    
    this.apiweb();
  }

apiweb(){

  this.http.get(' https://pokeapi.co/api/v2/pokemon', {}, {})
  
  .then(data => {
    this.pokemons=JSON.parse(data.data);
   console.log(this.pokemons);
    console.log(data.status);
    console.log(data.data); // data received by server
    console.log(data.headers);

  })
  .catch(error => {

    console.log(error.status);
    console.log(error.error); // error message as string
    console.log(error.headers);

  });

}
navegardetalle(pokemon){

  this.dataService.setData(pokemon);
  this.navCtrl.navigateForward('detalle');
  
  
    }
}
