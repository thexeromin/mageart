import { Button, Box, VStack } from "@chakra-ui/react"
import { useCanvas } from "../../../context"

function LeftToolbar() {
    const { 
        applyGrayscaleFilter,
        revertToOriginal
    } = useCanvas()
    return (
        <Box>
            <VStack
                spacing={2}
                align='stretch'
            >
                <Button
                    onClick={() => applyGrayscaleFilter()}
                >
                    Apply Gray Scale
                </Button>

                <Button
                    onClick={() => revertToOriginal()}
                >
                    Revert Changes
                </Button>
            </VStack>
        </Box>
    )
}

export default LeftToolbar