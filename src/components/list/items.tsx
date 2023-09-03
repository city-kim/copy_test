import { addComma, roundingDigits, unitsInKorean } from '../../utils/number_converter'
import type { CarItem } from '../../types/car'

import './items.css'

function ListItems (props: CarItem) {
  return(
    <figure className='list-items'>
      <img src={props.image} alt={props.carClassName} />
      <figcaption>
        <article>
          <h3>{props.carClassName}</h3>
          <ul>
            {
              props.carTypeTags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))
            }
          </ul>
        </article>
        <p>{addComma(roundingDigits(props.price))}원 (-{props.discountPercent}%)</p>
        <ul>
          <li>{props.year}년</li>
          <li>{unitsInKorean(props.drivingDistance)}km</li>
          <li>{props.regionGroups.join(', ')}</li>
        </ul>
      </figcaption>
    </figure>
  )
}

export default ListItems