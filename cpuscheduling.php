<!DOCTYPE html>
<meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1.0">
<html>
<head>
  <link rel="stylesheet" href="process.css">
  <link rel="stylesheet" href="colors.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
  <script src="index.js" type="text/javascript"></script>
  <?php
  session_start();
  if (isset($_SESSION['superhero'])) {
    $numprocess = $_SESSION['superhero'];
  }
  ?>
  <section id="input-page">
    <div id="nav">
      <button id="back" onclick="back_main()"><i class="fa fa-angle-left" style="margin-right: 15px; font-size: 15px;"></i>Back</button>
      <h1> CPU Scheduling </h1>
      <button id="back" style="visibility: hidden;"><i class="fa fa-angle-left" style="margin-right: 15px; font-size: 15px;"></i>Back</button>
    </div>
    <div id="input-table">
      <table style="width:80%" align="center" id="main-table">
      <tr>
        <th>Process ID</th>
        <th>Arrival Time</th>
        <th>Burst Time</th>
        <th>Completion Time</th>
        <th>Turnaround Time</th>
        <th>Wait Time</th>
      </tr>
      <?php
      for ($i = 0; $i < $numprocess; $i++){
        echo "<tr id=\"table-val\">";
        echo "<td> P".$i +  1 ."</td>";
        echo "<td> <input type=\"number\" placeholder=\"0\" id=\"process-id\" min=\"1\" maxlength=\"3\"> </td>";
        echo "<td> <input type=\"number\" placeholder=\"0\" id=\"process-id\" min=\"0\" maxlength=\"3\"> </td>";
        echo "<td> </td>";
        echo "<td> </td>";
        echo "<td> </td>";
        echo"</tr>";
      }
      ?>
      <script type="text/javascript">
        var numprocess = "<?php echo $numprocess; ?>";
      </script>
      <tr>
        <td colspan="6"><div id="ave"><span id="ave-tat">Average Turnaround Time: Undefined</span> <span id="ave-wt"> Average Waiting Time: Undefined</span></div></td>
      </tr>
    </table>
    <input type="submit" onclick="getValue()" value="GO" id="go-button">
      </script>
    </div>
  </section>
</body>
</html>
