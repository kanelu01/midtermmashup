#!/usr/bin/python

import json
import oauth2 as oauth
from flask import Flask, request, Response
import requests as req
from json import dumps, loads
from flask_cors import CORS, cross_origin



app = Flask(__name__)
CORS(app)

@app.route('/proxy/getlocation/')
def proxy_puppy_request():
    args = request.url.split('?')[1]

    consumer_key = "bcNy2h5XyIQaEayXvCm9vKJfR"
    consumer_secret = "X8QBmsTL7HRvOqW8r1OjK1RK6Y8NyKY5lKm0W4rYyDYh9kYeUh"

    access_token = "717344105546780672-OVholNApCW10M5W0rRiSPk5k8TPFRnE"
    access_token_secret = "m8KWlKhANYlgFQTvifJD864WoWIdc0UPzkhBGWwIV65vy"

    consumer = oauth.Consumer(key = consumer_key, secret = consumer_secret)
    access_token = oauth.Token(key = access_token, secret = access_token_secret)
    client = oauth.Client(consumer, access_token)

    response, data= client.request("https://api.twitter.com/1.1/search/tweets.json?count=10&result_type=recent&q={}".format(args))
    return data




    #timeline_endpoint = "https://api.twitter.com/1.1/search/tweets.json?&result_type=popular&q={}".format(args)

    #response, data = client.request(timeline_endpoint)

    #return data

    #tweets = json.loads(data)

    #places = []

    #for a in tweets['statuses']:
    #    places.append(a['user'] ['location'])
        #print a['user'] ['location']
    #return places


app.run(debug=True, host="0.0.0.0", port=8001)
