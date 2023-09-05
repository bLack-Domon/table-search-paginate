// Sample data
var tableData = [
  { name: "John Doe", age: 30, city: "New York" },
  { name: "Jane Smith", age: 25, city: "Los Angeles" },
  { name: "Bob Johnson", age: 40, city: "Chicago" },
  { name: "Alice Brown", age: 35, city: "San Francisco" },
  // Add more data here
];

var tbody = document.getElementById("table-body");
var searchInput = document.getElementById("search");
var paginationContainer = document.getElementById("pagination");
var prevButton = document.getElementById("prev-button");
var nextButton = document.getElementById("next-button");

var currentPage = 1;
var itemsPerPage = 2; // Change this to adjust the number of rows per page

function displayTableData(data, page) {
  tbody.innerHTML = "";
  var startIndex = (page - 1) * itemsPerPage;
  var endIndex = startIndex + itemsPerPage;

  var filteredData = data.filter(function (item) {
    return item.name.toLowerCase().includes(searchInput.value.toLowerCase());
  });

  var paginatedData = filteredData.slice(startIndex, endIndex);

  paginatedData.forEach(function (item) {
    var row = document.createElement("tr");
    row.innerHTML = `
                 <td>${item.name}</td>
                 <td>${item.age}</td>
                 <td>${item.city}</td>
             `;
    tbody.appendChild(row);
  });
}

function setupPagination(data) {
  paginationContainer.innerHTML = "";
  var pageCount = Math.ceil(data.length / itemsPerPage);

  for (var i = 1; i <= pageCount; i++) {
    var li = document.createElement("li");
    li.textContent = i;
    if (i === currentPage) {
      li.classList.add("active");
    }
    li.addEventListener("click", function () {
      currentPage = parseInt(this.textContent);
      displayTableData(data, currentPage);
      setupPagination(data);
    });
    paginationContainer.appendChild(li);
  }
}

function updatePaginationButtons() {
  prevButton.disabled = currentPage === 1;
  nextButton.disabled =
    currentPage === Math.ceil(tableData.length / itemsPerPage);
}

prevButton.addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
    displayTableData(tableData, currentPage);
    setupPagination(tableData);
    updatePaginationButtons();
  }
});

nextButton.addEventListener("click", function () {
  if (currentPage < Math.ceil(tableData.length / itemsPerPage)) {
    currentPage++;
    displayTableData(tableData, currentPage);
    setupPagination(tableData);
    updatePaginationButtons();
  }
});

searchInput.addEventListener("input", function () {
  currentPage = 1;
  displayTableData(tableData, currentPage);
  setupPagination(tableData);
  updatePaginationButtons();
});

displayTableData(tableData, currentPage);
setupPagination(tableData);
updatePaginationButtons();
