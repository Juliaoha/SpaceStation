let map, marker, longitude, latitude;

const image =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/068916a4-2e4a-4715-bc1d-de78b05985fb/d79ylf9-6365b866-1673-4967-8c5b-d59369b7cf49.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi8wNjg5MTZhNC0yZTRhLTQ3MTUtYmMxZC1kZTc4YjA1OTg1ZmIvZDc5eWxmOS02MzY1Yjg2Ni0xNjczLTQ5NjctOGM1Yi1kNTkzNjliN2NmNDkuZ2lmIn1dXX0.MMgn5f06ELGoittqgXDZdt5jabn7JnBVPfTjJ49Nmac";

function spaceStation() {
  fetch("http://api.open-notify.org/iss-now.json")
    .then((response) => response.json())
    .then((data) => {
      if (!map) {
        latitude = parseFloat(data.iss_position.latitude);
        longitude = parseFloat(data.iss_position.longitude);
        initMap();
      }

      if (marker) {
        marker.setPosition({
          lat: parseFloat(data.iss_position.latitude),
          lng: parseFloat(data.iss_position.longitude),
        });
      }

      const latitudePTag = document.querySelector("#latitude");
      const longitudePTag = document.querySelector("#longitude");
      latitudePTag.innerText = data.iss_position.latitude;
      longitudePTag.innerText = data.iss_position.longitude;
    });
}

setInterval(spaceStation, 100);

function initMap() {
  if (latitude && longitude) {
    let myLatLng = { lng: longitude, lat: latitude };
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: myLatLng,
    });

    marker = new google.maps.Marker({
      position: myLatLng,
      map,
      icon: image,
      title: "International Space Station! Weeeeeeeeeeee",
    });
  }
}
