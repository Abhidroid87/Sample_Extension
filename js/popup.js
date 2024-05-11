const app = chrome || browser;
let userConsent = false;
app.storage.local.get("userConsent", (result) => {
	userConsent = result.userConsent;
	console.log("User consent:", userConsent);
	if (userConsent == "false" || userConsent == undefined) {
		window.open("install.html", "_blank");
	} else {
		console.log("User consented");
	}
});
const width = screen.width;
const popupWidth = width * 0.2;
const scale = width / 1920;
$("body").css("width", popupWidth);
$("body").css("--scale", scale);

const smartphones = [
	{
		phone: "iPhone 15",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/16A148 Safari/605.1.15",
		width: 375,
		height: 812,
		devicePixelRatio: 3,
	},
	{
		phone: "iPhone 15 Plus",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/16A148 Safari/605.1.15",
		width: 414,
		height: 896,
		devicePixelRatio: 3,
	},
	{
		phone: "iPhone 15 Pro",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/16A148 Safari/605.1.15",
		width: 390,
		height: 844,
		devicePixelRatio: 3,
	},
	{
		phone: "iPhone 15 Pro Max",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/16A148 Safari/605.1.15",
		width: 428,
		height: 926,
		devicePixelRatio: 3,
	},
	{
		phone: "iPhone 14",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",
		width: 375,
		height: 812,
		devicePixelRatio: 3,
	},
	{
		phone: "iPhone 14 Plus",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",
		width: 414,
		height: 896,
		devicePixelRatio: 3,
	},
	{
		phone: "iPhone 14 Pro",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",
		width: 390,
		height: 844,
		devicePixelRatio: 3,
	},
	{
		phone: "iPhone 14 Pro Max",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",
		width: 428,
		height: 926,
		devicePixelRatio: 3,
	},
	{
		phone: "iPhone 13",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",
		width: 375,
		height: 812,
		devicePixelRatio: 3,
	},
	{
		phone: "iPhone 13 Pro",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",
		width: 390,
		height: 844,
		devicePixelRatio: 3,
	},
	{
		phone: "iPhone 13 Pro Max",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",
		width: 428,
		height: 926,
		devicePixelRatio: 3,
	},
	{
		phone: "iPhone 12",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
		width: 375,
		height: 812,
		devicePixelRatio: 3,
	},
	{
		phone: "iPhone 12 Pro",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
		width: 390,
		height: 844,
		devicePixelRatio: 3,
	},
	{
		phone: "Samsung Galaxy S23",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 375,
		height: 812,
		devicePixelRatio: 3,
	},
	{
		phone: "Samsung Galaxy S23 Plus",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; SM-S916B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 414,
		height: 896,
		devicePixelRatio: 3,
	},
	{
		phone: "Samsung Galaxy S23 Ultra",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 428,
		height: 926,
		devicePixelRatio: 3,
	},
	{
		phone: "Samsung Galaxy S22",
		userAgent:
			"Mozilla/5.0 (Linux; Android 12; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36",
		width: 375,
		height: 812,
		devicePixelRatio: 3,
	},
	{
		phone: "Samsung Galaxy S22 Plus",
		userAgent:
			"Mozilla/5.0 (Linux; Android 12; SM-S906B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36",
		width: 414,
		height: 896,
		devicePixelRatio: 3,
	},
	{
		phone: "Samsung Galaxy S22 Ultra",
		userAgent:
			"Mozilla/5.0 (Linux; Android 12; SM-S908B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36",
		width: 428,
		height: 926,
		devicePixelRatio: 3,
	},
	// {
	// 	phone: "Samsung Galaxy S21",
	// 	userAgent:
	// 		"Mozilla/5.0 (Linux; Android 12; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36",
	// 	width: 375,
	// 	height: 812,
	// 	devicePixelRatio: 3,
	// },
	// {
	// 	phone: "Samsung Galaxy S21 Plus",
	// 	userAgent:
	// 		"Mozilla/5.0 (Linux; Android 12; SM-G996B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36",
	// 	width: 414,
	// 	height: 896,
	// 	devicePixelRatio: 3,
	// },
	// {
	// 	phone: "Samsung Galaxy S21 Ultra",
	// 	userAgent:
	// 		"Mozilla/5.0 (Linux; Android 12; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36",
	// 	width: 428,
	// 	height: 926,
	// 	devicePixelRatio: 3,
	// },
	{
		phone: "OnePlus 11",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; GM1900) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 390,
		height: 844,
		devicePixelRatio: 3,
	},
	{
		phone: "OnePlus 11 Pro",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; GM1910) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 428,
		height: 926,
		devicePixelRatio: 3,
	},
	{
		phone: "OnePlus 11 Pro Max",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; GM1915) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 448,
		height: 980,
		devicePixelRatio: 3,
	},
	{
		phone: "OnePlus 11R",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; GM1920) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 375,
		height: 812,
		devicePixelRatio: 3,
	},
	{
		phone: "OnePlus 11T",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; GM1930) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 390,
		height: 844,
		devicePixelRatio: 3,
	},
	{
		phone: "Xiaomi 13",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; MI-13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 375,
		height: 812,
		devicePixelRatio: 3,
	},
	{
		phone: "Xiaomi 13 Pro",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; MI-13Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 414,
		height: 896,
		devicePixelRatio: 3,
	},
	{
		phone: "Xiaomi 13 Ultra",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; MI-13Ultra) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 428,
		height: 926,
		devicePixelRatio: 3,
	},
	{
		phone: "Xiaomi 13S",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; MI-13S) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 390,
		height: 844,
		devicePixelRatio: 3,
	},
	{
		phone: "Xiaomi 13S Pro",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; MI-13SPro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 428,
		height: 926,
		devicePixelRatio: 3,
	},
	{
		phone: "Xiaomi 13 Lite",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; MI-13Lite) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 360,
		height: 780,
		devicePixelRatio: 2.5,
	},
	{
		phone: "Vivo V27",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; V2300) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 375,
		height: 812,
		devicePixelRatio: 3,
	},
	{
		phone: "Vivo V27e",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; V2305) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 360,
		height: 780,
		devicePixelRatio: 3,
	},
	{
		phone: "Vivo V27 Pro",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; V2310) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 390,
		height: 844,
		devicePixelRatio: 3,
	},
	{
		phone: "Vivo V27 4G",
		userAgent:
			"Mozilla/5.0 (Linux; Android 12; V2340) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36",
		width: 360,
		height: 780,
		devicePixelRatio: 3,
	},
	{
		phone: "Vivo X90",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; V2200) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 375,
		height: 812,
		devicePixelRatio: 3,
	},
	{
		phone: "Vivo X90 Pro",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; V2210) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 390,
		height: 844,
		devicePixelRatio: 3,
	},
	{
		phone: "Vivo X90 Pro+",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; V2215) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 428,
		height: 926,
		devicePixelRatio: 3,
	},
	{
		phone: "Realme GT 5",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; RMX3300) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 390,
		height: 844,
		devicePixelRatio: 3,
	},
	{
		phone: "Realme GT 5 Pro",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; RMX3310) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 428,
		height: 926,
		devicePixelRatio: 3,
	},
	{
		phone: "Realme Narzo 60",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; RMX3161) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 375,
		height: 812,
		devicePixelRatio: 3,
	},
	{
		phone: "Realme Narzo 60 Pro",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; RMX3163) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 390,
		height: 844,
		devicePixelRatio: 3,
	},
	{
		phone: "Realme 50",
		userAgent:
			"Mozilla/5.0 (Linux; Android 12; RMX3092) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36",
		width: 360,
		height: 780,
		devicePixelRatio: 3,
	},
	{
		phone: "Realme 50 Pro",
		userAgent:
			"Mozilla/5.0 (Linux; Android 12; RMX3093) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36",
		width: 390,
		height: 844,
		devicePixelRatio: 3,
	},
	{
		phone: "Realme 11",
		userAgent:
			"Mozilla/5.0 (Linux; Android 12; RMX3561) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36",
		width: 360,
		height: 780,
		devicePixelRatio: 3,
	},
	{
		phone: "Realme 11 Pro",
		userAgent:
			"Mozilla/5.0 (Linux; Android 12; RMX3563) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36",
		width: 390,
		height: 844,
		devicePixelRatio: 3,
	},
	{
		phone: "Realme 11 Pro+",
		userAgent:
			"Mozilla/5.0 (Linux; Android 12; RMX3565) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36",
		width: 428,
		height: 926,
		devicePixelRatio: 3,
	},
	{
		phone: "Realme 10",
		userAgent:
			"Mozilla/5.0 (Linux; Android 12; RMX3511) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36",
		width: 360,
		height: 780,
		devicePixelRatio: 3,
	},
	{
		phone: "Realme 10 Pro",
		userAgent:
			"Mozilla/5.0 (Linux; Android 12; RMX3513) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36",
		width: 390,
		height: 844,
		devicePixelRatio: 3,
	},
	{
		phone: "Realme GT 4",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; RMX3200) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 390,
		height: 844,
		devicePixelRatio: 3,
	},
	{
		phone: "Realme GT 4 Pro",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; RMX3210) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 428,
		height: 926,
		devicePixelRatio: 3,
	},
	{
		phone: "Realme GT 4 Pro Master Edition",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; RMX3215) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 428,
		height: 926,
		devicePixelRatio: 3,
	},
	{
		phone: "iQOO Z7",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; V2148A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 375,
		height: 812,
		devicePixelRatio: 3,
	},
	{
		phone: "iQOO Z6 Lite 5G",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; V2115A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 360,
		height: 780,
		devicePixelRatio: 3,
	},
	{
		phone: "iQOO Z6 5G",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; V2144A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 390,
		height: 844,
		devicePixelRatio: 3,
	},
	{
		phone: "iQOO Z6 Pro 5G",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; V2145A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 428,
		height: 926,
		devicePixelRatio: 3,
	},
	{
		phone: "iQOO 10",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; V2231A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 375,
		height: 812,
		devicePixelRatio: 3,
	},
	{
		phone: "iQOO 10 Pro",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; V2232A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 390,
		height: 844,
		devicePixelRatio: 3,
	},
	{
		phone: "iQOO 11",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; V2331A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 375,
		height: 812,
		devicePixelRatio: 3,
	},
	{
		phone: "iQOO 11 Pro",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; V2332A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 390,
		height: 844,
		devicePixelRatio: 3,
	},
	{
		phone: "Oppo Reno 10",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; CPH2417) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 375,
		height: 812,
		devicePixelRatio: 3,
	},
	{
		phone: "Oppo Reno 10 Pro",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; CPH2407) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 390,
		height: 844,
		devicePixelRatio: 3,
	},
	{
		phone: "Oppo Reno 10 Pro+",
		userAgent:
			"Mozilla/5.0 (Linux; Android 13; CPH2405) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
		width: 428,
		height: 926,
		devicePixelRatio: 3,
	},
	{
		phone: "Oppo F23",
		userAgent:
			"Mozilla/5.0 (Linux; Android 12; CPH2427) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36",
		width: 360,
		height: 780,
		devicePixelRatio: 3,
	},
	{
		phone: "Oppo F23 Pro",
		userAgent:
			"Mozilla/5.0 (Linux; Android 12; CPH2425) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36",
		width: 390,
		height: 844,
		devicePixelRatio: 3,
	},
];

