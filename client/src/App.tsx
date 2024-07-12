import { ChakraProvider } from '@chakra-ui/react'

import Base from './components/Base'
import Editor from './components/Editor'

function App() {
    return (
        <ChakraProvider>
            <Base>
                <Editor />
            </Base>
        </ChakraProvider>
    )
}

export default App
