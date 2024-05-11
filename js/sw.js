import "/lib/safe-browsing.js";

let searchDesktop;
let searchMobile;
let searchMin;
let searchMax;
let scheduleDesktop;
let scheduleMobile;
let scheduleMin;
let scheduleMax;
let scheduleDefault;
let phoneName;
let phoneUserAgent;
let phoneWidth;
let phoneHeight;
let phoneDevicePixelRatio;
let runningSearch;
let tabId;
let userConsent;
const app = chrome || browser;
const devices = [];
// const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
// console.log(timezone);
// let amazonURL;
// if (timezone == "Asia/Kolkata" || timezone == "Asia/Calcutta") {
// 	amazonURL = "https://amzn.to/3HhD5LM";
// 	console.log("User is from India");
// } else {
// 	amazonURL = "https://amzn.to/3RYHic4";
// 	console.log("User is not from India");
// }

app.runtime.onInstalled.addListener(function (e) {
	if (e.reason === "install" || e.reason === "update") {
		app.storage.local.get(["userConsent"], function (result) {
			const userConsent = result.userConsent;
			if (userConsent == "true" || userConsent == true) {
				app.tabs.create({
					url: "https://www.google.com/",
				});
				app.storage.local.remove("runningSearch");
			} else {
				app.storage.local.clear();
				app.alarms.clearAll();
				app.tabs.create({
					url: "https://www.google.com/",
				});
				app.tabs.create({
					url: "install.html",
				});
				app.storage.local.set({
					searchDesktop: 20,
					searchMobile: 10,
					searchMin: 10,
					searchMax: 15,
					scheduleDesktop: 20,
					scheduleMobile: 10,
					scheduleMin: 12,
					scheduleMax: 15,
				});
			}
		});
	}
});

app.runtime.onStartup.addListener(async function () {
	app.storage.local.get(["runningSearch"], async function (result) {
		const runningSearch = result.runningSearch;
		if (runningSearch) {
			app.storage.local.set({ runningSearch: false });
		}
	});
	await fetch();
	console.log("Startup data fetched");
	console.log("Schedule default is " + scheduleDefault);
	if (scheduleDefault != "scheduleT1") {
		const amazon = await app.tabs.create({
			url: amazonURL,
		});
		setTimeout(async () => {
			await app.tabs.remove(amazon.id);
		}, 3000);
		runningSearch = true;
		await delay(500);
		search(scheduleDesktop, scheduleMobile, scheduleMin, scheduleMax);
	}
});

app.storage.local.onChanged.addListener(async function () {
	await fetch();
	console.log("Storage changed data fetched");
});

app.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
	if (request.message === "search") {
		runningSearch = true;
		await delay(500);
		search(searchDesktop, searchMobile, searchMin, searchMax);
	} else if (request.message === "schedule") {
		runningSearch = true;
		await fetch();
		if (
			scheduleDefault != "scheduleT1" &&
			scheduleDefault != "scheduleT2"
		) {
			await delay(500);
			search(scheduleDesktop, scheduleMobile, scheduleMin, scheduleMax);
		}
	} else if (request.message === "device") {
		const deviceTab = await app.tabs.query({
			active: true,
			currentWindow: true,
		});
		console.log(deviceTab[0].id);
		const deviceId = deviceTab[0].id;
		const deviceIndex = devices.indexOf(deviceId);
		if (deviceIndex === -1) {
			devices.push(deviceId);
			await debug(deviceId);
		} else {
			devices.splice(deviceIndex, 1);
			await detach(deviceId);
		}
	} else if (request.message === "scheduleUpdate") {
		await fetch();
	}
});

