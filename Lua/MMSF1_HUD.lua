local modeChanged = false;
local toggle = true;
local card1 = 0;
local card1 = 0;
local card1 = 0;
local card1 = 0;
local card1 = 0;
local card1 = 0;

local cardList = io.open("MMSF1_CardList.txt", "r");
local cards = {};
for line in cardList:lines() do
	table.insert(cards, line);
end

local function onSeedRNG()
	memory.writebyte(0x27e3740, 0x00);
	memory.writebyte(0x27e3741, 0x09);
	memory.writebyte(0x27e3742, 0xbf);
	memory.writebyte(0x27e3743, 0x6f);
end
memory.registerexec(0x2000cb6, onSeedRNG);

-- Important Memory Addresses
local stepCounter = 0x02136348;
local encounterRate = 0x02136350;
local rngIndex = 0x02120068;
local frameCounter = 0x0212e428;
local nextEncounterCheck = 0x0213634C;
local draw = 0x021AFBE4;

-- Helper functions
function getNumChecks() 
	local currentRate = memory.readbyte(encounterRate);
	return currentRate - 10;
end

function getNextCheck(currSteps)
	local nextCheck = memory.readdword(nextEncounterCheck);
	return nextCheck - currSteps;
end

-- Functions for displaying information
function outputEncounterInfo()
	local currentRate = memory.readbyte(encounterRate);
	local checks = getNumChecks();
	local steps = memory.readword(stepCounter);
	local nextCheck = getNextCheck(steps);
	
	gui.text(0, 32, string.format("Encounter Rate: %9d", currentRate));
	gui.text(0, 48, string.format("Step Counter: %11d", steps));
	gui.text(0, 64, string.format("Encounter Checks: %7d", checks));
	gui.text(0, 80, string.format("Next Check: %13d", nextCheck));
end

function outputDraw()
	-- Check if draw has changed
	local newCard1 = memory.readword(draw);
	local newCard2 = memory.readword(draw + 0x04);
	local newCard3 = memory.readword(draw + 0x08);
	local newCard4 = memory.readword(draw + 0x0C);
	local newCard5 = memory.readword(draw + 0x10);
	local newCard6 = memory.readword(draw + 0x14);
	
	if (card1 ~= newCard1) and (card2 ~= newCard2) and (card3 ~= newCard3) and (card4 ~= newCard4) and (card5 ~= newCard5) and (card6 ~= newCard6) then
		card1 = newCard1;
		card2 = newCard2;
		card3 = newCard3;
		card4 = newCard4;
		card5 = newCard5;
		card6 = newCard6;
		
		local frames = memory.read_u32_le(frameCounter);
		
		print("New draw on frame: " .. frames);
	end
	
	-- Output top folder
	local top = "";
	for i = 0, 14 do
		local address = draw + (i * 0x08);
		local card = memory.readword(address);
		
		if( cards[card] ~= nil ) then
			top = top .. cards[card] .. " ";
		else
			top = top .. card .. " ";
		end
	end
	gui.text(0, 96, string.format(top));
	
	-- Output bottom folder
	local bottom = "";
	for i = 0, 14 do
		local address = draw + 0x04 + (i * 0x08);
		local card = memory.readword(address);
		
		if( cards[card] ~= nil ) then
			bottom = bottom .. cards[card] .. " ";
		else
			bottom = bottom .. card .. " ";
		end
	end
	gui.text(0, 112, string.format(bottom)); 
end

function displayHUD()
	local rng = memory.readdword(rngIndex);
	local frames = memory.readdword(frameCounter);
	
	outputEncounterInfo();
	outputDraw();
	
	gui.text(0, 0, string.format("RNG Index: %14d", rng));
	gui.text(0, 16, string.format("Frame Counter: %10d", frames));
end

-- Main function
while true do
	local keys = joypad.get();
	
	if keys.Select and keys.Down then
		if not modeChanged then
			if toggle then
				toggle = false;
			else
				toggle = true;
			end
			modeChanged = true;
		end
	else
		modeChanged = false;
	end
	
	if toggle then
		displayHUD();
	end
	
	emu.frameadvance();
end