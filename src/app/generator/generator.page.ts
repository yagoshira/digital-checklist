import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.page.html',
  styleUrls: ['./generator.page.scss'],
})
export class GeneratorPage implements OnInit {

  segment: any;
  nome!: string;
  matricula!: string;
  lider!: string;
  lider_matricula!: string;
  qrCode: any;
  qrCodeLider: any;
  habilitadownload: boolean = false;
  


  constructor(
    private http: HttpClient,
    private platform: Platform,
  ) {
    this.segment = 'colaborador'
   }

  ngOnInit() {
    this.habilitadownload = false
  }
 
  
    generateLider() {
      const qrCodeData = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data={"NOME":"${this.nome}","MATRICULA":"${this.matricula}"}`;
      this.qrCodeLider = qrCodeData;
      console.log('qr code:', this.qrCode);
      this.habilitadownload = true
    }

    
    
    generateColaborador() {
      const qrCodeData = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data={"NOME":"${this.nome}","MATRICULA":"${this.matricula}","LIDER":"${this.lider}","LIDER-MATRICULA":"${this.lider_matricula}"}`;
      this.qrCode = qrCodeData;
      this.habilitadownload = true
      console.log('qr code:', this.qrCode);
    }
    
    
    downloadImage() {
      const qrCodeData = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data={"NOME":"${this.nome}","MATRICULA":"${this.matricula}","LIDER":"${this.lider}","LIDER-MATRICULA":"${this.lider_matricula}"}`;
      
      fetch(qrCodeData)
        .then(response => response.blob())
        .then(blob => {
          const blobUrl = URL.createObjectURL(blob);
  
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = 'qrcode.png';
          
          link.click();
    
          URL.revokeObjectURL(blobUrl);
        });
      
      this.nome = '';
      this.matricula = '';
      this.lider = '';
      this.lider_matricula = '';
      this.qrCode = null
    }

    downloadliderImage() {
      const qrCodeData = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data={"NOME":"${this.nome}","MATRICULA":"${this.matricula}"}`;
      
      fetch(qrCodeData)
        .then(response => response.blob())
        .then(blob => {
          const blobUrl = URL.createObjectURL(blob);
  
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = 'qrcode.png';
          
          link.click();
    
          URL.revokeObjectURL(blobUrl);
        });
      
      this.nome = '';
      this.matricula = '';
      this.lider = '';
      this.lider_matricula = '';
      this.qrCode = null
    }
  }
  