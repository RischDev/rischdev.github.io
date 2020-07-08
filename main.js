var inProgress = false;
var workersComplete = 0;
var workers = [];
var macAddress, numTraderAttempts, cardTrader;
var seeds = [];
var traderNames = ["BIGWAVE", "Nacys", "Scrapyard", "AMAKEN"];

function checkRng() {
	if (!inProgress) {
		seeds = [
			{
				seed: 0,
				index: 0,
				numCards: 0
			}
		];
		var macAddress1 = $("input[name='macAddress1']").val();
		var macAddress2 = $("input[name='macAddress2']").val();
		var macAddress3 = $("input[name='macAddress3']").val();
		var macAddress4 = $("input[name='macAddress4']").val();
		numTraderAttempts = parseInt($("input[name='numTraderAttempts']").val());
		var goodCards = generateGoodCards($("input[name='cardSelect']").val());
		cardTrader = $("input[name='cardTrader']:checked").val();
		var checkUnique = $("input[name='checkUnique']").is(":checked");
		
		macAddress = parseInt("0x" + macAddress4 + macAddress3 + macAddress2 + macAddress1);

		$("#resultsInfo").html("");
		$("#resultsTable").html("");
		$("#seedSelection").removeClass("border-bottom");
		$("select[name=seeds]").html("");
		$("#loading").show();
		
		inProgress = true;
		console.log(new Date());
		for (var i = 0; i < 13; i++) {
			var worker = new Worker("rng.js");
			workers.push(worker);
			worker.postMessage([macAddress + (6657 * i), numTraderAttempts, TRADERS[cardTrader], goodCards, checkUnique]);
			worker.onmessage = function(response) {
				checkResponse(response);
			}
		}
	} else {
		
	}
}

function checkResponse(response) {
	workersComplete++;
	
	if (seeds[0].numCards < response.data[0].numCards) {
		seeds = response.data;
	} else if (seeds[0].numCards == response.data[0].numCards) {
		seeds = seeds.concat(response.data);
	}
	
	if (workersComplete == 13) {
		inProgress = false;
		console.log(new Date());
		seeds.sort((a, b) => (a.seed > b.seed) ? 1 : -1);
		console.log(seeds);
		
		var seedSelect = $("select[name=seeds]");
	
		var emptyOption = $("<option></option>").attr("value", -1);
		seedSelect.append(emptyOption);
		for (var i = 0; i < seeds.length; i++) {
			var seedOption = $("<option>Seed " + seeds[i].seed + ", Index " + seeds[i].index + "</option>").attr("value", i);
			if (i == 0) {
				seedOption.attr("selected", true);
			}
			seedSelect.append(seedOption);
		}
		
		outputSeed(0);
		$("#loading").hide();
		workersComplete = 0;
		
		for (var i = 0; i < 13; i++) {
			workers[i].terminate();
		}
	}
}

function outputSeed(index) {
	$("#seedSelection").addClass("border-bottom");
	$("#resultsInfo").html("");
	$("#resultsTable").html("");
	
	if (index != -1) {
		generateSeedInfo(seeds[index]);
		
		var header = $("<div></div>").addClass("resultsHeader");
		var rngPrimarys = new Array(4);
		var rngTraders = new Array(4);
		var smallCol = $("<div></div>").html("Card").addClass("col-small");
		header.append(smallCol);
		for (var i = 0; i < 4; i++) {
			var col = $("<div></div>").html(traderNames[i]).addClass("col");
			header.append(col);
			
			rngPrimarys[i] = rngInstantiate(false);
			rngTraders[i] = rngInstantiate(true);
			
			rngInit(rngPrimarys[i], seeds[index].seed);
			rngTwist(rngPrimarys[i]);
			
			rngPrimarys[i].index = seeds[index].index;
			var rngTraderSeed = rngNext(rngPrimarys[i]);
			rngInit(rngTraders[i], rngTraderSeed);
		}
		$("#resultsTable").append(header);
		
		for (var i = 0; i < Math.max(seeds[index].numCards, 100); i++) {
			var row = $("<div></div>").addClass("table-row");
			
			smallCol = $("<div></div>").html(i + 1).addClass("col-small");
			row.append(smallCol);
			
			for (var j = 0; j < 4; j++) {
				var card = simulateCardTraderRoll(rngTraders[j], TRADERS[traderNames[j]]);
				
				var col = $("<div></div>").html("<img src='images/" + card + ".png' class='cardImg' /> " + CARDNAMES[card]).addClass("col");
				row.append(col);
			}
			
			$("#resultsTable").append(row);
		}
	}
}

