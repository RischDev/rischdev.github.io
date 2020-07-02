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

		$("#results").hide();
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
		console.log(seeds);
		
		$("#results").html("");
		
		var dateTime = calculateDateTime(seeds[0].seed - macAddress);
		
		var seedInfo = $("<div></div>");
		var bestSeedInfo = $("<span></span>").html("Seed: " + seeds[0].seed.toString(16) + ", Index: " + seeds[0].index + "&emsp;");
		var dateTimeInfo = $("<span></span>").html("Date/Time: " + dateTime + "&emsp;");
		var numCardsInfo = $("<span></span>").html("Number of Cards: " + seeds[0].numCards);
		seedInfo.append(bestSeedInfo, dateTimeInfo, numCardsInfo);
		$("#results").append(seedInfo);
		
		var header = $("<div></div>").addClass("resultsHeader");
		var rngPrimarys = new Array(4);
		var rngTraders = new Array(4);
		for (var i = 0; i < 4; i++) {
			var col = $("<div></div>").html(traderNames[i]).addClass("col");
			header.append(col);
			
			rngPrimarys[i] = rngInstantiate(false);
			rngTraders[i] = rngInstantiate(true);
			
			rngInit(rngPrimarys[i], seeds[0].seed);
			rngTwist(rngPrimarys[i]);
			
			rngPrimarys[i].index = seeds[0].index;
			var rngTraderSeed = rngNext(rngPrimarys[i]);
			rngInit(rngTraders[i], rngTraderSeed);
		}
		$("#results").append(header);
		
		for (var i = 0; i < 15; i++) {
			var row = $("<div></div>").addClass("row");
			
			for (var j = 0; j < 4; j++) {
				var card = simulateCardTraderRoll(rngTraders[j], TRADERS[traderNames[j]]);
				
				var col = $("<div></div>").html(CARDNAMES[card]).addClass("col");
				row.append(col);
			}
			
			$("#results").append(row);
		}
		
		rngInit(rngPrimarys[0], seeds[0].seed);
		rngTwist(rngPrimarys[0]);
		rngPrimarys[0].index = seeds[0].index + 1;
		
		var slotIndices = new Array(6);
		getAutoFavoriteCards(rngPrimarys[0], slotIndices);
		
		console.log("Slot indices (one-indexed): ");
		for (var i = 0; i < 6; i++) {
			console.log(slotIndices[i] + 1);
		}
		
		for (var i = 0; i < 13; i++) {
			workers[i].terminate();
		}
		
		$("#results").show();
		$("#loading").hide();
		workersComplete = 0;
	}
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
	
	return "Month: " + months + ", Day: " + days + ", Year: " + years + ", Time: " + hours + ":" + minutes + ":" + 10;
}

function generateGoodCards(inputValue) {
	var values = inputValue.split(", ");
	var goodCards = [];
	
	values.forEach(val => goodCards.push(CARDS[val]));
	
	return goodCards;
}