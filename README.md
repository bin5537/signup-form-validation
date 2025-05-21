# signup-form-validation

회원가입에서 사용되는 유효성 검사 코드입니다. (사용방법: 3가지)

- 아이디 (`id`)
- 비밀번호 (`password`)
- 비밀번호 확인 (`passwordCheck`)

입력값이 변경될때마다 `oninput`을 이용하여 `signUpCheck()` 함수가 호출되도록 제작하였습니다.

```js
// signUpCheck 함수 선언 (input: 입력요소, type: 입력란 타입)
function signUpCheck(input, type) {}

let regex = "";     // 사용할 정규식 변수선언
let errMsg = "";    // 에러 메시지 변수 선언
// 에러 메시지 표시할 요소
const errMsgContent = input.previousElementSibling.querySelector(".errorMsg");

// 입력 요소의 값이 비어있는 경우
if (input.value.length === 0) {
    // 에러메시지 공백으로 설정 후 함수 종료
    errMsgContent.textContent = ""; 
    return;
} 

// 타입에 따라 실행 (id, password, passwordCheck)
if (type === "id") {
    regex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,14}$/;
    errMsg = "6~14자의 영문과 숫자를 포함해야 합니다.";
} else if (type === "password") {
    regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{12,20}$/;
    errMsg = "12~20자의 영문, 숫자, 특수문자를 포함해야 합니다.";
} else if (type === "passwordCheck") {
    // 비밀번호 input 요소
    const pwdInput = input.parentElement.previousElementSibling.querySelector("input");
    // 삼항 연산자로 비밀번호 불일치시 메시지, 아니면 공백 표시 후 함수 종료
    errMsgContent.textContent = input.value !== pwdInput.value ? "비밀번호가 일치하지 않습니다." : "";
    return;
}

// 정규식 검사 실패시 에러메시지, 아니면 공백
if (!regex.test(input.value)) {
    errMsgContent.textContent = errMsg;
} else {
    errMsgContent.textContent = "";
}
```

## 정규식 설명

### 아이디
```js
/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,14}$/
```
- 영문 `a~z`, `A~Z` 하나 이상 포함
- 숫자 `0~9` 하나 이상 포함
- 영문과 숫자를 이용하여 6~14자 사이

### 비밀번호
```js
/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{12,20}/
```
- 영문 `a~z`, `A~Z` 하나 이상 포함
- 숫자 `0~9` 하나 이상 포함
- 특수문자 `!@#$%^&*` 하나 이상 포함
- 영문, 숫자, 특수문자를 이용하여 12~20자 사이

### 비밀번호 확인
```js
errMsgContent.textContent = input.value !== pwdInput.value ? "비밀번호가 일치하지 않습니다." : "";
```
- 비밀번호 입력란과, 비밀번호 확인 입력란의 값이 일치한지 확인

