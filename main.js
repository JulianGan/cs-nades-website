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
    if (__src__)    v.src    = __src__;
    if (__width__)  v.width  = __width__;
    if (__height__) v.height = __height__;
    return v
}

function main_content(){
    if (!curr_map || !curr_player) return; // fix this later


}

function update_main_content(){

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

let curr_map = 0;
let curr_player = 0;

let players = ["Andy", "Daniel", "Futao", "Julian", "Ling"];
let maps = ["Ancient", "Anubis", "Dust II", "Inferno", "Mirage", "Nuke", "Vertigo"];

for (let i = 1; i <= maps.length; i++){
    document.getElementById("map_options").append(create_button(
        "map_button button-unfocused",    // class
        "map_option_" + i,                // id
        maps[i - 1],                      // innerHTML
        function(){ click_map_button(i) } // onclick
    ));
}

for (let i = 1; i <= players.length; i++){
    document.getElementById("player_options").append(create_button(
        "player_button button-unfocused",    // class
        "player_option_" + i,                // id
        players[i - 1],                      // innerHTML
        function(){ click_player_button(i) } // onclick
    ))
}

for (let map_key of Object.keys(all_maps)){
    for (let i = 0; i < all_maps[map_key].length; i++){
        document.getElementById("main_video_content").append(create_video(
            "videos/" + map_key + "/" + all_maps[map_key][i], 400, 280
        ))
    }
}

// emoji's
// playmaker, with map hud indicator and collection of lineups
