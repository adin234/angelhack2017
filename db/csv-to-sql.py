import requests
import json

FOOD_CSV = "food.csv"
RESTO_CSV = "restaurants.csv"

FOOD_OUT_SQL = "food.sql"
RESTO_OUT_SQL = "resto.sql"

GOOGLE_DISTANCE_API_KEY = "AIzaSyDJGu2Kko0WkUdGfXsihMes2Mmlt_iQQ7Y"

def food_csv_to_obj():
    '''
        food,restaurant,price,tag1,tag2
    '''
    foods = []

    def parse(line):
        columns = line.split(',')
        tags = list(map(lambda x: x.strip(), columns[-1].split('-')))
        
        if len(columns) == 4:
            return {
                "id": len(foods),
                "food": columns[0].strip(),
                "resto": columns[1].strip(),
                "price": columns[2].strip(),
                "tags": tags
            }
        else:
            return False

    file = open(FOOD_CSV, "r")
    foods = []
    for line in file:
        data = parse(line)
        if data != False:
            foods.append(data)
    file.close()
    return foods

resto_to_id = {}

def compute_resto_distances(restos):
    CITY = "BGC"
    ORIGIN = "Ecotower BGC"
    REQUEST_TEMPLATE = "https://maps.googleapis.com/maps/api/distancematrix/json?origins={origin}&destinations={destinations}&key={api_key}"
    resto_names = "|".join(list(map(lambda o: o["resto"].replace(' ', '%20').replace('&', '%26') + "+" + CITY, restos)))
    req = REQUEST_TEMPLATE.format(origin = ORIGIN, destinations = resto_names, api_key = GOOGLE_DISTANCE_API_KEY)
    get_response = requests.get(req).json()
    return list(map(lambda o: o["distance"]["value"] / 1000, get_response["rows"][0]["elements"]))

def resto_csv_to_obj():
    file = open(RESTO_CSV, "r")
    restos = []

    def parse(line):
        if len(line.strip()) == 0:
            return False
        else:
            return {
                "resto": line.strip(),
                "id": len(restos)
            }
    for line in file:
      data = parse(line)  
      if data != False:
          restos.append(data)
          resto_to_id[data["resto"]] = data["id"]

    distances = compute_resto_distances(restos)

    for i in range(len(restos)):
        restos[i]["distance"] = distances[i]

    return restos

def resto_obj_to_sql(restos):
    RESTO_INSERT = 'INSERT INTO restaurant VALUES ({id}, "{name}", {distance});'
    for resto in restos:
        print(RESTO_INSERT.format(id = resto["id"],name = resto["resto"],distance = resto["distance"]))

def food_obj_to_sql(foods):
    FOOD_TEMPLATE = 'INSERT INTO food VALUES({id}, "{name}", {resto_id}, "{price}", "{path}");'
    FOOD_TAG_TEMPLATE = 'INSERT INTO food_tag VALUES ({food_id}, "{tag}");'
    for food in foods:
        print(FOOD_TEMPLATE.format(id = food["id"], name = food["food"], resto_id = resto_to_id[food["resto"]], price = food["price"], path = food["food"] + ".jpg"))
        for tag in food["tags"]:
            print(FOOD_TAG_TEMPLATE.format(food_id = food["id"], tag = tag))
        

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

import requests
import shutil


import base64
from mimetypes import guess_extension, guess_type
def save_images():
   # driver = webdriver.Firefox()
    #urls = []
    foods = food_csv_to_obj()
    # for i in range(len(foods)):
    #     url = 'https://images.google.com/'
    #     linkList = []
    #     driver.get(url)
    #     string = foods[i]["food"] 
    #     text = driver.find_element_by_xpath('//*[@id="lst-ib"]')
    #     text.send_keys(string)
    #     text.send_keys(Keys.RETURN)
    #     time.sleep(4)
    #     links = driver.find_element_by_css_selector('div.rg_di.rg_bx.rg_el.ivg-i>a.rg_l')
    #     links.click()
    #     time.sleep(6)
    #     t = driver.find_elements_by_css_selector('div.irc_mutc>a.irc_mutl>img.irc_mut')
    #     for tt in t:
    #         if tt.get_attribute('src') != None:
    #             while tt.get_attribute('src') == "": continue
    #             src = tt.get_attribute('src')
    #             j = src.find(',')
    #             ext = guess_extension(guess_type(src)[0])
    #             if ext=="jpe" or ext == "jpeg":
    #                 ext = "jpg"
    #             out = "images/" + foods[i]["food"] + ext
    #             src = src[j+1:]
    #             print(out)
    #             with open(out, 'wb') as f:
    #                 f.write(base64.b64decode(src))
    #             foods[i]["image"] = out
    #             break
    return foods

resto_obj_to_sql(resto_csv_to_obj())
food_obj_to_sql(save_images())