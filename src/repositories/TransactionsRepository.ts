import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((acumulator, currentValue) => {
      if (currentValue.type === 'income') {
        return acumulator + currentValue.value;
      }
      return acumulator;
    }, 0);

    const outcome = this.transactions.reduce((acumulator, currentValue) => {
      if (currentValue.type === 'outcome') {
        return acumulator + currentValue.value;
      }
      return acumulator;
    }, 0);

    const total = income - outcome;
    const balance = {
      income,
      outcome,
      total,
    };
    return balance;
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({ value, type, title });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
