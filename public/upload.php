<?php 
$nama = $_GET["nama"];
$file = $_FILES["files"];
$name = $_FILES["files"]["name"];
$extensi = pathinfo($name, PATHINFO_EXTENSION);
$avatar_tmp_name = $_FILES["files"]["tmp_name"];

if($_FILES['files']){
	$dirUpload = "Uploads/";
	$val = 0;
	$description = 'eror file format';
	
	$file_ext=explode('.',$name);
	$file_ext=end($file_ext);
	$file_ext=strtolower($file_ext);

	$expensions= array("jpg","jpeg","png");
	
// 	var_dump($nama);
	
	  if(in_array($file_ext,$expensions)== false){
		 $val = $val + 1;
	  }
	  
	  if($_FILES["files"]["error"] != 0){
	      $val = $val + 1;
	      $description = 'Ukuran file kebesaran bung!!';
	  }
	  
// 	  $val = 3;

    $TempName = $dirUpload.$nama.'.'.$file_ext;
    $NewName = $nama.'.'.$file_ext;

	if($val > 0){
		//gagal
		http_response_code(401);
		$stat = ['code'=>'401', 'description'=>$description];
		$data = ['status'=>$stat, 'result'=>'error'];
		print_r(json_encode(['success'=>false, 'data'=>$data], true));
    }else 
    {
		//Berhasil
		http_response_code(200);
		$stat = ['code'=>'200', 'description'=>'file upload success'];
		$data = ['status'=>$stat, 'result'=>'success'];
		print_r(json_encode(['success'=>true, 'data'=>$data ,'dirUpload'=>$dirUpload ,'nama'=>$name,'file'=>$_FILES["files"],'avatar_tmp_name'=>$avatar_tmp_name, 'TempName'=>$TempName, 'NewName'=>$NewName], true));
		$terupload = move_uploaded_file($avatar_tmp_name, $TempName);
	}
}
?>