import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router : Router){}
  canActivate(): boolean {
    if(localStorage.getItem('accessToken')) {
      return true;
    } 
    else{
      this.router.navigate(['/']);
      return false
    }
  }
}
