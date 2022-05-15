var login = document.getElementById('login');
var signup = document.getElementById('signup');
var btn = document.getElementById('btn');
var btnLogin = document.getElementById('btn-login');
var btnSignup = document.getElementById('btn-signup');
var auth = firebase.auth()
var loginWithGoogle = document.getElementById("login-with-google");
var simpleSignup = document.getElementById('simple-signup');
var nameBar = document.getElementById('name');
var emailBar = document.getElementById('email');
var passBar = document.getElementById('pass');
var checkBox2 = document.getElementById('check-box-2');
var emailLogin = document.getElementById("email-login");
var passLogin = document.getElementById("pass-login");
var checkBox1 = document.getElementById('check-box-1');
var simpleLogin = document.getElementById("simple-login");

btnLogin.addEventListener( "click" , (e) => {
    login.style.left='50px';
	signup.style.left='450px';
	btn.style.left='0px';
});

btnSignup.addEventListener( "click" , (e) => {
    login.style.left='-400px';
	signup.style.left='50px';
	btn.style.left='110px';
});

var modal = document.getElementById('login-form');
        
window.onclick = function(event) 
{
    if (event.target == modal) 
    {
        modal.style.display = "none";
    }
}

loginWithGoogle.addEventListener('click', (e) => {
    e.preventDefault()
    loginWithGoogle();
})

simpleSignup.addEventListener('click', (e) => {
    e.preventDefault()
    SignUp(nameBar.value,emailBar.value,passBar.value);
})

simpleLogin.addEventListener('click', (e) => {
    e.preventDefault()
    LoginWithEmailPass(emailLogin.value,passLogin.value);
})

emailLogin.addEventListener("keydown", (e) => {
    document.getElementById('email-login-label').style.display = "none"
})

passLogin.addEventListener("keydown", (e) => {
    document.getElementById('pass-login-label').style.display = "none"
})

emailBar.addEventListener("keydown", (e) => {
    document.getElementById('email-label').style.display = "none"
})

passBar.addEventListener("keydown", (e) => {
    document.getElementById('pass-label').style.display = "none"
})

var loginWithGoogle = async () => {
    try {
      var provider = new firebase.auth.GoogleAuthProvider();
      let userData = await auth.signInWithPopup(provider);
      userData = userData.user;
      var myData = {
        image: userData.photoURL,
        email: userData.email,
        name: userData.displayName,
        uid : userData.uid
    }
  
    localStorage.setItem('auth', "")
    location.assign('./index.html')

    console.log(myData);
    return myData;
    } catch (err) {
      console.log(err)
    }
}


var SignUp = async (name, email, pass) => {
    try {
        var result = await auth.createUserWithEmailAndPassword(email, pass);
        console.log(result)
        nameBar.value = ""
        emailBar.value = ""
        passBar.value = ""
        checkBox2.checked = false

        location.assign('./index.html')

    } catch (error) {
        console.log(error.code)
        if (error.code === "auth/invalid-email") {
            document.getElementById('email-label').style.display = "inline"
        }
        if (error.code === "auth/weak-password") {
            document.getElementById('pass-label').style.display = "inline"
        }
    }
}

var LoginWithEmailPass = async (email,pass) => {
    try {
        var data = await auth.signInWithEmailAndPassword(email, pass)
        console.log(data)
        emailLogin.value = ""
        passLogin.value = ""
        checkBox1.checked = false

        location.assign('./index.html')

    } catch (error) {
        console.log(error.code)
        if (error.code === "auth/invalid-email") {
            document.getElementById('email-login-label').style.display = "inline"
        }  
        if (error.code === "auth/wrong-password") {
            document.getElementById('pass-login-label').style.display = "inline"
        }  
    }
}

// var SignOut = async () => {
//     try {
//         var data = await auth.SignOut();
//         localStorage.removeItem("auth");
//     } catch (error) {
//         console.log(error)
//     }
// }