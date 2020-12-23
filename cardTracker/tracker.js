$(document).ready(function() {
	CARDNAMES.forEach(generateCard);
});

$(document).on("click", ".card", function() {
	$(this).toggleClass("found");
});

function generateCard(name, index) {
	$("body").append(`<div id="${CARDS[name]}" class="card">
			<div class="title">${CARDS[name] + 1}. ${name}</div>
			<img class="icon" src="../images/${CARDS[name]}.png" />
		</div>`);
}