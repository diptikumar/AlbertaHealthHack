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

//gets the skills from cloud storage: needed a bit of help from chat gpt
function getSkills(){

}

//takes in array of notes and saves them to local storage
function saveSkills(skills){

}

//creates a new html element that represents a new skill
function createNewSkill(id, content){

}

//allows us to add a new skill note to html and local storage
function addSkill() {

}

//updates skill note with new content
function updateSkill(id, newContent){

}

//deletes the note with a given id and html element
function deleteSkill(id, element){

}