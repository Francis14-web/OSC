//OLD CODE


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

for (i=0; i <= totalBT; i++){
  var f = document.createElement("TR");
  f.setAttribute("id", "ganttTime");
  document.getElementById("myTable").appendChild(f);
  var g = document.createElement("TD");
  var h = document.createTextNode(i);
  g.appendChild(h);
  document.getElementById("ganttTime").appendChild(g);
}

for(var i = 0; i <= totalBT; i++){
  document.getElementById("myTable").appendChild(b);
  var ctr = i;
  if (ctr < y[i][1]){
    alert("ctr = "+ ctr +" y =" + y[i][1])
    while (ctr+1 < y[i][1]){
      var c = document.createElement("TD");
      document.getElementById("ganttProc").appendChild(c);
      totalBT++;
      ctr++;
      alert("TotalBT = " + totalBT + " ctr=" + ctr);
    }
    alert("Pasok sa else");
    var spancolumn = 0;
    var c = document.createElement("TD");
    var d = document.createTextNode(y[i][0]);
    c.appendChild(d);
    document.getElementById("ganttProc").appendChild(c);
    while(y[i][2] != 0){
      spancolumn++;
      y[i][2]--;
    }
  c.setAttribute("colspan", spancolumn);
  } else {
    alert("pasok na pasok");

}
}
