import React from 'react'
import './Container.css'

declare interface ContainerProps {
  children: JSX.Element | JSX.Element[]
}

const Container: React.FC<ContainerProps> = (props) => {
  return <div className='AppContainer'>
    { props.children }
  </div>
}

export default Container