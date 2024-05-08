from src.banco.Conta import Conta
from src.banco.Transacao import Transacao

class Test_Banco:
    def test_transacao_execute(self):
        conta1 = Conta(1, "Conta1", 1000, 1)
        conta2 = Conta(2, "Conta2", 1000, 2)

        assert conta1.balance == 1000
        assert conta2.balance == 1000

        assert Transacao(1, 100, conta1, conta2).execute() == True
        assert conta1.balance == 1100
        assert conta2.balance == 900

        assert Transacao(2, 100, conta2, conta1).execute() == True
        assert conta1.balance == 1000
        assert conta2.balance == 1000

        assert Transacao(3, 1000, conta2, conta1).execute() == True
        assert conta1.balance == 0
        assert conta2.balance == 2000

        assert Transacao(4, 1000, conta2, conta1).execute() == False
        assert conta1.balance == 0
        assert conta2.balance == 2000

    def test_transacao_execute_reject_zero_and_negative(self):
        conta1 = Conta(1, "Conta1", 1000, 1)
        conta2 = Conta(2, "Conta2", 1000, 2)

        try:
            assert Transacao(5, -1000, conta2, conta1).execute() == False
            assert conta1.balance == 0
            assert conta2.balance == 2000
        except ValueError as e:
            assert str(e) == "Value must be greater than 0"

        try:
            assert Transacao(6, 0, conta2, conta1).execute() == False
        except ValueError as e:
            assert str(e) == "Value must be greater than 0"

    def test_transacao_execute_reject__same_account(self):
        conta1 = Conta(1, "Conta1", 1000, 1)

        try:
            assert Transacao(7, 1000, conta1, conta1).execute() == False
        except ValueError as e:
            assert str(e) == "Account recipient and account sender must be different"