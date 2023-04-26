let passVisible = () => {
    let showpassword = document.querySelector("#pass");
    if (showpassword.type === "password") {
      showpassword.type = "text";
    } else {
      showpassword.type = "password";
    }
  };
  
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
  let form = document.querySelector("form");
  form.addEventListener("input", (e) => {
    const { email, pass, cnfmpass } = form.elements;
    const formData = {
      email: email.value,
      pass: pass.value,
      cnfmpass: cnfmpass.value
    };
    let allPresent = true;
    for (let key in formData) {
      if (!formData[key]) {
        allPresent = false;
        break;
      }
    }
  
    const submitButton = document.querySelector("[type=submit]");
    const passwordsDontMatch = document.querySelector(".password-not-match");
    const invalidPasswordWarning = document.querySelector(
      ".invalid-password-warning"
    );
    const invalidEmailWarning = document.querySelector(".invalid-email-warning");
    const allIsWell = document.querySelector(".password-match");
  
    if (allPresent && formData.pass !== formData.cnfmpass) {
      submitButton.disabled = true;
      passwordsDontMatch.style.display = "block";
      invalidPasswordWarning.style.display = "none";
      invalidEmailWarning.style.display = "none";
      allIsWell.style.display = "none";
    }
    if (
      allPresent &&
      formData.pass === formData.cnfmpass &&
      !validate(passRegex, formData.pass)
    ) {
      passwordsDontMatch.style.display = "none";
      invalidEmailWarning.style.display = "block";
    }
    if (
      allPresent &&
      formData.pass === formData.cnfmpass &&
      validate(passRegex, formData.pass) &&
      validate(emailRegex, formData.email)
    ) {
      submitButton.disabled = false;
      passwordsDontMatch.style.display = "none";
      invalidPasswordWarning.style.display = "none";
      invalidEmailWarning.style.display = "none";
      allIsWell.style.display = "block";
    }
    if (formData.email && !validate(emailRegex, formData.email)) {
      submitButton.disabled = true;
      passwordsDontMatch.style.display = "none";
      invalidPasswordWarning.style.display = "none";
      invalidEmailWarning.style.display = "block";
      allIsWell.style.display = "none";
    } else if (formData.email && validate(emailRegex, formData.email)) {
      invalidEmailWarning.style.display = "none";
    }
    if (formData.pass && !validate(passRegex, formData.pass)) {
      submitButton.disabled = true;
      passwordsDontMatch.style.display = "none";
      invalidPasswordWarning.style.display = "block";
      invalidEmailWarning.style.display = "none";
      allIsWell.style.display = "none";
    } else if (formData.pass && validate(passRegex, formData.pass)) {
      invalidPasswordWarning.style.display = "none";
    }
  });
  
  const validate = (regex, value) => regex.test(value);
  