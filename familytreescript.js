var maxLev = 0;
var maxW = 0;
var $p = [];        // person squares 
var $ua = [];       // up arrows
var $da = [];		// down arrows 
var $ml = [];       //marriage lines
var $dl1 = [];		//descendency line 1
var $dl2 = [];		//descendency line 2
var $dl3 = [];		//descendency line 3
var $ch = [];		//children that appear when down arrow is clicked
var $controlTitles = [];
var $controls = [];
var nextdocNumb = 0;
var bp = getUrlParameters('bp');     // base person for view displayed   default is lowest index in data file
if(bp == 0){
	for(var i in po){if(i!=0){bp = i;break;}}
}
var displayStyle = getUrlParameters('ds');          // display style  vertical, horizontal1 or horizontal2  default is vertical
	if(displayStyle==0){ var boxHeight = 70; var boxWidth =  60; var hspacing = 20; var vspacing = 30;}
	else			   { var boxHeight = 12; var boxWidth = 200; var hspacing = 20; var vspacing = 10;}
var displayLevels = getUrlParameters('dl');    // levels/generations to display  default is 5
displayLevels  = displayLevels == 0 ? 5 : displayLevels ;
var lineOrProg = getUrlParameters('lp');			// whether to show lineage or progeny  default is lineage
var $browserTitle = $('<title>"Family Tree - '+po[bp].fn +" " + po[bp].ln +'"</title>');
loadControls(bp);
if(lineOrProg == 1){loadPersonSquaresDesc(bp);}
else                   {loadPersonSquares(bp);}

