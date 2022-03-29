import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LivingPlaceEnum } from './enums/LivingPlaceEnum';
import { Answers } from './Answers';



@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})

export class QuestionnaireComponent implements OnInit {

  answers:Answers = {
  livingPlace : LivingPlaceEnum.Apartment,
  score : 0,
  salery : 0,
  isHappy : false,
  }

  readonly ANSWERS_KEY = 'answers';

  LivingPlaceEnum = LivingPlaceEnum
  isSubmited:boolean = false;

  
  constructor() { }

  ngOnInit(): void {
    let answers = localStorage.getItem(this.ANSWERS_KEY);

    if(answers != null){
      console.log(this.answers);
      this.answers = JSON.parse(answers);
      this.isSubmited = true;
    }
  }

  handleSaleryDrag(salery:string): void{
    this.answers.salery = +salery;
  }

  handleHappyCheckBox(): void{
    this.answers.isHappy = (!this.answers.isHappy) ;
  }
  handleSubmit(data: NgForm) : void{

    let answers = data.value;
    this.answers.score = 0;

    //Living Place Calculatin:
    switch (answers.livingPlace) {
      case this.LivingPlaceEnum.Apartment:
        this.answers.score += 10;
        this.answers.livingPlace = this.LivingPlaceEnum.Apartment;
        break;
      case this.LivingPlaceEnum.Penthouse:
        this.answers.score += 20;
        this.answers.livingPlace = this.LivingPlaceEnum.Penthouse;
        break;
      case this.LivingPlaceEnum.Villa:
        this.answers.score += 30;
        this.answers.livingPlace = this.LivingPlaceEnum.Villa;
        break;
      default:
        break;
    }

    //Sallery Calculatin   
    if (this.answers.salery < 10000) {
      this.answers.score += 10;
    } else

      if (this.answers.salery < 50000) {
        this.answers.score += 20;
      }
      else {
        this.answers.score += 30;
      }

      //Is Happy Calculatin   
      if(this.answers.isHappy === true){
        this.answers.score += 20;
      }

      this.isSubmited = true;

  }

  handleClickSave() : void{
    console.log(this.answers);
    localStorage.setItem(this.ANSWERS_KEY, JSON.stringify(this.answers));
  }
}
