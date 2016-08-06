<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="utf-8">
	<title>Dados do formulário</title>
	<link rel="stylesheet" href="css/estiloForm.css">
</head>
<body>
	<h2>Usuário cadastrado com sucesso!</h2>
	<!--<form method="post" action="#">
	<fieldset>
		<legend>Novo Usuário</legend>
		<ul>
			<li>
				<label for="nome">Nome:</label>
				<input type="text" id="nome" name="nome" required="required" placeholder="Digite seu primeiro nome" />
			</li>
			<li>
				<label for="sobrenome">Sobrenome:</label>
				<input type="text" id="sobrenome" name="sobrenome" required="required" placeholder="Digite seu sobrenome" />
			</li>
		</ul>
		<input type="submit" value="Enviar"/>
	</fieldset>
	</form>-->
	<h3>Dados do usuário</h3>
	<?php
		$nome = $_POST["nome"];
		$sobrenome = $_POST["sobrenome"];
		echo "<p>Nome: " .$nome. "</p>";
		echo "<p>Sobrenome: " .$sobrenome. "</p>";
	?>
	<a href="index.html">Voltar</a>
</body>
</html>