
//employee class
class Employee{
  constructor(fn, ln, id, title, sal){
    this.fn = fn;
    this.ln = ln;
    this.id = id;
    this.title = title;
    this.sal = sal;
  }
}//end employee class

$(document).ready(onReady);

//array to hold employee objects
let empArray = [];
let monthlyTot = 0;

function addEmployee(){

    if($('#firstIn').val() != '' && $('#lastIn').val() != '' && $('#idIn').val() != '' && $('#titleIn').val() != '' && $('#salaryIn').val() != ''){
      empArray.push(new Employee($('#firstIn').val(), $('#lastIn').val(), $('#idIn').val(), $('#titleIn').val(), $('#salaryIn').val()));
      salaryCalc();
      addTable();
      $('#warningLine').empty();//remove any existing warning
      //empty the fields
      $('#firstIn').val('');
      $('#lastIn').val('');
      $('#idIn').val('');
      $('#titleIn').val('');
      $('#salaryIn').val('');
    }//if values filled end
    else{
      //empty warning line
      $('#warningLine').empty();
      //add a warning if any fields are empty
      $('#warningLine').append('<p>*Please fill in all fields</p>');
    }//end
}//end add Employees

function addTable(){
  let table = $('#tableArea');
  let output = '';
  table.empty();
  output += '<table>';
  output += '<tr>'
  output += '<th>First Name</th>'
  output += '<th>Last Name</th>'
  output += '<th>ID</th>'
  output += '<th>Title</th>'
  output += '<th>Salary</th>'
  output += '</tr>'
  //create a row for each employee in the array
  for (employee of empArray){
    output += '<tr>';
    output += '<td>'+employee.fn+'</td>';
    output += '<td>'+employee.ln+'</td>';
    output += '<td>'+employee.id+'</td>';
    output += '<td>'+employee.title+'</td>';
    output += '<td>'+employee.sal+'<button class="remove btn-warning">Remove</button></td>';
    //output += '<td><button class="remove">Remove</button></td>'
    output += '</tr>';
  }
  output += '</table>'
  table.append(output);
}//end addTable

//on ready function
function onReady(){
  addTable();
  salaryCalc();
  $( '#addEmployeeButton' ).on('click', addEmployee);
  $('#capSelection').on('change', updateTotalColor);

  $('#tableArea').on('click','.remove', removeRow);
}//end onReady

function removeRow(){

    //get the index of the row that the button is in
    const index = parseInt(this.parentNode.parentNode.rowIndex);
    console.log(index);
    //remove this row from the array. need to tr index - 1 since the th counts as row 0
    empArray.splice(index - 1, 1);
    //display table with appended array
    addTable();
    //recalculate the salary line
    salaryCalc();

} //end remove row

function salaryCalc(){
  //set total to 0
  monthlyTot = 0;
  //count the monthly salaries of every employee in the array
  for (employee of empArray){
    monthlyTot += parseInt(employee.sal)/12;
  }
  //empty the salary line
  $('#salaryLine').empty();
  //append the salary total
  $('#salaryLine').append('<h4><span>Total Monthly: $'+monthlyTot.toFixed(2)+'</span></h4>');
  updateTotalColor();
}//end salaryCalc

//function to update the background color of the monthly total
function updateTotalColor(){
  let cap = parseInt($('#capSelection').val());
  if(monthlyTot > cap){
    $('h4 span').css('background-color', 'red');
  }//end make red
  else{
    $('h4 span').css('background', 'transparent');
  }//end make transparent
}//end epdateTotalColor
