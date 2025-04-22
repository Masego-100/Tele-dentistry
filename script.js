let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -26.2708, lng: 28.1123 }, // Centered in Gauteng
    zoom: 7,
  });

  // Adding markers
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
    contentString = `<strong>${schoolName}</strong><br>${visitInfo}<br><a href="${link}" target="_blank">More info</a>`;
  } else {
    contentString = `<strong>${schoolName}</strong><br>${visitInfo}<br><img src="${link}" width="200" alt="${schoolName}">`;
  }

  const infoWindow = new google.maps.InfoWindow({ content: contentString });

  marker.addListener("click", () => {
    infoWindow.open(map, marker);
  });
}

// COUNTER ANIMATION 
const counters = document.querySelectorAll('.count');

counters.forEach(counter => {
  let target = +counter.getAttribute('data-target');
  let count = 0;
  let duration = 3000; // total duration in ms
  let steps = 60;
  let increment = Math.ceil(target / steps);
  let interval = duration / steps;

  const update = () => {
    count += increment;
    if (count < target) {
      counter.innerText = count.toLocaleString();
      setTimeout(update, interval);
    } else {
      counter.innerText = target.toLocaleString();
    }
  };

  update();
});

