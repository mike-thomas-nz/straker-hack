import $ from "jquery";

(function () {
    function checkTime(i) {
        return (i < 10) ? "0" + i : i;
    }

    function startTime() {
        var today = new Date(),
            h = checkTime(today.getHours()),
            m = checkTime(today.getMinutes()),
            s = checkTime(today.getSeconds());
        document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
        setTimeout(function () {
            startTime()
        }, 500);
    }
    startTime();
})();

$.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
    // eslint-disable-next-line
    // var myinfo = JSON.stringify(data, null, 2);
    // console.log(myinfo);
    // document.getElementById('info').innerHTML = info;
    addRow("geobytesipaddress", data['geobytesipaddress'])
    addRow("geobytescountry", data['geobytescountry'])
    addRow("geobytesregion", data['geobytesregion'])
    addRow("geobyteslocationcode", data['geobyteslocationcode'])
    addRow("geobytescity", data['geobytescity'])
    addRow("geobyteslatitude", data['geobyteslatitude'])
    addRow("geobyteslongitude", data['geobyteslongitude'])
    addRow("geobytestimezone", data['geobytestimezone'])
});


function addRow(val1, val2) {
    var table = document.getElementById("infoTable");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = val1;
    cell2.innerHTML = val2;
  }
