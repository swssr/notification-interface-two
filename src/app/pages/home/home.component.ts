import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // declare & initialize variables
  notificationForm: FormGroup;
  isSubmitted: boolean = false;
  errorMsg: string = null;
  successMsg: string = null;
  isLoading: boolean = false;

  constructor(
    private _notificationService: NotificationService,
    private _formBuilder: FormBuilder,
    private _router: Router) { }

  ngOnInit(): void {

    // setup validations for each form control
    this.notificationForm = this._formBuilder.group({
      userUid: ['', [Validators.required]],
      templateUid: ['', [Validators.required]]
    });

  }

  onLogin() {
    this.isSubmitted = true;
    // clear previous text
    this.successMsg = null;
    this.errorMsg = null;
  

    var formValue = this.notificationForm.value;
    console.log('@@@ form values ==>', formValue);

    // stop here if form is invalid
    if (this.notificationForm.invalid) {
      console.log('@@@ notification form validation failed...');
      // this.notificationForm.reset();
      return;
    }

    this.isLoading = true;

    let request = {};
    if (formValue.templateUid == 'bansela_bucks_celebratory') {
      console.log('@@@ build bansela_bucks_celebratory request...');

      request = {
        userUid: formValue.userUid,
        templateUid: formValue.templateUid,
        heading: "Header text",
        subHeading: "Subheading text",
        title: "Title text",
        subTitle: "Subtitle text",
        buttonTitle: "Action",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/gapdev2.appspot.com/o/icons%2FPopupIcons%2Fbucks_icon.png?alt=media&token=9f9d6aa8-98f9-4f26-bf39-aaba0220f57c"
      };

    } else if (formValue.templateUid == 'bansela_bucks_information') {
      console.log('@@@ build bansela_bucks_information request...');
      request = {
        userUid: formValue.userUid,
        templateUid: formValue.templateUid,
        title: "Title text",
        subTitle: "Subtitle text",
        buttonText: "Action",
        mainImageUrl: "https://firebasestorage.googleapis.com/v0/b/gapdev2.appspot.com/o/icons%2FPopupIcons%2Fbucks_icon.png?alt=media&token=9f9d6aa8-98f9-4f26-bf39-aaba0220f57c",
        description: "Description text"
      };

    } else {
      console.log('@@@ build bansela_bucks_toaster request...');
      request = {
        userUid: formValue.userUid,
        templateUid: "bansela_bucks_toaster",
        title: "Title text",
        subTitle: "Subtitle text",
        buttonText: "Action",
        mainImageUrl: "https://firebasestorage.googleapis.com/v0/b/gapdev2.appspot.com/o/customers%2FBansela%2FbsAppIconBig.png?alt=media&token=ad921ee0-6925-4804-a1f0-60dd0a5096df",
        status: "string",
        description: "string"
      }
    }

    // make request to login user
    this._notificationService.create(request).then(response => {

      console.log('@@@ response ==> ', response);
      this.successMsg = "Notification is being processed.";
      this.isLoading = false;

    }).catch(error => {

      console.log('@@@ error ==> ', error);
      console.log('@@@ error message ==> ', error.error.error.message);
      let errMsg = error.error.error.message == null ? 'Oop, something went wrong' : error.error.error.message;

      this.errorMsg = errMsg;
      this.isLoading = false;
    });
  }
}
