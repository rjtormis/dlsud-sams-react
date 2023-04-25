class UnAuthorizedError(Exception):
    status_code = 401

    def __init__(self, message):
        self.message = message
        super().__init__(self.message)


class NotFoundError(Exception):
    status_code = 404

    def __init__(self, message):
        self.message = message
        super().__init__(self.message)


class ConflictError(Exception):
    status_code = 409

    def __init__(self, message):
        self.message = message
        super().__init__(self.message)
