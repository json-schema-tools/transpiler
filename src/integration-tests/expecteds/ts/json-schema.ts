export interface B {
  a?: A;
  [k: string]: any;
}
export type A = B;
