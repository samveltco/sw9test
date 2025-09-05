
export const calculateFundsRequiredSum = ({
  amount,
  basicType,
  quantity,
  variableAmount,
  maxQuantity,
  variablePayAfter
}: {
  amount: number,
  basicType: 'Hours' | 'Device' | 'Site',
  quantity: number,
  variableAmount: number,
  maxQuantity: number,
  variablePayAfter: number
}) => ((amount * (basicType === 'Site' ? 1 : quantity)) || 0)
  + ((variableAmount * (maxQuantity - variablePayAfter)) || 0)
