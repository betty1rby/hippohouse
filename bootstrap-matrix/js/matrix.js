$(document).ready(function() {
  $(".content2").attr("style", "background:#fff;margin:0 auto");
  // === Sidebar navigation === //
  $(".quick-actions a").click(function() {
    var index = $(this).attr("data-index");
    var sidebarIndex = "#" + index;
    $(sidebarIndex).click();
  });
  $(".quick-actions a:gt(8)").click(function() {
    var menu_index = $(this).index;
    alert(menu_index);
    $("body").animate({
      scrollTop: 300
    }, 500);
  });
  $('.submenu > a').click(function(e) {
    e.preventDefault();
    var submenu = $(this).siblings('ul');
    var li = $(this).parents('li');
    var submenus = $('#sidebar li.submenu ul');
    // var submenus_parents = $('#sidebar li.submenu');
    var submenus_parents = $('#sidebar li');
    if (li.hasClass('open')) {
      if (($(window).width() > 768) || ($(window).width() < 479)) {
        submenu.slideUp();
      } else {
        submenu.fadeOut(250);
      }
      li.removeClass('open active');
    } else {
      if (($(window).width() > 768) || ($(window).width() < 479)) {
        submenus.slideUp();
        submenu.slideDown();
      } else {
        submenus.fadeOut(250);
        submenu.fadeIn(250);
      }
      submenus_parents.removeClass('open active');
      li.addClass('open active');
    }
  });

  var ul = $('#sidebar > ul');

  $('#sidebar > a').click(function(e) {
    e.preventDefault();
    var sidebar = $('#sidebar');
    if (sidebar.hasClass('open')) {
      sidebar.removeClass('open');
      ul.slideUp(250);
    } else {
      sidebar.addClass('open');
      ul.slideDown(250);
    }
  });

  // === Resize window related === //
  $(window).resize(function() {
    if ($(window).width() > 479) {
      ul.css({
        'display': 'block'
      });
      $('#content-header .btn-group').css({
        width: 'auto'
      });
    }
    if ($(window).width() < 479) {
      ul.css({
        'display': 'none'
      });
      fix_position();
    }
    if ($(window).width() > 768) {
      $('#user-nav > ul').css({
        width: 'auto',
        margin: '0'
      });
      $('#content-header .btn-group').css({
        width: 'auto'
      });
    }
  });

  if ($(window).width() < 468) {
    ul.css({
      'display': 'none'
    });
    fix_position();
  }

  if ($(window).width() > 479) {
    $('#content-header .btn-group').css({
      width: 'auto'
    });
    ul.css({
      'display': 'block'
    });
  }

  // === Tooltips === //
  $('.tip').tooltip();
  $('.tip-left').tooltip({
    placement: 'left'
  });
  $('.tip-right').tooltip({
    placement: 'right'
  });
  $('.tip-top').tooltip({
    placement: 'top'
  });
  $('.tip-bottom').tooltip({
    placement: 'bottom'
  });

  // === Search input typeahead === //
  $('#search input[type=text]').typeahead({
    source: ['Dashboard', 'Form elements', 'Common Elements', 'Validation', 'Wizard', 'Buttons', 'Icons', 'Interface elements', 'Support', 'Calendar', 'Gallery', 'Reports', 'Charts', 'Graphs', 'Widgets'],
    items: 4
  });

  // === Fixes the position of buttons group in content header and top user navigation === //

  function fix_position() {
    var uwidth = $('#user-nav > ul').width();
    $('#user-nav > ul').css({
      width: uwidth,
      'margin-left': '-' + uwidth / 2 + 'px'
    });

    var cwidth = $('#content-header .btn-group').width();
    $('#content-header .btn-group').css({
      width: cwidth,
      'margin-left': '-' + uwidth / 2 + 'px'
    });
  }

  // === Style switcher === //
  $('#style-switcher i').click(function() {
    if ($(this).hasClass('open')) {
      $(this).parent().animate({
        marginRight: '-=190'
      });
      $(this).removeClass('open');
    } else {
      $(this).parent().animate({
        marginRight: '+=190'
      });
      $(this).addClass('open');
    }
    $(this).toggleClass('icon-arrow-left');
    $(this).toggleClass('icon-arrow-right');
  });

  $('#style-switcher a').click(function() {
    var style = $(this).attr('href').replace('#', '');
    $('.skin-color').attr('href', 'css/maruti.' + style + '.css');
    $(this).siblings('a').css({
      'border-color': 'transparent'
    });
    $(this).css({
      'border-color': '#aaaaaa'
    });
  });

  $('.lightbox_trigger').click(function(e) {

    e.preventDefault();

    var image_href = $(this).attr("href");

    if ($('#lightbox').length > 0) {

      $('#imgbox').html('<img src="' + image_href + '" /><p><i class="icon-remove icon-white"></i></p>');

      $('#lightbox').slideDown(500);
    } else {
      var lightbox =
        '<div id="lightbox" style="display:none;">' +
        '<div id="imgbox"><img src="' + image_href + '" />' +
        '<p><i class="icon-remove icon-white"></i></p>' +
        '</div>' +
        '</div>';

      $('body').append(lightbox);
      $('#lightbox').slideDown(500);
    }

  });


  $('#lightbox').live('click', function() {
    $('#lightbox').hide(200);
  });

});
/*标签页功能实现 开始*/

