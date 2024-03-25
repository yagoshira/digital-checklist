import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {VIDEO_CONFIG} from "./scanner.const";
import { HttpClient } from '@angular/common/http';
import jsQR from "jsqr";
import {Subject, takeUntil, timer} from "rxjs";
import { PageRoute } from '../page-route';
import { AlertController, IonInput} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-lider-scanner',
  templateUrl: './lider-scanner.page.html',
  styleUrls: ['./lider-scanner.page.scss'],
})
export class LiderScannerPage implements OnInit, AfterViewInit, OnDestroy {

  segment: any;

  @ViewChild('resultInput', { static: true, read: ElementRef }) resultInput!: ElementRef;

  constructor(
    private sharedservice: SharedService,
    private http: HttpClient,
    private alertController: AlertController,
    private navCtrl: NavController,)
    {
    }

  @ViewChild('videoElement') video!: ElementRef<HTMLVideoElement>
  @ViewChild('canvas', {static: true}) canvas!: ElementRef


  videoStream!: MediaStream
  signature: string = ''
  lider_signature: any;
  config = structuredClone(VIDEO_CONFIG)
  private destroy$ = new Subject<void>()
  result: any = '';
  cameraMode = false

  ngOnInit() {
  }

  async finish() {
    var dados = this.sharedservice.getDados();
    var obj = JSON.parse(this.result)
    dados ["nome_lider"] = obj['NOME'];
    dados ["lider_matricula"] = obj['MATRICULA'];
    this.sharedservice.setDados(dados);
    var response = await this.http.post('https://cevalogsv.com/meli/digital-checklist/campinas/api/finish.php', dados).toPromise()
    if (!response) {
    this.presentAlert('ERRO!', 'Você nao pode assinar')
    this.result = null;
    return
  }
    else {
    this.presentAlert('SUCESSO!', 'Checklist realizado com sucesso!')
    this.goToCrossPage()
  }
  }

  goToCrossPage() {
    const pageRoute = PageRoute.login;
    if (pageRoute) {
      this.navCtrl.navigateForward(pageRoute.path);
    }
  }

  ngAfterViewInit(): void {
  }

  async prepareScanner() {
    const available = await this.checkCamera()
    if (available) this.startScanner()
  }

  changeCamera() {
    let {facingMode} = this.config.video

    this.config.video.facingMode = facingMode === 'enviroment' ? 'user' : 'enviroment'
    this.startScanner()
  }

  async startScanner() {
    this.videoStream = await navigator.mediaDevices.getUserMedia(this.config)
    this.video.nativeElement.srcObject = this.videoStream

    this.spyCamera()
  }

  spyCamera() {
    if (this.video.nativeElement) {
      const {clientWidth, clientHeight} = this.video.nativeElement

      this.canvas.nativeElement.width = clientWidth
      this.canvas.nativeElement.height = clientHeight

      const canvas = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D

      canvas.drawImage(this.video.nativeElement, 0, 0, clientWidth, clientHeight)

      const inversionAttempts = 'dontInvert'

      const image = canvas.getImageData(0, 0, clientWidth, clientHeight)
      const qrcode = jsQR(image.data, image.width, clientHeight, {inversionAttempts})

      if (qrcode) {
        const {data} = qrcode
        this.result = ""
        this.result = data

      } else {
        timer(100).pipe(takeUntil(this.destroy$)).subscribe(() => {
          this.spyCamera()
        })
      }
    }
  }

  async checkCamera() {
    const cameraPermissions = await navigator.permissions.query({name: 'camera'} as any)

    const isOk = cameraPermissions.state !== "denied"

    const hasMediaDevice = 'mediaDevices' in navigator
    const hasUserMedia = 'getUserMedia' in navigator.mediaDevices

    if (!hasMediaDevice || (!hasUserMedia && isOk)) {
      alert("Nao conseguimos acesso a camera, por favor verifique")
    }

    return cameraPermissions.state !== "denied"
  }


  ngOnDestroy() {
    this.videoStream.getTracks().forEach((track) => track.stop())
    this.video = null!

    this.destroy$.next()
    this.destroy$.complete()
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

  saveResult() {
    console.log(this.result)
  }
  
  gotoCam() {
    this.prepareScanner()
    this.cameraMode= true
  }


  ionViewDidEnter() {
    this.resultInput.nativeElement.setFocus();
  }

}

