// Check authentication
function checkAuth() {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Check authentication before initializing
if (!checkAuth()) {
    throw new Error('Not authenticated');
}

// Initialize charts
const temperatureChart = new Chart(document.getElementById('temperatureChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Temperature (°C)',
            data: [],
            borderColor: '#e74c3c',
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});

const heartRateChart = new Chart(document.getElementById('heartRateChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Heart Rate (BPM)',
            data: [],
            borderColor: '#3498db',
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});

const activityChart = new Chart(document.getElementById('activityChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Activity Level (Steps/Hour)',
            data: [],
            borderColor: '#2ecc71',
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Steps/Hour'
                }
            }
        }
    }
});

const milkChart = new Chart(document.getElementById('milkChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Milk Production (Liters)',
            data: [],
            borderColor: '#9b59b6',
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Liters'
                }
            }
        }
    }
});

// Simulate real-time data updates (replace with actual IoT data)
function updateCharts() {
    const now = new Date().toLocaleTimeString();
    
    // Update temperature data
    temperatureChart.data.labels.push(now);
    temperatureChart.data.datasets[0].data.push(38 + Math.random() * 0.5);
    if (temperatureChart.data.labels.length > 10) {
        temperatureChart.data.labels.shift();
        temperatureChart.data.datasets[0].data.shift();
    }
    temperatureChart.update();

    // Update heart rate data
    heartRateChart.data.labels.push(now);
    heartRateChart.data.datasets[0].data.push(60 + Math.random() * 20);
    if (heartRateChart.data.labels.length > 10) {
        heartRateChart.data.labels.shift();
        heartRateChart.data.datasets[0].data.shift();
    }
    heartRateChart.update();

    // Update activity data
    activityChart.data.labels.push(now);
    activityChart.data.datasets[0].data.push(200 + Math.random() * 100);
    if (activityChart.data.labels.length > 10) {
        activityChart.data.labels.shift();
        activityChart.data.datasets[0].data.shift();
    }
    activityChart.update();

    // Update milk production data
    milkChart.data.labels.push(now);
    milkChart.data.datasets[0].data.push(8 + Math.random() * 2);
    if (milkChart.data.labels.length > 10) {
        milkChart.data.labels.shift();
        milkChart.data.datasets[0].data.shift();
    }
    milkChart.update();
}

// Update charts every 2 seconds
setInterval(updateCharts, 2000);

// Function to add alerts
function addAlert(message, severity = 'warning') {
    const alertsList = document.getElementById('alertsList');
    const alert = document.createElement('div');
    alert.className = 'alert';
    alert.textContent = message;
    const closeButton = document.createElement('span');
    closeButton.className = 'close';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = function() {
        alert.remove();
    };
    alert.appendChild(closeButton);
    alertsList.prepend(alert);
}

// Example alert
setTimeout(() => {
    addAlert('Temperature above normal range for Cow #123');
}, 5000);

// Function to update stats
function updateStats() {
    const stats = {
        totalCows: 150,
        healthyCows: 142,
        alerts: 3,
        milkProduction: 1250
    };

    // Update stats with animation
    Object.keys(stats).forEach(stat => {
        const element = document.querySelector(`.stat-number[data-stat="${stat}"]`);
        if (element) {
            const currentValue = parseInt(element.textContent);
            const targetValue = stats[stat];
            const increment = (targetValue - currentValue) / 10;
            
            let current = currentValue;
            const interval = setInterval(() => {
                current += increment;
                if ((increment > 0 && current >= targetValue) || 
                    (increment < 0 && current <= targetValue)) {
                    clearInterval(interval);
                    current = targetValue;
                }
                element.textContent = Math.round(current);
            }, 50);
        }
    });
}

// Update stats every 5 seconds
setInterval(updateStats, 5000);

