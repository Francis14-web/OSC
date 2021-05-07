var numprocess;
var mainscreen = document.getElementById('processes');
var tmpid, tmpat, tmpbt, tmpprio, atContainer;
var y = [],
  backupOfY = [],
  secondaryBackupOfY = [],
  addToNext = [],
  chartArray = [],
  chartArrayTemp = [],
  completionTime = [],
  finalCT = [],
  tat = [],
  wt = [],
  ppContainer = [];
var totalBT = 0;
var inputValidator;
var repeat = false;
var colors = ["yellow", "orange", "red", "pink", "violet", "blue", "lblue", "lgreen", "green", "lime"];
var algoTitle, descTitle;
var colorSetter;

function load_title() {
  if (algo == "fcfs") {
    algoTitle = "First come, First Served";
    descTitle = "First Come First Serve (FCFS) is an operating system scheduling algorithm that automatically executes queued requests and processes in order of their arrival.  It is the easiest and simplest CPU scheduling algorithm.";
  } else if (algo == "sjf") {
    algoTitle = "Shortest Job First";
    descTitle = "Shortest Job First (SJF) is an algorithm in which the process having the smallest execution time is chosen for the next execution. This scheduling method can be preemptive or non-preemptive.  It significantly reduces the average waiting time for other processes awaiting execution. The full form of SJF is Shortest Job First.";
  } else if (algo == "npp") {
    algoTitle = "Non-preemptive Priority";
    descTitle = " The Processes are scheduled according to the priority number assigned to them. Once the process gets scheduled, it will run till the completion. Generally, the lower the priority number, the higher is the priority of the process.";
  }
  document.getElementById('algo-title').innerHTML = algoTitle;
  document.getElementById('desc-title').innerHTML = descTitle;
}

function processes() {
  numprocess = document.getElementById('num-process').value;
  window.location = 'cpuscheduling.php';
}

function back_main() {
  numprocess = 0;
  window.location.href = 'process.php';
}

function getValue() {
  //empty variable array
  y = [], backupOfY = [], secondaryBackupOfY = [], chartArray = [], completionTime = [], finalCT = [], tat = [], wt = [];
  inputValidator = true;
  //check kung may table na ba sa site, kung meron idedelete niya para mareplace.
  var myElem = document.getElementById('myTable');
  if (myElem != null) { //tanggalin kung present sa website yung table output.
    var parentEl = myElem.parentElement;
    parentEl.removeChild(myElem);
  }
  var myElem = document.getElementById('GanttChartTitle');
  if (myElem != null) { //tanggalin kung present sa website yung table output.
    var parentEl = myElem.parentElement;
    parentEl.removeChild(myElem);
  }

  //get the value of every textbox then ilalagay sa array
  for (i = 1; i <= numprocess; i++) {
    tmpid = document.getElementById("main-table").rows[i].cells[0].innerHTML;
    tmpat = document.getElementById("main-table").rows[i].cells[1].getElementsByTagName('input')[0].value;
    tmpbt = document.getElementById("main-table").rows[i].cells[2].getElementsByTagName('input')[0].value;
    //insert at the end of the array
    if (algo == "npp") {
      tmpprio = document.getElementById("main-table").rows[i].cells[3].getElementsByTagName('input')[0].value;
      if (tmpprio == "" || tmpprio < 1 || tmpprio > 10) {
        inputValidator = false;
        break;
      }
    }
    if (tmpat == "" || tmpbt == "" || tmpat < 0 || tmpbt < 1 || tmpat > 30 || tmpbt > 30) {
      inputValidator = false;
      break;
    } else {
      if (algo == "npp") {
        y.push([tmpid, parseInt(tmpat), parseInt(tmpbt), parseInt(tmpprio), colors[i - 1]]);
        backupOfY.push([tmpid, parseInt(tmpat), parseInt(tmpbt), parseInt(tmpprio), colors[i - 1]]);
        secondaryBackupOfY.push([tmpid, parseInt(tmpat), parseInt(tmpbt), parseInt(tmpprio), colors[i - 1]]);
      } else {
        y.push([tmpid, parseInt(tmpat), parseInt(tmpbt)]);
        backupOfY.push([tmpid, parseInt(tmpat), parseInt(tmpbt)]);
        secondaryBackupOfY.push([tmpid, parseInt(tmpat), parseInt(tmpbt)]);
      }
    }
  }
  //run function para magenerate na yung table.
  if (inputValidator == true) {
    if (algo == "fcfs")
      generateTableFCFS();
    else if (algo == "sjf")
      generateTableSJF();
    else if (algo == "npp")
      generateTableNPP();
  } else {
    alert("Invalid input.\n\nPlease take note of the ff:\nArrival time: 0-30\nBurst Time: 1-30\nPriority: 1-10");
  }
}

