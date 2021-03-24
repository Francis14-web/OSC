var numprocess;
var mainscreen = document.getElementById('processes');
var tmpid;
var tmpat;
var tmpbt;
var y = [];
var totalBT = 0;
var chartArray = [];

function processes(){
  numprocess = document.getElementById('num-process').value;
  window.location = 'cpuscheduling.php';
  alert(numprocess);
}

function back_main(){
  numprocess = 0;
  window.location.href = 'index.php';
}

function getValue(){
  //empty variable array
  y = []; totalBT = 0;
  //get the value of every textbox then ilalagay sa array
  for (var i = 1; i <= numprocess; i++){
      tmpid = document.getElementById("main-table").rows[i].cells[0].innerHTML;
      tmpat = document.getElementById("main-table").rows[i].cells[1].getElementsByTagName('input')[0].value;
      tmpbt = document.getElementById("main-table").rows[i].cells[2].getElementsByTagName('input')[0].value;
      //insert at the end of the array
      y.push([tmpid, parseInt(tmpat), parseInt(tmpbt)]);
  }
  //alert the output para malaman kung maayos ba
  alert(y);
  //run function para magenerate na yung table.
  generateTable();
}

function generateTable() {
  chartArray = [];
  //code to sort array based on their arrival time
  y.sort(function(a, b) {
  return a[1] - b[1];
  });
  //alert the output para malaman kung maayos ba
  alert (y);

  var ctr = 0;
  var i = 0;
  while (ctr != y.length){
    var bt = y[ctr][2];
    var btctr = 0;
    if (y[ctr][1] == i || i > y[ctr][1]){
      while(btctr < bt){
        chartArray.push(y[ctr][0]);
        btctr++;
      }
      ctr++;
    } else {
      chartArray.push("");
    }
    i++;
  }

  alert(chartArray);
  var a = document.createElement("TABLE");
  a.setAttribute("id", "myTable");
  a.setAttribute("align", "center");
  document.body.appendChild(a);
  var b = document.createElement("TR");
  b.setAttribute("id", "ganttProc");

  for (i=0; i < chartArray.length; i++){
    var f = document.createElement("TR");
    f.setAttribute("id", "ganttTime");
    document.getElementById("myTable").appendChild(f);
    var g = document.createElement("TD");
    var h = document.createTextNode(i);
    g.appendChild(h);
    document.getElementById("ganttTime").appendChild(g);
  }

  for (i=0; i < chartArray.length; i++){
    var f = document.createElement("TR");
    f.setAttribute("id", "ganttChart");
    document.getElementById("myTable").appendChild(f);
    var g = document.createElement("TD");
    var h = document.createTextNode(chartArray[i]);
    g.appendChild(h);
    document.getElementById("ganttChart").appendChild(g);
  }
}
