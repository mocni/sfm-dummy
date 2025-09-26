import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sfm';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang("hr");
    this.translate.use("hr");
  }
}