function generateSeedInfo(seed) {
	var dateTime = calculateDateTime(seed.seed - macAddress);
	var numStars = (seed.index - 173) / 4;
	
	var rngPrimary = rngInstantiate(false);
	var rngTrader = rngInstantiate(true);
	
	rngInit(rngPrimary, seed.seed);
	rngTwist(rngPrimary);
	rngPrimary.index = seed.index + 1;
	
	var slotIndices = new Array(6);
	var autoFavorites = getAutoFavoriteCards(rngPrimary, slotIndices);
	
	var row1 = $("<div></div>").addClass("row").addClass("border-bottom");
	var seedInfo = $("<div></div>").html("<span class='title'>Seed, Index</span><div> " + seed.seed.toString(16) + ", " + seed.index + "</div>").addClass("col2").addClass("padding-13").addClass("border-right");
	var starInfo = $("<div></div>").html("<span class='title'>Number of Stars on Title Screen</span><div> " + numStars + "</div>").addClass("col2").addClass("padding-13");
	row1.append(seedInfo).append(starInfo);
	
	var row2 = $("<div></div>").addClass("row").addClass("border-bottom");
	var dateInfo = $("<div></div>").html("<span class='title'>Date</span><div> " + dateTime.date + "</div>").addClass("col2").addClass("padding-13").addClass("border-right");
	var timeInfo = $("<div></div>").html("<span class='title'>Time</span><div> " + dateTime.time + "</div>").addClass("col2").addClass("padding-13");
	row2.append(dateInfo).append(timeInfo);
	
	var row3 = $("<div></div>").addClass("row").addClass("border-bottom");
	var numCardsInfo = $("<div></div>").html("<span class='title'>Number of Cards</span><div> " + seed.numCards + "</div>").addClass("col2").addClass("padding-13").addClass("border-right");
	var autoFavoritesInfo = $("<div></div>").html("<span class='title'>Auto Favorites</span><div> " + autoFavorites + "</div>").addClass("col2").addClass("padding-13");
	row3.append(numCardsInfo).append(autoFavoritesInfo);
	
	var numCardsInfo = $("<span></span>").html("Number of Cards: " + seed.numCards);
	$("#resultsInfo").append(row1).append(row2).append(row3);
}

function calculateDateTime(seedDiff) {
	// Need to keep at least 12 units. 10 seconds, 1 day, 1 month
	seedDiff -= 12;
	
	var hours = Math.floor(seedDiff / 3600);
	var minutes = Math.floor((seedDiff % 3600) / 60);
	
	seedDiff = (seedDiff % 3600) % 60;
	
	//Put remaining diff into months, then years, then days
	var months;
	if (seedDiff >= 11) {
		months = 12;
		seedDiff = seedDiff - 11;
	} else {
		months = 1 + seedDiff;
		seedDiff = 0;
	}
	
	var years;
	if (seedDiff >= 100) {
		years = 2099;
		seedDiff = seedDiff - 100;
	} else {
		years = 2000 + seedDiff;
		seedDiff = 0;
	}
	
	var days = seedDiff + 1;
	
	return {
		date: "Month: " + months + ", Day: " + days + ", Year: " + years,
		time: hours + ":" + minutes + ":" + 10
	}
}

function updateMacAddress(name) {
	var value = document.getElementsByName(name)[0].value;
	if (value.length >= 2) {
		var nextId = parseInt(name.replace("macAddress", "")) + 1;
		
		if (nextId <= 6) {
			document.getElementsByName("macAddress" + nextId)[0].focus();
		}
	}
}

function generateGoodCards(inputValue) {
	var values = inputValue.split(", ");
	var goodCards = [];
	
	values.forEach(val => goodCards.push(CARDS[val]));
	
	return goodCards;
}