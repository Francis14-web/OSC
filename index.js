var numprocess;
var mainscreen = document.getElementById('processes');
var tmpid, tmpat, tmpbt, tmpprio;
var y = [], backupOfY = [], secondaryBackupOfY = [], chartArray = [], completionTime = [], finalCT = [], tat = [], wt = [], ppContainer=[];
var totalBT = 0;
var inputValidator;
var repeat = false;
var colors = ["yellow","orange","red","pink","violet","blue","lblue","lgreen","green","lime"];
var algoTitle, descTitle;

function load_title(){
  if(algo == "fcfs"){
    algoTitle = "First come, First Served";
    descTitle = "First Come First Serve (FCFS) is an operating system scheduling algorithm that automatically executes queued requests and processes in order of their arrival.  It is the easiest and simplest CPU scheduling algorithm.";
  }
  else if(algo == "sjf"){
    algoTitle = "Shortest Job First";
    descTitle = "Shortest Job First (SJF) is an algorithm in which the process having the smallest execution time is chosen for the next execution. This scheduling method can be preemptive or non-preemptive.  It significantly reduces the average waiting time for other processes awaiting execution. The full form of SJF is Shortest Job First.";
  }
  else if(algo == "npp"){
    algoTitle = "Non-preemptive Priority";
    descTitle = " The Processes are scheduled according to the priority number assigned to them. Once the process gets scheduled, it will run till the completion. Generally, the lower the priority number, the higher is the priority of the process.";
  } else if(algo =="pp"){
    algoTitle = "Preemptive Priority";
    descTitle = "Meaning nito";
  }
  document.getElementById('algo-title').innerHTML = algoTitle;
  document.getElementById('desc-title').innerHTML = descTitle;
}

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
  y = [], backupOfY = [], secondaryBackupOfY = [], chartArray = [], completionTime = [], finalCT = [], tat = [], wt = [];
  inputValidator = true;
  //check kung may table na ba sa site, kung meron idedelete niya para mareplace.
  var myElem = document.getElementById('myTable');
  if (myElem != null) {
    var parentEl = myElem.parentElement;
    parentEl.removeChild(myElem);
  }

  //get the value of every textbox then ilalagay sa array
  for (i = 1; i <= numprocess; i++){
      tmpid = document.getElementById("main-table").rows[i].cells[0].innerHTML;
      tmpat = document.getElementById("main-table").rows[i].cells[1].getElementsByTagName('input')[0].value;
      tmpbt = document.getElementById("main-table").rows[i].cells[2].getElementsByTagName('input')[0].value;
      //insert at the end of the array
      if (algo == "npp" || algo == "pp"){
        tmpprio = document.getElementById("main-table").rows[i].cells[3].getElementsByTagName('input')[0].value;
        if (tmpprio == "" || tmpprio < 0){
          inputValidator = false;
          break;
        }
      }
      if(tmpid == "" || tmpat == "" || tmpbt == "" || tmpid < 0 || tmpat < 0 || tmpbt < 0){
        inputValidator = false;
        break;
      }
      else{
        if (algo == "npp" || algo =="pp"){
          y.push([tmpid, parseInt(tmpat), parseInt(tmpbt), parseInt(tmpprio)]);
          backupOfY.push([tmpid, parseInt(tmpat), parseInt(tmpbt), parseInt(tmpprio)]);
          secondaryBackupOfY.push([tmpid, parseInt(tmpat), parseInt(tmpbt), parseInt(tmpprio)]);
        } else {
          y.push([tmpid, parseInt(tmpat), parseInt(tmpbt)]);
          backupOfY.push([tmpid, parseInt(tmpat), parseInt(tmpbt)]);
          secondaryBackupOfY.push([tmpid, parseInt(tmpat), parseInt(tmpbt)]);
        }
      }
  }
  //run function para magenerate na yung table.
  if (inputValidator == true){
    if (algo == "fcfs")
      generateTableFCFS();
    else if(algo == "sjf")
      generateTableSJF();
    else if(algo == "npp")
      generateTableNPP();
    else if (algo == "pp")
      generateTablePP();
  }
  else {
    alert("Invalid input.");
  }
}

