import { Directive, ElementRef, OnInit, Input, Renderer2, HostListener, Renderer } from '@angular/core';


@Directive({
  selector: '[appEstadoColor]'
})
export class EstadoColorDirective implements OnInit {

  @Input('estado') row: any;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    let color = 'white';
    if (this.row.estado == '0') {
      color = '#FA5858';
    } else if (this.row.estado == '1') {
      color = '#F4FA58';
    } else if (this.row.estado == '2') {
      color = '#58FA58';
    }
    this.renderer.setStyle(this.elementRef.nativeElement, 'backgroundColor', color);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.cambiarColor();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.cambiarColorViejo();
  }

  cambiarColor() {
    if (this.row.estado == '0') {
      this.elementRef.nativeElement.style.backgroundColor = 'red';
    }
    else if (this.row.estado == '1') {
      this.elementRef.nativeElement.style.backgroundColor = 'yellow';
    }
    else if (this.row.estado == '2') {
      this.elementRef.nativeElement.style.backgroundColor = 'green';
    }
  }

  cambiarColorViejo() {
    if (this.row.estado == '0') {
      this.elementRef.nativeElement.style.backgroundColor = '#FA5858';
    }
    else if (this.row.estado == '1') {
      this.elementRef.nativeElement.style.backgroundColor = '#F4FA58';
    }
    else if (this.row.estado == '2') {
      this.elementRef.nativeElement.style.backgroundColor = '#58FA58';
    }
  }
}
