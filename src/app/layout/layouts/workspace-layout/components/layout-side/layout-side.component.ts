import { Component, OnInit } from '@angular/core';
import { navigateToUrl } from 'single-spa';
@Component({
  selector: 'app-layout-side',
  templateUrl: './layout-side.component.html',
  styleUrls: ['./layout-side.component.less'],
})
export class LayoutSideComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public changeApplication(path) {
    navigateToUrl(path);
  }
}