function generateTableFCFS() {
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

function generateTableSJF() {
  chartArray = [];

  var ctr = 0;
  var i = 0;
  while (ctr != secondaryBackupOfY.length){
    //sort arrival time
    secondaryBackupOfY.sort(function(a, b) {
      return a[1] - b[1];
    });
    var bt = 0;
    var btctr = 0;
    if (i == secondaryBackupOfY[ctr][1]){
      for (var compare = 1; compare < secondaryBackupOfY.length; compare++){
        if(i == secondaryBackupOfY[compare][1]){
          //sort bt
          repeat = true;
        }
      }
      if(repeat == true){
        secondaryBackupOfY.sort(function(a, b) {
          return a[2] - b[2];
        });
      }
      bt = secondaryBackupOfY[ctr][2];
      while(btctr < bt){
        chartArray.push(secondaryBackupOfY[ctr][0]);
        btctr++; i++;
      }
      secondaryBackupOfY.shift();
    } else if (i > secondaryBackupOfY[ctr][1]){
      //sort burst time
      secondaryBackupOfY.sort(function(a, b) {
        return a[2] - b[2];
      });
      bt = secondaryBackupOfY[ctr][2];
      while(btctr < bt){
        chartArray.push(secondaryBackupOfY[ctr][0]);
        btctr++; i++;
      }
      secondaryBackupOfY.shift();
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

function generateTableNPP() {
  chartArray = [];

  var ctr = 0;
  var i = 0;
  while (ctr != secondaryBackupOfY.length){
    //sort arrival time
    secondaryBackupOfY.sort(function(a, b) {
      return a[1] - b[1];
    });
    var bt = 0;
    var btctr = 0;
    if (i == secondaryBackupOfY[ctr][1]){
      for (var compare = 1; compare < secondaryBackupOfY.length; compare++){
        if(i == secondaryBackupOfY[compare][1]){
          //sort bt
          repeat = true;
        }
      }
      if(repeat == true){
        secondaryBackupOfY.sort(function(a, b) {
          return a[3] - b[3];
        });
      }
      bt = secondaryBackupOfY[ctr][2];
      while(btctr < bt){
        chartArray.push(secondaryBackupOfY[ctr][0]);
        btctr++; i++;
      }
      secondaryBackupOfY.shift();
    } else if (i > secondaryBackupOfY[ctr][1]){
      //sort burst time
      secondaryBackupOfY.sort(function(a, b) {
        return a[3] - b[3];
      });
      bt = secondaryBackupOfY[ctr][2];
      while(btctr < bt){
        chartArray.push(secondaryBackupOfY[ctr][0]);
        btctr++; i++;
      }
      secondaryBackupOfY.shift();
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
      document.getElementById("main-table").rows[j+1].cells[4].innerHTML = completionTime[i][1];
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
    tat.push(document.getElementById("main-table").rows[i+1].cells[4].innerHTML - backupOfY[i][1]);
    document.getElementById("main-table").rows[i+1].cells[5].innerHTML = tat[i];
  }

  for (i = 0; i < backupOfY.length; i++){
    wt.push(tat[i] - backupOfY[i][2]);
    document.getElementById("main-table").rows[i+1].cells[6].innerHTML = wt[i];
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

function generateTablePP() {
  chartArray = [];
  alert("Preemptive Success");

  var ctr = 0;
  var i = 0;

  while (ctr != secondaryBackupOfY.length){
    //sort arrival time
    secondaryBackupOfY.sort(function(a, b) {
      return a[1] - b[1];
    });
    var stopped = false;
    var bt = 0;
    var btctr = 0;
    if (i == secondaryBackupOfY[ctr][1]){
      for (var compare = 1; compare < secondaryBackupOfY.length; compare++){
        if(i == secondaryBackupOfY[compare][1]){
          //sort bt
          repeat = true;
        }
      }
      if(repeat == true){
        secondaryBackupOfY.sort(function(a, b) {
          return a[3] - b[3];
        });
      }
      bt = secondaryBackupOfY[ctr][2];
      while(btctr < bt){
        if(secondaryBackupOfY[1][3] < secondaryBackupOfY[ctr][3]){
          ppContainer.push(secondaryBackupOfY.shift());
          stopped = true;
          break;
        }
        chartArray.push(secondaryBackupOfY[ctr][0]);
        secondaryBackupOfY[ctr][0]--; btctr++; i++;
      }
      if (stopped == false)
        secondaryBackupOfY.shift();
      alert(ppContainer);
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
      document.getElementById("main-table").rows[j+1].cells[4].innerHTML = completionTime[i][1];
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
    tat.push(document.getElementById("main-table").rows[i+1].cells[4].innerHTML - backupOfY[i][1]);
    document.getElementById("main-table").rows[i+1].cells[5].innerHTML = tat[i];
  }

  for (i = 0; i < backupOfY.length; i++){
    wt.push(tat[i] - backupOfY[i][2]);
    document.getElementById("main-table").rows[i+1].cells[6].innerHTML = wt[i];
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
