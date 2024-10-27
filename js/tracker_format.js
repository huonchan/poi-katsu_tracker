
//save data

const DATA_NAME = "TRACKER";

const PROPERTY_DATA =
{
    rakuten:
    {
        "text": { "value": "楽天" },
        "child":
        {
            "healthcare": { "id": "rakuten_healthcare", "label": "ヘルスケア", "checkbox": false },//仮
            "senior": { "id": "rakuten_senior", "label": "シニア", "checkbox": false },
            "browser": { "id": "rakuten_browser", "label": "ブラウザ", "checkbox": false },
            "point_club": { "id": "rakuten_point_clab", "label": "PointClub", "checkbox": false },
        }
    }
};

var propert_data = PROPERTY_DATA;//null入れたかったが事故防止でテンプレ代入

var scriptHtml = "";
var rakutenHtml = "";

function read_property(property) {
    var html = '';
    var id = '';
    for (const key in property) {
        var value = property[key];
        //str += `${key}`;
        switch (key) {
            case "id":
                id = value;
                break;
            case "class":
                //todo:使う時になったら

                break;
            case "value":
                html += `<div id="${id}">${value}</div>`;
                break;
            case "label":
                html += `<label for="${id}">${value}</label>`;
                //str += `<div> ${value} </div>`;
                break;
            case "checkbox":
                html += `<input type="checkbox" id="${id}" name="${id}" value="value">`;
                scriptHtml += `
                
                {
                    const checkbox = document.getElementById('${id}'); 

                    var v = localStorage.getItem("${id}");
                    if( v != null)
                    {
                        checkbox.checked = v ;
                    }

                    checkbox.addEventListener('change', function() {
                        localStorage.setItem("${id}", this.checked);
                    });
                }
                
                `;
                break;
            default: //property name
                //str += `key: ${key}, value: ${property[key]}`;
                html += read_property(property[key]);
                //read_property(property[key]);
                break;
        }

    }

    return html;
}

function create_rakuten_html() {
    var log = ``;
    rakutenHtml = read_property(propert_data["rakuten"]);
    // document.getElementById("command_log").innerText = log;

    document.getElementById("rakuten").innerHTML = rakutenHtml;
    const script = document.createElement('script');
    script.text = `${scriptHtml}`; // scriptタグの内容を直接記述する場合
    document.body.appendChild(script);
}

function load_data() {
    create_rakuten_html();
}

load_data();