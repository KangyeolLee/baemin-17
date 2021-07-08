function Agreement($agreement) {
  this.$inputWrapper = $agreement.querySelector(".input-wrapper");
  this.$allAgreeInput = $agreement.querySelector(".all-agree");
  this.$restAgreeInputs = $agreement.querySelectorAll(
    '.input-wrapper .rule-area input[type="checkbox"]'
  );
  this.$rulesAgreeInputs = $agreement.querySelectorAll(
    '.rule-area input[type="checkbox"]'
  );
  this.$mustSelectedInputs = $agreement.querySelectorAll(
    '.rule-area input[type="checkbox"].must-selected'
  );
  this.$nextBtn = $agreement.querySelector(".button");

  this.arrayRestAgreeInputs = Array.from(this.$restAgreeInputs);
  this.arrayMustSelectedInputs = Array.from(this.$mustSelectedInputs);

  // 가입약관 페이지 관련 초기화 메서드
  this.init = function () {
    this.$allAgreeInput.addEventListener("click", () => this.toggleCheckAll());
    this.$inputWrapper.addEventListener("click", () =>
      this.checkEveryRuleInput()
    );
    this.$nextBtn.addEventListener("click", () => this.moveNextPage());
  };

  // 전체동의 클릭 시 모든 약관 항목 체크 메서드
  this.toggleCheckAll = function () {
    if (this.$allAgreeInput.checked) {
      this.arrayRestAgreeInputs.forEach((input) => (input.checked = true));
    } else {
      this.arrayRestAgreeInputs.forEach((input) => (input.checked = false));
    }

    this.activeNextBtn();
  };

  // 전체동의 버튼 활성화 여부 체크 메서드
  this.checkEveryRuleInput = function () {
    const allChecked = this.arrayRestAgreeInputs.every(
      (input) => input.checked === true
    );

    if (!allChecked) {
      this.$allAgreeInput.checked = false;
    } else {
      this.$allAgreeInput.checked = true;
    }

    this.activeNextBtn();
  };

  // 다음 버튼 활성화 메서드
  this.activeNextBtn = function () {
    const allChecked = this.arrayMustSelectedInputs.every(
      (input) => input.checked === true
    );

    if (allChecked) {
      this.$nextBtn.classList.add("active");
    } else {
      this.$nextBtn.classList.remove("active");
    }
  };

  // 다음 페이지 경로 이동 메서드
  this.moveNextPage = function () {
    const activated = this.$nextBtn.className.includes("active");

    if (activated) {
      window.location.href = "/signup/phone";
    }
  };
}

const $agreement = document.getElementById("agreement-page");
const agreementPageInstance = new Agreement($agreement);

agreementPageInstance.init();
