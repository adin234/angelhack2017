from sklearn.neighbors import NearestNeighbors
import MySQLdb
import googlemaps
import sys
import json
import numpy as np

def get_user_data(db, user_id):
    sql = '''
        SELECT age, gender
        FROM user 
        WHERE user_id = %s
    '''
    binds = (user_id,)

    cursor = db.cursor()
    cursor.execute(sql, binds)
    return cursor.fetchone()

def get_avg_cost(db, user_id):
    sql = '''
        SELECT AVG(cost)
        FROM (
            SELECT (order_food.quantity * food.price) as cost
            FROM user_order 
                NATURAL JOIN order_food
                NATURAL JOIN food
            WHERE user_order.user_id = %s
        ) x
    '''
    binds = (user_id,)

    cursor = db.cursor()
    cursor.execute(sql, binds)
    
    return cursor.fetchone()

def get_tag_freqs(db, user_id, tag_order):
    sql = '''
        SELECT tag, (
            SELECT COUNT(order_id)
            FROM user_order
                NATURAL JOIN order_food 
            WHERE user_order.user_id = %s
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

    cursor = db.cursor()
    cursor.execute(sql, binds)
    result = cursor.fetchall()

    freqs = {}
    for r in result:
        freqs[r[0]] = r[1]
    
    freq_vector = []
    for t in tag_order:
        freq_vector.append(freqs[t])
    
    return tuple(freq_vector)

def get_resto_freqs(db, user_id, restaurant_order):
    sql = '''
        SELECT x.restaurant_id, x.name, (
            SELECT COUNT(order_id)
            FROM user_order y
            WHERE y.restaurant_id = x.restaurant_id AND y.user_id = %s
        ) as freq
        FROM restaurant x
        GROUP BY x.restaurant_id
    '''
    binds = (user_id,)

    cursor = db.cursor()
    cursor.execute(sql, binds)
    result = cursor.fetchall()

    freqs = {}
    for r in result:
        freqs[r[0]] = {
            'name': r[1],
            'freq': r[2]
        }
    
    freq_vector = []
    for r in restaurant_order:
        freq_vector.append(freqs[r]['freq'])
    
    return tuple(freq_vector)

def get_tags(db): 
    sql = 'SELECT DISTINCT tag FROM food_tag'

    cursor = db.cursor()
    cursor.execute(sql);
    tags = cursor.fetchall()
    
    return tuple(map(lambda tag: tag[0], tags))

def get_resto_ids(db):
    sql = 'SELECT DISTINCT restaurant_id FROM restaurant'

    cursor = db.cursor()
    cursor.execute(sql);
    restaurant_ids = cursor.fetchall()
    
    return tuple(map(lambda resto: int(resto[0]), restaurant_ids))

def create_vector(db, user_id, tags, restaurants):
    vector = get_tag_freqs(db, user_id, tags)
    vector += get_resto_freqs(db, user_id, restaurants)
    vector += get_user_data(db, user_id)
    vector += get_avg_cost (db, user_id)

    return list(vector)

def knn(user_vector, other_vectors, index_map):
    user_vector = np.array([user_vector])
    other_vectors = np.array(other_vectors)

    knn = NearestNeighbors(n_neighbors=3, algorithm='auto').fit(other_vectors)
    distances, indices = knn.kneighbors(user_vector)

    return [index_map[i] for i in indices[0]]

def recommend(db, nn):
    recommendations = []

    for n in nn:
        cursor = db.cursor()
        cursor.execute('''
            SELECT DISTINCT food_id, name, price, restaurant_id, image FROM food
            WHERE food_id IN (
                SELECT order_food.food_id
                FROM order_food NATURAL JOIN user_order
                WHERE user_order.user_id = %s
                ORDER BY user_order.order_datetime DESC
            )
            LIMIT 50
        ''', (n,))
        foods = cursor.fetchall()

        for f in foods:
            food = {
                'food_id': f[0],
                'name': f[1],
                'price': f[2],
                'restaurant_id': f[3],
                'image': f[4]
            }

            cursor = db.cursor()
            cursor.execute('SELECT tag FROM food_tag WHERE food_id = %s', (int(f[0]),))
            tags = cursor.fetchall()
            food['tags'] = [i[0] for i in tags]
            recommendations.append(food)


    return json.dumps(recommendations)

def main():
    db = MySQLdb.connect(
        host='localhost',
        user='root',
        passwd='root',
        db='furcifer'
    )

    gmaps = googlemaps.Client(
        'AIzaSyB2BLGGqC9z-DakWXIS3fYVIQTRI3xmEqQ')

    user_id = int(sys.argv[1])

    tags = get_tags(db)
    restaurants = get_resto_ids(db)

    user_vector = create_vector(db, user_id, tags, restaurants)

    index_map = {}
    other_vectors = []
    counter = 0
    for i in range(1, 6):
        if (i == user_id):
            continue
        
        index_map[counter] = i
        counter += 1
        other_vectors.append(create_vector(db, i, tags, restaurants))

    nn = knn(user_vector, other_vectors, index_map)
    print(recommend(db, nn))

if __name__ == '__main__':
    main()