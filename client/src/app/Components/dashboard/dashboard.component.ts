import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginAuthService } from '../../services/login-auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { AuthGuard } from '../../guards/auth.guard';
import { ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    token;
    user ;
    
  constructor( public router: Router ,public route: ActivatedRoute,private authService: LoginAuthService) {
      this.token = route.snapshot.params[''];
      this.user=route.snapshot.params['user'];
      this.user;
      this.token;
  }
 
      
  

  ngOnInit() {
     if(this.user){  
      this.authService.storeUserData(this.token, this.user);
      this.router.navigate(['/dashboard']); 
  }

}
}
