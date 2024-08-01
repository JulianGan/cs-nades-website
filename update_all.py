from update_map_info import update_map_info
from update_map_descriptions import update_map_descriptions
from update_player_info import update_player_info

def update_all():
    update_map_info()
    update_map_descriptions()
    update_player_info()

if __name__ == "__main__":
    update_all()