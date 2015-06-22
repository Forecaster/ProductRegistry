function timeString(timestamp)
{
  if (timestamp.length == 10)
    timestamp = timestamp * 1000;

  var date = new Date();
  date.setTime(timestamp);

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

  return days + "/" + month + " " + hours + ":" + minutes;
}