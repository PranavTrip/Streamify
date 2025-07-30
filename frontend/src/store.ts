import { configureStore } from '@reduxjs/toolkit'
import { themeSlice } from './store/useThemeStore'

export default configureStore({
    reducer: {
        theme: themeSlice.reducer,
    }
})