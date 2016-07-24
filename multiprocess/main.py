import time
from multiprocessing import Process, active_children
import os

def info(title):
    print title
    # print 'module name:', __name__
    # if hasattr(os, 'getppid'):  # only available on Unix
    #     print 'parent process:', os.getppid()
    # print 'process id:', os.getpid()

def f(name):
    info('function f')
    time.sleep(10)
    print 'hello', name

if __name__ == '__main__':
    # info('main line')

    p = Process(target=f, args=('bob',))
    p.daemon = True
    p.start()
    print p.is_alive()
    print p.daemon
    print p.pid
    print active_children()
    # p.join()
    # print '*' * 100
    

# from multiprocessing import Process, Queue

# def f(q):
#     q.put([42, None, 'hello'])

# if __name__ == '__main__':
#     q = Queue()
#     p = Process(target=f, args=(q,))
#     p.start()
#     print q.get()    # prints "[42, None, 'hello']"
#     p.join()

# from multiprocessing import Process, Lock

# def f(l, i):
#     l.acquire()
#     print 'hello world', i
#     l.release()

# if __name__ == '__main__':
#     lock = Lock()

#     for num in range(10):
#         Process(target=f, args=(lock, num)).start()

# from multiprocessing import Pool, TimeoutError
# import time
# import os

# def f(x):
#     return x*x

# if __name__ == '__main__':
#     pool = Pool(processes=4)              # start 4 worker processes

#     # print "[0, 1, 4,..., 81]"
#     print pool.map(f, range(10))

#     # print same numbers in arbitrary order
#     for i in pool.imap_unordered(f, range(10)):
#         print i

#     # evaluate "f(20)" asynchronously
#     res = pool.apply_async(f, (20,))      # runs in *only* one process
#     print res.get(timeout=1)              # prints "400"

#     # evaluate "os.getpid()" asynchronously
#     res = pool.apply_async(os.getpid, ()) # runs in *only* one process
#     print res.get(timeout=1)              # prints the PID of that process

#     # launching multiple evaluations asynchronously *may* use more processes
#     multiple_results = [pool.apply_async(os.getpid, ()) for i in range(4)]
#     print [res.get(timeout=1) for res in multiple_results]

#     # make a single worker sleep for 10 secs
#     res = pool.apply_async(time.sleep, (10,))
#     try:
#         print res.get(timeout=1)
#     except TimeoutError:
#         print "We lacked patience and got a multiprocessing.TimeoutError"
