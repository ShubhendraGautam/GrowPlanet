const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

function validatePhone(){
    var phone=document.getElementById("phone").value;
    var phone1=Number(phone);
    var n=phone.length;
    var v=Number.isInteger(phone1);
    
   
    if (v==false || n!=10){
        alert("Invalid Mobile number");
        return false;
    }
    
}


