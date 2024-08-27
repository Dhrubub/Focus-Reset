const newColor = '#1e85ff';

// Function to change color after a delay
function changeColor(element, color, delay) {
	setTimeout(() => {
		element.style.color = color;
	}, delay);
}

// Function to handle the sequence of showing and coloring elements
function showElements() {
	const reset = document.getElementById('reset');
	const restart = document.getElementById('restart');
	const refocus = document.getElementById('refocus');

	// Change color of Reset after 4 seconds
	changeColor(reset, newColor, 4000);

	// Show Restart after Reset turns blue
	setTimeout(() => {
		restart.style.opacity = '1';

		// Change color of Restart after 4 seconds
		changeColor(restart, newColor, 4000);
	}, 4000);

	// Show Refocus after Restart turns blue
	setTimeout(() => {
		refocus.style.opacity = '1';

		// Change color of Refocus after 4 seconds
		changeColor(refocus, newColor, 4000);

		// Close the popup after the final color change
		setTimeout(() => {
			window.close();
			chrome.runtime.sendMessage({ action: 'openNewTab' });
		}, 6000);
	}, 8000);
}

// Start the sequence when the document is ready
document.addEventListener('DOMContentLoaded', showElements);
