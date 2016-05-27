import eventlet
from eventlet.green import urllib2


urls = [
    "https://www.google.com.hk/images/nav_logo242.png",
    "http://www.google.com/intl/en_ALL/images/logo.gif",
]


def fetch(url):
    return urllib2.urlopen(url).read()


pool = eventlet.GreenPool()

for body in pool.imap(fetch, urls):
    print("got body", len(body))