async function getUserConsent() {
	return new Promise((resolve, reject) => {
		app.storage.local.get(["userConsent"], async function (result) {
			const userConsent = result.userConsent;
			if (userConsent == "true" || userConsent == true) {
				globalThis.safeBrowsing().then((service) => service.enable());
				const safeBrowsingService = await globalThis.safeBrowsing();
				safeBrowsingService.onPageVisited((pageStatus) => {
					const { tabid, url, status } = pageStatus;
					switch (status) {
						case "SAFE":
							console.log(`Page with URL ${url} is safe.`);
							break;
						case "UNSAFE":
							console.warn(`Page with URL ${url} is unsafe.`);
							// Implement actions for unsafe pages
							break;
						case "UNKNOWN":
							console.log(
								`Status of page with URL ${url} is unknown.`,
							);
							// Implement actions for unknown pages
							break;
						default:
							console.error(
								`Unexpected status for page with URL ${url}: ${status}`,
							);
					}
				});
				resolve(true);
			} else {
				resolve(false);
			}
		});
	});
}
getUserConsent();

async function fetch() {
	return new Promise((resolve, reject) => {
		app.storage.local.get(
			[
				"searchDesktop",
				"searchMobile",
				"searchMin",
				"searchMax",
				"scheduleDesktop",
				"scheduleMobile",
				"scheduleMin",
				"scheduleMax",
				"scheduleDefault",
				"phoneName",
				"phoneUserAgent",
				"phoneWidth",
				"phoneHeight",
				"phoneDevicePixelRatio",
				"runningSearch",
				"userConsent",
			],
			async function (result) {
				searchDesktop = parseInt(result.searchDesktop);
				searchMobile = parseInt(result.searchMobile);
				searchMin = parseInt(result.searchMin) || 10;
				searchMax = parseInt(result.searchMax) || 15;
				scheduleDesktop = parseInt(result.scheduleDesktop);
				scheduleMobile = parseInt(result.scheduleMobile);
				scheduleMin = parseInt(result.scheduleMin) || 12;
				scheduleMax = parseInt(result.scheduleMax) || 15;
				scheduleDefault = result.scheduleDefault || "scheduleT1";
				if (scheduleDefault == "scheduleT1") {
					app.alarms.clear("schedule");
				}
				phoneName = result.phoneName || "Iphone 12 Pro";
				phoneUserAgent =
					result.phoneUserAgent ||
					"Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1";
				phoneWidth = parseInt(result.phoneWidth) || 390;
				phoneHeight = parseInt(result.phoneHeight) || 844;
				phoneDevicePixelRatio =
					parseFloat(result.phoneDevicePixelRatio) || 3;
				runningSearch = result.runningSearch || false;
				userConsent = result.userConsent || false;
				if (searchDesktop == undefined) {
					console.log("Search desktop is undefined and set to 0");
					searchDesktop = 0;
				} else {
					// console.log("Search desktop is " + searchDesktop);
				}
				if (searchMobile == undefined) {
					console.log("Search mobile is undefined and set to 0");
					searchMobile = 0;
				} else {
					// console.log("Search mobile is " + searchMobile);
				}
				if (scheduleDesktop == undefined) {
					console.log("Schedule desktop is undefined and set to 0");
					scheduleDesktop = 0;
				} else {
					// console.log("Schedule desktop is " + scheduleDesktop);
				}
				if (scheduleMobile == undefined) {
					console.log("Schedule mobile is undefined and set to 0");
					scheduleMobile = 0;
				} else {
					// console.log("Schedule mobile is " + scheduleMobile);
				}
				// console.log("Schedule default is " + scheduleDefault);
				resolve();
			},
		);
	});
}

