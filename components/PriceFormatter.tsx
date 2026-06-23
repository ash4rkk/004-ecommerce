import { cn } from '@/lib/utils';
interface Props {
  amount: number | null;
  className?: string;
}
const PriceFormatter = ({amount, className}: Props) => {
  const formattedPrice = Number(amount ?? 0).toLocaleString('en-US', {
    currency: 'USD',
    style: 'currency',
    minimumFractionDigits: 2,
  })

  return (
    <span className={cn('text-sm font-semibold text-ink', className)}>{formattedPrice}</span>
  )
}

export default PriceFormatter