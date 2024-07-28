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
const skillsContainer = document.getElementById("skills");
const addSkillButton = skillsContainer.querySelector("addButton"); //get the first element with a class called addButton
//gets the skills from cloud storage: needed a bit of help from chat gpt
function getSkills(){
    return JSON.parse(localStorage.getItem("skills-notes") || "[]"); //stores notes in local storage or saves an empty array
}

//takes in array of notes and saves them to local storage
function saveSkills(skills){
    localStorage.setItem("skills-notes", JSON.stringify(skills)) //gets all notes that exist in local storage, adds new note to array, and adds it to local storage using saveSkills()
}

//creates a new text area (html element) that represents a new skill
function createNewSkill(id, content){
    const element = document.createElement("textarea");
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