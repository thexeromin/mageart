import { ReactNode } from 'react'
import { Box, Container } from '@chakra-ui/react'

import Navbar from '../Navbar'

interface Props {
    children?: ReactNode
}


function Base({ children }: Props) {
    return (
        <Box>
            <Navbar />
            <Container maxW={'7xl'}>
                {children}
            </Container>
        </Box>
    )
}

export default Base
