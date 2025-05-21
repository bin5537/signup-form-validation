function signUpCheck(input, type) {
    let regex = "";
    let errMsg = "";
    const errMsgContent = input.previousElementSibling.querySelector(".errorMsg");

    if (input.value.length === 0) {
        errMsgContent.textContent = "";
        return;
    } 

    if (type === "id") {
        regex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,14}$/;
        errMsg = "6~14자의 영문과 숫자를 포함해야 합니다.";
    } else if (type === "password") {
        regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{12,20}$/;
        errMsg = "12~20자의 영문, 숫자, 특수문자를 포함해야 합니다.";
    } else if (type === "passwordCheck") {
        const pwdInput = input.parentElement.previousElementSibling.querySelector("input");
        errMsgContent.textContent = input.value !== pwdInput.value ? "비밀번호가 일치하지 않습니다." : "";
        return;
    }

    if (!regex.test(input.value)) {
        errMsgContent.textContent = errMsg;
    } else {
        errMsgContent.textContent = "";
    }
}