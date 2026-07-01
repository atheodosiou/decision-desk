import { Component, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/ui/button/button';
import { ScenarioAction, ScenarioActionType } from '../../models/sandbox.models';

@Component({
  selector: 'app-scenario-action-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './scenario-action-form.html'
})
export class ScenarioActionFormComponent {
  readonly onSubmit = output<ScenarioAction>();
  readonly onCancel = output<void>();
  readonly assets = input.required<Array<{ id: string; ticker: string; name: string }>>();

  protected readonly form = new FormGroup({
    type: new FormControl<ScenarioActionType>('buy', { nonNullable: true }),
    assetId: new FormControl<string>('', { nonNullable: true }),
    amount: new FormControl<number | null>(null),
    quantity: new FormControl<number | null>(null),
    price: new FormControl<number | null>(null)
  });

  protected readonly actionTypes: Array<{ value: ScenarioActionType; label: string }> = [
    { value: 'buy', label: 'Buy' },
    { value: 'sell', label: 'Sell' }
  ];

  protected submit(): void {
    const value = this.form.getRawValue();
    const selectedAsset = this.assets().find((asset) => asset.id === value.assetId);

    if (!selectedAsset) {
      return;
    }

    const action: ScenarioAction = {
      id: crypto.randomUUID(),
      assetId: selectedAsset.id,
      ticker: selectedAsset.ticker,
      assetName: selectedAsset.name,
      type: value.type,
      amount: value.amount ?? null,
      quantity: value.quantity ?? null,
      price: value.price ?? null,
      currency: 'USD'
    };

    this.onSubmit.emit(action);
    this.form.reset({ type: 'buy', assetId: '', amount: null, quantity: null, price: null });
  }
}
