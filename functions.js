function timeString(timestamp)
{
  if (timestamp > 0)
  {
    if (timestamp.length == 10)
      timestamp = timestamp * 1000;

    var date = new Date();
    date.setTime(timestamp);

    var year = date.getFullYear().toString();
    var days = date.getDay().toString();
    var month = (date.getMonth() + 1).toString();
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
  else
    return "-";
}

function truncateString(string, length)
{
  if (typeof string == "string" && string.length > length)
    return string.substr(0, length) + "...";
  else
    return string;
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
    container.innerHTML = tableHeader;
    for (var i = 0; i < items.length; i++)
    {
      if (typeof items[i] == "object")
      {
        container.innerHTML += "" +
            "<div class=\"row\" id=\"" + items[i].getId() + "\">" +
              "<div class=\"cell\">" + items[i].getName() + "</div>" +
              "<div class=\"cell\">" + items[i].getPrice() + "</div>" +
              "<div class=\"cell\">" + truncateString(items[i].getDescription(), 50) + "</div>" +
              "<div class=\"cell\">" + items[i].getAdded() + "</div>" +
              "<div class=\"cell\">" + items[i].getUpdated() + "</div>" +
              "<div class=\"cell\">" + items[i].getStock() + "</div>" +
              "<div class=\"cell\" style=\"color: orangered; cursor: pointer;\" onclick=\"deleteItem(parseInt(this.parentNode.id));\"> X </div>" +
            "</div>"
      }
    }
  }
}

/**
 *
 * @param {number} id
 */
function deleteItem(id)
{
  var removed = 0;
  if (typeof id == "number")
  {
    for (var i = 0; i < products.length; i++)
    {
      if (products[i].getId() == id)
      {
        products.splice(i, 1);
        removed++;
      }
    }

    if (removed > 0)
      populateList(products, "list");
  }
}

function loadProducts()
{
  //TODO fetch products from database
}

/**
 *
 * @param {boolean} [state]
 */
function toggleOverlay(state)
{
  var element = document.getElementById("overlay");
  if (typeof state == "boolean")
  {
    if (state)
      element.style.visibility = "visible";
    else
      element.style.visibility = "collapse";
  }
  else
  {
    if (element.style.visibility == "visible")
      element.style.visibility = "collapse";
    else
      element.style.visibility = "visible";
  }
}