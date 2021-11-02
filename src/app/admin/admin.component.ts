
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit() {
  }
  logout(){
    Swal.fire(
      'Đăng xuất thành công!',
      '',
      'success'
    )
    this.route.navigateByUrl('/auth/checkEmail')
    this.authService.logOut()

  }
}
