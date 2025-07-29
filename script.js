const inputText = document.querySelector(".add-text");
const addBtn = document.querySelector(".addBtn");
const listItems = document.querySelector(".list-items");

function getValue() {
    if (inputText.value === "") {
        alert("You must write something");
    } else {
        // Create elements for the new list item
        let cross = document.createElement("span");
        cross.innerHTML = `<img src="cross.svg" alt="Remove">`;
        let li = document.createElement("li");
        li.innerHTML = inputText.value;

        // Append elements
        listItems.appendChild(li);
        li.appendChild(cross);

        // Attach event listeners
        addListeners(li, cross);

        // Save updated list to localStorage
        saveData();
    }
    inputText.value = ""; // Clear the input field after adding
}

addBtn.addEventListener("click", getValue);

// Save the current list items to localStorage
function saveData() {
    localStorage.setItem("data", listItems.innerHTML);
}

// Show data from localStorage and reattach event listeners
function showData() {
    listItems.innerHTML = localStorage.getItem("data") || "";
    const allItems = listItems.querySelectorAll("li");
    allItems.forEach(li => {
        const cross = li.querySelector("span");
        addListeners(li, cross); // Reattach listeners for each item
    });
}

// Attach event listeners for toggling and deleting list items
function addListeners(li, cross) {
    let isChecked = li.classList.contains("checked"); // Preserve the initial state

    li.addEventListener("click", () => {
        isChecked = !isChecked;
        if (isChecked) {
            li.classList.add("checked");
        } else {
            li.classList.remove("checked");
        }
        saveData();
    });

    cross.addEventListener("click", () => {
        li.style.display = "none"; // Hide the item
        saveData();
    });
}

// Load stored data on page load
showData();
