import database from './database-object.js';

let reportsContainer = document.getElementById('reports-container');

let typeFilter = document.getElementById('type');

function formatDate(dateString) {
    let d = new Date(dateString);
    return d.toLocaleString('bg-BG');
}

function createReportCard(report) {
    let div = document.createElement('div');
    div.className = 'report-card';
    let reportType = report.type.toLowerCase();
    if (reportType !== 'fire' && reportType !== 'accident') {
        reportType = 'other';
    }
    div.dataset.type = reportType;
    
    let date = formatDate(report.date);
    let firefighters = '';
    if (report.firefighters && report.firefighters.length > 0) {
        firefighters = report.firefighters.join(', ');
    }

    let statusDiv = document.createElement('div');
    statusDiv.className = 'status-notification';
    statusDiv.id = 'status-' + report.date;
    
    div.innerHTML = '<div class="report-header">' +
        '<span class="report-type">' + (report.type === "accident" ? "Инцидент" : report.type === "fire" ? "Пожар" : report.type) + '</span>' +
        '<span class="report-date">' + date + '</span>' +
        '</div>' +
        '<div class="report-details">' +
        '<p class="report-location">Място: ' + report.location + '</p>' +
        '<p class="report-firefighters">Екип: ' + firefighters + '</p>' +
        '</div>';
    
    div.appendChild(statusDiv);
    
    startStatusTimer(statusDiv, report.date);
    
    return div;
}

function startStatusTimer(statusElement, reportDate) {
    const reportTime = new Date(reportDate).getTime();
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - reportTime;

    const minutesDiff = Math.floor(timeDiff / (1000 * 60));

    function updateStatus() {
        const now = new Date().getTime();
        const elapsedMinutes = Math.floor((now - reportTime) / (1000 * 60));

        if (elapsedMinutes < 10) {
            statusElement.textContent = 'В момента се изпраща';
            statusElement.className = 'status-notification status-dispatching';
        } else if (elapsedMinutes < 15) {
            statusElement.textContent = 'Очаква се информация';
            statusElement.className = 'status-notification status-awaiting';
        } else {
            statusElement.textContent = 'Безопасно';
            statusElement.className = 'status-notification status-safe';
            return;
        }

        setTimeout(updateStatus, 60000);
    }

    updateStatus();
}

/*
    // For testing purposes, the time is reduced to check if the code works and presenting the idea
    function startStatusTimer(statusElement, reportDate) {
        const reportTime = new Date(reportDate).getTime();
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - reportTime;

        const secondsDiff = Math.floor(timeDiff / 1000);

        function updateStatus() {
            const now = new Date().getTime();
            const elapsedSeconds = Math.floor((now - reportTime) / 1000);

            if (elapsedSeconds < 10) {
                statusElement.textContent = 'В момента се изпраща';
                statusElement.className = 'status-notification status-dispatching';
            } else if (elapsedSeconds < 15) {
                statusElement.textContent = 'Очаква се информация';
                statusElement.className = 'status-notification status-awaiting';
            } else {
                statusElement.textContent = 'Безопасно';
                statusElement.className = 'status-notification status-safe';
                return;
            }

            setTimeout(updateStatus, 1000);
        }

        updateStatus();
    }
*/

function updateReportsDisplay() {
    let selectedType = typeFilter.value;
    let cards = reportsContainer.querySelectorAll('.report-card');
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        if (selectedType === 'all' || card.dataset.type === selectedType) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    }
}

function loadReports() {
    let tx = database.transaction('disasters', 'readonly');
    let store = tx.objectStore('disasters');
    let promise = store.getAll();
    promise.then(function(reports) {
        reportsContainer.innerHTML = "";
        reports.sort(function(a, b) {
            return new Date(b.date) - new Date(a.date);
        });
        for (let i = 0; i < reports.length; i = i + 1) {
            let card = createReportCard(reports[i]);
            reportsContainer.appendChild(card);
        }
        if (reports.length == 0) {
            reportsContainer.innerHTML = "Няма изпратени доклади";
        }
        updateReportsDisplay();
    });
}

typeFilter.addEventListener('change', updateReportsDisplay);

loadReports();