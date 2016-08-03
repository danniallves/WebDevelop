<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="utf-8">
	<title>Administração de usuário do GV</title>
	<link rel="stylesheet" href="css/estilo.css">
	<link rel="stylesheet" href="css/estiloAdmin.css">
</head>
<body>
<div class="conteudo">
	<header>
		<a href="index.html">Voltar para o siteGV</a>
	</header>
	

	
<?php
	
	function desenhaTabela($usuarios, $cap) {
		echo "<table>";
		echo "<caption>" . $cap . "</caption>";
		echo "<thead> <tr>";
		echo "<th scope='col'>Matrícula</th>";
		echo "<th scope='col'>Nome</th>";
		echo "<th scope='col'>Sobrenome</th>";
		echo "<th scope='col'>Saldo</th>";
		echo "</tr> </thead>";
		echo "<tbody>";
		for ($i = 0; $i < count($usuarios); $i++) {
			echo "<tr>";
			echo "<td>" . $usuarios[$i]->matricula . "</td>";
			echo "<td>" . $usuarios[$i]->nome . "</td>";
			echo "<td>" . $usuarios[$i]->sobrenome . "</td>";
			echo "<td>R$" . $usuarios[$i]->Saldo . "</td>";
			echo "</tr>";
		}
		echo "</tbody>";
		echo "</table>";
	}

	include "conecta_mysql.inc";
	$operacao = $_POST["operacao"];
	$vetor = array();
	
	if ($operacao == "inserir") {
		$nome = $_POST["nome"];
		$sobrenome = $_POST["sobrenome"];
		$sql = "insert into alunos (nome, sobrenome) values ('$nome', '$sobrenome')" ;
		$resultado = mysql_query($sql);
		$linhas = mysql_affected_rows();
		echo "<p>Foi inserido $linhas usuário";
		
		if ($linhas == 1) {
			echo "<p>Aluno incluído com sucesso!</p>";
			$sql = "select * from alunos where nome = '$nome' and sobrenome = '$sobrenome'";
			$resultado = mysql_query($sql);
			$usuario = mysql_fetch_object($resultado);
			array_push($vetor, $usuario);
			desenhaTabela($vetor, "Novo Aluno");
		}
		elseif ($linhas < 1) {
			echo "<p>Erro!!!</p><p>Não foi feita a inserção!</p>";
		}
		else {
			echo "<p>Erro!!!</p><p>Foi inserido mais de um usuário!!! :O</p>";
		}
	}
	
	elseif ($operacao == "listar") {
		$resultado = mysql_query("select * from alunos");
		$linhas = mysql_num_rows($resultado);
		echo "<h3>Lista de usuários<h3>";
		for ($i = 0; $i < $linhas; $i++){
			$usuario = mysql_fetch_object($resultado);
			array_push($vetor, $usuario);
		}
		desenhaTabela($vetor, "Alunos");
	}
	
	elseif ($operacao == "pesquisar") {
		$sql = "select * from alunos where matricula = " . $_POST["matricula"];
		$resultado = mysql_query($sql);
		$usuario = mysql_fetch_object($resultado);
		
		array_push($vetor, $usuario);
		desenhaTabela($vetor, "Aluno");
		
	}
	
	elseif ($operacao == "mudaSaldo") {
		$matricula = $_POST["matricula"];
		$addSaldo = $_POST["addSaldo"];
		$resultado = mysql_query("select * from alunos where matricula = $matricula");
		$linhas = mysql_num_rows($resultado);
		if ($linhas != 1) {
			echo "<p>Erro!!!</p>";
			echo "<p>Não foi encontrado nenhum usuário com matrícula $matricula</p>";
		}
		else{
			$usuario = mysql_fetch_object($resultado);
			$novoSaldo = $usuario->Saldo + $addSaldo;
			$sql = "update alunos set saldo = " . $novoSaldo . " where matricula = " . $matricula;
			$resultado = mysql_query($sql);
			$linhas = mysql_affected_rows();
			if ($linhas != 1) {
				echo "<p>Erro!!!</p>";
				echo "<p>Operação não realizada!</p>";
			}
			else {
				echo "<p>Operação realizada com sucesso!";
				$resultado = mysql_query("select * from alunos where matricula = $matricula");
				$usuario = mysql_fetch_object($resultado);
				array_push($vetor, $usuario);
				desenhaTabela($vetor, "Aluno");
			}
			
		}
		
	}
	
	mysql_close($conexao);
?>

	<a href="adminSite.html">Voltar<a>
</div>
</body>
</html>