<!DOCTYPE html>
<html>
    <head>
		<meta charset="UTF-8">
        <title>Edit</title>
        <script type="text/javascript" src="edit.js"></script>
        <link type="text/css" rel="stylesheet" href="edit.css">
    </head>
	<?php 
	if (($_GET['task'])!='nofill')
		{
			$old = json_decode((file_get_contents(dirname(__FILE__)."/json.json")), true);
			date_default_timezone_set('Pacific/Auckland');

			if (isset($_POST['task']))
				{
					if ($_POST['task'] == 'Clear')
						{
							$time = '';
							$events = '';
							$notes = '';
							$remainingtime = '';
							$task = 'clear';
						}
					else
						{
							if	($_POST['time'] == '')
								{
									$task = 'display';
								}
							else
								{
									if ($old['time'] != $_POST['time'])
										{
											$time = preg_replace("/[^0-9]/","",$_POST['time']);
											$remainingtime = (((time(true))+($time*60))*1000);
										}
									else
										{
											$remainingtime = $old['remainingtime'];
										}
									$task = 'countdown';
								}
							$events = $_POST['events'];
							$notes = $_POST['notes'];
							$time = $_POST['time'];
						}
				$new = array ('time' => $time, 'events' => $events,'notes' => $notes , 'remainingtime' => $remainingtime , 'task' => $task);
				file_put_contents((dirname(__FILE__).'/json.json'), json_encode($new, JSON_PRETTY_PRINT));
				}
			$old = json_decode((file_get_contents(dirname(__FILE__)."/json.json")), true);
		}
	?>
	<body>
		<form action="edit.php" method="POST" class="form">
		<div class="block left top border">
		<label class="label" for="time">Time:</label>
      	</div>	
		<div class="block left middle border">
		<label class="label" for="events">Event:</label>
		</div>	
		<div class="block left bottom border">
		<label class="label" for="notes">Notes:</label>
		</div>	
		<div class="block center top border">
		<input type="number" name="time" id="time" value="<?php echo $old['time']?>" max="60"/>
        </div>	
		<div class="block center middle border">
		<input type="text" name="events" id="events" value="<?php echo $old['events']?>"/>
		</div>	
		<div class="block center bottom border">
		<textarea type="textarea" name="notes" id="notes" value=""><?php echo $old['notes']?></textarea>
		</div>	
		<div class="block right top border">
		<select id="preset" onchange="fillpreset(value)">
            <option value="0">PRESET</option>
            <option value="1">Pre Service</option>
            <option value="2">Worship</option>
            <option value="3">MC Bridge</option>
			<option value="4">Meet &amp; Greet</option>
            <option value="5">Message AM</option>
            <option value="6">Message PM</option>
          </select>
		  </div>	
		<div class="">
		<input class="block right topbutton border green" type="submit" name="task" value="Go" />
		</div>	
		<div class="">
		<input class="block right bottombutton border red" type="submit" name="task" value="Clear" />
		</div>
		</form>
	</body>
</html>