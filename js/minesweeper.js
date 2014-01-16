// script file
function test1() {
	alert('hello!');
}

function createButton() {
	var btn=document.createElement("BUTTON");
	document.body.appendChild(btn);
}

function createTable1() {
	var body = document.body,
		tbl = document.createElement('table');
	
	
	body.appendChild(tbl);
}


function createTable(){
    var body = document.body,
        tbl  = document.createElement('table');
    tbl.style.width='50%';
    tbl.style.border = "solid red 1px";	

	var trs = new Array(); 
	var tds = new Array();
	
    for(var i = 0; i < 8; i++) {		
        trs[i] = tbl.insertRow();
        for(var j = 0; j < 8; j++){
				var ij = j*(i+1);
                tds[j] = trs[i].insertCell();
				tds[j].className = "unmarked";
				tds[j].style.border = "1px solid black"
                // td.appendChild(document.createTextNode('\u0020'));
				tds[j].appendChild(document.createTextNode('-'));
						
				
                // if(i==1&&j==1){
                // td.setAttribute('rowSpan','2');
                // }            
        }
    }
    body.appendChild(tbl);
}

function generateGame(rows,cols,nummines) {
	turnnum = 1;
	clicked = 0;
	gameover = 0;
	
	var maxbox=rows*cols;	
	var rnarr = new Array();
	
	// reset everything
	$("td").css("background-color","yellow");
	$("#cheat").html("Cheat");
	$(".foo").html("?");
	$(".foo").removeClass("mine");
	updateText(0);
	
	// create mines
	// please note the first element starts at index 0
	rnarr[0]=Math.floor(Math.random()*maxbox);
	// alert(rnarr[0]);
	$(".foo:eq("+rnarr[0]+")").toggleClass("mine");
	for (var i=1; i<nummines; i++) {			
		do {
			rnarr[i]=Math.floor(Math.random()*(maxbox+1));
		} while (rnarr.indexOf(rnarr[i])==-1); // keep repeating until you create a value in array that doesn't exist yet
		
		// alert(rnarr[i]);
		$(".foo:eq("+rnarr[i]+")").toggleClass("mine");
	}
}


function testMines(rows, cols, boxNum) {	
	var maxbox=rows*cols;
	adjmines = 0;

	// Right
	if ((boxNum%cols+1)<cols) {
		// $(".foo").eq(boxNum+1).html('Rright');
		if ($(".foo").eq(boxNum+1).hasClass("mine")) {
			// alert('Mine to the right.');						
			adjmines++;
		}
	}
									
	// Left
	if ((boxNum%cols)>0) {
		// $(".foo").eq(boxNum-1).html('Rleft');
		if ($(".foo").eq(boxNum-1).hasClass("mine")) {
			adjmines++;
		}
	}
	
	// Top
	if ((boxNum-cols+1)>0) {
		// $(".foo").eq(boxNum-cols).html('Top');
		if ($(".foo").eq(boxNum-cols).hasClass("mine")) {
			adjmines++;
		}
	}
	
	// Top Right
	// test both right and top conditions
	if ((boxNum-cols+1)>0 && (boxNum%cols+1)<cols) {					
		// $(".foo").eq(boxNum-cols+1).html('TopRight');
		if ($(".foo").eq(boxNum-cols+1).hasClass("mine")) {
			adjmines++;
		}
	}
	
	// Top Left
	// test both left and top conditions
	if ((boxNum-cols+1)>0 && (boxNum%cols)>0) {
		// $(".foo").eq(boxNum-cols-1).html('TopLeft');
		if ($(".foo").eq(boxNum-cols-1).hasClass("mine")) {
			adjmines++;
		}
	}
	
	// Bottom
	if ((boxNum+cols)<maxbox) {
		// $(".foo").eq(boxNum+cols).html('Bottom');
		if ($(".foo").eq(boxNum+cols).hasClass("mine")) {
			adjmines++;
		}
	}
	
	// Bottom Left
	if ((boxNum+cols)<maxbox && (boxNum%cols)>0) {
		// $(".foo").eq(boxNum+cols-1).html('BottomLeft');
		if ($(".foo").eq(boxNum+cols-1).hasClass("mine")) {
			adjmines++;
		}
	}
	
	// Bottom Right
	if ((boxNum+cols)<maxbox && (boxNum%cols+1)<cols) {	
		// $(".foo").eq(boxNum+cols+1).html('BottomRight');
		if ($(".foo").eq(boxNum+cols+1).hasClass("mine")) {
			adjmines++;
		}
	}
	
	$(".foo").eq(boxNum).addClass("chosen");
	$(".foo").eq(boxNum).html(adjmines);
	$("p#notes").html("Box number " + boxNum + " has " + adjmines + " mines next to it.");
	

	if (adjmines==0) {
		// note: need to test conditions as well
		// right
		if ((boxNum%cols+1)<cols) {
			testMines(rows, cols, boxNum+1);
		}
		
		// left
		if ((boxNum%cols)>0) {
			testMines(rows, cols, boxNum-1);
		}
		
		
		alert(adjmines);
	} else {
		alert("Ended!");
	}
	
	return 0;
	
	// RECURSIVE FUNCTION ONLY
	// Maybe slow!!!
	/*
	if (adjmines==0) {
		// note: need to test conditions as well
		// right
		if ((boxNum%cols+1)<cols) {
			testMines(rows, cols, boxNum+1);
		}
		
		// left
		if ((boxNum%cols)>0) {
			testMines(rows, cols, boxNum-1);
		}
		
		// top
		if ((boxNum-cols+1)>0) {
			testMines(rows, cols, boxNum-cols);
		}
		
		// top right
		if ((boxNum-cols+1)>0 && (boxNum%cols+1)<cols) {	
			testMines(rows, cols, boxNum-cols+1);
		}
							
		// top left
		if ((boxNum-cols+1)>0 && (boxNum%cols)>0) {
			testMines(rows, cols, boxNum-cols-1);
		}
		
		// bottom
		if ((boxNum+cols)<maxbox) {
			testMines(rows, cols, boxNum+cols);
		}
		
		// bottom Left
		if ((boxNum+cols)<maxbox && (boxNum%cols)>0) {
			testMines(rows, cols, boxNum+cols+1);
		}
		
		// bottom right
		if ((boxNum+cols)<maxbox && (boxNum%cols+1)<cols) {	
			testMines(rows, cols, boxNum+cols-1);
		}
	}
	*/
	
}

function updateText(turnnum) {
	turnnum++;
	$('#turnnum').html('Turn ' + turnnum);
	return turnnum;
}