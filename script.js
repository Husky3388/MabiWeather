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

function createTableHeader() {
    let militaryTime = document.getElementById('militaryTime').checked;
    let tableHeader = document.getElementById('tableHeader');
    var tableHeader_contents = '';
    var hour = '';
    var minute = '';
    var meridiem = '';
    var time = '';

    tableHeader_contents += '<tr><th scope="col" style="position: sticky; left: 0;">Area</th>';
    for (let i = 0; i < 24; i++) {
        if (militaryTime == true) {
            hour = ('0' + i).slice(-2);
        } else if (militaryTime == false) {
            if (i == 0) {
                hour = '12';
                meridiem = ' A.M.';
            } else if (i > 0 && i < 12) {
                hour = ('0' + i).slice(-2);
                meridiem = ' A.M.';
            } else if (i >= 12 && i < 24) {
                hour = ('0' + (i - 12)).slice(-2);
                meridiem = ' P.M.';
            }
        }
        for (let j = 0; j < 60; j+=20) {
            minute = ('0' + j).slice(-2);
            time = hour + ':' + minute + meridiem;
            tableHeader_contents += '<th scope="col">' + time + '</th>';
        }
    }
    tableHeader_contents += '</tr>';
    tableHeader.innerHTML = tableHeader_contents;
}

function createTableBody(arrayOfForecasts) {
    let debug = document.getElementById('debug').checked;
    let tableBody = document.getElementById("tableBody");
    var tableBody_contents = '';

    arrayOfForecasts.forEach(function(forecast) {
        tableBody_contents += '<tr><th scope="row" style="word-wrap: break-word;position: sticky; left: 0;">' + forecast.area + '</th>';
        forecast.weather.forEach(function(weather) {
            tableBody_contents += '<td style="text-align: center;">' + weatherIcon[weather];
            if (debug == true) {
                tableBody_contents += '<p>' + weather + '</p>';
            }
            tableBody_contents += '</td>';
        });
        tableBody_contents += '</tr>';
    });
    tableBody.innerHTML = tableBody_contents;
}

async function getData() {
    let data;
    let arrayOfForecasts = new Array();
    let selectedDate = document.getElementById('date').value;
    // let selectedTime = document.getElementById('time').value;
    let selectedTime = '00:00:00';
    let selectedTimezone = document.getElementById('timezone');
    let timezone = selectedTimezone.options[selectedTimezone.selectedIndex].value;
    let button_getData = document.getElementById('button_getData');

    button_getData.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

    createTableHeader();

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

    createTableBody(arrayOfForecasts);

    button_getData.innerHTML = 'Get Weather';
}

document.getElementById('date').value = new Date().toISOString().split('T')[0];
// document.getElementById('time').value = ('0' + new Date().getHours()).slice(-2)
//                                         + ":" + ('0' + new Date().getMinutes()).slice(-2)
//                                         + ":" + ('0' + new Date().getSeconds()).slice(-2)