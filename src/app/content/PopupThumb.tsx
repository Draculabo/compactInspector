import React, { FC, MouseEvent, MouseEventHandler, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import icon from '@/assets/fubukicss.svg'

import { popupCardID, popupThumbID, zIndex } from './constants'
import Container from './Container'
import Content from './Content'
import { useChangeCardVisible } from './context/CardVisibleProvider'
import { useChangeThumbRef } from './context/ThumbRefProvider'
import { useChangeThumbVisible, useThumbVisible } from './context/ThumbVisibleProvider'
import TitleBar from './TitleBar'
import { getContainer, hidePopupCard, queryPopupCardElement, queryPopupThumbElement } from './utils'

const PopupThumb: FC<{
  text: string
  position: {
    x: number
    y: number
  }
}> = ({ text, position: { x, y } }) => {
  const changeCardVisible = useChangeCardVisible()
  const thumbVisible = useThumbVisible()
  const changeThumbVisible = useChangeThumbVisible()
  const changeThumbRef = useChangeThumbRef()
  async function popupThumbClickHandler(event: MouseEvent<HTMLDivElement>) {
    event.stopPropagation()
    event.preventDefault()
    showPopupCard()
  }

  async function showPopupCard() {
    changeThumbVisible(false)
    changeCardVisible(true)
  }
  return (
    <div
      ref={changeThumbRef}
      className={cn(
        `absolute  bg-white rounded box-sha cursor-pointer select-none w-5 h-5  visible opacity-100 z-[${zIndex}] p-[${2}px] left-[${x}px] top-[${y}px] shadow-[0 0 4px rgba(0, 0, 0, 2)]`,
        thumbVisible ? 'visible' : 'invisible',
      )}
      style={{
        // zIndex: zIndex,
        // padding: 2,
        boxShadow: '0 0 4px rgba(0, 0, 0, 2)',
        left: x,
        top: y,
      }}
      data-set={text}
      id={popupThumbID}
      onClick={popupThumbClickHandler}
      onMouseMove={(e) => {
        e.stopPropagation()
      }}
    >
      <img
        src={icon}
        style={{
          height: '100%',
        }}
        className="block w-full h-full"
        onClick={popupThumbClickHandler}
      />
    </div>
  )
}
export default PopupThumb