$(document).ready(function(){
	nextdocNumb = (Number(document.getElementById('docNumb').innerHTML) + 1) % 10;
	$("html").append($browserTitle);
 	for(var i in $controlTitles){$("body").append($controlTitles[i]);}
	for(var i in $controls){$("body").append($controls[i]);}
	for(var i in $ml){$("body").append($ml[i]);}
	for(var i in $dl1){$("body").append($dl1[i]);}
	for(var i in $dl2){$("body").append($dl2[i]);}
	for(var i in $dl3){$("body").append($dl3[i]);}
	for(var i in $ua){$("body").append($ua[i]);}
	for(var i in $da){$("body").append($da[i]);}
	for(var i in $p){
		$("body").append($p[i]);
//		if(po[i].fa == "" && po[i].mo == ""){document.getElementById("pedbut"+i).disabled=true;}
//		if(hasChild(i)==false){document.getElementById("fambut"+i).disabled=true;}
//		var fileNumber = String("00000"+i).slice(-4);
//		$.ajax({ url:'./dat/profiles/'+fileNumber+'.html', type:'HEAD', async:false, error: function() {document.getElementById("probut"+i).disabled=true;}, success: function() {  }});
//		$.ajax({ url:'./dat/profiles/'+fileNumber+'.html', type:'HEAD', async:false, error: function() {document.getElementById("probut"+i).hide();}, success: function() {  }});
	}
});

 function getUrlParameters(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "0";
    else
        return results[1];
}
function hasChild(b){
	var hasChild = false;
	for(var i in po){
		if (po[i].fa == b || po[i].mo == b){hasChild = true; break;}
	}
	return hasChild;
}
function loadControls(b){
	$controlTitles[0] = $('<div class = "contit">Display Style</div>');
	$controlTitles[0].css("margin-left","30px");
	$controlTitles[0].css("width","100px");
	$controls[0] = $('<select class = "cons" onchange = "changeDisplayStyle(this.value)"></select>');
		if(displayStyle==0){$controls[0].append('<option value = "0" selected>Vertical</option>');}
		else			   {$controls[0].append('<option value = "0">Vertical</option>');}
		if(displayStyle==1){$controls[0].append('<option value = "1" selected>Horizontal</option>');}
		else               {$controls[0].append('<option value = "1">Horizontal</option>');}
	$controls[0].css("margin-left","30px");
	$controls[0].css("width","100px");
	$controlTitles[1] = $('<div class = "contit">Display Levels</div>');
	$controlTitles[1].css("margin-left","160px");
	$controlTitles[1].css("width","100px");
	$controls[1] = $('<select class = "cons" onchange = "changeLevelsDisplayed(this.value)"></select>');
		for(var i = 8; i >=3;i--){
			if(i == displayLevels){$controls[1].append('<option value="'+i+'"selected>'+i+'</option>');}
			else                  {$controls[1].append('<option value="'+i+'">'+i+'</option>');}
		}
	$controls[1].css("margin-left","190px");
	$controls[1].css("width","40px");
	$controlTitles[2] = $('<div class = "contit">Person List</div>');
	$controlTitles[2].css("margin-left","290px");
	$controlTitles[2].css("width","250px");
	$controls[2] = $('<select class = "cons" onchange = "pedigreeButtonClicked(this.value)">></select>');
	var x = [];
	var k=0;
	for(var i in po){
		if(i != 0){
			x[k] = [po[i].ln+', '+po[i].fn+' -- '+po[i].yb.substring(0,4),i];
			k++;
		}
	}
	x.sort();
	for(var i in x){
		if(x[i][1] == b){$controls[2].append('<option value="'+x[i][1]+'" selected>'+x[i][0]+'</option>');}
		else            {$controls[2].append('<option value="'+x[i][1]+'">'+x[i][0]+'</option>');}
	}
	$controls[2].css("margin-left","290px");
	$controls[2].css("width","250px");
	$controlTitles[3] = $('<div class = "contit">References</div>');
	$controlTitles[3].css("margin-left","570px");
	$controlTitles[3].css("width","350px");
	$controls[3] = $('<select class = "cons" onchange = "referenceSelected(this.value)"></select>');
		$controls[3].append('<option value="dummy" >References</option>');
		$controls[3].append('<option value="hisg" >The History of Guilford, Connecticut - From Its First Settlement In 1639</option>');
		$controls[3].append('<option value="wchit" >William Chittenden of Guilford Connecticut, and His Descendants</option>');
	$controls[3].css("margin-left","570px");
	$controls[3].css("width","350px");
} 
 function loadPersonSquares(b){
	var x = [];
	var x1 = [];
	var x2 = [];
	x.push(b);
	x1.push(b);
	for(var y = 1; y<=displayLevels-1; y++){
		for(var z in x1){
			if(po[x1[z]].fa!=""){ x.push(po[x1[z]].fa); x2.push(po[x1[z]].fa); }
			else { x.push(0); x2.push(0); }
			if(po[x1[z]].mo!=""){ x.push(po[x1[z]].mo); x2.push(po[x1[z]].mo); }	
			else { x.push(0); x2.push(0); }
		}
		x1 = [];
		x1 = x2.slice(0);
		x2 = [];
	}
	for (var i in x){
		if(x[i]!=0){maxLev = Number(i);}
	}
	maxLev = Math.floor(Math.log(maxLev)/Math.log(2)) < 0 ? 0 :  Math.floor(Math.log(maxLev)/Math.log(2));
	maxW = displayStyle == 0 ? (Math.pow(2,maxLev)*(boxWidth + hspacing))+hspacing : (Math.pow(2,maxLev)*(boxHeight +vspacing))+vspacing;
	for(var i in x) {
		if(x[i] != 0){
			createPersonSquares(x[i]);
			var thisLevel = Math.floor(Math.log(Number(i)+1)/Math.log(2));
			po[x[i]].level = thisLevel;
			if(displayStyle == 0){
				if(x[i] == b){
					$p[x[i]].css("margin-left",(maxW / 2 - boxWidth / 2) +"px");
					po[x[i]].left = (maxW / 2 - boxWidth / 2);
					po[x[i]].pos = 0;
				}
				else {
					var ss = (maxW - (Math.pow(2,thisLevel-1)*(2*boxWidth+hspacing)))/(Math.pow(2,thisLevel-1)+1);
					var pos = (Number(i) + 1) - Math.pow(2,thisLevel);
					po[x[i]].pos = pos;
					var leftMargin = ((Math.floor(pos / 2 )+1 ) * ss) + (pos * boxWidth) + (( Math.floor(pos / 2 )+(pos%2))*hspacing);
					$p[x[i]].css("margin-left",leftMargin+"px");
					po[x[i]].left = leftMargin;
				}
				$p[x[i]].css("margin-top",((maxLev-thisLevel)*(boxHeight+vspacing))+100+"px");
				po[x[i]].top = ((maxLev-thisLevel)*(boxHeight+vspacing))+100;
			}
			else{
				if(x[i] == b){
					$p[x[i]].css("margin-top",(maxW / 2 - boxHeight / 2)+ 50  +"px");
					po[x[i]].top = (maxW / 2 - boxHeight / 2) + 50 ;
					po[x[i]].pos = 0;
				}
				else {
					var ss = (maxW - (Math.pow(2,thisLevel-1)*(2*boxHeight+vspacing)))/(Math.pow(2,thisLevel-1)+1);
					var pos = (Number(i) + 1) - Math.pow(2,thisLevel);
					po[x[i]].pos = pos;
					var topMargin = ((Math.floor(pos / 2 )+1 ) * ss) + (pos * boxHeight) + (( Math.floor(pos / 2 )+(pos%2))*vspacing) + 50;
					$p[x[i]].css("margin-top",topMargin+"px");
					po[x[i]].top = topMargin;
				}
				$p[x[i]].css("margin-left",((maxLev-po[x[i]].level)*(boxWidth+hspacing))+30+"px");
				po[x[i]].left = ((maxLev-po[x[i]].level)*(boxWidth+hspacing))+30;
			}
		}
	}
	if(displayStyle == 0){loadControlArrowsVertical(b); loadConnectingLinesVertical(b);}
	else               	 {loadControlArrowsHorizontal(b);  loadConnectingLinesHorizontal(b);}
 }
 function createPersonSquares(b){
 			$p[b]= $('<div id="ps'+b+'" onmouseover="showpu0('+b+')" onmouseout="hidepu0('+b+')"></div>');
			$p[b].css("position","absolute");
			$p[b].css("height",boxHeight+"px");
			$p[b].css("width",boxWidth+"px");
			if(po[b].gender==0){
				$p[b].css("border","1px solid blue");
				$p[b].css("background-color","rgb(210,210,255)");
			}
			else {
				$p[b].css("border","1px solid red");
				$p[b].css("background-color","rgb(255,210,210)");
			}
			$p[b].css("border-radius", "5px");
			$p[b].append('<div class="pu0"></div>');
			$p[b].children(".pu0").append('<p class="pu1">'+po[b].fn+" "+po[b].ln+'</p>');
			$p[b].children(".pu0").append('<p class="pu2">Born: '+formatDate(po[b].yb)+'</p>');
			$p[b].children(".pu0").append('<p class="pu3">'+formatPlaces(po[b].pb)+'</p>');
			$p[b].children(".pu0").append('<p class="pu2">Died: '+formatDate(po[b].yd)+'</p>');
			$p[b].children(".pu0").append('<p class="pu3">'+formatPlaces(po[b].pd)+'</p>');


			var fileNumber = String("00000"+b).slice(-4);
			$.ajax({ url:'./dat/profiles/'+fileNumber+'.html', type:'HEAD', async:false, error: function() {}, success: function() { $p[b].children(".pu0").append('<button id = "probut'+b+'", class="but1", onclick="profileButtonClicked(Number(this.id.substring(6)))">Profile</button>'); }});


			
			
			if(po[b].fa != "" || po[b].mo != ""){
				$p[b].children(".pu0").append('<button id = "pedbut'+b+'", class="but2", onclick="pedigreeButtonClicked(Number(this.id.substring(6)))">Lineage</button>');
			}
			if(hasChild(b)==true){
				$p[b].children(".pu0").append('<button id = "fambut'+b+'", class="but3", onclick="familyButtonClicked(Number(this.id.substring(6)))">Progeny</button>');
			}
			if(displayStyle == 0){
				$p[b].append('<p class="ps1" >'+po[b].fn+'</p>');
				$p[b].append('<p class="ps2">'+po[b].ln+'</p>');
				$p[b].append('<p class="ps1" >'+po[b].yb.substring(0,4)+' - '+po[b].yd.substring(0,4) + '</p>');
				//$p[b].append('<p class="ps2" >'+b+ '</p>');
			}
			else{
				$p[b].append('<p class="ps2">'+po[b].fn+' '+po[b].ln+'  '+po[b].yb.substring(0,4) +' - '+po[b].yd.substring(0,4) +'</p>');
			}
 }
 function showpu0(b){
 	if(po[b].left + $p[b].children(".pu0").width() >= window.innerWidth + $(document).scrollLeft() - 25){$p[b].children(".pu0").css("margin-left", window.innerWidth + $(document).scrollLeft() - po[b].left - $p[b].children(".pu0").width()  - 25 + "px");}
	else{
		var x = po[b].left < $(document).scrollLeft() ? $(document).scrollLeft() - po[b].left-15 : 0;
		$p[b].children(".pu0").css("margin-left",x);}
	if(po[b].top + $p[b].children(".pu0").height() >= window.innerHeight + $(document).scrollTop() - 25 ){$p[b].children(".pu0").css("margin-top", window.innerHeight + $(document).scrollTop() - po[b].top - $p[b].children(".pu0").height() - 25 + "px");}
	else{
		var x = po[b].top < $(document).scrollTop() ? $(document).scrollTop() - po[b].top - 15 : 0;
		$p[b].children(".pu0").css("margin-top",x);
	}
	$p[b].children(".pu0").show();
}
function hidepu0(b){
$p[b].children(".pu0").hide();
}
 function loadControlArrowsVertical(b){
 	for (var i in $p){
		if(po[i].level == maxLev && (po[i].fa != "" || po[i].mo !="")){
			$ua[i]= $('<div id = "ua'+i+'" class = "triangleup", onclick="upArrowClicked(Number(this.id.substring(2)))"></div>');
			$ua[i].css("margin-left",po[i].left + boxWidth/2 -5+'px');
			$ua[i].css("margin-top",po[i].top-9 + 'px');
		}
		if(i == b ){
			if(hasChild(i)){
				$da[i]= $('<div id = "da'+i+'" class = "triangledown", onclick="downArrowClicked(Number(this.id.substring(2)))"></div>');
				$da[i].css("margin-left",po[i].left + boxWidth/2 -4+'px');
				$da[i].css("margin-top",po[i].top + boxHeight + 2 +"px");
			}
		}
	}
 } function loadControlArrowsHorizontal(b){
 	for (var i in $p){
		if(po[i].level == maxLev && (po[i].fa != "" || po[i].mo !="")){
			$ua[i]= $('<div id = "ua'+i+'" class = "triangleleft", onclick="upArrowClicked(Number(this.id.substring(2)))"></div>');
			$ua[i].css("margin-left", po[i].left - 7 + 'px');
			$ua[i].css("margin-top",po[i].top + 3 + 'px');
		}
		if(i == b ){
			if(hasChild(i)){
				$da[i]= $('<div id = "da'+i+'" class = "triangleright", onclick="downArrowClicked(Number(this.id.substring(2)))"></div>');
				$da[i].css("margin-left",po[i].left + boxWidth + 2 + 'px');
				$da[i].css("margin-top",po[i].top + 3 + "px");
			}
		}
	}
 }
 function loadConnectingLinesVertical(b){
	for(var i in $p) {
		if(po[i].sp != undefined && i != b ){
			$ml[i]= $('<div></div>');
			$ml[i].css("position","absolute");
			$ml[i].css("height","0px");
			$ml[i].css("width",hspacing/2-2+"px");
			if(po[i].gender == 0){
				$ml[i].css("border","1px solid blue");
				$ml[i].css("margin-left",(po[i].left+boxWidth+2)+"px");
				$ml[i].css("margin-top",(po[i].top+boxHeight/2)+"px");
			}
			else{
				$ml[i].css("border","1px solid red");
				$ml[i].css("margin-left",(po[i].left-hspacing/2)+"px");
				$ml[i].css("margin-top",(po[i].top+boxHeight/2)+"px");
			}
		}
	}
	for (var i in $p){
		if((po[i].fa != "" || po[i].mo != "") && po[i].level != maxLev){
			$dl1[i]= $('<div></div>');
			$dl1[i].css("position","absolute");
			$dl1[i].css("height",(boxHeight / 2 + vspacing / 2)+"px");
			$dl1[i].css("width","0px");
			$dl1[i].css("border","1px solid black");
			var margleft = 0;
			if(po[i].fa != ""){margleft = po[po[i].fa].left + boxWidth + hspacing / 2;}
			else{ margleft = po[po[i].mo].left - hspacing / 2;}
			$dl1[i].css("margin-left",margleft+"px");
			$dl1[i].css("margin-top",(po[i].top - boxHeight / 2 - vspacing)+"px");		

			$dl2[i]= $('<div></div>');
			$dl2[i].css("position","absolute");
			$dl2[i].css("height",( vspacing / 2)-2+"px");
			$dl2[i].css("width","0px");
			$dl2[i].css("border","1px solid black");
			$dl2[i].css("margin-left",(po[i].left + boxWidth / 2) + "px");
			$dl2[i].css("margin-top",(po[i].top - vspacing / 2) + "px");
			
			$dl3[i]= $('<div></div>');
			$dl3[i].css("position","absolute");
			$dl3[i].css("height","0px");
			$dl3[i].css("width",Math.abs((po[i].left + boxWidth / 2) - margleft) + "px");
			$dl3[i].css("border","1px solid black");
			$dl3[i].css("margin-left",Math.min((po[i].left + boxWidth / 2) , margleft) + "px");
			$dl3[i].css("margin-top",(po[i].top - vspacing / 2) + "px");
		}
	}
 }
 function loadConnectingLinesHorizontal(b){
	for(var i in $p) {
		if(po[i].sp != undefined && i != b ){
			$ml[i]= $('<div></div>');
			$ml[i].css("position","absolute");
			$ml[i].css("width","0px");
			$ml[i].css("height",vspacing/2 +"px");
			$ml[i].css("margin-left",(po[i].left+boxWidth)+"px");
			if(po[i].gender == 0){
				$ml[i].css("border","1px solid blue");
				$ml[i].css("margin-top",(po[i].top+vspacing+1)+"px");
			}
			else{
				$ml[i].css("border","1px solid red");
				$ml[i].css("margin-top",(po[i].top-vspacing/2+1)+"px");
			}
		}
	}
	for (var i in $p){
		if((po[i].fa != "" || po[i].mo != "") && po[i].level != maxLev){
			$dl1[i]= $('<div></div>');
			$dl1[i].css("position","absolute");
			$dl1[i].css("width",hspacing / 2+"px");
			$dl1[i].css("height","0px");
			$dl1[i].css("border","1px solid black");
			var margtop = 0;
			if(po[i].fa != ""){margtop = po[po[i].fa].top + boxHeight + vspacing / 2 ;}
			else{ margtop = po[po[i].mo].top - vspacing / 2;}
			$dl1[i].css("margin-top", margtop + "px");
			$dl1[i].css("margin-left",po[i].left - hspacing + "px");
			
			$dl2[i]= $('<div></div>');
			$dl2[i].css("position","absolute");
			$dl2[i].css("width",( hspacing / 2) +"px");
			$dl2[i].css("height","0px");
			$dl2[i].css("border","1px solid black");
			$dl2[i].css("margin-top",(po[i].top + boxHeight / 2) + "px");
			$dl2[i].css("margin-left",(po[i].left - hspacing / 2) + "px");
			
			$dl3[i]= $('<div></div>');
			$dl3[i].css("position","absolute");
			$dl3[i].css("width","0px");
			$dl3[i].css("height",Math.abs((po[i].top + boxHeight / 2) - margtop) + "px");
			$dl3[i].css("border","1px solid black");
			$dl3[i].css("margin-top",Math.min((po[i].top + boxHeight / 2) , margtop) + "px");
			$dl3[i].css("margin-left",(po[i].left - hspacing / 2) + "px");
		}
	}
 }
 function upArrowClicked(id){
 	var x = 0;
 	if(po[id].pos < Math.pow(2,po[id].level-1)){x=0;}else{x=1;}
 	for(var i in po){
 		if (po[i].level == 1 && po[i].pos == x){
			window.location.assign("familytree"+nextdocNumb+".html?bp=" + i+"&dl="+displayLevels+"&ds="+displayStyle);
 			//window.location.assign("file:///C:/Users/John/Documents/html%20programs/Family%20Tree%201/index.html?bp=27&dl=5&ds=0");
			//window.open("index.html?bp=" + i+"&dl="+displayLevels+"&ds="+displayStyle, "replace");
			break;
 		}
 	}
  }
 function downArrowClicked(id){
 	var k = 0;
	var fp=[];
	for(var i in po){
		if(po[i].fa == id || po[i].mo == id){
			fp[k]= [po[i].yb,i];
			k++;
		}
	}
	fp.sort();
 	for ( var i in fp){
 		$ch[i] = $('<div id = "ch'+fp[i].slice(1,2)+'", class = "fammem" ></div>');
		$ch[i].css("position","absolute");
		$ch[i].css("height",boxHeight+"px");
		$ch[i].css("width",boxWidth+"px");
		$ch[i].css("border-radius","5px");
		if(po[fp[i].slice(1,2)].gender==0){
			$ch[i].css("border","1px solid blue");
			$ch[i].css("background-color","rgb(210,210,255)");
		}
		else {
			$ch[i].css("border","1px solid red");
			$ch[i].css("background-color","rgb(255,210,210)");
		}
		if(displayStyle == 0){
			$ch[i].css("margin-left",po[id].left+i*(boxWidth+hspacing)+"px");
			$ch[i].css("margin-top",po[id].top+boxHeight+vspacing+"px");
			$ch[i].append('<p class="ps1" >'+po[fp[i].slice(1,2)].fn+'</p>');
			$ch[i].append('<p class="ps2" >'+po[fp[i].slice(1,2)].ln+'</p>');
			$ch[i].append('<p class="ps1" >'+po[fp[i].slice(1,2)].yb.substring(0,4)+' - '+po[fp[i].slice(1,2)].yd.substring(0,4) + '</p>');
		}
		else{
			$ch[i].css("margin-left",po[id].left+boxWidth+hspacing+"px");
			$ch[i].css("margin-top",po[id].top+i*(boxHeight+vspacing)+"px");
			$ch[i].append('<p class="ps2" >'+po[fp[i].slice(1,2)].fn+' '+po[fp[i].slice(1,2)].ln+'  '+po[fp[i].slice(1,2)].yb.substring(0,4)+' - '+po[fp[i].slice(1,2)].yd.substring(0,4) + '</p>');
		}
			
	}
	for(var i in $ch){$("body").append($ch[i]);}
	$(".fammem").mousedown(function(){
		//window.location ="index.html?bp="+Number(this.id.substring(2))+"&dl="+displayLevels+"&ds="+displayStyle;
					location.assign("familytree"+nextdocNumb+".html?bp="+Number(this.id.substring(2))+"&dl="+displayLevels+"&ds="+displayStyle);

	});
}	
 function profileButtonClicked(id){
	var fileNumber = String("00000"+id).slice(-4);
	window.location.assign('./dat/profiles/'+fileNumber+'.html?nd='+nextdocNumb+'&dl='+displayLevels+'&ds='+displayStyle);
 } 
 function pedigreeButtonClicked(id){
	window.location.assign("familytree"+nextdocNumb+".html?bp="+id+"&dl="+displayLevels+"&ds="+displayStyle+"&lp="+0);
 } 
