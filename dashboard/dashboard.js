document.addEventListener('DOMContentLoaded', function() {
  // Initialize charts
  initOutreachChart();
  initConditionsChart();
  
  // Initialize tab navigation
  initTabNavigation();
});

/**
 * Sets up the tab navigation functionality
 * - Adds click event listeners to all sidebar navigation items
 * - Handles active state for tabs and content
 */
function initTabNavigation() {
  // Get all navigation items from the sidebar
  const navItems = document.querySelectorAll('.sidebar li');
  
  // Add click event listeners to each navigation item
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Only proceed if we have a valid tab ID
      if (tabId) {
        // Remove active class from all sidebar items
        navItems.forEach(navItem => navItem.classList.remove('active'));
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // Switch to the corresponding tab content
        switchTab(tabId);
      }
    });
  });
}

/**
 * Switches to the selected tab with a smooth transition
 * @param {string} tabId - The ID of the tab to switch to
 */
function switchTab(tabId) {
  // Get all tab panes
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  // First, get the currently active tab
  const activeTab = document.querySelector('.tab-pane.active');
  
  // Get the tab we want to show
  const targetTab = document.getElementById(tabId);
  
  // Only proceed if we found both tabs and they're different
  if (activeTab && targetTab && activeTab !== targetTab) {
    // Remove active class from all tabs
    tabPanes.forEach(tab => tab.classList.remove('active'));
    
    // Add active class to target tab to make it visible
    targetTab.classList.add('active');
  }
}

/**
 * Initializes the Outreach Impact Chart
 */
function initOutreachChart() {
  const ctx = document.getElementById('outreachChart').getContext('2d');
  const outreachChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
              {
                  label: 'School Programs',
                  data: [12, 15, 8, 10, 14, 18],
                  backgroundColor: '#5A80FF',
                  borderRadius: 5
              },
              {
                  label: 'Community Workshops',
                  data: [8, 10, 12, 9, 11, 15],
                  backgroundColor: '#315CBC',
                  borderRadius: 5
              },
              {
                  label: 'Mobile Clinics',
                  data: [5, 7, 6, 8, 10, 12],
                  backgroundColor: '#0077FF',
                  borderRadius: 5
              }
          ]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
              legend: {
                  position: 'top',
              },
              tooltip: {
                  mode: 'index',
                  intersect: false,
              }
          },
          scales: {
              x: {
                  grid: {
                      display: false
                  }
              },
              y: {
                  beginAtZero: true,
                  grid: {
                      color: '#e1e5eb'
                  }
              }
          }
      }
  });
}

/**
 * Initializes the Oral Health Conditions Chart
 */
function initConditionsChart() {
  const ctx = document.getElementById('conditionsChart').getContext('2d');
  const conditionsChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
          labels: ['Cavities', 'Gum Disease', 'Tooth Loss', 'Other'],
          datasets: [{
              data: [45, 25, 15, 15],
              backgroundColor: [
                  '#5A80FF',
                  '#315CBC',
                  '#0077FF',
                  '#FFF235'
              ],
              borderWidth: 0
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
              legend: {
                  position: 'right',
              },
              tooltip: {
                  callbacks: {
                      label: function(context) {
                          return `${context.label}: ${context.raw}%`;
                      }
                  }
              }
          },
          cutout: '70%'
      }
  });
}

// Add this to your scriptD.js file
/**
 * Initialize the patient management functionality
 * - Set up modal opening/closing
 * - Handle form submissions
 * - Set up event listeners for table actions
 */
function initPatientsTab() {
    // Cache DOM elements
    const addPatientBtn = document.querySelector('.add-patient-btn');
    const patientFormModal = document.getElementById('patientFormModal');
    const patientDetailsModal = document.getElementById('patientDetailsModal');
    const deleteConfirmModal = document.getElementById('deleteConfirmModal');
    const closeModalBtns = document.querySelectorAll('.close-modal, .cancel-btn');
    const patientTable = document.querySelector('.patient-table tbody');
    const filterStatus = document.getElementById('filterStatus');

    // Setup event listeners for opening modals
    if (addPatientBtn) {
        addPatientBtn.addEventListener('click', () => {
            // Reset form for new patient
            document.getElementById('patientForm').reset();
            document.getElementById('modalTitle').textContent = 'Add New Patient';
            openModal(patientFormModal);
        });
    }

    // Setup table row action buttons
    if (patientTable) {
        patientTable.addEventListener('click', (e) => {
            // Get the patient ID from the closest row
            const row = e.target.closest('tr');
            if (!row) return;
            
            const patientId = row.dataset.patientId;
            
            // Handle view button
            if (e.target.closest('.view-btn')) {
                loadPatientDetails(patientId);
                openModal(patientDetailsModal);
            }
            
            // Handle edit button
            if (e.target.closest('.edit-btn')) {
                loadPatientForEditing(patientId);
                document.getElementById('modalTitle').textContent = 'Edit Patient';
                openModal(patientFormModal);
            }
            
            // Handle delete button
            if (e.target.closest('.delete-btn')) {
                document.getElementById('confirmDelete').dataset.patientId = patientId;
                openModal(deleteConfirmModal);
            }
        });
    }
    
    // Setup close buttons for all modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Setup form submission
    const patientForm = document.getElementById('patientForm');
    if (patientForm) {
        patientForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(patientForm);
            const patientData = Object.fromEntries(formData.entries());
            
            // Check if we're editing or adding a new patient
            const patientId = patientForm.dataset.patientId;
            
            if (patientId) {
                // Update existing patient
                updatePatient(patientId, patientData);
            } else {
                // Add new patient
                addNewPatient(patientData);
            }
            
            closeModal(patientFormModal);
        });
    }
    
    // Setup delete confirmation
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', () => {
            const patientId = confirmDeleteBtn.dataset.patientId;
            if (patientId) {
                deletePatient(patientId);
                closeModal(deleteConfirmModal);
            }
        });
    }
    
    // Setup filtering
    if (filterStatus) {
        filterStatus.addEventListener('change', () => {
            filterPatients(filterStatus.value);
        });
    }
    
    // Load initial patient data
    loadPatients();
}

