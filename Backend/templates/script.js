document.getElementById('volunteerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const bio = document.getElementById('bio').value;
    const disability = document.getElementById('disability').value;

    // Retrieve the existing profiles from localStorage
    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];

    // Create a new profile object
    const newProfile = {
        name: name,
        bio: bio,
        disability: disability
    };

    // Add the new profile to the list of profiles
    profiles.push(newProfile);

    // Save the updated profiles back to localStorage
    localStorage.setItem('profiles', JSON.stringify(profiles));

    // Log to confirm storage
    console.log('Stored profiles:', profiles);

    // Display a success message
    document.getElementById('responseMessage').textContent = 'Profile created successfully!';

    // Optionally, clear the form fields after submission
    document.getElementById('volunteerForm').reset();
});

// Function to search volunteers based on disability
function searchVolunteers() {
    const disability = document.getElementById('searchInput').value.trim().toLowerCase();
    
    // Retrieve the stored profiles from localStorage
    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];

    // Filter profiles based on the entered disability
    const matchingProfiles = profiles.filter(profile => profile.disability.toLowerCase().includes(disability));

    // Get the results container
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (matchingProfiles.length > 0) {
        matchingProfiles.forEach(profile => {
            const profileDiv = document.createElement('div');
            profileDiv.className = 'volunteer-profile';
            profileDiv.innerHTML = `
                <h3>Volunteer Profile</h3>
                <p><strong>Name:</strong> ${profile.name}</p>
                <p><strong>Bio:</strong> ${profile.bio}</p>
                <p><strong>Disability:</strong> ${profile.disability}</p>
            `;
            resultsDiv.appendChild(profileDiv);
        });
    } else {
        resultsDiv.innerHTML = '<p>No volunteers found for the specified disability.</p>';
    }
}
