<!DOCTYPE html>
<meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1.0">
<html>
<head>
  <link rel="stylesheet" href="process.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
  <script src="index.js" type="text/javascript"></script>
  <?php
    session_start();
  ?>
  <div class="container demo">
   <div class="content">
      <div id="large-header" class="large-header">
         <canvas id="demo-canvas"></canvas>
      </div>
   </div>
  </div>
  <section id="processes">
    <div id="arrow">
      <a href="index.php"><button id="back"><i class="fa fa-angle-left" style="margin-right: 15px; font-size: 15px;"></i>Back</button></a>
      <button id="back" style="visibility: hidden;"><i class="fa fa-angle-left" style="margin-right: 15px; font-size: 15px;"></i>Back</button>
    </div>
    <div id="proc">
      <header>
        <h1>
          CPU Scheduling
        </h1>
      </header>
      <form method="POST" onsubmit="processes()">
        <label for="ddown">
          <select id="dropdown" name="ddown" class="dropdown_style" required>
            <option disabled selected value>Select an algorithm</option>
            <option value="fcfs">First come, First served</option>
            <option value="sjf">Shortest Job First (Non-preemptive)</option>
            <option value="npp">Non-preemptive priority</option>
          </select>
        </label></br>
        <label for="num-process">Number of Processes:</label>
        <input id="num-process" type="number" min="1" max="10" placeholder="Enter a number" name="number_of_proc" required><br/>
        <input type="submit" name="submit" value="START" id="process-submit">
        <?php
        if(isset($_POST['submit'])&&isset($_POST['number_of_proc'])) {
           $_SESSION['nump'] = $_POST['number_of_proc'];
           $_SESSION['algorithm'] = $_POST['ddown'];
        }
        ?>
        <?php
        if (isset($_POST['submit']))
        {
        ?>
          <script>
            window.location = "cpuscheduling.php";
          </script>
        <?php
        }
        ?>
        </form>
    </div>
  </section>
  <script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/TweenLite.min.js"></script>
  <script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/EasePack.min.js"></script>
  <script src="mouseeffect.js"></script>
</body>
</html>
