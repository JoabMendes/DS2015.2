

<?php


function calculadora($f, $a, $b){
	switch ($f) {
		case 'add':
			# code...
				$result = array("result" => $a." + ".$b. " = ".($a+$b));
				echo json_encode($result);
			break;
		case 'sub':
			# code...
				$result = array("result" => $a." - ".$b. " = ".($a-$b));
				echo json_encode($result);
			break;
		case 'mul':
			# code...
				$result = array("result" => $a." * ".$b. " = ".($a*$b));
				echo json_encode($result);
			break;
		case 'dib':
			# code...
				$result = array("result" => $a." / ".$b. " = ".($a/$b));
				echo json_encode($result);
			break;
		default:
			break;
	}

}



if(isset($_GET['function']) && isset($_GET['a']) ** && isset($_GET['b']) ){


}else{
	$result = array("result" => "There was an error in you request! (?func=f&a=z&b=y)");
	echo json_encode($result);
}



?>