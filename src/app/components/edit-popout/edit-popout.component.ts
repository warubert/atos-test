import { Component, Input } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-edit-popout',
  templateUrl: './edit-popout.component.html',
  styleUrls: ['./edit-popout.component.scss'],
})
export class EditPopoutComponent {
  @Input() value: number;
  @Input() desc: string;
  @Input() type: string;
  @Input() date: Date;
  @Input() id: string;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.value = config.data.value;
    this.desc = config.data.desc;
    this.type = config.data.type;
    this.date = config.data.date;
    this.id = config.data.id;
  }

  ngOnInit() {}

  async save() {
    const data = {
      id: this.id,
      desc: this.desc,
      type: this.type,
      value: this.value,
      date: this.date,
    };

    this.ref.close(data);
    // await this.backendService.saveData(data);
  }

  checkSave() {
    if (this.desc && this.type && this.value) {
      return false;
    } else {
      return true;
    }
  }
}
