var foundArray;

$(document).ready(function() {
	STANDARD.forEach(generateStandard);
	MEGA.forEach(generateMega);
	
	foundArray = JSON.parse(localStorage.getItem("foundArray"));
	
	if (foundArray == null || foundArray.length == 0) {
		foundArray = [0, 3, 9, 13, 22, 23, 24, 126, 127, 134, 148, 149];
	}
	
	foundArray.forEach(updateFound);
});

$(document).on("click", ".collapse", function() {
	let id = $(this).parent().parent().attr("id");
	
	$("#" + id).toggle();
	
	if (id == "notes") {
		$("#tracker").css("width", "100%");
		$("#tracker-collapse").toggle();
		$("#tracker-expand").toggle();
	} else {
		$("#notes").css("width", "100%");
		$("#notes-collapse").toggle();
		$("#notes-expand").toggle();
	}
});

$(document).on("click", ".expand", function() {
	let id = $(this).parent().parent().attr("id");
	
	
	if (id == "notes") {
		$("#tracker").toggle();
		$("#notes").css("width", "65%");
		$("#notes-collapse").toggle();
		$("#notes-expand").toggle();
	} else {
		$("#notes").toggle();
		$("#tracker").css("width", "35%");
		$("#tracker-collapse").toggle();
		$("#tracker-expand").toggle();
	}
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

function generateStandard(name, index) {
	$("#standard").append(`<div id="${CARDS[name]}" class="card standard">
			<div class="title">${(CARDS[name] + 1).toString().padStart(3, "0")} ${name}</div>
			<img class="icon" src="../images/${CARDS[name]}.png" />
		</div>`);
}

function generateMega(name, index) {
	$("#mega").append(`<div id="${CARDS[name]}" class="card mega">
			<div class="title">${(CARDS[name] - 149).toString().padStart(3, "0")} ${name}</div>
			<img class="icon" src="../images/${CARDS[name]}.png" />
		</div>`);
}

function generateGiga(name, index) {
	$("#mega").append(`<div id="${CARDS[name]}" class="card giga">
			<div class="title">${(CARDS[name] - 149).toString().padStart(3, "0")} ${name}</div>
			<img class="icon" src="../images/${CARDS[name]}.png" />
		</div>`);
}

function updateFound(id, index) {
	$("#" + id).toggleClass("found");
}

function resetFound() {
	$(".found").toggleClass("found");
	
	foundArray = [0, 3, 9, 13, 22, 23, 24, 126, 127, 134, 148, 149];
	
	foundArray.forEach(updateFound);
	
	localStorage.setItem("foundArray", JSON.stringify(foundArray));
}