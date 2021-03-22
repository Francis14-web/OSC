var numprocess = 0;
var mainscreen = document.getElementById('processes');

function processes(){
  numprocess = document.getElementById('num-process').value;
    window.location = 'cpuscheduling.php';
}

function back_main(){
  numprocess = 0;
  window.location.href = 'index.php';
}

function getvalue(){
}
