import type { Metadata } from 'next';
import { Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'src/components/theme-provider/ThemeProvider';
import JotaiProvider from 'src/components/jotai-provider/JotaiProvider';
import AuthSessionProvider from 'src/components/auth/AuthSessionProvider';
import { KEYWORD, SITE_DESCRIPTION, SITE_TITLE, SITE_URL, THUMBNAIL } from 'src/constant/metadata';

import TaskModal from 'src/components/tasks/TaskModal';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    keywords: KEYWORD,
    publisher: 'A-Star Group',
    robots: {
        follow: true,
        index: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        url: SITE_URL,
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        siteName: SITE_TITLE,
        countryName: 'Vietnam',
        images: {
            url: SITE_URL + THUMBNAIL.src,
            secureUrl: THUMBNAIL.src,
            type: 'image/png',
            width: THUMBNAIL.width,
            height: THUMBNAIL.height,
        },
    },
    twitter: {
        card: 'summary_large_image',
        site: '@site',
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        images: {
            url: SITE_URL + THUMBNAIL.src,
            secureUrl: THUMBNAIL.src,
            type: 'image/png',
            width: THUMBNAIL.width,
            height: THUMBNAIL.height,
        },
    },
    appleWebApp: {
        capable: true,
        title: SITE_TITLE,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
                    <AuthSessionProvider>
                        <JotaiProvider>{children}</JotaiProvider>
                    </AuthSessionProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
