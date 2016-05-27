from tasks import add, sleep, xsum, error, dummy
from celery import chord
from celery import Celery

if __name__ == '__main__':
    # x = chord((add.s(i, i) for i in xrange(10)), sleep.si())
    # print type(x)
    # x()
    # x = add.delay(1, 2).get()
    c = add.s(1, 2) | add.s(3) | error.s() | dummy.s()
    print c()
    # sleep.delay()
    # chain()
    # print add.name
    # add.delay(4, 4)
    # app = Celery('tasks', broker='redis://localhost:6379/0')
    # print app.control.inspect().active_queues()
    # app.control.add_consumer('add', reply=True)
