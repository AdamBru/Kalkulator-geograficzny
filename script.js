// Zapytanie do API
function szukaj(inputId, outputId, townOutputId) {
	let adres = document.getElementById(inputId).value;
	let url = "https://nominatim.openstreetmap.org/search?format=json&q=" + encodeURIComponent(adres);
	
	let output = document.getElementById(outputId);
	output.parentNode.style.display = "block";

	let townOutput = document.getElementById(townOutputId);

	fetch(url)
		.then(response => response.json())
		.then(data => {
			if (data.length > 0) {
				let miejsce = data[0];
				let lat = miejsce.lat;
				let lon = miejsce.lon;
				let fullName = miejsce.display_name;

				let outputString = `
					<strong>Pełna nazwa:</strong> ${fullName}<br>
					<strong>Szerokość (latitude):</strong> ${lat}<br>
					<strong>Długość (longitude):</strong> ${lon}<br>
				`;

				output.innerHTML = outputString;
				townOutput.innerText = fullName;

			} else {
				output.innerText = "Nie znaleziono.";
			}
		})
		.catch(() => {
			output.innerText = "Błąd.";
		});

		setTimeout(() => {
			showButton()
		}, 500);
}

// Pokazanie przycisku oblicz po otrzymaniu wartości
function showButton() {
	let outputs = document.querySelectorAll(".output");
	let obliczButton = document.getElementById("obliczButton");
	let calculationOutput = document.getElementById("calculationOutput");

	let allFilled = true;

	for (let i = 0; i < outputs.length; i++) {
		let text = outputs[i].innerText.trim();

		if (
			text === "" ||
			text.includes("Nie znaleziono.") ||
			text.includes("Błąd.")
		) {
			allFilled = false;
			break;
		}
	}

	if (allFilled) {
		obliczButton.style.display = "block";
	} else {
		obliczButton.style.display = "none";
		calculationOutput.style.display = "none";
	}
}

// Obliczanie odległości
function obliczOdleglosc() {
	// Wyświetlenie outputu po kliknięciu przycisku obliczOdleglosc
	let calculationOutput = document.getElementById("calculationOutput");
	calculationOutput.style.display = "block";

	let kmOutput = document.getElementById("kmOutput");
	kmOutput.innerText = 'xxx';

}