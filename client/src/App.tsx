import { ChakraProvider, Button } from '@chakra-ui/react'

import Base from './components/Base'

function App() {
    return (
        <ChakraProvider>
            <Base>
                <Button>Hello</Button>
            </Base>
        </ChakraProvider>
    )
}

export default App
