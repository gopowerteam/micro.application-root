import { Inject, Renderer2 } from '@angular/core'
import { Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core'

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.less']
})
export class DefaultLayoutComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef, static: true }) private container: ViewContainerRef

  constructor(@Inject('content') private content, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.appendChild(this.container.element.nativeElement, this.content)
  }
}
