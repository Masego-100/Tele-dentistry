
let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -26.2708, lng: 28.1123 }, // Centered in Gauteng
        zoom: 7,
    });

    // Adding markers for specific schools with actual information
    addMarker({ lat: -26.2041, lng: 28.0473 }, "Suncrest High School", "10 children placed on treatment", "red", "images/oral_health_program.jpg");
    addMarker({ lat: -25.7479, lng: 28.2293 }, "Pretoria High School", "8 children diagnosed with cavities", "blue", "https://youtu.be/_sRW0OKA8Ks");
    addMarker({ lat: -27.8555, lng: 26.3774 }, "Kroonstad Secondary School", "5 children treated for tooth decay", "green", "https://youtu.be/_sRW0OKA8Ks");
    addMarker({ lat: -29.0852, lng: 26.1596 }, "Bloemfontein High School", "12 children placed on orthodontic treatment", "yellow", "https://youtu.be/_sRW0OKA8Ks");
}

function addMarker(location, schoolName, visitInfo, color, link) {
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: {
            url: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
        },
    });

    let contentString;
    if (link.includes("http")) {
        contentString = `<strong>${schoolName}</strong><br>${visitInfo}<br><a href="${link}" target="_blank">Click here for more information</a>`;
    } else {
        contentString = `<strong>${schoolName}</strong><br>${visitInfo}<br><img src="${link}" alt="${schoolName}" width="200">`;
    }

    const infoWindow = new google.maps.InfoWindow({ content: contentString });

    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });
}

// Show map tooltip on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        document.getElementById('map-tooltip').classList.add('show');
        setTimeout(() => {
            document.getElementById('map-tooltip').classList.remove('show');
        }, 5000);
    }, 1500);
    
    // Animate counter statistics
    animateCounter('children-count', 0, 12000, 2000);
    animateCounter('communities-count', 0, 150, 2000);
    animateCounter('countries-count', 0, 25, 2000);
    animateCounter('success-count', 0, 98, 2000, '%');
    
    // Initialize map markers functionality
    initMapMarkers();
    
    // Initialize interactive chart
    initializeChart();
});

// Counter animation function
function animateCounter(elementId, start, end, duration, suffix = '') {
    const element = document.getElementById(elementId);
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    
    // Add commas for thousands
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    
    let current = start;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = formatNumber(current) + suffix;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Map markers functionality
function initMapMarkers() {
    const markers = document.querySelectorAll('.map-marker');
    const popup = document.getElementById('map-popup');
    const popupLocation = document.getElementById('popup-location');
    const popupPatients = document.getElementById('popup-patients');
    const popupClinics = document.getElementById('popup-clinics');
    const closeBtn = document.querySelector('.map-popup-close');
    
    markers.forEach(marker => {
        marker.addEventListener('click', function() {
            // Position popup near the marker
            const markerRect = this.getBoundingClientRect();
            const mapContainer = document.getElementById('map-container');
            const mapRect = mapContainer.getBoundingClientRect();
            
            popup.style.top = (this.offsetTop - 120) + 'px';
            popup.style.left = (this.offsetLeft + 20) + 'px';
            
            // Fill popup with data
            popupLocation.textContent = this.getAttribute('data-location');
            popupPatients.textContent = 'Patients treated: ' + this.getAttribute('data-patients');
            popupClinics.textContent = 'Dental clinics: ' + this.getAttribute('data-clinics');
            
            // Show popup with animation
            popup.classList.add('show');
            
            // Animate marker on click
            this.style.transform = 'translate(-50%, -50%) scale(1.5)';
            setTimeout(() => {
                this.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 300);
        });
    });
    
    // Close popup when clicking the X
    closeBtn.addEventListener('click', function() {
        popup.classList.remove('show');
    });
    
    // Close popup when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (!e.target.classList.contains('map-marker') && 
            !popup.contains(e.target)) {
            popup.classList.remove('show');
        }
    });
}

