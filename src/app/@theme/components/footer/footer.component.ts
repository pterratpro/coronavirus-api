import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with ♥ by <b>Pierre Terrat</b> with ngx-admin (love you Akveo)
    </span>
  `,
})
export class FooterComponent {
}
