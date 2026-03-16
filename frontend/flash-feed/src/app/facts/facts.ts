import { Component } from '@angular/core';
import { FactService } from '../services/facts.service';
import { Fact } from '../core/models/facts.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facts',
  imports: [CommonModule],
  templateUrl: './facts.html',
  styleUrl: './facts.scss'
})
export class Facts {

  facts:Fact[] = [];

  constructor(private factService: FactService){}

  ngOnInit():void{

    this.factService.getFacts().subscribe(data=>{
      this.facts = data;
    });

  }

  toggleMore(facts: Fact){

    facts.expanded = !facts.expanded;

  }
}
