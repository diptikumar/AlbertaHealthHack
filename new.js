let verifiedUsers = [];

function back() {
    window.history.back();
}

function verifyEmail() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === 'dipti1kumar@gmail.com') {
        window.location.href = 'volunteerVerified.html';
    } else {
        window.location.href = 'volunteerNotVerified.html';
    }

}