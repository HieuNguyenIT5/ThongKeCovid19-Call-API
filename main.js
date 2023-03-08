var today = document.querySelector("#today");
var City = document.querySelector("#city");
var Btn = document.querySelector("#btn");
var input = document.querySelector("#input");
var data;
function removeAccents(str) {
    var AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ", "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ"    
    ];
    for (var i=0; i<AccentsMap.length; i++) {
      var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
  }
async function Getdatacovid()
{
    let apiUrl = 'https://static.pipezero.com/covid/data.json';
    data = await fetch(apiUrl).then(res=> res.json());  
    var lenLocation = data.locations.length;  
    var allCity = "<option value='world'>Thế giới</option><option value='internal'>Việt Nam</option>";
    for(var i = 0; i< lenLocation; i++)
    {
        var item_option = "<option value='"+i+"'>" + data.locations[i].name + "</option>";
        allCity = allCity + item_option;
    }
    City.innerHTML = allCity;
    today.innerHTML =
    "<td class = 'today1'>"+ data.today.world.cases + "</td>"+ 
    "<td class = 'today2'>"+ data.today.world.recovered + "</td>"+
    "<td class = 'today3'>"+ data.today.world.death + "</td>";  
}
Getdatacovid();
var cityId = 0;
function showData(){

    document.querySelector('.change2').innerHTML = "Khỏi bệnh";
    if(cityId == "world")
    {
        today.innerHTML =
        "<td class = 'today1'>"+ data.today.world.cases + "</td>"+  
        "<td class = 'today2'>"+ data.today.world.recovered + "</td>"+
        "<td class = 'today3'>"+ data.today.world.death + "</td>";
    }
    else if(cityId == "internal")
    {
        today.innerHTML =
        "<td class = 'today1'>"+ data.today.internal.cases + "</td>"+  
        "<td class = 'today2'>"+ data.today.internal.recovered + "</td>"+
        "<td class = 'today3'>"+ data.today.internal.death + "</td>";
    }
    else{
        document.querySelector(".change2").innerHTML = "Công bố hôm qua";
        document.querySelector(".change1").innerHTML = "Tổng số ca nhiễm";
        today.innerHTML =
            "<td class = 'today1'>"+ data.locations[cityId].cases + "</td>"+  
            "<td class = 'today2'>"+ data.locations[cityId].casesToday + "</td>"+
            "<td class = 'today3'>"+ data.locations[cityId].death + "</td>";
    }
    input.value = data.locations[cityId].name;
}
function selectCity(){
    cityId = City.value;
    showData();
}
function searchCity(){
    inputSearch = removeAccents(input.value.toLowerCase());
    for(var i = 0; i< data.locations.length; i++)
        {
            cityData = removeAccents(data.locations[i].name.toLowerCase());
            if(cityData.search(inputSearch) != -1)
            {
                cityId = i;
                break;
            }
        }
    showData();
    City.value = cityId;
    return 0;
}
Btn.addEventListener('click', searchCity);
input.addEventListener('keyup', function(e){
    if(e.keyCode == 13){
        searchCity();
    }
});
City.addEventListener('change',selectCity);

