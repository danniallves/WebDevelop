<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="utf-8">
	<title>Administração de usuário do GV</title>
	<link rel="stylesheet" href="css/estilo.css">
	<link rel="stylesheet" href="css/estiloAdmin.css">
</head>
<body>
	<header>
		<a href="../siteTreino/">Voltar para o meu site treino</a>
		<a href="index.html">Voltar para o siteGV</a>
	</header>

	<h3>Administração de usuários </h3>
	
	
	<form method="post" action="administra.php">
	<fieldset>
		<legend>Inserir Usuário</legend>
		<input type="hidden" name="operacao" value="inserir"/>
		<ul>
			<li>
				<label for="nome">Nome:</label>
				<input type="text" id="nome" name="nome" required="required" placeholder="Digite seu primeiro nome" />
			</li>
			<li>
				<label for="sobrenome">Sobrenome:</label>
				<input type="text" id="sobrenome" name="sobrenome" required="required" placeholder="Digite seu sobrenome" >
			</li>
		</ul>
		<input type="submit" value="Inserir">
	</fieldset>
	</form>
	
	<form method="post" action="administra.php">
	<fieldset>
		<legend>Listar Usuários</legend>
		<input type="hidden" name="operacao" value="listar">
		<input type="submit" value="Listar">
	</fieldset>
	</form>
	
	<form method="post" action="administra.php">
	<fieldset>
		<legend>Pesquisar usuário</legend>
		<input type="hidden" name="operacao" value="pesquisar">
		<ul>
			<li>
				<label for="matricula">Matrícula:</label>
				<?php
					include "conecta_mysql.inc";
					$resultado = mysql_query("select * from alunos");
					$alunos = mysql_num_rows($resultado);
					echo '<input type="number" id="matricula" name="matricula" min="1" max="$alunos" >';
				?>
				<input type="submit" value="Pesquisar">
			</li>
		</ul>
	</fieldset>
	</form>
	<form method="post" action="administra.php">
	<fieldset>
		<legend>Modificar Saldo</legend>
		<input type="hidden" name="operacao" value="mudaSaldo">
		<ul>
			<li>
				<label for="matricula">Matrícula: </label>
				<?php
					include "conecta_mysql.inc";
					$resultado = mysql_query("select * from alunos");
					$alunos = mysql_num_rows($resultado);
					echo '<input type="number" id="matricula" name="matricula" min="1" max="$alunos" required="required" >';
				?>
			</li>
			<li>
				<label id="adicionaSaldo" for="addSaldo">Saldo a adicionar: </label>
				<input type="number" id="addSaldo" name="addSaldo" min="0.00" step="0.05" required="required" >
			</li>
		</ul>
		<input type="submit" value="Adicionar">
	</fieldset>
	</form>
</body>
</html>