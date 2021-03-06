<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title>Product Registry</title>

  <link href="styles.css" rel="stylesheet"/>
  <script language="JavaScript" src="class.Product.js"></script>
  <script language="JavaScript" src="functions.js"></script>

  <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
  <script type="text/javascript" src="http://towerofawesome.org/javascriptLibraries/utility_functions.js"></script>
  <script type="text/javascript" src="http://towerofawesome.org/javascriptLibraries/prototypes.js"></script>
</head>
<body>
<?
if (isset($_GET['product']))
  $product = $_GET['product'];
else
  $product = 0;
?>
<div class="overlay" id="overlay" style="visibility: collapse;"></div>

<div class="dialogue" id="addProduct" style="left: -1000px;">
  <div class="buttonClose" style="top: 0; right: 0;" onclick="hideDialogue();"></div>
  <div class="header">Add product</div>
  <div class="error" onclick="clearErrors();" title="Click to clear" style="cursor: pointer;"></div>
  <div class="warning" onclick="clearWarnings();" title="Click to clear" style="cursor: pointer;"></div>
  <div class="success" onclick="clearSuccesses();" title="Click to clear" style="cursor: pointer;"></div>
  <div>Fields with an * are mandatory</div>
  <div><input type="text" id="name" placeholder="Product Name *" class="fillw"/></div>
  <div style="display: inline-block;"><input type="text" id="price" placeholder="Price *"/></div>
  <div style="display: inline-block;"><input type="number" id="stock" placeholder="Stock"/></div>
  <div>
    <textarea id="desc" placeholder="Description" style="width: 100%; resize: vertical;"></textarea>
  </div>
  <div style="text-align: center; cursor: pointer;" onclick="saveProduct();">Submit</div>
</div>

<div class="dialogue" id="productInfo" style="left: -1000px;">
  <div class="buttonClose" style="top: 0; right: 0;" onclick="hideDialogue();"></div>
  <div style="float: left;" id="productInfoLink"></div>
  <div style="color: gray; float: right; margin-right: 35px;">Click text to edit. Click outside to stop editing.</div>
  <div class="error" onclick="clearErrors();" title="Click to clear" style="cursor: pointer;"></div>
  <div class="warning" onclick="clearWarnings();" title="Click to clear" style="cursor: pointer;"></div>
  <div class="success" onclick="clearSuccesses();" title="Click to clear" style="cursor: pointer;"></div>
  <div class="table">
    <div id="productInfoName" class="title header" onclick="startNameEdit();" style="border-top: 1px solid #98B9F2; margin-top: 5px;">Product Name</div>
    <div class="row2">
      <div class="cell" id="productInfoPrice" onclick="startPriceEdit();">Price: $9.99</div>
      <div class="cell" id="productInfoStock" onclick="startStockEdit();">Stock: 1</div>
    </div>
  </div>
  <div  style="margin: 5px;" id="productInfoDesc" onclick="startDescEdit();">This is a description</div>
  <div class="buttonUpdateDisabled" id="productInfoUpdateButton1" style="float: left; margin-left: 125px;" onclick="submitProductUpdate();">Save</div>
  <div class="buttonUpdateDisabled" id="productInfoUpdateButton2" style="float: right; margin-right: 125px;" onclick="submitProductUpdate(); hideDialogue();">Save & Close</div>
</div>

<div class="mainElement" style="margin-bottom: 10px;">
  <div class="menuItem" onclick="showDialogue('addProduct');">Add New Product</div>
  <div class="menuItem" onclick="loadProducts();">Refresh List/Clear Search</div>
</div>

<div class="mainElement" style="margin-bottom: 10px;">
  <div style="display: inline-block;">Search by date added: (yyyy-mm-dd)</div>
  <div style="display: inline-block;"><input type="text" id="from" placeholder="Start date"/>  -  <input type="text" id="to" placeholder="End date"/></div>
  <div style="display: inline-block; cursor: pointer;" onclick="searchByDate();">Search</div>
</div>

<div style="margin-bottom: 10px;">
  <div class="error" onclick="clearErrors();" title="Click to clear" style="cursor: pointer;"></div>
  <div class="warning" onclick="clearWarnings();" title="Click to clear" style="cursor: pointer;"></div>
  <div class="success" onclick="clearSuccesses();" title="Click to clear" style="cursor: pointer;"></div>
</div>

<div class="mainElement">
  <div>Click an item name to open info window.</div>
  <div class="table" id="list"><span style="color: orange;">It seems there are no products to display at the moment. You should add a few!</span></div>
</div>
</body>
</html>

<script language="JavaScript">
  var SQL_ERROR = "A database error occurred while processing the request! Please try again later! If the problem persists please report this issue to an operator.";
  var INT_ERROR = "An internal server error occurred while processing the request! Please try again later! If the problem persists please report this issue to an operator.";
  var RCH_ERROR = "Could not reach the server! Please check your internet connection and try again later.";
  var UNK_ERROR = "An unknown error occurred! Please try again later! If the problem persists please report this issue to an operator.";

  var pageBaseURL = "http://towerofawesome.org/productregistry/";

  var activeDialogue;
  var lastSubmitName;
  var products;

  var lastEditedId;
  var activeName;
  var activePrice;
  var activeStock;
  var activeDesc;
  var changesMade = 0;
  var currentlyEditing = false;

  var tableHeader = "" +
      "<div class=\"row\">" +
      "<div class=\"cell\">Name</div>" +
      "<div class=\"cell\">Price</div>" +
      "<div class=\"cell\">Description</div>" +
      "<div class=\"cell\">Added</div>" +
      "<div class=\"cell\">Last Edited</div>" +
      "<div class=\"cell\">In Stock</div>" +
      "</div>";

  loadProducts();

  var product = <? echo $product;?>;

  if (product > 0)
    setTimeout("loadProductInfo(product)", 2000);
</script>