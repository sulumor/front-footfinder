import { Button } from '@chakra-ui/react'

import './Header.scss'

const Header = () => {
    return <> 
    
    <div className='header'>
    <h1>FootFinder</h1>
    <div className='header_buttons'>
    <Button colorScheme='red'>Se connecter</Button>
    <Button colorScheme='teal'>S'inscrire</Button>
    </div>
    </div>

    </>
}

export default Header