document.addEventListener("DOMContentLoaded", function() {
     function calculatePayrollForRow(row) {
         var variablePay = parseFloat(document.getElementById("variablePay").value);
         var pfPercentage = parseFloat(document.getElementById("pfPercentage").value);
         var BasicPercentage = parseFloat(document.getElementById("BasicPercentage").value);
         var hraPercentage = parseFloat(document.getElementById("hraPercentage").value);
         
         var givenCTC = parseFloat(row.querySelector(".givenctc").value);
         var ta = parseFloat(row.querySelector(".ta").value);
         var da = parseFloat(row.querySelector(".da").value);
         
         var remaining = givenCTC - variablePay;
         var monthlyCTC = remaining / 12;
         var basicSalary = monthlyCTC * (BasicPercentage / 100);
         var pfAmount = (pfPercentage / 100) * basicSalary;
         var hra = (hraPercentage / 100) * basicSalary;
         var netSalary = basicSalary + hra + ta + da;
         
         row.querySelector(".vp").innerText = variablePay.toFixed(2);
         row.querySelector(".hra").innerText = hra.toFixed(2);
         row.querySelector(".mctc").innerText = monthlyCTC.toFixed(2);
         row.querySelector(".bs").innerText = basicSalary.toFixed(2);
         row.querySelector(".pfam").innerText = pfAmount.toFixed(2);
         row.querySelector(".nets").innerText = netSalary.toFixed(2);
     }
     
     function calculatePayroll() {
         var rows = document.querySelectorAll(".payroll-inside table tbody tr");
         rows.forEach(function(row) {
             calculatePayrollForRow(row);
         });
     }
     
     document.querySelectorAll(".givenctc, .ta, .da").forEach(function(element) {
         element.addEventListener("input", function() {
             calculatePayroll();
         });
     });
     
     document.querySelectorAll("#variablePay, #pfPercentage, #BasicPercentage, #hraPercentage").forEach(function(element) {
         element.addEventListener("input", function() {
             calculatePayroll();
         });
     });
     
     document.getElementById("addEmployeeBtn").addEventListener("click", function() {
         var employeeId = document.getElementById("regnum").value.trim();
         var employeeName = document.getElementById("empname").value.trim();
         
         if(employeeId === "" || employeeName === "") {
             alert("Please provide both ID and Name.");
             return;
         }
         
         var lastRow = document.querySelector('.payroll-inside table tbody tr:last-child');
         var newRow = document.createElement("tr");
 
         newRow.innerHTML = '<td>' + employeeId + '</td>' +
                            '<td>' + employeeName + '</td>' +
                            '<td><input type="text" class="givenctc"></td>' +
                            '<td class="vp"></td>' +
                            '<td class="hra"></td>' +
                            '<td><input type="text" class="ta"></td>' +
                            '<td><input type="text" class="da"></td>' +
                            '<td class="mctc"></td>' +
                            '<td class="bs"></td>' +
                            '<td class="pfam"></td>' +
                            '<td class="nets"></td>';
 
         document.querySelector('.payroll-inside table tbody').appendChild(newRow);
 
         calculatePayroll();
     });
     
     calculatePayroll();
 });
 