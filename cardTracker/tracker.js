var foundArray;

$(document).ready(function() {
	CARDNAMES.forEach(generateCard);
	
	foundArray = JSON.parse(localStorage.getItem("foundArray"));
	
	if (foundArray == null) {
		foundArray = [];
	}
	
	foundArray.forEach(updateFound);
});

$(document).on("click", ".card", function() {
	$(this).toggleClass("found");
	
	var id = $(this).attr("id");
	if (foundArray.includes(id)) {
		foundArray.splice(foundArray.indexOf(id), 1);
	} else {
		foundArray.push(id);
	}
	localStorage.setItem("foundArray", JSON.stringify(foundArray));
});

function generateCard(name, index) {
	$("body").append(`<div id="${CARDS[name]}" class="card">
			<div class="title">${CARDS[name] + 1}. ${name}</div>
			<img class="icon" src="../images/${CARDS[name]}.png" />
		</div>`);
}

function updateFound(id, index) {
	$("#" + id).toggleClass("found");
}

function resetFound() {
	$(".found").toggleClass("found");
	
	foundArray = [];
	
	localStorage.setItem("foundArray", JSON.stringify(foundArray));
}