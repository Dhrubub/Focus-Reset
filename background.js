let switchCount = 0;
let switchTimestamps = [];
const LIMIT = 2;

const contextSwitchers = [
	['https://www.instagram.com/', true],
	['https://www.facebook.com/', true],
	['messenger.com', false],
	['whatsapp.com', false],
	['tiktok.com', false],
	['snapchat.com', false],
	['https://www.linkedin.com/feed/', true],
	['monkeytype', false],
	['10fastfingers', false],
	['typeracer', false],
	['typing', false],
];

// Function to check and reset session
function checkSession() {
	const now = Date.now();

	// Remove timestamps older than 1 minute
	switchTimestamps = switchTimestamps.filter(
		(timestamp) => now - timestamp <= 60000
	);

	if (switchTimestamps.length > LIMIT) {
		// Open a new page

		chrome.tabs.update({ url: chrome.runtime.getURL('popup.html') });
		// Reset the session
		switchCount = 0;
		switchTimestamps = [];
	}
}

// Function to handle URL changes
function handleUrlChange(tabId, changeInfo, tab) {
	// Check if the URL has changed
	if (changeInfo.url && changeInfo.url.length > 0) {
		// Check if the URL contains any context switcher keywords
		const url = changeInfo.url.toLowerCase();
		// console.log(url);
		const isContextSwitcher = contextSwitchers.some(
			([keyword, exactMatch]) => {
				let match = false;

				if (exactMatch) {
					// Match exactly
					match = url === keyword;
				} else {
					// Use includes for partial match
					match = url.includes(keyword);
				}

				return match;
			}
		);

		// If a context switcher keyword is found, increment the switch count
		if (isContextSwitcher) {
			switchCount++;
			switchTimestamps.push(Date.now());

			// Check if we need to reset the session
			checkSession();
		}
	}
}

// Listener for tab updates (including URL changes)
chrome.tabs.onUpdated.addListener(handleUrlChange);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'openNewTab') {
		chrome.tabs.create({ url: 'chrome://newtab/' }, (tab) => {});
	}
});
