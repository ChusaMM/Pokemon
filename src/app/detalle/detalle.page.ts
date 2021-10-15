import { Component, OnInit } from '@angular/core';

import { ServicedataService } from '../servicios/pasardatos.service';
import { HTTP } from '@ionic-native/http/ngx';
import { ThrowStmt } from '@angular/compiler';
import { NavController } from '@ionic/angular';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

    data: any;
    pokemons: any;
    image: any;

  constructor(private datos:ServicedataService,private http:HTTP,private atras:NavController,private emailComposer:EmailComposer) {

        
        this.recuperardatos();
        console.log(JSON.stringify(this.data));

  }

  ngOnInit() {

  }

  apiweb(url){

    this.http.get(url, {}, {})
    
    .then(data => {
      this.pokemons=JSON.parse(data.data);
      this.image=this.pokemons.sprites.back_default;
     console.log(this.pokemons);
  
    })
    .catch(error => {
  
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
  
    });
  }
    abrir_mail(){
      let email = {
        to: 'anamortevila@gmail.com',
       
        attachments: [
          
        ],
        subject: 'Pokemon Favoritos',
        body: 'Hola te paso unos de los pokemos que tengo para probar' + this.data.name,
        isHtml: true
      }
      
      // Send a text message using default options
     this.emailComposer.open(email);
      

  }

  recuperardatos(){

    this.data=this.datos.getData();
  
    this.apiweb(this.data.url);
}
retroceder(){

  this.atras.navigateBack('home');

}
}