// Initialize interactive chart
function initializeChart() {
    // Sample data for charts
    const yearlyData = [
        { year: '2020', patients: 2400, communities: 45, countries: 10 },
        { year: '2021', patients: 4500, communities: 75, countries: 15 },
        { year: '2022', patients: 7200, communities: 110, countries: 20 },
        { year: '2023', patients: 9800, communities: 135, countries: 22 },
        { year: '2024', patients: 12000, communities: 150, countries: 25 }
    ];
    
    const regionalData = [
        { region: 'Africa', patients: 5000, communities: 60, countries: 10 },
        { region: 'Asia', patients: 3500, communities: 45, countries: 7 },
        { region: 'Europe', patients: 1800, communities: 25, countries: 5 },
        { region: 'Americas', patients: 1700, communities: 20, countries: 3 }
    ];
    
    // Create SVG container
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.overflow = 'visible';
    document.getElementById('impact-chart').appendChild(svg);
    
    // Chart dimensions
    const chartWidth = 600;
    const chartHeight = 300;
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const innerWidth = chartWidth - margin.left - margin.right;
    const innerHeight = chartHeight - margin.top - margin.bottom;

    // Create chart elements
    const chart = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    chart.setAttribute('transform', `translate(${margin.left}, ${margin.top})`);
    svg.appendChild(chart);
    
    // Add X axis
    const xScale = createScale([0, yearlyData.length - 1], [0, innerWidth]);
    const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    xAxis.setAttribute('transform', `translate(0, ${innerHeight})`);
    chart.appendChild(xAxis);
    
    // X axis labels
    yearlyData.forEach((d, i) => {
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', xScale(i));
        label.setAttribute('y', 20);
        label.setAttribute('text-anchor', 'middle');
        label.textContent = d.year;
        label.style.fontSize = '12px';
        // Animate labels appearing
        label.style.opacity = '0';
        setTimeout(() => {
            label.style.opacity = '1';
            label.style.transition = 'opacity 0.5s';
        }, 500 + i * 100);
        xAxis.appendChild(label);
    });
    
    // Add Y axis
    const yScale = createScale([0, 15000], [innerHeight, 0]);
    const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    chart.appendChild(yAxis);
    
    // Y axis grid lines and labels
    const ticks = [0, 3000, 6000, 9000, 12000, 15000];
    ticks.forEach((tick, i) => {
        // Grid line
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', 0);
        line.setAttribute('x2', innerWidth);
        line.setAttribute('y1', yScale(tick));
        line.setAttribute('y2', yScale(tick));
        line.style.stroke = '#e0e0e0';
        line.style.strokeWidth = '1';
        // Animate grid lines appearing
        line.style.strokeDasharray = innerWidth;
        line.style.strokeDashoffset = innerWidth;
        setTimeout(() => {
            line.style.transition = 'stroke-dashoffset 1s ease';
            line.style.strokeDashoffset = '0';
        }, 300 + i * 100);
        yAxis.appendChild(line);
        
        // Label
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', -10);
        label.setAttribute('y', yScale(tick));
        label.setAttribute('dy', '0.32em');
        label.setAttribute('text-anchor', 'end');
        label.textContent = tick;
        label.style.fontSize = '12px';
        // Animate labels appearing
        label.style.opacity = '0';
        setTimeout(() => {
            label.style.opacity = '1';
            label.style.transition = 'opacity 0.5s';
        }, 800 + i * 100);
        yAxis.appendChild(label);
    });
    
    // Y axis title
    const yTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    yTitle.setAttribute('transform', 'rotate(-90)');
    yTitle.setAttribute('x', -innerHeight / 2);
    yTitle.setAttribute('y', -40);
    yTitle.setAttribute('text-anchor', 'middle');
    yTitle.textContent = 'Number of Patients';
    yTitle.style.fontSize = '14px';
    yTitle.style.opacity = '0';
    setTimeout(() => {
        yTitle.style.opacity = '1';
        yTitle.style.transition = 'opacity 1s';
    }, 1200);
    chart.appendChild(yTitle);
    
    // Create line for patients with animation
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const lineGenerator = createLineGenerator(yearlyData, 'patients', xScale, yScale);
    line.setAttribute('d', lineGenerator);
    line.setAttribute('fill', 'none');
    line.setAttribute('stroke', '#00b3b3');
    line.setAttribute('stroke-width', '3');
    line.style.strokeDasharray = '1000';
    line.style.strokeDashoffset = '1000';
    chart.appendChild(line);
    
    // Animate the line drawing
    setTimeout(() => {
        line.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
        line.style.strokeDashoffset = '0';
    }, 1000);
    
    // Add dots for data points with animation
    yearlyData.forEach((d, i) => {
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('cx', xScale(i));
        dot.setAttribute('cy', yScale(d.patients));
        dot.setAttribute('r', '0'); // Start with radius 0
        dot.setAttribute('fill', '#00b3b3');
        
        // Animate dots appearing
        setTimeout(() => {
            dot.style.transition = 'r 0.5s ease-out';
            dot.setAttribute('r', '5');
        }, 1500 + i * 200);
        
        // Add tooltip on hover
        dot.addEventListener('mouseover', function(e) {
            // Create tooltip element
            const tooltip = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            tooltip.setAttribute('id', 'tooltip');
            
            const tooltipRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            tooltipRect.setAttribute('x', xScale(i) - 60);
            tooltipRect.setAttribute('y', yScale(d.patients) - 60);
            tooltipRect.setAttribute('width', '120');
            tooltipRect.setAttribute('height', '50');
            tooltipRect.setAttribute('rx', '5');
            tooltipRect.setAttribute('fill', 'rgba(0, 0, 0, 0.8)');
            tooltip.appendChild(tooltipRect);
            
            const tooltipText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            tooltipText.setAttribute('x', xScale(i));
            tooltipText.setAttribute('y', yScale(d.patients) - 30);
            tooltipText.setAttribute('text-anchor', 'middle');
            tooltipText.setAttribute('fill', 'white');
            tooltipText.textContent = `${d.year}: ${d.patients} patients`;
            tooltip.appendChild(tooltipText);
            
            chart.appendChild(tooltip);
            
            // Animate dot on hover
            this.setAttribute('r', '8');
            this.style.transition = 'r 0.2s';
        });
        
        dot.addEventListener('mouseout', function() {
            const tooltip = document.getElementById('tooltip');
            if (tooltip) tooltip.remove();
            this.setAttribute('r', '5');
        });
        
        chart.appendChild(dot);
    });
    
    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const chartType = this.getAttribute('data-chart');
            updateChart(chartType);
        });
    });
    
    function updateChart(type) {
        // Clear existing elements
        while (chart.firstChild) {
            chart.removeChild(chart.firstChild);
        }
        
        if (type === 'yearly') {
            // Re-add the axes
            chart.appendChild(xAxis);
            chart.appendChild(yAxis);
            chart.appendChild(yTitle);
            
            // Re-add the line with animation
            const newLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            newLine.setAttribute('d', lineGenerator);
            newLine.setAttribute('fill', 'none');
            newLine.setAttribute('stroke', '#00b3b3');
            newLine.setAttribute('stroke-width', '3');
            newLine.style.strokeDasharray = '1000';
            newLine.style.strokeDashoffset = '1000';
            chart.appendChild(newLine);
            
            setTimeout(() => {
                newLine.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
                newLine.style.strokeDashoffset = '0';
            }, 100);
            
            // Re-add dots for yearly data with animation
            yearlyData.forEach((d, i) => {
                const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                dot.setAttribute('cx', xScale(i));
                dot.setAttribute('cy', yScale(d.patients));
                dot.setAttribute('r', '0');
                dot.setAttribute('fill', '#00b3b3');
                chart.appendChild(dot);
                
                setTimeout(() => {
                    dot.style.transition = 'r 0.5s ease-out';
                    dot.setAttribute('r', '5');
                }, 500 + i * 100);
            });
        } else if (type === 'regional') {
            // Create bars for regional data with animation
            const barWidth = innerWidth / regionalData.length - 20;
            
            // Re-add the Y axis
            chart.appendChild(yAxis);
            chart.appendChild(yTitle);
            
            regionalData.forEach((d, i) => {
                const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                bar.setAttribute('x', i * (barWidth + 20));
                bar.setAttribute('y', yScale(d.patients));
                bar.setAttribute('width', barWidth);
                bar.setAttribute('height', innerHeight - yScale(d.patients));
                bar.setAttribute('fill', '#007acc');
                bar.style.opacity = '0';

                setTimeout(() => {
                    bar.style.transition = 'opacity 0.5s ease, height 0.5s ease';
                    bar.style.opacity = '1';
                }, 300 + i * 150);

                // Tooltip on hover
                bar.addEventListener('mouseover', function () {
                    const tooltip = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                    tooltip.setAttribute('id', 'tooltip');

                    const tooltipRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    tooltipRect.setAttribute('x', i * (barWidth + 20) - 20);
                    tooltipRect.setAttribute('y', yScale(d.patients) - 50);
                    tooltipRect.setAttribute('width', '140');
                    tooltipRect.setAttribute('height', '40');
                    tooltipRect.setAttribute('rx', '5');
                    tooltipRect.setAttribute('fill', 'rgba(0, 0, 0, 0.8)');
                    tooltip.appendChild(tooltipRect);

                    const tooltipText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    tooltipText.setAttribute('x', i * (barWidth + 20) + barWidth / 2);
                    tooltipText.setAttribute('y', yScale(d.patients) - 25);
                    tooltipText.setAttribute('text-anchor', 'middle');
                    tooltipText.setAttribute('fill', 'white');
                    tooltipText.textContent = `${d.region}: ${d.patients} patients`;
                    tooltip.appendChild(tooltipText);

                    chart.appendChild(tooltip);
                });

                bar.addEventListener('mouseout', function () {
                    const tooltip = document.getElementById('tooltip');
                    if (tooltip) tooltip.remove();
                });

                chart.appendChild(bar);

                // Region labels
                const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                label.setAttribute('x', i * (barWidth + 20) + barWidth / 2);
                label.setAttribute('y', innerHeight + 20);
                label.setAttribute('text-anchor', 'middle');
                label.setAttribute('fill', '#333');
                label.setAttribute('font-size', '12px');
                label.textContent = d.region;
                chart.appendChild(label);
            });
        }
    }

    function createScale(domain, range) {
        const [d0, d1] = domain;
        const [r0, r1] = range;
        const scale = (value) => r0 + ((value - d0) * (r1 - r0)) / (d1 - d0);
        return scale;
    }

    function createLineGenerator(data, key, xScale, yScale) {
        return data.map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(i)},${yScale(d[key])}`).join(' ');
    }
}