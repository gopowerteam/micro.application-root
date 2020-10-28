import { Component } from '@angular/core'
import { navigateToUrl } from 'single-spa'
@Component({
  selector: 'app-layout-side',
  templateUrl: './layout-side.component.html',
  styleUrls: ['./layout-side.component.less']
})
export class LayoutSideComponent {
  ngOnInit(): void {}

  public changeApplication(path) {
    console.log(path)
    navigateToUrl(path)
  }
}
