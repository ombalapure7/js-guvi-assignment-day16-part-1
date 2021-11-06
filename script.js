/* Global variables */
var users;
var tableBody = document.getElementById("table-body");

/* Get user data from mockapi.io */
async function getUsersData() {
  const data = await fetch(
    "https://614eabf9b4f6d30017b482be.mockapi.io/users",
    {
      method: "GET",
    }
  );

  const userData = await data.json();
  return userData;
}

/* Function to generate table */
async function generateTable() {
  tableBody.innerHTML = "";

  users = await getUsersData();

  for (let i = 0; i < 5; i++) {
    generateRow(users[i]);
  }
}

/* Function to generate table rows */
function generateRow(user) {
  let userRecord = tableBody.insertRow();
  let column1 = userRecord.insertCell(0);
  let column2 = userRecord.insertCell(1);
  let column3 = userRecord.insertCell(2);

  column1.innerHTML = `<p>${user.id}</p>`;
  column2.innerHTML = `<img class="user-dp" src="${user.avatar}" />`;
  column3.innerHTML = `<p>${user.name}</p>`;
}

/* Pagination */
// Display 5 records per page
var pageSize = 5;
// NOTE: There are 30 records coming in from the API
var totalPages = 30 / pageSize;
var currPage = 0;

function navigate(direction) {
  if (direction == "frwd" && currPage < totalPages - 1) {
    currPage++;
    printRow();
  } 
  
  if (direction == "back" && currPage > 0) {
    currPage--;
    printRow();
  }

  if (direction == "random") {
    // Switch to a random page
    currPage = Math.floor(Math.random() * totalPages);
    console.log("Random page no:", currPage);
    printRow();
  }
}

/* Print rows in pagination */
function printRow() {
  tableBody.innerHTML = "";
  for (let i = currPage * pageSize; i < currPage * pageSize + pageSize; i++) {
    generateRow(users[i]);
  }
}

/* Execute function on page load */
window.onload = generateTable();