// Add detailed content for Activity Level and Milk Production
const detailsContent = {
    // ... existing content ...
    
    activityLevel: {
        title: "Activity Level Analysis",
        content: `
            <div class="detail-section">
                <h3>Current Activity Metrics</h3>
                <p>• Average steps per hour: 250</p>
                <p>• Active time: 65% of day</p>
                <p>• Rest periods: 35% of day</p>
            </div>
            <div class="detail-section">
                <h3>Activity Patterns</h3>
                <p>• Peak activity: Morning (6-9 AM)</p>
                <p>• Moderate activity: Afternoon (2-5 PM)</p>
                <p>• Low activity: Night (10 PM-4 AM)</p>
            </div>
            <div class="detail-section">
                <h3>Health Indicators</h3>
                <p>• Normal range: 200-300 steps/hour</p>
                <p>• Warning level: < 100 steps/hour</p>
                <p>• Optimal range: 250-350 steps/hour</p>
            </div>
        `
    },
    
    milkProduction: {
        title: "Milk Production Analysis",
        content: `
            <div class="detail-section">
                <h3>Production Metrics</h3>
                <p>• Daily production: 1,250L</p>
                <p>• Average per cow: 8.3L</p>
                <p>• Quality grade: A+</p>
                <p>• Fat content: 3.8%</p>
            </div>
            <div class="detail-section">
                <h3>Production Trends</h3>
                <p>• Weekly growth: +2.3%</p>
                <p>• Monthly average: 1,200L</p>
                <p>• Peak production: 1,300L</p>
                <p>• Seasonal variation: ±5%</p>
            </div>
            <div class="detail-section">
                <h3>Quality Parameters</h3>
                <p>• Protein content: 3.2%</p>
                <p>• Somatic cell count: < 200,000/mL</p>
                <p>• Bacterial count: < 10,000 CFU/mL</p>
                <p>• Temperature: 4°C</p>
            </div>
        `
    }
};
// ... existing code ...

// Sample cow data
const cows = [
    {
        id: "C001",
        name: "Bessie",
        age: 4,
        breed: "Holstein",
        status: "healthy",
        production: "25L/day",
        lastCheck: "2024-03-15"
    },
    {
        id: "C002",
        name: "Daisy",
        age: 3,
        breed: "Jersey",
        status: "warning",
        production: "18L/day",
        lastCheck: "2024-03-14"
    },
    {
        id: "C003",
        name: "Molly",
        dailyProduction: "22L",
        weeklyAverage: "21.8L",
        monthlyAverage: "22.3L",
        lastMilking: "2024-03-15 14:45",
        quality: {
            fat: "3.9%",
            protein: "3.3%",
            lactose: "4.6%",
            somaticCells: "160,000"
        },
        status: "excellent"
    },
    {
        id: "C004",
        name: "Molly",
        dailyProduction: "22L",
        weeklyAverage: "21.8L",
        monthlyAverage: "22.3L",
        lastMilking: "2024-03-15 14:45",
        quality: {
            fat: "3.9%",
            protein: "3.3%",
            lactose: "4.6%",
            somaticCells: "160,000"
        },
        status: "excellent"
    },
    {
        id: "C005",
        name: "Molly",
        dailyProduction: "22L",
        weeklyAverage: "21.8L",
        monthlyAverage: "22.3L",
        lastMilking: "2024-03-15 14:45",
        quality: {
            fat: "3.9%",
            protein: "3.3%",
            lactose: "4.6%",
            somaticCells: "160,000"
        },
        status: "excellent"
    },
    {
        id: "C006",
        name: "Molly",
        dailyProduction: "22L",
        weeklyAverage: "21.8L",
        monthlyAverage: "22.3L",
        lastMilking: "2024-03-15 14:45",
        quality: {
            fat: "3.9%",
            protein: "3.3%",
            lactose: "4.6%",
            somaticCells: "160,000"
        },
        status: "excellent"
    },
    {
        id: "C007",
        name: "Molly",
        dailyProduction: "22L",
        weeklyAverage: "21.8L",
        monthlyAverage: "22.3L",
        lastMilking: "2024-03-15 14:45",
        quality: {
            fat: "3.9%",
            protein: "3.3%",
            lactose: "4.6%",
            somaticCells: "160,000"
        },
        status: "excellent"
    },
    {
        id: "C008",
        name: "Molly",
        dailyProduction: "22L",
        weeklyAverage: "21.8L",
        monthlyAverage: "22.3L",
        lastMilking: "2024-03-15 14:45",
        quality: {
            fat: "3.9%",
            protein: "3.3%",
            lactose: "4.6%",
            somaticCells: "160,000"
        },
        status: "excellent"
    },
    {
        id: "C009",
        name: "Molly",
        dailyProduction: "22L",
        weeklyAverage: "21.8L",
        monthlyAverage: "22.3L",
        lastMilking: "2024-03-15 14:45",
        quality: {
            fat: "3.9%",
            protein: "3.3%",
            lactose: "4.6%",
            somaticCells: "160,000"
        },
        status: "excellent"
    },
    {
        id: "C010",
        name: "Molly",
        dailyProduction: "22L",
        weeklyAverage: "21.8L",
        monthlyAverage: "22.3L",
        lastMilking: "2024-03-15 14:45",
        quality: {
            fat: "3.9%",
            protein: "3.3%",
            lactose: "4.6%",
            somaticCells: "160,000"
        },
        status: "excellent"
    },
    {
        id: "C011",
        name: "Molly",
        dailyProduction: "22L",
        weeklyAverage: "21.8L",
        monthlyAverage: "22.3L",
        lastMilking: "2024-03-15 14:45",
        quality: {
            fat: "3.9%",
            protein: "3.3%",
            lactose: "4.6%",
            somaticCells: "160,000"
        },
        status: "excellent"
    },
    {
        id: "C012",
        name: "Molly",
        dailyProduction: "22L",
        weeklyAverage: "21.8L",
        monthlyAverage: "22.3L",
        lastMilking: "2024-03-15 14:45",
        quality: {
            fat: "3.9%",
            protein: "3.3%",
            lactose: "4.6%",
            somaticCells: "160,000"
        },
        status: "excellent"
    }
    // Add more cow data as needed
];