$(document).ready(function () {
	setTimeout(() => {
		const width = screen.width;
		const popupWidth = width * 0.2;
		const scale = width / 1920;
		$("body").css("width", popupWidth);
		$("body").css("--scale", scale);
	}, 100);

	const $search = $("#search");
	const $searchDiv = $("#searchDiv");
	const $schedule = $("#schedule");
	const $scheduleDiv = $("#scheduleDiv");

	const $searchDesktop = $("#searchDesktop");
	const $searchMobile = $("#searchMobile");
	const $scheduleDesktop = $("#scheduleDesktop");
	const $scheduleMobile = $("#scheduleMobile");

	const $searchPerform = $("#searchPerform");
	const $schedulePerform = $("#schedulePerform");
	const $stopDiv = $("#stopDiv");
	const $stop = $("#stop");

	const $searchMin = $("#searchMin");
	const $searchMax = $("#searchMax");
	const $scheduleMin = $("#scheduleMin");
	const $scheduleMax = $("#scheduleMax");

	const $searchT1 = $("#searchT1");
	const $searchT2 = $("#searchT2");
	const $searchT3 = $("#searchT3");
	const $searchT4 = $("#searchT4");

	const $scheduleT1 = $("#scheduleT1");
	const $scheduleT2 = $("#scheduleT2");
	const $scheduleT3 = $("#scheduleT3");
	const $scheduleT4 = $("#scheduleT4");

	const $device = $("#device");

	const $shuffle = $("#shuffle");

	const alerts = $("#stopDiv h4");
	// on a delay of 3 sec, change the text from an array of strings
	async function titleUpdate() {
		const promts = ["Greetings! while your searches are in progress, check out my other extensions and consider joining the journey!", "The Amazon affiliate page helps the extension without charging you any extra cost.","Always check the announcement page for updates and new feature releases!","If you have any suggestions or feedback, feel free to contact me!","If you like the extension, consider leaving a review","You can always try reinstalling the extension if you face any issues"];
		setTimeout(() => {
			const random = Math.floor(Math.random() * promts.length);
			alerts.text(promts[random]);
			titleUpdate();
		}, 3000);
	}
	titleUpdate();

	app.storage.local.get(["runningSearch", "phoneName"], (result) => {
		if (!result.runningSearch) {
			$stopDiv.css("display", "none");
		} else {
			$stopDiv.css("display", "flex");
		}
		if (result.phoneName) {
			$shuffle.text(result.phoneName);
			console.log("Selected simulation device:", result.phoneName);
		} else {
			const randomPhone =
				smartphones[Math.floor(Math.random() * smartphones.length)];
			console.log("New simulation device", randomPhone);
			const phoneName = randomPhone.phone;
			const phoneUserAgent = randomPhone.userAgent;
			const phoneWidth = randomPhone.width;
			const phoneHeight = randomPhone.height;
			const phoneDevicePixelRatio = randomPhone.devicePixelRatio;
			app.storage.local.set({
				phoneName: phoneName,
				phoneUserAgent: phoneUserAgent,
				phoneWidth: phoneWidth,
				phoneHeight: phoneHeight,
				phoneDevicePixelRatio: phoneDevicePixelRatio,
			});
			$shuffle.text(phoneName);
		}
	});

	$shuffle.click(function () {
		app.storage.local.remove([
			"phoneName",
			"phoneUserAgent",
			"phoneWidth",
			"phoneHeight",
			"phoneDevicePixelRatio",
		]);
		location.reload();
	});

	$search.click(function () {
		console.log("search clicked");
		$search.addClass("selected");
		$schedule.removeClass("selected");
		$searchDiv.show();
		$scheduleDiv.hide();
	});

	$schedule.click(function () {
		console.log("schedule clicked");
		$search.removeClass("selected");
		$schedule.addClass("selected");
		$searchDiv.hide();
		$scheduleDiv.show();
	});

	$search.click();

	async function store() {
		console.log("Storing values");
		app.storage.local.set({
			searchDesktop: $searchDesktop.val(),
			searchMobile: $searchMobile.val(),
			scheduleDesktop: $scheduleDesktop.val(),
			scheduleMobile: $scheduleMobile.val(),
			searchMin: $searchMin.val(),
			searchMax: $searchMax.val(),
			scheduleMin: $scheduleMin.val(),
			scheduleMax: $scheduleMax.val(),
		});
		compare();
	}

	function fetch() {
		console.log("Fetching values");
		app.storage.local.get(
			[
				"searchDesktop",
				"searchMobile",
				"scheduleDesktop",
				"scheduleMobile",
				"searchMin",
				"searchMax",
				"scheduleMin",
				"scheduleMax",
				"scheduleDefault",
			],
			(result) => {
				if (result.searchDesktop != undefined) {
					$searchDesktop.val(result.searchDesktop);
				}
				if (result.searchMobile != undefined) {
					$searchMobile.val(result.searchMobile);
				}
				if (result.scheduleDesktop != undefined) {
					$scheduleDesktop.val(result.scheduleDesktop);
				}
				if (result.scheduleMobile != undefined) {
					$scheduleMobile.val(result.scheduleMobile);
				}
				if (result.searchMin != undefined) {
					$searchMin.val(result.searchMin);
				}
				if (result.searchMax != undefined) {
					$searchMax.val(result.searchMax);
				}
				if (result.scheduleMin != undefined) {
					$scheduleMin.val(result.scheduleMin);
				}
				if (result.scheduleMax != undefined) {
					$scheduleMax.val(result.scheduleMax);
				}
				if (result.scheduleDefault != undefined) {
					deselectAllSchedule();
					if (result.scheduleDefault == "scheduleT1") {
						$scheduleT1.addClass("selected");
						$schedulePerform.text("Never");
					} else if (result.scheduleDefault == "scheduleT2") {
						$scheduleT2.addClass("selected");
						$schedulePerform.text("After startup");
					} else if (result.scheduleDefault == "scheduleT3") {
						$scheduleT3.addClass("selected");
						$schedulePerform.text("Every 5-6 mins");
					} else if (result.scheduleDefault == "scheduleT4") {
						$scheduleT4.addClass("selected");
						$schedulePerform.text("Every 15-17.5 mins");
					}
				} else {
					deselectAllSchedule();
					app.storage.local.set({ scheduleDefault: "scheduleT1" });
					$scheduleT1.addClass("selected");
				}
			},
		);
		console.log("Values fetched, comparing");
		compare();
	}
	fetch();

	function compare() {
		app.storage.local.get(["searchDesktop", "searchMobile"], (result) => {
			const searchDesktop = parseInt(result.searchDesktop);
			const searchMobile = parseInt(result.searchMobile);
			console.log(searchDesktop, searchMobile, "values compared");
			deselectAllSearch();
			if (searchDesktop == 10 && searchMobile == 0) {
				$searchT1.addClass("selected");
				console.log("searchT1 selected");
			} else if (searchDesktop == 20 && searchMobile == 10) {
				$searchT2.addClass("selected");
				console.log("searchT2 selected");
			} else if (searchDesktop == 30 && searchMobile == 20) {
				$searchT3.addClass("selected");
				console.log("searchT3 selected");
			} else if (searchDesktop == 50 && searchMobile == 30) {
				$searchT4.addClass("selected");
				console.log("searchT4 selected");
			}
		});
	}

	function deselectAllSearch() {
		console.log("Deselected all search");
		$searchT1.removeClass("selected");
		$searchT2.removeClass("selected");
		$searchT3.removeClass("selected");
		$searchT4.removeClass("selected");
	}

	function deselectAllSchedule() {
		console.log("Deselected all schedule");
		$scheduleT1.removeClass("selected");
		$scheduleT2.removeClass("selected");
		$scheduleT3.removeClass("selected");
		$scheduleT4.removeClass("selected");
	}

	function logValues() {
		console.log("searchDesktop", $searchDesktop.val());
		console.log("searchMobile", $searchMobile.val());
		console.log("searchMin", $searchMin.val());
		console.log("searchMax", $searchMax.val());
		console.log("scheduleDesktop", $scheduleDesktop.val());
		console.log("scheduleMobile", $scheduleMobile.val());
		console.log("scheduleMin", $scheduleMin.val());
		console.log("scheduleMax", $scheduleMax.val());
	}

	$searchDesktop.on("input", async function () {
		if ($searchDesktop.val() == "") {
			$searchDesktop.val(0);
		}
		await store();
		logValues();
	});
	$searchMobile.on("input", async function () {
		if ($searchMobile.val() == "") {
			$searchMobile.val(0);
		}
		await store();
		logValues();
	});

	$searchPerform.click(async function () {
		console.log(userConsent);
		if (userConsent) {
			await store();
			app.runtime.sendMessage({ message: "search" });
			$stopDiv.css("display", "flex");
		}
	});

	$searchMin.on("input", async function () {
		if (
			parseInt($searchMin.val()) < 5 ||
			parseInt($searchMin.val()) == ""
		) {
			$searchMin.val(5);
		}
		if (parseInt($searchMin.val()) >= parseInt($searchMax.val())) {
			$searchMax.val(parseInt($searchMin.val()) + 5);
		}
		await store();
		logValues();
	});
	$searchMax.on("input", async function () {
		if (
			parseInt($searchMax.val()) <= parseInt($searchMin.val()) ||
			parseInt($searchMax.val()) == ""
		) {
			$searchMax.val(parseInt($searchMin.val()) + 5);
		}
		await store();
		logValues();
	});

	$searchT1.click(async function () {
		deselectAllSearch();
		$searchT1.addClass("selected");
		$searchDesktop.val(10);
		$searchMobile.val(0);
		console.log("searchT1 clicked, values updated to 10 and 0");
		await store();
		logValues();
	});
	$searchT2.click(async function () {
		deselectAllSearch();
		$searchT2.addClass("selected");
		$searchDesktop.val(20);
		$searchMobile.val(10);
		console.log("searchT2 clicked, values updated to 20 and 10");
		await store();
		logValues();
	});
	$searchT3.click(async function () {
		deselectAllSearch();
		$searchT3.addClass("selected");
		$searchDesktop.val(30);
		$searchMobile.val(20);
		console.log("searchT3 clicked, values updated to 30 and 20");
		await store();
		logValues();
	});
	$searchT4.click(async function () {
		deselectAllSearch();
		$searchT4.addClass("selected");
		$searchDesktop.val(50);
		$searchMobile.val(30);
		console.log("searchT4 clicked, values updated to 50 and 30");
		await store();
		logValues();
	});

	$scheduleDesktop.on("input", async function () {
		if ($scheduleDesktop.val() == "") {
			$scheduleDesktop.val(0);
		}
		await store();
		logValues();
	});
	$scheduleMobile.on("input", async function () {
		if ($scheduleMobile.val() == "") {
			$scheduleMobile.val(0);
		}
		await store();
		logValues();
	});

	$scheduleMin.on("input", async function () {
		if (
			parseInt($scheduleMin.val()) < 5 ||
			parseInt($scheduleMin.val()) == ""
		) {
			$scheduleMin.val(5);
		}
		if (parseInt($scheduleMin.val()) >= parseInt($scheduleMax.val())) {
			$scheduleMax.val(parseInt($scheduleMin.val()) + 5);
		}
		await store();
		logValues();
	});
	$scheduleMax.on("input", async function () {
		if (
			parseInt($scheduleMax.val()) <= parseInt($scheduleMin.val()) ||
			parseInt($scheduleMax.val()) == ""
		) {
			$scheduleMax.val(parseInt($scheduleMin.val()) + 5);
		}
		await store();
		logValues();
	});

	$scheduleT1.click(function () {
		deselectAllSchedule();
		$scheduleT1.addClass("selected");
		console.log("scheduleT1 clicked");
		$schedulePerform.text("Schedule updated - Never");
		app.storage.local.set({ scheduleDefault: "scheduleT1" });
		app.runtime.sendMessage({ message: "scheduleUpdate" });
		logValues();
	});
	$scheduleT2.click(function () {
		deselectAllSchedule();
		$scheduleT2.addClass("selected");
		console.log("scheduleT2 clicked");
		$schedulePerform.text("Scheduled for - After startup");
		app.storage.local.set({ scheduleDefault: "scheduleT2" });
		app.runtime.sendMessage({ message: "scheduleUpdate" });
		logValues();
	});
	$scheduleT3.click(function () {
		deselectAllSchedule();
		$scheduleT3.addClass("selected");
		console.log("scheduleT3 clicked");
		$scheduleDesktop.val(1);
		$scheduleMobile.val(1);
		$schedulePerform.text("Start Now - Every 5-6 mins");
		app.storage.local.set({
			scheduleDefault: "scheduleT3",
			scheduleDesktop: 1,
			scheduleMobile: 1,
		});
		app.runtime.sendMessage({ message: "scheduleUpdate" });
		logValues();
	});
	$scheduleT4.click(function () {
		deselectAllSchedule();
		$scheduleT4.addClass("selected");
		console.log("scheduleT4 clicked");
		$scheduleDesktop.val(3);
		$scheduleMobile.val(3);
		$schedulePerform.text("Start Now - Every 15-17.5 mins");
		app.storage.local.set({
			scheduleDefault: "scheduleT4",
			scheduleDesktop: 3,
			scheduleMobile: 3,
		});
		app.runtime.sendMessage({ message: "scheduleUpdate" });
		logValues();
	});

	$schedulePerform.click(function () {
		const content = this.textContent;
		$schedulePerform.text("Schedule updated");
		setTimeout(() => {
			$schedulePerform.text(content);
		}, 2000);
		app.runtime.sendMessage({ message: "schedule" });
	});

	$device.click(function () {
		app.runtime.sendMessage({ message: "device" });
	});

	$stop.click(function () {
		app.storage.local.set({ runningSearch: false });
		$stopDiv.css("display", "none");
	});
});
