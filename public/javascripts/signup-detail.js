function SingupDetail($signupDetail) {
  const EMAIL_AREA = ".email-area";
  const NICKNAME_AREA = ".nickname-area";
  const PASSWORD_AREA = ".password-area";
  const BIRTH_AREA = ".birth-area";

  this.$userEmail = $signupDetail.querySelector(".user-email");
  this.$userNickname = $signupDetail.querySelector(".user-nickname");
  this.$userPassword = $signupDetail.querySelector(".user-password");
  this.$userBirth = $signupDetail.querySelector(".user-birth");
  this.$checkDuplicationBtn = $signupDetail.querySelector(".validate-btn");
  this.$completeBtn = document.querySelector(".complete-btn");
  this.$allInputs = $signupDetail.querySelectorAll("input");

  this.arrayAllInputs = Array.from(this.$allInputs);

  // 회원가입 상세 페이지 관련 초기화 메서드
  this.init = function () {
    this.arrayAllInputs.forEach((input) =>
      input.addEventListener("blur", () => this.checkAllInputsAsValid())
    );
    this.$checkDuplicationBtn.addEventListener("click", () =>
      this.handleClickDuplicateBtn()
    );
    this.$userNickname.addEventListener("change", () =>
      this.checkValidUserNickname()
    );
    this.$userPassword.addEventListener("change", () =>
      this.checkValidUserPassword()
    );
    this.$userBirth.addEventListener("change", () =>
      this.checkValidUserBirth()
    );
    this.$userBirth.addEventListener("input", () =>
      this.handleInputUserBirth()
    );
    this.$completeBtn.addEventListener("click", () =>
      this.handleClickCompleteBtn()
    );
  };

  // 완료 버튼 클릭 이벤트 콜백
  this.handleClickCompleteBtn = function () {
    if (!this.checkAllInputsAsValid()) {
      return;
    }

    // 회원가입 API 처리

    // 회원가입 전송 요청 서버로 성공적으로 전송 후 페이지 이동 (임시로 setTimeout 사용)

    setTimeout(() => (window.location.href = "/login"), 3000);
  };

  // 모든 입력값 재검증 후 결과에 따라 완료 버튼 활성화 메서드
  this.checkAllInputsAsValid = function () {
    this.validateAllInputs();

    const valid = this.arrayAllInputs.every(
      (input) => input.className.includes("valid") === true
    );

    if (!valid) {
      this.$completeBtn.classList.remove("active");
      return false;
    }

    this.$completeBtn.classList.add("active");
    return true;
  };

  // 경고 메시지 출력 없이 모든 입력값 재검증 메서드
  this.validateAllInputs = function () {
    this.checkValidEmailInput(false);
    this.checkValidUserNickname(false);
    this.checkValidUserPassword(false);
    this.checkValidUserBirth(false);
  };

  // 이메일 입력 click 이벤트 콜백
  this.handleClickDuplicateBtn = function () {
    if (!this.checkValidEmailInput()) {
      return;
    }

    this.showRestInputs();
  };

  // 유저 이메일 입력 유효값 인증 메서드
  this.checkValidEmailInput = function (flag = true) {
    const userEmail = this.$userEmail.value;

    if (!this.validateEmailForm(userEmail)) {
      this.inactivateCheckmark(EMAIL_AREA);
      flag && this.activateWarningMessage(EMAIL_AREA);
      this.$userEmail.classList.remove("valid");
      return false;
    }

    this.activateCheckmark(EMAIL_AREA);
    this.inactivateWarningMessage(EMAIL_AREA);
    this.$userEmail.classList.add("valid");
    return true;
  };

  // 유저 닉네임 입력 유효값 인증 메서드 (별도 검증 기능 구현 X)
  this.checkValidUserNickname = function (flag = true) {
    const userNickname = this.$userNickname.value;

    if (!userNickname) {
      this.inactivateCheckmark(NICKNAME_AREA);
      flag && this.activateWarningMessage(NICKNAME_AREA);
      this.$userNickname.classList.remove("valid");
      return;
    }

    this.activateCheckmark(NICKNAME_AREA);
    this.inactivateWarningMessage(NICKNAME_AREA);
    this.$userNickname.classList.add("valid");
  };

  // 유저 패스워드 입력 유효값 인증 메서드
  this.checkValidUserPassword = function (flag = true) {
    const userPassword = this.$userPassword.value;

    if (!this.validatePasswordForm(userPassword)) {
      this.inactivateCheckmark(PASSWORD_AREA);
      flag && this.activateWarningMessage(PASSWORD_AREA);
      this.$userPassword.classList.remove("valid");
      return;
    }

    this.activateCheckmark(PASSWORD_AREA);
    this.inactivateWarningMessage(PASSWORD_AREA);
    this.$userPassword.classList.add("valid");
  };

  // 유저 생년월일 입력 유효값 인증 메서드
  this.checkValidUserBirth = function (flag = true) {
    const userBirth = this.$userBirth.value;

    if (!this.validateBirthForm(userBirth)) {
      this.inactivateCheckmark(BIRTH_AREA);
      flag && this.activateWarningMessage(BIRTH_AREA);
      this.$userBirth.classList.remove("valid");
      return;
    }

    this.activateCheckmark(BIRTH_AREA);
    this.inactivateWarningMessage(BIRTH_AREA);
    this.$userBirth.classList.add("valid");
  };

  // 생년월일 입력 input 이벤트 콜백
  this.handleInputUserBirth = function () {
    const userBirth = this.$userBirth.value;

    const result = this.applyAutoFormatForBirth(userBirth);

    this.$userBirth.value = result;
  };

  // 유저 이메일 입력 정규식 검증 메서드
  this.validateEmailForm = function (userEmail) {
    const validEmailRegex = /^[^\s@]+@[^\s@]+$/;

    const result = validEmailRegex.test(userEmail);
    return result;
  };

  // 유저 패스워드 입력 정규식 검증 메서드
  this.validatePasswordForm = function (userPassword) {
    const validPasswordRegexForUpperAndNumber =
      /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()]{10,}$/;
    const validPasswordRegexForUpperAndLower =
      /^(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d!@#$%^&*()]{10,}$/;
    const validPasswordRegexForUpperAndSpecial =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{10,}$/;
    const validPasswordRegexForNumberAndLower =
      /^(?=.*\d)(?=.*[a-z])[A-Za-z\d!@#$%^&*()]{10,}$/;
    const validPasswordRegexForNumberAndSpecial =
      /^(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{10,}$/;
    const validPasswordRegexForLowerAndSpecial =
      /^(?=.*[a-z])(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{10,}$/;
    const validPasswordRegexForContinousNumbers =
      /012|123|234|345|456|567|678|789|987|876|765|654|543|432|321|210|(\d)\1{2}/;

    const validPasswordRegexs = [
      validPasswordRegexForUpperAndNumber,
      validPasswordRegexForUpperAndLower,
      validPasswordRegexForUpperAndSpecial,
      validPasswordRegexForNumberAndLower,
      validPasswordRegexForNumberAndSpecial,
      validPasswordRegexForLowerAndSpecial,
    ];

    const result =
      validPasswordRegexs.some((regex) => regex.test(userPassword) === true) &&
      !validPasswordRegexForContinousNumbers.test(userPassword);

    return result;
  };

  // 유저 생년월일 입력 정규식 검증 메서드
  this.validateBirthForm = function (userBirth) {
    const validBirth = userBirth.replace(/\s/g, "");
    const validBirthRegex = /\d{4}\.\d{2}\.\d{2}/;

    const result = validBirthRegex.test(validBirth);

    return result;
  };

  // 입력 시 자동으로 생년월일 포맷 변환 메서드
  this.applyAutoFormatForBirth = function (userBirth) {
    const regexForNotNumber = /\D\.$/;

    if (regexForNotNumber.test(userBirth)) {
      userBirth = userBirth.substr(0, userBirth.length - 3);
    }

    let values = userBirth.split(".").map((value) => value.replace(/\D/g, ""));

    if (values[1]) values[1] = this.checkBirthDate(values[1], 12);
    if (values[2]) values[2] = this.checkBirthDate(values[2], 31);

    const year = values[0].length === 4 ? values[0] + " . " : values[0];
    const dates = values
      .slice(1)
      .map((value, idx) =>
        value.length === 2 && idx < 2 ? value + " . " : value
      );

    const result = (year + dates.join("")).substr(0, 14);

    return result;
  };

  // max 값을 기준으로 (월/일) '0'을 날짜에 추가하는 메서드
  this.checkBirthDate = function (str, max) {
    if (+str > max) return str;

    if (str[0] !== "0" || str === "00") {
      let num = +str;
      if (isNaN(num) || num <= 0 || num > max) num = 1;
      str =
        num > +max.toString()[0] && num.toString().length === 1
          ? "0" + num
          : num.toString();
    }

    return str;
  };

  // 각 인풋 영역에 배치된 체크마크 활성화 메서드
  this.activateCheckmark = function (fieldArea) {
    const checkmarkSelector = fieldArea + " " + ".checkmark";
    const checkmark = $signupDetail.querySelector(checkmarkSelector);

    checkmark.classList.add("checked");
  };

  // 각 인풋 영역에 배치된 체크마크 비활성화 메서드
  this.inactivateCheckmark = function (fieldArea) {
    const checkmarkSelector = fieldArea + " " + ".checkmark";
    const checkmark = $signupDetail.querySelector(checkmarkSelector);

    checkmark.classList.remove("checked");
  };

  // 각 인풋 영역 아래 배치된 경고메시지 활성화 메서드
  this.activateWarningMessage = function (fieldArea) {
    const warningMessageSelector = fieldArea + " " + ".warning-message";
    const warningMessage = $signupDetail.querySelector(warningMessageSelector);

    warningMessage.style.display = "block";
  };

  // 각 인풋 영역 아래 배치된 경고메시지 비활성화 메서드
  this.inactivateWarningMessage = function (fieldArea) {
    const warningMessageSelector = fieldArea + " " + ".warning-message";
    const warningMessage = $signupDetail.querySelector(warningMessageSelector);

    warningMessage.style.display = "none";
  };

  // 나머지 인풋 요소 출력 메서드
  this.showRestInputs = function () {
    this.$userNickname.parentElement.style.display = "flex";
    this.$userPassword.parentElement.style.display = "flex";
    this.$userBirth.parentElement.style.display = "flex";
  };
}

const $signupDetail = document.getElementById("signup-detail-page");
const signupDetailPageInstance = new SingupDetail($signupDetail);

signupDetailPageInstance.init();