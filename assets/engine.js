$(document).ready(function(){
	window.rows = parseInt($("#rows").text());
	window.cols = parseInt($("#cols").text());

	window.path 	= [];
	window.visited 	= [];
	window.nodes 	= [];
	window.cursor 	= {x:0,y:0}
	window.old 		= {x:0,y:0}
	window.final 	= {x:window.cols-1,y:window.rows-1}
	window.hits 	= 0;
	window.reached  = {x:0,y:0}

	window.cursor.x = 2;
	window.cursor.y = 2;

	createMesh();
	createBoundaryWall();
	cellFunctions();	
	createDestination();
});

function createMesh(){
	var rows = window.rows;
	var cols = window.cols;
	var tbody = $("table");
	var html = "";
	for(i = 1; i<=rows; i++){
		html += "<tr>";
		for( j=1; j<=cols; j++){
			html+= "<td class='cell' id='cell_"+j+"-"+i+"'></td>";
		}
		html += "</tr>";
	}
	$("table").html(html);
}

function createDestination(){
	$("#cell_"+(window.cols-1)+"-"+(window.rows-1)).addClass("destination");
	}

function cellFunctions(){
	$('table').on('mousedown',function(){
		window.mouseDown = 1;
	});
	$('table').on('mouseup',function(){
		window.mouseDown = 0;
	});
	
	$('.cell').each(function(){
			$(this).on("mouseover",function(){
				if(window.mouseDown == 1){
					if(!$(this).hasClass("wall")){
						$(this).addClass("wall");
					}	
				}
			});
	});

}

function createBoundaryWall(){
	var x = window.cols;
	var y = window.rows;

	for(var i=1; i<=x; i++){
		$("#cell_"+i+"-"+y).addClass("wall");
		$("#cell_"+i+"-"+1).addClass("wall");
	}

	for(var i=1; i<=x; i++){
		$("#cell_"+x+"-"+i).addClass("wall");
		$("#cell_"+1+"-"+i).addClass("wall");
	}
}

function getPath(){
	// $("#cell_"+window.cursor.x+"-"+window.cursor.y).addClass("mark");
	// while(1){

		if(window.cursor.x < window.final.x){
			if(!wall().right){
				window.cursor.x++;
				// console.log("Adding x");
				$("#cell_"+window.cursor.x+"-"+window.cursor.y).addClass("mark");			
			}
			else{
				console.log("WALL HIT. SKIPPING");
			}
		}else if(window.cursor.x == window.final.x){
			// window.reached.x = 1;
			console.log("X REACHED");
		}

		if(window.cursor.y < window.final.y){
			if(!wall().down){
					window.cursor.y++;
					// console.log("Adding y");
					$("#cell_"+window.cursor.x+"-"+window.cursor.y).addClass("mark");	
			}
			else{
				console.log("WALL HIT. SKIPPING");
			}
		}else if(window.cursor.y == window.final.y){
			// window.reached.y = 1;
			console.log("Y REACHED")
		}

		// reverse when hit 
		if(wall().right && wall().down && (!(window.cursor.x==window.final.x) || !(window.cursor.y == window.final.y)) ){
			while(wall().right){
				if(!wall().up){
					window.cursor.y--;
					$("#cell_"+window.cursor.x+"-"+window.cursor.y).addClass("mark");
				}else{
					alert("I'm DEAD");
					break;
				}
			}
			window.cursor.x++;
			$("#cell_"+window.cursor.x+"-"+window.cursor.y).addClass("mark");	
		}else{
			console.log("NOT CLIMBING");
		}

		if(window.cursor.x == window.final.x && window.cursor.y == window.final.y){
			alert("REACHED");
			return;
		}
	// }
}

function procesNodes(){
	// getPath();
}

function wall(){
	var res = {
		left 	: 0,
		right 	: 0,
		up 		: 0,
		down 	: 0
	}	
	cursor = window.cursor;

	if($("#cell_"+(cursor.x+1)+"-"+(cursor.y)).hasClass("wall"))
		res.right = 1;
	if($("#cell_"+(cursor.x-1)+"-"+(cursor.y)).hasClass("wall"))
		res.left = 1;
	if($("#cell_"+(cursor.x)+"-"+(cursor.y-1)).hasClass("wall"))
		res.up = 1;
	if($("#cell_"+(cursor.x)+"-"+(cursor.y+1)).hasClass("wall"))
		res.down = 1;

	return res;
}

function isWall(){
	if($("#cell_"+(window.cursor.x)+"-"+(window.cursor.y)).hasClass("wall"))
		return true;
	else
		return false;
}

function flow(){
	setInterval(getPath(), 200);
}