function showCowDetails() {
    const detailsView = document.getElementById('cowDetailsView');
    detailsView.style.display = 'block';
    renderCowGrid();
}

function closeCowDetails() {
    const detailsView = document.getElementById('cowDetailsView');
    detailsView.style.display = 'none';
}

function renderCowGrid(filteredCows = cows) {
    const cowGrid = document.getElementById('cowGrid');
    cowGrid.innerHTML = '';

    filteredCows.forEach(cow => {
        const cowCard = document.createElement('div');
        cowCard.className = 'cow-card';
        cowCard.innerHTML = `
            <h3>${cow.name} (${cow.id})</h3>
            <div class="cow-info">
                <span>Age:</span>
                <span>${cow.age} years</span>
                <span>Breed:</span>
                <span>${cow.breed}</span>
                <span>Production:</span>
                <span>${cow.production}</span>
                <span>Last Check:</span>
                <span>${cow.lastCheck}</span>
            </div>
            <div class="cow-status status-${cow.status}">
                ${cow.status.charAt(0).toUpperCase() + cow.status.slice(1)}
            </div>
        `;
        cowGrid.appendChild(cowCard);
    });
}

// Search and filter functionality
document.getElementById('cowSearch').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCows = cows.filter(cow => 
        cow.name.toLowerCase().includes(searchTerm) ||
        cow.id.toLowerCase().includes(searchTerm)
    );
    renderCowGrid(filteredCows);
});

document.getElementById('cowFilter').addEventListener('change', function(e) {
    const filter = e.target.value;
    let filteredCows = cows;
    
    if (filter !== 'all') {
        filteredCows = cows.filter(cow => cow.status === filter);
    }
    
    renderCowGrid(filteredCows);
});

// Close details view when clicking outside
window.onclick = function(event) {
    const detailsView = document.getElementById('cowDetailsView');
    if (event.target === detailsView) {
        closeCowDetails();
    }
}
// ... existing code ...

// Sample healthy cows data
const healthyCows = [
    {
        id: "C001",
        name: "Bessie",
        age: 4,
        breed: "Holstein",
        healthStatus: "excellent",
        temperature: "38.4°C",
        heartRate: "64 BPM",
        lastCheck: "2024-03-15",
        healthScore: 98,
        metrics: {
            weight: "650 kg",
            rumination: "450 min/day",
            activity: "250 steps/hour"
        }
    },
    {
        id: "C002",
        name: "Daisy",
        age: 3,
        breed: "Jersey",
        healthStatus: "good",
        temperature: "38.6°C",
        heartRate: "66 BPM",
        lastCheck: "2024-03-14",
        healthScore: 92,
        metrics: {
            weight: "450 kg",
            rumination: "420 min/day",
            activity: "230 steps/hour"
        }
    },
    // Add more healthy cows data as needed
];

function showHealthyCowsDetails() {
    const detailsView = document.getElementById('healthyCowsView');
    detailsView.style.display = 'block';
    renderHealthyCowGrid();
}

function closeHealthyCowsDetails() {
    const detailsView = document.getElementById('healthyCowsView');
    detailsView.style.display = 'none';
}

