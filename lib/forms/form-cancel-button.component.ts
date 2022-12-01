import { Component } from '@angular/core';
import { Forms } from './data-access/forms.facade';

@Component({
  selector: 'form-cancel-button',
  template: `
    <button mat-button type="button">
      <div #ref><ng-content></ng-content></div>
      <span *ngIf="!ref.innerHTML.trim()">
        {{ 'Cancel' | translate }}
      </span>
    </button>
  `,
  styleUrls: [],
  /** @todo: change detection does't work because forms.form?.invalid is not an input. is there a better design? actually, is this even a problem at all? */
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormCancelButtonComponent {
  constructor(public forms: Forms) { }
}
