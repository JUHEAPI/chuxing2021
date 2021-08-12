var resultInfo2 = null;
var appKey2 = 'ea3295121216b176e1a6b8af7fcd3dcf';

getCurrent2();

$('.city-title').on('click', function(){
  weui.picker(
    cityData2, {
      defaultValue: [2, 1],
      onConfirm: function (result) {
        if(result[0].label == result[1].label) {
          $('.city-title').html(result[0].label);
        } else {
          $('.city-title').html(result[0].label + ' ' + result[1].label);
        }
        hsjcFn(result[1].value);
        $('.search').val('')
      }
    }
  );
})

// 搜索
$('.search').on('change', function(){
  $('.loading').fadeIn(10).fadeOut(300)
  var keyInput = $(this).val();
  var len = $('.list-item').length;
  for (var i = 0; i < len; i++) {
    var searchText = $('.list-item:eq(' + i + ')').find('.address').html() + $('.list-item:eq(' + i + ')').find('.dt-name').html();
    var reg = new RegExp(keyInput, 'i');
    if (searchText.match(reg)) {
      $('.list-item:eq(' + i +')').show()
    } else {
      $('.list-item:eq(' + i + ')').hide();
    }
  }
})

//当前城市核算检测机构
function getCurrent2(){
  $('.loading').show();
  $.ajax({
    type: "get",
    async: true,
    url: 'https://apis.juhe.cn/springTravel/currentHsjg?key='+appKey2+'&nid='+getQueryVariable("nid"),
    dataType: "jsonp",
    jsonp: "callback",
    success: function (res) {
      $('.loading').fadeOut(200);
      resultInfo2 = res.result && res.result.data
      $('.city-title').html(res.result.province +' '+ res.result.city);
      var hsjcStr = ''
      if(resultInfo2){
        for (item in resultInfo2) {
          hsjcStr += `
            <div class="list-item">
              <dl>
                <dt class="dt-name">${resultInfo2[item].name}</dt>
                <dd>所在区县：${resultInfo2[item].province}${resultInfo2[item].city}</dd>
                <dd>联系电话：<a href='tel:${resultInfo2[item].phone}'>${resultInfo2[item].phone}</a></dd>
                <dd><em>详细地址：</em><span class="address">${resultInfo2[item].address}</span></dd>
              </dl>
            </div>
          `
        }
        $('#institution').html(hsjcStr)
      } else {
        $('#institution').html('')
      }
    },
    error: function(){
      $('.loading').fadeOut(200)
    }
  })
}

//获取检测机构
function hsjcFn(cityCode){
  $.ajax({
    type: "get",
    async: true,
    url: 'https://apis.juhe.cn/springTravel/hsjg?key='+appKey2+'&city_id='+cityCode,
    dataType: "jsonp",
    jsonp: "callback",
    success: function (res) {
      resultInfo2 = res.result && res.result.data
      var hsjcStr = ''
      if(resultInfo2){
        for (item in resultInfo2) {
          hsjcStr += `
            <div class="list-item">
              <dl>
                <dt class="dt-name">${resultInfo2[item].name}</dt>
                <dd>所在区县：${resultInfo2[item].province}${resultInfo2[item].city}</dd>
                <dd>联系电话：<a href='tel:${resultInfo2[item].phone}'>${resultInfo2[item].phone}</a></dd>
                <dd><em>详细地址：</em><span class="address">${resultInfo2[item].address}</span></dd>
              </dl>
            </div>
          `
        }
        $('#institution').html(hsjcStr)
      } else {
        $('#institution').html('')
      }
    },
    error: function() {
      $('.loading').fadeOut(200)
    }
  });

}