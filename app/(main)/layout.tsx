import '../globals.css'
import { Poppins } from 'next/font/google'
import "react-calendar/dist/Calendar.css";
import { getUserInfo } from '../lib/helpers';
import Layout from '../components/Layout';

// export const metadata: Metadata = {
//   title: 'MyBcloud',
// }

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  subsets: ['devanagari', 'latin', 'latin-ext'],
  preload: true
})

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

  const { hotelName, userId } = await getUserInfo();
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Layout hotelName={hotelName} userId={userId}>
          {children}
        </Layout>
      </body>
    </html>
  )
}