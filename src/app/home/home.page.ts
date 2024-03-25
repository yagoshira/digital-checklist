import { AlertController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { PageRoute } from '../page-route';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ApiService } from '../api.service';
import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import { SharedService } from '../shared.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  state: any;
  matricula: string | undefined;
  usuario!: string;
  selectedCount: number = 0;
  totalQuestions: number = 18;
  step!: any;
  signature!: any;
  n_maquina!: any;
  date!: any;
  turno!: any;
  setor!: any;
  carga!: any;
  op1!: any;
  op2!: any;
  op3!: any;
  op4!: any;
  op5!: any;
  op6!: any;
  op7!: any;
  op8!: any;
  op9!: any;
  op10!: any;
  op11!: any;
  op12!: any;
  op13!: any;
  op14!: any;
  op15!: any;
  op16!: any;
  op17!: any;
  op18!: any;
acesso: any;
  nome: any;
  public progressbar: any | undefined;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private navCtrl: NavController,
    private http: HttpClient,
    private route: ActivatedRoute,
    private sharedservice: SharedService,
    private alertController: AlertController

  ) {
    this.n_maquina = null
    this.turno = null
    this.carga = null
    this.setor = null
    this.signature = null
    this.op1 = null
    this.op2 = null
    this.op3 = null
    this.op4 = null
    this.op5 = null
    this.op6 = null
    this.op7 = null
    this.op8 = null
    this.op9 = null
    this.op10 = null
    this.op11 = null
    this.op12 = null
    this.op13 = null
    this.op14 = null
    this.op15 = null
    this.op16 = null
    this.op17 = null
    this.op18 = null
    this.step = 'inicio'
    this.date = new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"})
    
  }

  ngOnInit() {
    var dadoslogin = this.sharedservice.getDados();
    console.log(dadoslogin);
    this.acesso = dadoslogin['acesso']
    this.nome = dadoslogin['nome']
    this.matricula = dadoslogin['matricula']
    console.log(this.date)

  console.log(this.acesso)
  }

  goToCrossPage() {
    const pageRoute = PageRoute.scanner;
    console.log('funcao cross')
    if (pageRoute) {
      this.navCtrl.navigateForward(pageRoute.path);
    }
  }

  gotoReports() {
    this.router.navigate(['reports'])
  }


  gotoChecklist() {
    this.step = 'checklist'
  }

  gotoChecklist2() {
    this.step = 'checklist2'
  }
  gotoChecklist3() {
    this.step = 'checklist3'
  }

  gotoInicio() {
    this.step = 'inicio'
  }

  gotoSignature() {
    this.presentAlert('Certifique-se de ter preenchido o checklist corretamente antes de finalizar!', '')
    this.step = 'signature'
  }

  async finish() {
    var request = {
      n_maquina: this.n_maquina,
      turno: this.turno,
      carga: this.carga,
      setor: this.setor,
      date: this.date,
      op1: this.op1,
      op2: this.op2,
      op3: this.op3,
      op4: this.op4,
      op5: this.op5,
      op6: this.op6,
      op7: this.op7,
      op8: this.op8,
      op9: this.op9,
      op10: this.op10,
      op11: this.op11,
      op12: this.op12,
      op13: this.op13,
      op14: this.op14,
      op15: this.op15,
      op16: this.op16,
      op17: this.op17,
      op18: this.op18,     
      nome: this.nome,     
      matricula: this.matricula, 
  }
  console.log('home' ,request)
  this.sharedservice.setDados(request);
  
  console.log(request);
  this.goToCrossPage()
  this.nome = null 
  this.matricula = ''
  this.n_maquina = null
  this.turno = null
  this.carga = null
  this.setor = null
  this.date = null
  this.signature = null
  this.op1 = null
  this.op2 = null
  this.op3 = null
  this.op4 = null
  this.op5 = null
  this.op6 = null
  this.op7 = null
  this.op8 = null
  this.op9 = null
  this.op10 = null
  this.op11 = null
  this.op12 = null
  this.op13 = null
  this.op14 = null
  this.op15 = null
  this.op16 = null
  this.op17 = null
  this.op18 = null
}

gotoScanner(request: Object){
  let navigationExtras: NavigationExtras = {
    replaceUrl: true
  }
  this.sharedservice.setDados(request);
  this.router.navigate(['scanner'], navigationExtras)
}

  
  async presentAlert(header: any, message: any) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
  }


  async presentAlert2(header: any, message: any) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  updateProgress(): void {
    this.selectedCount = 0;
  
    if (this.op1) this.selectedCount++;
    if (this.op2) this.selectedCount++;
    if (this.op3) this.selectedCount++;
    if (this.op4) this.selectedCount++;
    if (this.op5) this.selectedCount++;
    if (this.op6) this.selectedCount++;
    if (this.op7) this.selectedCount++;
    if (this.op8) this.selectedCount++;
    if (this.op9) this.selectedCount++;
    if (this.op10) this.selectedCount++;
    if (this.op11) this.selectedCount++;
    if (this.op12) this.selectedCount++;
    if (this.op13) this.selectedCount++;
    if (this.op14) this.selectedCount++;
    if (this.op15) this.selectedCount++;
    if (this.op16) this.selectedCount++;
    if (this.op17) this.selectedCount++;
    if (this.op18) this.selectedCount++;
  
    const progress = Math.round((this.selectedCount / this.totalQuestions) * 100);
    this.progressbar = progress.toString(); 
    // console.log(`Progresso: ${progress}%`);
  }

  gotoGenerator(){
    this.router.navigate(['generator'])
  } 
}
