import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthServiceService } from "../services/authService.service";
import { Injectable, inject } from "@angular/core";

export @Injectable({
    providedIn: 'root'
})

class AuthGuard {
    constructor(private authService: AuthServiceService,
        private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        return this.checkLoggedIn(state.url);
    }
    checkLoggedIn(url: string): boolean {
        if (this.authService.isLoggedIn) {
            return true;
        }
        this.authService.redirectUrl = url;
        this.router.navigate(['/login']);
        return false;
    }
}

export const isAdminGuard: CanActivateFn = (router: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(AuthGuard).canActivate(router, state);

}
