from uuid import uuid4


def generate_uuid():
    """Generate UUID"""
    uuid = uuid4().hex
    return uuid
