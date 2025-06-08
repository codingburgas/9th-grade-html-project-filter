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

    div.innerHTML = '<div class="report-header">' +
        '<span class="report-type">' + (report.type === "accident" ? "Инцидент" : report.type === "fire" ? "Пожар" : report.type) + '</span>' +
        '<span class="report-date">' + date + '</span>' +
        '</div>' +
        '<div class="report-details">' +
        '<p class="report-location">Място: ' + report.location + '</p>' +
        '<p class="report-firefighters">Екип: ' + firefighters + '</p>' +
        '</div>';
    return div;
}

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