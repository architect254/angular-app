import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FlexLayoutModule } from '@angular/flex-layout';

import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const viewComponents = [
  LayoutComponent,
  HeaderComponent,
  FooterComponent,
  SidebarComponent,
];

const materialModules = [
  MatIconModule,
  MatMenuModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatDividerModule,
  MatButtonModule,
];

@NgModule({
  declarations: [...viewComponents],
  imports: [...materialModules, CommonModule, RouterModule, FlexLayoutModule],
  exports: [...viewComponents],
})
export class LayoutModule {}
