/*global alert: true, ODSA, console */
$(document).ready(function() {
  "use strict";
  var av;   

 
  var config = ODSA.UTILS.loadConfig(),
      interpret = config.interpreter,      
      settings = config.getSettings();     


  $("#arrayValues").attr("placeholder", interpret("av_arrValsPlaceholder"));


  var arrayLayout = settings.add("layout", {type: "select",
    options: {bar: "Bar", array: "Array"},
    label: "Array layout: ", value: "array"});


  ODSA.AV.initArraySize(5, 12, 8);

 
  function runIt() {
    var arrValues = ODSA.AV.processArrayValues();


    if (arrValues) {
      ODSA.AV.reset(true);
      av = new JSAV($(".avcontainer"), {settings: settings});

      var arr = av.ds.array(arrValues, {indexed: true, layout: arrayLayout.val()});
      av.umsg(interpret("av_c18"));
      av.displayInit();

      quicksort(arr, 0, arr.size() - 1);

      av.umsg(interpret("av_c1"));


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

  function quicksort(arr, left, right) {
    av.umsg(interpret("av_c2"));

    var pivotIndex = Math.floor((left + right) / 2);
    arr.addClass(pivotIndex, "processing");
    av.step();

    av.umsg(interpret("av_c3"));
    arr.swapWithStyle(pivotIndex, right);
    av.step();

    av.umsg(interpret("av_c4"));
    arr.setLeftArrow(left);
    arr.setRightArrow(right - 1);
    av.step();

    var finalPivotIndex = partition(arr, left, right - 1, arr.value(right));

    av.umsg(interpret("av_c5"));
    av.step();

    av.umsg(interpret("av_c6"));
    arr.toggleArrow(finalPivotIndex);
    arr.swapWithStyle(right, finalPivotIndex);
    arr.removeClass(finalPivotIndex, "processing");
    arr.addClass(finalPivotIndex, "deemph");
    av.step();

    // Sort left partition
    var subArr1 = arr.slice(left, finalPivotIndex);
    if (subArr1.length === 1) {
      av.umsg(interpret("av_c7"));
      arr.toggleArrow(finalPivotIndex - 1);
      av.step();
      arr.toggleArrow(finalPivotIndex - 1);
      arr.addClass(left, "deemph");
    } else if (subArr1.length > 1) {
      av.umsg(interpret("av_c8"));
      av.step();
      quicksort(arr, left, finalPivotIndex - 1);
    }


    var subArr2 = arr.slice(finalPivotIndex + 1, right + 1);
    if (subArr2.length === 1) {
      av.umsg(interpret("av_c9"));
      arr.toggleArrow(finalPivotIndex + 1);
      av.step();
      arr.toggleArrow(finalPivotIndex + 1);
      arr.addClass(finalPivotIndex + 1, "deemph");
    } else if (subArr2.length > 1) {
      av.umsg(interpret("av_c10"));
      av.step();
      quicksort(arr, finalPivotIndex + 1, right);
    }
  }

  function partition(arr, left, right, pivotVal) {
    var origLeft = left;

    while (left <= right) {

      av.umsg(interpret("av_c11"));
      av.step();
      while (arr.value(left) < pivotVal) {
        av.umsg(interpret("av_c12"));
        arr.clearLeftArrow(left);
        left++;
        arr.setLeftArrow(left);
        av.step();
      }

      arr.highlight(left);
      av.umsg(interpret("av_c13"));
      av.step();


      av.umsg(interpret("av_c14"));
      av.step();

      while ((right > origLeft) && (right >= left) && (arr.value(right) >= pivotVal)) {
        av.umsg(interpret("av_c15"));
        arr.clearRightArrow(right);
        right--;
        arr.setRightArrow(right);
        av.step();
      }

      if (right > left) {
        arr.highlight(right);
        av.umsg(interpret("av_c13"));
        av.step();

        av.umsg(interpret("av_c16"));
        arr.swap(left, right);
        av.step();
        arr.unhighlight([left, right]);
      } else {
        av.umsg(interpret("av_c17"));
        arr.unhighlight(left);
        av.step();
        break;
      }
    }


    arr.clearLeftArrow(left);
    arr.clearRightArrow(right);
    arr.toggleArrow(left);


    return left;
  }


  $("#run").click(runIt);
  $("#reset").click(ODSA.AV.reset);
});
