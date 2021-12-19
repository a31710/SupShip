import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit() {
  }
  logout(){

    this.authService.logOut()
    this.redirect();


  }

  redirect(){
    setTimeout(()=>{
      this.route.navigateByUrl('/auth/checkemail')
      console.log(this.route.url);

      if(this.route.url != '/auth/checkemail'){
        this.redirect();
      }
    })
  }
}
