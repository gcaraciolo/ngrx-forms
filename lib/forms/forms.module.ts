import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AsyncButtonModule } from '@app/ui/async-button/async-button.module';
import { EffectsModule } from '@ngrx/effects';

import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { formFeature } from './data-access/form/form.reducer';
import { RequestFormEffects } from './data-access/form/request-form.effects';
import { FormCancelButtonComponent } from './form-cancel-button.component';
import { FormSubmitButtonComponent } from './form-submit-button.component';


@NgModule({
  declarations: [
    FormSubmitButtonComponent,
    FormCancelButtonComponent,
  ],
  exports: [
    FormSubmitButtonComponent,
    FormCancelButtonComponent,
  ],
  imports: [
    TranslateModule,
    CommonModule,
    MatButtonModule,
    AsyncButtonModule,
    StoreModule.forFeature(formFeature),
    EffectsModule.forFeature([RequestFormEffects]),
  ],
  providers: [],
})
export class FormsModule {}
