let coord1 = null;
let coord2 = null;

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

				if (inputId == 'input1') {
					coord1 = { lat, lon };
				} else if (inputId == 'input2') {
					coord2 = { lat, lon };
				}

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
			text == "" ||
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

function deg2rad(deg) {
	return deg * (Math.PI / 180);
}
function rad2deg(rad) {
	return rad * (180 / Math.PI);
}

// Obliczanie odległości
function obliczOdleglosc() {
	let calculationOutput = document.getElementById("calculationOutput");
	calculationOutput.style.display = "block";

	let rz = 6371;
	let d1 = coord1.lon;
	let s1 = coord1.lat;
	let d2 = coord2.lon;
	let s2 = coord2.lat;

	let Ra = Math.abs(d1 - d2);
	let Rb = Math.abs(s1 - s2);

	let Rra = deg2rad(Ra);
	let Rrb = deg2rad(Rb);
	let Rrc = Math.acos(Math.cos(Rra) * Math.cos(Rrb));

	let Rc = rad2deg(Rrc)

	let dystans = (Rc / 360) * 2 * Math.PI * rz;


	let kmOutput = document.getElementById("kmOutput");
	kmOutput.innerText = dystans.toFixed(2);
}