import os
import sys
import logging
from datetime import datetime
from logging.handlers import TimedRotatingFileHandler


class Logging:
    @staticmethod
    def get_logger(
        name: str = 'agentic_memory',
        loglevel: str = os.environ.get('AGENTIC_MEMORY_LOGLEVEL', 'INFO'),
        logdir: str = 'logs',
    ):
        logger = logging.getLogger(name)
        if not logger.handlers:
            if not os.path.exists(logdir):
                os.makedirs(logdir)

            filename_pattern = "%Y_%m_%d.log"
            filename = datetime.now().strftime(filename_pattern)
            logfilepath = os.path.join(logdir, filename)
            formatter = logging.Formatter(
                '[%(asctime)s] [%(levelname)-8s]  [%(filename)-15s] :: %(message)s', datefmt='%Y-%m-%d %T'
            )

            fileHandler = TimedRotatingFileHandler(logfilepath, when="d", interval=1, backupCount=30)
            fileHandler.setFormatter(formatter)
            logger.addHandler(fileHandler)

            streamHandler = logging.StreamHandler(sys.stdout)
            streamHandler.setFormatter(formatter)
            logger.addHandler(streamHandler)

            # Convert string log level to logging constant
            if isinstance(loglevel, str):
                numeric_level = getattr(logging, loglevel.upper(), logging.INFO)
            else:
                numeric_level = loglevel
            logger.setLevel(numeric_level)
            logger.propagate = False

        return logger
