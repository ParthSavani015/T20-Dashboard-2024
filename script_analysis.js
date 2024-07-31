// js/analysis.js
function renderTeamPerformanceChart() {
    var ctx = document.getElementById('team-performance-chart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['India', 'Afghanistan', 'Australia', 'Bangladesh'],
            datasets: [{
                label: 'Wins',
                data: [7, 5, 5, 3],
                backgroundColor: 'rgb(50, 200, 60)',
                borderColor: 'rgb(50, 200, 60)',
                borderWidth: 1
            }, {
                label: 'Losses',
                data: [0, 2, 2, 4],
                backgroundColor: 'rgb(220, 20, 60)',
                borderColor: 'rgb(220, 20, 60)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white',
                        font: {
                            size: 14
                        }
                    }
                },
                x: {
                    ticks: {
                        color: 'white',
                        font: {
                            size: 14
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white',
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    });
}

$(document).ready(function () {
    renderTeamPerformanceChart();
});

function renderGroup2TeamPerformanceChart(data) {
    var ctx = document.getElementById('group2-team-performance-chart').getContext('2d');
    var labels = data.map(item => item.team);
    var wins = data.map(item => item.wins);
    var losses = data.map(item => item.losses);

    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Wins',
                data: wins,
                backgroundColor: 'rgb(50,200,60)',
                borderColor: 'rgb(50,200,60)',
                borderWidth: 1
            }, {
                label: 'Losses',
                data: losses,
                backgroundColor: 'rgb(220,20,60)',
                borderColor: 'rgb(220,20,60)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white',
                        font: {
                            size: 14
                        }
                    }
                },
                x: {
                    ticks: {
                        color: 'white',
                        font: {
                            size: 16
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white',
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    });
}

$(document).ready(function () {
    $.getJSON('json/Group2TeamAnalysis.json', function (data) {
        renderGroup2TeamPerformanceChart(data.teamPerformance);
    });
});


document.addEventListener('DOMContentLoaded', function () {
    // Load JSON data
    fetch('json/Playerbatsman.json')
        .then(response => response.json())
        .then(data => {
            // Populate player buttons
            const playerList = document.querySelector('#player-list .row');
            data.forEach((player, index) => {
                const col = document.createElement('div');
                col.className = 'col-md-6 mb-2'; // Bootstrap classes for styling
                const button = document.createElement('button');
                button.className = 'btn custom-btn w-100'; // Full-width button with custom class
                button.textContent = player.Player;
                button.addEventListener('click', () => updateChart(player));
                col.appendChild(button);
                playerList.appendChild(col);
            });

            // Initialize chart with the first player data
            if (data.length > 0) {
                updateChart(data[0]);
            }
        });

    // Initialize Chart.js
    const ctx = document.getElementById('player-pie-chart').getContext('2d');
    const playerPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', ' #669900'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 14 // Set the font size for the legend labels
                        },
                        color: '#ffffff' // Set the color for the legend labels
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        font: {
                            size: 14 // Set the font size for the y-axis labels
                        },
                        color: ' #262626' // Set the color for the y-axis labels
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 14 // Set the font size for the x-axis labels
                        },
                        color: ' #262626' // Set the color for the x-axis labels
                    }
                }
            }
        }
    });


    function updateChart(player) {
        // Update player name and photo
        document.getElementById('player-name').textContent = player.Player;
        document.getElementById('player-photo').src = player.Photo || 'default-photo.jpg'; // Use player.Photo if available

        // Update pie chart
        playerPieChart.data.labels = ['Runs', '4s', '6s', 'Strike Rate', 'Highest Score'];
        playerPieChart.data.datasets[0].data = [player.Runs, player.Four, player.Six, player['Strike Rate'], player['Height Score']];
        playerPieChart.update();
    }

});


document.addEventListener('DOMContentLoaded', function () {
    // Load JSON data
    fetch('json/Playerbowler.json')
        .then(response => response.json())
        .then(data => {
            // Populate bowler buttons
            const bowlerList = document.querySelector('#bowler-list .row');
            data.forEach((bowler, index) => {
                const col = document.createElement('div');
                col.className = 'col-md-6 mb-2'; // Bootstrap classes for styling
                const button = document.createElement('button');
                button.className = 'btn custom-btn w-100'; // Full-width button with custom class
                button.textContent = bowler.Player;
                button.addEventListener('click', () => updateBowlerChart(bowler));
                col.appendChild(button);
                bowlerList.appendChild(col);
            });

            // Initialize chart with the first bowler data
            if (data.length > 0) {
                updateBowlerChart(data[0]);
            }
        });

    // Initialize Chart.js
    const ctx = document.getElementById('bowler-pie-chart').getContext('2d');
    const bowlerPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Wkts', 'Econ', 'Ave', 'Overs'],
            datasets: [{
                data: [],
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 14 // Set the font size for the legend labels
                        },
                        color: '#ffffff' // Set the color for the legend labels
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw}`;
                        }
                    }
                }
            }
        }
    });

    function updateBowlerChart(bowler) {
        // Update bowler name and photo
        document.getElementById('bowler-name').textContent = bowler.Player;
        document.getElementById('bowler-photo').src = bowler.Photo || 'default-photo.jpg'; // Use default photo if not available

        // Update pie chart
        bowlerPieChart.data.datasets[0].data = [bowler.Wickets, bowler.Economy, bowler.Average, bowler.Overs];
        bowlerPieChart.update();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Initialize Chart.js
    const ctx = document.getElementById('allrounder-pie-chart').getContext('2d');
    const allrounderPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#669900'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 14 // Set the font size for the legend labels
                        },
                        color: '#ffffff' // Set the color for the legend labels
                    }
                },

                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw}`;
                        }
                    }
                }
            }
        }
    });

    function updateChart(allrounder) {
        // Update all-rounder name and photo
        document.getElementById('allrounder-name').textContent = allrounder.Player;
        document.getElementById('allrounder-photo').src = allrounder.Photo || 'default-photo.jpg'; // Replace with actual all-rounder photo URL if available

        // Update pie chart
        allrounderPieChart.data.labels = ['Runs', 'Wickets', 'Strike Rate', 'Economy'];
        allrounderPieChart.data.datasets[0].data = [allrounder.Runs, allrounder.Wickets, allrounder['Strike Rate'], allrounder.Economy];
        allrounderPieChart.update();
    }

    // Load JSON data
    fetch('json/allrounder.json')
        .then(response => response.json())
        .then(data => {
            // Populate all-rounder buttons
            const allrounderList = document.querySelector('#allrounder-list .row');
            data.allrounders.forEach((allrounder, index) => {
                const col = document.createElement('div');
                col.className = 'col-md-6 mb-2'; // Bootstrap classes for styling
                const button = document.createElement('button');
                button.className = 'btn custom-btn w-100'; // Full-width button with custom class
                button.textContent = allrounder.Player;
                button.addEventListener('click', () => updateChart(allrounder));
                col.appendChild(button);
                allrounderList.appendChild(col);
            });

            // Initialize chart with the first all-rounder data
            if (data.allrounders.length > 0) {
                updateChart(data.allrounders[0]);
            }
        });
});




