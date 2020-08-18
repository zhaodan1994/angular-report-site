import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { SnippetService } from '../../services/snippet/snippet.service';

@Component({
  selector: 'app-select-element',
  templateUrl: './select-element.component.html',
  styleUrls: ['./select-element.component.scss']
})
export class SelectElementComponent implements OnInit, AfterViewInit, AfterViewChecked {


  selected: string;
  enumType = [];
  hasOpened = false;
  enumTypeString: string;

  @Input() enumParam: string;
  @Output() selectElement = new EventEmitter<string>();
  @ViewChild('matSelect', { static: true }) matSelect: MatSelect;
  constructor(
    private snippetService: SnippetService,
    private el: ElementRef,
  ) { }

  ngOnInit(): void {
    this.getEnumType();

  }

  ngAfterViewInit(): void {
    this.matSelect.open();
  }

  ngAfterViewChecked(): void {
    const overlayView: any = document.querySelector('.cdk-overlay-pane');
    if (overlayView && !this.hasOpened) {
      overlayView.style.display = 'none';
      this.hasOpened = true;
    }
  }



  getEnumType(): void {
    const index = this.enumParam?.lastIndexOf('::');
    this.selected = this.enumParam?.substring(0, index);
    this.enumTypeString = this.enumParam?.substring(index + 2);
    this.enumType = this.snippetService.getEnumType(this.enumTypeString);
  }

  setSelectElement(selectedValue: string): void {
    this.selectElement.emit(selectedValue);
  }


}
