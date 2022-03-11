import React from "react";
import { Button } from '@chakra-ui/react';

export function LadingPage( props ) {
    const login = () => window.location.href = 'http://localhost:3001/api/auth/discord';
    return (
        <>
            <Button 
            colorScheme='blue'
            onClick={login}
            >
                Login Discord
            </Button>
        </>
    )
}