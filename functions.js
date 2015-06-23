function timeString(timestamp)
{
  if (timestamp.length == 10)
    timestamp = timestamp * 1000;

  var date = new Date();
  date.setTime(timestamp);

  var year = date.getFullYear().toString();
  var days = date.getDay().toString();
  var month = (date.getMonth()+1).toString();
  var hours = date.getHours().toString();
  var minutes = date.getMinutes().toString();

  if (days.length == 1)
    days = "0" + days;
  if (month.length == 1)
    month = "0" + month;
  if (hours.length == 1)
    hours = "0" + hours;
  if (minutes.length == 1)
    minutes = "0" + minutes;

  return days + "/" + month + "/" + year + " " + hours + ":" + minutes;
}

/**
 *
 * @param {Array} items
 * @param {Element|String} container
 */
function populateList(items, container)
{
  if (typeof container == "string")
    container = document.getElementById(container);

  if (items.length > 0)
  {
    container.innerHTML = "";
    for (var i = 0; i < items.length; i++)
    {
      container.innerHTML += "<div>" + items[i].getName() + "</div>";
    }
  }
}