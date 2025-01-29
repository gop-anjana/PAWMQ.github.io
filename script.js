// Get current sensor readings when the page loads  
window.addEventListener('load', getReadings);

// Create ph Gauge
var gaugeTemp = new LinearGauge({
  renderTo: 'gauge-pH',
  width: 120,
  height: 400,
  units: "pH",
  minValue: 0,
  startAngle: 90,
  ticksAngle: 180,
  maxValue: 14,
  value: 7,
  colorValueBoxRect: "#049faa",
  colorValueBoxRectEnd: "#049faa",
  colorValueBoxBackground: "#f1fbfc",
  valueDec: 2,
  valueInt: 2,
  majorTicks: [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14"

  ],
  minorTicks: 4,
  strokeTicks: true,
  highlights: [
      {
          "from": 30,
          "to": 40,
          "color": "rgba(200, 50, 50, .75)"
      }
  ],
  colorPlate: "#fff",
  colorBarProgress: "#CC2936",
  colorBarProgressEnd: "#049faa",
  borderShadowWidth: 0,
  borders: false,
  needleType: "arrow",
  needleWidth: 2,
  needleCircleSize: 7,
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: 1500,
  animationRule: "linear",
  barWidth: 10,
}).draw();
 
// Create Humidity Gauge
var gaugeHum = new RadialGauge({
  renderTo: 'gauge-Turbidity',
  width: 300,
  height: 300,
  units: "NTU",
  minValue: 0,
  maxValue: 40,
  value: .5, 
  colorValueBoxRect: "#049faa",
  colorValueBoxRectEnd: "#049faa",
  colorValueBoxBackground: "#f1fbfc",
  valueInt: 2,
  majorTicks: [
      "0",
      "5",
      "10",
      "15",
      "20",
      "25",
      "30",
      "35",
      "40"

  ],
  minorTicks: 4,
  strokeTicks: true,
  highlights: [
      {
          "from": 0,
          "to": 5,
          "color": "#03C0C1"
      }
  ],
  colorPlate: "#fff",
  borderShadowWidth: 0,
  borders: false,
  needleType: "line",
  colorNeedle: "#007F80",
  colorNeedleEnd: "#007F80",
  needleWidth: 2,
  needleCircleSize: 3,
  colorNeedleCircleOuter: "#007F80",
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: 1500,
  animationRule: "linear"
}).draw();

var gaugeTemp = new LinearGauge({
  renderTo: 'gauge-TDS',
  width: 120,
  height: 400,
  units: "ppm",
  minValue: 0,
  value: 93, 
  startAngle: 90,
  ticksAngle: 180,
  maxValue: 1200,
  colorValueBoxRect: "#049faa",
  colorValueBoxRectEnd: "#049faa",
  colorValueBoxBackground: "#f1fbfc",
  valueDec: 2,
  valueInt: 2,
  majorTicks: [
      "0",
      "50",
      "100",
      "200",
      "300",
      "400",
      "500",
      "600",
      "700",
      "800",
      "900",
      "1000",
      "1100",
      "1200"

  ],
  minorTicks: 4,
  strokeTicks: true,
  highlights: [
      {
          "from": 30,
          "to": 40,
          "color": "rgba(200, 50, 50, .75)"
      }
  ],
  colorPlate: "#fff",
  colorBarProgress: "#CC2936",
  colorBarProgressEnd: "#049faa",
  borderShadowWidth: 0,
  borders: false,
  needleType: "arrow",
  needleWidth: 2,
  needleCircleSize: 7,
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: 1500,
  animationRule: "linear",
  barWidth: 10,
}).draw();

var gauge = new LinearGauge({
    renderTo: 'gauge-Flow',
    units: "gpm",
    width: 450,
    height: 250,
    minValue: 0,
    maxValue: 10,
    value: 7,
    majorTicks: [
        "0",
        "2",
        "4",
        "6",
        "8",
        "10"
    ],
    minorTicks: 10,
    strokeTicks: true,
    colorPlate: "#fff",
    borderShadowWidth: 0,
    borders: false,
    barBeginCircle: false,
    tickSide: "left",
    numberSide: "left",
    needleSide: "left",
    needleType: "line",
    needleWidth: 3,
    colorNeedle: "#222",
    colorNeedleEnd: "#222",
    animationDuration: 1500,
    animationRule: "linear",
    animationTarget: "plate",
    barWidth: 5,
    ticksWidth: 50,
    ticksWidthMinor: 15
}).draw();

// Function to get current readings on the webpage when it loads for the first time
function getReadings(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      console.log(myObj);
      var temp = myObj.temperature;
      var hum = myObj.humidity;
      gaugeTemp.value = temp;
      gaugeHum.value = hum;
    }
  };
  xhr.open("GET", "/readings", true);
  xhr.send();
}

if (!!window.EventSource) {
  var source = new EventSource('/events');
 
  source.addEventListener('open', function(e) {
    console.log("Events Connected");
  }, false);

  source.addEventListener('error', function(e) {
    if (e.target.readyState != EventSource.OPEN) {
      console.log("Events Disconnected");
    }
  }, false);
 
  source.addEventListener('message', function(e) {
    console.log("message", e.data);
  }, false);
 
  source.addEventListener('new_readings', function(e) {
    console.log("new_readings", e.data);
    var myObj = JSON.parse(e.data);
    console.log(myObj);
    gaugeTemp.value = myObj.temperature;
    gaugeHum.value = myObj.humidity;
  }, false);
}