

# this script is used to update the "map_info.js" file based on
# local video files in the "videos" directory

import os

def main():

    maps = ["Ancient", "Anubis", "Dust II", "Inferno", "Mirage", "Nuke", "Vertigo"]

    f = open("map_info.js", "w")
    f.write('all_maps = ' '{' + '\n\t')

    for map in maps:
        for root, dirs, files in os.walk("videos/" + map):
            # "map": [maps]
            f.write("\"" + map + "\": ")
            f.write("[")
            for file in files:
                f.write("\"" + file + "\"" + ",")
            f.write("],\n\t")
    
    f.write("}")

    f.close()

if __name__ == "__main__":
    main()