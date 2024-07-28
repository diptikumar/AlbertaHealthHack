let credentialMap = {} //stores login info

//code for arrow back button
function back() {
    window.history.back();
}

function verifyEmail() {
    const email = document.getElementById("email").ariaValueMax;
    const password = document.getElementById("password").value;

    if (email === 'dipti1kumar@gmail.com') {
        window.location.href = 'volunteerVerified.html';
    } else {
       alert("Error! You are not verified. Contact Alberta Health Services Volunteer Department to volunteer.");
    }

}
//code for storing user credentials in sign up page
function signIn(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const email = document.getElementById('email').value; // Get the value entered in the email input box
    const pass = document.getElementById('password').value;

    // Retrieve the existing credentials from localStorage
    const credentials = JSON.parse(localStorage.getItem('credentials')) || {};

    // Store the new credentials
    credentials[email] = pass;

    // Save the updated credentials back to localStorage
    localStorage.setItem('credentials', JSON.stringify(credentials));

    // Navigate to the homepage after storing the credentials
    window.location.href = 'homepage.html';
}

function login(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const email = document.getElementById('loginEmail').value; // Get the value entered in the email input box
    const pass = document.getElementById('loginPass').value;

    // Retrieve the stored credentials from localStorage
    const credentials = JSON.parse(localStorage.getItem('credentials')) || {};

    // Check if the entered email exists and the password matches
    if (credentials[email] && credentials[email] === pass) {
        alert('Login successful!');
        window.location.href = 'homepage.html'; // Redirect to homepage
    } else {
        alert('Invalid email or password. Please try again.');
    }
}

// Code for daily logs
document.addEventListener("DOMContentLoaded", function() {
    const logsContainer = document.querySelector('#logsContainer');
    const logForm = document.querySelector('#logForm');
    const nextButton = document.querySelector('#nextButton');
    const prevButton = document.querySelector('#prevButton');

    let currentLogIndex = 0;

    if (logsContainer) {
        displayLog();
        if (nextButton) nextButton.addEventListener('click', () => changeLog(1));
        if (prevButton) prevButton.addEventListener('click', () => changeLog(-1));
    }

    if (logForm) {
        document.querySelector('#logForm button').addEventListener('click', saveLog);
    }

    function saveLog() {
        console.log("saveLog function called");

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

        console.log('Log saved:', log);
        console.log('All logs:', logs);

        alert('Log saved!');

        // Redirect to dailyLog.html
        window.location.href = 'dailyLog.html';
    }

    function displayLog() {
        const logs = JSON.parse(localStorage.getItem('logs')) || [];
        if (logs.length === 0) {
            logsContainer.innerHTML = '<p>No logs available.</p>';
            if (nextButton) nextButton.disabled = true;
            if (prevButton) prevButton.disabled = true;
            return;
        }

        logsContainer.innerHTML = ''; // Clear previous content

        const log = logs[currentLogIndex];
        const logDiv = document.createElement('div');
        logDiv.classList.add('log-entry');
        logDiv.innerHTML = `
            <h3>Date: ${log.date}</h3>
            <p>Activity: ${log.activity}</p>
            <p>Mood/Health: ${log.mood}</p>
            <p>Achievement/New Skill Learned: ${log.achievement}</p>
            <p>Challenges: ${log.challenges}</p>
            <p>Comments: ${log.comments}</p>
        `;
        logsContainer.appendChild(logDiv);

        if (prevButton) prevButton.disabled = currentLogIndex === 0;
        if (nextButton) nextButton.disabled = currentLogIndex === logs.length - 1;
    }

    function changeLog(direction) {
        const logs = JSON.parse(localStorage.getItem('logs')) || [];
        currentLogIndex += direction;
        currentLogIndex = Math.max(0, Math.min(currentLogIndex, logs.length - 1));
        displayLog();
    }
});


//code for the skills progress section
document.addEventListener('DOMContentLoaded', () => {
    const skillsContainer = document.getElementById("skills");
    const addSkillButton = skillsContainer.querySelector(".add-button");//get the first element with a class called add-button

    //gets the skills from cloud storage: needed a bit of help from chat gpt
    getSkills().forEach((skill) => {
        const skillElement = createNewSkill(skill.id, skill.content);
        skillsContainer.insertBefore(skillElement, addSkillButton);
    });

    addSkillButton.addEventListener("click", () => addSkill()); //when the button is clicked, add a new note

    //takes in array of notes and saves them to local storage
    function getSkills() {
        return JSON.parse(localStorage.getItem("stickynotes-skills") || "[]");//stores notes in local storage or saves an empty array
    }

    function saveSkills(skills) {
        localStorage.setItem("stickynotes-skills", JSON.stringify(skills));//gets all notes that exist in local storage, adds new note to array, and adds it to local storage using saveSkills()
    }

    //creates a new text area (html element) that represents a new skill
    function createNewSkill(id, content) {
        const element = document.createElement("textarea");

        element.classList.add("notes"); // Ensure the correct class is added
        element.value = content;
        element.placeholder = "Enter a new skill you learned today";

        element.addEventListener("change", () => {
            updateSkill(id, element.value);//pass in the new value as an argument
        });

        element.addEventListener("dblclick", () => {
            const confirmDelete = confirm("Are you sure you want to delete this note?");
            if(confirmDelete){
                deleteSkill(id, element) 
            }
        });

        return element;
    }

    //allows us to add a new skill note to html and local storage
    function addSkill() {
        const skills = getSkills();
        const skillObject = {
            id: Math.floor(Math.random() * 100000),  //create a random id for each note
            content: ""
        };

        const skillElement = createNewSkill(skillObject.id, skillObject.content);
        skillsContainer.insertBefore(skillElement, addSkillButton);

        skills.push(skillObject);
        saveSkills(skills);
    }

    //updates skill note with new content
    function updateSkill(id, newContent) {
        const skills = getSkills();
        const targetSkill = skills.filter((skill) => skill.id == id)[0]; //filters through the skills array to find the element with the given id

        targetSkill.content = newContent; //update contnet and save updated version to skills
        saveSkills(skills);
    }

    //deletes the note with a given id and html element
    function deleteSkill(id, element) {
        const skills = getSkills().filter((skill) => skill.id != id); //redefine skills with all the elements except the one with the id that we want to delete 

        saveSkills(skills);
        skillsContainer.removeChild(element); //remove the deleted element from local storage
    }
});

