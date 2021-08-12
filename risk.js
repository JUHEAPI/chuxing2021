//中高风险地区查询
citySearch()
function citySearch () {
  $.ajax({
    type: "get",
    async: true,
    url: 'https://apis.juhe.cn/springTravel/risk?key='+appKey,
    dataType: "jsonp",
    jsonp: "callback",
    success: function (res) {
      var resData = res.result;
      var highCity = res.result.high_list || [];
      var middleCity = res.result.middle_list || [];
      var highHtml = '<p class="high-p">高风险地区</p>';
      var middleHtml = '<p class="middle-p">中风险地区</p>';
      var topHtml = '';
      topHtml = `
        <p class="top-time">截至 ${resData.updated_date.slice(0, 13)}时，全国疫情：</p>
        <div class="city-desc">
          <dl class="left-desc">
            <dt><em>${resData.high_count}</em>个</dt>
            <dd>高风险等级地区</dd>
          </dl>
          <dl class="right-desc">
            <dt><em>${resData.middle_count}</em>个</dt>
            <dd>中风险等级地区</dd>
          </dl>
        </div>
        <p class="other-desc">其余未列出地区均为低风险。</p>
        <div class="top-desc">由国家卫生健康委每日汇总各地报送疫情风险等级数据。</div>
      `
      $('.top-section').html(topHtml)

      for (item in highCity) {
        highHtml += `
        <dl class="city-box">
          <dt>${highCity[item].area_name}</dt>
          ${
            highCity[item].communitys.map(function(list){
              return `<dd><span>${list}</span><em>高风险</em></dd>`
            }).join('')
          }
        </dl>`
      }
      $('.high-content').html(highHtml)

      for (item in middleCity) {
        middleHtml += `
          <dl class="city-box">
            <dt>${middleCity[item].area_name}</dt>
            ${
              middleCity[item].communitys.map(function(list){
                return `<dd><span>${list}</span><em>中风险</em></dd>`
              }).join('')
            }
          </dl>`
      }

      $('.middle-content').html(middleHtml)

    },
    error: function() {
      console.log('失败')
    }
  })
}