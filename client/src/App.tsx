import { ChakraProvider } from '@chakra-ui/react'

import Base from './components/Base'
import Editor from './components/Editor'
import { CanvasProvider } from "./context"

function App() {
    return (
        <ChakraProvider>
            <Base>
                <CanvasProvider>
                    <Editor />
                </CanvasProvider>
            </Base>
        </ChakraProvider>
    )
}

export default App
