class Transacao:
    def __init__(self, id, value, accountRecipient, accountSender):
        if value <= 0:
            raise ValueError("Value must be greater than 0")
        
        if accountRecipient == accountSender:
            raise ValueError("Account recipient and account sender must be different")
        
        self.id = id
        self.value = value
        self.accountRecipient = accountRecipient
        self.accountSender = accountSender

    def __str__(self):
        return f"Transacao(id={self.id}, value={self.value}, accountRecipient={self.accountRecipient}, accountSender={self.accountSender}"

    def __repr__(self):
        return self.__str__()

    def execute(self):
        if self.accountSender.balance < self.value:
            return False

        try:
            self.accountSender.balance -= self.value
            self.accountRecipient.balance += self.value

            return True
        except Exception as e:
            print(e)
            return False