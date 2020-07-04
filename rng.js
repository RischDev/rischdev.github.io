function and(v1, v2) {
	var hi = 0x80000000;
    var low = 0x7fffffff;
    var hi1 = ~~(v1 / hi);
    var hi2 = ~~(v2 / hi);
    var low1 = v1 & low;
    var low2 = v2 & low;
    var h = hi1 & hi2;
    var l = low1 & low2;
    return h*hi + l;
}

function or(v1, v2) {
	var hi = 0x80000000;
    var low = 0x7fffffff;
    var hi1 = ~~(v1 / hi);
    var hi2 = ~~(v2 / hi);
    var low1 = v1 & low;
    var low2 = v2 & low;
    var h = hi1 | hi2;
    var l = low1 | low2;
    return h*hi + l;
}

function xor(v1, v2) {
	var hi = 0x80000000;
    var low = 0x7fffffff;
    var hi1 = ~~(v1 / hi);
    var hi2 = ~~(v2 / hi);
    var low1 = v1 & low;
    var low2 = v2 & low;
    var h = hi1 ^ hi2;
    var l = low1 ^ low2;
    return h*hi + l;
}

function checkValue(value) {
	if (value >= 4294967295) {
		value = (value + (4294967295 + 1)) % (2 * (4294967295 + 1));
	}
	
	return value;
}

function rngInstantiate(optimize) {
	var rng = {
		index: 0,
		cardTraderOptimize: optimize,
		twistCount: 0,
		state: []
	};
	rngInit(rng, 4357);
	return rng;
}

function rngInit(rng, seed) {
	var next = 0;
	
	if (rng.cardTraderOptimize) {
		for (var i = 0; i < 4; i++) {
			next = checkValue(69069 * seed + 1);
			rng.state[i] = or(and(seed, 0xFFFF0000), (and(next, 0xFFFF0000) / Math.pow(2, 16)));
			seed = checkValue(69069 * next + 1);
		}
		for (var i = 4; i < 397; i++) {
			rng.state[i] = 0;
			next = checkValue(69069 * seed + 1);
			seed = checkValue(69069 * next + 1);
		}
	
		for (var i = 397; i < 400; i++) {
            next = checkValue(69069 * seed + 1);
            rng.state[i] = or(and(seed, 0xFFFF0000), (and(next, 0xFFFF0000) / Math.pow(2, 16)));
            seed = checkValue(69069 * next + 1);
        }
		for (var i = 400; i < 624; i++) {
			rng.state[i] = 0;
		}
	} else {
        for (var i = 0; i < 624; i++) {
            next = checkValue(69069 * seed + 1);
            rng.state[i] = or(and(seed, 0xFFFF0000), (and(next, 0xFFFF0000) / Math.pow(2, 16)));
            seed = checkValue(69069 * next + 1);
        }
    }
	
    rng.index = 624;
    rng.twistCount = 0;
}

function rngNext(rng) {
    if (rng.index >= 624) {
        rngTwist(rng);
    }
	
    var seed = rng.state[rng.index++];
	
    seed = xor(seed, (seed / Math.pow(2, 11)));
    seed = xor(seed, and(checkValue(seed * Math.pow(2, 7)), 0x9D2C5680));
    seed = xor(seed, and(checkValue(seed * Math.pow(2, 15)), 0xEFC60000));
    seed = xor(seed, (seed / Math.pow(2, 18)));

    return seed;
}

function rngTwist(rng) {
    if (rng.index == 625) {
        rngInit(rng, 4357);
    }
    
    var seed, xorValue;
    
    if (rng.chipTraderOptimize) {
        for (var i = 0; i < 3; i++) {
            seed = or(and(rng.state[i], 0x80000000), and(rng.state[i + 1], 0x7FFFFFFF));
            xorValue = (and(seed, 1)) != 0 ? 0x9908B0DF : 0;
            seed = and((seed / Math.pow(2, 1)), 0x7FFFFFFF);
            rng.state[i] = xor(xor(seed, rng.state[i + 397]), xorValue);
        }
    } else {
        for (var i = 0; i < 227; i++) {
            seed = or(and(rng.state[i], 0x80000000), and(rng.state[i + 1], 0x7FFFFFFF));
            xorValue = (and(seed, 1)) != 0 ? 0x9908B0DF : 0;
            seed = and((seed / Math.pow(2, 1)), 0x7FFFFFFF);
            rng.state[i] = xor(xor(seed, rng.state[i + 397]), xorValue);
        }
        for (var i = 227; i < 623; i++) {
            seed = or(and(rng.state[i], 0x80000000), and(rng.state[i + 1], 0x7FFFFFFF));
            xorValue = (and(seed, 1)) != 0 ? 0x9908B0DF : 0;
            seed = and((seed / Math.pow(2, 1)), 0x7FFFFFFF);
            rng.state[i] = xor(xor(seed, rng.state[i - 227]), xorValue);
        }
		seed = or(and(rng.state[623], 0x80000000), and(rng.state[0], 0x7FFFFFFF));
		xorValue = (and(seed, 1)) != 0 ? 0x9908B0DF : 0;
		seed = and((seed / Math.pow(2, 1)), 0x7FFFFFFF);
		rng.state[623] = xor(xor(seed, rng.state[396]), xorValue);

    }
    rng.twistCount++;
    rng.index = 0;
}

