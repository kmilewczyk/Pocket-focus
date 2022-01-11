import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productivity',
  templateUrl: './productivity.component.html',
  styleUrls: ['./productivity.component.scss']
})
export class ProductivityComponent implements OnInit {
  goalsEnabled = false;
  scheduleEnabled = false;

  constructor() { }

  ngOnInit(): void {
  }

}
