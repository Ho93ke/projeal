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


  var arrayLayout =
      settings.add("layout",
                   {type: "select", options: {bar: "Bar", array: "Array"},
                     label: "Array layout: ", value: "bar"});


  ODSA.AV.initArraySize(5, 16, 8);

  
  // Insertion Sort
  function inssort() {
    var i, j;
    av.umsg(interpret("av_c3"));
    pseudo.setCurrentLine("sig");
    arr.highlight([0]);
    arr.addClass(1, "processing");
    arr.addClass(1, "whitetext");
    av.step();
    for (i = 1; i < arr.size(); i++) { 
      arr.addClass(i, "processing");
      arr.addClass(i, "whitetext");
      av.umsg(interpret("av_c4") + i);
      pseudo.setCurrentLine("outloop");
      av.step();
      av.umsg(interpret("av_c5"));
      pseudo.setCurrentLine("inloop");
      av.step();
      for (j = i; (j > 0) && (arr.value(j) < arr.value(j - 1)); j--) {
        arr.addClass(j, "processing");
        arr.addClass(j, "whitetext");
        arr.swap(j, j - 1); 
        arr.highlight(j).unhighlight(j - 1); 
        arr.removeClass(j, "processing");
        arr.removeClass(j, "whitetext");
        arr.addClass(j - 1, "processing");
        arr.addClass(j - 1, "whitetext");
        av.umsg(interpret("av_c6"));
        pseudo.setCurrentLine("swap");
        av.step();
      }
      arr.highlight(j);
    }
    pseudo.setCurrentLine("end");
    av.umsg(interpret("av_c2"));
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
      inssort();
      arr.unhighlight();
      arr.removeClass(true, "processing");
      arr.removeClass(true, "whitetext");

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
