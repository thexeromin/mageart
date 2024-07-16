import { Button, Box, VStack } from "@chakra-ui/react"

function RightToolbar() {
    return (
        <Box>
            <VStack
                spacing={2}
                align='stretch'
            >
                <Button
                    onClick={() => null}
                >
                    Download
                </Button>
            </VStack>
        </Box>
    )
}

export default RightToolbar