function resetAll(){
  var confirmReset = confirm("Sure ka ba?");
  if (confirmReset == true){
    var myElem = document.getElementById('myTable');
    if (myElem != null) { //tanggalin kung present sa website yung table output.
      var parentEl = myElem.parentElement;
      parentEl.removeChild(myElem);
    }
    var myElem = document.getElementById('GanttChartTitle');
    if (myElem != null) { //tanggalin kung present sa website yung table output.
      var parentEl = myElem.parentElement;
      parentEl.removeChild(myElem);
    }
    if (algo == "npp"){
      for (i = 1; i <= numprocess; i++) {
        document.getElementById("main-table").rows[i].cells[1].getElementsByTagName('input')[0].value = "";
        document.getElementById("main-table").rows[i].cells[2].getElementsByTagName('input')[0].value = "";
        document.getElementById("main-table").rows[i].cells[3].getElementsByTagName('input')[0].value = "";
        document.getElementById("main-table").rows[i].cells[4].innerHTML = "";
        document.getElementById("main-table").rows[i].cells[5].innerHTML = "";
        document.getElementById("main-table").rows[i].cells[6].innerHTML = "";
      }
    } else {
      for (i = 1; i <= numprocess; i++) {
        document.getElementById("main-table").rows[i].cells[1].getElementsByTagName('input')[0].value = "";
        document.getElementById("main-table").rows[i].cells[2].getElementsByTagName('input')[0].value = "";
        document.getElementById("main-table").rows[i].cells[3].innerHTML = "";
        document.getElementById("main-table").rows[i].cells[4].innerHTML = "";
        document.getElementById("main-table").rows[i].cells[5].innerHTML = "";
      }
    }
    document.getElementById("ave-tat").innerHTML = "Average Turnaround Time: Undefined";
    document.getElementById("ave-wt").innerHTML = "Average Waiting Time: Undefined";
  }
}

function generateTableFCFS() {
  chartArray = [];
  //code to sort array based on their arrival time
  y.sort(function(a, b) {
    return a[1] - b[1];
  });

  var ctr = 0;
  var i = 0;

  //main algorithm
  while (ctr != y.length) {
    var bt = y[ctr][2];
    var btctr = 0;
    atContainer = y[ctr][1] + 1 ;

    if (i >= atContainer) { // Kapag parehas or greater than yung AT at value ni i, papasok sa IF na ito.
      while (btctr < bt) {
        chartArray.push(y[ctr][0]);
        btctr++;
        i++;
      }
      ctr++;
    } else { //Kung di naman parehas or greater than yung value, dito siya papasok para magdagdag ng empty array.
      chartArray.push("");
      i++;
    }
  }
  chartArray.push("");

  //create main table. Yung <table> </table>
  generateTable();
}

function generateTableSJF() {
  chartArray = [];

  var ctr = 0;
  var i = 0;
  while (ctr != secondaryBackupOfY.length) {
    //sort arrival time
    secondaryBackupOfY.sort(function(a, b) {
      return a[1] - b[1];
    });
    var bt = 0;
    var btctr = 0;
    atContainer = secondaryBackupOfY[ctr][1] + 1 ;
    if (i == atContainer) {
      for (var compare = 1; compare < secondaryBackupOfY.length; compare++) {
        if (i == secondaryBackupOfY[compare][1]) {
          //sort bt
          repeat = true;
        }
      }
      if (repeat == true) {
        secondaryBackupOfY.sort(function(a, b) {
          return a[1] - b[1] || a[2] - b[2];
        });
      }
      bt = secondaryBackupOfY[ctr][2];
      while (btctr < bt) {
        chartArray.push(secondaryBackupOfY[ctr][0]);
        btctr++;
        i++;
      }
      secondaryBackupOfY.shift();
    } else if (i > atContainer) {
      //sort burst time
      secondaryBackupOfY.sort(function(a, b) {
        return a[2] - b[2];
      });
      if(secondaryBackupOfY[ctr][1] > i){
        secondaryBackupOfY.sort(function(a, b) {
          return a[1] - b[1];
        });
      }

      bt = secondaryBackupOfY[ctr][2];
      while (btctr < bt) {
        chartArray.push(secondaryBackupOfY[ctr][0]);
        btctr++;
        i++;
      }
      secondaryBackupOfY.shift();
    } else {
      chartArray.push("");
      i++;
    }
  }
  chartArray.push("");

  generateTable();
}

function generateTableNPP() {
  chartArray = [];

  var ctr = 0;
  var i = 0;
  while (ctr != secondaryBackupOfY.length) {
    //sort arrival time
    secondaryBackupOfY.sort(function(a, b) {
      return a[1] - b[1];
    });
    var bt = 0;
    var btctr = 0;
    atContainer = secondaryBackupOfY[ctr][1] + 1;
    if (i == atContainer) {
      var shifter = 0;
      for (var compare = 1; compare < secondaryBackupOfY.length; compare++) {
        if (i == secondaryBackupOfY[compare][1]) {
          //sort bt
          repeat = true;
        }
      }
      if (repeat == true) {
        secondaryBackupOfY.sort(function(a, b) {
          return a[1] - b[1] || a[3] - b[3];
        });
      }
      bt = secondaryBackupOfY[ctr][2];
      while (btctr < bt) {
        chartArray.push(secondaryBackupOfY[ctr][0]);
        btctr++;
        i++;
      }
      secondaryBackupOfY.shift();
    } else if (i > atContainer) {
      //sort burst time
      secondaryBackupOfY.sort(function(a, b) {
        return a[3] - b[3];
      });
      if(secondaryBackupOfY[ctr][1] > i){
        secondaryBackupOfY.sort(function(a, b) {
          return a[1] - b[1];
        });
      }
      bt = secondaryBackupOfY[ctr][2];
      while (btctr < bt) {
        chartArray.push(secondaryBackupOfY[ctr][0]);
        btctr++;
        i++;
      }
      secondaryBackupOfY.shift();
    } else {
      chartArray.push("");
      i++;
    }
  }
  chartArray.push("");

  generateTable();
}

