import {
    Box,
    Flex,
    Button,
    useColorModeValue,
    Stack,
    useColorMode,
    Container,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} >
                <Container maxW={'7xl'}>

                    <Flex h={16} alignItems={'center'} justifyContent={'space-between'} >
                        <Box>MageArt</Box>

                        <Flex alignItems={'center'}>
                            <Stack direction={'row'} spacing={7}>
                                <Button onClick={toggleColorMode}>
                                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                                </Button>
                            </Stack>
                        </Flex>
                    </Flex>
                </Container>
            </Box>
        </>
    )
}

export default Navbar