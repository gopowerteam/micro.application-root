import { Component, Inject, Input, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core'

@Component({
  selector: 'app-workspace-layout',
  templateUrl: './workspace-layout.component.html',
  styleUrls: ['./workspace-layout.component.less']
})
export class WorkspaceLayoutComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef, static: true }) private container: ViewContainerRef

  constructor(@Inject('content') private content, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.appendChild(this.container.element.nativeElement, this.content)
  }
}
