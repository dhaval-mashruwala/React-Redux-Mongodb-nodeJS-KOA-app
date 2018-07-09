
  export const lettersOnly = (event) => {
      let charCode = event.which;
      ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8) || event.preventDefault();
  }

  export const numbersOnly = (event) => {
      let charCode = event.which;
      !((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8) || event.preventDefault();
  }

  export const displayError = (event,isValid) => {
      if(!isValid && event.currentTarget.className.indexOf('form-control-error')== -1){
        event.currentTarget.className+=' form-control-error';
        return false;
      }
      if(isValid){
        event.currentTarget.classList.remove('form-control-error');
        return true;
      }
  }
