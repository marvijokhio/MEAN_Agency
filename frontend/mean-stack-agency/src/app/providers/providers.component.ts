import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../services/provider.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styles: [
  ]
})


export class ProvidersComponent implements OnInit {
  listEmpty = false
  providers!:any[];
  constructor(private providerService: ProviderService) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.providerService.getProviders()
    .subscribe({
      next: data => {
        if(data){
          this.providers = data
          this.listEmpty = false
        }else{
          this.listEmpty = true
        }
      },
      error: err => {
        this.listEmpty = true
        console.log('error:', err)
      },
      complete: () => {
          console.log('the end')
      },
    });
  }
}
