class Forecast {
    constructor(area, weather) {
        this.area = area;
        this.weather = weather;
    }
}

const area = {
    type1: 'Tir Chonaill, Dugald Aisle, Dugald Residential + Castle',
    type2: 'Dunbarton, Gairech, Port Cobh, Fiodh',
    type3: 'Bangor',
    type4: 'Emain Macha',
    type5: 'Sen Mag, Sen Mag Residential + Castle',
    type6: 'Port Cean, Morva Aisle',
    type7: 'Rano, Nubes',
    type8: 'Connous',
    type9: 'Courcle, Irai Falls',
    type10: 'Physis, Zardine',
    type11: 'Shadow Realm',
    type12: 'Taillteann, Tara, Corrib Valley, Blago Prairie, Sliab Cuilin, Abb Neagh',
    type13: 'Unused'
}

const weatherIcon = {
    '-9': '<i class="bi bi-question"></i>',
    '-8': '<i class="bi bi-sun"></i>',
    '-7': '<i class="bi bi-cloudy"></i>',
    '-6': '<i class="bi bi-cloudy"></i>',
    '-5': '<i class="bi bi-cloudy"></i>',
    '-4': '<i class="bi bi-cloudy"></i>',
    '-3': '<i class="bi bi-cloudy"></i>',
    '-2': '<i class="bi bi-cloudy"></i>',
    '-1': '<i class="bi bi-cloudy"></i>',
    '0': '<i class="bi bi-cloud-rain"></i>',
    '1': '<i class="bi bi-cloud-rain"></i>',
    '2': '<i class="bi bi-cloud-rain"></i>',
    '3': '<i class="bi bi-cloud-rain"></i>',
    '4': '<i class="bi bi-cloud-rain"></i>',
    '5': '<i class="bi bi-cloud-rain"></i>',
    '6': '<i class="bi bi-cloud-rain"></i>',
    '7': '<i class="bi bi-cloud-rain"></i>',
    '8': '<i class="bi bi-cloud-rain"></i>',
    '9': '<i class="bi bi-cloud-rain"></i>',
    '10': '<i class="bi bi-cloud-rain"></i>',
    '11': '<i class="bi bi-cloud-rain"></i>',
    '12': '<i class="bi bi-cloud-rain"></i>',
    '13': '<i class="bi bi-cloud-rain"></i>',
    '14': '<i class="bi bi-cloud-rain"></i>',
    '15': '<i class="bi bi-cloud-rain"></i>',
    '16': '<i class="bi bi-cloud-rain"></i>',
    '17': '<i class="bi bi-cloud-rain"></i>',
    '18': '<i class="bi bi-cloud-rain"></i>',
    '19': '<i class="bi bi-cloud-rain"></i>',
    '20': '<i class="bi bi-cloud-lightning-rain"></i>',
}

async function getData() {
    let data;
    let arrayOfForecasts = new Array();
    let selectedDate = document.getElementById('date').value;
    // let selectedTime = document.getElementById('time').value;
    let selectedTime = '00:00:00';
    let selectedTimezone = document.getElementById('timezone');
    let timezone = selectedTimezone.options[selectedTimezone.selectedIndex].value;
    let debug = document.getElementById('debug').checked;
    document.getElementById('button_getData').innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
    for (let i = 1; i < 14; i++) {
        let type = 'type' + i;
        const fetchData = await fetch(
            'https://mabi.world/api/forecast/?from=' + selectedDate + 'T' + selectedTime
            + '&of=' + type
            + '&duration=72'
            + '&tz=' + timezone);
        data = await fetchData.json();
        var key = Object.keys(data.forecast)[0];
        var value = data.forecast[type];
        arrayOfForecasts.push(new Forecast(area[key], value));
    }
    var table = document.getElementById("tableContents");
    var tableContents = '';
    arrayOfForecasts.forEach(function(forecast) {
        tableContents += '<tr><th scope="row" style="word-wrap: break-word;position: sticky; left: 0;">' + forecast.area + '</th>';
        forecast.weather.forEach(function(weather) {
            tableContents += '<td style="text-align: center;">' + weatherIcon[weather];
            if (debug == true) {
                tableContents += '<p>' + weather + '</p>';
            }
            tableContents += '</td>';
        });
        tableContents += '</tr>';
    });
    table.innerHTML = tableContents;
    document.getElementById('button_getData').innerHTML = 'Get Weather';
}

document.getElementById('date').value = new Date().toISOString().split('T')[0];
// document.getElementById('time').value = ('0' + new Date().getHours()).slice(-2)
//                                         + ":" + ('0' + new Date().getMinutes()).slice(-2)
//                                         + ":" + ('0' + new Date().getSeconds()).slice(-2)