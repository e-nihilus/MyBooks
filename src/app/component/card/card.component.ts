import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() book: any; 
  @Input() even: boolean = false; 
  @Output() delete = new EventEmitter<void>(); 

  removeCard() {
    this.delete.emit(); 
  }
}
