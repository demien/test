import time
import inspect
from celery import Celery

app = Celery('tasks', broker='redis://localhost:6379/0')

@app.task(bind=True)
def add(self, x, y):
    # import traceback
    # for line in traceback.format_stack():
    #     print(line.strip())
    # print('Executing task id {0.id}, args: {0.args!r} kwargs: {0.kwargs!r}'.format(self.request))
    # print('{0.group}, {0.chord}, {0.is_eager}, {0.logfile}'.format(self.request))
    # print dir(self.request)
    return x + y

@app.task(bind=True)
def sleep(self):
    time.sleep(10)
    return

@app.task
def xsum(numbers):
    return sum(numbers)

@app.task
def error(self, *args):
    try:
        raise ValueError('test')
    except Exception:
        print 'catch exception'

@app.task
def dummy(self, *args):
    print 'in dummy'
