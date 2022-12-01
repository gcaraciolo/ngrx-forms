import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { environment } from 'environment';
import { taskListActions, Tasks } from '../data-access';
import { Formable, Forms } from '@app/forms';

@UntilDestroy()
@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
})
export class TaskCreateComponent implements Formable {
  host = environment.url;

  form = this.forms.newForm(this, {
    url: ['', Validators.required],
  });

  constructor(
    public forms: Forms,
    public tasks: Tasks
  ) { }

  onSubmit() {
    this.forms.post(`${environment.api}/tasks`, taskListActions.create);
  }
}
