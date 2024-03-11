import { useEffect } from 'react'

import { popupCardID } from './constants'
import Container from './Container'
import Content from './Content'
import { useCardRef, useChangeCardRef } from './context/CardRefProvider'
import { useCardVisible } from './context/CardVisibleProvider'
import { useThumbRef } from './context/ThumbRefProvider'
import TitleBar from './TitleBar'
import { hidePopupCard } from './utils'

const Card = () => {
  const thumbRef = useThumbRef()
  const changeCardRef = useChangeCardRef()
  const visible = useCardVisible()
  return (
    <div id={popupCardID} ref={changeCardRef} className={`${visible ? 'block' : 'hidden'}`}>
      <Container reference={thumbRef!}>
        <TitleBar pinned={false} onClose={hidePopupCard} />
        <Content />
      </Container>
    </div>
  )
}
export default Card
