// Define tooth information
const toothInfo = {
    1: "Molar: Back teeth used for grinding food",
    2: "Premolar: Helps crush and grind food",
    3: "Tongue: Helps with taste, speech, and swallowing",
    4: "Tongue: Contains taste buds for different flavors",
    5: "Gums: Protect the roots of your teeth",
    6: "Palate: Roof of your mouth, helps with speech",
    9: "Incisor: Front teeth used for biting food"
};

// Add event listeners to points
document.querySelectorAll('.model-point').forEach(point => {
    point.addEventListener('mouseover', function(e) {
        const pointNumber = this.textContent;
        const tooltip = document.getElementById('tooltip');
        tooltip.textContent = toothInfo[pointNumber];
        tooltip.style.top = (e.pageY - 80) + 'px';
        tooltip.style.left = (e.pageX - 100) + 'px';
        tooltip.style.display = 'block';
    });

    point.addEventListener('mouseout', function() {
        document.getElementById('tooltip').style.display = 'none';
    });

    point.addEventListener('click', function() {
        const pointNumber = this.textContent;
        alert('Tooth information: ' + toothInfo[pointNumber]);
    });
});

// Expand view button functionality
document.querySelector('.expand-button').addEventListener('click', function() {
    const modelContainer = document.querySelector('.model-container');
    if (modelContainer.style.height !== '600px') {
        modelContainer.style.height = '600px';
        this.textContent = 'Collapse View';
    } else {
        modelContainer.style.height = 'auto';
        this.textContent = 'Expand View';
    }
});

// VR and Listen buttons (placeholders)
document.querySelector('.vr-button').addEventListener('click', function() {
    alert('VR view coming soon!');
});

document.querySelector('.listen-button').addEventListener('click', function() {
    alert('Audio narration coming soon!');
});

// Back to home functionality
document.querySelector('.logo').addEventListener('click', function() {
    window.location.href = 'index.html';
});