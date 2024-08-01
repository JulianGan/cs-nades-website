

# this script is used to update the "map_descriptions.js" file based on
# local text files in the "videos/../text_descriptions" directory

import os

def update_map_descriptions():

    maps = ["Ancient", "Anubis", "Dust II", "Inferno", "Mirage", "Nuke", "Vertigo"]

    f = open("map_descriptions.js", "w")
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
    
    f.write("}")

    f.close()

if __name__ == "__main__":
    update_map_descriptions()