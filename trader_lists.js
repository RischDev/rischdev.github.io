const TRADERS = {
	BIGWAVE: [
		{
			size: 2,
			list: [CARDS.Invisible, CARDS.IceMeteor2]
		},
		{
			size: 4,
			list: [CARDS.RdrMissil2, CARDS.RdrMissil2, CARDS.PlasmaGun2, CARDS.Gatling2]
		},
		{
			size: 8,
			list: [CARDS.Recover50, CARDS.RdrMissil1, CARDS.PlusCannon, CARDS.Recover80, CARDS.WideWave2, CARDS.ThndrBall2, CARDS.JetAttack2, CARDS.IceMeteor1]
		},
		{
			size: 8,
			list: [CARDS.GrndWave2, CARDS.FireRing2, CARDS.PowerBomb2, CARDS.GhstPulse2, CARDS.BraveSwrd1, CARDS.Barrier, CARDS.Barrier, CARDS.TailBurnr2]
		},
		{
			size: 16,
			list: [CARDS.Recover30, CARDS.Recover50, CARDS.Recover50, CARDS.ParlyzPlus, CARDS.HeatBall2, CARDS.JetAttack1, CARDS.PowerSong, CARDS.SyncHook1, CARDS.TimeBomb1, CARDS.TimeBomb1, CARDS.PlasmaGun1, CARDS.PlasmaGun1, CARDS.Gatling1, CARDS.ThndrBall1, CARDS.Attack_10, CARDS.Attack_10]
		},
		{
			size: 16,
			list: [CARDS.PowerBomb1, CARDS.Recover10, CARDS.Recover30, CARDS.TailBurnr1, CARDS.WideWave1, CARDS.Cannon, CARDS.GhstPulse1, CARDS.FireRing1, CARDS.GrndWave1, CARDS.Sword, CARDS.WideSword, CARDS.LongSword, CARDS.HeatBall1, CARDS.AirSpread, CARDS.GrassStage, CARDS.IceStage]
		}
	],
	Nacys: [
		{
			size: 4,
			list: [CARDS.Bombalizer, CARDS.FreezNukle, CARDS.PoisNukle, CARDS.StunNukle]
		},
		{
			size: 8,
			list: [CARDS.HevyCannon, CARDS.HevyCannon, CARDS.RdrMissil3, CARDS.IceMeteor2, CARDS.HeatBall3, CARDS.Recover200, CARDS.SpiritFury, CARDS.PoisnApple]
		},
		{
			size: 4,
			list: [CARDS.RdrMissil2, CARDS.PlasmaGun2, CARDS.Invisible, CARDS.Gatling2]
		},
		{
			size: 8,
			list: [CARDS.ThndrBall3, CARDS.GhstPulse3, CARDS.QuakeSong, CARDS.HeatBall2, CARDS.PlusCannon, CARDS.PlusCannon, CARDS.Recover150, CARDS.Recover150]
		},
		{
			size: 16,
			list: [CARDS.GrndWave3, CARDS.JetAttack3, CARDS.TimeBomb2, CARDS.Recover80, CARDS.GraviStage, CARDS.GNullStage, CARDS.PowerBomb3, CARDS.GhstPulse2, CARDS.FireRing3, CARDS.Recover120, CARDS.BraveSwrd2, CARDS.WideWave3, CARDS.SyncHook2, CARDS.CloudShot2, CARDS.ChainBubl2, CARDS.FireBzook2]
		},
		{
			size: 32,
			list: [CARDS.Gatling1, CARDS.Recover50, CARDS.ParlyzPlus, CARDS.Attack_10, CARDS.Barrier, CARDS.MoaiFall1, CARDS.StikyRain1, CARDS.FlickrKck1, CARDS.MopLance1, CARDS.JumboHmmr1, CARDS.PowerBomb2, CARDS.FireRing2, CARDS.TailBurnr2, CARDS.WideWave2, CARDS.ThndrBall2, CARDS.BraveSwrd1, CARDS.TailBurnr3, CARDS.TimeBomb1, CARDS.FireBzook1, CARDS.PowerSong, CARDS.GreenInk, CARDS.BlueInk, CARDS.CloudShot1, CARDS.ChainBubl1, CARDS.IceStage, CARDS.GrassStage, CARDS.GrndWave2, CARDS.SyncHook1, CARDS.JetAttack2, CARDS.Sword, CARDS.WideSword, CARDS.LongSword]
		}
	],
	Scrapyard: [
		{
			size: 8,
			list: [CARDS.GigaMine, CARDS.Aura, CARDS.TaurusFire, CARDS.CygnusWing, CARDS.HarpNote, CARDS.LibraScals, CARDS.QnOphiuca, CARDS.GeminSpark]
		},
		{
			size: 16,
			list: [CARDS.DoublCross, CARDS.Bombalizer, CARDS.AntiSword, CARDS.BlazngEdge, CARDS.TidalEdge, CARDS.StrikeEdge, CARDS.ArboEdge, CARDS.HolyPanel, CARDS.SpiritFury, CARDS.PoisnApple, CARDS.Recover200, CARDS.Barrier100, CARDS.StunNukle, CARDS.PoisNukle, CARDS.FreezNukle, CARDS.IceMeteor3]
		},
		{
			size: 16,
			list: [CARDS.RdrMissil3, CARDS.Gatling3, CARDS.PlasmaGun3, CARDS.ChainBubl3, CARDS.GhstPulse3, CARDS.FireBzook3, CARDS.BraveSwrd3, CARDS.TripSong, CARDS.SyncHook3, CARDS.TimeBomb3, CARDS.CloudShot3, CARDS.Recover150, CARDS.WideWave3, CARDS.ThndrBall3, CARDS.JetAttack3, CARDS.HevyCannon]
		},
		{
			size: 16,
			list: [CARDS.HeatBall3, CARDS.RdrMissil2, CARDS.Gatling2, CARDS.PlasmaGun2, CARDS.PurpleInk, CARDS.PurpleInk, CARDS.MoaiFall3, CARDS.StikyRain2, CARDS.FlickrKck2, CARDS.MopLance2, CARDS.MopLance2, CARDS.JumboHmmr2, CARDS.IceMeteor2, CARDS.Whistle, CARDS.Whistle, CARDS.PowerBomb3]
		},
		{
			size: 16,
			list: [CARDS.Invisible, CARDS.Recover120, CARDS.Recover120, CARDS.QuakeSong, CARDS.GraviStage, CARDS.GNullStage, CARDS.VulcnSeed1, CARDS.JunkCube1, CARDS.Fokx_Fu1, CARDS.BigAx1, CARDS.FireRing3, CARDS.GrndWave3, CARDS.TailBurnr3, CARDS.BraveSwrd2, CARDS.PlusCannon, CARDS.PlusCannon]
		},
		{
			size: 32,
			list: [CARDS.Barrier, CARDS.ParlyzPlus, CARDS.Attack_10, CARDS.HeatBall2, CARDS.Sword, CARDS.WideSword, CARDS.LongSword, CARDS.GrndWave2, CARDS.JetAttack2, CARDS.PowerBomb2, CARDS.GhstPulse2, CARDS.FireRing2, CARDS.Recover50, CARDS.Recover80, CARDS.GrassStage, CARDS.IceStage, CARDS.TailBurnr2, CARDS.WideWave2, CARDS.ThndrBall2, CARDS.PowerSong, CARDS.SyncHook2, CARDS.TimeBomb2, CARDS.GreenInk, CARDS.BlueInk, CARDS.CloudShot2, CARDS.FireBzook2, CARDS.ChainBubl2, CARDS.MoaiFall1, CARDS.StikyRain1, CARDS.FlickrKck1, CARDS.MopLance1, CARDS.JumboHmmr1]
		}
	],
	AMAKEN: [
		{
			size: 8,
			list: [CARDS.TaursFireSP, CARDS.CygnsWingSP, CARDS.HarpNoteSP, CARDS.LibrScalsSP, CARDS.QnOphiucaSP, CARDS.GemnSpkSP, CARDS.GigaMine, CARDS.BreakSabre]
		},
		{
			size: 16,
			list: [CARDS.TaursFireEX, CARDS.CygnsWingEX, CARDS.HarpNoteEX, CARDS.LibrScalsEX, CARDS.QnOphiucaEX, CARDS.GemnSpkEX, CARDS.TyphnDance, CARDS.TyphnDance, CARDS.JamminPnch, CARDS.JamMachGun, CARDS.HolyPanel, CARDS.HolyPanel, CARDS.Aura, CARDS.Aura, CARDS.Barrier200, CARDS.Barrier200]
		},
		{
			size: 16,
			list: [CARDS.TaurusFire, CARDS.CygnusWing, CARDS.HarpNote, CARDS.LibraScals, CARDS.QnOphiuca, CARDS.GeminSpark, CARDS.DoublCross, CARDS.Recover300, CARDS.Barrier100, CARDS.GreenBurst, CARDS.GreenBurst, CARDS.IceBurst, CARDS.IceBurst, CARDS.PoisBurst, CARDS.SpiritFury, CARDS.PoisnApple]
		},
		{
			size: 32,
			list: [CARDS.BrsrkSwrd3, CARDS.Fokx_Fu3, CARDS.VulcnSeed3, CARDS.JunkCube3, CARDS.MoaiFall3, CARDS.BigAx3, CARDS.MagiCrysl3, CARDS.BlackHole3, CARDS.Bombalizer, CARDS.AntiSword, CARDS.BlazngEdge, CARDS.TidalEdge, CARDS.StrikeEdge, CARDS.ArboEdge, CARDS.StunNukle, CARDS.PoisNukle, CARDS.FreezNukle, CARDS.RdrMissil3, CARDS.IceMeteor3, CARDS.Gatling3, CARDS.PlasmaGun3, CARDS.Recover200, CARDS.HevyCannon, CARDS.FlickrKck3, CARDS.MopLance3, CARDS.BraveSwrd3, CARDS.SyncHook3, CARDS.StikyRain3, CARDS.CloudShot3, CARDS.ThndrBall3, CARDS.JumboHmmr3, CARDS.VolticEye3]
		},
		{
			size: 32,
			list: [CARDS.HeatBall3, CARDS.PlasmaGun2, CARDS.Gatling2, CARDS.RdrMissil2, CARDS.HeatBall2, CARDS.IceMeteor2, CARDS.Whistle, CARDS.Whistle, CARDS.GrndWave3, CARDS.JetAttack3, CARDS.PowerBomb3, CARDS.GhstPulse3, CARDS.FireRing3, CARDS.TimeBomb3, CARDS.FireBzook3, CARDS.TailBurnr3, CARDS.WideWave3, CARDS.ChainBubl3, CARDS.Recover120, CARDS.Recover120, CARDS.Recover150, CARDS.BrsrkSwrd2, CARDS.BlackHole2, CARDS.MagiCrysl2, CARDS.BigAx2, CARDS.MoaiFall2, CARDS.TripSong, CARDS.VolticEye2, CARDS.JunkCube2, CARDS.VulcnSeed2, CARDS.Fokx_Fu2, CARDS.Invisible]
		},
		{
			size: 64,
			list: [CARDS.GrndWave2, CARDS.JetAttack2, CARDS.PowerBomb2, CARDS.GhstPulse2, CARDS.FireRing2, CARDS.TimeBomb2, CARDS.FireBzook2, CARDS.TailBurnr2, CARDS.WideWave2, CARDS.ChainBubl2, CARDS.StikyRain2, CARDS.CloudShot2, CARDS.ThndrBall2, CARDS.SyncHook2, CARDS.FlickrKck2, CARDS.JumboHmmr2, CARDS.MopLance2, CARDS.VolticEye1, CARDS.VolticEye1, CARDS.Fokx_Fu1, CARDS.Fokx_Fu1, CARDS.VulcnSeed1, CARDS.VulcnSeed1, CARDS.BraveSwrd2, CARDS.BraveSwrd2, CARDS.JunkCube1, CARDS.JunkCube1, CARDS.PowerSong, CARDS.PowerSong, CARDS.QuakeSong, CARDS.QuakeSong, CARDS.BigAx1, CARDS.BigAx1, CARDS.MagiCrysl1, CARDS.MagiCrysl1, CARDS.BlackHole1, CARDS.BlackHole1, CARDS.BrsrkSwrd1, CARDS.BrsrkSwrd1, CARDS.GreenInk, CARDS.GreenInk, CARDS.BlueInk, CARDS.BlueInk, CARDS.PurpleInk, CARDS.PurpleInk, CARDS.Recover80, CARDS.Recover80, CARDS.PlusCannon, CARDS.PlusCannon, CARDS.AirSpread, CARDS.AirSpread, CARDS.Sword, CARDS.WideSword, CARDS.LongSword, CARDS.GrassStage, CARDS.GrassStage, CARDS.IceStage, CARDS.IceStage, CARDS.GraviStage, CARDS.GraviStage, CARDS.GNullStage, CARDS.GNullStage, CARDS.ParlyzPlus, CARDS.Attack_10]
		}
	]
}