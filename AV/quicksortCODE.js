"use strict";


(function ($) {
 
  JSAV._types.ds.AVArray.prototype.setLeftArrow = JSAV.anim(function (indices) {
    var $elems = JSAV.utils._helpers.getIndices($(this.element).find("li"), indices);

    // Sets the arrow for every element specified
    $elems.each(function (index, item) {
      if (!$elems.hasClass("jsavarrow")) {
        $elems.toggleClass("jsavarrow");
      }

      if ($elems.hasClass("rightarrow")) {

        $elems.toggleClass("rightarrow");
        $elems.toggleClass("leftrightarrow");
      } else if (!$elems.hasClass("leftarrow")) {
 
        $elems.toggleClass("leftarrow");
      }
    });
  });


  JSAV._types.ds.AVArray.prototype.setRightArrow = JSAV.anim(function (indices) {
    var $elems = JSAV.utils._helpers.getIndices($(this.element).find("li"), indices);


    $elems.each(function (index, item) {
      if (!$elems.hasClass("jsavarrow")) {
        $elems.toggleClass("jsavarrow");
      }

      if ($elems.hasClass("leftarrow")) {

        $elems.toggleClass("leftarrow");
        $elems.toggleClass("leftrightarrow");
      } else if (!$elems.hasClass("rightarrow")) {

        $elems.toggleClass("rightarrow");
      }
    });
  });


  JSAV._types.ds.AVArray.prototype.clearLeftArrow = JSAV.anim(function (indices) {
    var $elems = JSAV.utils._helpers.getIndices($(this.element).find("li"), indices);


    $elems.each(function (index, item) {
      if ($elems.hasClass("leftrightarrow")) {

        $elems.toggleClass("leftrightarrow");
        $elems.toggleClass("rightarrow");
      } else if ($elems.hasClass("leftarrow")) {

        $elems.toggleClass("leftarrow");
        $elems.toggleClass("jsavarrow");
      }
    });
  });

 
  JSAV._types.ds.AVArray.prototype.clearRightArrow = JSAV.anim(function (indices) {
    var $elems = JSAV.utils._helpers.getIndices($(this.element).find("li"), indices);


    $elems.each(function (index, item) {
      if ($(item).hasClass("leftrightarrow")) {
 
        $(item).toggleClass("leftrightarrow");
        $(item).toggleClass("leftarrow");
      } else if ($(item).hasClass("rightarrow")) {

        $(item).toggleClass("rightarrow");
        $(item).toggleClass("jsavarrow");
      }
    });
  });

  JSAV._types.ds.AVArray.prototype.swapWithStyle = function (index1, index2) {
    this.swap(index1, index2);
    this.unhighlightBlue(index1);
    this.highlightBlue(index2);
  };
}(jQuery));