/**
 * Open a modal dialog
 */
function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.classList.add('modal-open');
}

/**
 * Close a modal dialog
 */
function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

/**
 * Load all patients and populate the table
 */
function loadPatients() {
    // Simulate API call - replace with actual API call
    fetch('/api/patients')
        .then(response => response.json())
        .then(patients => {
            renderPatientTable(patients);
        })
        .catch(error => {
            showNotification('Error loading patients', 'error');
            console.error('Error loading patients:', error);
        });
}

/**
 * Render the patient table with data
 */
function renderPatientTable(patients) {
    const patientTable = document.querySelector('.patient-table tbody');
    if (!patientTable) return;
    
    patientTable.innerHTML = '';
    
    if (patients.length === 0) {
        patientTable.innerHTML = `
            <tr>
                <td colspan="7" class="no-data">No patients found</td>
            </tr>
        `;
        return;
    }
    
    patients.forEach(patient => {
        const row = document.createElement('tr');
        row.dataset.patientId = patient.id;
        
        // Format the date for display
        const registrationDate = new Date(patient.registrationDate);
        const formattedDate = registrationDate.toLocaleDateString();
        
        row.innerHTML = `
            <td>${patient.id}</td>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.gender}</td>
            <td>${formattedDate}</td>
            <td><span class="status-badge ${patient.status.toLowerCase()}">${patient.status}</span></td>
            <td class="actions">
                <button class="view-btn" title="View Details"><i class="fas fa-eye"></i></button>
                <button class="edit-btn" title="Edit Patient"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" title="Delete Patient"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        patientTable.appendChild(row);
    });
}

/**
 * Load patient details for viewing
 */
function loadPatientDetails(patientId) {
    // Simulate API call - replace with actual API call
    fetch(`/api/patients/${patientId}`)
        .then(response => response.json())
        .then(patient => {
            const detailsContainer = document.querySelector('#patientDetailsModal .patient-details');
            if (!detailsContainer) return;
            
            // Format the date for display
            const registrationDate = new Date(patient.registrationDate);
            const formattedDate = registrationDate.toLocaleDateString();
            
            detailsContainer.innerHTML = `
                <h3>${patient.name}</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="label">Patient ID:</span>
                        <span class="value">${patient.id}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Age:</span>
                        <span class="value">${patient.age}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Gender:</span>
                        <span class="value">${patient.gender}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Contact:</span>
                        <span class="value">${patient.contact}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Email:</span>
                        <span class="value">${patient.email}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Registration Date:</span>
                        <span class="value">${formattedDate}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Status:</span>
                        <span class="value status-badge ${patient.status.toLowerCase()}">${patient.status}</span>
                    </div>
                </div>
                <div class="detail-item full-width">
                    <span class="label">Medical History:</span>
                    <p class="value">${patient.medicalHistory || 'No medical history provided'}</p>
                </div>
            `;
        })
        .catch(error => {
            showNotification('Error loading patient details', 'error');
            console.error('Error loading patient details:', error);
        });
}

/**
 * Load patient data for editing
 */
function loadPatientForEditing(patientId) {
    // Simulate API call - replace with actual API call
    fetch(`/api/patients/${patientId}`)
        .then(response => response.json())
        .then(patient => {
            const form = document.getElementById('patientForm');
            if (!form) return;
            
            // Set form data attribute for update operation
            form.dataset.patientId = patient.id;
            
            // Populate form fields
            form.elements['name'].value = patient.name;
            form.elements['age'].value = patient.age;
            form.elements['gender'].value = patient.gender;
            form.elements['contact'].value = patient.contact;
            form.elements['email'].value = patient.email;
            form.elements['status'].value = patient.status;
            
            if (form.elements['medicalHistory']) {
                form.elements['medicalHistory'].value = patient.medicalHistory || '';
            }
        })
        .catch(error => {
            showNotification('Error loading patient for editing', 'error');
            console.error('Error loading patient for editing:', error);
        });
}

/**
 * Add a new patient
 */
function addNewPatient(patientData) {
    // Simulate API call - replace with actual API call
    fetch('/api/patients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patientData)
    })
        .then(response => response.json())
        .then(() => {
            loadPatients(); // Refresh the table
            showNotification('Patient added successfully', 'success');
        })
        .catch(error => {
            showNotification('Error adding patient', 'error');
            console.error('Error adding patient:', error);
        });
}

/**
 * Update an existing patient
 */
function updatePatient(patientId, patientData) {
    // Simulate API call - replace with actual API call
    fetch(`/api/patients/${patientId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patientData)
    })
        .then(response => response.json())
        .then(() => {
            loadPatients(); // Refresh the table
            showNotification('Patient updated successfully', 'success');
        })
        .catch(error => {
            showNotification('Error updating patient', 'error');
            console.error('Error updating patient:', error);
        });
}

/**
 * Delete a patient
 */
function deletePatient(patientId) {
    // Simulate API call - replace with actual API call
    fetch(`/api/patients/${patientId}`, {
        method: 'DELETE'
    })
        .then(() => {
            loadPatients(); // Refresh the table
            showNotification('Patient deleted successfully', 'success');
        })
        .catch(error => {
            showNotification('Error deleting patient', 'error');
            console.error('Error deleting patient:', error);
        });
}

