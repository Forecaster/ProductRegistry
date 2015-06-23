function timeString(timestamp)
{
  if (timestamp > 0)
  {
    if (timestamp.toString().length == 10)
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

function saveProduct()
{
  var error = "0";

  var name = document.getElementById("name").value;
  var price = parseFloat(document.getElementById("price").value);
  var stock = document.getElementById("stock").value;
  var desc = document.getElementById("desc").value;

  if (typeof name != "string")
    error = "Name must be a text string! (" + typeof name + ")";
  else if (name.length < 2)
    error = "That name is too short!";
  else if (typeof price != "number")
    error = "Price must be a number! (" + typeof price + ")";
  else if (price.length < 1)
    error = "No price received!";

  if (error == "0")
  {
    if (name != lastSubmitName)
    {
      $.post("post_product.php", {name: name, price: price, stock: stock, desc: desc})
          .done(function (payload)
          {
            payload = payload.split(";");

            if (payload[0] == "true")
            {
              displaySuccess("The product was successfully added! Close the dialogue or submit another item!");
              lastSubmitName = name;
            }
            else if (payload[0] == "false")
            {
              if (payload[1] == "SQLError")
                displayError("An internal server error occurred while processing the request! Please try again later! If the problem persists please report this issue to an operator.");
            }
          })
          .fail(function (payload)
          {
            if (payload.status == 404)
              displayError("Could not reach the server! Please check your internet connection and try again later.");
            else if (payload.status == 500)
              displayError("An internal server error occurred while processing the request! Please try again later! If the problem persists please report this issue to an operator.");
            else
              displayError("An unknown error occurred! Please try again later! If the problem persists please report this issue to an operator.");
          })
    }
    else
    {
      displayWarning("Are you sure you want to submit an item with the same name twice? If you are sure click submit again.");
    }
  }
  else
    displayError(error);
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

/**
 * @param {string} id
 */
function showDialogue(id)
{
  var element = document.getElementById(id);

  if (typeof element == "object")
  {
    toggleOverlay(true);
    element.style.left = "50%";
    activeDialogue = id;
  }
}

function hideDialogue()
{
  if (typeof activeDialogue == "string")
  {
    var element = document.getElementById(activeDialogue);

    if (typeof element == "object")
    {
      element.style.left = "-1000px";
      activeDialogue = null;
      toggleOverlay(false);
    }
  }
}

/**
 *
 * @param {string} msg
 */
function displayError(msg)
{
  var elements = document.getElementsByClassName("error");

  if (elements.length > 0)
  {
    for (var i = 0; i < elements.length; i++)
    {
      elements[i].innerHTML = msg;
    }

    setTimeout(function() {
      var elements = document.getElementsByClassName("error");

      for (var i = 0; i < elements.length; i++)
      {
        elements[i].innerHTML = "";
      }
    }, 15000);
  }
  console.warn(msg);
}

function clearErrors()
{
  var elements = document.getElementsByClassName("error");

  for (var i = 0; i < elements.length; i++)
  {
    elements[i].innerHTML = "";
  }
}

/**
 *
 * @param {string} msg
 */
function displayWarning(msg)
{
  var elements = document.getElementsByClassName("warning");

  if (elements.length > 0)
  {
    for (var i = 0; i < elements.length; i++)
    {
      elements[i].innerHTML = msg;
    }

    setTimeout(function() {
      var elements = document.getElementsByClassName("warning");

      for (var i = 0; i < elements.length; i++)
      {
        elements[i].innerHTML = "";
      }
    }, 15000);
  }
}

function clearWarnings()
{
  var elements = document.getElementsByClassName("warning");

  for (var i = 0; i < elements.length; i++)
  {
    elements[i].innerHTML = "";
  }
}

/**
 *
 * @param {string} msg
 */
function displaySuccess(msg)
{
  var elements = document.getElementsByClassName("success");

  if (elements.length > 0)
  {
    for (var i = 0; i < elements.length; i++)
    {
      elements[i].innerHTML = msg;
    }

    setTimeout(function() {
      var elements = document.getElementsByClassName("success");

      for (var i = 0; i < elements.length; i++)
      {
        elements[i].innerHTML = "";
      }
    }, 15000);
  }
}

function clearSuccesses()
{
  var elements = document.getElementsByClassName("success");

  for (var i = 0; i < elements.length; i++)
  {
    elements[i].innerHTML = "";
  }
}