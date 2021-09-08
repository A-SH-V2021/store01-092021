import React from 'react'
import styled from 'styled-components'
import { PageHero} from '../components'



const CheckoutPage = () => {
  return (
    <main>
      <PageHero title='checkout'></PageHero>
      <Wrapper>
        <h1>checkout</h1>
      </Wrapper>
    </main>
  )
}
const Wrapper = styled.div`
 display:flex;
 justify-content:center;
`
export default CheckoutPage
