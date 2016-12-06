import { Component,  OnInit} from '@angular/core';
import {User} from './Models/user.model'; 
import {GITService} from './Services/git.service';


@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls:  ['./app.component.css']
})
export class AppComponent implements OnInit{ 
    public userDetailArr:User[] = [];
    public serviceError:any = "";
    public errorCount:number = 0;
    constructor(private gitService:GITService){
    }
    handleError(errormsg:string){
        this.errorCount = this.errorCount +1;
        this.serviceError = errormsg;
        console.log('**********************Error Occured********************');
        console.log(this.serviceError);
    }
    ngOnInit() {
            this.gitService.getUserDetail().then((userDetailArr)=>{
            this.userDetailArr = userDetailArr;
            console.log(this.userDetailArr);
        }).catch(msg =>{
            this.handleError("API rate limit exceeded(60 per hour from an IP), Please try running application after an hour");
        });;
    }
    sortByFollowers(){
             this.userDetailArr.sort((n1,n2) => n2.followers - n1.followers);
    }
    sortByLocation(){
            this.userDetailArr.sort((n1,n2) => {
            if (n1.location > n2.location) {
                return 1;
            }

            if (n1.location < n2.location) {
                return -1;
            }
            return 0;
        });
    }
    sortByName(){
            this.userDetailArr.sort((n1,n2) => {
            if (n1.name > n2.name) {
                return 1;
            }

            if (n1.name < n2.name) {
                return -1;
            }
            return 0;
        });
    }
    removeThisElement(removeUser:User){
        let idx = this.userDetailArr.indexOf(removeUser);
        if (idx != -1) {
                return this.userDetailArr.splice(idx, 1); 
            }
    }
    addUser(newUserUrl:string){
        console.log("***************************Component logging*******************");
        console.log(newUserUrl);
        this.gitService.getSingleUserDetailAPI(newUserUrl).then((userDetailArr)=>{
            this.userDetailArr = userDetailArr;
            console.log(this.userDetailArr);
        });
    }
}
