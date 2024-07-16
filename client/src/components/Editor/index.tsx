import { Box, Grid } from "@chakra-ui/react"

import ImageContainer from "./ImageContainer"
import { LeftToolbar, RightToolbar } from "./Toolbar"

function Editor() {
    return (
        <Grid templateColumns="1fr 2fr 1fr" gap={4} p={4}>
            <Box minHeight="400px">
                <LeftToolbar />
            </Box>

            <Box minHeight="400px" display="flex" alignItems="center" justifyContent="center">
                <ImageContainer />
            </Box>

            <Box minHeight="400px">
                <RightToolbar />
            </Box>
        </Grid>
    )
}

export default Editor