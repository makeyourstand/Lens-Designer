"use strict"
var Stage = new PIXI.Container(); //объект
var renderer = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, null, true);
//renderer.backgroundColor = 0x2f3387;

document.body.appendChild(renderer.view);


PIXI.loader
	.add('start', "mage/background_wallpaper1.jpg")
	.add('light', "mage/background_light.jpg")
	.add('dark', "mage/background_dark.jpg")		//add images
	.load(()=>{
		addStart();
	});

document.addEventListener("DOMContentLoaded", function(event) { 
	calcResult()
});


window.addEventListener("resize", function(){
	
	renderer.resize(window.innerWidth, window.innerHeight);
	resizeBg();
	renderScene();
})


function sortByZIndex(){
	Stage.children.sort(
			function(a,b)
					{
						a.zIndex = a.zIndex || 0;
						b.zIndex = b.zIndex || 0;
						return a.zIndex - b.zIndex;
						
					});
}
		
function renderScene(){
	renderer.render(Stage);
	
}

//start

var BACKGROUND


function resizeBg(){
	BACKGROUND.x = renderer.view.width * 0.36 - BACKGROUND.width * 0.36 
	BACKGROUND.y = renderer.view.height * 0.38 - BACKGROUND.height * 0.38
	console.log(BACKGROUND.x, BACKGROUND.y)
}

function addStart(){
	var img = new PIXI.Sprite(PIXI.loader.resources.start.texture);
	img.zIndex = 1000;
	BACKGROUND = img
	
	resizeBg()
	
	Stage.addChild(img);
	renderScene();
	sortByZIndex();
}

var lineDarkTheme = 0xffffe0;
var lineLightTheme = 0xff11ff;
var lineColor;
var isOn = false;
var typeLens;


//lines and dots
var lineLens = new PIXI.Graphics();
lineLens.zIndex = 10;
var lineRay = new PIXI.Graphics();
var lineDefRay = new PIXI.Graphics();
var lineFRay = new PIXI.Graphics();
var dotDistObj = new PIXI.Graphics();
var dotDistFocus1 = new PIXI.Graphics();
var dotDistFocus2 = new PIXI.Graphics();
var dotDistIm = new PIXI.Graphics();
var dotObj = new PIXI.Graphics();
var dotIm = new PIXI.Graphics();


function addImageLight(){
	//Stage.removeChild(im);
	typeLens = 0;
	document.getElementById('button_light').style.visibility = 'hidden';
	document.getElementById('button_dark').style.visibility = 'hidden';
	document.getElementById('panel').style.visibility = 'visible';
	document.getElementById('buttonRestart').style.visibility = 'visible';
	document.getElementById('labelStart').style.visibility = "hidden";
	document.getElementById('labelStartSelect').style.visibility = "hidden";
	lineColor = lineLightTheme;
	var img = new PIXI.Sprite(PIXI.loader.resources.light.texture);
	BACKGROUND.zIndex = -10000;
	img.zIndex = -1000;
	img.x = 0;
	img.y = 0;
	//img.height=700;
	//img.width=1400;
	Stage.addChild(img);
	renderScene();
	setAxis(lineColor);
	
}


function addImageDark(){
	//Stage.removeChild(im);
	typeLens = 0;
	document.getElementById('button_dark').style.visibility = 'hidden';
	document.getElementById('button_light').style.visibility = 'hidden';
	document.getElementById('panel').style.visibility = 'visible';
	document.getElementById('buttonRestart').style.visibility = 'visible';
	document.getElementById('labelStart').style.visibility = "hidden";
	document.getElementById('labelStartSelect').style.visibility = "hidden";
	lineColor = lineDarkTheme;
	var img = new PIXI.Sprite(PIXI.loader.resources.dark.texture);
	BACKGROUND.zIndex = -10000;
	img.zIndex = -1000;
	img.x = 0;
	img.y = 0;
	//img.height=700;
	//img.width=1400;
	Stage.addChild(img);
	renderScene();
	setAxis(lineColor);
}
	

	
function getConvex(){
	if (isOn==true) alert("Push Restart");
	else{
		isOn=true;
	Stage.removeChild(lineLens);
	typeLens = 1;
	lineLens = new PIXI.Graphics();
	var x = 600, yUp = 150, yDown = 450;
	lineLens.lineStyle(4, 0xffd700);
	lineLens.moveTo(x, yUp);
	lineLens.lineTo(x+10, yUp+10);
	lineLens.moveTo(x, yUp);
	lineLens.lineTo(x-10, yUp+10);
	lineLens.moveTo(x, yUp);
	lineLens.lineTo(x, yDown);
	lineLens.lineTo(x-10, yDown-10);
	lineLens.moveTo(x,yDown);
	lineLens.lineTo(x+10, yDown-10);
	Stage.addChild(lineLens);
	renderScene();
	sortByZIndex();
	}
}

