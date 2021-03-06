function mapInit() {
  const mymap = L.map('mapid').setView([38.9897, -76.9378], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZmhhZmVleiIsImEiOiJja201c2ZwdzIwaDgyMnJvOWJtZmVqMWRlIn0.0WFHykmvh6DGQwe9pQpM9A'
  }).addTo(mymap);
  console.log('mymap', mymap);
  return mymap;
}
  
async function dataHandler(mapFromLeaflet) {
  const form = document.querySelector('#form');
  const search = document.querySelector('#search');
  const targetList = document.querySelector('.target-list');

  const request = await fetch(
    'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'
  );
  data = await request.json();
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const filtered = data.filter(
      (place) => place.geocoded_column_1 && place.zip.includes(search.value)
    );
    const topFive = filtered.slice(0, 5);
    console.table(topFive);
    targetList.innerHTML = '';

    topFive.forEach((item) => {
      const longLat = item.geocoded_column_1.coordinates;
      const marker = L.marker([longLat[1], longLat[0]]).addTo(mapFromLeaflet);
      const appendItem = document.createElement('li');
      appendItem.classList.add('block');
      appendItem.classList.add('list-item');
      appendItem.innerHTML = `<div class ='name'>${item.name}</div><div class='address'>${item.address_line_1}</div>`;
      targetList.append(appendItem);
    });
    const { coordinates } = topFive[0]?.geocoded_column_1;
    mapFromLeaflet.panTo([coordinates[1], coordinates[0]], 0);
  });
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}
  
window.onload = windowActions;