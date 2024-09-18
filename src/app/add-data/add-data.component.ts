import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DataService } from 'src/services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html'
})
export class AddDataComponent {
  // #region Form Initialization and Variables
  dataForm: FormGroup;
  dataItems: { datetime: Date, temperature: number }[] = [];
  lastDate: moment.Moment | null = null;
  // #endregion

  // #region Constructor
  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.dataForm = this.fb.group({
      datetime: [null, [Validators.required, this.dateValidator.bind(this)]],
      temperature: [null, [Validators.required, Validators.min(-50), Validators.max(50)]]
    });
  }
  // #endregion

  // #region Validators
  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && this.lastDate && moment(control.value).isBefore(this.lastDate)) {
      return { 'dateTooEarly': true };
    }
    return null;
  }
  // #endregion

  // #region Event Handlers
  onDateChange(event: any) {
    this.dataForm.get('datetime')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.dataForm.valid) {
      const formValue = this.dataForm.value;

      const newItem = {
        datetime: new Date(formValue.datetime),
        temperature: formValue.temperature
      };

      this.dataItems.push(newItem);

      this.dataService.updateData(
        this.dataItems.map(item => ({
          datetime: moment(item.datetime).format('YYYY-MM-DD HH:mm:ss'),
          temperature: item.temperature
        }))
      );
      this.dataForm.reset();
      this.lastDate = moment(formValue.datetime);
    }
  }
  // #endregion
}
