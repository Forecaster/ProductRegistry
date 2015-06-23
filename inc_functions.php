<?
/**
 * @param {mysqli_result} $result
 * @return array
 */
function prepareForCsv($result)
{
  while ($row = mysqli_fetch_assoc($result))
  {
    $items[] = $row;
  }

  return $items;
}

/**
 * Expects first level of array to be number keyed, second levels associative
 * Assumes keys are consistent for all sub-arrays
 * @param $array {Array}
 * @return string
 */
function csv($array)
{
  $row_delimiter = ";";
  $col_delimiter = ",";

  $csv = "";

  if (isset($array) && is_array($array))
  {
    foreach ($array[0] as $key => $value)
    {
      $csv .= $key.$col_delimiter;
    }
    $csv = substr($csv, 0, -1);
    $csv .= $row_delimiter;

    for ($i = 0; $i < count($array); $i++)
    {
      foreach ($array[$i] as $value)
      {
        $csv .= $value.$col_delimiter;
      }
      $csv = substr($csv, 0, -1);
      $csv .= $row_delimiter;
    }
  }

  $csv = substr($csv, 0, -1);
  return $csv;
}