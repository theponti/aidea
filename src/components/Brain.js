import React from 'react'
import brain from 'src/images/brain.svg'
import styled from 'styled-components'

const BrainLogo = styled.img`
    display: flex;
    height: 2rem;
`
export default function Brain () {
  return <BrainLogo src={brain} alt="brain emoji"/>
}
