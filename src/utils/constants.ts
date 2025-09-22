export const localCurrencySettings: Intl.NumberFormatOptions = {
  maximumFractionDigits: 2,
  style: 'currency',
  currencyDisplay: 'symbol',
  currency: 'USD',
};

export const variableTypeShorts = {
  Hour: 'hr',
  Device:'dev',
  Site:  'flat'
}

export const workOrderCustomFieldTypes = {
  PUBLIC: 'Show custom field in Published Status',
  RESTRICTED: 'Show to contractor upon assignment',
  HIDDEN: 'Hide custom field from Contractors',
};