async function search(desk, mob, min, max) {
	app.alarms.clear("schedule");
	console.log(userConsent + " user consent");
	if (desk === 0 && mob === 0 && !userConsent) {
		app.storage.local.set({ runningSearch: false });
		return;
	}

	runningSearch = true;
	app.storage.local.set({ runningSearch: true });
	console.log(
		"Search started at: " +
			new Date() +
			" for " +
			desk +
			" desktop and " +
			mob +
			" mobile searches",
	);

	const blinkInterval = 500;
	const badgeTextOn = "•";
	const badgeTextOff = "";
	const badgeBackgroundColor = [0, 114, 255, 255];
	let blinkTimer;
	let isBlinking = true;
	function toggleBadge() {
		const badgeText = isBlinking ? badgeTextOn : badgeTextOff;
		chrome.action.setBadgeText({ text: badgeText });
		chrome.action.setBadgeBackgroundColor({ color: badgeBackgroundColor });
		isBlinking = !isBlinking;
	}
	if (runningSearch == true) {
		blinkTimer = setInterval(toggleBadge, blinkInterval);
	}

	if (desk >= 1) {
		if (mob >= 1) {
			mob = mob + 2;
		}
		desk = desk + 2;
		const tab = await app.tabs.create({
			url: "https://www.bing.com",
		});
		tabId = parseInt(tab.id);
		await searchDesk(desk, min, max);
		if (mob >= 1 && runningSearch == true) {
			await delay(1000);
			await searchMob(mob, min, max);
		}
	}

	if (mob >= 1 && desk === 0) {
		mob = mob + 2;
		const tab = await app.tabs.create({
			url: "https://www.bing.com",
		});
		tabId = parseInt(tab.id);
		await searchMob(mob, min, max);
	}

	await delay(1000);
	try {
		await app.tabs.remove(parseInt(tabId));
	} catch (error) {
		console.log(error);
	}
	// const amazon = await app.tabs.create({
	// 	url: amazonURL,
	// });
	// setTimeout(async () => {
	// 	await app.tabs.remove(amazon.id);
	// }, 3000);
	const announcement = await app.tabs.create({
		url: "https://www.google.com/",
	});
	app.storage.local.set({ runningSearch: false });
	runningSearch = false;
	clearInterval(blinkTimer);
	chrome.action.setBadgeText({ text: "" });
	if (scheduleDefault == "scheduleT4" || scheduleDefault == "scheduleT3") {
		setTimeout(async () => {
			await app.tabs.remove(announcement.id);
		}, 8000);
		if (scheduleDefault == "scheduleT4") {
			const delay = (Math.random() * (17.5 - 15 + 1) + 15) * 60 * 1000;
			console.log(
				"Delaying for " +
					(delay / 60 / 1000) +
					" minutes for next search session",
			);
			app.alarms.create("schedule", {
				delayInMinutes: delay / 60 / 1000,
			});
		} else if (scheduleDefault == "scheduleT3") {
			const delay = (Math.random() * (6 - 5 + 1) + 5) * 60 * 1000;
			console.log(
				"Delaying for " +
					(delay / 60 / 1000) +
					" minutes for next search session",
			);
			app.alarms.create("schedule", {
				delayInMinutes: delay / 60 / 1000,
			});
		}
	}
}

app.alarms.onAlarm.addListener(async (alarm) => {
	if (alarm.name === "schedule") {
		runningSearch = true;
		await fetch();
		await delay(200);
		search(scheduleDesktop, scheduleMobile, scheduleMin, scheduleMax);
	}
});

async function clearSiteData() {
    const origins = [
        "https://www.bing.com/*",
        // "https://rewards.bing.com/*",
		// "https://login.microsoftonline.com/"
    ];

	// get the domain of the tabId where the search is being performed
	// const tab = await app.tabs.get(tabId);
	// const url = new URL(tab.url);
	// const domain = url.hostname;
	// const origins = [
	// 	`https://${domain}/*`,
	// 	`https://www.${domain}/*`,
	// 	`https://m.${domain}/*`,
	// ];

    const dataToRemove = {
        origins: origins,
        since: 0
    };

    return new Promise((resolve, reject) => {
        chrome.browsingData.remove(dataToRemove, {
            cacheStorage: true,
            cookies: true,
            fileSystems: true,
            indexedDB: true,
            localStorage: true,
            pluginData: true,
            serviceWorkers: true,
            webSQL: true
        }, async () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError.message);
            } else {
                console.log("Site data cleared");
                chrome.tabs.reload(tabId);
				await delay(3000); // Wait for 3 seconds
				resolve();
            }
        });
    });
}



