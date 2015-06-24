<?
require_once "inc_connect.php";
require_once "inc_functions.php";
require_once "inc_common_functions.php";

if (isset($_POST['id']))
{
  $id = $_POST['id'];

  if (is_numeric($id))
  {
    $query = "DELETE FROM products WHERE id = '$id'";

    $result = mysqli_query($con, $query);

    if ($result == 1)
      echo "true;success";
    else
    {
      log_file("[delete_product.php] An error occurred for query \"$query\"", "sql.log");
      log_file("[delete_product.php] ".mysqli_error($con), "sql.log");
      echo "false;SQLError";
    }
  }
  else
    echo "false;invalidId";
}