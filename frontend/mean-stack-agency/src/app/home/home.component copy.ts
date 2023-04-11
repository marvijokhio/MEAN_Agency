import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  title = 'Mean Stack Agency';
  nums = [10,20]
  sum = () =>{
    return this.nums[0] + this.nums[1]
  }

  red = "background-color: red"
  green = "background-color: green"
  alignme = "width: 50%; margin: 0 auto;"

  msg = ""
  clickMe = (val: string) =>{
    console.log(val)
    this.msg = val
  }

  twowaybindingmessage = ""

  show = false
  toggle = () => {
     this.show = !this.show
  }

  cond_result = false
  thesum = 0
  showSum = (n1: string, n2: string) =>{
     if (parseInt(n1) + parseInt(n2) > 100){
        this.thesum = parseInt(n1) + parseInt(n2)
      this.cond_result = true
    }else{
      this.thesum = parseInt(n1) + parseInt(n2)
      this.cond_result = false
    }
  }

  salaries = [10,20,60,33,89,65,74]

  inc(){
    this.salaries.push(Math.floor(Math.random() * 100))
  }

  dec(){
    this.salaries.pop()
  }


}
