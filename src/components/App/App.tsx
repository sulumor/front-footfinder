import { ChakraProvider } from '@chakra-ui/react'

import Header from '../Header/Header'
import Home from '../Home/Home'
import Footer from '../Footer/Footer'

import './App.scss'

function App() {

  return (
    
   <>
   <ChakraProvider>
    <Header />
    <Home />
    <Footer />
   </ChakraProvider>
   </>

  )
}

export default App
