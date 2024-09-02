import { Component, ElementRef, ViewChild } from '@angular/core';
import { MasterService } from 'src/app/service/master.service/master.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  searchValue: string = ''; // Property to bind with input

  @ViewChild('myInput', { static: false }) inputElement!: ElementRef;

  constructor(private dataService: MasterService) { }

  handleSearch() {
    const inputValue = this.inputElement.nativeElement.value;
    console.log('Search Input:', inputValue);
    this.dataService.changeUser(inputValue);
  }

}
