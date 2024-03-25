import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {VIDEO_CONFIG} from "./scanner.const";
import { HttpClient } from '@angular/common/http';
import jsQR from "jsqr";
import {Subject, takeUntil, timer} from "rxjs";
import { SharedService } from '../shared.service';
import { PageRoute } from '../page-route';
import { IonInput, NavController } from '@ionic/angular';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit, AfterViewInit, OnDestroy {

  segment: any;
  tipo: any;
  
  @ViewChild('resultInput', { static: true, read: ElementRef }) resultInput!: ElementRef;

  constructor(
    private sharedservice: SharedService,
    private navCtrl: NavController,
    private http: HttpClient,)
    {    
      }

  @ViewChild('videoElement') video!: ElementRef<HTMLVideoElement>
  @ViewChild('canvas', {static: true}) canvas!: ElementRef
  


  videoStream!: MediaStream
  signature: string = ''
  config = structuredClone(VIDEO_CONFIG)
  private destroy$ = new Subject<void>()
  result = ''
  cameraMode = false
  

  ngOnInit(){
  }

  ionViewDidEnter() {
    this.resultInput.nativeElement.setFocus();
  }

  async finish() {
    var dados = this.sharedservice.getDados();
    dados ["signature"] = this.result;
    console.log(this.result)
    this.sharedservice.setDados(dados);
    // console.log(dados)
    this.goToCrossPage()
    // this.ngOnDestroy()
  }

  goToCrossPage() {
    const pageRoute = PageRoute.lider;
    if (pageRoute) {
      this.navCtrl.navigateForward(pageRoute.path);
    }
  }

  ngAfterViewInit(): void {
    console.log(this.sharedservice.getDados());
    // this.prepareScanner()
  }

  async prepareScanner() {
    this.segment = "camera"
    const available = await this.checkCamera()
    if (available) this.startScanner()
  }

  changeCamera() {
    this.prepareScanner()
    let {facingMode} = this.config.video

    this.config.video.facingMode = facingMode === 'enviroment' ? 'user' : 'enviroment'
    this.startScanner()
  }

  async startScanner() {
    console.log('start')
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

  gotoCam() {
    this.startScanner()
    this.cameraMode= true
  }

  
}
