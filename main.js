let players = ["All", "Andy", "Daniel", "Futao", "Julian", "Ling"];
let maps = ["Ancient", "Anubis", "Dust II", "Inferno", "Mirage", "Nuke", "Train"];
let utils = ["All", "smoke", "molly", "flash"]

function create_button(__class__, __id__, __innerHTML__, __onclick__){
    // str, str, str, fun
    let b = document.createElement("button");
    b.className = __class__;
    b.id        = __id__;
    b.innerHTML = __innerHTML__;
    b.onclick   = __onclick__;
    return b;
}

function create_video_title(title){
    // str
    let t = document.createElement("p");
    t.className = "add_font_size_14 generic_text_class";
    t.innerHTML = "<b>" + title + "</b>";
    return t;
}

function create_text_description(text){
    // str
    let p = document.createElement("p");
    p.className = "add_font_size_11 generic_text_class";
    p.innerHTML = text;
    return p;
}

function create_video(__src__){
    // str
    let v = document.createElement("video");
    v.controls = true;
    v.preload = "none";
    v.poster = __src__.replace("videos/", "images/").replace("mp4", "png");
    v.width  = 400;
    v.height = 280;
    v.src = __src__;
    return v;
}

function get_video_div(__src__, title, text_description){
    // str, str, str
    let d = document.createElement("div");
    d.className = "make_inline_block add_right_padding";

    d.append(create_video(__src__));
    d.append(create_video_title(title));
    if (text_description) d.append(create_text_description(text_description));

    return d;
}

function get_main_videos(){
    let main_videos = document.createElement("div");
    main_videos.id = "main_video_content";
    let map_name = maps[curr_map - 1];
    if (curr_player == 1) var lineups = all_maps[map_name];
    else var lineups = all_player_info[players[curr_player - 1]][map_name];
    for (let i = 0; i < lineups.length; i++){
        // apply util type filter
        if (util_type){
            if (!lineups[i].includes(utils[util_type])) continue;
        }
        // add util
        main_videos.append(get_video_div(
            "videos/" + map_name + "/" + lineups[i], 
            lineups[i].replaceAll("-", " ").replaceAll(".mp4", ""),
            all_maps_descriptions[map_name][lineups[i].replaceAll(".mp4", ".txt")]
        ));
    }
    return main_videos;
}

function update_main_content(){
    if (!curr_map || !curr_player){
        return;
    }
    let main_video_content = document.getElementById("main_video_content");
    main_video_content.replaceWith(get_main_videos());
}

function click_player_button(player_number){
    if (curr_player){
        document.getElementById("player_option_" + curr_player).classList.remove("button-focus");
        document.getElementById("player_option_" + curr_player).classList.add("button-unfocused");
    }
    curr_player = (curr_player == player_number) ? 0 : player_number;
    if (curr_player){
        document.getElementById("player_option_" + curr_player).classList.remove("button-unfocused");
        document.getElementById("player_option_" + curr_player).classList.add("button-focus");
    }
    update_main_content();
}

function click_map_button(map_number){
    if (curr_map){
        document.getElementById("map_option_" + curr_map).classList.remove("button-focus");
        document.getElementById("map_option_" + curr_map).classList.add("button-unfocused");
    }
    curr_map = (curr_map == map_number) ? 0 : map_number;
    if (curr_map){
        document.getElementById("map_option_" + map_number).classList.remove("button-unfocused");
        document.getElementById("map_option_" + map_number).classList.add("button-focus");
    }
    update_main_content();
}

function select_util_fitler_button(button_num){
    if (button_num == util_type) return;
    document.getElementById("util_filter_option_" + util_type).classList.remove("button-focus");
    document.getElementById("util_filter_option_" + util_type).classList.add("button-unfocused");
    util_type = button_num;
    document.getElementById("util_filter_option_" + util_type).classList.remove("button-unfocused");
    document.getElementById("util_filter_option_" + util_type).classList.add("button-focus");
    update_main_content();
}

function init_map_buttons(){
    for (let i = 1; i <= maps.length; i++){
        document.getElementById("map_options").append(create_button(
            "map_button button-unfocused",    // class
            "map_option_" + i,                // id
            maps[i - 1],                      // innerHTML
            function(){ click_map_button(i); } // onclick
        ));
    }
}

function init_player_buttons(){
    for (let i = 1; i <= players.length; i++){
        document.getElementById("player_options").append(create_button(
            "player_button button-unfocused",    // class
            "player_option_" + i,                // id
            players[i - 1],                      // innerHTML
            function(){ click_player_button(i); } // onclick
        ))
    }
}

function init_util_filters(){
    let util_filter_div = document.getElementById("util_filter");
    let tmp = document.createElement("p");
    tmp.className = "add_font_size_20 generic_text_class make_inline_block add_right_padding";
    tmp.innerHTML = "Filter by util:";
    util_filter_div.append(tmp);
    for (let i = 0; i < utils.length; i++){
        util_filter_div.append(create_button(
            "util_filter_button button-unfocused",
            "util_filter_option_" + i,
            utils[i],
            function() { select_util_fitler_button(i) },
        ));
    }
    document.getElementById("util_filter_option_0").classList.add("button-focus");
}

function init_play_maker_div(){
    let play_maker_div = document.getElementById("play_maker");
    play_maker_div.style.position = "fixed";
    play_maker_div.style.left = 2 + "%";
    play_maker_div.style.top = 90 + "%";
    play_maker_div.append(create_button(
        "util_filter_button add_hover_color",
        "play_maker_button",
        "Start Play Maker",
        function (){ window.open("play_maker.html", "_blank").focus(); },
    ))
};


init_map_buttons();
init_player_buttons();
init_util_filters();
// init_play_maker_div(); DEPRECATED

let curr_map = 0;
let curr_player = 0;
let util_type = 0;
click_player_button(1);
select_util_fitler_button(0);

// Dust II B lurk smoke