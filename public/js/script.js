// Example starter JavaScript for disabling form submissions if there are invalid fields
console.log("JS loaded");
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()




<script>
    const listings = <%- JSON.stringify(mapListings) %>;

    mapboxgl.accessToken = "<%= process.env.MAP_TOKEN %>";

    const map = new mapboxgl.Map({
        container: "cluster-map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: [78.9629, 20.5937],
        zoom: 4,
    });

    map.addControl(new mapboxgl.NavigationControl());

    for (let listing of listings) {
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <h6><a href="/listings/${listing._id}">${listing.title}</a></h6>
            <p>📍 ${listing.location}, ${listing.country}</p>
            <p>₹${listing.price?.toLocaleString("en-IN")}/night</p>
        `);

        new mapboxgl.Marker({ color: "#FE424D" })
            .setLngLat(listing.geometry.coordinates)
            .setPopup(popup)
            .addTo(map);
    }
</script>