/*global alert: true, ODSA */
$(document).ready(function() {
  "use strict";
  var av,  
      arr; 


  var config = ODSA.UTILS.loadConfig(),
      interpret = config.interpreter,
      settings = config.getSettings();      

  $("#arrayValues").attr("placeholder", interpret("av_arrValsPlaceholder"));

 


  ODSA.AV.initArraySize(5, 20, 8);

 
  function runIt() {
    var arrValues = ODSA.AV.processArrayValues();

 
    if (arrValues) {
      ODSA.AV.reset(true);
      av = new JSAV($(".avcontainer"), {settings: settings});
      // Create a new array using the layout the user has selected
      arr = av.ds.array(arrValues, {indexed: true});
      av.displayInit();


      var level = 1;
      var column = 1;
      av.umsg(interpret("av_c1"));
      mergesort(arr, level, column);


      av.umsg(interpret("av_c2"));


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


  var canvasWidth = $("#container").width();
  var rowHeight = 75;
  var blockWidth = 32;

 

  function mergesort(arr, level, column) {

    setPosition(arr, level, column);

    var arrLen = arr.size();
    var returnArr = arr;

    arr.highlight();
    if (arrLen === 1) {    
      av.umsg(interpret("av_c3"));
      av.step();
      arr.unhighlight();
    } else if (arrLen > 1) { 
      av.step();
      av.umsg(interpret("av_c4"));
      arr.unhighlight();


      var midPoint = Math.ceil(arrLen / 2);


      var subArr1 = arr.slice(0, midPoint);
      var avSubArr1 = av.ds.array(subArr1, {indexed: true, center: false});
      var subArr2 = arr.slice(midPoint, arrLen);
      var avSubArr2 = av.ds.array(subArr2, {indexed: true, center: false});

      av.step();

      av.umsg(interpret("av_c5"));
      var childArr1Col = column * 2 - 1;
      var retArr1 = mergesort(avSubArr1, level + 1, childArr1Col);

      av.umsg(interpret("av_c6"));
      var childArr2Col = column * 2;
      var retArr2 = mergesort(avSubArr2, level + 1, childArr2Col);

      returnArr = merge(arr, retArr1, retArr2);
    }
    return returnArr;
  }


  function merge(origArr, arr1, arr2) {
    av.umsg(interpret("av_c7"));

    for (var i = 0; i < origArr.size(); i++) {
      origArr.value(i, "");
    }

    arr1.highlight();
    arr2.highlight();
    av.step();

    if (arr1.size() > 1) {
      arr1.unhighlight();
      arr2.unhighlight();
    }

    var pos1 = 0;
    var pos2 = 0;
    var index = 0;


    while (pos1 < arr1.size() || pos2 < arr2.size()) {
      if (pos1 === arr1.size() || pos2 === arr2.size()) {
        av.umsg(interpret("av_c8"));
      } else {

        if (arr1.size() > 1) {
          if (pos1 < arr1.size()) {
            arr1.highlight(pos1);
          }
          if (pos2 < arr2.size()) {
            arr2.highlight(pos2);
          }
          av.umsg(interpret("av_c9"));
          av.step();
        }
        av.umsg(interpret("av_c10"));
      }

      if (pos1 < arr1.size() &&
          (arr1.value(pos1) <= arr2.value(pos2) || pos2 === arr2.size())) {
        arr1.unhighlight(pos1).highlightBlue(pos1);
        av.step();

        origArr.value(index, arr1.value(pos1));

        arr1.value(pos1, "");
        arr1.unhighlightBlue(pos1);
        pos1++;
      } else {
        arr2.unhighlight(pos2).highlightBlue(pos2);
        av.step();

        origArr.value(index, arr2.value(pos2));

        arr2.value(pos2, "");
        arr2.unhighlightBlue(pos2);
        pos2++;
      }

      origArr.highlightBlue(index);
      av.umsg(interpret("av_c11"));
      av.step();

      origArr.unhighlightBlue(index).markSorted(index);
      index++;
    }

    av.umsg(interpret("av_c12"));
    arr1.hide();
    arr2.hide();
    av.step();

    av.clearumsg();
    return origArr;
  }


  function setPosition(arr, level, column) {

    var numArrInRow = Math.pow(2, level - 1);



    var left = (canvasWidth / (2 * numArrInRow)) * (2 * column - 1) -
               (blockWidth * arr.size() / 2);
    var top = rowHeight * (level - 1);


    arr.element.css({left: left, top: top});
  }


  $("#run").click(runIt);
  $("#ssperform").submit(function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    runIt();
  });
  $("#reset").click(ODSA.AV.reset);
});
