import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProviderClass } from 'src/app/models/providers.class';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-delete-providers',
  templateUrl: './delete-providers.component.html',
  styles: [
  ]
})
export class DeleteProvidersComponent implements OnInit {
  provider = new ProviderClass()

  id!: any; // service provider's id from url
  company_!: any;
  isDeleted = false



  constructor(private providerService: ProviderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe( params => this.id = params.get('id') )
    
    this.deleteRecord()
  }

  deleteRecord() {
    this.providerService.deleteProvider(this.id)
    .subscribe({
      next: data => {
        console.log(data)
        this.provider = data
        this.company_ = this.provider.company.company_name
        this.isDeleted = true
      },
      error: err => {
            this.isDeleted = false
            console.log('error:', err)
      },
      complete: () => {
            console.log('the end')
          
      },
    });
    
  }

}