function getConcave (){
	if(isOn == true) alert("Push Restart");
	else{
		isOn = true;
	Stage.removeChild(lineLens);
	typeLens = 2;
	lineLens = new PIXI.Graphics();
	var x = 600, yUp = 150, yDown = 450;
	lineLens.lineStyle(4, 0xffd700);
	lineLens.moveTo(x, yUp);
	lineLens.lineTo(x+10, yUp-10);
	lineLens.moveTo(x, yUp);
	lineLens.lineTo(x-10, yUp-10);
	lineLens.moveTo(x, yUp);
	lineLens.lineTo(x, yDown);
	lineLens.lineTo(x+10, yDown+10);
	lineLens.moveTo(x,yDown);
	lineLens.lineTo(x-10, yDown+10);
	Stage.addChild(lineLens);
	renderScene();
	sortByZIndex();
	}
}




function Restart(){
	isOn = false;
	Stage.removeChild(lineLens);
	Stage.removeChild(lineRay);
	Stage.removeChild(lineDefRay);
	Stage.removeChild(lineFRay);
	Stage.removeChild(dotDistFocus1);
	Stage.removeChild(dotDistFocus2);
	Stage.removeChild(dotDistIm);
	Stage.removeChild(dotDistObj);
	Stage.removeChild(dotObj);
	Stage.removeChild(dotIm);
	document.getElementById("textFocus").value =  "0";
	document.getElementById("textDistanceImage").value = "0";
	document.getElementById("textDistanceObject").value = "0";
	document.getElementById("textHeightImage").value = "0";
	document.getElementById("textHeightObject").value = "0";
	document.getElementById("textAngle").value = "0";
	document.getElementById("textTypeOfImage").value = "";
	document.getElementById("textScale").value = "1";
	typeLens = 0;
	renderScene();
}



