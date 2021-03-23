var numprocess;
var mainscreen = document.getElementById('processes');
var tmpid;
var tmpat;
var tmpbt;
var y = [];
var totalBT = 0;

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
  //code to sort array based on their arrival time
  y.sort(function(a, b) {
  return a[1] - b[1];
  });
  //alert the output para malaman kung maayos ba
  alert (y);

  //calculate totalBT
  for(i=0; i < numprocess; i++)
    totalBT += parseInt(y[i][2]);
  alert (totalBT);

  //create a table
  var a = document.createElement("TABLE");
  a.setAttribute("id", "myTable");
  a.setAttribute("align", "center");
  document.body.appendChild(a);
  var b = document.createElement("TR");
  b.setAttribute("id", "ganttProc");

  for(var i = 0; i <= totalBT; i++){
    var spancolumn = 0;

    document.getElementById("myTable").appendChild(b);
    var c = document.createElement("TD");
    var d = document.createTextNode(y[i][0]);
    c.appendChild(d);
    document.getElementById("ganttProc").appendChild(c);
    while(y[i][2] - 1 != 0){
      var e = document.createElement("TD");
      spancolumn++;
      document.getElementById("ganttProc").appendChild(e);
      y[i][2]--;
  }
  c.setAttribute("colspan", spancolumn+1);
}


}