function renderHealthyCowGrid(filteredCows = healthyCows) {
    const cowGrid = document.getElementById('healthyCowGrid');
    cowGrid.innerHTML = '';

    filteredCows.forEach(cow => {
        const cowCard = document.createElement('div');
        cowCard.className = 'cow-card';
        cowCard.innerHTML = `
            <h3>${cow.name} (${cow.id})</h3>
            <div class="cow-info">
                <span>Age:</span>
                <span>${cow.age} years</span>
                <span>Breed:</span>
                <span>${cow.breed}</span>
                <span>Health Score:</span>
                <span>${cow.healthScore}%</span>
            </div>
            <div class="health-metrics">
                <div>
                    <span>Temperature:</span>
                    <strong>${cow.temperature}</strong>
                </div>
                <div>
                    <span>Heart Rate:</span>
                    <strong>${cow.heartRate}</strong>
                </div>
                <div>
                    <span>Weight:</span>
                    <strong>${cow.metrics.weight}</strong>
                </div>
                <div>
                    <span>Rumination:</span>
                    <strong>${cow.metrics.rumination}</strong>
                </div>
            </div>
            <div class="cow-status status-${cow.healthStatus}">
                <span class="health-indicator health-${cow.healthStatus}"></span>
                ${cow.healthStatus.charAt(0).toUpperCase() + cow.healthStatus.slice(1)} Health
            </div>
        `;
        cowGrid.appendChild(cowCard);
    });
}

// Search and filter functionality for healthy cows
document.getElementById('healthyCowSearch').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCows = healthyCows.filter(cow => 
        cow.name.toLowerCase().includes(searchTerm) ||
        cow.id.toLowerCase().includes(searchTerm)
    );
    renderHealthyCowGrid(filteredCows);
});

document.getElementById('healthFilter').addEventListener('change', function(e) {
    const filter = e.target.value;
    let filteredCows = healthyCows;
    
    if (filter !== 'all') {
        filteredCows = healthyCows.filter(cow => cow.healthStatus === filter);
    }
    
    renderHealthyCowGrid(filteredCows);
});

// Close healthy cows view when clicking outside
window.onclick = function(event) {
    const healthyCowsView = document.getElementById('healthyCowsView');
    if (event.target === healthyCowsView) {
        closeHealthyCowsDetails();
    }
}
// ... existing code ...

// Sample milk production data
const milkProduction = [
    {
        id: "C001",
        name: "Bessie",
        dailyProduction: "25L",
        weeklyAverage: "24.5L",
        monthlyAverage: "23.8L",
        lastMilking: "2024-03-15 14:30",
        quality: {
            fat: "3.8%",
            protein: "3.2%",
            lactose: "4.7%",
            somaticCells: "150,000"
        },
        status: "excellent"
    },
    {
        id: "C002",
        name: "Daisy",
        dailyProduction: "18L",
        weeklyAverage: "19.2L",
        monthlyAverage: "20.1L",
        lastMilking: "2024-03-15 14:15",
        quality: {
            fat: "4.2%",
            protein: "3.5%",
            lactose: "4.8%",
            somaticCells: "180,000"
        },
        status: "good"
    },
    
];

function showMilkProductionDetails() {
    const detailsView = document.getElementById('milkProductionView');
    detailsView.style.display = 'block';
    renderMilkProductionGrid();
}

function closeMilkProductionDetails() {
    const detailsView = document.getElementById('milkProductionView');
    detailsView.style.display = 'none';
}

