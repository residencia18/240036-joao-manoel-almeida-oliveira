from calculadora import Calculadora
import pytest

def test_somar():
    calc = Calculadora()
    assert calc.somar(1, 1) == 2
    assert calc.somar(1, 2) == 3
    assert calc.somar(2, 2) == 4

def test_subtrair():
    calc = Calculadora()
    assert calc.subtrair(1, 1) == 0
    assert calc.subtrair(2, 1) == 1
    assert calc.subtrair(2, 2) == 0
    assert calc.subtrair(1, 2) == -1
    assert calc.subtrair(1, -2) == 3

def test_multiplicar():
    calc = Calculadora()
    assert calc.multiplicar(2, 2) == 4
    assert calc.multiplicar(2, 3) == 6
    assert calc.multiplicar(3, 3) == 9
    assert calc.multiplicar(3, 0) == 0
    assert calc.multiplicar(-5, 3) == -15
    assert calc.multiplicar(-5, -3) == 15

def test_dividir():
    calc = Calculadora()
    assert calc.dividir(4, 2) == 2
    assert calc.dividir(4, 4) == 1
    assert calc.dividir(4, 1) == 4
    assert calc.dividir(0, 4) == 0

def test_dividir_por_zero():
    calc = Calculadora()
    with pytest.raises(ZeroDivisionError):
        calc.dividir(4, 0)