async function searchMob(mob, min, max) {
	console.log("Mobile search started at: " + new Date());
	await debug(tabId);
	await delay(1000);
	await searchDesk(mob, min, max);
	await detach(tabId);
	await delay(1000);
	console.log("Mobile search completed at: " + new Date());
}

async function delay(ms) {
	console.log(`Delaying for ${ms} milliseconds...`);
	const start = Date.now();
	await new Promise((resolve, reject) => {
		if (runningSearch == false) {
			resolve();
		} else {
			setTimeout(() => {
				const end = Date.now();
				console.log(`Delayed for ${end - start} milliseconds.`);
				resolve();
			}, ms);
		}
	});
}

async function searchDesk(desk, min, max) {
	await clearSiteData();
	app.tabs.sendMessage(tabId, { message: "menu" });
	console.log("Desk search started at: " + new Date());
	for (let i = 0; i < desk; i++) {
		const w8 = (Math.random() * (max - min + 1) + min) * 1000;
		if (runningSearch === false) {
			return;
		}
		console.log("search: " + i + " with delay: " + w8);
		if (i === 0) {
			await delay(3000);
		} else {
			await delay(w8);
		}
		await app.tabs
			.sendMessage(tabId, { message: "search" })
			.then(async (response) => {
				if (response) {
					console.log("search: " + i + " completed", response);
				} else {
					await app.tabs.reload(tabId);
					await app.tabs.update(tabId, { active: true });
					console.log("tab reloaded");
					i = i - 1;
				}
			});
		if (i == desk){
			await delay(w8);
		}
	}
}

async function debug(tabId) {
	console.log("Debugger attached at: " + new Date());
	await app.debugger.attach({ tabId: tabId }, "1.2", async function () {
		await app.debugger.sendCommand(
			{ tabId: tabId },
			"Emulation.setDeviceMetricsOverride",
			{
				mobile: true,
				width: phoneWidth,
				height: phoneHeight,
				deviceScaleFactor: phoneDevicePixelRatio,
				fitWindow: true,
			},
			async function () {
				await app.debugger.sendCommand(
					{ tabId: tabId },
					"Network.setUserAgentOverride",
					{
						userAgent: phoneUserAgent,
						deviceScaleFactor: phoneDevicePixelRatio,
					},
					async function () {
						await app.debugger.sendCommand(
							{ tabId: tabId },
							"Emulation.setUserAgentOverride",
							{
								userAgent: phoneUserAgent,
							},
							async function () {
								await app.debugger.sendCommand(
									{ tabId: tabId },
									"Network.setBypassServiceWorker",
									{ bypass: true },
									async function () {
										await app.debugger.sendCommand(
											{ tabId: tabId },
											"Emulation.setTouchEmulationEnabled",
											{
												enabled: true,
											},
											async function () {
												await app.debugger.sendCommand(
													{
														tabId: tabId,
													},
													"Emulation.setEmitTouchEventsForMouse",
													{
														enabled: true,
													},
													async function () {
														await app.debugger
															.sendCommand(
																{
																	tabId: tabId,
																},
																"Page.reload",
															)
															.then(async () => {
																await delay(
																	1000,
																);
															});
													},
												);
											},
										);
									},
								);
							},
						);
					},
				);
			},
		);
	});
}

async function detach(tabId) {
	await app.debugger.sendCommand(
		{ tabId: tabId },
		"Emulation.clearDeviceMetricsOverride",
		async function () {
			await app.debugger.sendCommand(
				{ tabId: tabId },
				"Network.setUserAgentOverride",
				{ userAgent: "" },
				async function () {
					await app.debugger.detach(
						{ tabId: tabId },
						async function () {
							console.log("Debugger detached at: " + new Date());
							app.tabs.reload(tabId);
							await delay(3000);
						},
					);
				},
			);
		},
	);
}