function simulateCardTraderRoll(rng, cardTraderLists) {
	var next  = rngNext(rng);
    var cardTraderListIndex = and(next, 0x3f);
    var cardList;
	
    if (cardTraderListIndex == 0) {
        cardList = cardTraderLists[0].list;
    } else if (cardTraderListIndex <= 6) {
        cardList = cardTraderLists[1].list;
    } else if (cardTraderListIndex <= 14) {
        cardList = cardTraderLists[2].list;
    } else if (cardTraderListIndex <= 24) {
        cardList = cardTraderLists[3].list;
    } else if (cardTraderListIndex <= 40) {
        cardList = cardTraderLists[4].list;
    } else {
        cardList = cardTraderLists[5].list;
    }
	
    var cardListIndex = and(rngNext(rng), (cardList.length - 1));
    rngInit(rng, rngNext(rng));
    return cardList[cardListIndex];
}

function initializeGoodCardBoolArray(goodCards) {
    var goodCardBoolArray = new Array(186);
    
	resetGoodCardBoolArray(goodCardBoolArray, goodCards);
	
    return goodCardBoolArray;
}

function resetGoodCardBoolArray(goodCardBoolArray, goodCards) {
    for (var i = 0; i < goodCardBoolArray.length; i++) {
        goodCardBoolArray[i] = false;
    }
	
	for (var i = 0; i < goodCards.length; i++) {
        goodCardBoolArray[goodCards[i]] = true;
    }
}

function getAutoFavoriteCards(rng, slotIndices) {
    for (var i = 0; i < 6; i++) {
        var curSlot = Math.floor(rngNext(rng) / Math.pow(2, 1)) % 30;
        for (var j = 0; j < i; j++) {
            if (curSlot == slotIndices[j]) {
                curSlot = (curSlot + 1) % 30;
            }
        }
        slotIndices[i] = curSlot;
    }
    for (var i = 1; i < 6; i++) {
        for (var j = i; j > 0 && (slotIndices[j - 1] > slotIndices[j]); j--) {
            var temp = slotIndices[j];
            slotIndices[j] = slotIndices[j - 1];
            slotIndices[j - 1] = temp;
        }
    }
	
	var autoFavorites = (slotIndices[0] + 1).toString();
	
	for (var i = 1; i < 6; i++) {
		autoFavorites += ", " + (slotIndices[i] + 1).toString();
	}
	
	return autoFavorites;
}

function findActualGoodTradersList(macAddress, numTraderAttempts, cardTraderList, goodCards, checkUnique) {
    var rngPrimary = rngInstantiate(false);
    var rngTrader = rngInstantiate(true);
    var goodCardBoolArray = initializeGoodCardBoolArray(goodCards);

    var curSeed = macAddress;
	var bestSeeds = [];
    var bestSeedNumCards = 0;

    for (curSeed = macAddress; curSeed <= (macAddress + 6657); curSeed++) {
        var curSeedStart = curSeed;
        
        rngInit(rngPrimary, curSeed);
		
        rngTwist(rngPrimary);

        for (rngPrimary.index = 0xad; rngPrimary.index < 624; rngPrimary.index += 3 /* actually += 4, but ++ happens in rng_next()*/) {
            var curSeedStart = rngNext(rngPrimary);
			
            var curSeedNumberCards = 0;
            rngInit(rngTrader, curSeedStart);
            for (var i = 0; i < numTraderAttempts; i++) {
                var card = simulateCardTraderRoll(rngTrader, cardTraderList);

				if (checkUnique) {
					if (goodCardBoolArray[card]) {
						goodCardBoolArray[card] = false;
						curSeedNumberCards++;
					}
				} else {
					if (goodCards.includes(card)) {
						curSeedNumberCards++;
					}
				}
            }
			
			var seed = {
				seed: curSeed,
				numCards: curSeedNumberCards,
				index: rngPrimary.index - 1
			}

            if (curSeedNumberCards > bestSeedNumCards) {
                bestSeedNumCards = curSeedNumberCards;
				bestSeeds = [seed];
            } else if (curSeedNumberCards == bestSeedNumCards) {
				bestSeeds.push(seed);
			}

            if (curSeedNumberCards != 0) {
                resetGoodCardBoolArray(goodCardBoolArray, goodCards);
            }
        }
    }
	
	return bestSeeds;
}

onmessage = function(e) {
	var response = findActualGoodTradersList(e.data[0], e.data[1], e.data[2], e.data[3], e.data[4]);
	postMessage(response);
}