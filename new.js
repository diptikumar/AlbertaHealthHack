let credentialMap = {} //stores login info

//code for arrow back button
function back() {
    window.history.back();
}

function verifyEmail() {
    const email = document.getElementById("email").value;

    if (email === 'dipti1kumar@gmail.com') {
        window.location.href = 'volunteerVerified.html';
    } else {
       alert("Error! You are not verified. Contact Alberta Health Services Volunteer Department to volunteer.");
    }

}
//code for storing user credentials in sign up page

function signIn(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const email = document.getElementById('email').value.trim(); // Get the value entered in the email input box
    const pass = document.getElementById('password').value.trim();

    console.log('Email:', email);
    console.log('Password:', pass);

    // Retrieve the existing credentials from localStorage
    let credentials = localStorage.getItem('credentials');
    credentials = credentials ? JSON.parse(credentials) : {};

    if (!credentials[email]) {
        // Store the new credentials
        credentials[email] = pass;

        // Save the updated credentials back to localStorage
        localStorage.setItem('credentials', JSON.stringify(credentials));

        // Log to confirm storage
        console.log('Stored credentials:', credentials);

        // Navigate to the homepage after storing the credentials
        window.location.href = 'homepage.html';
    } else {
        alert("An account with this email address already exists");
    }
}

function login(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const email = document.getElementById('loginEmail').value.trim(); // Get the value entered in the email input box
    const pass = document.getElementById('loginPass').value.trim();

    console.log('Login Email:', email);
    console.log('Login Password:', pass);

    // Retrieve the stored credentials from localStorage
    const credentials = JSON.parse(localStorage.getItem('credentials')) || {};

    // Log to confirm retrieval
    console.log('Retrieved credentials:', credentials);

    // Check if the entered email exists and the password matches
    if(!credentials[email] ){
        alert("An account with this email doesnt exist. Try signing up for an account.")
    }
    else if (credentials[email] && credentials[email] === pass) {
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
        displayLog(true); // Display the latest log on page load
        if (nextButton) nextButton.addEventListener('click', () => changeLog(1));
        if (prevButton) prevButton.addEventListener('click', () => changeLog(-1));
    }

    if (logForm) {
        document.querySelector('#logForm button').addEventListener('click', saveLog);
    }

    function saveLog(event) {
        event.preventDefault(); // Prevent form from submitting the traditional way
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

    function displayLog(isInitialLoad = false) {
        const logs = JSON.parse(localStorage.getItem('logs')) || [];
        if (logs.length === 0) {
            logsContainer.innerHTML = '<p>No logs available.</p>';
            if (nextButton) nextButton.disabled = true;
            if (prevButton) prevButton.disabled = true;
            return;
        }

        if (isInitialLoad) {
            currentLogIndex = logs.length - 1; // Show the latest log on initial load
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