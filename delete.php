<?php
include('./db.php');
$data = stripslashes(file_get_contents("php://input"));
$mydata = json_decode($data, true);
$id = $mydata['sid'];

if (!empty($id)) {

    $sql = "DELETE FROM employee WHERE id={$id}";
    if ($conn->query($sql) == TRUE) {
        echo "employee Delete Scuuessfully!!";
    } else {
        echo "employee Data is Delete";
    }
} else {
    echo "Fill All Fields";
}
