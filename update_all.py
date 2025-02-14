import os
from collections import defaultdict

def update_map_descriptions():

    f.write('all_maps_descriptions = ' '{' + '\n\t')

    for map in maps:
        for root, dirs, files in os.walk("videos/" + map + "/text_descriptions"):
            # print("1.", root)
            # print("2.", dirs)
            # print("3.", files)
            f.write("\"" + map + "\": ")
            f.write("{\n\t\t")
            for file in files:
                f.write("\"" + file + "\"" + ": ")
                text_file = open("videos/" + map + "/text_descriptions/" + file, "r")
                text_description = text_file.read()
                text_file.close()
                f.write("\"" + text_description + "\",\n\t\t")
            f.write("},\n\t")
    
    f.write("}\n")

def update_map_info():

    f.write('all_maps = ' '{' + '\n\t')

    for map in maps:
        f.write("\"" + map + "\": [")
        for file in os.listdir("videos/" + map):
            if file == "text_descriptions": continue
            f.write("\"" + file + "\", ")
        f.write("],\n\t")
    
    f.write("}\n")

def update_player_info():

    all_player_info = []

    f.write("all_player_info = {\n\t")

    for file_name in os.listdir("player_info"):
        file = open("player_info/" + file_name, "r")
        file_content = file.read().splitlines()
        file.close()
        player_dict = defaultdict(list)

        for line in file_content:
            map_name, lineup = line.split(" ")[0], line.split(" ")[1]
            if line.split(" ")[0] == "Dust":
                map_name += " " + lineup
                lineup = line.split(" ")[2]
            player_dict[map_name].append(lineup)
        all_player_info.append((file_name.replace(".txt", ""), player_dict))
    
    for player_entry in all_player_info:
        player_name, plays = player_entry
        f.write("\"" + player_name + "\":{\n\t")
        for map in maps:
            f.write("\t\"" + map + "\": [")
            for play in plays[map]:
                f.write("\"" + play + ".mp4\",")
            f.write("],\n\t")
        f.write("},\n\t")

    f.write("}\n")

if __name__ == "__main__":
    global f
    global maps
    maps = ["Ancient", "Anubis", "Dust II", "Inferno", "Mirage", "Nuke", "Train"]
    f = open("meta_info.js", "w")
    update_map_info()
    update_map_descriptions()
    update_player_info()
    f.close()