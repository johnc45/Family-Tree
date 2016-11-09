var $fm = [];
var $ch = [];
var $si = [];
var nextdocNumb = getUrlParameters('nd'); 
var displayStyle = getUrlParameters('ds');          // display style  vertical, horizontal1 or horizontal2  default is vertical
var displayLevels = getUrlParameters('dl');    // levels/generations to display  default is 5
var tp = 0;
 $(document).ready(function(){
	tp = document.getElementById('idNumber').innerHTML;
	var $head = document.getElementById('headingframe');
	appendButtons($("#headingframe"),tp);
	document.getElementById("headingframe").addEventListener("mouseover",function(){showpu0($(this));});
	document.getElementById("headingframe").addEventListener("mouseout",function(){hidepu0($(this));});
	getFamily(tp);	
	loadFamily(tp);

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
function getFamily(id){
	$fm[0] = $('<div id = "fa'+po[id].fa+'", class = "fammem0" onmouseover="showpu0($(this))" onmouseout="hidepu0($(this))"></div>');
	if(po[id].fa != ""){
		$fm[0].append('<p class = "fl1" >'+po[po[id].fa].fn + " " + po[po[id].fa].ln+'</p>');
		$fm[0].append('<p class = "fl2">'+po[po[id].fa].yb.substring(0,4) + " - " + po[po[id].fa].yd.substring(0,4)+'</p>');
		appendButtons($fm[0],po[id].fa);
	}
	else {
		$fm[0].append('<p class = "fl1">unknown</p>');
	}
	$fm[1] = $('<div id = "mo'+po[id].mo+'", class = "fammem1" onmouseover="showpu0($(this))" onmouseout="hidepu0($(this))"></div>');
	if(po[id].mo != ""){
		$fm[1].append('<p class = "fl1" >'+po[po[id].mo].fn + " " + po[po[id].mo].ln+'</p>');
		$fm[1].append('<p class = "fl2">'+po[po[id].mo].yb.substring(0,4) + " - " + po[po[id].mo].yd.substring(0,4)+'</p>');
		appendButtons($fm[1],po[id].mo);
	}
	else {
		$fm[1].append('<p class = "fl1">unknown</p>');
	}
	if(po[id].sp != undefined){
		$fm[2] = $('<div id = "fm'+po[id].sp+'", class = "fammem'+po[po[id].sp].gender+'" onmouseover="showpu0($(this))" onmouseout="hidepu0($(this))"></div>');
		if(po[id].sp != 0){
			//$fm[2].append('<p class = "fl1">'+po[po[id].sp].fn + " " + po[po[id].sp].ln+'<span style="visibility:hidden">WWW</span><span style="font-size:14px">'+po[po[id].sp].yb.substring(0,4) + " - " + po[po[id].sp].yd.substring(0,4)+'</span></p>');
			$fm[2].append('<p class = "fl1" >'+po[po[id].sp].fn + " " + po[po[id].sp].ln+'</p>');
			$fm[2].append('<p class = "fl2">'+po[po[id].sp].yb.substring(0,4) + " - " + po[po[id].sp].yd.substring(0,4)+'</p>');
			appendButtons($fm[2],po[id].sp);
		}
		else {
			$fm[2].append('<p class = "fl1">unknown</p>');
		}
	}
	var k = 0;
	var fp=[];
	for(var i in po){
		if((po[i].fa == id && po[i].mo == po[id].sp)||(po[i].mo == id && po[i].fa == po[id].sp)){
			fp[k]= [po[i].yb,i];
			k++;
		}
	}
	fp.sort();
	for(var i in fp){
		$ch[i] = $('<div id = "ch'+fp[i].slice(1,2)+'", class = "fammem'+po[fp[i].slice(1,2)].gender+'" onmouseover="showpu0($(this))" onmouseout="hidepu0($(this))"></div>');
		$ch[i].append('<p class = "fl1">'+po[fp[i].slice(1,2)].fn + " " + po[fp[i].slice(1,2)].ln+'</p>');
		$ch[i].append('<p class = "fl2">'+po[fp[i].slice(1,2)].yb.substring(0,4) + " - " + po[fp[i].slice(1,2)].yd.substring(0,4)+'</p>');
		appendButtons($ch[i],fp[i].slice(1,2));
	}
	k = 0;
	fp=[];
	for(var i in po){
		if(po[i].fa == po[id].fa && po[i].mo == po[id].mo && i != id){
			fp[k]= [po[i].yb,i];
			k++;
		}
	}
	fp.sort();
	for(var i in fp){
		$si[i] = $('<div id = "si'+fp[i].slice(1,2)+'", class = "fammem'+po[fp[i].slice(1,2)].gender+'" onmouseover="showpu0($(this))" onmouseout="hidepu0($(this))"></div>');
		$si[i].append('<p class = "fl1">'+po[fp[i].slice(1,2)].fn + " " + po[fp[i].slice(1,2)].ln+'</p>');
		$si[i].append('<p class = "fl2">'+po[fp[i].slice(1,2)].yb.substring(0,4) + " - " + po[fp[i].slice(1,2)].yd.substring(0,4)+'</p>');
		appendButtons($si[i],fp[i].slice(1,2));
	}
}
function appendButtons(obj,id){
	if(hasChild(id)==true){obj.append('<button id = "prgbut'+id+'", class="but1", onclick="progenyButtonClicked(Number(this.id.substring(6)))">Progeny</button>');}
	if(po[id].fa!="" || po[id].mo != ""){obj.append('<button id = "linbut'+id+'", class="but1", onclick="lineageButtonClicked(Number(this.id.substring(6)))">Lineage</button>');}
	//if(id == tp){obj.children(".but1").css("margin-top","-40px");}


	if(id!=tp){
		var fileNumber = String("00000"+id).slice(-4);
		$.ajax({ url:'./'+fileNumber+'.html', type:'HEAD', async:false, error: function() {}, success: function(){ obj.append('<button id = "probut'+id+'", class="but1", onclick="profileButtonClicked(Number(this.id.substring(6)))">Profile</button>'); }});
	}
}
function hasChild(b){
	var hasChild = false;
	for(var i in po){
		if (po[i].fa == b || po[i].mo == b){hasChild = true; break;}
	}
	return hasChild;
}
function loadFamily(id){
	$('#family').append('<p class = "famgrptit">Parents</p>');
	$('#family').append($fm[0]);
	$('#family').append($fm[1]);
	if(po[id].sp != undefined){
		$('#family').append('<p class = "famgrptit">Spouse</p>');
		$('#family').append($fm[2]);
	}

	for(var i in $ch){
		if(i==0){$('#family').append('<p class = "famgrptit">Children</p>');}
		$('#family').append($ch[i]);
	}
			
	for(var i in $si){
		if(i==0){$('#family').append('<p class = "famgrptit">Siblings</p>');}
		$('#family').append($si[i]);
	}
}
function showpu0(id){id.children(".but1").show();}
function hidepu0(id){id.children(".but1").hide();}
function profileButtonClicked(id){
	var fileNumber = String("00000"+id).slice(-4);
	window.location.assign('./'+fileNumber+'.html?nd='+nextdocNumb+'&dl='+displayLevels+'&ds='+displayStyle);
}
function lineageButtonClicked(id){window.location.assign("../../familytree"+nextdocNumb+".html?bp="+id+"&dl="+displayLevels+"&ds="+displayStyle+"&lp="+0);}
function progenyButtonClicked(id){window.location.assign("../../familytree"+nextdocNumb+".html?bp="+id+"&dl="+displayLevels+"&ds="+displayStyle+"&lp="+1);}
