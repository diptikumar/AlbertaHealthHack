//code for arrow back button
function back() {
    window.history.back();
}

function verifyEmail() {
    const email = document.getElementById("email").ariaValueMax;
    const password = document.getElementById("password").value;

    if (email === 'dipti1kumar@gmail.com') {
        window.location.href = 'volunteer/volunteerVerified.html';
    } else {
       window.location.href = 'volunteer/volunteerNotVerified.html';
    }

}

//code for the skills progress section