# How do you render map data?
  - leaflet.js (https://leafletjs.com)

# Where is the map data from?
  - Maps data is pulled from OpenStreet OpenSource API (https://wiki.openstreetmap.org)

# Why OpenStreet?
  - It's free, and has all the necessary sport facilities locations

# Short overview
  1. Map tile is pulled from OpenStreet API
  2. Fitness facilities locations are pulled from API
  3. User locations (represented by coordinates) are pulled from the database, and marked by custom icon

# TODO
  1. Get data on all sport facilities in local vicinity
  2. Place all markers in local vicinity from DB on map
  3. Place marker onTouch 