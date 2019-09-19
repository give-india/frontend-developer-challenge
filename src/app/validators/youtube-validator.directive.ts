import {
  NG_VALIDATORS,
  FormControl,
  Validator,
  ValidatorFn
} from "@angular/forms";
import { Directive } from "@angular/core";

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: "[youtubeLinkValidator][ngModel]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: YoutubeValidatorDirective,
      multi: true
    }
  ]
})
export class YoutubeValidatorDirective {
  constructor() {}
  public validate(c: FormControl) {
    return this.youtubeLinkValidator(c);
  }
  youtubeLinkValidator(control: FormControl): ValidatorFn {
    let returnValue = null;
    const url = control.value;
    if (url) {
      const regExp = new RegExp(
        /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
      );
      const match = regExp.test(url);
      if (!match) {
        returnValue = { youtubeLinkValidator: { valid: false } };
      }
    } else {
      returnValue = null;
    }
    return returnValue;
  }
}
