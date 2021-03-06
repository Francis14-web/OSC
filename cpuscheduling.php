<!DOCTYPE html>
<meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1.0">
<html>
<head>
  <link rel="stylesheet" href="process.css">
  <link rel="stylesheet" href="colors.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body onload="load_title()">

  <?php
  session_start();
  $numprocess = $_SESSION['nump'];
  $algorithm = $_SESSION['algorithm'];
  ?>
  <script type="text/javascript">
    var numprocess = "<?php echo $numprocess; ?>";
    var algo = "<?php echo $algorithm; ?>";
  </script>
  <div class="container demo">
   <div class="content">
      <div id="large-header" class="large-header">
         <canvas id="demo-canvas"></canvas>
      </div>
   </div>
  </div>
  <section id="input-page">
    <div id="nav">
      <button id="back" onclick="back_main()"><i class="fa fa-angle-left" style="margin-right: 15px; font-size: 15px;"></i>Back</button>
      <h1 id="algo-title"> CPU Scheduling </h1>
      <button id="back" style="visibility: hidden;"><i class="fa fa-angle-left" style="margin-right: 15px; font-size: 15px;"></i>Back</button>
    </div>
    <p id="desc-title"> Description </p>
    <div id="input-table">
      <table style="width:80%" align="center" id="main-table">
      <tr>
        <th>Process ID</th>
        <th>Arrival Time</br>(Min: 0 - Max: 30)</th>
        <th>Burst Time</br>(Min: 1 - Max: 30)</th>
        <?php
        if ($algorithm == "npp"){
          echo '<th>Priority</br>(Min: 1 - Max: 10)</th>';
        }
        ?>
        <th>Completion Time</th>
        <th>Turnaround Time</th>
        <th>Wait Time</th>
      </tr>

      <?php
      for ($i = 0; $i < $numprocess; $i++){
        echo '<tr id="table-val">';
        echo '<td> P'.$i +  1 .'</td>';
        echo '<td> <input type="number" placeholder="0" id="process-id" min="1" maxlength="2"> </td>';
        echo '<td> <input type="number" placeholder="0" id="process-id" min="0" maxlength="2"> </td>';
        if ($algorithm == "npp"){
          echo '<td> <input type="number" placeholder="0" id="process-id" min="0" maxlength="2"> </td>';
          $colspan_bottom = 7;
        }
        else{
          $colspan_bottom = 6;
        }
        echo '<td> </td>';
        echo '<td> </td>';
        echo '<td> </td>';
        echo '</tr>';
      }
      ?>
      <tr>
        <?php
          echo '<td colspan="'.$colspan_bottom.'"><div id="ave"><span id="ave-tat">Average Turnaround Time: Undefined</span> <span id="ave-wt"> Average Waiting Time: Undefined</span></div></td>';
        ?>
      </tr>
    </table>
    <div id="buttons">
      <input type="submit" onclick="getValue()" value="GO" id="go-button">
      <input type="submit" onclick="resetAll()" value="RESET" id="reset-button">
    </div>
    </div>
  </section>
  <script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/TweenLite.min.js"></script>
  <script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/EasePack.min.js"></script>
  <script src="mouseeffect.js"></script>
  <script src="index.js" type="text/javascript"></script>
</body>
</html>