function CreateDiv(tabid, url, name) {

  if (document.getElementById("div_" + tabid) == null) {

    var box = document.createElement("iframe");
    box.id = "div_" + tabid;
    box.src = url;
    box.height = "100%";
    box.frameBorder = 0;
    box.scrolling = "no";
    box.width = "100%";
    document.getElementById("div_pannel").appendChild(box);


    var tablist = document.getElementById("div_tab").getElementsByTagName("li");
    var pannellist = document.getElementById("div_pannel").getElementsByTagName("iframe");
    if (tablist.length > 0) {
      for (i = 0; i < tablist.length; i++) {
        tablist[i].className = "nocrent";
        pannellist[i].style.display = "none";
      }
    }


    var tab = document.createElement("li");
    tab.className = "crent";
    tab.id = tabid;
    var litxt = '<span><a href="javascript:;" onclick=\'javascript:CreateDiv("' + tabid + '","' + url + '","' + name + '")\' title="' + name + '" class="menua">' + name + '</a><a onclick="RemoveDiv(\'' + tabid + '\')" class="win_close" title="关闭"><a></span>';
    tab.innerHTML = litxt;
    document.getElementById("div_tab").appendChild(tab);
  } else {
    var tablist = document.getElementById("div_tab").getElementsByTagName("li");
    var pannellist = document.getElementById("div_pannel").getElementsByTagName("iframe");
    //alert(tablist.length);
    for (i = 0; i < tablist.length; i++) {
      tablist[i].className = "nocrent";
      pannellist[i].style.display = "none"
    }
    document.getElementById(tabid).className = "crent";
    document.getElementById("div_" + tabid).style.display = "block";
  }
}

function RemoveDiv(obj) {
  var ob = document.getElementById(obj);
  ob.parentNode.removeChild(ob);
  var obdiv = document.getElementById("div_" + obj);
  obdiv.parentNode.removeChild(obdiv);
  var tablist = document.getElementById("div_tab").getElementsByTagName("li");
  var pannellist = document.getElementById("div_pannel").getElementsByTagName("iframe");
  if (tablist.length > 0) {
    tablist[tablist.length - 1].className = "crent";
    pannellist[tablist.length - 1].style.display = "block";
  }
}
/*标签页功能实现 结束*/
$(function() {
  $("#adminInfo").click(function() {
    var title = $(this).attr("data-title");
    var href = $(this).attr("data-href");
    $(".modal-body").empty();
    $(".modal h3").text(title);
    $(".modal-body").load(href);
  });
  $("#citizenSearch td a").click(function() {
    var title= $(this).attr("data-title");
    var data_href= $(this).attr("data-href");
    top.$("#public").click();
    top.$(".modal-body").empty();
    top.$(".modal h3").text(title);
    top.$(".modal-body").load(data_href);
  });
})