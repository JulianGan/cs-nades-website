

# this script is used to update the "player_info.js" file based on
# local player info in the "player_info" directory

import os
from collections import defaultdict

def update_player_info():

    maps = ["Ancient", "Anubis", "Dust II", "Inferno", "Mirage", "Nuke", "Vertigo"]
    all_player_info = []

    f = open("player_info.js", "w")
    f.write("all_player_info = {\n\t")

    for file_name in os.listdir("player_info"):
        file = open("player_info/" + file_name, "r")
        file_content = file.read().splitlines()
        file.close()
        player_dict = defaultdict(list)

        for line in file_content:
            map_name, lineup = line.split(" ")[0], line.split(" ")[1]
            player_dict[map_name].append(lineup)
        all_player_info.append((file_name.replace(".txt", ""), player_dict))
    
    for player_entry in all_player_info:
        player_name, plays = player_entry
        f.write("\"" + player_name + "\":{\n\t")
        for map in maps:
            f.write("\"" + map + "\": [")
            for play in plays[map]:
                f.write("\"" + play + ".mp4\",")
            f.write("],\n\t")
        f.write("},\n\t")
    f.write("}")

    f.close()

if __name__ == "__main__":
    update_player_info()