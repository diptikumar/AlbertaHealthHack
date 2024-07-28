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
       alert("Error! You are not verified. Contact Alberta Health Services Volunteer Department to volunteer.");
    }

}
//code for storing user credentials in sign up page
function storeInfo(event){
    event.preventDefault(); // Prevent form from submitting the traditional way: needed some help from chat gpt

    const email = document.getElementById('email').value; //get the value enetered in the email input box
    const pass = document.getElementById('password').value;
}

// code for daily logs
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
    // Redirect to dailyLog.html
    window.location.href = 'dailyLog.html';
}

function displayLogs() {
    const logs = JSON.parse(localStorage.getItem('logs')) || [];
    const logsContainer = document.getElementById('logsContainer');

    console.log('Logs retrieved:', logs);

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



function checkSamePass(){
    const newPassword = document.getElementById("newPassword").value;
    const newPassword2 = document.getElementById("newPassword2").value;

    if (newPassword === newPassword2) {
        alert("Password changed succesfully")
    } else {
        alert("Passwords do not match. Please try again.")
    }
}

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

