function nl2br (str, is_xhtml) {
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

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

    return year + "/" + month + "/" + days + " " + hours + ":" + minutes;
  }
  else
    return "-";
}

function truncateString(string, length)
{
  string = string.replace("<br>", "").replace("</br>", "");
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
            "<div class=\"row\" id=\"" + items[i].getId() + "\" onclick=\"loadProductInfo(this.id);\" style=\"cursor: pointer;\">" +
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
    $.post("delete_product.php", {id: id})
        .done(function(payload)
        {
          payload = payload.split(";");
          if (payload[0] == "true")
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
          else
          {
            if (payload[1] == "SQLError")
              displayError(SQL_ERROR);
          }
        })
        .fail(function(payload)
        {
          if (payload.status == 404)
            displayError(RCH_ERROR);
          else if (payload.status == 500)
            displayError(INT_ERROR);
          else
            displayError(UNK_ERROR);
        })
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
              loadProducts();
            }
            else if (payload[0] == "false")
            {
              if (payload[1] == "SQLError")
                displayError(SQL_ERROR);
            }
          })
          .fail(function (payload)
          {
            if (payload.status == 404)
              displayError(RCH_ERROR + " (" + payload.status + ")");
            else if (payload.status == 500)
              displayError(INT_ERROR + " (" + payload.status + ")");
            else
              displayError(UNK_ERROR);
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

function updateProduct(id, name, price, stock, desc)
{
  var error = "0";

  if (typeof name != "string")
    error = "Name must be a text string! (" + typeof name + ")";
  else if (name.length < 2)
    error = "That name is too short!";
  else if (typeof price != "number")
    error = "Price must be a number! (" + typeof price + ") (" + price + ")";
  else if (price.length < 1)
    error = "No price received!";

  if (error == "0")
  {
    $.post("update_product.php", {id: id, name: name, price: price, stock: stock, desc: desc})
        .done(function (payload)
        {
          payload = payload.split(";");

          if (payload[0] == "true")
          {
            displaySuccess("The product was successfully updated!");
            changesMade = 0;
            disableUpdateButton();

            for (var i = 0; i < products.length; i++)
            {
              if (products[i].getId() == id)
              {
                products[i].setAll(name, price, desc, new Date().getTime(), stock);
              }
            }
            populateList(products, "list");
          }
          else if (payload[0] == "false")
          {
            if (payload[1] == "SQLError")
              displayError(SQL_ERROR);
          }
        })
        .fail(function (payload)
        {
          if (payload.status == 404)
            displayError(RCH_ERROR + " (" + payload.status + ")");
          else if (payload.status == 500)
            displayError(INT_ERROR + " (" + payload.status + ")");
          else
            displayError(UNK_ERROR);
        })
  }
  else
    displayError(error);
}

/**
 *
 * @param {number} [from]
 * @param {number} [to]
 */
function loadProducts(from, to)
{
  $.post("get_products.php", {from: from, to: to})
      .done(function (payload)
      {
        var payload_test = payload.split(";");

        if (payload_test[0] == "false")
        {
          if (payload_test[1] == "noData")
            displayError("No items could be found with the specified search terms.");
          else if (payload_test[1] == "SQLError")
            displayError(SQL_ERROR);
        }
        else
        {
          var items = parse_csv(payload);
          console.log(items);
          var values = items.values;

          products = [];

          for (var i = 0; i < values.length; i++)
          {
            if (typeof values[i] == "object")
            {
              products.push(new Product(values[i][0], values[i][1], values[i][2], values[i][3], values[i][4], values[i][5], values[i][6]));
            }
          }

          populateList(products, "list");
        }
      })
      .fail(function (payload)
      {
        if (payload.status == 404)
          displayError(RCH_ERROR);
        else if (payload.status == 500)
          displayError(INT_ERROR);
        else
          displayError(UNK_ERROR);
      })
}

function searchByDate()
{
  var from = document.getElementById("from").value;
  var to = document.getElementById("to").value;

  loadProducts(dateToTimestamp(from), dateToTimestamp(to));
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

function dateToTimestamp(datestr)
{
  if (typeof datestr == "string")
  {
    datestr = datestr.split("-");

    var year = parseInt(datestr[0]);
    var month = parseInt(datestr[1]);
    var day = parseInt(datestr[2]);

    var date = new Date();
    date.setFullYear(year);
    date.setMonth(month - 1);
    date.setDate(day);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);

    return Math.floor(date.getTime() / 1000);
  }
}

function enableUpdateButton()
{
  if (changesMade > 0)
  {
    var element = document.getElementById("productInfoUpdateButton");

    element.className = "buttonUpdateEnabled";
  }
}

function disableUpdateButton()
{
  var element = document.getElementById("productInfoUpdateButton");

  element.className = "buttonUpdateDisabled";
}

function startNameEdit()
{
  if (typeof activeName != "string")
  {
    disableUpdateButton();
    currentlyEditing = true;
    var element = document.getElementById("productInfoName");

    activeName = element.innerHTML;

    element.innerHTML = "<input type=\"text\" name=\"nameEdit\" id=\"nameEdit\" placeholder=\"Name\" value=\"" + activeName + "\" style=\"width: 100%; text-align: center;\" onblur=\"stopNameEdit();\"/>";
    element.childNodes[0].focus();
  }
}

function stopNameEdit()
{
  var element = document.getElementById("productInfoName");

  var newName = element.childNodes[0].value;

  if (newName != activeName)
  {
    changesMade += 1;
    enableUpdateButton();
  }

  element.innerHTML = newName;
  activeName = null;
  currentlyEditing = false;
}

function startPriceEdit()
{
  if (typeof activePrice != "string")
  {
    disableUpdateButton();
    currentlyEditing = true;
    var element = document.getElementById("productInfoPrice");

    activePrice = element.innerHTML.split(" ")[1];

    element.innerHTML = "<input type=\"text\" name=\"priceEdit\" id=\"nameEdit\" placeholder=\"Price\" value=\"" + activePrice + "\" style=\"width: 100%; text-align: center;\" onblur=\"stopPriceEdit();\"/>";
    element.childNodes[0].focus();
  }
}

function stopPriceEdit()
{
  var element = document.getElementById("productInfoPrice");

  var newPrice = element.childNodes[0].value;

  if (newPrice == activePrice)
  {
    changesMade += 1;
    enableUpdateButton();
  }

  element.innerHTML = "Price: " + newPrice;
  activePrice = null;
  currentlyEditing = false;
}

function startStockEdit()
{
  if (typeof activeStock != "string")
  {
    disableUpdateButton();
    currentlyEditing = true;
    var element = document.getElementById("productInfoStock");

    activeStock = element.innerHTML.split(" ")[1];

    element.innerHTML = "<input type=\"text\" name=\"stockEdit\" id=\"nameEdit\" placeholder=\"Stock\" value=\"" + activeStock + "\" style=\"width: 100%; text-align: center;\" onblur=\"stopStockEdit();\"/>";
    element.childNodes[0].focus();
  }
}

function stopStockEdit()
{
  var element = document.getElementById("productInfoStock");

  var newStock = element.childNodes[0].value;

  if (newStock != activeStock)
  {
    changesMade += 1;
    enableUpdateButton();
  }

  element.innerHTML = "Stock: " + newStock;
  activeStock = null;
  currentlyEditing = false;
}

function startDescEdit()
{
  if (typeof activeDesc != "string")
  {
    disableUpdateButton();
    currentlyEditing = true;
    var element = document.getElementById("productInfoDesc");

    if (element.innerHTML == "<span style=\"color:gray;\">No description</span>")
      activeDesc = "";
    else
      activeDesc = element.innerHTML;

    element.innerHTML = "<textarea id=\"descEdit\" style=\"width: 100%; resize: vertical;\" onblur=\"stopDescEdit();\">" + activeDesc + "</textarea>";
    element.childNodes[0].focus();
  }
}

function stopDescEdit()
{
  var element = document.getElementById("productInfoDesc");

  var newDesc = element.childNodes[0].value;

  if (newDesc != activeDesc)
  {
    changesMade += 1;
    enableUpdateButton();
  }

  if (newDesc == "")
   element.innerHTML = "<span style=\"color:gray;\">No description</span>";
  else
    element.innerHTML = nl2br(newDesc);
  activeDesc = null;
  currentlyEditing = false;
}

function submitProductUpdate()
{
  if (changesMade > 0 && currentlyEditing == false)
  {
    var name = document.getElementById("productInfoName").innerHTML;
    var price = document.getElementById("productInfoPrice").innerHTML;
    var stock = document.getElementById("productInfoStock").innerHTML;
    var desc = document.getElementById("productInfoDesc").innerHTML;

    updateProduct(lastEditedId, name, parseFloat(price.split(" ")[1]), parseFloat(stock.split(" ")[1]), desc);
  }
}

function loadProductInfo(id)
{
  for (var i = 0; i < products.length; i++)
  {
    if (id == products[i].getId())
    {
      lastEditedId = id;
      document.getElementById("productInfoName").innerHTML = products[i].getName();
      document.getElementById("productInfoPrice").innerHTML = "Price: " + products[i].getPrice();
      document.getElementById("productInfoStock").innerHTML = "Stock: " + products[i].getStock();
      var desc = nl2br(products[i].getDescription());
      if (desc.length < 1)
        desc = "<span style=\"color:gray;\">No description</span>";
      document.getElementById("productInfoDesc").innerHTML = desc;

      showDialogue("productInfo");
    }
  }
}