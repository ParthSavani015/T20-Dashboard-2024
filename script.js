

$(document).ready(function() {
    // Fetch JSON data
    $.getJSON('json/batting-rank.json', function(data) {
        var table = '<table class="table table-striped">';
        table += '<thead><tr><th>Rank</th><th>Player</th><th>Total Runs</th></tr></thead>';
        table += '<tbody>';
        
        // Generate table rows using rank from JSON
        $.each(data, function(index, item) {
            table += '<tr>';
            table += '<td>' + item.Rank + '</td>'; // Use rank from JSON
            table += '<td>' + item.Player_name + '</td>';
            table += '<td>' + item.Total_Runs + '</td>';
            table += '</tr>';
        });
        
        table += '</tbody></table>';
        
        // Insert the table into the container
        $('.batting-rank-container').html(table);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error('Error fetching data: ' + textStatus, errorThrown);
    });

    $('#load-more-btn').click(function() {
        $('.batting-rank-container').addClass('show-more');
        $(this).hide(); // Hide the Load More button
    });


     // Fetch JSON data for Strike Rate
     $.getJSON('json/Strike_rate.json', function(data) {
        var table = '<table class="table table-striped">';
        table += '<thead><tr><th>Rank</th><th>Player</th><th>Strike Rate</th></tr></thead>';
        table += '<tbody>';
        
        // Generate table rows using data from JSON
        $.each(data, function(index, item) {
            table += '<tr>';
            table += '<td>' + item.rank + '</td>'; // Use rank from JSON
            table += '<td>' + item.player + '</td>';
            table += '<td>' + item.strike_rate + '</td>';
            table += '</tr>';
        });
        
        table += '</tbody></table>';
        
        // Insert the table into the container
        $('.strike-rate-container').html(table);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error('Error fetching data: ' + textStatus, errorThrown);
    });

    $('#load-more-strike-rate-btn').click(function() {
        $('.strike-rate-container').addClass('show-more');
        $(this).hide(); // Hide the Load More button
    });
 // flag add start

    

  // flag add end
    $.getJSON('json/Poinit_table.json', function(data) {
        // Ensure the correct group is accessed
        var group1Data = data.Group1;
        
        var table = '<table class="table table-striped">';
        table += '<thead><tr><th>No</th><th>Team</th><th>M</th><th>W</th><th>L</th><th>Pt</th><th>NRR</th></tr></thead>';
        table += '<tbody>';
        
        // Generate table rows for each team in Group 1
        $.each(group1Data, function(index, item) {
            table += '<tr>';
            table += '<td>' + item.No + '</td>';
           
            table += '<td>' + item.Team + '</td>';
            table += '<td>' + item.M + '</td>';
            table += '<td>' + item.W + '</td>';
            table += '<td>' + item.L + '</td>';
            table += '<td>' + item.Pt + '</td>';
            table += '<td>' + item.NRR.toFixed(3) + '</td>';
            table += '</tr>';
        });
        
        table += '</tbody></table>';
        
        // Insert the table into the container
        $('.point-table-container').html(table);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error('Error fetching data: ' + textStatus, errorThrown);
    });
//  point table 2 //

    $.getJSON('json/Point_Table2.json', function(data) {
        var table = '<table class="table table-striped">';
        table += '<thead><tr><th>No</th><th>Team</th><th>M</th><th>W</th><th>L</th><th>Pt</th><th>NRR</th></tr></thead>';
        table += '<tbody>';
    
        // Generate table rows for each team in the array
        $.each(data, function(index, item) {
            table += '<tr>';
            table += '<td>' + item.No + '</td>';
            table += '<td>' + item.Teams + '</td>';
            table += '<td>' + item.M + '</td>';
            table += '<td>' + item.W + '</td>';
            table += '<td>' + item.L + '</td>';
            table += '<td>' + item.Pt + '</td>';
            table += '<td>' + item.NRR.toFixed(3) + '</td>';
            table += '</tr>';
        });
    
        table += '</tbody></table>';
    
        // Insert the table into the container
        $('.point-table-container2').html(table);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error('Error fetching data: ' + textStatus, errorThrown);
    });


    $.getJSON('json/best_wicket.json', function(data) {
        var table = '<table class="table table-striped">';
        table += '<thead><tr><th>Rank</th><th>Player</th><th>Wickets</th></tr></thead>';
        table += '<tbody>';
        
        // Generate table rows using data from JSON
        $.each(data, function(index, item) {
            table += '<tr>';
            table += '<td>' + item.Rank + '</td>'; // Use rank from JSON
            table += '<td>' + item.Player + '</td>';
            table += '<td>' + item.Wkts + '</td>';
            table += '</tr>';
        });
        
        table += '</tbody></table>';
        
        // Insert the table into the container
        $('.Bowling-Table-container').html(table);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error('Error fetching data: ' + textStatus, errorThrown);
    });
    
    $('#load-more-bowling-btn').click(function() {
        $('.Bowling-Table-container').addClass('show-more');
        $(this).hide(); // Hide the Load More button
    });
    

    $(document).ready(function() {
        // Fetch JSON data for Economy
        $.getJSON('json/Economyjson.json', function(data) {
            var table = '<table class="table table-striped">';
            table += '<thead><tr><th>Rank</th><th>Player</th><th>Economy</th><th>Overs</th></tr></thead>';
            table += '<tbody>';
            
            // Generate table rows using data from JSON
            $.each(data, function(index, item) {
                table += '<tr>';
                table += '<td>' + item.rank + '</td>'; // Use rank from JSON
                table += '<td>' + item.player + '</td>';
                table += '<td>' + item.econ + '</td>';
                table += '<td>' + item.overs + '</td>';
                table += '</tr>';
            });
            
            table += '</tbody></table>';
            
            // Insert the table into the container
            $('.economy-container').html(table);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error('Error fetching data: ' + textStatus, errorThrown);
        });
    
        $('#load-more-economy-btn').click(function() {
            $('.economy-container').addClass('show-more');
            $(this).hide(); // Hide the Load More button
        });
    
        // Add other data fetching code here (e.g., for batting rank, strike rate, etc.)
    });
    

});















