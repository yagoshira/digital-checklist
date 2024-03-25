import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController, AnimationController, IonModal, LoadingController, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import * as jspdf from 'jspdf';
import 'jspdf-autotable';





@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  @ViewChild('tableToExport', { static: false }) tableToExport!: ElementRef;
  @ViewChild('tableToExportDetail', { static: false }) tableToExportDetail!: ElementRef;

  checklists: any = [];
  checklistaux: any = [];
  modal: any;
  name: any;
  id_solicitacao: string | undefined;
  checklistid: any = [];
  message: string | undefined;

  data_pesquisa_inicio: any = null;
  data_pesquisa_fim: any = null;
  data_pesquisa_filter: any = null;
  isLoading = false;
  isLoadingDetail = false;


  constructor(private http: HttpClient,
              private router: Router,
              private alertController: AlertController,
              private animationCtrl: AnimationController,
              private loadingCtrl: LoadingController,
              private modalController: ModalController,
              private route: ActivatedRoute,) { }

  ngOnInit() {
    this.getReports()
  }

  async getReports() {
    await this.http.get('https://cevalogsv.com/meli/digital-checklist/campinas/api/getReports.php').subscribe(data => {
      this.checklists = data
      this.checklistaux = this.checklists
    });
  }

  async getReportsDetail() {
    await this.http.get('https://cevalogsv.com/meli/digital-checklist/campinas/api/getReportsDetail.php').subscribe(data => {
      this.checklists = data
    });
  }

  gotoHome(){
    this.router.navigate(['login'])
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }


  exportToCSV() {
    const table = document.querySelector('.table-wrapper table');
    if (table) {
      const rows = Array.from(table.querySelectorAll('tr'));

      let csvContent = 'data:text/csv;charset=utf-8,';
      rows.forEach(row => {
        const rowData: string[] = [];
        const cols = Array.from(row.querySelectorAll('td, th'));
        cols.forEach(col => {
          rowData.push(col.textContent || '');
        });
        csvContent += rowData.join(';') + '\r\n';
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'dados.csv');
      document.body.appendChild(link);

      link.click();
    }
  }

  exportToCSVDetail() {
    const table = document.querySelector('.table-wrapper-detail table');
    if (table) {
      const rows = Array.from(table.querySelectorAll('tr'));

      let csvContent = 'data:text/csv;charset=utf-8,';
      rows.forEach(row => {
        const rowData: string[] = [];
        const cols = Array.from(row.querySelectorAll('td, th'));
        cols.forEach(col => {
          rowData.push(col.textContent || '');
        });
        csvContent += rowData.join(';') + '\r\n';
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'dados.csv');
      document.body.appendChild(link);

      link.click();
    }
  }

  

  exportToPDF() {
    const pdf = new jspdf.jsPDF('p', 'pt', 'letter');
    const content = this.tableToExport.nativeElement;

    const options = {
      startY: 40
    };

    const columns: any[] = [];
    const rows: any[] = [];

    const headerCells = content.querySelectorAll('thead th');
    headerCells.forEach((cell: HTMLElement) => {
      if (cell.textContent !== null) {
        columns.push(cell.textContent.trim());
      }
    });

    const dataRows = content.querySelectorAll('tbody tr');
    dataRows.forEach((row: HTMLElement) => {
      const rowData: any[] = [];
      const cells = Array.from(row.querySelectorAll('td'));

      cells.forEach((cell: HTMLElement) => {
        if (cell.textContent !== null) {
          rowData.push(cell.textContent.trim());
        } else {
          rowData.push('');
        }
      });

      rows.push(rowData);
    });

    (pdf as any).autoTable({
      head: [columns],
      body: rows
    });

    pdf.save('dados.pdf');
    console.log(pdf)
  }

  exportToPDFDetail() {
    const pdf = new jspdf.jsPDF('p', 'pt', 'letter');
    const content = this.tableToExportDetail.nativeElement;

    const options = {
      startY: 40
    };

    const columns: any[] = [];
    const rows: any[] = [];

    const headerCells = content.querySelectorAll('thead th');
    headerCells.forEach((cell: HTMLElement) => {
      if (cell.textContent !== null) {
        columns.push(cell.textContent.trim());
      }
    });

    const dataRows = content.querySelectorAll('tbody tr');
    dataRows.forEach((row: HTMLElement) => {
      const rowData: any[] = [];
      const cells = Array.from(row.querySelectorAll('td'));

      cells.forEach((cell: HTMLElement) => {
        if (cell.textContent !== null) {
          rowData.push(cell.textContent.trim());
        } else {
          rowData.push('');
        }
      });

      rows.push(rowData);
    });

    (pdf as any).autoTable({
      head: [columns],
      body: rows
    });

    pdf.save('dados.pdf');
  }

  async pesquisa_data() {

  }

  async limparCampo() {
    this.data_pesquisa_inicio = null
    this.data_pesquisa_fim = null
  }

  formatarData(data: Date): string {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear().toString();
    return `${dia}/${mes}/${ano}`;
  }

  closeModal() {
    this.modalController.dismiss();
  }

  searchReport(ev: Event) {
    this.checklists = this.checklistaux
    const val = (<CustomEvent>ev).detail.value;
    if (val && val.trim() !== '') {
      this.checklists = this.checklists.filter((term: any) => {
        return (
          term.nome.toLowerCase().indexOf(val.trim().toLowerCase()) > -1
        );
      });
    }
  }


}

