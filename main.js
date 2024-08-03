let players = ["All", "Andy", "Daniel", "Futao", "Julian", "Ling"];
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

let curr_map = 0;
let curr_player = 0;
click_player_button(1);

// emoji's
// playmaker, with map hud indicator and collection of lineups

// video 6 frame thumbnail
// video load on click
// util filter
