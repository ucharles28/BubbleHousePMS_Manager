import '../globals.css'
import { Poppins } from 'next/font/google'
import "react-calendar/dist/Calendar.css";
import { getUserInfo } from '../lib/helpers';
import Layout from '../components/Layout';
import { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export const metadata: Metadata = {
  title: 'Bcloud',
}

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  subsets: ['latin', 'latin-ext'],
  preload: true
})

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

  const { hotelName, userId, accountType } = await getUserInfo();
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AntdRegistry>
          <Layout hotelName={hotelName} userId={userId} accountType={accountType}>
            {children}
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  )
}