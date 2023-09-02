import './globals.css'
import { Baloo_Bhaijaan_2 } from 'next/font/google'

const inter = Baloo_Bhaijaan_2({
  subsets: ['arabic'],
  weight: ['400', '600', '500', '700', '800'],
})
export const metadata = {
  title: 'Todo List',
  description: 'To do list app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir='rtl'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
