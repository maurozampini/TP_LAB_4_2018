import { Directive, ElementRef, OnInit, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appEstadoColor]'
})
export class EstadoColorDirective implements OnInit {

  @Input('estado') row : any;

  constructor(private elementRef : ElementRef, private renderer : Renderer2) { }

  ngOnInit(): void {
    let color = 'white';
    if(this.row.estado == '0') {
      color = '#ff000070';
    } else if (this.row.estado == '1') {
      color = '#0008ff59';
    } else if (this.row.estado == '2') {
      color = '#00ff0070';
    }
    this.renderer.setStyle(this.elementRef.nativeElement, 'backgroundColor', color);
  }
}
