import { Component, Input, OnInit } from '@angular/core';
import { DropdownOption } from 'src/app/models/dropdow-option.model';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent implements OnInit {
  @Input() title: string = '';
  @Input() options: Array<DropdownOption> = [];
  @Input() isButton: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
