from banco.Conta import Conta

class User:
    def __init__(self, nome, cpf, data_nascimento):
        self.nome = nome
        self.cpf = cpf
        self.data_nascimento = data_nascimento
        self.conta = None

    def __str__(self):
        return f'Nome: {self.nome} \nCPF: {self.cpf} \nData de Nascimento: {self.data_nascimento}'

    def abrir_conta(self, limite):
        self.conta = Conta(self.nome, limite)

    def sacar(self, valor):
        return self.conta.saca(valor)

    def depositar(self, valor):
        return self.conta.deposita(valor)

    def extrato(self):
        return self.conta.extrato()