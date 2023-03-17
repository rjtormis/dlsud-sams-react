import string
import random


def id_generator(char=string.ascii_uppercase + string.digits):
    code1 = "".join(random.choice(char) for _ in range(4))
    code2 = "".join(random.choice(char) for _ in range(4))
    return f"{code1}-{code2}"


def unique_identifier_file(char=string.ascii_uppercase + string.digits):
    return "".join(random.choice(char) for _ in range(2))
