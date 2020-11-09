<?php
$un=$_POST['username'];
$sno=$_POST['userno'];
$em=$_POST['useremail'];
$msg=$_POST['mesg'];
if(trim($un)!="" && trim($msg)!="" && trim($em)!="" && trim($sno)!="")
{
	if(filter_var($em, FILTER_VALIDATE_EMAIL))
	{
		$message="Hi Admin..<p>".$un." has sent a query having phonenumber ".$sno." and email id as ".$em."</p><p>Query is : ".$msg."</p>";
		$headers = "MIME-Version: 1.0" . "\r\n";
		$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
		$headers .= 'From: <support@himanshusofttech.com>' . "\r\n";

		if(mail('support@himanshusofttech.com','Query for elight',$message,$headers ))
		{
		echo '1#<p style="color:green;">Mail has been sent successfully.</p>';
		}
		else
		{
		echo '2#<p style="color:red;">Please, Try Again.</p>';
		}
	}
	else
		echo '2#<p style="color:red">Please, provide valid Email.</p>';
}
else
{
echo '2#<p style="color:red">Please, fill all the details.</p>';
}?>