import { FC, Fragment } from 'react'

import Card from './Card'
import { CardRefProvider } from './context/CardRefProvider'
import { CardVisibleProvider, useCardVisible } from './context/CardVisibleProvider'
import { ThumbRefProvider } from './context/ThumbRefProvider'
import { ThumbVisibleProvider, useThumbVisible } from './context/ThumbVisibleProvider'
import PopupThumb from './PopupThumb'

const Content: FC<{
  text: string
  position: {
    x: number
    y: number
  }
}> = ({ text, position }) => {
  return (
    <Fragment>
      <PopupThumb position={position} text={text} />
      <Card />
    </Fragment>
  )
}
const App: FC<{
  text: string
  position: {
    x: number
    y: number
  }
}> = ({ text, position }) => {
  return (
    <ThumbVisibleProvider>
      <ThumbRefProvider>
        <CardVisibleProvider>
          <CardRefProvider>
            <Content text={text} position={position} />
          </CardRefProvider>
        </CardVisibleProvider>
      </ThumbRefProvider>
    </ThumbVisibleProvider>
  )
}
export default App
