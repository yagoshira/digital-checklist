import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ShareService } from '../share.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username!: string | undefined;
  password!: string | undefined;
  acesso!: string | undefined;
  matricula!: any | undefined;
  public usuario: any | undefined;


  constructor(
    private alertController: AlertController,
    private router: Router,
    private sharedservice: SharedService,
    private http: HttpClient,
    private shareservice: ShareService,
  ) { }

  ngOnInit() {
  }

  async login(): Promise<void> {
    try {
      const response = await this.http.get<any[]>(`https://cevalogsv.com/meli/digital-checklist/campinas/api/getLogin.php?matricula=${this.matricula}`).toPromise();
      if (response && response.length > 0) {
        const ACESSO = response[0].ACESSO;

        if (ACESSO === 'COLABORADOR' || ACESSO === 'ADMIN') {

          var request = {
            matricula: this.matricula,
            acesso: ACESSO,
            nome: response[0].NOME
          }
          this.sharedservice.setDados(request);
          this.gotoHome(request);
        }
        else if 
          (ACESSO !== 'COLABORADOR') {
          this.presentAlert('Você não tem acesso.', '')
        }
      } else {
        this.presentAlert('Matricula não encontrada.', '')
        console.log('Matrícula não encontrada');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  }

  gotoHome(request: Object){
    let navigationExtras: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['home'], navigationExtras)
  }
  

  async presentAlert(title: any, body: any) {
    const alert = await this.alertController.create({
      header: title,
      message: body,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

}