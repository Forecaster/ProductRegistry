<?
require_once "inc_connect.php";
require_once "inc_common_functions.php";

$error = 0;
$updated = time();

$id = $_POST['id'];
$name = mysqli_escape_string($con, $_POST['name']);
$price = $_POST['price'];
$stock = $_POST['stock'];
$desc = mysqli_escape_string($con, $_POST['desc']);

log_file("[update_product.php] Received id \"$id\"", "sql.log");

//These are for manual testing.
if (isset($_GET['name']))
{
  $name = $_GET['name'];
  $price = $_GET['price'];
  $stock = $_GET['stock'];
  $desc = $_GET['desc'];
}

if (!isset($id))
  $error = "Received no id!";
elseif (!is_numeric($id))
  $error = "Id is not a number!";
elseif (strlen($name) < 2)
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
  $query = "UPDATE products SET prodName = '$name', price = '$price', inStock = '$stock', description = '$desc', updated = '$updated' WHERE id = '$id'";

  $result = mysqli_query($con, $query);

  if ($result)
  {
    log_file("[update_product.php] Updated $result rows with query \"$query\"", "sql.log");
    echo "true;success";
  }
  else
  {
    log_file("[update_product.php] An error occurred for query \"$query\"", "sql.log");
    log_file(mysqli_error($con), "sql.log");
    echo "false;SQLError";
  }
}
else
  echo "false;$error";