// ===============================
// SEARCH DESTINATIONS
// ===============================

function searchPlaces() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let cards = document.querySelectorAll(".destination-card");

    cards.forEach(card => {
        let name = card.querySelector("h3").innerText.toLowerCase();

        if (name.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}


// ===============================
// FILTER DESTINATIONS
// ===============================

function filterPlaces(category) {
    let cards = document.querySelectorAll(".destination-card");

    cards.forEach(card => {
        let placeCategory = card.getAttribute("data-category");

        if (category === "all" || placeCategory === category) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}


// ===============================
// RANDOM DESTINATION GENERATOR
// ===============================

function randomDestination() {
    let destinations = [
        "Mysore Palace",
        "Coorg",
        "Jog Falls",
        "Chikmagalur",
        "Hampi",
        "Gokarna",
        "Udupi",
        "Nandi Hills"
    ];

    let randomIndex = Math.floor(Math.random() * destinations.length);

    alert("Your random destination is: " + destinations[randomIndex]);
}


// ===============================
// ADD DESTINATION TO FAVORITES
// ===============================

function addFavorite(name) {
    let favoriteList = document.getElementById("favoriteList");

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.includes(name)) {
        alert(name + " is already in your favorites!");
        return;
    }

    favorites.push(name);

    localStorage.setItem("favorites", JSON.stringify(favorites));

    displayFavorites();

    alert(name + " added to your favorites!");
}


// ===============================
// DISPLAY FAVORITES
// ===============================

function displayFavorites() {
    let favoriteList = document.getElementById("favoriteList");

    if (!favoriteList) return;

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favoriteList.innerHTML = "";

    favorites.forEach(place => {
        let li = document.createElement("li");

        li.innerHTML = `
            ${place}
            <button onclick="removeFavorite('${place}')">❌</button>
        `;

        favoriteList.appendChild(li);
    });
}


// ===============================
// REMOVE FAVORITE
// ===============================

function removeFavorite(name) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites = favorites.filter(place => place !== name);

    localStorage.setItem("favorites", JSON.stringify(favorites));

    displayFavorites();
}


// ===============================
// IMAGE GALLERY MODAL
// ===============================

function openImage(image) {
    let modal = document.getElementById("imageModal");
    let modalImage = document.getElementById("modalImage");

    modal.style.display = "flex";

    modalImage.src = image.src;
    modalImage.alt = image.alt;
}


// ===============================
// CLOSE IMAGE MODAL
// ===============================

function closeImage() {
    document.getElementById("imageModal").style.display = "none";
}


// ===============================
// TRAVEL BUDGET CALCULATOR
// ===============================

function calculateBudget() {
    let destination = document.getElementById("destinationSelect").value;
    let days = parseInt(document.getElementById("days").value);
    let travelStyle = document.getElementById("travelStyle").value;
    let result = document.getElementById("budgetResult");

    if (days <= 0 || isNaN(days)) {
        result.innerHTML = "Please enter a valid number of days.";
        return;
    }

    let baseCost = 0;

    switch (destination) {
        case "Coorg":
            baseCost = 2500;
            break;

        case "Mysore":
            baseCost = 2000;
            break;

        case "Chikmagalur":
            baseCost = 3000;
            break;

        case "Hampi":
            baseCost = 2200;
            break;

        case "Gokarna":
            baseCost = 2800;
            break;

        case "Jog Falls":
            baseCost = 1800;
            break;

        default:
            baseCost = 2000;
    }

    let multiplier = 1;

    if (travelStyle === "budget") {
        multiplier = 0.7;
    } else if (travelStyle === "luxury") {
        multiplier = 1.8;
    }

    let totalBudget = baseCost * days * multiplier;

    result.innerHTML = `
        <h3>Estimated Travel Budget</h3>
        <p>Destination: ${destination}</p>
        <p>Number of Days: ${days}</p>
        <p>Travel Style: ${travelStyle}</p>
        <h2>₹${totalBudget.toFixed(2)}</h2>
    `;
}


// ===============================
// LOAD FAVORITES WHEN PAGE OPENS
// ===============================

window.onload = function () {
    displayFavorites();
};