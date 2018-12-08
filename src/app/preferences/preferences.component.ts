import { Subscription } from "rxjs";
import { OnInit, OnDestroy, Component } from "@angular/core";
import { PreferenceService } from "./preferences.service";
import { MatSnackBar } from '@angular/material';
import { UserPreferences } from "./preferences.model";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-preferences',
    templateUrl: './preferences.component.html'
})

export class PreferenceComponent implements OnInit, OnDestroy {
    private userPrefs: UserPreferences;
    private preferencesSub: Subscription;
    isLoading = false;
    username: string;
    
    constructor(private authService: AuthService, public preferenceService: PreferenceService, public snackBar: MatSnackBar, public router: Router) { }
    
    ngOnInit() {
        this.isLoading = true;
        this.username = this.authService.getUsername();
        this.preferenceService.getUser(this.username);
		this.preferencesSub = this.preferenceService
            .getUserUpdateListener()
            .subscribe((preferences) => {
                if (!preferences.preferences) {
                    preferences.preferences = {
                        contactData: {},
                        thresholds: {}
                    }
                }
                this.userPrefs = preferences;
                this.isLoading = false;
            });
    }

    ngOnDestroy(): void {
        this.preferencesSub.unsubscribe();
	}

    onChange(form: NgForm) {
        if(form.invalid){
            console.log("invalid form");
            return; 
        }
        this.isLoading = true;
        this.preferenceService.updatePreferences(this.userPrefs, this.username);
        //this.router.navigate(['/preferences']);
        this.isLoading = false;
        this.snackBar.open("Preferences updated successfully ", "done", { duration: 3000 });
    }

}
