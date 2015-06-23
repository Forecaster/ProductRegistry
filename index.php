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

<div class="mainElement">
  <div class="table" id="list">The list goes here</div>
</div>
</body>
</html>

<script language="JavaScript">
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