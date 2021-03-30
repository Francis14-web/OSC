var numprocess;
var mainscreen = document.getElementById('processes');
var tmpid;
var tmpat;
var tmpbt;
var y = [];
var backupOfY = [];
var totalBT = 0;
var chartArray = [];
var completionTime = [];
var finalCT = [];
var tat = [];
var wt = [];
var inputValidator;
var colors = ["yellow","orange","red","pink","violet","blue","lblue","lgreen","green","lime"];

function processes(){
  numprocess = document.getElementById('num-process').value;
  window.location = 'cpuscheduling.php';
}

function back_main(){
  numprocess = 0;
  window.location.href = 'process.php';
}

function getValue(){
  //empty variable array
  y = []; totalBT = 0, backupOfY = [], chartArray = [], completionTime = [], finalCT = [], tat = [], wt = [];
  inputValidator = true;
  //check kung may table na ba sa site, kung meron idedelete niya para mareplace.
  var myElem = document.getElementById('myTable');
  if (myElem != null) {
    document.getElementById("myTable").deleteRow(1);
    document.getElementById("myTable").deleteRow(0);
  }
  //get the value of every textbox then ilalagay sa array
  for (var i = 1; i <= numprocess; i++){
      tmpid = document.getElementById("main-table").rows[i].cells[0].innerHTML;
      tmpat = document.getElementById("main-table").rows[i].cells[1].getElementsByTagName('input')[0].value;
      tmpbt = document.getElementById("main-table").rows[i].cells[2].getElementsByTagName('input')[0].value;
      //insert at the end of the array
      if(tmpid == "" || tmpat == "" || tmpbt == ""){
        inputValidator = false;
        break;
      }
      else{
        y.push([tmpid, parseInt(tmpat), parseInt(tmpbt)]);
        backupOfY.push([tmpid, parseInt(tmpat), parseInt(tmpbt)]);
      }
  }
  //run function para magenerate na yung table.
  if (inputValidator == true){
    generateTable();
  }
  else {
    alert("Please fill all required fields");
  }
}

function generateTable() {
  chartArray = [];
  //code to sort array based on their arrival time
  y.sort(function(a, b) {
  return a[1] - b[1];
  });
  //alert the output para malaman kung maayos ba

  var ctr = 0;
  var i = 0;
  while (ctr != y.length){
    var bt = y[ctr][2];
    var btctr = 0;

    if (i >= y[ctr][1]){
      while(btctr < bt){
        chartArray.push(y[ctr][0]);
        btctr++; i++;
      }
      ctr++;
    } else {
      chartArray.push("");
      i++;
    }
  }
  chartArray.push("");

  //create main table. Yung <table> </table>
  var a = document.createElement("TABLE");
  a.setAttribute("id", "myTable");
  a.setAttribute("align", "center");
  document.body.appendChild(a);
  var b = document.createElement("TR");
  b.setAttribute("id", "ganttProc");

  //loop para maprint yung gantt chart
  var f = document.createElement("TR");
  f.setAttribute("id", "ganttChart");
  document.getElementById("myTable").appendChild(f);
  alert(chartArray);
  var j = 0;
  for (i=0; i < chartArray.length; i++){
    var c_span = 0;
    var g = document.createElement("TD");
    //para sa column span.
    if (chartArray[i] == ""){
      var h = document.createTextNode(chartArray[i]);
      g.appendChild(h);
      document.getElementById("ganttChart").appendChild(g);
    } else {
      var tempContainer = chartArray[i];
      while (chartArray[i] == tempContainer){
        c_span++;
        i++;
      }
      i-=1;
      var h = document.createTextNode(chartArray[i]);
      g.setAttribute("colspan", c_span);
      g.setAttribute("class", colors[j]);
      j++; //increment j para sa next color;
      g.appendChild(h);
      document.getElementById("ganttChart").appendChild(g);
    }
  }

  //loop para madisplay yung time
  var f = document.createElement("TR");
  f.setAttribute("id", "ganttTime");
  document.getElementById("myTable").appendChild(f);
  for (i=0; i < chartArray.length; i++){
    var g = document.createElement("TD");
    var h = document.createTextNode(i);
    g.appendChild(h);
    document.getElementById("ganttTime").appendChild(g);
  }

  //loop para makuha yung completion time
  var getIndex = 0;
  for (j=0; j < y.length; j++){
    for (i=0; i < chartArray.length; i++ )
      if (y[j][0] == chartArray[i]){
        getIndex = i;
      }
      completionTime.push([y[j][0], getIndex + 1]);
  }

  //display sa table yung completion time
  i = 0, j = 0;
  while (i < y.length){
    if (completionTime[i][0] == backupOfY[j][0]){
      document.getElementById("main-table").rows[j+1].cells[3].innerHTML = completionTime[i][1];
      finalCT.push(completionTime[i][1]);
      i++;
      j=0;
    }
    else {
      j++;
    }
  }

  //display tat and store the values inside an array
  for (i = 0; i < backupOfY.length; i++){
    tat.push(document.getElementById("main-table").rows[i+1].cells[3].innerHTML - backupOfY[i][1]);
    document.getElementById("main-table").rows[i+1].cells[4].innerHTML = tat[i];
  }

  for (i = 0; i < backupOfY.length; i++){
    wt.push(tat[i] - backupOfY[i][2]);
    document.getElementById("main-table").rows[i+1].cells[5].innerHTML = wt[i];
  }

  //print average tat
  var tempavetat = 0;
  for (i = 0; i < tat.length; i++){
    tempavetat += tat[i];
  }
  tempavetat= tempavetat / tat.length;
  document.getElementById("ave-tat").innerHTML = "Average Turnaround Time: " + tempavetat.toFixed(2) + "ms";

  //print average wt
  var tempavewt = 0;
  for (i = 0; i < tat.length; i++){
    tempavewt += wt[i];
  }
  tempavewt= tempavewt / tat.length;
  document.getElementById("ave-wt").innerHTML = "Average Waiting Time: " + tempavewt.toFixed(2) + "ms";

}
