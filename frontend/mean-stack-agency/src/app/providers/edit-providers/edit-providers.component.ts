import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProviderClass } from 'src/app/models/providers.class';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-edit-providers',
  templateUrl: './edit-providers.component.html',
  styles: [
  ]
})

export class EditProvidersComponent implements OnInit {

  ready = false //Load form only when data are present
  submitted = false
  emailError = false
  emailErrorMsg = "Invalid already exists. Try again!"

  providers!: ProviderClass[];

  provider = new ProviderClass()
  providersForm!: FormGroup;

  id!: any; // service provider's id from url
  email!: string // service provider's default email
  

  constructor(private providerService: ProviderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.buildFormControls()
    this.loadData()

    this.route.paramMap
      .subscribe( params => this.id = params.get('id') )

    this.providerService.getProvider(this.id)
      .subscribe({
        next: data => {
          this.provider = data[0]
          console.log(data)

          // flatten retrieved object
          const temp: {[index: string]:any} = {}
          for(const [k1,v1] of Object.entries(this.provider) ){
            switch(k1){
              case '_id' || 'id': break
              case 'company': 
                for(const [k2,v2] of Object.entries(this.provider[k1]) ){
                  if (k2 != '_id'){
                    temp[k2] = v2
                  }
                }
              break
              default:
                temp[k1] = v1
            }
          }
          console.log(temp)
          this.providersForm.patchValue(temp)
          this.ready = true
        },
        error: err => console.log('error:', err),
        complete: () => console.log('the end'),
      });
  }

  handleSubmit(){
    console.log(this.providersForm.value)
    this.buildProvider()
    if(!this.emailInvalid()){
      this.providerService.updateProvider(this.id, this.provider)
      .subscribe({
        next: () => {
          this.submitted = true
          this.emailError = false
        },
        error: err => console.log('error:', err),
        complete: () => console.log('the end'),
      });
    }
  }


  // get all records from database to fill providers[]
  loadData(){
    this.providerService.getProviders()
    .subscribe({
      next: data => {this.providers = data},
      error: err => console.log('error:', err),
      complete: () => console.log('the end'),
    });
  }

  // check for duplicate emails
  emailInvalid(){
   let email = this.providersForm.get('email')?.value
   if(this.email == email &&  this.providers.filter(el=>el.company.email == email).length > 0){
    this.emailError = true
    return true
   }
   return false
  }

  // build new provider object
  buildProvider(){
    let p = this.providersForm.value
    this.provider.id = p.id
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
