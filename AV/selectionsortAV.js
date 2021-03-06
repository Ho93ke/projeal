/*global alert: true, ODSA, console */
$(document).ready(function() {
  "use strict";
  var av,     
      arr,    
      pseudo; 


  var config = ODSA.UTILS.loadConfig(),
      interpret = config.interpreter,       
      code = config.code,                   
      settings = config.getSettings();      


  $("#arrayValues").attr("placeholder", interpret("av_arrValsPlaceholder"));


  $("#arrayValues").attr("placeholder", interpret("av_arrValsPlaceholder"));


  var arrayLayout =
      settings.add("layout",
                   {type: "select", options: {bar: "Bar", array: "Array"},
                     label: "Array layout: ", value: "bar"});


  ODSA.AV.initArraySize(5, 16, 8);


  function selsort() {
    var i, j, bigindex;
    av.umsg(interpret("av_c3"));
    pseudo.setCurrentLine("sig");
    av.step();
    for (i = 0; i < arr.size() - 1; i++) {
      av.umsg(interpret("av_c4") + i);
      pseudo.setCurrentLine("outloop");
      av.step();
      av.umsg(interpret("av_c5"));
      pseudo.setCurrentLine("initbig");
      bigindex = 0;
      arr.addClass(0, "special");
      av.step();
      av.umsg(interpret("av_c6"));
      pseudo.setCurrentLine("inloop");
      av.step();
      for (j = 1; j < arr.size() - i; j++) {
        arr.addClass(j, "processing");
        av.umsg(interpret("av_c7"));
        pseudo.setCurrentLine("compare");
        av.step();
        if (arr.value(j) > arr.value(bigindex)) {
          av.umsg(interpret("av_c8"));
          arr.removeClass(bigindex, "special");
          pseudo.setCurrentLine("setbig");
          bigindex = j;
          arr.addClass(bigindex, "special");
          av.step();
        }
        arr.removeClass(j, "processing");
      }
      av.umsg(interpret("av_c9"));
      pseudo.setCurrentLine("swap");
      av.step();
      if (bigindex !== (arr.size() - i - 1)) {
        arr.swap(bigindex, arr.size() - i - 1); 
        arr.removeClass(bigindex, "special");
        arr.addClass(arr.size() - i - 1, "special");
      }
      av.step();
      av.umsg(interpret("av_c10"));
      arr.removeClass(arr.size() - i - 1, "special");
      arr.addClass(arr.size() - i - 1, "deemph");
      av.step();
    }
    av.umsg(interpret("av_c2"));
    arr.addClass(0, "deemph");
    pseudo.setCurrentLine("end");
  }


  function runIt() {
    var arrValues = ODSA.AV.processArrayValues();


    if (arrValues) {
      ODSA.AV.reset(true);
      av = new JSAV($(".avcontainer"), {settings: settings});


      arr = av.ds.array(arrValues, {indexed: true, layout: arrayLayout.val()});


      pseudo = av.code(code);
      av.umsg(interpret("av_c1"));
      av.displayInit();
      selsort();
	  
	  

	    var timesClicked = 0;
		 $("#StartStopbtn").click(function(e) {
		timesClicked++;

		if (timesClicked%2==0) {
			
		clearInterval($("#forwardbtn").data('interval'));
		document.getElementById("startstopbtnicon").classList.add('fa-play');

		document.getElementById("startstopbtnicon").classList.remove('fa-pause');
		} 
		else {
			
			 $("#forwardbtn").data('interval', setInterval(function forwardbtn(){ $("#forwardbtn").click();}, 1000));
			document.getElementById("startstopbtnicon").classList.add('fa-pause');

			document.getElementById("startstopbtnicon").classList.remove('fa-play');
		}
		})
	
	  
	  
      av.recorded(); 
      ODSA.AV.sendResizeMsg();
    }
  }


  $("#run").click(runIt);
  $("#ssperform").submit(function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    runIt();
  });
  $("#reset").click(ODSA.AV.reset);
});
