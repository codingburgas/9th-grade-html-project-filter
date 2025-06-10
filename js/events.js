import database from './database-object.js';

// Get the container where reports will be displayed
let reportsContainer = document.getElementById('reports-container');

// Get the filter dropdown for report type
let typeFilter = document.getElementById('type');

// Get the search input
let searchInput = document.getElementById('search');

// Format a date string to Bulgarian locale
function formatDate(dateString) {
    let d = new Date(dateString);
    return d.toLocaleString('bg-BG');
}

// Create a DOM card for a single report
function createReportCard(report) {
    let div = document.createElement('div');
    div.className = 'report-card';

    // Normalize report type for filtering
    let reportType = report.type.toLowerCase();
    if (reportType !== 'fire' && reportType !== 'accident') {
        reportType = 'other';
    }
    div.dataset.type = reportType;
    
    // Format date and firefighter names
    let date = formatDate(report.date);
    let firefighters = '';
    if (report.firefighters && report.firefighters.length > 0) {
        firefighters = report.firefighters.join(', ');
    }

    // Create status notification div
    let statusDiv = document.createElement('div');
    statusDiv.className = 'status-notification';
    statusDiv.id = 'status-' + report.date;
    
    // Build the report card's HTML
    div.innerHTML = '<div class="report-header">' +
        // Show "Инцидент" for accident, "Пожар" for fire, or the type otherwise
        '<span class="report-type">' + (report.type === "accident" ? "Инцидент" : report.type === "fire" ? "Пожар" : report.type) + '</span>' +
        '<span class="report-date">' + date + '</span>' +
        '</div>' +
        '<div class="report-details">' +
        '<p class="report-location">Място: ' + report.location + '</p>' +
        '<p class="report-firefighters">Екип: ' + firefighters + '</p>' +
        '</div>';
    
    // Add the status notification to the card
    div.appendChild(statusDiv);
    
    // Start the status timer for this report
    startStatusTimer(statusDiv, report.date);
    
    return div;
}

// Update the status notification for a report card based on elapsed time
function startStatusTimer(statusElement, reportDate) {
    const reportTime = new Date(reportDate).getTime();
    const now = new Date().getTime();
    const elapsedMinutes = Math.floor((now - reportTime) / (1000 * 60));

    if (elapsedMinutes < 10) {
        // Less than 10 minutes: dispatching
        statusElement.textContent = 'В момента се изпраща';
        statusElement.className = 'status-notification status-dispatching';
    } else if (elapsedMinutes < 15) {
        // 10-15 minutes: awaiting info
        statusElement.textContent = 'Очаква се информация';
        statusElement.className = 'status-notification status-awaiting';
    } else {
        // 15+ minutes: safe
        statusElement.textContent = 'Безопасно';
        statusElement.className = 'status-notification status-safe';
    }
}


// For testing purposes, the time is reduced to check if the code works and presenting the idea
/*function startStatusTimer(statusElement, reportDate) {
    const reportTime = new Date(reportDate).getTime();

    function updateStatus() {
        const now = new Date().getTime();
        const elapsedSeconds = Math.floor((now - reportTime) / 1000);

        if (elapsedSeconds < 10) {
            // Less than 10 seconds: dispatching
            statusElement.textContent = 'В момента се изпраща';
            statusElement.className = 'status-notification status-dispatching';
        } else if (elapsedSeconds < 15) {
            // 10-15 seconds: awaiting info
            statusElement.textContent = 'Очаква се информация';
            statusElement.className = 'status-notification status-awaiting';
        } else {
            // 15+ seconds: safe
            statusElement.textContent = 'Безопасно';
            statusElement.className = 'status-notification status-safe';
            return;
        }

        setTimeout(updateStatus, 1000);
    }

    updateStatus();
}*/

// Show/hide report cards based on the selected type filter and search term
function updateReportsDisplay() {
    let selectedType = typeFilter.value;
    let searchTerm = searchInput.value.toLowerCase().trim();
    let cards = reportsContainer.querySelectorAll('.report-card');
    
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let cardType = card.dataset.type;
        let cardText = card.textContent.toLowerCase();
        
        // Check if card matches type filter
        let typeMatches = selectedType === 'all' || cardType === selectedType;
        
        // Check if card matches search term
        let searchMatches = searchTerm === '' || cardText.includes(searchTerm);
        
        // Show card only if it matches both filters
        if (typeMatches && searchMatches) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    }
}

// Load all reports from the database and display them
function loadReports() {
    let tx = database.transaction('disasters', 'readonly');
    let store = tx.objectStore('disasters');
    let getAllReports = store.getAll();
    getAllReports.then(function(reports) {
        reportsContainer.innerHTML = "";
        // Sort reports by date, newest first
        reports.sort(function(a, b) {
            return new Date(b.date) - new Date(a.date);
        });
        // Create and append a card for each report
        for (let i = 0; i < reports.length; i = i + 1) {
            let card = createReportCard(reports[i]);
            reportsContainer.appendChild(card);
        }
        // If no reports, show a message
        if (reports.length == 0) {
            reportsContainer.innerHTML = "Няма изпратени доклади";
        }
        updateReportsDisplay();
    });
}

typeFilter.addEventListener('change', updateReportsDisplay);
searchInput.addEventListener('input', updateReportsDisplay);

loadReports();