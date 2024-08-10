let players = ["All", "Andy", "Daniel", "Futao", "Julian", "Ling"];
let maps = ["Ancient", "Anubis", "Dust II", "Inferno", "Mirage", "Nuke", "Vertigo"];
let utils = ["All", "smoke", "molly", "flash"]

function init_map_buttons(){
    for (let i = 1; i <= maps.length; i++){
        document.getElementById("map_options").append(create_button(
            "map_button button-unfocused",    // class
            "map_option_" + i,                // id
            maps[i - 1],                      // innerHTML
            function(){ click_map_button(i) } // onclick
        ));
    }
}

function init_player_buttons(){
    for (let i = 1; i <= players.length; i++){
        document.getElementById("player_options").append(create_button(
            "player_button button-unfocused",    // class
            "player_option_" + i,                // id
            players[i - 1],                      // innerHTML
            function(){ click_player_button(i) } // onclick
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

init_map_buttons();
init_player_buttons();
init_util_filters();

let curr_map = 0;
let curr_player = 0;
let util_type = 0;
click_player_button(1);
select_util_fitler_button(0);

// emoji's
// playmaker, with map hud indicator and collection of lineups
// video 6 frame thumbnail
