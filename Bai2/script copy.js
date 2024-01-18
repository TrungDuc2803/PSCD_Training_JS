$(document).ready(function () {
  let imgLength = $(".jcarousel li").length;
  let index = 0;
  let check = false;
  let check1 = false;
  {
    let html = "";
    for (let i = 0; i < imgLength; i++) {
        html += `<div class="dot ${i === 0 ? "dot__active" : ""}" data-index=${i}></div>`;
    }
    $("#dot__list").html(html);
  }
  function addDotActive(indexDot) {
      $(".dot__active").removeClass("dot__active");
      $(`#dot__list .dot:eq(${indexDot})`).addClass("dot__active");
  }

  // đặt vị trí thanh trượt đầu cuối
  function resetSlider(slideWidth) {
    if (check) {
      $(".jcarousel").css("left", 0);
      for (let i = 0; i < imgLength - 1; i++) {
          $(".jcarousel li:first").appendTo(".jcarousel");
      }
      check = false;
    }
    if (check1) {
      $(".jcarousel").css("left", -(imgLength - 1) * slideWidth);
      for (let i = 0; i < imgLength - 1; i++) {
          $(".jcarousel li:last").prependTo(".jcarousel");
      }
      check1 = false;
    }
  }

  function addImgActive(indexImage) {
    const slideWidth = parseFloat($(".jcarousel li").width());
    resetSlider(slideWidth);
    if (indexImage === -1) {
      $(".jcarousel li:last").prependTo(".jcarousel");
      $(".jcarousel").css("left", -slideWidth);
      $(".jcarousel").animate({ left: 0 }, "slow");
      check1 = true;
      index = imgLength - 1;
    } else if (indexImage === imgLength) {
      $(".jcarousel li:first").appendTo(".jcarousel");
      $(".jcarousel").css("left", -(imgLength - 2) * slideWidth);
      $(".jcarousel").animate({ left: -(imgLength - 1) * slideWidth }, "slow");
      check = true;
      index = 0;
    } else {
      $(".jcarousel").animate({ left: slideWidth * -index }, "slow");
    }
    addDotActive(index);
  }

  $(".control-prev").on("click", function () {
      addImgActive(--index);
  });

  $(".control-next").on("click", function () {
      addImgActive(++index);
  });

  $("#dot__list").on("click", ".dot", function () {
      index = $(this).data("index");
      addImgActive(index);
  });
});