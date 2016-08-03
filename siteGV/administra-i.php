<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="utf-8">
	<title>Administração de usuário do GV</title>
	<link rel="stylesheet" href="css/estilo.css">
</head>
<body>
	<header>
		<a href="../siteTreino/">Voltar para o meu site treino</a>
		<a href="index.html">Voltar para o siteGV</a>
	</header>

<?php
	include "conecta_mysql.inc";
	$operacao = $_POST["operacao"];
	
	if ($operacao == "inserir") {
		$nome = $_POST["nome"];
		$sobrenome = $_POST["sobrenome"];
		$sql = "insert into alunos (nome, sobrenome) values ('$nome', '$sobrenome')" ;
		$resultado = mysqli_query($conexao, $sql);
		$linhas = mysqli_affected_rows($conexao);
		echo "<p>Foi inserido $linhas usuário";
		
		if ($linhas == 1) {
			echo "<p>Aluno incluído com sucesso!</p>";
			$sql = "select * from alunos where nome = '$nome' and sobrenome = '$sobrenome'";
			$resultado = mysqli_query($conexao, $sql);
			$usuario = mysqli_fetch_object($conexao, $resultado);
			echo "<p>Matrícula: " . $usuario->matricula . "</p>";
			echo "<p>Nome: " . $usuario->nome . "</p>";
			echo "<p>Sobrenome: " . $usuario->sobrenome . "</p>";
			echo "<p>Saldo: R$" . $usuario->Saldo . "</p>";
		}
		elseif ($linhas < 1) {
			echo "<p>Erro!!!</p><p>Não foi feita a inserção!</p>";
		}
		else {
			echo "<p>Erro!!!</p><p>Foi inserido mais de um usuário!!! :O</p>";
		}
	}
	
	elseif ($operacao == "listar") {
		$resultado = mysqli_query($conexao, "select * from alunos");
		$linhas = mysqli_num_rows($conexao, $resultado);
		echo "<h3>Lista de usuários<h3>";
		for ($i = 0; $i < $linhas; $i++){
			$usuario = mysqli_fetch_object($conexao, $resultado);
			
			echo "<hr>";
			echo "<p>Matrícula: " . $usuario->matricula . "</p>";
			echo "<p>Nome: " . $usuario->nome . "</p>";
			echo "<p>Sobrenome: " . $usuario->sobrenome . "</p>";
			echo "<p>Saldo R$" . $usuario->Saldo . "</p>";
		}
	}
	
	elseif ($operacao == "pesquisar") {
		$sql = "select * from alunos where matricula = " . $_POST["matricula"];
		$resultado = mysqli_query($conexao, $sql);
		$usuario = mysqli_fetch_object($conexao, $resultado);
		
		echo "<hr>";
		echo "<p>Matrícula: " . $usuario->matricula . "</p>";
		echo "<p>Nome: " . $usuario->nome . "</p>";
		echo "<p>Sobrenome:" . $usuario->sobrenome . "</p>";
		echo "<p>Saldo R$" . $usuario->Saldo . "</p>";
		
	}
	
	elseif ($operacao == "mudaSaldo") {
		$matricula = $_POST["matricula"];
		$addSaldo = $_POST["addSaldo"];
		$resultado = mysqli_query($conexao, "select * from alunos where matricula = $matricula");
		$linhas = mysqli_num_rows($conexao, $resultado);
		if ($linhas != 1) {
			echo "<p>Erro!!!</p>";
			echo "<p>Não foi encontrado nenhum usuário com matrícula $matricula</p>";
		}
		else{
			$usuario = mysqli_fetch_object($conexao, $resultado);
			$novoSaldo = $usuario->Saldo + $addSaldo;
			$sql = "update alunos set saldo = " . $novoSaldo . " where matricula = " . $matricula;
			$resultado = mysqli_query($conexao, $sql);
			$linhas = mysqli_affected_rows($conexao);
			if ($linhas != 1) {
				echo "<p>Erro!!!</p>";
				echo "<p>Operação não realizada!</p>";
			}
			else {
				echo "<p>Operação realizada com sucesso!";
				$resultado = mysqli_query($conexao, "select * from alunos where matricula = $matricula");
				$usuario = mysqli_fetch_object($conexao, $resultado);
				echo "<hr>";
				echo "<p>Matrícula: " . $usuario->matricula . "</p>";
				echo "<p>Nome: " . $usuario->nome . "</p>";
				echo "<p>Sobrenome:" . $usuario->sobrenome . "</p>";
				echo "<p>Saldo R$" . $usuario->Saldo . "</p>";
			}
			
		}
		
	}
	
	mysqli_close($conexao);
?>

	<a href="adminSite.html">Voltar<a>

</body>
</html>