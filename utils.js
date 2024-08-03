function create_button(__class__, __id__, __innerHTML__, __onclick__){
    // str, str, str, fun
    let b = document.createElement("button");
    if (__class__)     b.className = __class__;
    if (__id__)        b.id        = __id__;
    if (__innerHTML__) b.innerHTML = __innerHTML__;
    if (__onclick__)   b.onclick   = __onclick__;
    return b;
}

function create_video(__src__, __width__, __height__){
    let v = document.createElement("video");
    v.controls = true;
    v.preload = "none";
    v.poster = __src__.replace("videos/", "images/").replace("mp4", "png");
    if (__src__)    v.src    = __src__;
    if (__width__)  v.width  = __width__;
    if (__height__) v.height = __height__;
    return v
}

function get_video_div(__src__, title, text_description){
    let d = document.createElement("div");
    d.append(create_video(__src__, 400, 280));
    d.className = "make_inline_block add_right_padding add_bottom_padding";

    let caption = document.createElement("p");
    caption.className = "add_font_size_14 generic_text_class";
    caption.innerHTML = "<b>" + title + "</b>";
    d.append(caption);

    if (text_description){
        let t = document.createElement("p");
        t.className = "add_font_size_11 generic_text_class";
        t.innerHTML = text_description;
        d.append(t);
    } else {
        let t = document.createElement("p");
        t.className = "add_font_size_11 generic_text_class";
        t.innerHTML = " ";
        d.append(t);
    }

    return d;
}

function get_main_videos(){
    let main_videos = document.createElement("div");
    main_videos.id = "main_video_content";
    main_videos.className = "";
    let map_name = maps[curr_map - 1];
    if (curr_player == 1) var lineups = all_maps[map_name];
    else var lineups = all_player_info[players[curr_player - 1]][map_name];
    for (let i = 0; i < lineups.length; i++){
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