import test_calculadora

def main():
    test_calculadora.test_somar()
    test_calculadora.test_subtrair()
    test_calculadora.test_multiplicar()
    test_calculadora.test_dividir()
    test_calculadora.test_dividir_por_zero()

    print("Todos os testes passaram!")


if __name__ == "__main__":
    main()