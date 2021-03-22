<!DOCTYPE html>
<meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1.0">
<html>
<head>
  <link rel="stylesheet" href="index.css">
</head>
<body>
  <script src="index.js" type="text/javascript"></script>
  <?php
  session_start();
  ?>
  <section id="processes">
    <div id="proc">
      <header>
        <h1>
          CPU Scheduling
        </h1>
      </header>
      <form method="POST" onsubmit="processes()">
        <label for="num-process">Number of Processes:</label>
        <input id="num-process" type="number" min="1" max="10" placeholder="Enter a number" name="number_of_proc" required><br/>
        <input type="submit" name="submit" id="process-submit">
        <?php
        if(isset($_POST['submit'])&&isset($_POST['number_of_proc'])) {
           $_SESSION['superhero'] = $_POST['number_of_proc'];
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
</body>
</html>
