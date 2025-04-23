document.addEventListener('DOMContentLoaded', function() {
  // Initialize charts
  initOutreachChart();
  initConditionsChart();

  // Sample school programs data
  const schoolProgramsData = {
    schoolsVisited: [
      { name: 'Mamelodi Primary School', city: 'Pretoria', visitedDate: '2024-08-15', rating: null },
      { name: 'Diepsloot Primary School', city: 'Johannesburg', visitedDate: '2024-11-20', rating: null },
      { name: 'Khayelitsha Primary School', city: 'Cape Town', visitedDate: '2025-02-28', rating: null }
    ],
    schoolsToVisit: [
      { name: 'TestSoweto Primary School', city: 'Johannesburg', plannedDate: '2025-06-15' },
      { name: 'Alexandra Primary School', city: 'Johannesburg', plannedDate: '2025-07-22' },
      { name: 'Durban Central Primary School', city: 'Durban', plannedDate: '2025-08-10' }
    ]
  };

  // Function to load school programs data
  function loadSchoolProgramsData() {
    const schoolProgramsSection = document.getElementById('schoolProgramsSection');
    schoolProgramsSection.style.display = 'block'; // Show school programs section

    const schoolsVisitedList = document.getElementById('schoolsVisitedList');
    schoolsVisitedList.innerHTML = ''; // Clear existing list
    schoolProgramsData.schoolsVisited.forEach(school => {
      const listItem = document.createElement('li');
      let ratingText = school.rating === null ? 'Not Rated' : `Rating: ${school.rating}/5`;
      listItem.textContent = `${school.name} - ${school.city} (Visited: ${school.visitedDate}) - ${ratingText}`;
      schoolsVisitedList.appendChild(listItem);
    });

    // Add star rating input for each school
    schoolsVisitedList.querySelectorAll('li').forEach((listItem, index) => {
      const ratingInput = document.createElement('input');
      ratingInput.type = 'number';
      ratingInput.min = '1';
      ratingInput.max = '5';
      ratingInput.value = schoolProgramsData.schoolsVisited[index].rating || ''; // Default value, or current rating
      ratingInput.classList.add('school-rating-input'); // Add class for styling
      listItem.appendChild(ratingInput);

      ratingInput.addEventListener('change', function() {
        schoolProgramsData.schoolsVisited[index].rating = parseInt(this.value);
        // Update displayed rating text
        let ratingText = schoolProgramsData.schoolsVisited[index].rating === null ? 'Not Rated' : `Rating: ${schoolProgramsData.schoolsVisited[index].rating}/5`;
        listItem.textContent = `${schoolProgramsData.schoolsVisited[index].name} - ${schoolProgramsData.schoolsVisited[index].city} (Visited: ${schoolProgramsData.schoolsVisited[index].visitedDate}) - ${ratingText}`;
      listItem.appendChild(ratingInput); // Re-append input after updating text, to ensure input is always last
      });
    });

    const schoolsToVisitList = document.getElementById('schoolsToVisitList');
    schoolsToVisitList.innerHTML = '';
    schoolProgramsData.schoolsToVisit.forEach(school => {
      const listItem = document.createElement('li');
      listItem.textContent = `${school.name} - ${school.city} (Planned: ${school.plannedDate})`;
      schoolsToVisitList.appendChild(listItem);
    });
  }

  // School Programs button click event
  const schoolProgramsButton = document.querySelector('.sidebar li:nth-child(3) a'); // Select School Programs button
  schoolProgramsButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior

    // Remove 'active' class from previously active item
    document.querySelector('.sidebar li.active').classList.remove('active');

    // Add 'active' class to school programs button's parent li
    schoolProgramsButton.closest('li').classList.add('active');

    // Hide other sections if necessary (e.g., metrics and charts)
    document.querySelector('.metrics-section').style.display = 'none';
    document.querySelector('.charts-section').style.display = 'none';
    document.querySelector('.activity-section').style.display = 'none';

    loadSchoolProgramsData();
  });

  // Analytics button click event
  const analyticsButton = document.getElementById('analyticsButton');
  analyticsButton.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default link behavior

      // Remove 'active' class from previously active item
      document.querySelector('.sidebar li.active').classList.remove('active');

      // Add 'active' class to analytics button's parent li
      analyticsButton.closest('li').classList.add('active');

      // Show metrics and charts, hide school programs
      document.querySelector('.metrics-section').style.display = 'flex'; // or block, depending on your layout
      document.querySelector('.charts-section').style.display = 'flex';
      document.querySelector('.activity-section').style.display = 'block';
      document.getElementById('schoolProgramsSection').style.display = 'none';


      loadAnalyticsData();
  });

  // Dashboard button click event (to reset to initial view)
  const dashboardButton = document.getElementById('dashboardButton');
  dashboardButton.addEventListener('click', function(event) {
      event.preventDefault();

      // Remove 'active' class from previously active item
      document.querySelector('.sidebar li.active').classList.remove('active');
      dashboardButton.closest('li').classList.add('active');

      // Show metrics and charts, hide school programs
      document.querySelector('.metrics-section').style.display = 'flex'; // or block
      document.querySelector('.charts-section').style.display = 'flex';
      document.querySelector('.activity-section').style.display = 'block';
      document.getElementById('schoolProgramsSection').style.display = 'none';
  });
});

