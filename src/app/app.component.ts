import { Component } from '@angular/core';
import { BackendService } from './services/backend.service';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { EditPopoutComponent } from './components/edit-popout/edit-popout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ConfirmationService, MessageService, DialogService],
})
export class AppComponent {
  data = [];
  dataFiltered = [];
  selectedMonth: Date;
  newEntrada: number = 0;
  newDesc: string = '';
  newType: string = '';
  entradas: number = 0;
  saidas: number = 0;
  saldo: number = 0;
  showDelete: boolean = false;
  dolar: number = 0;
  convertValue: number = 1;
  moeda: string = 'BRL';
  monthNames: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  ref: DynamicDialogRef | undefined;

  constructor(
    private backendService: BackendService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public dialogService: DialogService
  ) {
    this.selectedMonth = new Date();
  }

  async ngOnInit() {
    await this.getData();
    await this.getCotacao();
  }

  async getCotacao() {
    const date = new Date();
    const dateFormated = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    const req = await fetch(
      'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_8b0SeFHiAGjq4oWkGe7IdyL4W8RJ6codQnk3IHta&base_currency=USD&currencies=BRL'
    );
    const data = await req.json();
    this.dolar = data.data.BRL;
    return req;
  }
  async getData() {
    this.data = await this.backendService.getData();
    this.filterData();
  }
  async save() {
    const data = {
      desc: this.newDesc,
      type: this.newType,
      value: this.newEntrada,
      date: this.selectedMonth,
    };

    await this.backendService.saveData(data);
    await this.getData();
  }

  checkSave() {
    if (this.newDesc && this.newType && this.newEntrada) {
      return false;
    } else {
      return true;
    }
  }

  setMonth() {
    this.filterData();
  }

  filterData() {
    this.dataFiltered = this.data.filter((element: any) => {
      return (
        new Date(element.date).getMonth() === this.selectedMonth.getMonth() &&
        new Date(element.date).getFullYear() ===
          this.selectedMonth.getFullYear()
      );
    });
    this.saldo = 0;
    this.entradas = 0;
    this.saidas = 0;
    this.dataFiltered.forEach((element: any) => {
      if (element.type === 'Entrada') {
        this.entradas += element.value;
      } else {
        this.saidas += element.value;
      }
    });

    this.entradas = this.entradas / this.convertValue;
    this.saidas = this.saidas / this.convertValue;
    this.saldo = this.entradas - this.saidas;
  }

  async exclude(id: string) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir a operação?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Excluido',
          detail: 'Você excluiu a operação',
        });
        await this.backendService.delete(id);
        await this.getData();
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Cancelado',
              detail: 'A operação não foi excluida',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelado',
              detail: 'A operação não foi excluida',
            });
            break;
          default:
            // Handle other cases if needed
            break;
        }
      },
    });
  }

  async edit(element: any) {
    this.ref = this.dialogService.open(EditPopoutComponent, {
      header: 'Editar operação',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        id: element.id,
        desc: element.desc,
        value: element.value,
        type: element.type,
        date: element.date,
      },
    });

    this.ref.onClose.subscribe(async (data: any) => {
      if (data) {
        await this.backendService.update(data);
        this.getData();
        this.messageService.add({
          severity: 'info',
          summary: 'Operação alterada',
          detail: data.desc,
        });
      }
    });
  }

  changeCurrency() {
    if (this.moeda === 'USD') {
      this.convertValue = this.dolar;
    } else {
      this.convertValue = 1;
    }

    this.filterData();
  }
}
