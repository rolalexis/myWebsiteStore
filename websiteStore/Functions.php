<?php 

function check_login($con)
{
if(isset($_SESSION['user_id']))
{
    $id= $_SESSION['user_id'];
    $query = "select * from users where user_id = $id' limit 1";

    $result = mysqli_query($con,$query);
    if($result && mysqli_num_rows($result)>0)
    {
$user_data = myqli_fetch_assoc($result);
return $user_data;
    }
}

//redirect to login
header("Location: login.php");
die;

}

$dbhost="localhost";
$dbuser="root";
$dbpass="";
$dbname="websitestore.mysql.database.azure.com";

if(!$con = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname))
{
    die("failed to connect!");
}