import logging


class Logger(object):
    def __init__(self):
        logging.getLogger().setLevel(logging.INFO)
        logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')

    @staticmethod
    def log(message: str, level: str = "info"):
        match level.lower():
            case "info":
                logging.info(message)
            case "warn":
                logging.warning(message)
            case "error":
                logging.error(message)
            case "fatal":
                logging.fatal(message)
            case "debug":
                logging.debug(message)


logger = Logger()
