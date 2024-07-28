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
    const activity = document.getElementById('activity').value;
    const mood = document.getElementById('mood').value;
    const achievement = document.getElementById('achievement').value;
    const challenges = document.getElementById('challenges').value;
    const comments = document.getElementById('comments').value;
    const date = new Date().toISOString().split('T')[0];

    const log = {
        date: date,
        activity: activity,
        mood: mood,
        achievement: achievement,
        challenges: challenges,
        comments: comments
    };

    let logs = JSON.parse(localStorage.getItem('logs')) || [];
    logs.push(log);
    localStorage.setItem('logs', JSON.stringify(logs));

    alert('Log saved!');
    document.getElementById('logForm').reset();
}

function displayLogs() {
    const logs = JSON.parse(localStorage.getItem('logs')) || [];
    const logsContainer = document.getElementById('logsContainer');

    logsContainer.innerHTML = ''; // Clear previous logs
    logs.forEach(log => {
        const logDiv = document.createElement('div');
        logDiv.innerHTML = `
            <h2>${log.date} - Daily Log</h2>
            <p><strong>Activity:</strong> ${log.activity}</p>
            <p><strong>Mood/Health:</strong> ${log.mood}</p>
            <p><strong>Achievement/New Skill Learned:</strong> ${log.achievement}</p>
            <p><strong>Challenges:</strong> ${log.challenges}</p>
            <p><strong>General Comments:</strong> ${log.comments}</p>
            <hr>
        `;
        logsContainer.appendChild(logDiv);
    });
}

window.onload = displayLogs;