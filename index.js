import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('password');
  const searchButton = document.querySelector('.relative button');
  const resultsContainer = document.getElementById('resultsContainer');

  searchButton.addEventListener('click', async () => {
    const keywords = searchInput.value.trim();

    if (keywords) {
      const options = {
        method: 'GET',
        url: 'https://rapid-linkedin-jobs-api.p.rapidapi.com/search-jobs',
        params: {
          keywords: 'keywords',
          locationId: '92000000',
          datePosted: 'anyTime',
          sort: 'mostRelevant'
        },
        headers: {
          'X-RapidAPI-Key': 'f6efd5410fmsh339842a87e3c8c6p177220jsn2c023beef688',
          'X-RapidAPI-Host': 'rapid-linkedin-jobs-api.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        resultsContainer.innerHTML = JSON.stringify(response.data, null, 2);
      } catch (error) {
        console.error(error);
      }
    }
  });
// function to display details of job search results
function displayResults(data) {
    const resultsContainer = document.getElementById('resultsContainer');

    // Clear previous results
    resultsContainer.innerHTML = '';

    // Display new results
    data.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.innerHTML = `
            <h3>${title}</h3>
            <p>${company}</p>
            <p>${location}</p>
            <button class="btn">View Job Roles</button>
            <button class="btn">Apply</button>
        `;
        resultsContainer.appendChild(jobElement);
    });
}

//[company image, job title,location, No of applicants]
//view job roles- button- click
//Apply Now- button - click

//Submit Application-click
function toggleForm() {
  const formContainer = document.getElementById("applicationForm");
  formContainer.style.display = formContainer.style.display === "none" ? "block" : "none";
}

const applyBtn = document.createElement('button');
applyBtn.classList.add('btn');
applyBtn.textContent = 'Apply Now';
applyBtn.addEventListener('click', () => {
  console.log('Apply Now clicked');
  toggleForm(); // Show the application form on Apply Now click
});

// Submit Application-click
function toggleForm() {
  var formContainer = document.getElementById("applicationForm");
  formContainer.style.display = formContainer.style.display === "none" ? "block" : "none";
}

// alert box - alerts the user upon successful application
function appliedSuccessfully() {
  console.log('Application submitted successfully')
  alert('Application submitted successfully!');
  toggleForm();
});