/**
 * Filter patients by status
 */
function filterPatients(status) {
    // If "All" is selected, load all patients
    if (status === 'all') {
        loadPatients();
        return;
    }
    
    // Simulate API call - replace with actual API call
    fetch(`/api/patients?status=${status}`)
        .then(response => response.json())
        .then(patients => {
            renderPatientTable(patients);
        })
        .catch(error => {
            showNotification('Error filtering patients', 'error');
            console.error('Error filtering patients:', error);
        });
}

/**
 * Display a notification message
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="close-notification"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    // Add event listener to close button
    const closeBtn = notification.querySelector('.close-notification');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Initialize the patients tab when document is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.patients-tab')) {
        initPatientsTab();
    }
});

// Main JavaScript file for SmileConnect Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation functionality
    initTabNavigation();
    
    // Initialize charts
    initDashboardCharts();
    
    // Initialize patient management features
    initPatientManagement();
  });
  
  // Tab Navigation
  function initTabNavigation() {
    const navItems = document.querySelectorAll('.sidebar li');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        
        // Remove active class from all items
        navItems.forEach(nav => nav.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked item and corresponding tab
        this.classList.add('active');
        document.getElementById(tabId).classList.add('active');
      });
    });
  }
  
  // Dashboard Charts Initialization
  function initDashboardCharts() {
    // Create the outreach chart
    const outreachCtx = document.getElementById('outreachChart');
    if (outreachCtx) {
      new Chart(outreachCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'School Visits',
              data: [12, 15, 18, 22, 25, 30],
              borderColor: '#315cbc',
              backgroundColor: 'rgba(49, 92, 188, 0.1)',
              tension: 0.4,
              fill: true
            },
            {
              label: 'Mobile Clinics',
              data: [8, 10, 12, 15, 16, 18],
              borderColor: '#5a80ff',
              backgroundColor: 'rgba(90, 128, 255, 0.1)',
              tension: 0.4,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            },
            title: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  
    // Create the conditions chart
    const conditionsCtx = document.getElementById('conditionsChart');
    if (conditionsCtx) {
      new Chart(conditionsCtx, {
        type: 'doughnut',
        data: {
          labels: ['Caries', 'Healthy', 'Gingivitis', 'Malocclusion', 'Other'],
          datasets: [{
            data: [35, 40, 12, 8, 5],
            backgroundColor: [
              '#ff6b6b',
              '#51cf66',
              '#fcc419',
              '#339af0',
              '#adb5bd'
            ]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }
  }
  
  // Patient Management Features
  function initPatientManagement() {
    // Sample patient data
    const patientsData = [
      {
        id: 'P001', 
        name: 'Thabo Mokoena', 
        age: 8, 
        school: 'Mamelodi Primary', 
        grade: '3',
        lastVisit: '2025-06-12',
        status: 'pending',
        guardian: 'Martha Mokoena',
        contact: '072 123 4567',
        notes: 'Regular dental check-up required. Patient shows early signs of tooth decay on upper molars. Recommended fluoride treatment.',
        visits: [
          { date: '2025-06-12', title: 'Initial Screening', description: 'Dental examination performed. Treatment plan created.' },
          { date: '2025-06-20', title: 'Scheduled: Fluoride Treatment', description: 'First treatment appointment scheduled.', future: true }
        ],
        files: [
          { name: 'Initial_Assessment.pdf', type: 'file-medical' },
          { name: 'Dental_Xray.jpg', type: 'file-image' }
        ]
      },
      {
        id: 'P002', 
        name: 'Lerato Ndlovu', 
        age: 10, 
        school: 'Soweto Elementary', 
        grade: '5',
        lastVisit: '2025-06-10',
        status: 'in-progress',
        guardian: 'Thomas Ndlovu',
        contact: '083 456 7890', 
        notes: 'Filling completed on lower molar. Follow-up required for fluoride application and oral hygiene instruction.',
        visits: [
          { date: '2025-06-01', title: 'Initial Screening', description: 'Dental examination performed.' },
          { date: '2025-06-10', title: 'Filling Procedure', description: 'Filling completed on lower molar.' }
        ],
        files: [
          { name: 'Treatment_Plan.pdf', type: 'file-medical' }
        ]
      },
      {
        id: 'P003', 
        name: 'Nomsa Dlamini', 
        age: 7, 
        school: 'Diepsloot Primary', 
        grade: '2',
        lastVisit: '2025-06-05',
        status: 'completed',
        guardian: 'Sarah Dlamini',
        contact: '071 234 5678',
        notes: 'Full treatment completed. Regular check-ups recommended every 6 months.',
        visits: [
          { date: '2025-05-15', title: 'Initial Screening', description: 'Dental examination performed.' },
          { date: '2025-05-25', title: 'Cleaning', description: 'Dental cleaning and fluoride application.' },
          { date: '2025-06-05', title: 'Follow-up', description: 'All treatments completed. Given oral hygiene kit.' }
        ],
        files: [
          { name: 'Completion_Report.pdf', type: 'file-medical' },
          { name: 'Before_After.jpg', type: 'file-image' }
        ]
      },
      {
        id: 'P004', 
        name: 'Sipho Mabaso', 
        age: 9, 
        school: 'Alexandra Primary', 
        grade: '4',
        lastVisit: '2025-06-02',
        status: 'in-progress',
        guardian: 'John Mabaso',
        contact: '076 567 8901',
        notes: 'Needs orthodontic assessment. Currently undergoing initial treatment for tooth decay.',
        visits: [
          { date: '2025-05-20', title: 'Initial Screening', description: 'Dental examination performed.' },
          { date: '2025-06-02', title: 'First Treatment', description: 'Started treatment for decay.' },
          { date: '2025-06-25', title: 'Scheduled: Follow-up', description: 'Continue treatment.', future: true }
        ],
        files: [
          { name: 'Treatment_Plan.pdf', type: 'file-medical' }
        ]
      },
      {
        id: 'P005', 
        name: 'Lindiwe Khumalo', 
        age: 11, 
        school: 'Tembisa Elementary', 
        grade: '6',
        lastVisit: '2025-06-01',
        status: 'completed',
        guardian: 'Grace Khumalo',
        contact: '082 345 6789',
        notes: 'Treatment completed. Excellent oral hygiene observed.',
        visits: [
          { date: '2025-05-10', title: 'Initial Screening', description: 'Dental examination performed.' },
          { date: '2025-05-20', title: 'Treatment', description: 'Minor cleaning and fluoride application.' },
          { date: '2025-06-01', title: 'Final Check', description: 'Completed all treatments.' }
        ],
        files: [
          { name: 'Final_Report.pdf', type: 'file-medical' }
        ]
      },
      // Additional patients for pagination
      {
        id: 'P006', 
        name: 'Ayanda Nkosi', 
        age: 8, 
        school: 'Johannesburg Primary', 
        grade: '3',
        lastVisit: '2025-05-28',
        status: 'pending',
        guardian: 'Michael Nkosi',
        contact: '074 567 1234',
        notes: 'Needs comprehensive assessment.',
        visits: [
          { date: '2025-05-28', title: 'Initial Contact', description: 'Registration completed.' },
          { date: '2025-06-18', title: 'Scheduled: First Visit', description: 'Initial assessment scheduled.', future: true }
        ],
        files: []
      },
      {
        id: 'P007', 
        name: 'Itumeleng Mokwena', 
        age: 10, 
        school: 'Pretoria Elementary', 
        grade: '5',
        lastVisit: '2025-05-25',
        status: 'in-progress',
        guardian: 'David Mokwena',
        contact: '073 890 1234',
        notes: 'Undergoing treatment for mild gingivitis.',
        visits: [
          { date: '2025-05-15', title: 'Initial Screening', description: 'Identified gingivitis.' },
          { date: '2025-05-25', title: 'First Treatment', description: 'Cleaning and oral hygiene instruction.' },
          { date: '2025-06-15', title: 'Scheduled: Follow-up', description: 'Check progress.', future: true }
        ],
        files: [
          { name: 'Treatment_Plan.pdf', type: 'file-medical' }
        ]
      },
      {
        id: 'P008', 
        name: 'Bongani Zungu', 
        age: 9, 
        school: 'Soweto Elementary', 
        grade: '4',
        lastVisit: '2025-05-22',
        status: 'completed',
        guardian: 'Patricia Zungu',
        contact: '071 345 6789',
        notes: 'All treatments completed successfully.',
        visits: [
          { date: '2025-05-01', title: 'Initial Screening', description: 'Dental examination performed.' },
          { date: '2025-05-10', title: 'Treatment', description: 'Fluoride application and sealants.' },
          { date: '2025-05-22', title: 'Final Check', description: 'Completed all treatments.' }
        ],
        files: [
          { name: 'Completion_Report.pdf', type: 'file-medical' }
        ]
      }
    ];
  
    // Pagination settings
    let currentPage = 1;
    const patientsPerPage = 5;
    let filteredPatients = [...patientsData];
    
    // DOM elements
    const patientTable = document.querySelector('.patient-table tbody');
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const filterStatus = document.getElementById('filterStatus');
    const addPatientBtn = document.querySelector('.add-patient-btn');
    const generateReportBtn = document.querySelector('.generate-report-btn');
    const paginationPrev = document.querySelector('.pagination-btn:first-child');
    const paginationNext = document.querySelector('.pagination-btn:last-child');
    const paginationInfo = document.querySelector('.pagination-info');
    const patientForm = document.getElementById('patientForm');
    const patientFormModal = document.getElementById('patientFormModal');
    const patientDetailsModal = document.getElementById('patientDetailsModal');
    const deleteConfirmModal = document.getElementById('deleteConfirmModal');
    const modalCloseBtns = document.querySelectorAll('.close-modal');
    const cancelBtns = document.querySelectorAll('.cancel-btn');
    
    // Initialize table with patients
    displayPatients();
    
    // Search functionality
    if (searchBtn && searchInput) {
      searchBtn.addEventListener('click', function() {
        filterPatients();
      });
      
      searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
          filterPatients();
        }
      });
    }
    
    // Filter by status
    if (filterStatus) {
      filterStatus.addEventListener('change', function() {
        filterPatients();
      });
    }
    
    // Pagination functionality
    if (paginationPrev && paginationNext) {
      paginationPrev.addEventListener('click', function() {
        if (currentPage > 1) {
          currentPage--;
          displayPatients();
        }
      });
      
      paginationNext.addEventListener('click', function() {
        const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);
        if (currentPage < totalPages) {
          currentPage++;
          displayPatients();
        }
      });
    }
    
    // Add patient functionality
    if (addPatientBtn) {
      addPatientBtn.addEventListener('click', function() {
        document.getElementById('modalTitle').textContent = 'Add New Patient';
        patientForm.reset();
        document.querySelector('.uploaded-files .file-info').textContent = 'No files uploaded';
        showModal(patientFormModal);
      });
    }
    
    // Generate report functionality
    if (generateReportBtn) {
      generateReportBtn.addEventListener('click', function() {
        generateReport();
      });
    }
    
    // Setup modal close functionality
    modalCloseBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        hideModal(modal);
      });
    });
    
    cancelBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        hideModal(modal);
      });
    });
    
    // Patient form submission
    if (patientForm) {
      patientForm.addEventListener('submit', function(e) {
        e.preventDefault();
        savePatient();
        hideModal(patientFormModal);
      });
    }
    
    // File upload preview
    const fileInput = document.getElementById('patientRecords');
    if (fileInput) {
      fileInput.addEventListener('change', function() {
        const fileInfo = document.querySelector('.uploaded-files .file-info');
        if (this.files.length > 0) {
          const fileNames = Array.from(this.files).map(file => file.name).join(', ');
          fileInfo.textContent = fileNames;
        } else {
          fileInfo.textContent = 'No files uploaded';
        }
      });
    }
    
    // Setup patient action buttons
    function setupPatientActionButtons() {
      // View patient details buttons
      document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const patientId = this.closest('tr').getAttribute('data-id');
          viewPatientDetails(patientId);
        });
      });
      
      // Edit patient buttons
      document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const patientId = this.closest('tr').getAttribute('data-id');
          editPatient(patientId);
        });
      });
      
      // Delete patient buttons
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const patientId = this.closest('tr').getAttribute('data-id');
          confirmDeletePatient(patientId);
        });
      });
    }
    
    // Edit from details modal
    const editFromDetailsBtn = document.querySelector('.edit-from-details');
    if (editFromDetailsBtn) {
      editFromDetailsBtn.addEventListener('click', function() {
        const patientId = document.getElementById('detailPatientId').textContent.split(': ')[1];
        hideModal(patientDetailsModal);
        editPatient(patientId);
      });
    }
    
    // Delete confirmation
    const deleteConfirmBtn = document.querySelector('.delete-confirm-btn');
    if (deleteConfirmBtn) {
      deleteConfirmBtn.addEventListener('click', function() {
        const patientId = deleteConfirmBtn.getAttribute('data-id');
        deletePatient(patientId);
        hideModal(deleteConfirmModal);
      });
    }
    
    // =========== Function Implementations ===========
    
    // Display patients with pagination
    function displayPatients() {
      if (!patientTable) return;
      
      // Clear existing rows
      patientTable.innerHTML = '';
      
      // Calculate pagination
      const startIndex = (currentPage - 1) * patientsPerPage;
      const endIndex = startIndex + patientsPerPage;
      const patientsToShow = filteredPatients.slice(startIndex, endIndex);
      const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);
      
      // Update pagination buttons and info
      if (paginationPrev) {
        paginationPrev.disabled = currentPage === 1;
      }
      
      if (paginationNext) {
        paginationNext.disabled = currentPage === totalPages;
      }
      
      if (paginationInfo) {
        paginationInfo.textContent = `Page ${currentPage} of ${totalPages}`;
      }
      
      // Add patient rows
      patientsToShow.forEach(patient => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', patient.id);
        
        // Format date from YYYY-MM-DD to DD MMM YYYY
        const dateOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        const formattedDate = patient.lastVisit ? 
          new Date(patient.lastVisit).toLocaleDateString('en-ZA', dateOptions) : 'N/A';
        
        row.innerHTML = `
          <td>${patient.id}</td>
          <td>${patient.name}</td>
          <td>${patient.age}</td>
          <td>${patient.school}</td>
          <td>${formattedDate}</td>
          <td><span class="status-badge ${patient.status}">${capitalizeFirst(patient.status)}</span></td>
          <td class="action-cell">
            <button class="icon-btn view-btn" title="View Details">
              <i class="fas fa-eye"></i>
            </button>
            <button class="icon-btn edit-btn" title="Edit">
              <i class="fas fa-edit"></i>
            </button>
            <button class="icon-btn delete-btn" title="Delete">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        `;
        
        patientTable.appendChild(row);
      });
      
      // Setup action buttons for newly created rows
      setupPatientActionButtons();
    }
    
    // Filter patients based on search and status filter
    function filterPatients() {
      const searchTerm = searchInput.value.toLowerCase();
      const statusFilter = filterStatus.value;
      
      filteredPatients = patientsData.filter(patient => {
        // Apply search filter
        const matchesSearch = searchTerm === '' || 
          patient.name.toLowerCase().includes(searchTerm) ||
          patient.id.toLowerCase().includes(searchTerm) ||
          patient.school.toLowerCase().includes(searchTerm);
        
        // Apply status filter
        const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
        
        return matchesSearch && matchesStatus;
      });
      
      // Reset to first page and display results
      currentPage = 1;
      displayPatients();
    }
    
    // View patient details
    function viewPatientDetails(patientId) {
      const patient = patientsData.find(p => p.id === patientId);
      if (!patient) return;
      
      // Update details modal with patient info
      document.getElementById('detailPatientName').textContent = patient.name;
      document.getElementById('detailPatientId').textContent = `Patient ID: ${patient.id}`;
      document.getElementById('detailPatientAge').textContent = `Age: ${patient.age}`;
      
      const statusBadge = document.getElementById('detailPatientStatus');
      statusBadge.className = `status-badge ${patient.status}`;
      statusBadge.textContent = capitalizeFirst(patient.status);
      
      document.getElementById('detailGuardianName').textContent = patient.guardian || 'N/A';
      document.getElementById('detailGuardianContact').textContent = patient.contact || 'N/A';
      document.getElementById('detailSchool').textContent = patient.school || 'N/A';
      document.getElementById('detailGrade').textContent = `Grade ${patient.grade}` || 'N/A';
      document.getElementById('detailMedicalNotes').textContent = patient.notes || 'No medical notes available.';
      
      // Update visit history
      const visitTimeline = document.querySelector('.visit-timeline');
      visitTimeline.innerHTML = '';
      
      if (patient.visits && patient.visits.length > 0) {
        patient.visits.forEach(visit => {
          const dateOptions = { day: '2-digit', month: 'short', year: 'numeric' };
          const formattedDate = new Date(visit.date).toLocaleDateString('en-ZA', dateOptions);
          
          const visitItem = document.createElement('div');
          visitItem.className = `visit-item${visit.future ? ' future' : ''}`;
          visitItem.innerHTML = `
            <div class="visit-date">${formattedDate}</div>
            <div class="visit-content">
              <h5>${visit.title}</h5>
              <p>${visit.description}</p>
            </div>
          `;
          
          visitTimeline.appendChild(visitItem);
        });
      } else {
        visitTimeline.innerHTML = '<p>No visit history available.</p>';
      }
      
      // Update patient records
      const recordFiles = document.querySelector('.record-files');
      recordFiles.innerHTML = '';
      
      if (patient.files && patient.files.length > 0) {
        patient.files.forEach(file => {
          const fileItem = document.createElement('div');
          fileItem.className = 'record-file';
          fileItem.innerHTML = `
            <i class="fas fa-${file.type}"></i>
            <span>${file.name}</span>
            <div class="file-actions">
              <button class="icon-btn" title="Download">
                <i class="fas fa-download"></i>
              </button>
              <button class="icon-btn" title="Delete">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
          
          recordFiles.appendChild(fileItem);
        });
      } else {
        recordFiles.innerHTML = '<p>No records available.</p>';
      }
      
      showModal(patientDetailsModal);
    }
    
    // Edit patient
    function editPatient(patientId) {
      const patient = patientsData.find(p => p.id === patientId);
      if (!patient) return;
      
      // Set form title
      document.getElementById('modalTitle').textContent = `Edit Patient: ${patient.name}`;
      
      // Populate form fields
      document.getElementById('patientName').value = patient.name;
      document.getElementById('patientAge').value = patient.age;
      document.getElementById('patientSchool').value = patient.school;
      document.getElementById('patientGrade').value = patient.grade;
      document.getElementById('guardianName').value = patient.guardian || '';
      document.getElementById('guardianContact').value = patient.contact || '';
      document.getElementById('treatmentStatus').value = patient.status;
      document.getElementById('lastVisitDate').value = patient.lastVisit || '';
      document.getElementById('medicalNotes').value = patient.notes || '';
      
      // Set patient ID as a data attribute on the form for update
      patientForm.setAttribute('data-edit-id', patient.id);
      
      // Show files if any
      const fileInfo = document.querySelector('.uploaded-files .file-info');
      if (patient.files && patient.files.length > 0) {
        fileInfo.textContent = patient.files.map(file => file.name).join(', ');
      } else {
        fileInfo.textContent = 'No files uploaded';
      }
      
      showModal(patientFormModal);
    }
    
    // Save patient (add or update)
    function savePatient() {
      const patientId = patientForm.getAttribute('data-edit-id');
      const isEdit = !!patientId;
      
      // Gather form data
      const formData = {
        name: document.getElementById('patientName').value,
        age: parseInt(document.getElementById('patientAge').value),
        school: document.getElementById('patientSchool').value,
        grade: document.getElementById('patientGrade').value,
        guardian: document.getElementById('guardianName').value,
        contact: document.getElementById('guardianContact').value,
        status: document.getElementById('treatmentStatus').value,
        lastVisit: document.getElementById('lastVisitDate').value,
        notes: document.getElementById('medicalNotes').value
      };
      
      if (isEdit) {
        // Update existing patient
        const patientIndex = patientsData.findIndex(p => p.id === patientId);
        if (patientIndex !== -1) {
          // Merge with existing data to preserve visits and files
          patientsData[patientIndex] = {
            ...patientsData[patientIndex],
            ...formData
          };
        }
      } else {
        // Add new patient
        const newPatient = {
          id: 'P' + String(patientsData.length + 1).padStart(3, '0'),
          ...formData,
          visits: [],
          files: []
        };
        patientsData.unshift(newPatient); // Add to beginning of array
      }
      
      // Reset form
      patientForm.removeAttribute('data-edit-id');
      
      // Update display
      filterPatients();
      displayPatients();
      
      // Show success message
      showNotification(isEdit ? 'Patient updated successfully' : 'New patient added successfully');
    }
    
    // Confirm delete patient
    function confirmDeletePatient(patientId) {
      const patient = patientsData.find(p => p.id === patientId);
      if (!patient) return;
      
      // Set patient ID for deletion
      document.querySelector('.delete-confirm-btn').setAttribute('data-id', patientId);
      
      // Show confirmation modal
      showModal(deleteConfirmModal);
    }
    
    // Delete patient
    function deletePatient(patientId) {
      const patientIndex = patientsData.findIndex(p => p.id === patientId);
      if (patientIndex !== -1) {
        patientsData.splice(patientIndex, 1);
        
        // Update display
        filterPatients();
        displayPatients();
        
        showNotification('Patient deleted successfully');
      }
    }
    
    // Generate report
    function generateReport() {
      // In a real application, this would generate a PDF or other report format
      // For this implementation, we'll show a notification
      showNotification('Patient report being generated...');
      
      // Simulate report generation delay
      setTimeout(() => {
        showNotification('Report generated and ready for download!');
        
        // Simulate download by creating a temporary download link
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = 'data:text/plain;charset=utf-8,Patient Report';
        a.download = 'SmileConnect_Patient_Report.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, 2000);
    }
    
    // Show notification message
    function showNotification(message) {
      // Create notification element if it doesn't exist
      let notification = document.querySelector('.notification');
      if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
      }
      
      // Set message and show
      notification.textContent = message;
      notification.classList.add('show');
      
      // Hide after delay
      setTimeout(() => {
        notification.classList.remove('show');
      }, 3000);
    }
    
    // Modal helpers
    function showModal(modal) {
      if (modal) {
        modal.classList.add('show');
      }
    }
    
    function hideModal(modal) {
      if (modal) {
        modal.classList.remove('show');
      }
    }
    
    // Helper functions
    function capitalizeFirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).replace(/-/g, ' ');
    }
    
    // Add sorting functionality for table columns
    function initTableSorting() {
      const tableHeaders = document.querySelectorAll('.patient-table th');
      tableHeaders.forEach((header, index) => {
        // Skip the actions column
        if (index === tableHeaders.length - 1) return;
        
        header.classList.add('sortable');
        header.addEventListener('click', () => {
          const isAscending = header.classList.contains('sort-asc');
          
          // Reset all headers
          tableHeaders.forEach(h => {
            h.classList.remove('sort-asc', 'sort-desc');
          });
          
          // Set new sort direction
          header.classList.add(isAscending ? 'sort-desc' : 'sort-asc');
          
          // Sort data
          sortPatientData(index, !isAscending);
        });
      });
    }
    
  // Sort patient data
function sortPatientData(columnIndex, ascending) {
    const getSortValue = (patient, index) => {
        switch(index) {
            case 0: return patient.id;
            case 1: return patient.name;
            case 2: return patient.age;
            case 3: return patient.school;
            case 4: return patient.lastVisit || ''; // Date
            case 5: return patient.status;
            default: return '';
        }
    };

    filteredPatients.sort((a, b) => {
        const valueA = getSortValue(a, columnIndex);
        const valueB = getSortValue(b, columnIndex);

        if (columnIndex === 2) { // Age is number
            return ascending ? valueA - valueB : valueB - valueA;
        } else if (columnIndex === 4) { // Date comparison
            const dateA = valueA ? new Date(valueA) : new Date(0);
            const dateB = valueB ? new Date(valueB) : new Date(0);
            return ascending ? dateA - dateB : dateB - dateA;
        } else { // String comparison
            if (valueA < valueB) return ascending ? -1 : 1;
            if (valueA > valueB) return ascending ? 1 : -1;
            return 0;
        }
    });

    renderPatientTable();
    updateSortIndicators(columnIndex, ascending);
}

// Update sort indicators in the table headers
function updateSortIndicators(columnIndex, ascending) {
    const headers = document.querySelectorAll('#patientTable th');
    headers.forEach((header, index) => {
        // Clear previous indicators
        header.classList.remove('sorted-asc', 'sorted-desc');
        
        if (index === columnIndex) {
            header.classList.add(ascending ? 'sorted-asc' : 'sorted-desc');
        }
    });
}

// Filter patient data based on search input
function filterPatientData() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    
    filteredPatients = allPatients.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchInput) || 
                             patient.id.toString().includes(searchInput) ||
                             (patient.school && patient.school.toLowerCase().includes(searchInput));
                             
        const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });
    
    renderPatientTable();
}

// Render patient table with current filtered and sorted data
function renderPatientTable() {
    const tableBody = document.querySelector('#patientTable tbody');
    tableBody.innerHTML = '';
    
    if (filteredPatients.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 6;
        cell.textContent = 'No patients found';
        cell.classList.add('no-results');
        row.appendChild(cell);
        tableBody.appendChild(row);
        return;
    }
    
    filteredPatients.forEach(patient => {
        const row = document.createElement('tr');
        row.dataset.id = patient.id;
        
        // Create cells for each patient property
        const idCell = document.createElement('td');
        idCell.textContent = patient.id;
        
        const nameCell = document.createElement('td');
        nameCell.textContent = patient.name;
        
        const ageCell = document.createElement('td');
        ageCell.textContent = patient.age;
        
        const schoolCell = document.createElement('td');
        schoolCell.textContent = patient.school || 'N/A';
        
        const lastVisitCell = document.createElement('td');
        lastVisitCell.textContent = patient.lastVisit ? formatDate(patient.lastVisit) : 'Never';
        
        const statusCell = document.createElement('td');
        const statusIndicator = document.createElement('span');
        statusIndicator.classList.add('status', `status-${patient.status.toLowerCase()}`);
        statusIndicator.textContent = patient.status;
        statusCell.appendChild(statusIndicator);
        
        const actionsCell = document.createElement('td');
        const viewBtn = document.createElement('button');
        viewBtn.classList.add('btn', 'btn-view');
        viewBtn.innerHTML = '<i class="fas fa-eye"></i>';
        viewBtn.addEventListener('click', () => viewPatient(patient.id));
        
        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-edit');
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.addEventListener('click', () => editPatient(patient.id));
        
        actionsCell.appendChild(viewBtn);
        actionsCell.appendChild(editBtn);
        
        // Append all cells to the row
        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(ageCell);
        row.appendChild(schoolCell);
        row.appendChild(lastVisitCell);
        row.appendChild(statusCell);
        row.appendChild(actionsCell);
        
        // Append row to table body
        tableBody.appendChild(row);
    });
    
    updatePatientCount();
}

// Format date to a readable string
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Update the patient count display
function updatePatientCount() {
    const countElement = document.getElementById('patientCount');
    countElement.textContent = `${filteredPatients.length} patient${filteredPatients.length !== 1 ? 's' : ''} found`;
}

// View patient details
function viewPatient(patientId) {
    const patient = allPatients.find(p => p.id === patientId);
    if (!patient) return;
    
    // Populate the patient view modal
    document.getElementById('viewPatientId').textContent = patient.id;
    document.getElementById('viewPatientName').textContent = patient.name;
    document.getElementById('viewPatientAge').textContent = patient.age;
    document.getElementById('viewPatientSchool').textContent = patient.school || 'N/A';
    document.getElementById('viewPatientLastVisit').textContent = patient.lastVisit ? formatDate(patient.lastVisit) : 'Never';
    
    const statusElement = document.getElementById('viewPatientStatus');
    statusElement.textContent = patient.status;
    statusElement.className = '';
    statusElement.classList.add('status', `status-${patient.status.toLowerCase()}`);
    
    // Show patient notes if available
    const notesElement = document.getElementById('viewPatientNotes');
    if (patient.notes && patient.notes.length > 0) {
        notesElement.innerHTML = '';
        patient.notes.forEach(note => {
            const noteDiv = document.createElement('div');
            noteDiv.classList.add('note');
            
            const noteDate = document.createElement('div');
            noteDate.classList.add('note-date');
            noteDate.textContent = formatDate(note.date);
            
            const noteContent = document.createElement('div');
            noteContent.classList.add('note-content');
            noteContent.textContent = note.content;
            
            noteDiv.appendChild(noteDate);
            noteDiv.appendChild(noteContent);
            notesElement.appendChild(noteDiv);
        });
    } else {
        notesElement.innerHTML = '<p class="no-notes">No notes available</p>';
    }
    
    // Show the modal
    const modal = document.getElementById('viewPatientModal');
    modal.classList.add('active');
}

// Edit patient information
function editPatient(patientId) {
    const patient = allPatients.find(p => p.id === patientId);
    if (!patient) return;
    
    // Populate the edit form
    document.getElementById('editPatientId').value = patient.id;
    document.getElementById('editPatientName').value = patient.name;
    document.getElementById('editPatientAge').value = patient.age;
    document.getElementById('editPatientSchool').value = patient.school || '';
    document.getElementById('editPatientStatus').value = patient.status;
    
    if (patient.lastVisit) {
        const date = new Date(patient.lastVisit);
        const formattedDate = date.toISOString().split('T')[0];
        document.getElementById('editPatientLastVisit').value = formattedDate;
    } else {
        document.getElementById('editPatientLastVisit').value = '';
    }
    
    // Show the edit modal
    const modal = document.getElementById('editPatientModal');
    modal.classList.add('active');
}

// Save edited patient data
function savePatientEdit(event) {
    event.preventDefault();
    
    const patientId = parseInt(document.getElementById('editPatientId').value);
    const patientIndex = allPatients.findIndex(p => p.id === patientId);
    
    if (patientIndex === -1) return;
    
    // Update patient data
    allPatients[patientIndex].name = document.getElementById('editPatientName').value;
    allPatients[patientIndex].age = parseInt(document.getElementById('editPatientAge').value);
    allPatients[patientIndex].school = document.getElementById('editPatientSchool').value;
    allPatients[patientIndex].status = document.getElementById('editPatientStatus').value;
    
    const lastVisitInput = document.getElementById('editPatientLastVisit').value;
    allPatients[patientIndex].lastVisit = lastVisitInput ? lastVisitInput : null;
    
    // Close the modal and refresh the table
    closeModals();
    filterPatientData();
    
    // Show success message
    showNotification('Patient data updated successfully', 'success');
}

// Add a new patient
function addNewPatient(event) {
    event.preventDefault();
    
    // Generate a new unique ID
    const newId = Math.max(...allPatients.map(p => p.id), 0) + 1;
    
    // Create new patient object
    const newPatient = {
        id: newId,
        name: document.getElementById('newPatientName').value,
        age: parseInt(document.getElementById('newPatientAge').value),
        school: document.getElementById('newPatientSchool').value,
        status: document.getElementById('newPatientStatus').value,
        notes: []
    };
    
    const lastVisitInput = document.getElementById('newPatientLastVisit').value;
    newPatient.lastVisit = lastVisitInput ? lastVisitInput : null;
    
    // Add to patients array
    allPatients.push(newPatient);
    
    // Close modal and refresh table
    closeModals();
    document.getElementById('addPatientForm').reset();
    filterPatientData();
    
    // Show success message
    showNotification('New patient added successfully', 'success');
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.classList.add('notification', `notification-${type}`);
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Close all modals
function closeModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
}

// Initialize the application
function initApp() {
    // Set up event listeners for table headers (for sorting)
    const headers = document.querySelectorAll('#patientTable th[data-sortable="true"]');
    headers.forEach((header, index) => {
        header.addEventListener('click', () => {
            const isAscending = !header.classList.contains('sorted-asc');
            sortPatientData(index, isAscending);
        });
    });
    
    // Set up search and filter inputs
    document.getElementById('searchInput').addEventListener('input', filterPatientData);
    document.getElementById('statusFilter').addEventListener('change', filterPatientData);
    
    // Set up form submissions
    document.getElementById('editPatientForm').addEventListener('submit', savePatientEdit);
    document.getElementById('addPatientForm').addEventListener('submit', addNewPatient);
    
    // Set up modal close buttons
    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', closeModals);
    });
    
    // Add new patient button
    document.getElementById('addPatientBtn').addEventListener('click', () => {
        document.getElementById('addPatientModal').classList.add('active');
    });
    
    // Initial render
    filterPatientData();
}

// When DOM is loaded, initialize the app
document.addEventListener('DOMContentLoaded', initApp); 

}