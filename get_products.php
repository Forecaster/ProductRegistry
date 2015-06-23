<?
require_once "inc_connect.php";
require_once "inc_common_functions.php";
require_once "inc_functions.php";

if (isset($_POST['from']))
  $from = $_POST['from'];
if (isset($_POST['to']))
  $to = $_POST['to'];

if (isset($from) && isset($to) && $from > 0 && $to > 0)
  $query = "SELECT * FROM products WHERE added > $from AND added < $to";
else
  $query = "SELECT * FROM products";

$result = mysqli_query($con, $query);

if ($result)
{
  if (mysqli_num_rows($result) == 0)
    echo "false;noData";
  else
    echo csv(prepareForCsv($result));
}
else
{
  log_file("[post_product.php] An error occurred for query \"$query\"", "sql.log");
  log_file(mysqli_error($con), "sql.log");
  echo "false;SQLError";
}