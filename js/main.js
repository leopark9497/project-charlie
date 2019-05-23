//Google API for places 
const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)
searchBox.addListener('places_changed', ()=> {
   const place = searchBox.getPlaces()[0]
   let aqi = document.querySelector('.aqi')
   let station = document.querySelector('.station')
  
   if (place == null) {return} else {
     const latitude = place.geometry.location.lat();
     const longtitude = place.geometry.location.lng();
     fetch(`https://api.waqi.info/feed/geo:${latitude};${longtitude}/?token=8bd8be89aa93e6cf4a2993a598775dd94b20065e`)
       .then(function(response) {
         return response.json();
       })
       .then(function(data) {
         //DOM manipulation here !!!
         let link=`https://www.google.com/maps/embed/v1/search?key=AIzaSyDPdSf1Rvt_ezerNCumo8H-GRmgJBHdoQg&q=${data.data.city.name}`;
         console.log(data);
         document.querySelector("iframe").setAttribute("src",link);
         aqi.textContent = data.data.aqi;
         station.textContent = data.data.city.name;
       });
       
   }
})
