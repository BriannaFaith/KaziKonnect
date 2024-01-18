document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('jobSearchForm');
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      searchJobs();
    });

    async function searchJobs() {
      const jobTitle = document.getElementById('title').value;
      const location = document.getElementById('location').value;

      try {
        const response = await fetch(`http://localhost:3000/jobs`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jobs = await response.json();

        // Filter jobs based on user input
        const filteredJobs = jobs.filter(job => {
          const titleMatch = job.title.toLowerCase().includes(jobTitle.toLowerCase());
          const locationMatch = job.location.toLowerCase().includes(location.toLowerCase());
          return titleMatch && locationMatch;
        });

        displayJobs(filteredJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    }

    function displayJobs(jobs) {
      const resultsContainer = document.getElementById('resultsContainer');
      resultsContainer.innerHTML = '';

      if (jobs.length > 0) {
        jobs.forEach(job => {
          const jobElement = document.createElement('div');
          jobElement.innerHTML = `
            <strong>Title:</strong> ${job.title}<br>
            <strong>Company:</strong> ${job.company}<br>
            <button class="btn" onclick="viewJobRoles('${job.description}')">View Job Roles</button>
            <hr>`;

          resultsContainer.appendChild(jobElement);
        });
      } else {
        console.log('No jobs found.');
      }
    }

    function viewJobRoles(description) {
      // Display job description when "View Job Roles" button is clicked
      alert(description); // You can replace this with your desired way of displaying the description
    }
  });








  document.addEventListener('DOMContentLoaded', function () {
    //
    function handleFormSubmit(event) {
        event.preventDefault(); // Prevent the form from submitting in the traditional way
        searchJobs();
    }
    const form = document.getElementById('jobSearchForm'); // Replace 'yourFormId' with the actual ID of your form
    form.addEventListener('submit', handleFormSubmit);


function searchJobs(){
    console.log('Searching for jobs...')

    const jobTitle= document.getElementById('title').value;
    const location= document.getElementById('location').value;

    const options = {
        method: 'GET',
        url: 'http://localhost:3000/',
        params: {
          query: "title",
          location: "location ",
          distance: '1.0',
          language: 'en_GB',
          remoteOnly: 'false',
          datePosted: 'month',
          employmentTypes: 'fulltime;parttime;intern;contractor',
          index: '0'
        },
        headers: {
          'X-RapidAPI-Key': 'f6efd5410fmsh339842a87e3c8c6p177220jsn2c023beef688',
          'X-RapidAPI-Host': 'jobs-api14.p.rapidapi.com'
        }
      };
    axios.request(options)
    .then(response => {
        const jobs = response.data.jobs;

      // Check if there are jobs
      if (jobs && jobs.length > 0) {
        // Extracting only the title and company information
        const jobInfo = jobs.map(job => ({
          title: job.title,
          company: job.company,
          description: job.description
        }));

      // Display the extracted information
      displayJobs(jobInfo);
    } else {
        console.log('No jobs found.');
      }
    })
    .catch(error => {
      console.error('Error fetching jobs:', error);
    });
}

  function displayJobs(jobs) {
    const resultsContainer = document.getElementById('resultsContainer');

    // Clear existing content
    resultsContainer.innerHTML = '';

    // Display extracted information
    jobs.forEach(job => {
      const jobElement = document.createElement('div');
      jobElement.innerHTML = `
      <strong>Title:</strong> ${job.title}<br>
      <strong>Company:</strong> ${job.company}<br>
      <button class="btn" onclick="viewJobRoles('${job.description}')">View Job Roles</button>
      <hr>`;

      resultsContainer.appendChild(jobElement);
    });
  }
  function viewJobRoles(description) {
    // Display job description when "View Job Roles" button is clicked
    alert(description); // You can replace this with your desired way of displaying the description
  }
});