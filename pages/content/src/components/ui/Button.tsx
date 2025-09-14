import { clsx } from 'clsx'

export default function Button({
  className,
  ...result
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      {...result}
      className={clsx('btn', 'btn-sm', 'shadow-none', 'border-0', className)}
    />
  )
}
