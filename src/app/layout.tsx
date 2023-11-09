import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { Box } from '@mui/joy'

export const metadata: Metadata = {
  title: '電資院學士班 - 畢業審查',
  description: '國立清華大學電機資訊學院學士班畢業審查系統',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
          <Header />
          <Sidebar />
          <Box
            component="main"
            className="MainContent"
            sx={{
              px: {
                xs: 2,
                md: 6,
              },
              pt: {
                xs: 'calc(12px + var(--Header-height))',
                sm: 'calc(12px + var(--Header-height))',
                md: 3,
              },
              pb: {
                xs: 2,
                sm: 2,
                md: 3,
              },
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
              height: '100dvh',
              gap: 1,
              overflow: 'auto',
            }}
          >{children}</Box>
        </Box>
      </body>
    </html>
  )
}
