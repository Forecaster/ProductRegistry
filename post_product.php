<?
require_once "inc_connect.php";
require_once "inc_common_functions.php";

$error = 0;
$added = time();

$name = mysqli_escape_string($con, $_POST['name']);
$price = $_POST['price'];
$stock = $_POST['stock'];
$desc = mysqli_escape_string($con, $_POST['desc']);

//These are for manual testing.
if (isset($_GET['name']))
{
  $name = $_GET['name'];
  $price = $_GET['price'];
  $stock = $_GET['stock'];
  $desc = $_GET['desc'];
}

if (strlen($name) < 2)
  $error = "Name too short!";
elseif (strlen($price) < 1)
  $error = "No price received!";
elseif (!is_numeric($price))
  $error = "Price is not a number!";
elseif (isset($stock) && !is_numeric($stock))
  $error = "Stock is not a number!";

if (!isset($stock))
  $stock = 0;
if (!isset($desc))
  $desc = "";


if ($error == 0)
{
  $query = "INSERT INTO products (prodName, price, description, added, updated, inStock) VALUES ('$name', '$price', '$desc', '$added', '0', '$stock')";

  $result = mysqli_query($con, $query);

  if ($result)
    echo "true;success";
  else
  {
    log_file("[post_product.php] An error occurred for query \"$query\"", "sql.log");
    log_file(mysqli_error($con), "sql.log");
    echo "false;SQLError";
  }
}
else
  echo "false;$error";