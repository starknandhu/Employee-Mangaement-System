var GivenCTC = prompt("Enter the CTC given by company");

var VariablePay = prompt("Enter the Variable pay amount");

GivenCTC = GivenCTC - VariablePay;

var monthlyCTC = GivenCTC/12;

//console.log(monthlyCTC);
var BasicPercentage = prompt("Enter the BasicSalary Percentage : ");
var BasicSalary = monthlyCTC*(BasicPercentage/100);

//console.log(BasicSalary);
var pfPercentage = prompt("Enter the PF percentage");
var pf = (pfPercentage/100)* BasicSalary;

//console.log(pf);

var Basic = BasicSalary - pf;

//console.log(Basic);
var hraPercentage = prompt("Enter the HRA percentage");
var Hra = (hraPercentage/100)*Basic;

//console.log(Hra);

var Ta = prompt("Enter the Transport Allowances");

var Da = prompt("Enter the Dearness Allowances");

var NetSalary = Basic + Hra + Ta + Da;

alert(monthlyCTC);
alert(Basic);
alert(pf);
alert(NetSalary);