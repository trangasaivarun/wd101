// Function to calculate age
function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Function to load saved entries from localStorage
function loadEntries() {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    
    // Check if there are any saved entries
    if (entries.length === 0) {
        console.log("No entries found, starting with an empty table.");
        return; // Do not populate the table if no entries exist
    }

    // If there are saved entries, add them to the table
    entries.forEach(entry => addEntryToTable(entry));
}

// Function to add a row to the table
function addEntryToTable(entry) {
    const table = document.getElementById('entriesTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    // Insert cells in the row
    const nameCell = newRow.insertCell(0);
    const emailCell = newRow.insertCell(1);
    const passwordCell = newRow.insertCell(2);
    const dobCell = newRow.insertCell(3);
    const acceptedTermsCell = newRow.insertCell(4);

    // Set cell values
    nameCell.textContent = entry.name;
    emailCell.textContent = entry.email;
    passwordCell.textContent = entry.password; // Show the actual password
    dobCell.textContent = entry.dob;
    acceptedTermsCell.textContent = entry.acceptedTerms ? 'true' : 'false';
}

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptedTerms = document.getElementById('terms').checked;

    // Validate age between 18 and 55
    const age = calculateAge(dob);
    if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55 years old.");
        return; // Stop form submission
    }

    // Create entry object
    const entry = { name, email, password, dob, acceptedTerms };

    // Save the entry to localStorage
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));

    // Add entry to the table
    addEntryToTable(entry);

    // Clear the form after submission
    document.getElementById('registrationForm').reset();
});

// Load saved entries on page load
window.onload = function() {
    loadEntries();
};
