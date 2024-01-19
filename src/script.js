// Fetch data from the local JSON file
function fetchJobsData() {
    return fetch('http://localhost:3000/jobs')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching jobs:', error);
        });
}

// Display job details in the results container
function displayJobDetails(jobs) {
    const resultsContainer = document.getElementById('resultsContainer');
    const messageElement = document.getElementById('noJobsMessage');

    // Clear previous results
    resultsContainer.innerHTML = '';

    if (messageElement) {
        messageElement.style.display = 'none';

        if (jobs.length === 0) {
            // Display message when no jobs are found
            messageElement.style.display = 'block';
        }
    }

    if (jobs.length > 0) {
        jobs.forEach(job => {
            const jobElement = document.createElement('div');
            jobElement.classList.add('grid-item'); // Add grid-item class
            jobElement.innerHTML = `
                <h3>${job.title}</h3>
                <p>Company: ${job.company}</p>
                <p>Location: ${job.location}</p>
                <button class="btn" onclick="viewJobRoles('${job.description}')">View Job Roles</button>
                <button class="btn" onclick="showApplicationForm()">Apply</button>
            `;

            resultsContainer.appendChild(jobElement);
        });
    }
}

// Fetch jobs based on user input and display results
function searchJobs() {
    const jobTitle = document.getElementById('jobTitle').value;
    const location = document.getElementById('location').value;

    fetchJobsData().then(jobs => {
        // Filter jobs based on user input
        const filteredJobs = jobs.filter(job => {
            const titleMatch = job.title.toLowerCase().includes(jobTitle.toLowerCase());
            const locationMatch = job.location.toLowerCase().includes(location.toLowerCase());
            return titleMatch && locationMatch;
        });

        displayJobDetails(filteredJobs);

        // Clear the search input
        document.getElementById('jobTitle').value = '';
        document.getElementById('location').value = '';
    });
}

// Display job roles when "View Job Roles" button is clicked
function viewJobRoles(description) {
    alert(description);
}

// Show the application form when the "Apply" button is clicked
function showApplicationForm() {
    const applicationFormModal = document.getElementById('applicationFormModal');
    applicationFormModal.style.display = 'block';

    resetApplicationForm();
}

// Submit the application form
function submitApplication() {
    // Display success message
    const successModal = document.getElementById('successModal');
    successModal.style.display = 'block';

    // Close the application form after 2 seconds
    setTimeout(() => {
        successModal.style.display = 'none';
        closeApplicationForm();
    }, 2000);
}

// Close the application form
function closeApplicationForm() {
    const applicationFormModal = document.getElementById('applicationFormModal');
    applicationFormModal.style.display = 'none';

    resetApplicationForm();

    const successModal = document.getElementById('successModal');
    successModal.style.display = 'none';
}

// Reset the application form
function resetApplicationForm() {
    // Reset the form fields to their default values
    document.getElementById('first_name').value = '';
    document.getElementById('last_name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
}

// Uncomment the following lines to add the event listener for the submit button
document.getElementById('submit').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the form from submitting (default behavior)

    // You can add your logic for handling the form submission here

    // Show the success message
    const successModal = document.getElementById('successModal');
    successModal.style.display = 'block';

    // Close the form after 2 seconds (2000 milliseconds)
    setTimeout(closeApplicationForm, 2000);
});
