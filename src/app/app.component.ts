import { Component,ViewChild } from '@angular/core';
import { ViewDataComponent } from './view-data/view-data.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('viewData') viewDataComponent!: ViewDataComponent;

  onTabChange(event: any) {
    if (event.index === 1) {
      this.viewDataComponent.refreshChart();
    }
  }

}
