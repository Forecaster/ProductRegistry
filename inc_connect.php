<?
$server = "localhost";
$dbUser = "username";
$dbPass = "password";
$dbName = "database";test

$con = mysqli_connect($server, $dbUser, $dbPass, $dbName);
if (!$con)
{
  die('Could not connect: ' . mysqli_error($con));
}