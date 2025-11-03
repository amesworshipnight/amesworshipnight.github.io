import { ReactNode } from 'react'
export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl bg-white shadow p-4 border border-gray-100">{children}</div>
  )
}
