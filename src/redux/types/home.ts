export enum TradeType {
  sell = 'sell',
  buy = 'buy',
  trade = 'trade',
}
export enum Coin {
  bitcoin = 'bitcoin',
  usdt = 'usdt',
}
export interface Card {
  _id: string;
  name: string;
  image: string;
  category: string;
  isDisabled: false;
  rate: string;
  type: string;
  createdAt: string;
}
