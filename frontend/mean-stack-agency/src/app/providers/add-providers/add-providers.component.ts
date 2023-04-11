import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl, Validators} from '@angular/forms';
import { ProviderClass } from 'src/app/models/providers.class';
import { ProviderService } from 'src/app/services/provider.service';


@Component({
  selector: 'app-add-providers',
  templateUrl: './add-providers.component.html',
  styles: [
  ]
})
export class AddProvidersComponent implements OnInit {
   
  submitted = false
  emailError = false
  emailErrorMsg = "Invalid already exists. Try again!"

  providers!: ProviderClass[];

  provider = new ProviderClass()
  providersForm!: FormGroup;
  listEmpty=false

  constructor(private providerService: ProviderService) { }

  ngOnInit(): void {
    this.buildFormControls()
    this.loadData()
  }

  handleSubmit(){
    console.log(this.providersForm.value)
    if(this.listEmpty){
      this.buildProvider()
      this.providerService.addProvider(this.provider)
      .subscribe({
        next: () => {
          this.submitted = true
          this.emailError = false
          this.listEmpty=false
        },
        error: err => {
          console.log('error:', err)
          this.listEmpty = true
        },
        complete: () => {
          console.log('the end')
        }
      });
    }else{
      if(!this.emailInvalid()){
        this.providerService.addProvider(this.provider)
        .subscribe({
          next: () => {
            this.submitted = true
            this.emailError = false
            this.listEmpty=false
          },
          error: err => {
            console.log('error:', err)
            this.listEmpty = true
          },
          complete: () => {
            console.log('the end')
          }
        });
        }
    }
    
  }

  // get all records from database to fill providers[]
  loadData(){
    this.providerService.getProviders()
    .subscribe({
      next: data => {
        this.providers = data
      },
      error: err => {
        console.log('error:', err)
        this.listEmpty = true
      },
      complete: () => {
        console.log('the end')
      }
    });
  }

  // check for duplicate emails
  emailInvalid(){
   let email = this.providersForm.get('email')?.value
   if(this.providers.filter(el=>el.company.email == email).length > 0){
    this.emailError = true
    return true
   }
   return false
  }

  // build new provider object
  buildProvider(){
    let p = this.providersForm.value

    this.provider.firstname = p.firstname
    this.provider.lastname = p.lastname
    this.provider.position = p.position
    this.provider.company = {
      company_name: p.company_name  ,
      address: p.address,
      address2: p.address2,
      city: p.city,
      state: p.state,
      postal_code: p.postal_code,
      phone: p.phone,
      email: p.email,
      description: p.description,
      tagline: p.tagline
    }
  }

  // build form controls
  buildFormControls(){
    this.providersForm = new FormGroup({
      firstname : new FormControl('',[Validators.required, Validators.minLength(2)]),
      lastname : new FormControl('',[Validators.required, Validators.minLength(2)]),
      position : new FormControl('',[Validators.required, Validators.minLength(2)]),
      email : new FormControl('',[Validators.required, Validators.email]),
      phone : new FormControl('',[Validators.required, Validators.pattern('^[2-9]{3}-[0-9]{3}-[0-9]{4}$')]),
      company_name : new FormControl('',[Validators.required, Validators.minLength(2)]),
      address : new FormControl('',[Validators.required, Validators.minLength(2)]),
      address2 : new FormControl(),
      postal_code : new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('^[0-9]{5}$')]),
      city : new FormControl('',[Validators.required, Validators.minLength(2)]),
      state : new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
      description : new FormControl('',[Validators.required,Validators.minLength(2)]),
      tagline : new FormControl('',[Validators.required,Validators.minLength(2)])      
    })
  }
  
  // Method to easy access form controls for .html file
    get f(){
      return this.providersForm.controls
    }

}