function renderMilkProductionGrid(filteredCows = milkProduction) {
    const productionGrid = document.getElementById('milkProductionGrid');
    productionGrid.innerHTML = '';

    filteredCows.forEach(cow => {
        const productionCard = document.createElement('div');
        productionCard.className = 'production-card';
        productionCard.innerHTML = `
            <h3>${cow.name} (${cow.id})</h3>
            <div class="production-info">
                <div class="production-metrics">
                    <div class="metric">
                        <span>Daily Production:</span>
                        <strong>${cow.dailyProduction}</strong>
                    </div>
                    <div class="metric">
                        <span>Weekly Average:</span>
                        <strong>${cow.weeklyAverage}</strong>
                    </div>
                    <div class="metric">
                        <span>Monthly Average:</span>
                        <strong>${cow.monthlyAverage}</strong>
                    </div>
                    <div class="metric">
                        <span>Last Milking:</span>
                        <strong>${cow.lastMilking}</strong>
                    </div>
                </div>
                <div class="quality-metrics">
                    <h4>Milk Quality</h4>
                    <div class="quality-grid">
                        <div class="quality-item">
                            <span>Fat:</span>
                            <strong>${cow.quality.fat}</strong>
                        </div>
                        <div class="quality-item">
                            <span>Protein:</span>
                            <strong>${cow.quality.protein}</strong>
                        </div>
                        <div class="quality-item">
                            <span>Lactose:</span>
                            <strong>${cow.quality.lactose}</strong>
                        </div>
                        <div class="quality-item">
                            <span>Somatic Cells:</span>
                            <strong>${cow.quality.somaticCells}</strong>
                        </div>
                    </div>
                </div>
            </div>
            <div class="production-status status-${cow.status}">
                ${cow.status.charAt(0).toUpperCase() + cow.status.slice(1)} Production
            </div>
        `;
        productionGrid.appendChild(productionCard);
    });
}

// Search and filter functionality for milk production
document.getElementById('milkProductionSearch').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCows = milkProduction.filter(cow => 
        cow.name.toLowerCase().includes(searchTerm) ||
        cow.id.toLowerCase().includes(searchTerm)
    );
    renderMilkProductionGrid(filteredCows);
});

document.getElementById('productionFilter').addEventListener('change', function(e) {
    const filter = e.target.value;
    let filteredCows = milkProduction;
    
    if (filter !== 'all') {
        filteredCows = milkProduction.filter(cow => cow.status === filter);
    }
    
    renderMilkProductionGrid(filteredCows);
});

// Close milk production view when clicking outside
window.onclick = function(event) {
    const milkProductionView = document.getElementById('milkProductionView');
    if (event.target === milkProductionView) {
        closeMilkProductionDetails();
    }
}

// Add click handlers for the new cards
document.querySelector('.card:nth-child(3)').onclick = () => showDetails('activityLevel');
document.querySelector('.card:nth-child(4)').onclick = () => showDetails('milkProduction');

// Function to show details with animation
function showDetails(type) {
    const detailsView = document.getElementById('detailsView');
    detailsView.style.display = 'flex';
    detailsView.classList.add('modal');
    // Populate details based on type
    const detailsContent = document.getElementById('detailsContent');
    detailsContent.innerHTML = `<h2>${type} Details</h2><p>Details for ${type} will be displayed here.</p>`;
}

// Function to close details with animation
function closeDetails() {
    const detailsView = document.getElementById('detailsView');
    detailsView.style.display = 'none';
    detailsView.classList.remove('modal');
}

// Search and filter functionality with highlighting
document.getElementById('cowSearch').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCows = cows.filter(cow => 
        cow.name.toLowerCase().includes(searchTerm) ||
        cow.id.toLowerCase().includes(searchTerm)
    );
    renderCowGrid(filteredCows, searchTerm);
});

function renderCowGrid(filteredCows = cows, searchTerm = '') {
    const cowGrid = document.getElementById('cowGrid');
    cowGrid.innerHTML = '';

    filteredCows.forEach(cow => {
        const cowCard = document.createElement('div');
        cowCard.className = 'cow-card';
        let name = cow.name;
        let id = cow.id;
        if (searchTerm) {
            name = name.replace(new RegExp(searchTerm, 'gi'), match => `<span class="highlight">${match}</span>`);
            id = id.replace(new RegExp(searchTerm, 'gi'), match => `<span class="highlight">${match}</span>`);
        }
        cowCard.innerHTML = `
            <h3>${name} (${id})</h3>
            <div class="cow-info">
                <span>Age:</span>
                <span>${cow.age} years</span>
                <span>Breed:</span>
                <span>${cow.breed}</span>
                <span>Production:</span>
                <span>${cow.production}</span>
                <span>Last Check:</span>
                <span>${cow.lastCheck}</span>
            </div>
            <div class="cow-status status-${cow.status}">
                ${cow.status.charAt(0).toUpperCase() + cow.status.slice(1)}
            </div>
        `;
        cowGrid.appendChild(cowCard);
    });
}

// Dark/Light Mode Toggle
const toggleMode = document.createElement('button');
toggleMode.className = 'toggle-mode';
toggleMode.textContent = 'Toggle Dark Mode';
toggleMode.onclick = function() {
    document.body.classList.toggle('dark-mode');
};
document.body.appendChild(toggleMode);
