// Function to toggle the visibility of the opponent's name field
function toggleOpponentNameField() {
    var gameResult = document.getElementById("game_result").value;
    var opponentNameField = document.getElementById("opponent_name_field");

    if (gameResult === "draw") {
        opponentNameField.style.display = "block";  // Show opponent's name field
    } else {
        opponentNameField.style.display = "none";   // Hide opponent's name field
    }
}

// Attach the function to the dropdown's change event
window.onload = function() {
    document.getElementById("game_result").addEventListener("change", toggleOpponentNameField);
    toggleOpponentNameField();  // To apply the initial state on page load
}