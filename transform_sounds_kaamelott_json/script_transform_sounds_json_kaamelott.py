import json

# Open the current json file
with open("sounds_a_changer.json", encoding="utf-8") as file:
    current_json_file = json.load(file)

# Initialize the new array with the file name as snake_case keys
new_json_file = {}
for i in range(len(current_json_file)):
    file_name = current_json_file[i]["file"].replace(".mp3", "")
    new_json_file[file_name] = {}

# Extract and transform from the current Json file
compteur = 0
id = 1
for key in new_json_file:
    new_json_file[key]["id"] = id
    new_json_file[key]["file_name"] = current_json_file[compteur]["file"].replace(".mp3", "")
    new_json_file[key]["path"] = "sounds/" + current_json_file[compteur]["file"]
    new_json_file[key]["quote"] = current_json_file[compteur]["title"]
    new_json_file[key]["author"] = current_json_file[compteur]["character"]
    episode_complete = current_json_file[compteur]["episode"].split(" ")
    new_json_file[key]["season"] = episode_complete[1].replace(",", "")
    new_json_file[key]["episode_number"] = episode_complete[2]
    new_json_file[key]["episode_name"] = " ".join(episode_complete[4:])
    compteur += 1
    id += 1

print(new_json_file)

# Load data to the new Json file

with open("sounds.json", "w", encoding="utf-8") as nouveau:
    json.dump(new_json_file, nouveau, ensure_ascii=False)

if __name__ == "__main__":
    print("tarace")