function generateTable(){
  var a = document.createElement("h1");
  a.setAttribute("id", "GanttChartTitle");
  a.setAttribute("align", "center");
  document.body.appendChild(a);
  document.getElementById("GanttChartTitle").innerHTML = "Gantt Chart";

  var a = document.createElement("TABLE");
  a.setAttribute("id", "myTable");
  a.setAttribute("align", "center");
  document.body.appendChild(a);
  var b = document.createElement("TR");
  b.setAttribute("id", "ganttProc");

  //table for gantt chart
  var f = document.createElement("TR");
  f.setAttribute("id", "ganttChart");
  document.getElementById("myTable").appendChild(f);

  //table for time
  var f = document.createElement("TR");
  f.setAttribute("id", "ganttTime");
  document.getElementById("myTable").appendChild(f);

  var j = 0;
  for (i = 0; i < chartArray.length; i++) {
    var c_span = 0;
    var g = document.createElement("TD");
    //para sa column span.
    var tempContainer = chartArray[i];
    var v = document.createElement("TD");
    var w = document.createTextNode(i);
    v.appendChild(w);
    document.getElementById("ganttTime").appendChild(v);
    while (chartArray[i] == tempContainer) {
      c_span++;
      i++;
    }
    i -= 1;
    var h = document.createTextNode(chartArray[i]);
    if (c_span > 2){
      c_span = 3;
      //print ellipsis
      var v = document.createElement("TD");
      var w = document.createTextNode("...");
      v.appendChild(w);
      document.getElementById("ganttTime").appendChild(v);

      //print the last ms
      var v = document.createElement("TD");
      var w = document.createTextNode(i);
      v.appendChild(w);
      document.getElementById("ganttTime").appendChild(v);
    } else if (c_span <= 2 && c_span >1){
      var v = document.createElement("TD");
      var w = document.createTextNode(i);
      v.appendChild(w);
      document.getElementById("ganttTime").appendChild(v);
    }
    g.setAttribute("colspan", c_span);

    if (chartArray[i] != ""){
      g.setAttribute("class", colors[j]);
      j++; //increment j para sa next color;
    }
    g.appendChild(h);
    document.getElementById("ganttChart").appendChild(g);

  }

  //loop para makuha yung completion time
  var getIndex = 0;
  for (j = 0; j < y.length; j++) {
    for (i = 0; i < chartArray.length; i++)
      if (y[j][0] == chartArray[i]) {
        getIndex = i;
      }
    completionTime.push([y[j][0], getIndex]);
  }

  var cellCT = 3;
  var cellTat = 4;
  var cellWT = 5;

  if (algo == "npp"){
    cellCT += 1;
    cellTat += 1;
    cellWT += 1;
  }

  //display sa table yung completion time
  i = 0, j = 0;
  while (i < y.length) {
    if (completionTime[i][0] == backupOfY[j][0]) {
      document.getElementById("main-table").rows[j + 1].cells[cellCT].innerHTML = completionTime[i][1];
      finalCT.push(completionTime[i][1]);
      i++;
      j = 0;
    } else {
      j++;
    }
  }

  //display tat and store the values inside an array
  for (i = 0; i < backupOfY.length; i++) {
    tat.push(document.getElementById("main-table").rows[i + 1].cells[cellCT].innerHTML - backupOfY[i][1]);
    document.getElementById("main-table").rows[i + 1].cells[cellTat].innerHTML = tat[i];
  }

  //display WT and store the values inside an array
  for (i = 0; i < backupOfY.length; i++) {
    wt.push(tat[i] - backupOfY[i][2]);
    document.getElementById("main-table").rows[i + 1].cells[cellWT].innerHTML = wt[i];
  }

  //print average tat
  var tempavetat = 0;
  for (i = 0; i < tat.length; i++) {
    tempavetat += tat[i];
  }
  tempavetat = tempavetat / tat.length;
  document.getElementById("ave-tat").innerHTML = "Average Turnaround Time: " + tempavetat.toFixed(2) + "ms";

  //print average wt
  var tempavewt = 0;
  for (i = 0; i < tat.length; i++) {
    tempavewt += wt[i];
  }
  tempavewt = tempavewt / tat.length;
  document.getElementById("ave-wt").innerHTML = "Average Waiting Time: " + tempavewt.toFixed(2) + "ms";
}
