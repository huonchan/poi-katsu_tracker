
//save data

const DATA_NAME = "TRACKER";

const PROPERTY_DATA =
{
    "move":
    {
        "text": {
            "div": "class='tracker'",
            "value": "散歩前確認事項",
            "事項":
            {
                "div": "class='tracker'",
                "kurashiru": { "id": "kurashiru_move", "label": "クラシルリワード", "checkbox": false },//仮
                "walkcoin": { "id": "walkcoin_sugoroku", "label": "アルコイン", "checkbox": false },
                "powl": { "id": "powl_move", "label": "Powl", "checkbox": false },
                "torima": { "id": "torima_move", "label": "トリマ", "checkbox": false },
                "prari": { "id": "prari_move", "label": "プラリー", "checkbox": false },
            }

        },


    },
    "1day":
    {
        "text": {
            "div": "class='tracker'",
            "value": "1日1回",
            "0:00": {
                "div": "class='tracker'",
                "value": "0:00リセット",
                "楽天": {
                    "div": "class='tracker'",
                    "value": "楽天系",
                    "楽天メイン":
                    {
                        "div": "class='tracker'",
                        "楽天Webくじ": { "id": "rakuten_web_kuzi", "label": "Webくじ", "checkbox": false },
                        "楽天ヘルスケア": { "id": "rakuten_healthcare", "label": "ヘルスケア", "checkbox": false },
                        "楽天シニア": { "id": "rakuten_senior", "label": "シニア", "checkbox": false },
                        "楽天browser": { "id": "rakuten_browser", "label": "ブラウザ", "checkbox": false },
                        "楽天PointClub": { "id": "rakuten_point_club", "label": "PointClub", "checkbox": false },
                        "楽天infoseek": { "id": "rakuten_infoseek", "label": "infoseek", "checkbox": false },
                    },
                    "楽天モールWeb": {
                        "div": "class='tracker'",
                        "id": "rakuten_mall_web", "value": "モール(Web)",
                        "おみくじ": { "id": "rakuten_mall_omikuzi", "label": "おみくじ", "checkbox": false },
                        "スクラッチ": { "id": "rakuten_mall_scratch", "label": "Scratch", "checkbox": false },
                        "ガチャ": { "id": "rakuten_mall_gacha", "label": "ガチャ", "checkbox": false },
                        "じゃんけん": { "id": "rakuten_mall_janken", "label": "じゃんけん", "checkbox": false },
                        "ビンゴ": { "id": "rakuten_mall_bingo", "label": "ビンゴ", "checkbox": false },
                    }
                },

                "Ponta系": {
                    "div": "class='tracker'",
                    "value": "Ponta系",
                    "Ponta": {
                        "div": "class='tracker'",
                        "ローソン": { "id": "Lawson_kuzi", "label": "ローソンのガラガラ", "checkbox": false },
                        "Pontaマンガ": { "id": "Lawson_kuzi", "label": "Pontaマンガログイン", "checkbox": false },
                        "Pontaくじ": { "id": "Lawson_kuzi", "label": "Pontaはっぱクジ", "checkbox": false },
                    },
                },

                "その他": {
                    "div": "class='tracker'",
                    "value": "その他",
                    "empty": {
                        "div": "class='tracker'",
                        "クラシルリワード": { "id": "kurasiru_reward_walk_count", "label": "クラシルリワード歩数", "checkbox": false },
                        "MoneyWalk": { "id": "money_walk_count", "label": "MoneyWalk", "checkbox": false },
                    },
                },

            },
            "3:00": {

                "その他": {
                    "div": "class='tracker'",
                    "value": "3:00リセット",
                    "その他":
                    {
                        "div": "class='tracker'",
                        "Powl": { "id": "powl_walk_count", "label": "Powl歩数", "checkbox": false },
                        "トリマ": { "id": "torima_walk_count", "label": "トリマ歩数", "checkbox": false },
                        "プラリー": { "id": "purari_walk_count", "label": "プラリー歩数", "checkbox": false },
                        "bitwalk": { "id": "bit_walk_count", "label": "BitWalk歩数", "checkbox": false },
                    }

                },

            }
        },

    },


}

var propert_data = PROPERTY_DATA;//null入れたかったが事故防止でテンプレ代入

var scriptHtml = "";

function read_property(property) {
    var s = "";
    var e = "";
    var html = '';
    var id = '';
    for (const key in property) {
        var value = property[key];
        //str += `${key}`;
        switch (key) {
            case "":
                //未設定は無視
                break;
            case "div":

                s = `<div ${value}> ${s}`;
                e = `${e} </div>`

                break;
            case "id":
                id = value;
                break;
            case "class":
                //todo:使う時になったら

                break;
            case "value":
                html += `${value}`;
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

    return `${s} ${html} ${e}`;
}

function create_rakuten_html() {

    {
        const h = read_property(propert_data["move"]);
        //document.getElementById("command_log").innerText = h;
        document.getElementById("move_area").innerHTML = h;
    }

    {
        document.getElementById("1day_area").innerHTML = read_property(propert_data["1day"]);
    }

    {
        const script = document.createElement('script');
        script.text = `${scriptHtml}`; // scriptタグの内容を直接記述する場合
        document.body.appendChild(script);
    }

}

function load_data() {
    create_rakuten_html();
}

load_data();