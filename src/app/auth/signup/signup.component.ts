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
        console.log("entered onSignup"); 
        if(form.invalid){
            console.log("form invalid");
            return; 
        }
        this.isLoading = true; 
        console.log("Username: " + form.value.username); 
        console.log("Password: " + form.value.password); 
        let response = this.authService.createUser(form.value.username, form.value.password); 
    }
}