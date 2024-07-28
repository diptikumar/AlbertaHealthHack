document.addEventListener('DOMContentLoaded', function() {
    // Function to search volunteers based on disability type
    function searchVolunteers() {
        const disability = document.getElementById('searchInput').value.toLowerCase();

        axios.get(`/search_volunteers?disability=${disability}`)
            .then(response => {
                const results = response.data;
                const resultsDiv = document.getElementById('results');
                resultsDiv.innerHTML = ''; // Clear previous results

                if (results.length > 0) {
                    // Loop through each volunteer and create a div to display their information
                    results.forEach(volunteer => {
                        const volunteerDiv = document.createElement('div');
                        volunteerDiv.className = 'volunteer-profile';
                        volunteerDiv.innerHTML = `
                            <h3>${volunteer.name}</h3>
                            <p><strong>Bio:</strong> ${volunteer.bio}</p>
                            <p><strong>Disability Type:</strong> ${volunteer.disability}</p>
                            <p><strong>Hobbies:</strong> ${volunteer.hobbies || 'N/A'}</p>
                        `;
                        resultsDiv.appendChild(volunteerDiv);
                    });
                } else {
                    resultsDiv.innerHTML = '<p>No volunteers found for the specified disability.</p>'; // Display message if no volunteers found
                }
            })
            .catch(error => {
                console.error('Error fetching volunteers:', error);
                document.getElementById('results').innerHTML = '<p>Error fetching volunteers. Please try again later.</p>'; // Display error message
            });
    }

    // Attach the search function to the global scope so it can be called from the HTML
    window.searchVolunteers = searchVolunteers;
});

