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
  <div style="text-align: center;" onclick="saveProduct();">Submit</div>
</div>

<div class="mainElement" style="margin-bottom: 20px;">
  <div onclick="showDialogue('addProduct');" style="cursor: pointer;">Add New Product</div>
</div>

<div class="mainElement">
  <div class="table" id="list">The list goes here</div>
</div>
</body>
</html>

<script language="JavaScript">
  var activeDialogue;
  var lastSubmitName;

  var tableHeader = "" +
      "<div class=\"row\">" +
      "<div class=\"cell\">Name</div>" +
      "<div class=\"cell\">Price</div>" +
      "<div class=\"cell\">Description</div>" +
      "<div class=\"cell\">Added</div>" +
      "<div class=\"cell\">Last Edited</div>" +
      "<div class=\"cell\">In Stock</div>" +
      "</div>";
  var products = [new Product(0, "Silence", 5.66, "The sound of silence", 0, 0, 1), new Product(1, "The Sun", 99999999.99, "Bring sunglasses", 0, 0, 1), new Product(2, "Pure Darkness", 1.99, "This is a long description just for the sake of a long description to test displaying long descriptions which is an important feature when having a website that supports long descriptions and such dont you know.", 0, 0, 10)];
  populateList(products, "list");
</script>