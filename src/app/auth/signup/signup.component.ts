import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from '../auth.service'; 


@Component({
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})

export class SignupComponent {
    isLoading = false; 
    isCreated = false; 

    constructor(public authService: AuthService){}

    onSignup(form: NgForm){
        if(form.invalid){
            return; 
        }
        this.isLoading = true; 
        let response = this.authService.createUser(form.value.username, form.value.password); 
    }
}