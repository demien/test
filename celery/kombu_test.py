import socket
import datetime
from time import time
from kombu import Connection


class Logger(object):

    def __init__(self, connection, queue_name='log_queue',
            serializer='json', compression=None):
        self.queue = connection.SimpleQueue(queue_name)
        self.serializer = serializer
        self.compression = compression

    def log(self, message, level='INFO', context={}):
        self.queue.put({'message': message,
                        'level': level,
                        'context': context,
                        'hostname': socket.gethostname(),
                        'timestamp': time()},
                        serializer=self.serializer,
                        compression=self.compression)

    def process(self, callback, n=1, timeout=1):
        for i in xrange(n):
            log_message = self.queue.get(block=True, timeout=1)
            entry = log_message.payload # deserialized data.
            callback(entry)
            log_message.ack() # remove message from queue

    def close(self):
        self.queue.close()


if __name__ == '__main__':
    from contextlib import closing

    with Connection('redis://localhost:6379/0') as conn:
        with closing(Logger(conn)) as logger:

            # Send message
            logger.log('Error happened while encoding video',
                        level='ERROR',
                        context={'filename': 'cutekitten.mpg'})

            # Consume and process message

            # This is the callback called when a log message is
            # received.
            def dump_entry(entry):
                date = datetime.datetime.fromtimestamp(entry['timestamp'])
                print('[%s %s %s] %s %r' % (date,
                                            entry['hostname'],
                                            entry['level'],
                                            entry['message'],
                                            entry['context']))

            # Process a single message using the callback above.
            logger.process(dump_entry, n=1)
