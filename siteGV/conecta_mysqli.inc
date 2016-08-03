<?php
	$conexao = mysqli_connect("localhost", "admin", "SenhaFacil");
	mysqli_select_db($conexao, "gvteste");
	
	//Checando a conexão
	if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
?>