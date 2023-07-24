import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-option-modal',
  templateUrl: './option-modal.component.html',
  styleUrls: ['./option-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionModalComponent {
  @Input() items: any[] = [];
  // @Input() selectedItems: string = '';
  // @Input() title = 'Select activities';

  filteredItems: any[] = [];
  workingSelectedValues:any[] = []

  newActivityName:string = ''
  
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.filteredItems = [...this.items];
    // this.workingSelectedValues = this.selectedItems;
  }
  
  trackItems(index: number, item: any) {
    return item.value;
  }
  
  cancelChanges() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  
  confirmChanges() {
    return this.modalCtrl.dismiss(this.workingSelectedValues, 'confirm');
  }

  onSymptomAdd(){
    this.filteredItems.push(this.newActivityName);
    this.items.push(this.newActivityName);
    this.newActivityName = ''
  }
  
  searchbarInput(ev:any) {
    this.filterList(ev.target.value);
  }
  

  filterList(searchQuery: string | undefined) {

    if (searchQuery === undefined) {
      this.filteredItems = [...this.items];
    } else {

      const normalizedQuery = searchQuery.toLowerCase(); 
      this.filteredItems = this.items.filter(item => {
        return item.toLowerCase().includes(normalizedQuery);
      });
    }
  }

  isChecked(value: string) {
    // return this.workingSelectedValues === value;
  }
  
  checkboxChange(ev:any) {
    // const { checked, value } = ev.detail;
    
    // if (checked) {
    //   this.workingSelectedValues = value
    // } else {
    //   this.workingSelectedValues = '';
    // }
  }
}