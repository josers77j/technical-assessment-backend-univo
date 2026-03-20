export enum ProviderStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export type ProviderStatusType = keyof typeof ProviderStatus;
