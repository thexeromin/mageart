import { Button, Box, VStack } from "@chakra-ui/react"
import { useCanvas } from "../../../context"

function RightToolbar() {
    const { 
        downloadImage
    } = useCanvas()
    return (
        <Box>
            <VStack
                spacing={2}
                align='stretch'
            >
                <Button
                    onClick={() => downloadImage()}
                >
                    Download
                </Button>
            </VStack>
        </Box>
    )
}

export default RightToolbar