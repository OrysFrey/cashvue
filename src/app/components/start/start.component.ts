import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { SharedModule } from '../../shared/shared/shared.module';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-start',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {
  EsInsertar: boolean = true;
  login!: FormGroup;
  register!: FormGroup;
  loginError: boolean = false;
  id!: number;
  date_register!: Date;
  showEffect: boolean = false;
  
  constructor(private formBuilder: FormBuilder){}

  ngOnit(){
    this.reactiveForm();
    this.moveLabel();
    this.changeSlide();
    this.textSlider();
  }

  reactiveForm():void{
    this.login = new FormGroup({
      email_user: new FormControl()
    })    

    this.login = this.formBuilder.group({
      email_user:["",[Validators.required]],
      password_user:["",[Validators.required, Validators.min(8)]]
    });

    this.register = this.formBuilder.group({
      id:[""],
      name_user:["",[Validators.required]],
      email_user:["",[Validators.required, Validators.email]],
      password_user:["",[Validators.required, Validators.min(8)]]
    });
  }

  loginUser(){
    console.log("sign in")
  }

  signupUser():void{
    console.log("sign up")
  }
  
  moveLabel(){
    const inputs = document.querySelectorAll(".input-field");

    inputs.forEach((inp) => {
      inp.addEventListener("focus", () => {
        inp.classList.add("active");
      });
      inp.addEventListener("blur", () => {
        const inpu = inp as HTMLInputElement;
        if(inpu.value != "") return;
        inp.classList.remove("active");
      });
    });
  }

  changeSlide(){
    const toggle_btn = document.querySelectorAll(".toggle");
    const main = document.querySelectorAll("main");

    toggle_btn.forEach((btn) => {
      btn.addEventListener("click", () => {
        main.forEach((mai) => {
          mai.classList.toggle("sign-up-mode");
        });
      });
    });
  }

  hola():void{
    console.log("hola");
  }

  textSlider(){
    const bullets = document.querySelectorAll(".bullets span");
    const images = document.querySelectorAll(".image");

    function moveSlider(this: HTMLElement){
      let index = this.dataset['value'];
      const ind = index as unknown as number;

      let currentImage = document.querySelector(`.img-${index}`);
      images.forEach((img) => img.classList.remove("show"));
      currentImage?.classList.add("show");

      const slider = document.querySelector(".text-group");
      const textLableSlider = slider as HTMLElement;
      textLableSlider.style.transform = `translateY(${-(ind - 1) * 3}rem)`;

      bullets.forEach(bull => bull.classList.remove("active"));
      this.classList.add("active");
    }

    bullets.forEach(bullet => {
      bullet.addEventListener("click", moveSlider);
    });
  }

}