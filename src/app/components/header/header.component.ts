import { Component, OnInit } from '@angular/core';
import { DropdownOption } from 'src/app/models/dropdow-option.model';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  constructor(private dataStorage: DataStorageService) {}

  dropdownOptions: Array<DropdownOption> = [
    new DropdownOption('Fetch data', () =>
      this.dataStorage.fetchRecipes().subscribe()
    ),
    new DropdownOption('Save data', () => this.dataStorage.storeRecipes()),
  ];

  ngOnInit(): void {}
}
