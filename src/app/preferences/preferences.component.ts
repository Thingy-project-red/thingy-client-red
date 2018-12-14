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
    templateUrl: './preferences.component.html',
    styleUrls: ['./preferences.component.css']
})

export class PreferenceComponent implements OnInit, OnDestroy {
    private userPrefs: UserPreferences;
    private contactData: object;
    private thresholds: object;
    private metrics: string[];
    private units: object;
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
            .subscribe((userPrefs) => {
                this.userPrefs = userPrefs;
                this.contactData = userPrefs.preferences.contactData;
                this.thresholds = userPrefs.preferences.thresholds;
                this.isLoading = false;
            });
        this.metrics = this.preferenceService.metrics;
        this.units = this.preferenceService.units;
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
        this.preferenceService.updatePreferences(this.userPrefs, this.username)
            .then(() => {
                this.isLoading = false;
                this.snackBar.open("Preferences updated successfully ", "done", { duration: 3000 });
            })
            .catch(err => {
                this.isLoading = false;
                console.log(err);
                let msg = typeof err.error === "string" ? err.error : err.message;
                this.snackBar.open(msg, "error", { duration: 5000 });
            })        
    }

}
