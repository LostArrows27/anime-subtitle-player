import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

const configDark: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

export const themeLight = extendTheme({ config })
export const themeDark = extendTheme({ config: configDark })
