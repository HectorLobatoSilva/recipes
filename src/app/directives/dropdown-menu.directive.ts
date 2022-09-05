import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('click') onClick() {
    this.elementRef.nativeElement.children[1].classList.toggle('scale-0');
    this.elementRef.nativeElement.children[1].classList.toggle('scale-100');
  }
}
