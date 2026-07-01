import { Component, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/ui/button/button';
import { Asset, Transaction, TransactionType } from '../../models/portfolio.models';

@Component({
  selector: 'app-add-transaction-form',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './add-transaction-form.html'
})
export class AddTransactionFormComponent {
  readonly assets = input.required<Asset[]>();
  readonly onSubmit = output<Transaction>();
  readonly onCancel = output<void>();

  protected readonly form = new FormGroup({
    type: new FormControl<TransactionType>('buy', { nonNullable: true }),
    assetId: new FormControl<string>('', { nonNullable: true }),
    date: new FormControl<string>(new Date().toISOString().slice(0, 10), { nonNullable: true }),
    quantity: new FormControl<number | null>(null),
    price: new FormControl<number | null>(null),
    amount: new FormControl<number | null>(null),
    fees: new FormControl<number | null>(null),
    note: new FormControl<string>('', { nonNullable: true })
  });

  protected readonly transactionTypes: Array<{ value: TransactionType; label: string }> = [
    { value: 'buy', label: 'Buy' },
    { value: 'sell', label: 'Sell' },
    { value: 'deposit', label: 'Deposit' },
    { value: 'withdrawal', label: 'Withdrawal' },
    { value: 'dividend', label: 'Dividend' }
  ];

  protected submit(): void {
    const value = this.form.getRawValue();
    const transaction: Transaction = {
      id: crypto.randomUUID(),
      assetId: value.assetId || undefined,
      type: value.type,
      date: value.date,
      quantity: value.quantity ?? undefined,
      price: value.price ?? undefined,
      amount: value.amount ?? undefined,
      fees: value.fees ?? undefined,
      currency: 'USD',
      note: value.note || undefined
    };

    this.onSubmit.emit(transaction);
    this.form.reset({
      type: 'buy',
      assetId: '',
      date: new Date().toISOString().slice(0, 10),
      quantity: null,
      price: null,
      amount: null,
      fees: null,
      note: ''
    });
  }
}
