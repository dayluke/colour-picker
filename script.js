function generateColourScheme(chart, sliceIndex)
{
  var rowCount = chart.getNumberOfRows();
  var colours = [
    chart.getValue( mod((sliceIndex - 1), rowCount) , 0),
    chart.getValue(sliceIndex, 0),
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
