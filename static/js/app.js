GRAPHS = {
    'scatter-life-expetancy':  {
        url: '/life_expectancy_satisfactions',
        onLoad: function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
    
        var svgWidth = 960;
        var svgHeight = 500;
    
        var margin = {
            top: 20,        
            right: 40,
            bottom: 60,
            left: 100
        };
    
        var width = svgWidth - margin.left - margin.right;
        var height = svgHeight - margin.top - margin.bottom;
    
    // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
        var svg = d3.select("#scatter")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);
    
        var chartGroup = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
        // Create scale functions
        // ==============================
        var xLinearScale = d3.scaleLinear()
            .domain([d3.min(data, d => d.lifeExpectancy), d3.max(data, d => d.lifeExpectancy)])
            .range([0, width]);
    
    
        var yLinearScale = d3.scaleLinear()
            .domain([d3.min(data, d => d.lifeSatisfaction), d3.max(data, d => d.lifeSatisfaction)])
            .range([height, 0]);
    
        var populationScale = d3.scaleLinear()
            .domain([d3.min(data, d => d.population), d3.max(data, d => d.population)])
            .range([5, 30]);
    
        // Create axis functions
        // ==============================
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);
    
        var palette = d3.scaleOrdinal(d3.schemeCategory10);
    
        var toolTip = d3.tip()
            .attr("class", "d3-tip")
            .html(function (d) {
                return (`${d.country}<br>Life Expectancy: 
    ${d.lifeExpectancy.toFixed(2)}<br>Life Satisfaction: ${d.lifeSatisfaction.toFixed(2)}<br>
    Population: ${numberWithCommas(d.population)}`);
            });
    
        chartGroup.call(toolTip);
    
        //Create Circles
        // ==============================
        var circlesGroup = chartGroup.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xLinearScale(d.lifeExpectancy))
            .attr("cy", d => yLinearScale(d.lifeSatisfaction))
            .attr("r", d => populationScale(d.population))
            .attr("class", "countryCircle")
            .attr("fill", function (d, i) {
                return palette(i);
            })
            .on('mouseover', toolTip.show)
            .on('mouseout', toolTip.hide);
    
    
        //Append Axes to the chart
        // ==============================
        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);
    
        chartGroup.append("g")
            .call(leftAxis);
    
        // Create axes labels
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 40)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("class", "aText")
            .text("Life satisfaction (lowest=0 to highest=10 in 2013");
    
        chartGroup.append("text")
            .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
            .attr("class", "aText")
            .text("Life Expectancy");
    
    }
},
    'scatter-gdp': {
        url: '/gdptest',
        onLoad: function () {
            // Begin accessing JSON data here
            var data = JSON.parse(this.response);
      
            var svgWidth = 960;
            var svgHeight = 500;
        
            var margin = {
                top: 20,        
                right: 40,
                bottom: 60,
                left: 100
            };
        
            var width = svgWidth - margin.left - margin.right;
            var height = svgHeight - margin.top - margin.bottom;
        
        // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
            var svg = d3.select("#scatter")
                .append("svg")
                .attr("width", svgWidth)
                .attr("height", svgHeight);
        
            var chartGroup = svg.append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);
            // Create scale functions
            // ==============================
            var xLinearScale = d3.scaleLinear()
                .domain([d3.min(data, d => d.gdp) - 10000, d3.max(data, d => d.gdp)])
                .range([0, width]);
        
        
            var yLinearScale = d3.scaleLinear()
                .domain([d3.min(data, d => d.lifeSatisfaction), d3.max(data, d => d.lifeSatisfaction)])
                .range([height, 0]);
        
         
        
            // Create axis functions
            // ==============================
            var bottomAxis = d3.axisBottom(xLinearScale);
            var leftAxis = d3.axisLeft(yLinearScale);
        
            var palette = d3.scaleOrdinal(d3.schemeCategory10);
        
            var toolTip = d3.tip()
                .attr("class", "d3-tip")
                .html(function (d) {
                    return (`${d.country}<br>GDP: 
        ${d.gdp.toFixed(2)}<br>Life Satisfaction: ${d.lifeSatisfaction.toFixed(2)}<br>`);
                });
        
            chartGroup.call(toolTip);
        
            //Create Circles
            // ==============================
            var circlesGroup = chartGroup.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", d => xLinearScale(d.gdp))
                .attr("cy", d => yLinearScale(d.lifeSatisfaction))
                .attr("r", 5)
                .attr("class", "countryCircle")
                .attr("fill", function (d, i) {
                    return palette(i);
                }).attr("opacity",0.5)
                .on('mouseover', toolTip.show)
                .on('mouseout', toolTip.hide);
        
        
            // var circlesText = chartGroup.selectAll("text")
            //     .data(data)
            //     .enter()
            //     .append("text")
            //     .attr("x", d => xLinearScale(d.lifeExpectancy))
            //     .attr("y", d => yLinearScale(d.lifeSatisfaction))
            //     .text(function (d) {
            //         return d.country;
            //     })
            //     .attr("class", "countryText");
        
            //Append Axes to the chart
            // ==============================
            chartGroup.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(bottomAxis);
        
            chartGroup.append("g")
                .call(leftAxis);
        
            // Create axes labels
            chartGroup.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left + 40)
                .attr("x", 0 - (height / 2))
                .attr("dy", "1em")
                .attr("class", "aText")
                .text("Life satisfaction (lowest=0 to highest=10 in 2017");
        
            chartGroup.append("text")
                .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
                .attr("class", "aText")
                .text("GDP");
      
      }
    },
    'scatter-happiness': {
        url: '/happiness', 
        onLoad: function () {
        // Creating map object
            var myMap = L.map("map", {
            center: [37.8,-96],
            zoom: 2.5
        });
  
        // Adding tile layer
           L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
           attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
           maxZoom: 18,
           id: "mapbox.light",
           accessToken: API_KEY
           }).addTo(myMap);
  
  // Link to GeoJSON
         var GetDataLink = "http://127.0.0.1:5000/happiness.geojson";
         var geojson;
  
  // Grab data with d3
         d3.json(GetDataLink, function(data) {
           console.log(data)
  
    // // control that shows country info on hover
          var info = L.control();
  
          info.onAdd = function(myMap) {
             this._div = L.DomUtil.create("div", "info");
             this.update();
             return this._div;
         };
  
        info.update = function(props) {
            this._div.innerHTML =
         "<h4>World Happiness Index</h4>" +
         (props
           ? "<b>" +
             props.Entity +
             "</b><br />" +
             props.WHR +
             "index"
             : "Hover over a country");
        };
   
          info.addTo(myMap);
  
        // // get color depending on world happiness report value
           function getColor(d) {
            return d > 5
               ? "#800026"
               : d > 4
               ? "#BD0026"
               : d > 3
               ? "#E31A1C"
               : d > 2
               ? "#FC4E2A"
                 : d > 1 ? "#FEB24C" : d > 0 ? "#FED976" : "#FFEDA0";
             }
  
             function style(feature) {
             return {
              weight: 2,
              opacity: 1,
             color: "white",
              dashArray: "3",
              fillOpacity: 0.7,
              fillColor: getColor(feature.properties.WHR)
              };
            }
  
             function highlightFeature(e) {
              var layer = e.target;
  
              layer.setStyle({
               weight: 5,
               color: "#666",
               dashArray: "",
               fillOpacity: 0.7
             });
  
               if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
               layer.bringToFront();
            }
  
             info.update(layer.feature.properties);
          }
  
              var geojson;
  
              function resetHighlight(e) {
               geojson.resetStyle(e.target);
               info.update();
             }
  
              function zoomToFeature(e) {
              map.fitBounds(e.target.getBounds());
             }
  
               function onEachFeature(feature, layer) {
               layer.on({
                mouseover: highlightFeature,
         //mouseover: function(){
         //}
               mouseout: resetHighlight,
               click: zoomToFeature
              });
               }
    
             geojson = L.geoJSON(data, {
             style: style,
             onEachFeature: onEachFeature
              }).addTo(myMap);
  
    // // // Binding a pop-up to each layer
    //  L.geoJson(data, {
    //   pointToLayer: function(feature, latlng) {
    //    return L.circleMarker(latlng);
    //  },
    //  style: styleInfo,
    //  onEachFeature: function(feature, layer) {
    //    layer.bindPopup(feature.properties.Entity + ", " + "<br>World Happiness Index<br>" + feature.properties.WHR);
    //       }
    //     }).addTo(myMap),
  
    // Set up the legend - here is for project 2
               var legend = L.control({ position: "bottomright" });
  
             legend.onAdd = function(myMap) {
                var div = L.DomUtil.create("div", "info legend"),
                grades = [0, 1, 2, 3, 4, 5],
                labels = [],
                from,
                to;
   
                for (var i = 0; i < grades.length; i++) {
                from = grades[i];
                to = grades[i + 1];
                labels.push(
                '<i style="background:' +
                getColor(from + 1) +
                 '"></i> ' +
                 from +
                 (to ? "&ndash;" + to : "+")
                );
                 }
   
                 div.innerHTML = labels.join("<br>");
                 return div;
                };
   
                legend.addTo(myMap);
  
                 });
                 }
                 }
                 };

function optionChanged(value){
    d3.select("svg").remove();
var request = new XMLHttpRequest();
request.open('GET', GRAPHS[value].url, true);
request.onload = GRAPHS[value].onLoad;
request.send();
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

optionChanged('scatter-life-expetancy');