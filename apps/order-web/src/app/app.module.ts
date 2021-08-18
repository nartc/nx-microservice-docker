import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BASE_PATH } from '@nx-microservice-docker/order-web/shared-data-access';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzTypographyModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    SocketIoModule.forRoot({ url: '' }),
  ],
  providers: [
    {
      provide: BASE_PATH,
      useValue: '',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
