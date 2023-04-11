import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProviderClass } from 'src/app/models/providers.class';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-details-providers',
  templateUrl: './details-providers.component.html',
  styles: [
  ]
})
export class DetailsProvidersComponent implements OnInit {  
  provider = new ProviderClass()

  id!: any; // service provider's id from url 

  constructor(private providerService: ProviderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe( params => this.id = params.get('id') )

    this.providerService.getProvider(this.id)
      .subscribe({
        next: data => {
          this.provider = data[0]
          console.log(data)
        },
        error: err => console.log('error:', err),
        complete: () => console.log('the end'),
      });
  }
}
