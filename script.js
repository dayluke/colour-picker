google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  
  var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['#FF0000', 1],
    ['#FF7F00', 1],
    ['#FFFF00', 1],
    ['#7FFF00', 1],
    ['#00FF00', 1],
    ['#00FF7F', 1],
    ['#00FFFF', 1],
    ['#007FFF', 1],
    ['#0000FF', 1],
    ['#7F00FF', 1],
    ['#FF00FF', 1],
    ['#FF007F', 1]
  ]);
  
  var options = {
    title: '',
    legend: 'none',
    height: 900, 
    pieSliceText: 'none',
    pieSliceBorderColor : "transparent",
    'tooltip' : { trigger: 'none'},
    backgroundColor: { fill:'transparent' },
    slices: {
      0: {color: '#FF0000'},
      1: {color: '#FF7F00'},
      2: {color: '#FFFF00'},
      3: {color: '#7FFF00'},
      4: {color: '#00FF00'},
      5: {color: '#00FF7F'},
      6: {color: '#00FFFF'},
      7: {color: '#007FFF'},
      8: {color: '#0000FF'},
      9: {color: '#7F00FF'},
      10: {color: '#FF00FF'},
      11: {color: '#FF007F'}
    }
  };
  
  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  
  function selectHandler()
  {
    var selectedItem = chart.getSelection()[0];
    if (selectedItem)
      {
        var topping = data.getValue(selectedItem.row, 0);
        generateColourScheme(data, selectedItem.row);
      }
  }
  
  google.visualization.events.addListener(chart, 'select', selectHandler);    
  
  chart.draw(data, options);
}

function generateColourScheme(chart, sliceIndex)
{
  var rowCount = chart.getNumberOfRows();
  var colours = [
    chart.getValue(sliceIndex, 0),
    chart.getValue( mod((sliceIndex - 1), rowCount) , 0),
    chart.getValue( mod((sliceIndex + 1), rowCount) , 0)
  ]
  
  changeBubbleColours(colours);
  changeBackgroundColor(colours);
  //alert('Colours: ' + colours[0]  + ' ' + colours[1] + ' and ' + colours[2]);
}

function changeBubbleColours(cols)
{
  var bubbles = document.getElementById("bubble-container").children;
  for (var i = 0; i < bubbles.length; i++)
    {
      bubbles[i].style.backgroundColor = cols[i];
      bubbles[i].children[0].innerHTML = cols[i];
    }
}

function changeBackgroundColor(cols)
{
  var colours = cols.join(', ');
  document.body.style.backgroundImage = "linear-gradient(90deg, " + colours + ")";
}

function changeOpacity(slider)
{
  var chart = document.getElementById("piechart");
  var bubbleContainer = document.getElementById("bubble-container");
  chart.style.opacity = slider.value;
  bubbleContainer.style.opacity = slider.value;
}

function changeVibrance(slider)
{
  var chart = document.getElementById("piechart");
  var bubbleContainer = document.getElementById("bubble-container");
  chart.style.filter = "brightness(" + slider.value + "%)";
  bubbleContainer.style.filter = "brightness(" + slider.value + "%)";
}

function mod(n, m) {
  return ((n % m) + m) % m;
}
