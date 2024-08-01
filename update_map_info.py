

# this script is used to update the "map_info.js" file based on
# local video files in the "videos/.." directory

import os

def update_map_info():

    maps = ["Ancient", "Anubis", "Dust II", "Inferno", "Mirage", "Nuke", "Vertigo"]

    f = open("map_info.js", "w")
    f.write('all_maps = ' '{' + '\n\t')

    for map in maps:
        f.write("\"" + map + "\": [")
        for file in os.listdir("videos/" + map):
            if file == "text_descriptions": continue
            f.write("\"" + file + "\", ")
        f.write("],\n\t")
    
    f.write("}")

    f.close()

if __name__ == "__main__":
    update_map_info()