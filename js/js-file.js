function teleportToRegisterForm() {
	const rf = document.getElementById("register-form");

	rf.scrollIntoView({block: "center", inline: "center"});
}

headerButton.onclick = teleportToRegisterForm;
secondQuestionButton.onclick = teleportToRegisterForm;


function teleportToRegisterFormForArtist() {
	const rfsa = document.querySelector(".register-form__select-artist");

	rfsa.value = rfsa.options[0].value;


	teleportToRegisterForm();
}

artistButton.onclick = teleportToRegisterFormForArtist;


function teleportToRegisterFormForInvestor() {
	const rfsa = document.querySelector(".register-form__select-artist");

	rfsa.value = rfsa.options[1].value;


	teleportToRegisterForm();
}

investorButton.onclick = teleportToRegisterFormForInvestor;
