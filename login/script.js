let employees = [];

// Function to save employees data to localStorage
function saveToLocalStorage() {
  localStorage.setItem('employees', JSON.stringify(employees));
}

// Function to load employees data from localStorage
function loadFromLocalStorage() {
  const storedEmployees = localStorage.getItem('employees');
  if (storedEmployees) {
    employees = JSON.parse(storedEmployees);
    renderEmployees();
  }
}

// Call loadFromLocalStorage when the page loads to load any previously saved data
window.addEventListener('load', loadFromLocalStorage);

function renderEmployees() {
  const employeeBody = document.getElementById('employeeBody');
  employeeBody.innerHTML = '';
  employees.forEach((employee) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${employee.id}</td>
      <td>${employee.firstName}</td>
      <td>${employee.lastName}</td>
      <td>${employee.dob}</td>
      <td>${employee.gender}</td>
      <td>${employee.contactNumber}</td>
      <td>${employee.email}</td>
      <td>${employee.address}</td>
      <td>${employee.hireDate}</td>
      <td>${employee.designation}</td>
      <td>${employee.status}</td>
      <td>${employee.salary}</td>
      <td class="actions">
        <button class="edit-button" onclick="editEmployee(${employee.id})">Edit</button>
        <button class="delete-button" onclick="deleteEmployee(${employee.id})">Delete</button>
      </td>
    `;
    employeeBody.appendChild(row);
  });
}

function displayModal() {
  const modal = document.getElementById('employeeModal');
  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('employeeModal');
  modal.style.display = 'none';
}

function saveEmployee() {
  const mode = document.getElementById('saveEmployee').getAttribute('data-mode');
  let newEmployee;

  if (mode === 'edit') {
    const employeeId = parseInt(document.getElementById('saveEmployee').getAttribute('data-id'));
    const index = employees.findIndex(emp => emp.id === employeeId);
    if (index === -1) return;

    employees[index] = {
      id: employeeId,
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      dob: document.getElementById('dob').value,
      gender: document.getElementById('gender').value,
      contactNumber: document.getElementById('contactNumber').value,
      email: document.getElementById('email').value,
      address: document.getElementById('address').value,
      hireDate: document.getElementById('hireDate').value,
      designation: document.getElementById('designation').value,
      status: document.getElementById('status').value,
      salary: document.getElementById('salary').value
    };

    document.getElementById('saveEmployee').removeAttribute('data-mode');
    document.getElementById('saveEmployee').removeAttribute('data-id');
  } else {
    newEmployee = {
      id: employees.length + 1,
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      dob: document.getElementById('dob').value,
      gender: document.getElementById('gender').value,
      contactNumber: document.getElementById('contactNumber').value,
      email: document.getElementById('email').value,
      address: document.getElementById('address').value,
      hireDate: document.getElementById('hireDate').value,
      designation: document.getElementById('designation').value,
      status: document.getElementById('status').value,
      salary: document.getElementById('salary').value
    };
    employees.push(newEmployee);
  }

  // Save the updated employees data to localStorage
  saveToLocalStorage();

  closeModal();
  renderEmployees();
}

function deleteEmployee(employeeId) {
  employees = employees.filter(emp => emp.id !== employeeId);
  // Save the updated employees data to localStorage
  saveToLocalStorage();
  renderEmployees();
}

document.getElementById('addEmployee').addEventListener('click', displayModal);
document.getElementById('saveEmployee').addEventListener('click', saveEmployee);
document.querySelector('.close').addEventListener('click', closeModal);

function editEmployee(employeeId) {
  const employee = employees.find(emp => emp.id === employeeId);
  if (!employee) return;

  document.getElementById('saveEmployee').setAttribute('data-mode', 'edit');
  document.getElementById('saveEmployee').setAttribute('data-id', employee.id);

  document.getElementById('firstName').value = employee.firstName;
  document.getElementById('lastName').value = employee.lastName;
  document.getElementById('dob').value = employee.dob;
  document.getElementById('gender').value = employee.gender;
  document.getElementById('contactNumber').value = employee.contactNumber;
  document.getElementById('email').value = employee.email;
  document.getElementById('address').value = employee.address;
  document.getElementById('hireDate').value = employee.hireDate;
  document.getElementById('designation').value = employee.designation;
  document.getElementById('status').value = employee.status;
  document.getElementById('salary').value = employee.salary;

  displayModal();
}

// Load employees data from localStorage when the page loads
loadFromLocalStorage();
