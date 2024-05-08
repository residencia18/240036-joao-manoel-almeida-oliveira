import dataclasses

class Conta:
    def __init__(self, id, accountName, balance, agencyId):
        self.id = id
        self.accountName = accountName
        self.balance = balance
        self.agencyId = agencyId
