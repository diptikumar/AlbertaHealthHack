//code for arrow back button
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

function saveLog() {
    // Get the form values
    const activity = document.getElementById('activity').value;
    const mood = document.getElementById('mood').value;
    const achievement = document.getElementById('achievement').value;
    const challenges = document.getElementById('challenges').value;
    const comments = document.getElementById('comments').value;

    // Save the values to localStorage
    localStorage.setItem('log-activity', activity);
    localStorage.setItem('log-mood', mood);
    localStorage.setItem('log-achievement', achievement);
    localStorage.setItem('log-challenges', challenges);
    localStorage.setItem('log-comments', comments);

    // Redirect to the daily log page
    window.location.href = 'dailyLog.html';
}

function displayLog() {
    // Get the stored values from localStorage
    const activity = localStorage.getItem('log-activity');
    const mood = localStorage.getItem('log-mood');
    const achievement = localStorage.getItem('log-achievement');
    const challenges = localStorage.getItem('log-challenges');
    const comments = localStorage.getItem('log-comments');

    // Display the values on the daily log page
    document.getElementById('log-activity').innerText = activity;
    document.getElementById('log-mood').innerText = mood;
    document.getElementById('log-achievement').innerText = achievement;
    document.getElementById('log-challenges').innerText = challenges;
    document.getElementById('log-comments').innerText = comments;
}

// Call displayLog when the daily log page loads
if (window.location.pathname.endsWith('dailyLog.html')) {
    displayLog();
}