function formatDate(ddata){
	var m_names = new Array("Jan.","Feb.","Mar.","Apr.","May","Jun.","Jul.","Aug","Sep.","Oct.","Nov.","Dec.")
	var formatted_date = ddata.substring(0,4);
	if(Number(ddata.substring(4,6))-1>=0 && Number(ddata.substring(4,6))-1 <=11){
		formatted_date = m_names[Number(ddata.substring(4,6))-1] + " "+ formatted_date;
	}
	if(Number(ddata.substring(6,8))>=1 && Number(ddata.substring(6,8)) <=31){
		formatted_date = ddata.substring(6,8) + " "+ formatted_date;
	}
	return formatted_date;
}
function formatPlaces(ind){
		if (pl[ind]  != undefined){
		var formatted_place = pl[ind].p1;
		var a = formatted_place.length > 0 && pl[ind].p2.length > 0 ? pl[ind].p2 + ", " : pl[ind].p2 ;
		formatted_place = a + formatted_place; 
		a = formatted_place.length > 0 && pl[ind].p3.length >0 ? pl[ind].p3 + ", " : pl[ind].p3 ;
		formatted_place = a + formatted_place; 
		a = formatted_place.length > 0 && pl[ind].p4.length >0 ? pl[ind].p4 + ", " : pl[ind].p4 ;
		formatted_place = a + formatted_place;
		return formatted_place;
	}
	else {
		return "";
	}
}
function changeDisplayStyle(inx){
	window.location.assign("familytree"+(nextdocNumb-1)+".html?bp="+bp+"&dl="+displayLevels+"&ds="+inx+"&lp="+lineOrProg);
}
function changeLevelsDisplayed(inx){
	window.location.assign("familytree"+(nextdocNumb-1)+".html?bp="+bp+"&dl="+inx+"&ds="+displayStyle+"&lp="+lineOrProg);
}
function referenceSelected(refid){
	switch (refid){
		case "wchit":
			window.open("./dat/references/William Chittenden of Guilford, Connecticut and His Descendants.pdf");
			break;
		case "hisg":
			window.open("./dat/references/The History of Guilford, Connecticut - From Its First Settlement In 1639.pdf");
			break;
	}
}
function familyButtonClicked(id){
	window.location.assign("familytree"+(nextdocNumb)+".html?bp="+id+"&dl="+displayLevels+"&ds="+displayStyle+"&lp="+1);
}
function loadPersonSquaresDesc(b){
	var counter = 0;
	var tp = 0;
	var x = [];
	var x1 = [];
	var x2 = [];
	x.push('00a00a0000a000000a000000a'+b);
	x1.push('00a00a0000a000000a000000a'+b);
	for(var y = 1; y<=displayLevels-1; y++){
		for(var z in x1){
			var minsp = 0;
			for(var w in po){
				if(x1[z].substring(24,25)!= 'd' && (po[w].fa== x1[z].substring(25) || po[w].mo == x1[z].substring(25))){
					x.push(String('00'+y).slice(-2)+'a'+String('00'+z).slice(-2)+'a'+String('0000'+po[w].yb.substring(0,4)).slice(-4)+'a'+String('000000'+x1[z].substring(25)).slice(-6)+'a000000a'+w);
					x2.push(String('00'+y).slice(-2)+'a'+String('00'+z).slice(-2)+'a'+String('0000'+po[w].yb.substring(0,4)).slice(-4)+'a'+String('000000'+x1[z].substring(25)).slice(-6)+'a000000a'+w);
					minsp++;
				}
			}
			if(minsp == 0){
				 x.push(String('00'+y).slice(-2)+'a'+String('00'+z).slice(-2)+'a0000a'+String('000000'+x1[z].substring(25)).slice(-6)+'a000000d'+String("000000"+counter+"d").slice(-6));
				x2.push(String('00'+y).slice(-2)+'a'+String('00'+z).slice(-2)+'a0000a'+String('000000'+x1[z].substring(25)).slice(-6)+'a000000d'+String("000000"+counter+"d").slice(-6));
				counter++;
			}
		}
		x2.sort();
		x1 = [];
		x1 = x2.slice(0);
		x2 = [];
	}
	x.sort();

	for(var i = displayLevels-1; i>=0;i--){
		var notdummyfound = false;
		for(var j in x){
			if(Number(x[j].substring(0,2))==i){
				if(x[j].substring(24,25)!= 'd'){
					notdummyfound = true;
					break;
				}
			}
		}
		var k = -1;
		if(notdummyfound == false){
			for(var j in x){
				if(Number(x[j].substring(0,2))==i){
					k = j;
					break;
				}
			}
			x.splice(k,x.length-k);
		}
	}
	for(var i in x) {
		tp = x[i].substring(25);
		if(x[i].substring(24,25) != 'd'){
			createPersonSquares(tp);
			if(displayStyle == 0){
				$p[tp].css("margin-top",Number(x[i].substring(0,2))*(boxHeight+vspacing)+100+"px");
				po[tp].top = Number(x[i].substring(0,2))*(boxHeight+vspacing)+100;
			}
			else{
				$p[tp].css("margin-left",Number(x[i].substring(0,2))*(boxWidth+hspacing)+30+"px");
				po[tp].left = Number(x[i].substring(0,2))*(boxWidth+hspacing)+30;
			}
		}
	}
	var maxleveltodisplay = 0;	
	for(var i in x){
		maxleveltodisplay = Math.max(maxleveltodisplay, Number(x[i].substring(0,2)));
	}
	var k = 0;	
	var pos = 0;
	for(var i in x){
		if(Number(x[i].substring(0,2)) == maxleveltodisplay){
			if(displayStyle==0){
				pos = (k * (boxWidth + hspacing))+30;
			}
			else{
				pos = (k*(boxHeight + vspacing))+100
			}			
			x[i]= x[i].substring(0,18)+String("000000"+pos).slice(-6)+x[i].substring(24);
			k++;
		}
	}
	var maxpos = 0;
	var minpos = 0;
	for (var j = maxleveltodisplay-1; j>=0;j--){
		for (var i in x){
			if(Number(x[i].substring(0,2)) == j){
				for(var k in x){
					if(x[k].substring(11,17)== String("000000"+x[i].substring(25)).slice(-6)){
						maxpos = maxpos == 0 ? Number(x[k].substring(18,24)) :Math.max(maxpos,Number(x[k].substring(18,24)));
						minpos = minpos == 0 ? Number(x[k].substring(18,24)) :Math.min(minpos,Number(x[k].substring(18,24)));
					}
				}
				pos = (maxpos + minpos) / 2;
				maxpos = 0;
				minpos = 0;
				x[i]= x[i].substring(0,18)+String("000000"+pos).slice(-6)+x[i].substring(24);
			}
		}
	}
		for(var i in x){
			tp = x[i].substring(25);
			
			if(x[i].substring(24,25) != 'd'){
				if(displayStyle==0){
					$p[tp].css("margin-left",Number(x[i].substring(18,24))+"px");
					po[tp].left = Number(x[i].substring(18,24));
				}
				else{
					$p[tp].css("margin-top",Number(x[i].substring(18,24))+"px");
					po[tp].top = Number(x[i].substring(18,24));
				}
			}
		}
	if(displayStyle == 0){loadConnectingLinesDescVertical(b);}
	else                 {loadConnectingLinesDescHorizontal(b);}
}
function loadConnectingLinesDescVertical(b){
	for (var i in $p){
		if((po[i].fa != "" || po[i].mo != "") && i != b){
			$dl1[i]= $('<div></div>');
			$dl1[i].css("position","absolute");
			$dl1[i].css("height",( vspacing / 2)+"px");
			$dl1[i].css("width","0px");
			$dl1[i].css("border","1px solid black");
			var margleft = 0;
			if(po[po[i].fa].left == undefined){margleft = po[po[i].mo].left + boxWidth / 2;}
			else{ margleft = po[po[i].fa].left + boxWidth / 2;}
			$dl1[i].css("margin-left",margleft+"px");
			$dl1[i].css("margin-top",(po[i].top - vspacing)+"px");		

			$dl2[i]= $('<div></div>');
			$dl2[i].css("position","absolute");
			$dl2[i].css("height",( vspacing / 2)-2+"px");
			$dl2[i].css("width","0px");
			$dl2[i].css("border","1px solid black");
			$dl2[i].css("margin-left",(po[i].left + boxWidth / 2) + "px");
			$dl2[i].css("margin-top",(po[i].top - vspacing / 2) + "px");
			
			$dl3[i]= $('<div></div>');
			$dl3[i].css("position","absolute");
			$dl3[i].css("height","0px");
			$dl3[i].css("width",Math.abs((po[i].left + boxWidth / 2) - margleft) + "px");
			$dl3[i].css("border","1px solid black");
			$dl3[i].css("margin-left",Math.min((po[i].left + boxWidth / 2) , margleft) + "px");
			$dl3[i].css("margin-top",(po[i].top - vspacing / 2) + "px");
		}
	}
}
function loadConnectingLinesDescHorizontal(b){
	for (var i in $p){
		if((po[i].fa != "" || po[i].mo != "") && i != b){
			$dl1[i]= $('<div></div>');
			$dl1[i].css("position","absolute");
			$dl1[i].css("width",( hspacing / 2)+"px");
			$dl1[i].css("height","0px");
			$dl1[i].css("border","1px solid black");
			var margtop = 0;
			if(po[po[i].fa].top == undefined){margtop = po[po[i].mo].top + boxHeight / 2;}
			else{ margtop = po[po[i].fa].top + boxHeight / 2;}
			$dl1[i].css("margin-top", margtop + "px");
			$dl1[i].css("margin-left", (po[i].left - hspacing) + "px");		

			$dl2[i]= $('<div></div>');
			$dl2[i].css("position","absolute");
			$dl2[i].css("width",( hspacing / 2)-2+"px");
			$dl2[i].css("height","0px");
			$dl2[i].css("border","1px solid black");
			$dl2[i].css("margin-top",(po[i].top + boxHeight / 2) + "px");
			$dl2[i].css("margin-left",(po[i].left - hspacing / 2) + "px");
			
			$dl3[i]= $('<div></div>');
			$dl3[i].css("position","absolute");
			$dl3[i].css("width","0px");
			$dl3[i].css("height",Math.abs((po[i].top + boxHeight / 2) - margtop) + "px");
			$dl3[i].css("border","1px solid black");
			$dl3[i].css("margin-top",Math.min((po[i].top + boxHeight / 2) , margtop) + "px");
			$dl3[i].css("margin-left",(po[i].left - hspacing / 2) + "px");
		}
	}
}
