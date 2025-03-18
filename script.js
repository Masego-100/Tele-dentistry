function downloadRecording(recordingId) {
    const downloadModal = document.createElement('div');
    downloadModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    downloadModal.innerHTML = `
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
    <div class="flex justify-between items-center mb-4">
    <h3 class="text-xl font-semibold">Download Recording</h3>
    <button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
    <i class="ri-close-line text-2xl"></i>
    </button>
    </div>
    <div class="space-y-4">
    <p class="text-gray-600">Preparing recording for download...</p>
    <div class="h-2 bg-gray-200 rounded-full">
    <div class="h-2 bg-primary rounded-full w-3/4"></div>
    </div>
    <div class="flex justify-end">
    <button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">Cancel</button>
    </div>
    </div>
    </div>
    `;
    document.body.appendChild(downloadModal);
    }
    function grantOneTimeAccess(fileId) {
    const accessModal = document.createElement('div');
    accessModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    accessModal.innerHTML = `
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
    <div class="flex justify-between items-center mb-4">
    <h3 class="text-xl font-semibold">Grant One-Time Access</h3>
    <button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
    <i class="ri-close-line text-2xl"></i>
    </button>
    </div>
    <div class="space-y-4">
    <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
    <input type="email" class="w-full border rounded-lg px-3 py-2" placeholder="Enter recipient's email">
    </div>
    <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">Access Duration</label>
    <select class="w-full border rounded-lg px-3 py-2">
    <option>1 hour</option>
    <option>4 hours</option>
    <option>12 hours</option>
    <option>24 hours</option>
    </select>
    </div>
    <div class="flex justify-end space-x-2">
    <button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">Cancel</button>
    <button class="bg-primary text-white px-4 py-2 rounded-lg">Grant Access</button>
    </div>
    </div>
    </div>
    `;
    document.body.appendChild(accessModal);
    }
    function downloadLogs() {
    const downloadModal = document.createElement('div');
    downloadModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    downloadModal.innerHTML = `
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
    <div class="flex justify-between items-center mb-4">
    <h3 class="text-xl font-semibold">Download Logs</h3>
    <button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
    <i class="ri-close-line text-2xl"></i>
    </button>
    </div>
    <div class="space-y-4">
    <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
    <div class="grid grid-cols-2 gap-4">
    <input type="date" class="border rounded-lg px-3 py-2" value="2025-03-01">
    <input type="date" class="border rounded-lg px-3 py-2" value="2025-03-11">
    </div>
    </div>
    <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">Format</label>
    <select class="w-full border rounded-lg px-3 py-2">
    <option>CSV</option>
    <option>PDF</option>
    <option>Excel</option>
    </select>
    </div>
    <div class="flex justify-end space-x-2">
    <button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">Cancel</button>
    <button class="bg-primary text-white px-4 py-2 rounded-lg">Download</button>
    </div>
    </div>
    </div>
    `;
    document.body.appendChild(downloadModal);
    }
    function downloadReport() {
    const downloadModal = document.createElement('div');
    downloadModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    downloadModal.innerHTML = `
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
    <div class="flex justify-between items-center mb-4">
    <h3 class="text-xl font-semibold">Download Report</h3>
    <button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
    <i class="ri-close-line text-2xl"></i>
    </button>
    </div>
    <div class="space-y-4">
    <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
    <select class="w-full border rounded-lg px-3 py-2">
    <option>Treatment Summary</option>
    <option>Patient Demographics</option>
    <option>Success Rates</option>
    <option>Financial Summary</option>
    </select>
    </div>
    <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">Format</label>
    <select class="w-full border rounded-lg px-3 py-2">
    <option>PDF</option>
    <option>Excel</option>
    <option>CSV</option>
    </select>
    </div>
    <div class="flex justify-end space-x-2">
    <button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">Cancel</button>
    <button class="bg-primary text-white px-4 py-2 rounded-lg">Download</button>
    </div>
    </div>
    </div>
    `;
    document.body.appendChild(downloadModal);
    }
    function openVideoConsultation() {
    const consultationModal = document.createElement('div');
    consultationModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    consultationModal.innerHTML = `
    <div class="bg-white rounded-lg p-6 w-full max-w-2xl">
    <div class="flex justify-between items-center mb-4">
    <h3 class="text-xl font-semibold">Video Consultation</h3>
    <button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
    <i class="ri-close-line text-2xl"></i>
    </button>
    </div>
    <div class="bg-gray-100 rounded-lg aspect-video mb-4 flex items-center justify-center">
    <i class="ri-video-line text-6xl text-gray-400"></i>
    </div>
    <div class="flex justify-center space-x-4">
    <button class="bg-red-500 text-white px-4 py-2 rounded-full flex items-center">
    <i class="ri-mic-off-line mr-2"></i>
    Mute
    </button>
    <button class="bg-red-500 text-white px-4 py-2 rounded-full flex items-center">
    <i class="ri-video-off-line mr-2"></i>
    Stop Video
    </button>
    <button class="bg-primary text-white px-4 py-2 rounded-full flex items-center">
    <i class="ri-record-circle-line mr-2"></i>
    Record
    </button>
    <button class="bg-red-600 text-white px-4 py-2 rounded-full flex items-center">
    <i class="ri-phone-off-line mr-2"></i>
    End
    </button>
    </div>
    </div>
    `;
    document.body.appendChild(consultationModal);
    }
    function grantAccess() {
    const accessModal = document.createElement('div');
    accessModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    accessModal.innerHTML = `
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
    <div class="flex justify-between items-center mb-4">
    <h3 class="text-xl font-semibold">Grant Access</h3>
    <button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
    <i class="ri-close-line text-2xl"></i>
    </button>
    </div>
    <div class="space-y-4">
    <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">Specialist Email</label>
    <input type="email" class="w-full border rounded-lg px-3 py-2" placeholder="Enter specialist's email">
    </div>
    <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">Access Duration</label>
    <select class="w-full border rounded-lg px-3 py-2">
    <option>24 hours</option>
    <option>48 hours</option>
    <option>72 hours</option>
    <option>1 week</option>
    </select>
    </div>
    <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">Patient File</label>
    <select class="w-full border rounded-lg px-3 py-2">
    <option>Select patient file</option>
    <option>Emily Wilson - #12345</option>
    <option>Michael Chen - #12346</option>
    </select>
    </div>
    <button class="w-full bg-primary text-white py-2 rounded-lg">Grant Access</button>
    </div>
    </div>
    `;
    document.body.appendChild(accessModal);
    }
    document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for the new buttons
    document.querySelectorAll('button').forEach(button => {
    if (button.textContent.includes('Start New Consultation')) {
    button.addEventListener('click', openVideoConsultation);
    }
    if (button.textContent.includes('Grant Access')) {
    button.addEventListener('click', grantAccess);
    }
    });
    const impactChart = echarts.init(document.getElementById('impactChart'));
    const impactOption = {
    animation: false,
    tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: '#e2e8f0',
    textStyle: { color: '#1f2937' }
    },
    legend: {
    orient: 'vertical',
    right: 10,
    top: 'center',
    selectedMode: 'single'
    },
    series: [
    {
    name: 'Regional Distribution',
    type: 'pie',
    selectedMode: 'single',
    selectedOffset: 30,
    radius: ['40%', '70%'],
    avoidLabelOverlap: false,
    itemStyle: {
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 2
    },
    label: {
    show: true,
    formatter: '{b}\n{c} ({d}%)',
    position: 'outside',
    fontSize: 14,
    color: '#1f2937'
    },
    emphasis: {
    label: {
    show: true,
    fontSize: 16,
    fontWeight: 'bold'
    },
    itemStyle: {
    shadowBlur: 10,
    shadowOffsetX: 0,
    shadowColor: 'rgba(0, 0, 0, 0.2)'
    }
    },
    labelLine: {
    show: true,
    length: 15,
    length2: 10,
    smooth: true
    },
    data: [
    { 
    value: 4800, 
    name: 'North America',
    itemStyle: { color: 'rgba(87, 181, 231, 1)' }
    },
    { 
    value: 3200, 
    name: 'South America',
    itemStyle: { color: 'rgba(141, 211, 199, 1)' }
    },
    { 
    value: 2400, 
    name: 'Europe',
    itemStyle: { color: 'rgba(251, 191, 114, 1)' }
    },
    { 
    value: 1600, 
    name: 'Asia',
    itemStyle: { color: 'rgba(252, 141, 98, 1)' }
    }
    ]
    }
    ]
    };
    impactChart.setOption(impactOption);
    // Chat functionality
    let chatVisible = false;
    document.getElementById('toggleChat').addEventListener('click', () => {
    chatVisible = !chatVisible;
    document.getElementById('chatContainer').style.display = chatVisible ? 'block' : 'none';
    });
    function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;
    const chatMessages = document.getElementById('chatMessages');
    // Add user message
    chatMessages.innerHTML += `
    <div class="mb-4 text-right">
    <div class="bg-primary text-white rounded-lg p-3 inline-block">
    <p>${message}</p>
    </div>
    </div>
    `;
    // Simulate bot response
    setTimeout(() => {
    const responses = [
    "That's a great question about dental health! Regular brushing and flossing are key to maintaining healthy teeth.",
    "Remember to brush your teeth at least twice a day and visit your dentist regularly!",
    "Maintaining good oral hygiene is important for your overall health.",
    "Would you like to learn more about proper brushing techniques?"
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    chatMessages.innerHTML += `
    <div class="mb-4">
    <div class="bg-gray-100 rounded-lg p-3 inline-block">
    <p class="text-gray-700">${randomResponse}</p>
    </div>
    </div>
    `;
    chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
    input.value = '';
    }
    // Slider functionality
    let currentSlide = 0;
    const slides = document.querySelector('.slides');
    const dots = document.querySelectorAll('.slider-dot');
    function updateSlider() {
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, index) => {
    dot.style.backgroundColor = index === currentSlide ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)';
    });
    }
    dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
    currentSlide = index;
    updateSlider();
    });
    });
    setInterval(() => {
    currentSlide = (currentSlide + 1) % 3;
    updateSlider();
    }, 5000);
    const option = {
    animation: false,
    tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: '#e2e8f0',
    textStyle: {
    color: '#1f2937'
    }
    },
    legend: {
    data: ['Children Served', 'Communities Reached'],
    bottom: 0
    },
    grid: {
    top: 20,
    right: 20,
    bottom: 60,
    left: 60
    },
    xAxis: {
    type: 'category',
    data: ['2020', '2021', '2022', '2023', '2024', '2025'],
    axisLine: {
    lineStyle: {
    color: '#e2e8f0'
    }
    }
    },
    yAxis: {
    type: 'value',
    axisLine: {
    lineStyle: {
    color: '#e2e8f0'
    }
    },
    splitLine: {
    lineStyle: {
    color: '#e2e8f0'
    }
    }
    },
    series: [
    {
    name: 'Children Served',
    type: 'line',
    smooth: true,
    data: [1200, 2400, 3600, 4800, 6000, 7200],
    itemStyle: {
    color: 'rgba(87, 181, 231, 1)'
    },
    areaStyle: {
    color: {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [{
    offset: 0,
    color: 'rgba(87, 181, 231, 0.2)'
    }, {
    offset: 1,
    color: 'rgba(87, 181, 231, 0)'
    }]
    }
    }
    },
    {
    name: 'Communities Reached',
    type: 'line',
    smooth: true,
    data: [10, 25, 45, 70, 100, 140],
    itemStyle: {
    color: 'rgba(141, 211, 199, 1)'
    },
    areaStyle: {
    color: {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [{
    offset: 0,
    color: 'rgba(141, 211, 199, 0.2)'
    }, {
    offset: 1,
    color: 'rgba(141, 211, 199, 0)'
    }]
    }
    }
    }
    ]
    };
    statsChart.setOption(option);
    window.addEventListener('resize', function() {
    statsChart.resize();
    });
    });