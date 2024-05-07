export enum Status {
  pending = 'pending',
  completed = 'completed',
  cancelled = 'cancelled',
  all = 'all',
}

export interface WithdrawalState {
  amount: number;
  status: Status;
}
