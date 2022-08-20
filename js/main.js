let form;
let name;
let email;
let password;
let user;

function SignUp(name,email,password){
	this.name = name;
	this.email = email;
	this.password = password;
}	

function addUser(){
    form = document.getElementById("signUp");
    name = form.elements['name'];
    email = form.elements['email'];
    password = form.elements['password'];
    verifiedEmail = ifEmailExistInDB(email.value);
    if(verifiedEmail){
        user = new SignUp(name.value, email.value, password.value);
        addToLocalStorage(user, email.value);
    } else {
        alert("email already exist");
    }
}

function addToLocalStorage(user, motCle){
    localStorage.setItem(motCle , JSON.stringify(user));
}

function ifEmailExistInDB(emailToVerify){
    let key;
    let isUnique = true;
    for(let i = 0; i < localStorage.length; i++){
        key = localStorage.key(i);
        if(emailToVerify == key){
            isUnique = false;
        }
    }
    return isUnique;
}

function lockRepeatPassword(){
    checkPassword = document.getElementById("signUp").elements['password'].value;
    inputRepeatPassword = document.getElementById("form3Example4cd");
    if(checkPassword.length == 0){
        inputRepeatPassword.disabled = true;
        inputRepeatPassword.value = "";
        inputRepeatPassword.style.borderColor = "";
    } else {
        inputRepeatPassword.disabled = false;
    }
}

function isPasswordTheSame(){
    passwordBox = document.getElementById("signUp").elements['password'].value;
    repeatPassword = document.getElementById("signUp").elements['repeatPassword'].value;
    if(repeatPassword.length == 0) {
        document.getElementById("form3Example4cd").style.borderColor = "";
    } else if(passwordBox != repeatPassword){
            document.getElementById("form3Example4cd").style.borderColor = "red";
    } else {
        document.getElementById("form3Example4cd").style.borderColor = "green";
    }
}

function passwordFormat(){
    let passwordBox = document.getElementById("signUp").elements['password'].value;
    let formatIcons = document.getElementsByClassName("icons");
    if(hasLowerCase(passwordBox)){
        formatIcons[0].classList.remove("fa-square-xmark");
        formatIcons[0].classList.add("fa-square-check");
    } else{
        formatIcons[0].classList.remove("fa-square-check");
        formatIcons[0].classList.add("fa-square-xmark");
    }
    if(hasUpperCase(passwordBox)){
        formatIcons[1].classList.remove("fa-square-xmark");
        formatIcons[1].classList.add("fa-square-check");
    } else{
        formatIcons[1].classList.remove("fa-square-check");
        formatIcons[1].classList.add("fa-square-xmark");
    }
    if(hasNumber(passwordBox)){
        formatIcons[2].classList.remove("fa-square-xmark");
        formatIcons[2].classList.add("fa-square-check");
    } else{
        formatIcons[2].classList.remove("fa-square-check");
        formatIcons[2].classList.add("fa-square-xmark");
    }
    if(hasSpecialChar(passwordBox)){
        formatIcons[3].classList.remove("fa-square-xmark");
        formatIcons[3].classList.add("fa-square-check");
    } else{
        formatIcons[3].classList.remove("fa-square-check");
        formatIcons[3].classList.add("fa-square-xmark");
    }
    if(hasTheRequiredLength(passwordBox)){
        formatIcons[4].classList.remove("fa-square-xmark");
        formatIcons[4].classList.add("fa-square-check");
    } else{
        formatIcons[4].classList.remove("fa-square-check");
        formatIcons[4].classList.add("fa-square-xmark");
    }
}

function hasLowerCase(str) {
    return str.toUpperCase() != str;
}

function hasUpperCase(str) {
    return str.toLowerCase() != str;
}

function hasNumber(str) {
    return /\d/.test(str);
}

function hasSpecialChar(str) {
    return /[~`!@#$%\^.&*+=\-\[\]\\';,/{}|\\":<>\?]/.test(str);
}

function hasTheRequiredLength(str) {
    return str.length >= 8 && str.length <= 12;
}