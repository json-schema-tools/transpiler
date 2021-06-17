export type StringDoaGddGA = string;
export type OneOfMoebiusSchemaStringDoaGddGANK2MA6NR = MoebiusSchema | StringDoaGddGA;
export interface MoebiusSchema {
  MoebiusProperty?: MoebiusSchema;
  deeperMobiusProperty?: OneOfMoebiusSchemaStringDoaGddGANK2MA6NR;
  [k: string]: any;
}
