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
            // Handle error here (e.g., display a user-friendly message)
        });
}

// Display job details in the results container
function displayJobDetails(jobs) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ''; // Clear previous results

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
    });
}

// Display job roles when "View Job Roles" button is clicked
function viewJobRoles(description) {
    // You can replace this with your desired way of displaying the description
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
    // Your submission logic goes here

    // Display success message
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';

    // Close the application form after 2 seconds
    setTimeout(closeApplicationForm, 2000);
}

// Close the application form
function closeApplicationForm() {
    const applicationFormModal = document.getElementById('applicationFormModal');
    applicationFormModal.style.display = 'none';
}

// Reset the application form
function resetApplicationForm() {
    // Reset the form fields to their default values
    document.getElementById('first_name').value = '';
    document.getElementById('last_name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';

    // Clear the success message
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'none';
}

document.getElementById('submit').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the form from submitting (default behavior)

    // You can add your logic for handling the form submission here

    // Show the success message
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';

    // Close the form after 2 seconds (2000 milliseconds)
    setTimeout(closeApplicationForm, 2000);
});
