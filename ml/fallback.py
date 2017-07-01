from sklearn.neighbors import NearestNeighbors
import MySQLdb
import googlemaps
import sys
import json

def get_user_data(db, user_id):
    sql = '''
        SELECT age, gender 
        FROM user 
        WHERE user_id = %d
    '''
    binds = (user_id,)

    c = db.cursor()
    c.execute(sql, binds)
    result = c.fetchone()

    return {
        'age': result[0],
        'gender': result[1]
    }

def get_avg_cost(db, user_id):
    sql = '''
        SELECT AVG(cost)
        FROM (
            SELECT (order_food.quantity * food.price) as cost
            FROM user_order 
                NATURAL JOIN order_food
                NATURAL JOIN food
            WHERE user_order.user_id = %d
        )
    '''
    binds = (user_id,)

    c = db.cursor()
    c.execute(sql, binds)
    result = c.fetchone()

    return result[0]

def get_tag_freqs(db, user_id):
    sql = '''
        SELECT tag, (
            SELECT COUNT(order_id)
            FROM user_order
                NATURAL JOIN order_food 
            WHERE user_order.user_id = %d
                AND order_food.food_id IN (
                    SELECT food_id 
                    FROM food_tag y
                    WHERE y.tag = x.tag
                )
        ) as freq
        FROM food_tag x
        GROUP BY tag
    '''
    binds = (user_id,)

    c = db.cursor()
    c.execute(sql, binds)
    result = c.fetchall()

    freqs = {}
    for r in result:
        freqs[r[0]] = r[1]
    
    return freqs

def get_resto_freqs(db, user_id):
    sql = '''
        SELECT restaurant_id, restaurant.name, COUNT(order_id)
        FROM user_order
            NATURAL JOIN restaurant
        WHERE user_order.user_id = %d
        GROUP BY restaurant_id
    '''
    binds = (user_id,)

    c = db.cursor()
    c.execute(sql, binds)
    result = c.fetchall()

    freqs = {}
    for r in result:
        freqs[r[0]] = {
            'name': r[1],
            'freq': r[2]
        }
    
    return freqs

def main():
    db = MySQLdb.connect(
        host='localhost',
        user='root',
        passwd='root',
        db='furcifer'
    )

    gmaps = googlemaps.Client(
        'AIzaSyB2BLGGqC9z-DakWXIS3fYVIQTRI3xmEqQ')

    user_id = sys.argv[1]