import React from 'react'
import PropTypes from 'prop-types'
import { Image } from '../Common/Styled'
import { Wrapper } from './Styled'
import { calcSizeWithZoom } from '../utils/calcZoom'
import UploadRibbon from '../UploadRibbon'

const CanvasImage = ({ item, onSelect, selectedItemId, zoomLevel, showRibbon = false }) => {
  const height = calcSizeWithZoom(item.height, zoomLevel)
  const width = calcSizeWithZoom(item.width, zoomLevel)
  const x = calcSizeWithZoom(item.posx, zoomLevel)
  const y = calcSizeWithZoom(item.posy, zoomLevel)

  return (
    <Wrapper
      top={y}
      left={x}
      width={width}
      height={height}
    >
      {showRibbon && (
          <UploadRibbon
          />
      )}

      <Image
        src={item.path}
        selected={selectedItemId === item.id}
        alt={''}
        top={y}
        left={x}
        width={width}
        height={height}
        onClick={() => onSelect(item.id)}
      />
    </Wrapper>
  )
}

CanvasImage.propTypes = {
  item: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  selectedItemId: PropTypes.string,
  zoomLevel: PropTypes.number,
}

export default CanvasImage