// Sample analytics data
const analyticsData = {
    patientsServed: {
        labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'],
        data: [4500, 5200, 5800, 6500, 7200],
        detailedData: [
            { quarter: 'Q1 2024', value: 4500, description: 'Increased outreach in rural areas.' },
            { quarter: 'Q2 2024', value: 5200, description: 'Mobile clinic expansion.' },
            { quarter: 'Q3 2024', value: 5800, description: 'Summer school programs.' },
            { quarter: 'Q4 2024', value: 6500, description: 'Holiday campaigns.' },
            { quarter: 'Q1 2025', value: 7200, description: 'New partnerships with community centers.' }
        ]
    },
    schoolsReached: {
        labels: ['2021', '2022', '2023', '2024', '2025'],
        data: [120, 150, 180, 210, 240],
        detailedData: [
            { year: '2021', value: 120, description: 'Initial program launch.' },
            { year: '2022', value: 150, description: 'Expanded to new districts.' },
            { year: '2023', value: 180, description: 'Partnerships with education ministries.' },
            { year: '2024', value: 210, description: 'National coverage campaign.' },
            { year: '2025', value: 240, description: 'Focus on underserved communities.' }
        ]
    },
    preventiveTreatments: {
        labels: ['Jan-Mar', 'Apr-Jun', 'Jul-Sep', 'Oct-Dec'],
        data: [3000, 3500, 4000, 4500],
        detailedData: [
            { period: 'Jan-Mar', value: 3000, description: 'Focus on early childhood programs.' },
            { period: 'Apr-Jun', value: 3500, description: 'Increased mobile clinic deployments.' },
            { period: 'Jul-Sep', value: 4000, description: 'Back-to-school health drives.' },
            { period: 'Oct-Dec', value: 4500, description: 'Year-end health awareness campaigns.' }
        ]
    },
    teleConsultations: {
        labels: ['2023', '2024', '2025'],
        data: [1500, 2200, 3000],
        detailedData: [
            { year: '2023', value: 1500, description: 'Tele-dentistry service launch.' },
            { year: '2024', value: 2200, description: 'Expanded service availability.' },
            { year: '2025', value: 3000, description: 'Integration with national health platforms.' }
        ]
    },
    demographics: {
        labels: ['Children', 'Youth', 'Adults', 'Seniors'],
        data: [60, 25, 10, 5],
        colors: ['#5A80FF', '#315CBC', '#0077FF', '#FFF235'] // Example colors for demographics
    }
};

function loadAnalyticsData() {
    // Update metrics section with analytics data
    updateMetrics('Patients Served', analyticsData.patientsServed);
    updateMetrics('Schools Reached', analyticsData.schoolsReached);
    updateMetrics('Preventive Treatments', analyticsData.preventiveTreatments);
    updateMetrics('Tele-Consultations', analyticsData.teleConsultations);

    // Update charts with analytics data
    updateOutreachChart(analyticsData.patientsServed);
    updateConditionsChart(analyticsData.demographics.data, analyticsData.demographics.colors);
}

function updateOutreachChart(analyticsData) {
    const outreachChart = Chart.getChart('outreachChart');
    if (outreachChart) {
        outreachChart.data.labels = analyticsData.labels;
        outreachChart.data.datasets = [
            {
                label: 'Patients Served',
                data: analyticsData.data,
                backgroundColor: '#5A80FF',
                borderRadius: 5
            }
        ];
        outreachChart.options.plugins.title.text = 'Patients Served Over Quarters'; // Update chart title
        outreachChart.options.scales.y.title = {
            display: true,
            text: 'Number of Patients'
        }; // Add y-axis title
        outreachChart.update();
    }
}

function updateMetrics(metricName, data) {
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        if (card.querySelector('h3').textContent === metricName) {
            const valueElement = card.querySelector('.metric-value');
            valueElement.textContent = data.data[data.data.length - 1].toLocaleString(); // Display latest value with comma for thousands

            // Add detailed description as tooltip
            if (data.detailedData && data.detailedData.length > 0) {
                const latestData = data.detailedData[data.detailedData.length - 1];
                valueElement.setAttribute('title', `${latestData.description} Value: ${latestData.value}`); // More detailed tooltip
            }
        }
    });
}

function initOutreachChart() {
  const ctx = document.getElementById('outreachChart').getContext('2d');
  const outreachChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'], // Updated labels
          datasets: [
              {
                  label: 'Patients Served', // Changed label
                  data: analyticsData.patientsServed.data, // Updated data to analytics data
                  backgroundColor: '#5A80FF',
                  borderRadius: 10 // Increased borderRadius for styling
              }
          ]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
              legend: {
                  display: false // Hide legend as there's only one dataset
              },
              title: {
                  display: true,
                  text: 'Patients Served Over Quarters', // Updated title
                  font: {
                      size: 18 // Increased font size for title
                  }
              }
          },
          scales: {
              x: {
                  grid: {
                      display: false
                  },
                  title: {
                      display: true,
                      text: 'Quarter', // Added x-axis title
                      color: '#555'
                  }
              },
              y: {
                  beginAtZero: true,
                  grid: {
                      color: '#e1e5eb'
                  },
                  title: {
                      display: true,
                      text: 'Number of Patients', // Added y-axis title
                      color: '#555'
                  },
                  ticks: {
                      stepSize: 1000 // Example step size for y-axis
                  }
              }
          }
      }
  });
}

function initConditionsChart() {
  const ctx = document.getElementById('conditionsChart').getContext('2d');
  const conditionsChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
          labels: analyticsData.demographics.labels, // Updated labels to demographics
          datasets: [{
              data: analyticsData.demographics.data, // Updated data to demographics data
              backgroundColor: analyticsData.demographics.colors,
              borderWidth: 3, // Increased borderWidth for styling
              borderColor: '#F0F4F8' // Added borderColor to match background
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
              legend: {
                  position: 'bottom' // Changed legend position
              },
              title: {
                  display: true,
                  text: 'Patient Demographics', // Updated title
                  font: {
                      size: 18 // Increased font size for title
                  }
              }
          },
          cutout: '50%' // Reduced cutout for a thicker doughnut
      }
  });
}

// Add any additional interactive functionality here
