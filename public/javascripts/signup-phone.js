(function() {
  function InputField($inputField, regex, type) {
    const cancelable = $inputField.classList.contains('cancelable');
  
    const $input = $inputField.querySelector('input');
    const $cancelButton = cancelable ? $inputField.querySelector('.cancel') : null;
  
    const handleFieldFocusChange = () => {
      $inputField.classList.add('focus');
    };

    this.disable = () => {
      $input.disabled = 'disabled'
    }

    this.validate = () => {
      if (regex && regex.constructor === RegExp) {
        if (!regex.test($input.value)) {
          $inputField.classList.remove('valid')
          $inputField.classList.add('invalid')
          if (this.oninvalid && this.oninvalid.constructor == Function) {
            this.oninvalid();
          }
          return false;
        }
        
        $inputField.classList.remove('invalid')
        $inputField.classList.add('valid')
        if (this.onvalid && this.onvalid.constructor == Function) {
          this.onvalid();
        }
        return true;
      }
    }

    this.setValue = (value) => {
      $input.value = value;
      this.validate();
    }

    this.onvalid = null;
    this.oninvalid = null;
  
    const handleInputChange = () => {
      this.validate(); 
      
    };
  
    const handleCancleButtonClick = () => {
      $input.value = '';
    };

    window.addEventListener('click', () => $inputField.classList.remove('focus'));
    $inputField.addEventListener('click', (e) => e.stopPropagation());
    $input.addEventListener('focus', handleFieldFocusChange);
    $input.addEventListener('change', handleInputChange);
    $cancelButton?.addEventListener('click', handleCancleButtonClick)

    if (type === 'phone') {
      $input.addEventListener('keydown', (e) => {
        // TODO: 숫자만 입력되게 코드 추가
        if (e.keyCode !== 8 && e.key !== '-' && ($input.value.length === 3 || $input.value.length === 8)) {
          $input.value += '-';
        }
      });
    }
  }
  
  function SignupPhone($page) {
    const PHONE_REGEX = /^010-\d{3,4}-\d{4}$/;
    const CERTIFICATION_REGEX = /^\d{4}$/;

    const $backButton = $page.querySelector('button.back');
    const $nextButton = $page.querySelector('button.next');
    const $phoneInputField = document.querySelector(".input-field[data-name='phone']");
    const phoneInputField = new InputField($phoneInputField, PHONE_REGEX, 'phone');
    const $phoneForm = $page.querySelector('form.phone');
    const $certificationNumberBlock = $page.querySelector('.certification-number');
    const $certInputField = document.querySelector(".input-field[data-name='certification']");
    const certInputField = new InputField($certInputField, CERTIFICATION_REGEX);
    const $resendNumberButton = $page.querySelector('button.resend-number');

    const fillRendomCertNumber = () => {
      certInputField.setValue('');
      setTimeout(() => {
        const number = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        certInputField.setValue(number);
      }, 2000);
    };

    const handleFormPhoneSubmit = (e) => {
      if (phoneInputField.validate()) {
        phoneInputField.disable();
        $phoneForm.querySelector("button[type='submit']").disabled = 'disabled';
        $certificationNumberBlock.style.display = 'flex';
        fillRendomCertNumber();
      }

      e.preventDefault();
    };

    $backButton.addEventListener('click', () => history.back());
    $nextButton.addEventListener('click', () => window.location.href = '/signup/detail');

    $phoneForm.addEventListener('submit', handleFormPhoneSubmit);
    $resendNumberButton.addEventListener('click', () => fillRendomCertNumber());

    certInputField.onvalid = () => {
      $nextButton.removeAttribute('disabled');
    };
    certInputField.oninvalid = () => {
      $nextButton.disabled = 'disabled';
    };
  }
  
  const signupPhone = new SignupPhone(document.querySelector('#signup-phone-page'));
})();