function calcResult(){
	Stage.removeChild(dotDistFocus1);
	Stage.removeChild(dotDistFocus2);
	Stage.removeChild(dotDistIm);
	Stage.removeChild(dotDistObj);
	Stage.removeChild(dotObj);
	Stage.removeChild(dotIm);
	document.getElementById("textDistanceImage").value = "";
	document.getElementById("textHeightImage").value = "";
	Stage.removeChild(lineRay);
	Stage.removeChild(lineDefRay);
	Stage.removeChild(lineFRay);
	if (typeLens == 0) alert ("Indicate the lens type (convex or concave)")
	else {
		var x = 600, y = 300;
		var s = parseFloat(document.getElementById("textScale").value);
		var F = parseFloat(document.getElementById("textFocus").value);
		var d = parseFloat(document.getElementById("textDistanceObject").value);
		var H = parseFloat(document.getElementById("textHeightObject").value);
		var a = parseFloat(document.getElementById("textAngle").value);
		var h, f;
		if (d<0 || F<0 || a>90 || a<-90) alert("Input correct parametres(d>0, F>0, -90<a<90)")
		else if (!isNaN(F) && !isNaN(d) && !isNaN(H) && !isNaN(a) && !isNaN(s)) {
			if (s<0.01) {s=1; document.getElementById("textScale").value = "1";}
			if (typeLens == 2) F=(-1)*F;
			if (a>89) {a=89; document.getElementById("textAngle").value="89";}
			if (a<-89) {a=-89; document.getElementById("textAngle").value="-89";}
			d=d/s;
			F=F/s;
			H=H/s;
			a = a/180*Math.PI;
			if (d==F && typeLens==1) {f = "inf"; h = "inf";}
			else  {f = F*d/(d-F); h = f/d*H;}
			
			if (a!=0) {H=0; h = 0};
			document.getElementById("textHeightImage").value = (-1)*h*s;
			document.getElementById("textDistanceImage").value = f*s;
			if (f<0) document.getElementById("textTypeOfImage").value = "imagine"
			else  document.getElementById("textTypeOfImage").value = "real";
			if (d==F && typeLens == 1) document.getElementById("textTypeOfImage").value = "doesnt exist";
			//рисованиe
			
			 dotDistObj = new PIXI.Graphics();
			 dotDistFocus1 = new PIXI.Graphics();
			 dotDistFocus2 = new PIXI.Graphics();
			 dotDistIm = new PIXI.Graphics();
			 dotObj = new PIXI.Graphics();
			 dotIm = new PIXI.Graphics();


			dotDistObj.beginFill(0x00fcaa);
			if (d<0) d=(-1)*d;
			dotDistObj.drawCircle(x-d*10, y, 3);
			dotDistObj.endFill();
			Stage.addChild(dotDistObj);
			renderScene();
			sortByZIndex();
			
			
			dotDistFocus1.beginFill(0x00fcaa);
			dotDistFocus1.drawCircle(x-F*10, y, 5);
			dotDistFocus1.endFill();
			Stage.addChild(dotDistFocus1);
			renderScene();
			sortByZIndex();
			
			dotDistFocus2.beginFill(0x00fcaa);
			dotDistFocus2.drawCircle(x+F*10, y, 5);
			dotDistFocus2.endFill();
			Stage.addChild(dotDistFocus2);
			renderScene();
			sortByZIndex();
			
			
			dotDistIm.beginFill(0x00fcaa);
			dotDistIm.drawCircle(x+f*10, y, 3);
			dotDistIm.endFill();
			Stage.addChild(dotDistIm);
			renderScene();
			sortByZIndex();
			
			
			dotObj.beginFill(0xFF4500);
			dotObj.drawCircle(x-d*10, y-H*10, 5);
			dotObj.endFill();
			Stage.addChild(dotObj);
			renderScene();
			sortByZIndex();
			
			
			dotIm.beginFill(0xFF4500);
			dotIm.drawCircle(x+f*10, y+h*10, 5);
			dotIm.endFill();
			Stage.addChild(dotIm);
			renderScene();
			sortByZIndex();
			
			
			lineRay = new PIXI.Graphics();
			lineRay.lineStyle(2, 0x0000ff);
			lineDefRay = new PIXI.Graphics();
			lineDefRay.lineStyle(1, 0x45eed4);
			lineFRay = new PIXI.Graphics();
			lineFRay.lineStyle(2, 0xdd6709);
			if (a==0){
			if ((typeLens==1 && d>F) || typeLens==2){
				lineRay.moveTo(x-d*10,y-H*10);
				lineRay.lineTo(x, y-H*10);
				lineRay.lineTo(x+f*10, y+h*10);
				if(typeLens==2) lineRay.lineTo(x+F*10, y);
				Stage.addChild(lineRay);
				renderScene();
				sortByZIndex();
				
				lineDefRay.moveTo(x-d*10, y-H*10);
				lineDefRay.lineTo(x,y);
				if (typeLens == 1) lineDefRay.lineTo(x+f*10, y+h*10);
				Stage.addChild(lineDefRay);
				renderScene();
				sortByZIndex();
				}
			else if (typeLens == 1 && d<F){
				lineRay.moveTo(x-d*10,y-H*10);
				lineRay.lineTo(x, y-H*10);
				lineRay.lineTo(x+F*10, y);
				lineRay.lineStyle(1, 0x0000ff);
				lineRay.moveTo(x+f*10, y+h*10);
				lineRay.lineTo(x, y-H*10);
				Stage.addChild(lineRay);
				renderScene();
				sortByZIndex();
				
				lineDefRay.moveTo(x+f*10, y+h*10);
				lineDefRay.lineTo(x,y);
				Stage.addChild(lineDefRay);
				renderScene();
				sortByZIndex();
			}
			else if (typeLens == 1 && d==F){
				lineRay.moveTo(x-d*10,y-H*10);
				lineRay.lineTo(x, y-H*10);
				lineRay.lineTo(x+700, y-H*10+700*H/F);
				Stage.addChild(lineRay);
				renderScene();
				sortByZIndex();
				
				lineDefRay.moveTo(x-d*10, y-H*10);
				lineDefRay.lineTo(x+700,y+700*H/F);
				Stage.addChild(lineDefRay);
				renderScene();
				sortByZIndex();
				}
			}
			
			else{
				lineRay.moveTo(x-d*10, y);
				lineRay.lineTo(x, y-d*10*Math.tan(a));
				if (d==F) lineRay.lineTo(x+700, y-d*10*Math.tan(a));
				lineRay.lineTo(x+f*10, y);
				if (d<F) {
					lineRay.lineStyle(1, 0x0000ff);
					lineRay.moveTo(x, y-d*10*Math.tan(a));
					lineRay.lineTo(x+10*F, y-F*10*Math.tan(a));
				}
				if (typeLens == 2){
					lineRay.lineStyle(1, 0x0000ff);
					lineRay.lineTo(x+F*10, y-F*10*Math.tan(a));
				}
				Stage.addChild(lineRay);
				renderScene();
				sortByZIndex();
				
				lineFRay.moveTo(x+F*10, 100);
				lineFRay.lineTo(x+F*10, 500);
				Stage.addChild(lineFRay);
				renderScene();
				sortByZIndex();
				
				lineDefRay.moveTo(x, y);
				lineDefRay.lineTo(x-700, y+700*Math.tan(a));
				lineDefRay.lineTo(x+700, y-700*Math.tan(a));
				Stage.addChild(lineDefRay);
				renderScene();
				sortByZIndex();
			}
		}
		else{
			document.getElementById("textFocus").value = "";
			document.getElementById("textDistanceObject").value = "";
			document.getElementById("textTypeOfImage").value = "";
			document.getElementById("textHeightObject").value = "";
			document.getElementById("textAngle").value = "0";
			document.getElementById("textScale").value = "1";
			alert("Enter real value");
		}

	}
}


function setAxis(lineColor){
	var line = new PIXI.Graphics();
	line.lineStyle(3, lineColor);
	line.moveTo(0,300);
	line.lineTo(window.innerWidth,300);
	
	Stage.addChild(line);
	renderScene();
}




