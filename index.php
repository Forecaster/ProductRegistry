<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title>Product Registry</title>

  <link href="styles.css" rel="stylesheet"/>
  <script language="JavaScript" src="class.Product.js"></script>
  <script language="JavaScript" src="functions.js"></script>
</head>
<body>
<div class="mainElement">
  <div id="list">The list goes here</div>
</div>
</body>
</html>

<script language="JavaScript">
  var products = [new Product(0, "Silence", 5.66, "The sound of silence", 0, 0, 1), new Product(1, "The Sun", 99999999.99, "Bring sunglasses", 0, 0, 1)];
  populateList(products, "list");
</script>