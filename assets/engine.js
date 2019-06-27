$(document).ready(function(){
	window.rows = parseInt($("#rows").text());
	window.cols = parseInt($("#cols").text());

	window.path 	= [];
	window.visited 	= [];
	window.nodes 	= [];
	window.cursor 	= {x:0,y:0		}
	window.old 		= {x:0,y:0}
	window.final 	= {x:window.rows,y:window.cols}
	window.hits 	= 0;

	createMesh();
	createDestination();
	cellFunctions();	
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
	$("#cell_"+window.cols+"-"+window.rows).addClass("destination");
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

function getPath(){
	while(1){
		if(isWall()){
			alert("HIT WALL");
			console.log(window.nodes);
			break;
		}

		if(window.cursor.x < window.final.x){
			if(wall().right){
				procesNodes();
				break;
			}else{
				window.cursor.x+=1;
			}
		} 

		if(window.cursor.y < window.final.y){
			if(wall().down){
				procesNodes();
				break;
			}else{
				window.cursor.y+=1;
			}
		}

		if(window.cursor.x == window.final.x && window.cursor.y == window.final.y){
			alert("DONE !");
			break;
		}

		window.path.push([window.cursor.x, window.cursor.y]);
	}

	window.path.forEach(function(x){
		$("#cell_"+x[1]+"-"+x[0]).addClass("player");
	})
	// alert("HIT");
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

function procesNodes(){
	window.nodes.push([window.cursor.x, window.cursor.y]);
	console.log(window.nodes);
}