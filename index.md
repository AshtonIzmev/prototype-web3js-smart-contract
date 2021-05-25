---
layout: default
title: Exploration de la blockchain
---

<div class="row">
	<!-- Solde -->
	<div class="col-12">
		<!-- small box -->
		<div class="small-box bg-dark">
			<div class="inner">
				<h3>
					<span id="solde"> <span style="color: gainsboro;">Vous n'êtes pas
							connecté à la blockchain Ethereum </span></span>
				</h3>
				<span class="solde" style="display:none;">Solde d'ether (de test, aucune valeur marchande ni utilité hors ce prototype)</span>
				<span id="received-ether"></span>
			</div>
			<div class="icon">
				<i class="ion ion-bag"></i>
			</div>
			<a onclick="getEther()" class="small-box-footer">Recevoir <i class="fas fa-arrow-circle-right"></i></a>
		</div>
	</div>
</div>

<div class="row">
	<div class="col-12">
		<div class="callout callout-info">
			<h5><i class="fas fa-info"></i> La communauté des curieux</h5>
			<span>
				Nous allons explorer la technologie blockchain ensemble.
				Ce site web vous permettra d'interagir avec des contrats de la blockchain Ethereum. Pour ce faire,
				vous aurez besoin de l'application Metamask et de récupérer de l'ether (de test).
			</span>
		</div>
	</div>
</div>

<div class="row">
	<div class="col-12">
		<a id="instruction"></a>
		<div class="callout callout-info" id="network-problem">
			<p>
				<span class="bold">
					Merci de connecter votre extension/application MetaMask ou de rafraichir la page afin de connecter
					la wallet. Si cela ne fonctionne pas, fermez et relancez le navigateur ou l'application Metamask.
				</span>
			</p>
			<p>
			<div>Merci de suivre cette procédure :
				<ol>
					<li>Installer <a href="https://play.google.com/store/apps/details?id=io.metamask">Metamask</a>
						&nbsp; <a href="https://play.google.com/store/apps/details?id=io.metamask"><img
								src="/assets/images/mm-logo.svg" /></a>
						(application dans le store si vous êtes sur mobile)
						ou extension Google Chrome si sur desktop</li>
					<li>Configurer votre wallet Metamask avec un mot de passe et les étapes de sécurité demandées</li>
					<li>Ajouter un nouveau réseau (<b><a target="_blank"
								href="https://issam.ma/assets/img/blockchain_association/metamask_3.jpg">Paramètres/Settings</a></b>
						puis <b><a target="_blank"
								href="https://issam.ma/assets/img/blockchain_association/metamask_4.jpg">Networks</a></b>
						puis <b><a target="_blank" href="https://issam.ma/assets/img/blockchain_association/metamask_5.jpg">Add
								Network</a></b>
						puis renseigner les <a target="_blank"
							href="https://issam.ma/assets/img/blockchain_association/metamask_6.jpg">informations de
							connexion à la blackchain</a> avec RPC Url <b>https://curieux.ma/blockchain/</b> et
						<b>985459</b> dans chain ID
					</li>
					<li>Accepter la connection au site (une pop-up devrait s'afficher)</li>
				</ol>
				Vous retrouverez toutes ces étapes sur mon <a target="_blank"
					href="https://issam.ma/jekyll/update/2020/10/01/communaute-curieux.html">article sur les
					associations smart contract</a>
			</div>
			</p>
		</div>
	</div>
</div>

<script type="text/javascript" src="/assets/js/home/home.js"></script>