
//save data

const DATA_NAME = "TRACKER";

const TRACKER_DATA_TEMP =
{
    rakuten:
    {
        healthcare: true,//仮
        senior: false,
        browser: false,
        point_club: false ,
    }
}

var json_data_tracker = TRACKER_DATA_TEMP;//null入れたかったが事故防止でテンプレ代入

function load_data() {
    var jsonStr = localStorage.getItem(DATA_NAME);
    document.getElementById("command_log").innerText = jsonStr;
    if (jsonStr === null) 
    {
        json_data_tracker = TRACKER_DATA_TEMP;
        const jsonData = JSON.stringify(json_data_tracker);
        localStorage.setItem(DATA_NAME, jsonData);
    }else
    {
        json_data_tracker = JSON.parse(jsonStr);
    }

    document.getElementById("rakuten_healthcare").checked = json_data_tracker["rakuten"]["healthcare"];
    document.getElementById("rakuten_senior").checked = json_data_tracker["rakuten"]["senior"];
    document.getElementById("rakuten_browser").checked = json_data_tracker["rakuten"]["browser"];
    document.getElementById("rakuten_point_club").checked = json_data_tracker["rakuten"]["point_club"];
}

function save_data() {
    json_data_tracker["rakuten"]["healthcare"] = document.getElementById("rakuten_healthcare").checked;
    json_data_tracker["rakuten"]["senior"] = document.getElementById("rakuten_senior").checked;
    json_data_tracker["rakuten"]["browser"] = document.getElementById("rakuten_browser").checked ;
    json_data_tracker["rakuten"]["point_club"] = document.getElementById("rakuten_point_club").checked;
    const jsonData = JSON.stringify(json_data_tracker);
    localStorage.setItem(DATA_NAME, jsonData);

    document.getElementById("command_log").innerText = jsonData;
}

load_data();