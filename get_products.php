<?
require_once "inc_connect.php";
require_once "inc_common_functions.php";
require_once "inc_functions.php";

if (isset($_POST['from']))
  $from = $_POST['from'];
if (isset($_POST['to']))
  $to = $_POST['to'] + (60*60*24); //Add 24 hours worth of seconds to "to" value

if (isset($from) && isset($to) && $from > 0 && $to > 0)
  $query = "SELECT * FROM products WHERE added > '$from' AND added < '$to'";
else
  $query = "SELECT * FROM products";

$result = mysqli_query($con, $query);

if ($result)
{
  if (mysqli_num_rows($result) == 0)
  {
    log_file("[get_products.php] Query \"$query\" returned 0 results", "sql.log");
    echo "false;noData";
  }
  else
    echo csv(prepareForCsv($result));
}
else
{
  log_file("[get_product.php] An error occurred for query \"$query\"", "sql.log");
  log_file("[get_product.php] ".mysqli_error($con), "sql.log");
  echo "false;SQLError";
}