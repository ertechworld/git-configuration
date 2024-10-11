import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationComponent } from './component/integration.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GithubIntegrationService } from 'src/app/services/github-integration.service';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const routes: Routes = [
  { path: '', component: IntegrationComponent }
];

@NgModule({
  declarations: [
    IntegrationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatExpansionModule,
    MatIconModule,
    MatSnackBarModule,
    RouterModule.forChild(routes)  // Configure lazy-loaded route
  ],
  providers:[GithubIntegrationService]
})
export class IntegrationModule { }
