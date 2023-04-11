import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-delete-all',
  templateUrl: './delete-all.component.html',
  styles: [
  ]
})

export class DeleteAllComponent implements OnInit {
  listEmpty = false
  // ids!: string[];
  
  providers!:any[];
  router: any;
  constructor(private providerService: ProviderService) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.providerService.getProviders()
    .subscribe({
      next: (data) => {
        if(data){
          this.providers = data
          this.deleteAllData()
          this.providers = []
          console.log(data)
        }else{
          this.listEmpty = true
        }        
      },
      error: err => {
        console.log('error:', err)
        this.listEmpty = true
      },
      complete: () => {
        console.log('the end')
      },
    });
  }

  deleteAllData() {
    this.providerService.deleteProviders()
    .subscribe({
      next: () => {
        this.listEmpty = true
        // this.ngOnInit()
        this.loadData()
        
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
