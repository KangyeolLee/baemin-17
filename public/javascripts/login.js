function Login($login) {
  this.$loginBtn = $login.querySelector(".login-submit");
  this.$loginForm = $login.querySelector('form.login-form')
  this.$emailInput = $login.querySelector(".email-input");
  this.$passwordInput = $login.querySelector(".password-input");
  this.$emailWarningMsg = $login.querySelector(".email-area .warning-message");
  this.$passwordWarningMsg = $login.querySelector(
    ".password-area .warning-message"
  );

  this.init = function () {
    this.$loginBtn.addEventListener("click", () => this.handleLogin());
  };

  this.handleLogin = function () {
    // api/signin 으로 로그인 요청 전송
    // 쿠키와 세션을 이용해 사용자 인증 처리
    const userEmail = this.$emailInput.value;
    const userPassword = this.$passwordInput.value;

    const isValid = this.checkInputHasValue(userEmail, userPassword);

    if (!isValid) {
      return;
    }

    this.$loginForm.submit();
  };

  this.checkInputHasValue = function (userEmail, userPassword) {
    const hasUserEmail = this.toggleEmailWarningMessage(userEmail);
    const hasUserPassword = this.togglePasswordWarningMessage(userPassword);

    if (!hasUserEmail || !hasUserPassword) {
      return false;
    }

    return true;
  };

  this.hideLoginErrorMessage = function () {
    const $serverErrorMessage = $login.querySelector(".login-error-message");

    if ($serverErrorMessage) {
      $serverErrorMessage.style.display = "none";
    }
  };

  this.toggleEmailWarningMessage = function (userEmail) {
    if (!userEmail) {
      this.$emailWarningMsg.style.display = "block";
      this.$emailInput.style.borderBottomColor = "red";
      this.hideLoginErrorMessage();
      return false;
    }

    this.$emailWarningMsg.style.display = "none";
    this.$emailInput.style.borderBottomColor = "#d7d7d7";
    return true;
  };

  this.togglePasswordWarningMessage = function (userPassword) {
    if (!userPassword) {
      this.$passwordWarningMsg.style.display = "block";
      this.$passwordInput.style.borderBottomColor = "red";
      this.hideLoginErrorMessage();
      return false;
    }

    this.$passwordWarningMsg.style.display = "none";
    this.$passwordInput.style.borderBottomColor = "#d7d7d7";
    return true;
  };
}

const $login = document.getElementById("login-page");
const login = new Login($login);

login.init();
